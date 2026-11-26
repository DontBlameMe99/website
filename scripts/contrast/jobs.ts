import { DEFAULT_PREFS, SCHEMES, STYLES } from "../../app/lib/themes";
import type { Plan } from "./plan";

export type Combo = {
	mode: "dark" | "light";
	scheme: string;
	style: string;
	label: string;
};

export type Job = { combo: Combo; page: string; accent: string };

const SHARD = /^([1-9]\d*)\/([1-9]\d*)$/u;

export function combosFor(plan: Plan): Combo[] {
	return plan.combos.map(({ scheme: schemeId, style }) => {
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
}

export function shardCombos(
	combos: Combo[],
	shard: string | undefined,
): Combo[] {
	if (!shard) return combos;
	const match = SHARD.exec(shard);
	const index = match ? Number(match[1]) : 0;
	const count = match ? Number(match[2]) : 0;
	if (
		!match ||
		!Number.isSafeInteger(index) ||
		!Number.isSafeInteger(count) ||
		index > count
	)
		throw new Error(`CONTRAST_SHARD must be <1..n>/<n>, got "${shard}"`);
	// Spread each style across every shard. Glassmorphism renders far slower
	// than the flat styles, so grouping by catalog index keeps the shards even.
	const shardOf = (combo: Combo) => {
		const scheme = SCHEMES.findIndex((item) => item.id === combo.scheme);
		const style = STYLES.findIndex((item) => item.id === combo.style);
		return (scheme + style) % count;
	};
	return combos.filter((combo) => shardOf(combo) === index - 1);
}

export function jobsFor(plan: Plan, combos: Combo[], only?: string): Job[] {
	const defaultAccent =
		DEFAULT_PREFS.accent.kind === "hue" ? DEFAULT_PREFS.accent.hue : "mauve";
	const accentJobs = plan.accents.filter((hue) => hue !== defaultAccent);
	return combos
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
}

export function jobsForPlan({
	plan,
	only,
	shard,
}: {
	plan: Plan;
	only?: string;
	shard?: string;
}): { combos: Combo[]; jobs: Job[] } {
	const combos = combosFor(plan);
	return {
		combos,
		jobs: jobsFor(plan, shardCombos(combos, shard), only),
	};
}
