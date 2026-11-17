import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MARKER = "<!-- wcag-contrast-report -->";
const STYLE_ORDER = ["neobrutalist", "flat", "glassmorphism", "xp"];

const args = process.argv.slice(2);
const dir = args[0] ?? "reports";
const outIndex = args.indexOf("--out");
const out = outIndex === -1 ? "comment.md" : args[outIndex + 1];
const resultIndex = args.indexOf("--result");
const resultPath = resultIndex === -1 ? "result.txt" : args[resultIndex + 1];
const shardsIndex = args.indexOf("--shards");
const expected = shardsIndex === -1 ? 0 : Number(args[shardsIndex + 1]);

const number = (value) => value.toLocaleString("en-US");
const ratio = (value) => `${(Math.floor(value * 100) / 100).toFixed(2)}:1`;
const clean = (value, limit = 80) =>
	String(value)
		.replace(/\\/gu, "\\\\")
		.replace(/\|/gu, "\\|")
		.replace(/[\r\n]+/gu, " ")
		.slice(0, limit);

function readReports() {
	let names = [];
	try {
		names = readdirSync(dir).filter((name) => name.endsWith(".json"));
	} catch {
		return [];
	}
	const reports = [];
	for (const name of names) {
		try {
			reports.push(JSON.parse(readFileSync(join(dir, name), "utf8")));
		} catch {
			// A truncated artifact is treated as a missing shard by the caller.
		}
	}
	return reports;
}

const reports = readReports();
const plans = reports.map((report) => report.plan).filter(Boolean);
const plan = plans[0] ?? null;
const skipped = plans.length > 0 && plans.every((item) => item.skipped);
const runs = reports.reduce((total, report) => total + (report.runs ?? 0), 0);
const pages = reports.reduce((total, report) => total + (report.pages ?? 0), 0);
const coverage = {};
const findings = new Map();
const errors = new Set();
const notes = new Set();

for (const report of reports) {
	for (const [label, value] of Object.entries(report.coverage ?? {})) {
		const entry = coverage[label] ?? { pages: 0, runs: 0 };
		entry.pages += value.pages;
		entry.runs += value.runs;
		coverage[label] = entry;
	}
	for (const finding of report.findings ?? []) {
		const key = [
			finding.combo,
			finding.page,
			finding.state,
			finding.element,
			finding.text,
			finding.fg,
			finding.bg,
		].join("\u0000");
		const previous = findings.get(key);
		if (!previous || finding.ratio < previous.ratio) findings.set(key, finding);
	}
	for (const error of report.errors ?? []) errors.add(error);
	for (const note of report.notes ?? []) notes.add(note);
}

const all = [...findings.values()];
const below = all.sort((a, b) => a.ratio - b.ratio);

// Collapse repeats of the same colors so the count and the gate agree.
const belowPairs = new Map();
for (const finding of below) {
	const key = [finding.combo, finding.state, finding.fg, finding.bg].join(
		"\u0000",
	);
	if (!belowPairs.has(key)) belowPairs.set(key, finding);
}

const styleOf = (combo) => combo.split("/")[1]?.split("@")[0] ?? combo;
const schemeOf = (combo) => combo.split("/")[0] ?? combo;
const styleRows = new Map();
for (const [label, value] of Object.entries(coverage)) {
	const style = styleOf(label);
	const row = styleRows.get(style) ?? {
		style,
		schemes: new Set(),
		renders: 0,
		runs: 0,
		failures: 0,
	};
	row.schemes.add(schemeOf(label));
	row.renders += value.pages;
	row.runs += value.runs;
	styleRows.set(style, row);
}
for (const finding of belowPairs.values()) {
	const row = styleRows.get(styleOf(finding.combo));
	if (row) row.failures++;
}
const orderedStyles = [...styleRows.values()].sort(
	(a, b) =>
		(STYLE_ORDER.indexOf(a.style) === -1 ? 99 : STYLE_ORDER.indexOf(a.style)) -
		(STYLE_ORDER.indexOf(b.style) === -1 ? 99 : STYLE_ORDER.indexOf(b.style)),
);

const missing = expected > 0 && reports.length < expected;
const status =
	belowPairs.size || errors.size || missing || reports.length === 0
		? "fail"
		: "pass";
const icon = status === "fail" ? "❌" : "✅";
const headline =
	reports.length === 0
		? "No audit report was uploaded."
		: missing
			? `Only ${reports.length} of ${expected} shard reports arrived.`
			: skipped
				? "No rendered files changed. Nothing to audit."
				: errors.size
					? `The audit hit ${number(errors.size)} error${errors.size === 1 ? "" : "s"}.`
					: belowPairs.size
						? `${number(belowPairs.size)} color pair${belowPairs.size === 1 ? " is" : "s are"} below WCAG AAA.`
						: `All ${number(runs)} text runs in ${number(pages)} page renders meet WCAG AAA.`;

const lines = [
	MARKER,
	"### WCAG contrast audit",
	"",
	`${icon} ${headline}`,
	"",
];

if (plan) {
	lines.push(
		skipped
			? `Scope: ${plan.reason}`
			: plan.full
				? "Scope: every scheme, style, route, and accent."
				: `Scope: ${plan.summary}. Only the affected surfaces were audited.`,
		"",
	);
}

if (!skipped && orderedStyles.length) {
	lines.push(
		"| Style | Schemes | Renders | Text runs | Below AAA | Status |",
		"| :---- | ------: | ------: | --------: | --------: | :----- |",
	);
	for (const row of orderedStyles) {
		const state = row.failures > 0 ? "❌" : "✅";
		lines.push(
			`| ${row.style} | ${row.schemes.size} | ${number(row.renders)} | ${number(row.runs)} | ${number(row.failures)} | ${state} |`,
		);
	}
	lines.push("");
}

// One row per color pair, the same list the gate counts: a pair that fails in
// a dozen places must not crowd the others out of the table.
const pairs = [...belowPairs.values()];
if (pairs.length) {
	lines.push(
		`#### Below WCAG AAA (${number(pairs.length)} color pair${pairs.length === 1 ? "" : "s"})`,
		"",
		"| Scope | Page | State | Element | Text | Foreground | Background | Ratio | Needs |",
		"| :---- | :--- | :---- | :------ | :--- | :--------- | :--------- | ----: | ----: |",
	);
	for (const finding of pairs.slice(0, 50)) {
		lines.push(
			`| ${clean(finding.combo)} | ${clean(finding.page)} | ${finding.state} | ${clean(finding.element, 40)} | ${clean(`"${finding.text}"`, 42)} | \`${finding.fg}\` | \`${finding.bg}\` | ${ratio(finding.ratio)} | ${finding.aaa}:1${finding.large ? " (large)" : ""} |`,
		);
	}
	if (pairs.length > 50)
		lines.push(`| … | | | | | | | | ${number(pairs.length - 50)} more |`);
	lines.push("");
}

if (errors.size) {
	lines.push(`#### Audit errors (${number(errors.size)})`, "");
	for (const error of [...errors].slice(0, 10))
		lines.push(`- ${clean(error, 240)}`);
	if (errors.size > 10) lines.push(`- … and ${number(errors.size - 10)} more`);
	lines.push("");
}

if (notes.size) {
	lines.push(
		`<details><summary>${number(notes.size)} tile${notes.size === 1 ? "" : "s"} had a few unattributed text pixels (raster edges, not failures)</summary>`,
		"",
	);
	for (const note of [...notes].slice(0, 10))
		lines.push(`- ${clean(note, 240)}`);
	if (notes.size > 10) lines.push(`- … and ${number(notes.size - 10)} more`);
	lines.push("", "</details>", "");
}

lines.push(
	"Each text run is compared with the color actually painted behind it, including translucent fills and backdrop blur. Below 7:1, or 4.5:1 for large text, fails: WCAG AAA is required. Custom hex accents are not audited; the built-in hues are swept on the theme page.",
	"",
);

const comment = lines.join("\n");
writeFileSync(out, comment);
writeFileSync(resultPath, `${status}\n`);
console.log(comment);
