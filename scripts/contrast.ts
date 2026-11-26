import { runAudit, VIEWPORT } from "./contrast/audit";
import { buildRoot, serveStatic } from "./contrast/browser";
import { jobsForPlan } from "./contrast/jobs";
import { resolveOptions, workerCount } from "./contrast/options";
import { reportEnvelope, writeReport } from "./contrast/report-schema";
import { belowAaaPairs, writeSummary } from "./contrast/summary";

const { plan, only, shard } = await resolveOptions();
const { combos, jobs } = jobsForPlan({ plan, only, shard });

if (plan.skipped) {
	await writeReport(process.env.CONTRAST_JSON, reportEnvelope({ shard, plan }));
	console.log(`WCAG contrast: skipped. ${plan.reason}`);
	process.exit(0);
}
if (combos.length === 0)
	throw new Error("The plan has no combinations to audit");
if (plan.routes.length === 0)
	throw new Error("The plan has no routes to audit");
if (jobs.length === 0) {
	if (only) throw new Error(`CONTRAST_ONLY="${only}" matched no jobs`);
	await writeReport(process.env.CONTRAST_JSON, reportEnvelope({ shard, plan }));
	console.log("WCAG contrast: no jobs in this shard.");
	process.exit(0);
}

const server = await serveStatic(buildRoot());
const baseUrl = `http://127.0.0.1:${server.port}`;
const workers = workerCount(jobs.length);

console.log(
	`WCAG contrast: ${plan.summary}; ${combos.length} scheme/style combinations, ${jobs.length} renders, at ${VIEWPORT.width}x${VIEWPORT.height}, ${workers} worker${workers === 1 ? "" : "s"}`,
);

const started = performance.now();
const result = await runAudit(baseUrl, jobs, workers);
await server.stop();

const belowAaa = belowAaaPairs(result.findings);
const seconds = ((performance.now() - started) / 1000).toFixed(1);
await writeReport(
	process.env.CONTRAST_JSON,
	reportEnvelope({
		shard,
		plan,
		durationSeconds: Number(seconds),
		coverage: result.coverage,
		findings: result.findings,
		errors: result.errors,
		notes: result.notes,
		runs: result.runs,
		pages: jobs.length,
	}),
);

await writeSummary({
	runs: result.runs,
	renders: jobs.length,
	seconds,
	plan,
	errors: result.errors,
	notes: result.notes,
	belowAaa,
});

if (result.errors.length || belowAaa.length) process.exit(1);
