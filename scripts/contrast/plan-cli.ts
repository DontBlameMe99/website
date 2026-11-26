import { writeFileSync } from "node:fs";
import { resolveOptions } from "./options";
import { reportEnvelope, writeReport } from "./report-schema";

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
if (outIndex !== -1 && !args[outIndex + 1])
	throw new Error("--out requires a value");
const out = outIndex === -1 ? "plan.json" : args[outIndex + 1];

const { plan, shard } = await resolveOptions({ planFile: false });

writeFileSync(out, `${JSON.stringify(plan, null, "\t")}\n`);
console.log(`skipped=${plan.skipped}`);
console.log(`scope=${plan.summary}`);

if (plan.skipped)
	await writeReport(process.env.CONTRAST_JSON, reportEnvelope({ shard, plan }));
