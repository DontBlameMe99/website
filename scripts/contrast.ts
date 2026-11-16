import { appendFile, readFile, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import { SITE } from "../app/lib/site";
import { DEFAULT_PREFS, SCHEMES, STYLES } from "../app/lib/themes";
import { buildRoot, Chrome, serveStatic } from "./contrast/browser";
import {
	composite,
	contrastRatio,
	formatRatio,
	hex,
	measureInk,
	medianColor,
	parseColor,
	type Rgb,
	requirements,
} from "./contrast/measure";
import { fullPlan, type Plan, planFor } from "./contrast/plan";
import {
	finishAnimations,
	restorePinned,
	type Scan,
	scanPage,
	setHover,
	setTextHidden,
	setTextMask,
	unpinSticky,
} from "./contrast/scan";

const VIEWPORT = { width: 1280, height: 1600 };
// Backgrounds are smooth, so they survive a smaller raster. Text color comes
// from computed style, not from the glyph pixels, so the sample only needs to
// locate ink and read the surface behind it.
const SCALE = 0.5;
// The mask frame paints every glyph in this color. It is far enough from any
// page color to detect ink even when the text and its background match.
const MASK_A_COLOR = "#ff00ff";
const MASK_B_COLOR = "#00ff00";
const MASK_A: Rgb = { r: 255, g: 0, b: 255 };
const MASK_B: Rgb = { r: 0, g: 255, b: 0 };
const IMAGE = {
	width: Math.round(VIEWPORT.width * SCALE),
	height: Math.round(VIEWPORT.height * SCALE),
};
type State = "base" | "hover";

type Combo = {
	mode: "dark" | "light";
	scheme: string;
	style: string;
	label: string;
};

type Finding = {
	combo: string;
	page: string;
	state: State;
	element: string;
	text: string;
	at: { x: number; y: number };
	fg: string;
	bg: string;
	ratio: number;
	aa: number;
	aaa: number;
	large: boolean;
	note?: string;
};

type Job = { combo: Combo; page: string; accent: string };

type Coverage = Record<string, { pages: number; runs: number }>;

type Result = {
	findings: Finding[];
	errors: string[];
	notes: string[];
	runs: number;
	coverage: Coverage;
};

const only = process.env.CONTRAST_ONLY;
const shard = process.env.CONTRAST_SHARD;
const plan: Plan = only
	? fullPlan("CONTRAST_ONLY is set")
	: process.env.CONTRAST_PLAN
		? JSON.parse(await readFile(process.env.CONTRAST_PLAN, "utf8"))
		: planFor({
				base: process.env.CONTRAST_BASE,
				fullRun: process.env.CONTRAST_FULL === "1",
			});

const combos: Combo[] = plan.combos.map(({ scheme: schemeId, style }) => {
	const scheme = SCHEMES.find((item) => item.id === schemeId);
	if (!scheme)
		throw new Error(`The plan names an unknown scheme: "${schemeId}"`);
	if (!STYLES.some((item) => item.id === style))
		throw new Error(`The plan names an unknown style: "${style}"`);
	return {
		mode: scheme.mode,
		scheme: scheme.id,
		style,
		label: `${scheme.id}/${style}`,
	};
});

// CI splits the plan across runners. Each shard owns a slice of the combos and
// audits every selected route for it.
let selected = combos;
if (shard) {
	const [index, count] = shard.split("/").map(Number);
	if (!index || !count || index > count)
		throw new Error(`CONTRAST_SHARD must be <1..n>/<n>, got "${shard}"`);
	selected = combos.filter((_, comboIndex) => comboIndex % count === index - 1);
}

const defaultAccent =
	DEFAULT_PREFS.accent.kind === "hue" ? DEFAULT_PREFS.accent.hue : "mauve";
const accentJobs = plan.accents.filter((hue) => hue !== defaultAccent);
const jobs: Job[] = selected
	.flatMap((combo) => [
		...plan.routes.map((page) => ({ combo, page, accent: defaultAccent })),
		// Every other accent hue is a real choice in the picker. /theme is where
		// the accent appears as text and as an on-accent fill, so one pass there
		// per hue covers the color the user can actually pick.
		...accentJobs.map((hue) => ({
			combo: { ...combo, label: `${combo.label}@${hue}` },
			page: "/theme",
			accent: hue,
		})),
	])
	.filter((job) => !only || `${job.combo.label} ${job.page}`.includes(only));

type Report = {
	version: number;
	shard: string | null;
	plan: Plan;
	durationSeconds: number;
	coverage: Coverage;
	findings: Finding[];
	errors: string[];
	notes: string[];
	runs: number;
	pages: number;
};

async function writeReport(report: Report) {
	if (!process.env.CONTRAST_JSON) return;
	await writeFile(
		process.env.CONTRAST_JSON,
		`${JSON.stringify(report, null, "\t")}\n`,
	);
}

if (plan.skipped) {
	await writeReport({
		version: 1,
		shard: shard ?? null,
		plan,
		durationSeconds: 0,
		coverage: {},
		findings: [],
		errors: [],
		notes: [],
		runs: 0,
		pages: 0,
	});
	console.log(`WCAG contrast: skipped. ${plan.reason}`);
	process.exit(0);
}
if (combos.length === 0)
	throw new Error("The plan has no combinations to audit");
if (plan.routes.length === 0)
	throw new Error("The plan has no routes to audit");
if (jobs.length === 0) {
	if (only) throw new Error(`CONTRAST_ONLY="${only}" matched no jobs`);
	await writeReport({
		version: 1,
		shard: shard ?? null,
		plan,
		durationSeconds: 0,
		coverage: {},
		findings: [],
		errors: [],
		notes: [],
		runs: 0,
		pages: 0,
	});
	console.log("WCAG contrast: no jobs in this shard.");
	process.exit(0);
}

const progress = { done: 0, total: jobs.length };
const frame = `new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))`;

async function settle(chrome: Chrome): Promise<void> {
	await chrome.evaluate(`(async () => {
		await document.fonts.ready;
		const step = window.innerHeight * 0.85;
		const images = () =>
			Promise.all(
				Array.from(document.images).map((img) =>
					img.complete
						? 0
						: new Promise((resolve) => {
								img.addEventListener("load", resolve, { once: true });
								img.addEventListener("error", resolve, { once: true });
								setTimeout(resolve, 3000);
							}),
				),
			);
		// Lazy images only start once they are near the viewport, and each one
		// can change the page height. Walk the page, wait for what that starts,
		// and repeat until the height holds.
		for (let pass = 0; pass < 4; pass++) {
			const height = document.documentElement.scrollHeight;
			for (let y = 0; y < height; y += step) {
				window.scrollTo(0, y);
				await ${frame};
			}
			await images();
			await new Promise((resolve) => setTimeout(resolve, 120));
			if (document.documentElement.scrollHeight === height) break;
		}
		window.scrollTo(0, 0);
		await ${frame};
		let last = -1;
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 80));
			const height = document.documentElement.scrollHeight;
			if (height === last) break;
			last = height;
		}
		(${finishAnimations.toString()})();
		await new Promise((resolve) => setTimeout(resolve, 100));
		return document.documentElement.scrollHeight;
	})()`);
}

async function prepareJob(
	chrome: Chrome,
	combo: Combo,
	page: string,
	accent: string,
) {
	const prefs = {
		mode: combo.mode,
		style: combo.style,
		darkScheme: combo.mode === "dark" ? combo.scheme : DEFAULT_PREFS.darkScheme,
		lightScheme:
			combo.mode === "light" ? combo.scheme : DEFAULT_PREFS.lightScheme,
	};
	await chrome.evaluate(`(() => {
		localStorage.setItem("dbm-theme", ${JSON.stringify(prefs.mode)});
		localStorage.setItem("dbm-style", ${JSON.stringify(prefs.style)});
		localStorage.setItem("dbm-dark-scheme", ${JSON.stringify(prefs.darkScheme)});
		localStorage.setItem("dbm-light-scheme", ${JSON.stringify(prefs.lightScheme)});
		localStorage.setItem("dbm-accent", ${JSON.stringify(accent)});
	})()`);

	await chrome.goto(page);
	await chrome.evaluate(`(async () => {
		const root = document.documentElement;
		const want = {
			style: ${JSON.stringify(prefs.style)},
			scheme: ${JSON.stringify(combo.mode === "dark" ? prefs.darkScheme : prefs.lightScheme)},
			mode: ${JSON.stringify(prefs.mode)},
			accent: ${JSON.stringify(accent)},
		};
		const applied = () =>
			root.dataset.style === want.style &&
			root.dataset.scheme === want.scheme &&
			root.dataset.accent === want.accent &&
			root.classList.contains(want.mode);
		const hydrated = () => {
			const main = document.querySelector("#main-content");
			return !!main && Object.keys(main).some((key) => key.startsWith("__reactFiber$"));
		};
		for (let i = 0; i < 160; i++) {
			if (applied() && hydrated()) return true;
			await new Promise((resolve) => setTimeout(resolve, 25));
		}
		if (applied()) return true;
		throw new Error("the page never applied the requested theme");
	})()`);
	await settle(chrome);
	await chrome.evaluate(`(${unpinSticky.toString()})()`);
	await chrome.evaluate(`(async () => { await ${frame}; return true })()`);
}

function scrollPositions(height: number, header: number): number[] {
	const step = Math.max(120, VIEWPORT.height - header);
	const max = Math.max(0, height - VIEWPORT.height);
	if (max === 0) return [0];
	const positions: number[] = [];
	for (let y = 0; y < max; y += step) positions.push(y);
	positions.push(max);
	return positions;
}

function toImage(rect: { x: number; y: number; w: number; h: number }) {
	// Round inward, so a sub-pixel of a neighbouring inline box's background
	// cannot leak into the sample at the edge of a run.
	const x = Math.ceil(rect.x * SCALE);
	const y = Math.ceil(rect.y * SCALE);
	const right = Math.floor((rect.x + rect.w) * SCALE);
	const bottom = Math.floor((rect.y + rect.h) * SCALE);
	return {
		x,
		y,
		w: Math.max(0, right - x),
		h: Math.max(0, bottom - y),
	};
}

function toImageOuter(rect: { x: number; y: number; w: number; h: number }) {
	const x = Math.floor(rect.x * SCALE);
	const y = Math.floor(rect.y * SCALE);
	const right = Math.ceil((rect.x + rect.w) * SCALE);
	const bottom = Math.ceil((rect.y + rect.h) * SCALE);
	return {
		x,
		y,
		w: Math.max(1, right - x),
		h: Math.max(1, bottom - y),
	};
}

function clampRect(
	rect: { x: number; y: number; w: number; h: number },
	width: number,
	height: number,
) {
	const x = Math.max(0, rect.x);
	const y = Math.max(0, rect.y);
	const right = Math.min(width, rect.x + rect.w);
	const bottom = Math.min(height, rect.y + rect.h);
	if (right - x < 1 || bottom - y < 1) return null;
	return { x, y, w: right - x, h: bottom - y };
}

function claim(
	mask: Uint8Array,
	width: number,
	height: number,
	rect: { x: number; y: number; w: number; h: number },
	pad: number,
) {
	const x0 = Math.max(0, Math.floor(rect.x - pad));
	const y0 = Math.max(0, Math.floor(rect.y - pad));
	const x1 = Math.min(width, Math.ceil(rect.x + rect.w + pad));
	const y1 = Math.min(height, Math.ceil(rect.y + rect.h + pad));
	for (let y = y0; y < y1; y++) mask.fill(1, y * width + x0, y * width + x1);
}

function maxChannelDiff(
	visible: { width: number; data: Uint8Array },
	hidden: { width: number; data: Uint8Array },
	index: number,
): number {
	const i = index * 4;
	return Math.max(
		Math.abs(visible.data[i] - hidden.data[i]),
		Math.abs(visible.data[i + 1] - hidden.data[i + 1]),
		Math.abs(visible.data[i + 2] - hidden.data[i + 2]),
	);
}

type Measured = { ratio: number; fg: Rgb; bg: Rgb; note?: string };

async function auditState(
	chrome: Chrome,
	scan: Scan,
	state: State,
	page: string,
	combo: Combo,
	record: (finding: Finding) => void,
	errors: string[],
	notes: string[],
) {
	const width = IMAGE.width;
	const height = IMAGE.height;
	const mask = new Uint8Array(width * height);
	const cssHeight = VIEWPORT.height;
	const results = new Map<number, Measured>();
	const pseudoResults = new Map<number, Measured>();

	for (const position of scrollPositions(scan.height, scan.headerBottom)) {
		const regionTop = position > 0 ? position + scan.headerBottom : position;
		const regionBottom = Math.min(position + cssHeight, scan.height);
		await chrome.evaluate(
			`(async () => { window.scrollTo(0, ${position}); await ${frame}; (${finishAnimations.toString()})(); await ${frame}; return true })()`,
		);
		// A lazy image can start loading when this tile scrolls into view. It
		// would paint between the two frames and be mistaken for text ink.
		const imagesReady = await chrome.evaluate<boolean>(`(async () => {
			const pending = () => Array.from(document.images).filter((img) => !img.complete);
			if (!pending().length) return true;
			await Promise.race([
				Promise.all(pending().map((img) => new Promise((resolve) => {
					img.addEventListener("load", resolve, { once: true });
					img.addEventListener("error", resolve, { once: true });
				}))),
				new Promise((resolve) => setTimeout(resolve, 5000)),
			]);
			return pending().length === 0;
		})()`);
		if (!imagesReady) {
			errors.push(
				`${combo.label} ${page} ${state} at scroll ${position}: an image did not finish loading`,
			);
			continue;
		}
		await chrome.evaluate(
			`(async () => { (${setTextHidden.toString()})(true); await ${frame}; (${finishAnimations.toString()})(); await ${frame}; return true })()`,
		);
		const hidden = await chrome.screenshot();
		await chrome.evaluate(
			`(async () => { (${setTextHidden.toString()})(false); (${setTextMask.toString()})(${JSON.stringify(
				MASK_A_COLOR,
			)}); await ${frame}; return true })()`,
		);
		const maskA = await chrome.screenshot();
		await chrome.evaluate(
			`(async () => { (${setTextMask.toString()})(${JSON.stringify(
				MASK_B_COLOR,
			)}); await ${frame}; return true })()`,
		);
		const maskB = await chrome.screenshot();
		await chrome.evaluate(
			`(async () => { (${setTextMask.toString()})(null); return true })()`,
		);

		const bad = [hidden, maskA, maskB].find(
			(shot) => shot.width !== width || shot.height !== height,
		);
		if (bad) {
			errors.push(
				`${combo.label} ${page} ${state}: screenshot is ${bad.width}x${bad.height}, expected ${width}x${height}`,
			);
			continue;
		}

		mask.fill(0);
		const region = { top: regionTop, bottom: regionBottom };

		const measure = (
			rect: { x: number; y: number; w: number; h: number },
			color: string,
			alpha: number,
			ignore: Uint8Array | undefined,
			fallback: boolean,
			background: string | null,
		): Measured | null => {
			const parsed = parseColor(color);
			if (!parsed) {
				errors.push(
					`${combo.label} ${page} ${state}: cannot parse color "${color}"`,
				);
				return null;
			}
			const effective = parsed.a * alpha;
			const fg: Rgb = { r: parsed.r, g: parsed.g, b: parsed.b };
			const fill = background ? parseColor(background) : null;
			if (fill && fill.a >= 1) {
				const bg = { r: fill.r, g: fill.g, b: fill.b };
				const ink = effective < 1 ? composite(fg, bg, effective) : fg;
				return { ratio: contrastRatio(ink, bg), fg, bg };
			}
			const local = clampRect(toImage(rect), width, height);
			if (!local) return null;
			const ink = measureInk(
				[
					{ image: maskA, color: MASK_A },
					{ image: maskB, color: MASK_B },
				],
				hidden,
				local,
				fg,
				effective,
				ignore,
			);
			if (ink) return { ratio: ink.contrast, fg, bg: ink.bg };
			// A clipped or overlapped rect can lose its ink to something painted
			// above it. Only a fully visible box can prove text is invisible.
			if (!fallback) return null;
			const backdrop = medianColor(hidden, local);
			if (!backdrop) return null;
			const rendered = effective < 1 ? composite(fg, backdrop, effective) : fg;
			return {
				ratio: contrastRatio(rendered, backdrop),
				fg: rendered,
				bg: backdrop,
				note: "no text ink painted",
			};
		};

		const viewportRect = (item: {
			rect: { x: number; y: number; w: number; h: number };
			pinned: boolean;
			clipped: boolean;
		}) => {
			if (item.pinned) {
				// The sticky header paints at the same viewport position on every
				// tile, including the translucent backdrop behind it.
				return { rect: item.rect, complete: !item.clipped };
			}
			const top = Math.max(item.rect.y, region.top);
			const bottom = Math.min(item.rect.y + item.rect.h, region.bottom);
			if (bottom - top < 0.5) return null;
			const rect = {
				x: item.rect.x,
				y: top - position,
				w: item.rect.w,
				h: bottom - top,
			};
			return {
				rect,
				complete:
					!item.clipped &&
					rect.y >= 0 &&
					rect.x >= 0 &&
					rect.y + rect.h <= cssHeight &&
					rect.x + rect.w <= VIEWPORT.width &&
					rect.h >= item.rect.h - 0.5,
			};
		};

		for (const run of scan.runs) {
			const view = viewportRect(run);
			if (!view) continue;
			const local = clampRect(toImageOuter(view.rect), width, height);
			// Underlines hang below the line box and disappear with the text
			// fill, so claim a skirt around the run as well.
			if (local)
				claim(
					mask,
					width,
					height,
					{ x: local.x - 3, y: local.y - 4, w: local.w + 6, h: local.h + 14 },
					0,
				);
			const measured = measure(
				view.rect,
				run.color,
				run.alpha,
				undefined,
				view.complete,
				run.background,
			);
			if (process.env.CONTRAST_TRACE === run.text) {
				console.log(
					"TRACE",
					state,
					position,
					JSON.stringify(run.rect),
					JSON.stringify(view.rect),
					view.complete,
					JSON.stringify(measured),
				);
			}
			if (!measured) continue;
			const previous = results.get(run.id);
			if (!previous || measured.ratio < previous.ratio) {
				results.set(run.id, measured);
			}
		}

		for (const pseudo of scan.pseudos) {
			const view = viewportRect(pseudo);
			if (!view) continue;
			const measured = measure(
				view.rect,
				pseudo.color,
				pseudo.alpha,
				mask,
				false,
				pseudo.background,
			);
			if (measured) {
				const previous = pseudoResults.get(pseudo.id);
				if (!previous || measured.ratio < previous.ratio) {
					pseudoResults.set(pseudo.id, measured);
				}
			}
			const local = clampRect(toImageOuter(view.rect), width, height);
			if (local) claim(mask, width, height, local, 2);
		}

		// Text pixels left unclaimed mean the scanner missed a surface. A big
		// cluster fails the audit; a handful of stray pixels at a clip edge is
		// noted instead. The first rows sit against the clipped sticky-header
		// edge, where antialiased slivers belong to the previous tile's overlap.
		const from = Math.max(0, Math.ceil((region.top - position) * SCALE) + 2);
		const to = Math.min(height, Math.ceil((region.bottom - position) * SCALE));
		let leftover = 0;
		let first: { x: number; y: number } | null = null;
		for (let y = from; y < to; y++) {
			for (let x = 0; x < width; x++) {
				const index = y * width + x;
				if (mask[index]) continue;
				if (
					Math.max(
						maxChannelDiff(maskA, hidden, index),
						maxChannelDiff(maskB, hidden, index),
					) <= 3
				)
					continue;
				leftover++;
				if (!first) first = { x: x / SCALE, y: position + y / SCALE };
			}
		}
		// Glyph ink forms clusters, so a few stray raster pixels at a clip edge
		// are noise. A real missed run is an order of magnitude larger.
		if (leftover > 10 && first) {
			const near = await chrome.evaluate<string>(`(() => {
				const stack = document.elementsFromPoint(${Math.round(first.x)}, ${Math.round(first.y - position)});
				return stack.slice(0, 3).map((el) =>
					el.tagName.toLowerCase() + "." + String(el.getAttribute("class") || "").split(/\\s+/).slice(0, 3).join(".")
				).join(" < ");
			})()`);
			const message = `${combo.label} ${page} ${state} at scroll ${position}: ${leftover} text pixels were not attributed to any element (first at ${Math.round(first.x)},${Math.round(first.y)} in ${near})`;
			if (leftover > 120) errors.push(message);
			else notes.push(message);
		}
	}

	const report = (
		measured: Measured | undefined,
		size: number,
		weight: number,
		element: string,
		text: string,
		at: { x: number; y: number },
	) => {
		if (!measured) return;
		const { aa, aaa, large } = requirements(size, weight);
		if (measured.ratio >= aaa) return;
		record({
			combo: combo.label,
			page,
			state,
			element,
			text,
			at,
			fg: hex(measured.fg),
			bg: hex(measured.bg),
			ratio: measured.ratio,
			aa,
			aaa,
			large,
			note: measured.note,
		});
	};

	for (const run of scan.runs) {
		report(results.get(run.id), run.size, run.weight, run.element, run.text, {
			x: run.rect.x,
			y: run.rect.y,
		});
	}
	for (const pseudo of scan.pseudos) {
		report(
			pseudoResults.get(pseudo.id),
			pseudo.size,
			pseudo.weight,
			pseudo.element,
			pseudo.label,
			{ x: pseudo.rect.x, y: pseudo.rect.y },
		);
	}
}

async function worker(baseUrl: string, assigned: Job[]): Promise<Result> {
	const chrome = await Chrome.launch(baseUrl, VIEWPORT, SCALE);
	const findings: Finding[] = [];
	const errors: string[] = [];
	const notes: string[] = [];
	const seen = new Set<string>();
	const coverage: Coverage = {};
	let runs = 0;

	const record = (finding: Finding) => {
		const key = [
			finding.combo,
			finding.page,
			finding.state,
			finding.element,
			finding.text,
			finding.fg,
			finding.bg,
		].join("\u0000");
		if (seen.has(key)) return;
		seen.add(key);
		findings.push(finding);
	};

	try {
		try {
			await chrome.goto("/");
		} catch (error) {
			errors.push(
				`initial page: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
		for (const job of assigned) {
			const started = performance.now();
			let failed = false;
			try {
				await prepareJob(chrome, job.combo, job.page, job.accent);

				const baseScan = await chrome.evaluate<Scan>(
					`(${scanPage.toString()})()`,
				);
				await auditState(
					chrome,
					baseScan,
					"base",
					job.page,
					job.combo,
					record,
					errors,
					notes,
				);

				await chrome.evaluate(
					`(async () => { window.scrollTo(0, 0); await ${frame}; (${setHover.toString()})(true); await ${frame}; (${finishAnimations.toString()})(); await ${frame}; return true })()`,
				);
				const hoverScan = await chrome.evaluate<Scan>(
					`(${scanPage.toString()})()`,
				);
				await auditState(
					chrome,
					hoverScan,
					"hover",
					job.page,
					job.combo,
					record,
					errors,
					notes,
				);

				const measured = baseScan.runs.length + hoverScan.runs.length;
				runs += measured;
				const entry = coverage[job.combo.label] ?? { pages: 0, runs: 0 };
				entry.pages += 1;
				entry.runs += measured;
				coverage[job.combo.label] = entry;
			} catch (error) {
				failed = true;
				errors.push(
					`${job.combo.label} ${job.page}: ${error instanceof Error ? error.message : String(error)}`,
				);
			} finally {
				try {
					await chrome.evaluate(`(${setHover.toString()})(false)`);
				} catch {
					// the browser may already be gone
				}
				try {
					await chrome.evaluate(`(${restorePinned.toString()})()`);
				} catch {
					// the browser may already be gone
				}
				progress.done++;
				const seconds = ((performance.now() - started) / 1000).toFixed(1);
				const below = findings.filter(
					(item) =>
						item.page === job.page &&
						item.combo === job.combo.label &&
						item.ratio < item.aa,
				).length;
				console.log(
					`[${String(progress.done).padStart(3)}/${progress.total}] ${job.combo.label} ${job.page} ${seconds}s${below ? ` (${below} below AA)` : ""}${failed ? " (error)" : ""}`,
				);
			}
		}
	} finally {
		await chrome.close();
	}

	return { findings, errors, notes, runs, coverage };
}

// ---------------------------------------------------------------------------

const server = await serveStatic(buildRoot());
const baseUrl = `http://127.0.0.1:${server.port}`;

const requested = Number(process.env.CONTRAST_WORKERS ?? 0);
const workerCount = Math.max(
	1,
	Math.min(
		jobs.length,
		requested ||
			Math.min(4, Math.max(1, Math.floor(availableParallelism() / 2))),
	),
);

console.log(
	`WCAG contrast: ${plan.summary}; ${combos.length} scheme/style combinations, ${jobs.length} renders, at ${VIEWPORT.width}x${VIEWPORT.height}, ${workerCount} worker${workerCount === 1 ? "" : "s"}`,
);

const started = performance.now();
const results = await Promise.all(
	Array.from({ length: workerCount }, (_, index) =>
		worker(
			baseUrl,
			jobs.filter((_, jobIndex) => jobIndex % workerCount === index),
		),
	),
);

await server.stop();

const findings = results.flatMap((result) => result.findings);
const errors = results.flatMap((result) => result.errors);
const notes = results.flatMap((result) => result.notes);
const runs = results.reduce((sum, result) => sum + result.runs, 0);
const coverage: Coverage = {};
for (const result of results) {
	for (const [label, value] of Object.entries(result.coverage)) {
		const entry = coverage[label] ?? { pages: 0, runs: 0 };
		entry.pages += value.pages;
		entry.runs += value.runs;
		coverage[label] = entry;
	}
}

const belowAa = findings
	.filter((finding) => finding.ratio < finding.aa)
	.sort((a, b) => a.ratio - b.ratio);
const aaaPairs = new Map<string, Finding>();
for (const finding of findings) {
	if (finding.ratio < finding.aa) continue;
	const key = [finding.combo, finding.state, finding.fg, finding.bg].join(
		"\u0000",
	);
	const previous = aaaPairs.get(key);
	if (!previous || finding.ratio < previous.ratio) aaaPairs.set(key, finding);
}
const belowAaa = [...aaaPairs.values()].sort((a, b) => a.ratio - b.ratio);

const seconds = ((performance.now() - started) / 1000).toFixed(1);
await writeReport({
	version: 1,
	shard: shard ?? null,
	plan,
	durationSeconds: Number(seconds),
	coverage,
	findings,
	errors,
	notes,
	runs,
	pages: jobs.length,
});

const summary: string[] = [
	`Checked ${runs.toLocaleString("en-US")} text runs in ${jobs.length} page renders in ${seconds}s.`,
];

if (errors.length) {
	summary.push("", `Audit errors (${errors.length}):`);
	for (const error of errors.slice(0, 20)) summary.push(`  ${error}`);
	if (errors.length > 20) summary.push(`  … and ${errors.length - 20} more`);
}

if (belowAa.length) {
	summary.push("", `${belowAa.length} combinations are below WCAG AA:`);
	for (const finding of belowAa.slice(0, 80)) {
		summary.push(
			`  ${finding.combo} ${finding.page} [${finding.state}] ${finding.element} "${finding.text}" @${Math.round(finding.at.x)},${Math.round(finding.at.y)} ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)} (needs ${finding.aa}:1${finding.large ? ", large text" : ""})${finding.note ? ` [${finding.note}]` : ""}`,
		);
	}
	if (belowAa.length > 80) summary.push(`  … and ${belowAa.length - 80} more`);
} else if (!errors.length) {
	summary.push("Every checked text run meets WCAG AA.");
}

if (notes.length) {
	summary.push(
		"",
		`${notes.length} tiles had a few unattributed text pixels (raster edges, not counted as failures):`,
	);
	for (const note of notes.slice(0, 10)) summary.push(`  ${note}`);
	if (notes.length > 10) summary.push(`  … and ${notes.length - 10} more`);
}

if (belowAaa.length) {
	summary.push(
		"",
		`${belowAaa.length} color pairs meet AA but are below AAA. Warnings only:`,
	);
	for (const finding of belowAaa.slice(0, 20)) {
		summary.push(
			`  ${finding.combo} ${finding.page} [${finding.state}] ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)} (AAA needs ${finding.aaa}:1)`,
		);
	}
	if (belowAaa.length > 20)
		summary.push(`  … and ${belowAaa.length - 20} more`);
}

console.log("");
for (const line of summary) console.log(line);

const escapeAnnotation = (value: string) =>
	value.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
const annotate = (
	level: "error" | "warning",
	title: string,
	message: string,
) => {
	console.log(
		`::${level} title=${escapeAnnotation(title)}::${escapeAnnotation(message)}`,
	);
};
for (const finding of belowAa.slice(0, 20)) {
	annotate(
		"error",
		`WCAG AA: ${finding.combo} ${finding.page}`,
		`${finding.element} "${finding.text}": ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)}, needs ${finding.aa}:1`,
	);
}
for (const finding of belowAaa.slice(0, 10)) {
	annotate(
		"warning",
		`WCAG AAA: ${finding.combo} ${finding.page}`,
		`${finding.element} "${finding.text}": ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)}, AAA needs ${finding.aaa}:1`,
	);
}

if (process.env.GITHUB_STEP_SUMMARY) {
	const markdown = [
		"### WCAG contrast",
		"",
		`${SITE.name}: ${plan.summary}; ${jobs.length} page renders, base and hover.`,
		"",
		...summary.map((line) =>
			line.startsWith("  ") ? `- \`${line.trim()}\`` : line,
		),
		"",
	];
	await appendFile(process.env.GITHUB_STEP_SUMMARY, `${markdown.join("\n")}\n`);
}

if (errors.length || belowAa.length) process.exit(1);
