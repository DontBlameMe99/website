import { readFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import { fullPlan, type Plan, planFor } from "./plan";

export type Options = {
	plan: Plan;
	only: string | undefined;
	shard: string | undefined;
};

export function positiveIntEnv(name: string): number | null {
	const value = process.env[name];
	if (value === undefined || value === "") return null;
	const parsed = Number(value);
	return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function workerCount(jobs: number): number {
	const requested = positiveIntEnv("CONTRAST_WORKERS") ?? 0;
	const fallback = Math.min(
		4,
		Math.max(1, Math.floor(availableParallelism() / 2)),
	);
	return Math.max(1, Math.min(jobs, requested || fallback));
}

export async function resolveOptions({
	planFile = true,
}: {
	planFile?: boolean;
} = {}): Promise<Options> {
	const only = process.env.CONTRAST_ONLY;
	const shard = process.env.CONTRAST_SHARD;
	const planPath = planFile ? process.env.CONTRAST_PLAN : undefined;
	const plan = only
		? fullPlan("CONTRAST_ONLY is set")
		: planPath
			? (JSON.parse(await readFile(planPath, "utf8")) as Plan)
			: planFor({
					base: process.env.CONTRAST_BASE,
					fullRun: process.env.CONTRAST_FULL === "1",
				});
	return { plan, only, shard };
}
