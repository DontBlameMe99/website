import { writeFileSync } from "node:fs";
import { fullPlan, planFor } from "./plan";

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const out = outIndex === -1 ? "plan.json" : args[outIndex + 1];

const plan = process.env.CONTRAST_ONLY
	? fullPlan("CONTRAST_ONLY is set")
	: planFor({
			base: process.env.CONTRAST_BASE,
			fullRun: process.env.CONTRAST_FULL === "1",
		});

writeFileSync(out, `${JSON.stringify(plan, null, "\t")}\n`);
console.log(`skipped=${plan.skipped}`);
console.log(`scope=${plan.summary}`);

if (plan.skipped && process.env.CONTRAST_JSON) {
	writeFileSync(
		process.env.CONTRAST_JSON,
		`${JSON.stringify(
			{
				version: 1,
				shard: process.env.CONTRAST_SHARD ?? null,
				plan,
				durationSeconds: 0,
				coverage: {},
				findings: [],
				errors: [],
				notes: [],
				runs: 0,
				pages: 0,
			},
			null,
			"\t",
		)}\n`,
	);
}
