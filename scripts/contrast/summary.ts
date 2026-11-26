import { appendFile } from "node:fs/promises";
import { SITE } from "../../app/lib/site";
import type { Finding } from "./audit";
import { formatRatio } from "./measure";
import type { Plan } from "./plan";

export function belowAaaPairs(findings: Finding[]): Finding[] {
	// The gate is one color pair per scope and state, the same list the report
	// shows: gradients and antialiasing give the same text a handful of
	// near-identical backgrounds, and they all fail for the same reason.
	const pairs = new Map<string, Finding>();
	for (const finding of findings) {
		const key = [finding.combo, finding.state, finding.fg, finding.bg].join(
			"\u0000",
		);
		const previous = pairs.get(key);
		if (!previous || finding.ratio < previous.ratio) pairs.set(key, finding);
	}
	return [...pairs.values()].sort((a, b) => a.ratio - b.ratio);
}

export type SummaryInput = {
	runs: number;
	renders: number;
	seconds: string;
	plan: Plan;
	errors: string[];
	notes: string[];
	belowAaa: Finding[];
};

function summaryLines({
	runs,
	renders,
	seconds,
	errors,
	notes,
	belowAaa,
}: SummaryInput): string[] {
	const summary: string[] = [
		`Checked ${runs.toLocaleString("en-US")} text runs in ${renders} page renders in ${seconds}s.`,
	];

	if (errors.length) {
		summary.push("", `Audit errors (${errors.length}):`);
		for (const error of errors.slice(0, 20)) summary.push(`  ${error}`);
		if (errors.length > 20) summary.push(`  … and ${errors.length - 20} more`);
	}

	if (belowAaa.length) {
		summary.push("", `${belowAaa.length} color pairs are below WCAG AAA:`);
		for (const finding of belowAaa.slice(0, 80)) {
			summary.push(
				`  ${finding.combo} ${finding.page} [${finding.state}] ${finding.element} "${finding.text}" @${Math.round(finding.at.x)},${Math.round(finding.at.y)} ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)} (needs ${finding.aaa}:1${finding.large ? ", large text" : ""})${finding.note ? ` [${finding.note}]` : ""}`,
			);
		}
		if (belowAaa.length > 80)
			summary.push(`  … and ${belowAaa.length - 80} more`);
	} else if (!errors.length) {
		summary.push("Every checked text run meets WCAG AAA.");
	}

	if (notes.length) {
		summary.push(
			"",
			`${notes.length} tiles had a few unattributed text pixels (raster edges, not counted as failures):`,
		);
		for (const note of notes.slice(0, 10)) summary.push(`  ${note}`);
		if (notes.length > 10) summary.push(`  … and ${notes.length - 10} more`);
	}
	return summary;
}

export async function writeSummary(input: SummaryInput): Promise<void> {
	const { plan, renders, belowAaa } = input;
	const summary = summaryLines(input);

	console.log("");
	for (const line of summary) console.log(line);

	const escapeAnnotation = (value: string) =>
		value
			.replaceAll("%", "%25")
			.replaceAll("\r", "%0D")
			.replaceAll("\n", "%0A");
	const annotate = (title: string, message: string) => {
		console.log(
			`::error title=${escapeAnnotation(title)}::${escapeAnnotation(message)}`,
		);
	};
	for (const finding of belowAaa.slice(0, 20)) {
		annotate(
			`WCAG AAA: ${finding.combo} ${finding.page}`,
			`${finding.element} "${finding.text}": ${finding.fg} on ${finding.bg} = ${formatRatio(finding.ratio)}, needs ${finding.aaa}:1`,
		);
	}

	if (process.env.GITHUB_STEP_SUMMARY) {
		const markdown = [
			"### WCAG contrast (AAA)",
			"",
			`${SITE.name}: ${plan.summary}; ${renders} page renders, base and hover.`,
			"",
			...summary.map((line) =>
				line.startsWith("  ") ? `- \`${line.trim()}\`` : line,
			),
			"",
		];
		await appendFile(
			process.env.GITHUB_STEP_SUMMARY,
			`${markdown.join("\n")}\n`,
		);
	}
}
