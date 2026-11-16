import { type ChildProcess, spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Bitmap } from "./png";
import { decodePng } from "./png";

const CHROME_CANDIDATES = [
	process.env.CHROME_BIN,
	"chromium",
	"chromium-browser",
	"google-chrome",
	"google-chrome-stable",
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const sleep = (ms: number) => new Promise<void>((done) => setTimeout(done, ms));

export function chromeBinary(): string {
	for (const candidate of CHROME_CANDIDATES) {
		if (!candidate) continue;
		if (candidate.startsWith("/")) {
			if (existsSync(candidate)) return candidate;
			continue;
		}
		const found = spawnSync("sh", ["-c", `command -v ${candidate}`], {
			encoding: "utf8",
		});
		const path = found.stdout?.trim();
		if (found.status === 0 && path) return path;
	}
	throw new Error(
		"Chromium not found. Set CHROME_BIN or install chromium (the dev shell has it).",
	);
}

const MIME: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
	".png": "image/png",
	".webp": "image/webp",
	".xml": "application/xml; charset=utf-8",
	".txt": "text/plain; charset=utf-8",
};

export type StaticServer = {
	port: number;
	stop: () => Promise<void>;
};

/** Serves the prerendered tree, with the SPA fallback the build ships. */
export async function serveStatic(root: string): Promise<StaticServer> {
	if (!existsSync(join(root, "index.html"))) {
		throw new Error(
			`${root}/index.html is missing. Run "bun run build" before the contrast audit.`,
		);
	}

	const server = createServer((request, response) => {
		void (async () => {
			const url = new URL(request.url ?? "/", "http://localhost");
			let path = decodeURIComponent(url.pathname);
			if (path.endsWith("/")) path += "index.html";

			const candidates = [
				join(root, path),
				join(root, path, "index.html"),
				join(root, "__spa-fallback.html"),
			];
			for (const candidate of candidates) {
				if (!candidate.startsWith(resolve(root))) continue;
				if (!existsSync(candidate) || !statSync(candidate).isFile()) continue;
				response.writeHead(200, {
					"Content-Type":
						MIME[extname(candidate)] ?? "application/octet-stream",
				});
				response.end(readFileSync(candidate));
				return;
			}
			response.writeHead(404, { "Content-Type": "text/plain" });
			response.end("not found");
		})().catch(() => {
			try {
				response.writeHead(500);
				response.end();
			} catch {
				// the response is already gone
			}
		});
	});

	await new Promise<void>((listening) =>
		server.listen(0, "127.0.0.1", listening),
	);
	const address = server.address();
	const port = typeof address === "object" && address ? address.port : 0;
	return {
		port,
		stop: () =>
			new Promise<void>((closed) => {
				server.close(() => closed());
			}),
	};
}

type Pending = {
	resolve: (value: unknown) => void;
	reject: (error: Error) => void;
};

export class Chrome {
	private constructor(
		private readonly socket: WebSocket,
		private readonly process: ChildProcess,
		private readonly profile: string,
		readonly baseUrl: string,
	) {}

	static async launch(
		baseUrl: string,
		viewport: { width: number; height: number },
		deviceScaleFactor = 1,
	) {
		const binary = chromeBinary();
		const profile = await mkdtemp(join(tmpdir(), "dbm-contrast-"));
		const args = [
			"--headless=new",
			"--remote-debugging-port=0",
			`--user-data-dir=${profile}`,
			"--no-first-run",
			"--no-default-browser-check",
			"--disable-search-engine-choice-screen",
			"--disable-dev-shm-usage",
			"--hide-scrollbars",
			"--force-color-profile=srgb",
			"--mute-audio",
			"about:blank",
		];
		if (process.getuid?.() === 0 || process.env.CI)
			args.unshift("--no-sandbox");
		args.unshift(binary);

		let stderr = "";
		const child = spawn(args[0], args.slice(1), {
			stdio: ["ignore", "ignore", "pipe"],
		});
		child.stderr?.on("data", (chunk: Buffer) => {
			stderr += chunk.toString();
			if (stderr.length > 4000) stderr = stderr.slice(-4000);
		});

		let port = 0;
		for (let i = 0; i < 300; i++) {
			try {
				const text = await readFile(
					join(profile, "DevToolsActivePort"),
					"utf8",
				);
				port = Number(text.split("\n")[0]);
				if (port) break;
			} catch {
				// not started yet
			}
			await sleep(50);
		}
		if (!port) {
			child.kill("SIGKILL");
			await rm(profile, { recursive: true, force: true });
			throw new Error(`Chromium did not start.\n${stderr}`);
		}

		const targets = (await (
			await fetch(`http://127.0.0.1:${port}/json/list`)
		).json()) as { type: string; webSocketDebuggerUrl: string }[];
		const target = targets.find(
			(item) => item.type === "page" && item.webSocketDebuggerUrl,
		);
		if (!target) {
			child.kill("SIGKILL");
			await rm(profile, { recursive: true, force: true });
			throw new Error("Chromium exposed no page target.");
		}

		const socket = new WebSocket(target.webSocketDebuggerUrl);
		await new Promise<void>((opened, failed) => {
			socket.addEventListener("open", () => opened(), { once: true });
			socket.addEventListener(
				"error",
				() => failed(new Error("Could not connect to Chromium.")),
				{
					once: true,
				},
			);
		});

		const chrome = new Chrome(socket, child, profile, baseUrl);
		socket.addEventListener("message", (event) =>
			chrome.receive(String(event.data)),
		);
		await chrome.send("Page.enable");
		await chrome.send("Runtime.enable");
		await chrome.send("Emulation.setDeviceMetricsOverride", {
			width: viewport.width,
			height: viewport.height,
			deviceScaleFactor,
			mobile: false,
		});
		await chrome.send("Emulation.setEmulatedMedia", {
			features: [
				{ name: "prefers-reduced-motion", value: "reduce" },
				{ name: "prefers-color-scheme", value: "dark" },
			],
		});
		return chrome;
	}

	private nextId = 1;
	private readonly pending = new Map<number, Pending>();
	private readonly listeners = new Map<string, (() => void)[]>();

	private receive(raw: string) {
		const message = JSON.parse(raw) as {
			id?: number;
			method?: string;
			error?: unknown;
			result?: unknown;
		};
		if (message.id !== undefined) {
			const pending = this.pending.get(message.id);
			if (!pending) return;
			this.pending.delete(message.id);
			if (message.error)
				pending.reject(new Error(JSON.stringify(message.error)));
			else pending.resolve(message.result);
			return;
		}
		if (!message.method) return;
		for (const listener of this.listeners.get(message.method) ?? []) listener();
	}

	send<T = unknown>(
		method: string,
		params: Record<string, unknown> = {},
	): Promise<T> {
		return new Promise<T>((send, failed) => {
			const id = this.nextId++;
			this.pending.set(id, {
				resolve: (value) => send(value as T),
				reject: failed,
			});
			this.socket.send(JSON.stringify({ id, method, params }));
		});
	}

	private once(method: string): Promise<void> {
		return new Promise((resolveOnce) => {
			const listener = () => {
				this.listeners.set(
					method,
					(this.listeners.get(method) ?? []).filter(
						(item) => item !== listener,
					),
				);
				resolveOnce();
			};
			this.listeners.set(method, [
				...(this.listeners.get(method) ?? []),
				listener,
			]);
		});
	}

	async evaluate<T = unknown>(expression: string): Promise<T> {
		const result = await this.send<{
			result: { value?: T };
			exceptionDetails?: { exception?: { description?: string } };
		}>("Runtime.evaluate", {
			expression,
			awaitPromise: true,
			returnByValue: true,
		});
		if (result.exceptionDetails) {
			throw new Error(
				result.exceptionDetails.exception?.description ??
					"evaluate failed in the page",
			);
		}
		return result.result.value as T;
	}

	async goto(path: string): Promise<void> {
		const loaded = this.once("Page.loadEventFired");
		await this.send("Page.navigate", { url: `${this.baseUrl}${path}` });
		await loaded;
	}

	async screenshot(): Promise<Bitmap> {
		const { data } = await this.send<{ data: string }>(
			"Page.captureScreenshot",
			{
				format: "png",
				fromSurface: true,
				captureBeyondViewport: false,
			},
		);
		return decodePng(Buffer.from(data, "base64"));
	}

	async close(): Promise<void> {
		try {
			this.socket.close();
		} catch {
			// already closed
		}
		this.process.kill("SIGTERM");
		await Promise.race([
			new Promise<void>((exited) => {
				if (this.process.exitCode !== null) exited();
				else this.process.once("exit", () => exited());
			}),
			sleep(1500),
		]);
		if (this.process.exitCode === null) this.process.kill("SIGKILL");
		await rm(this.profile, { recursive: true, force: true });
	}
}

export function buildRoot(): string {
	return resolve(
		dirname(fileURLToPath(import.meta.url)),
		"..",
		"..",
		"build",
		"client",
	);
}
