import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { postSlugs } from "../../app/content/posts/slugs";
import { PAGES } from "../../app/lib/site";
import { ACCENT_HUES, SCHEMES, STYLES } from "../../app/lib/themes";

export type PlanCombo = { scheme: string; style: string };

export type Plan = {
	skipped: boolean;
	full: boolean;
	reason: string;
	summary: string;
	combos: PlanCombo[];
	routes: string[];
	/** Accent hues to sweep on /theme. The default accent is already a route. */
	accents: string[];
};

const ALL_SCHEMES = SCHEMES.map((scheme) => scheme.id);
const ALL_STYLES = STYLES.map((style) => style.id);
const ALL_ROUTES = [
	...PAGES,
	"/404",
	...postSlugs.map((slug) => `/blog/${slug}`),
];

const IGNORED = [
	/^\.agents\//u,
	/^\.github\//u,
	/^README\.md$/u,
	/^biome\.json$/u,
	/^flake\./u,
	/^\.gitignore$/u,
	/^\.envrc$/u,
	/^t3\.json$/u,
	/^vercel\.json$/u,
	/^scripts\//u,
	/^app\/__tests__\//u,
	/^public\/fonts\//u,
	/^public\/images\//u,
	/^public\/posts\//u,
];

const VISUAL = [
	/^app\//u,
	/^package\.json$/u,
	/^bun\.lock$/u,
	/^vite\.config\.ts$/u,
	/^react-router\.config\.ts$/u,
	/^tsconfig\.json$/u,
	/^postcss\.config/u,
];

const ROUTE_FILES: Record<string, string[]> = {
	"app/routes/home/index.tsx": ["/"],
	"app/routes/blog/index.tsx": ["/", "/blog"],
	"app/routes/blog/post.tsx": [
		"/",
		"/blog",
		...postSlugs.map((slug) => `/blog/${slug}`),
	],
	"app/routes/projects/index.tsx": ["/projects"],
	"app/routes/contact/index.tsx": ["/contact"],
	"app/routes/disclosure/index.tsx": ["/disclosure"],
	"app/routes/theme/index.tsx": ["/theme"],
	"app/routes/__404/index.tsx": ["/404"],
	"app/routes/__404/not_found.tsx": ["/404"],
};

const ALL_COMBOS: PlanCombo[] = ALL_SCHEMES.flatMap((scheme) =>
	ALL_STYLES.map((style) => ({ scheme, style })),
);

function full(reason: string): Plan {
	return {
		skipped: false,
		full: true,
		reason,
		summary: reason,
		combos: ALL_COMBOS,
		routes: ALL_ROUTES,
		accents: [...ACCENT_HUES],
	};
}

function skip(reason: string): Plan {
	return {
		skipped: true,
		full: false,
		reason,
		summary: reason,
		combos: [],
		routes: [],
		accents: [],
	};
}

function git(args: string[]): string | null {
	const result = spawnSync("git", args, { encoding: "utf8" });
	return result.status === 0 ? result.stdout : null;
}

function changedFiles(base: string): string[] | null {
	const output = git(["diff", "--name-only", "-z", `${base}...HEAD`]);
	if (output === null) return null;
	return output.split("\0").filter(Boolean);
}

function changedLines(base: string, file: string): number[] | null {
	const output = git(["diff", "-U0", `${base}...HEAD`, "--", file]);
	if (output === null) return null;
	const lines = new Set<number>();
	for (const line of output.split("\n")) {
		const match = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/u.exec(line);
		if (!match) continue;
		const start = Number(match[1]);
		const count = match[2] === undefined ? 1 : Number(match[2]);
		if (count === 0) lines.add(start);
		else for (let index = 0; index < count; index++) lines.add(start + index);
	}
	return [...lines];
}

type CssBlock = {
	start: number;
	end: number;
	global: boolean;
	schemes: string[];
	styles: string[];
	accents: string[];
};

/** Top-level blocks keyed by the theme axis they own. Nested rules stay in their parent. */
function cssBlocks(css: string): CssBlock[] {
	// Blank out comments, keeping their newlines, so a brace shown inside a
	// comment cannot disturb the scan and line numbers still match the file.
	const text = css.replace(/\/\*[\s\S]*?\*\//gu, (comment) =>
		comment.replace(/[^\n]/gu, " "),
	);
	const lines = text.split("\n");
	const blocks: CssBlock[] = [];
	let selector = "";
	let start = 0;
	let depth = 0;

	const record = (value: string, from: number, to: number) => {
		const schemes = [...value.matchAll(/data-scheme="([^"]+)"/gu)].map(
			(m) => m[1],
		);
		const styles = [...value.matchAll(/data-style="([^"]+)"/gu)].map(
			(m) => m[1],
		);
		const accents = [...value.matchAll(/data-accent="([^"]+)"/gu)].map(
			(m) => m[1],
		);
		if (!schemes.length && !styles.length && !accents.length) return;
		// :root and the bare [data-style] block hold the defaults for a whole
		// axis, so a change there reaches every combination. Split the selector
		// list so a multi-line `:root,` still counts.
		const parts = value.split(",").map((part) => part.trim());
		const root = parts.some((part) => /^:root\b/u.test(part));
		const bareStyle = parts.some((part) =>
			/^\[data-style\]\s*\{?$/u.test(part),
		);
		blocks.push({
			start: from + 1,
			end: to + 1,
			global: root || bareStyle,
			schemes,
			styles,
			accents,
		});
	};

	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		if (depth === 0) {
			selector += ` ${line}`;
			const open = line.indexOf("{");
			if (open === -1) continue;
			start = index;
			depth = 1;
			const rest = line.slice(open + 1);
			for (const char of rest) {
				if (char === "{") depth++;
				else if (char === "}") depth--;
			}
			if (depth === 0) {
				record(selector, start, index);
				selector = "";
			}
		} else {
			for (const char of line) {
				if (char === "{") depth++;
				else if (char === "}") depth--;
			}
			if (depth === 0) {
				record(selector, start, index);
				selector = "";
			}
		}
	}
	return blocks;
}

function routesFor(file: string): string[] | "all" {
	if (file.startsWith("app/content/posts/")) {
		const slug = /^app\/content\/posts\/([^/]+)\.tsx$/u.exec(file)?.[1];
		if (slug && (postSlugs as readonly string[]).includes(slug))
			return ["/", "/blog", `/blog/${slug}`];
		return ["/", "/blog", ...postSlugs.map((value) => `/blog/${value}`)];
	}
	if (file.startsWith("app/content/experiences/")) {
		const name = /^app\/content\/experiences\/([^/]+)\.tsx$/u.exec(file)?.[1];
		if (!name) return "all";
		const importers = postSlugs.filter((slug) => {
			const source = readFileSync(`app/content/posts/${slug}.tsx`, "utf8");
			return source.includes(`experiences/${name}`);
		});
		return importers.length
			? importers.map((slug) => `/blog/${slug}`)
			: ["/blog", ...postSlugs.map((slug) => `/blog/${slug}`)];
	}
	if (file.startsWith("app/content/")) return "all";
	if (file === "app/app.css") return "all";
	if (file === "app/root.tsx") return "all";
	if (file.startsWith("app/components/") || file.startsWith("app/lib/"))
		return "all";
	if (ROUTE_FILES[file]) return ROUTE_FILES[file];
	if (file.startsWith("app/routes/")) return "all";
	return "all";
}

/**
 * Maps the changed files to the color axes and routes they can affect. A post
 * edit audits its own route in every theme. A palette edit audits that palette
 * on every route. A docs or workflow edit audits nothing. Anything shared, or
 * anything the mapper does not recognize, falls back to the full matrix.
 */
export function planFor({
	base,
	fullRun,
}: {
	base?: string;
	fullRun?: boolean;
}): Plan {
	if (fullRun) return full("a push to the default branch");
	if (!base) return full("no base commit was provided");

	const files = changedFiles(base);
	if (files === null)
		return full(
			"the base commit could not be read, so every surface is audited",
		);
	if (files.length === 0) return skip("No files changed.");

	const visual = files.filter(
		(file) =>
			VISUAL.some((pattern) => pattern.test(file)) &&
			!IGNORED.some((pattern) => pattern.test(file)),
	);
	if (visual.length === 0) return skip("No rendered files changed.");

	const combos = new Set<string>();
	const accents = new Set<string>();
	const routes = new Set<string>();
	let everyCombo = false;
	let everyRoute = false;
	let everyAccent = false;
	let css = false;
	let palette = false;

	const add = (scheme: string, style: string) => {
		combos.add(`${scheme}/${style}`);
	};
	const addScheme = (scheme: string) => {
		for (const style of ALL_STYLES) add(scheme, style);
	};
	const addStyle = (style: string) => {
		for (const scheme of ALL_SCHEMES) add(scheme, style);
	};

	for (const file of visual) {
		if (file === "app/app.css") {
			css = true;
			const lines = changedLines(base, file);
			if (!lines || lines.length === 0) {
				everyCombo = everyAccent = true;
				continue;
			}
			const blocks = cssBlocks(readFileSync(file, "utf8"));
			for (const line of lines) {
				const block = blocks.find(
					(item) => line >= item.start && line <= item.end,
				);
				if (!block || block.global) {
					everyCombo = everyAccent = true;
					continue;
				}
				for (const id of block.schemes) {
					addScheme(id);
					palette = true;
				}
				for (const id of block.styles) {
					addStyle(id);
					palette = true;
				}
				for (const id of block.accents) {
					// An accent is used as text and as a fill across every
					// combination, so its theme page is the surface to check.
					everyCombo = true;
					accents.add(id);
					routes.add("/theme");
				}
			}
			continue;
		}

		if (file === "app/lib/themes.ts") {
			everyCombo = everyRoute = everyAccent = true;
			continue;
		}

		const chosen = routesFor(file);
		if (chosen === "all") {
			everyRoute = true;
			everyCombo = everyAccent = true;
		} else {
			for (const route of chosen) routes.add(route);
			// A page renders in every theme, so its change reaches every combo.
			everyCombo = true;
			if (chosen.includes("/theme")) everyAccent = true;
		}
	}

	if (css) {
		everyRoute = true;
		if (palette) everyAccent = true;
	}
	if (!combos.size && !everyCombo) everyCombo = true;
	if (!routes.size) everyRoute = true;

	const resolvedCombos: PlanCombo[] = everyCombo
		? ALL_COMBOS
		: [...combos].map((key) => {
				const [scheme, style] = key.split("/");
				return { scheme, style };
			});
	const resolvedRoutes = everyRoute ? ALL_ROUTES : [...routes];
	const resolvedAccents = everyAccent ? [...ACCENT_HUES] : [...accents];
	const schemes = new Set(resolvedCombos.map((combo) => combo.scheme));
	const styles = new Set(resolvedCombos.map((combo) => combo.style));

	const isFull =
		resolvedCombos.length === ALL_COMBOS.length &&
		resolvedRoutes.length === ALL_ROUTES.length &&
		resolvedAccents.length === ACCENT_HUES.length;

	return {
		skipped: false,
		full: isFull,
		reason: "",
		summary: [
			`${schemes.size}/${ALL_SCHEMES.length} schemes`,
			`${styles.size}/${ALL_STYLES.length} styles`,
			`${resolvedRoutes.length}/${ALL_ROUTES.length} routes`,
			resolvedAccents.length
				? `${resolvedAccents.length} accent${resolvedAccents.length === 1 ? "" : "s"} on /theme`
				: "no accent sweep",
		].join(", "),
		combos: resolvedCombos,
		routes: resolvedRoutes,
		accents: resolvedAccents,
	};
}

export function fullPlan(reason: string): Plan {
	return full(reason);
}
