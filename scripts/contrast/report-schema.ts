import { writeFile } from "node:fs/promises";
import type { Coverage, Finding } from "./audit";
import type { Plan } from "./plan";

export type Report = {
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

export type ReportInput = {
	shard: string | undefined;
	plan: Plan;
	durationSeconds?: number;
	coverage?: Coverage;
	findings?: Finding[];
	errors?: string[];
	notes?: string[];
	runs?: number;
	pages?: number;
};

export function reportEnvelope({
	shard,
	plan,
	durationSeconds = 0,
	coverage = {},
	findings = [],
	errors = [],
	notes = [],
	runs = 0,
	pages = 0,
}: ReportInput): Report {
	return {
		version: 1,
		shard: shard ?? null,
		plan,
		durationSeconds,
		coverage,
		findings,
		errors,
		notes,
		runs,
		pages,
	};
}

export async function writeReport(path: string | undefined, report: Report) {
	if (!path) return;
	await writeFile(path, `${JSON.stringify(report, null, "\t")}\n`);
}
