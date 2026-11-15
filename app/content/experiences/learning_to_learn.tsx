import {
	Check,
	Gift,
	PartyPopper,
	SlidersHorizontal,
	Target,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Range, Stat } from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Each figure owns its state and never touches the document, so the post still
   prerenders. Aggressive motion steps aside for reduced-motion readers. */

function WindowDots() {
	return (
		<span className="flex items-center gap-1">
			{["--traffic-red", "--traffic-yellow", "--traffic-green"].map((token) => (
				<span
					key={token}
					className="size-2 ring-1 ring-black/20"
					style={{ background: `var(${token})` }}
				/>
			))}
		</span>
	);
}

/* --- one hour a day ------------------------------------------------------ */

const HOURS_PER_YEAR = 365;

export function HourAccumulator() {
	const [minutes, setMinutes] = useState(60);
	const reduced = useReducedMotion();
	const hours = Math.round((minutes * HOURS_PER_YEAR) / 60);
	const filled = Math.min(hours, HOURS_PER_YEAR);

	return (
		<Panel
			title="hours.app"
			icon={<WindowDots />}
			footer={`one dot per hour · ${filled} / ${HOURS_PER_YEAR} filled`}
		>
			<div className="space-y-4">
				<div className="flex flex-wrap items-end justify-between gap-2">
					<div>
						<div className="flex items-baseline gap-1.5">
							<motion.span
								key={hours}
								initial={reduced ? false : { scale: 0.86, opacity: 0.5 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: "spring", stiffness: 420, damping: 24 }}
								className="inline-block  text-3xl leading-none tabular-nums text-mauve"
							>
								{hours}
							</motion.span>
							<span className="text-[11px] text-overlay1">hours / year</span>
						</div>
						<div className="mt-1  text-[11px] text-overlay0">
							{minutes} min a day, every day
							{hours > HOURS_PER_YEAR
								? ` · ${hours - HOURS_PER_YEAR} h past a full year`
								: ""}
						</div>
					</div>
					<Chip accent="var(--teal)">1 h a day · 365 h a year</Chip>
				</div>

				<motion.div
					initial={reduced ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
					whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
					className="flex flex-wrap gap-[2px] sm:gap-[3px]"
					aria-hidden="true"
				>
					{Array.from({ length: HOURS_PER_YEAR }, (_, index) => (
						<span
							key={index}
							className={cn(
								"size-[5px] transition-colors duration-500 motion-reduce:transition-none sm:size-[6px]",
								index < filled ? "bg-mauve" : "bg-surface0",
							)}
						/>
					))}
				</motion.div>
				<span className="sr-only">
					{minutes} minutes a day fills {filled} of {HOURS_PER_YEAR} hours.
				</span>

				<div className="space-y-3">
					<Range
						label="minutes a day"
						value={minutes}
						onChange={setMinutes}
						min={0}
						max={120}
						step={15}
					/>
					<div className="grid grid-cols-2 gap-2">
						<Stat
							label="per week"
							value={`${((minutes * 7) / 60).toFixed(1)} h`}
						/>
						<Stat
							label="per month"
							value={`${Math.round((minutes * 30) / 60)} h`}
						/>
					</div>
				</div>
			</div>
		</Panel>
	);
}

/* --- the forgetting curve ------------------------------------------------ */

const CURVE_WIDTH = 320;
const CURVE_HEIGHT = 118;
const PAD = { left: 24, right: 8, top: 10, bottom: 18 };
const PLOT_W = CURVE_WIDTH - PAD.left - PAD.right;
const PLOT_H = CURVE_HEIGHT - PAD.top - PAD.bottom;
const HORIZON = 34;
const REVIEW_DAYS = [1, 3, 7, 15, 31];
const DECAY = 1.2;
const TAIL_SPAN = 32;

const px = (day: number) => PAD.left + (day / HORIZON) * PLOT_W;
const py = (retention: number) => PAD.top + (1 - retention / 100) * PLOT_H;

const _NEVER_REVIEWED = samplePath(
	HORIZON,
	(day) => 100 * Math.exp(-DECAY * day),
	120,
);

/* Every interval ends around 30% retention, so each review buys a longer gap. */
function tailWindow(completed: number) {
	const from = completed === 0 ? 0 : REVIEW_DAYS[completed - 1];
	const next = REVIEW_DAYS[completed];
	return next === undefined
		? { from, to: HORIZON, span: TAIL_SPAN }
		: { from, to: next, span: next - from };
}

function _retentionAt(day: number, completed: number) {
	let from = 0;
	for (let index = 0; index < completed; index++) {
		const to = REVIEW_DAYS[index];
		if (day <= to) return 100 * Math.exp((-DECAY * (day - from)) / (to - from));
		from = to;
	}
	const tail = tailWindow(completed);
	return 100 * Math.exp((-DECAY * (day - tail.from)) / tail.span);
}

function samplePath(
	days: number,
	value: (day: number) => number,
	steps: number,
) {
	const points: string[] = [];
	for (let step = 0; step <= steps; step++) {
		const day = (step / steps) * days;
		points.push(
			`${step === 0 ? "M" : "L"}${px(day).toFixed(1)} ${py(value(day)).toFixed(1)}`,
		);
	}
	return points.join(" ");
}

/* --- momentum ------------------------------------------------------------ */

const TIPS = [
	{ id: "reward", label: "reward yourself", icon: Gift },
	{ id: "goal", label: "work towards a goal", icon: Target },
	{ id: "wins", label: "celebrate small wins", icon: PartyPopper },
	{ id: "adjust", label: "adjust your approach", icon: SlidersHorizontal },
];

const MOMENTUM = [
	"cold start",
	"warming up",
	"moving",
	"rolling",
	"full momentum",
];

export function MomentumTracker() {
	const [on, setOn] = useState<Record<string, boolean>>({});
	const reduced = useReducedMotion();
	const count = TIPS.filter((tip) => on[tip.id]).length;
	const percent = (count / TIPS.length) * 100;

	return (
		<Panel
			title="momentum.app"
			icon={<WindowDots />}
			footer="tap a tip to stack it"
		>
			<div className="space-y-3">
				<div className="space-y-1.5">
					<div className="flex items-baseline justify-between gap-2  text-[11px]">
						<span className="text-subtext0">momentum</span>
						<span className="truncate tabular-nums text-overlay1">
							{count} / {TIPS.length} · {MOMENTUM[count]}
						</span>
					</div>
					<div className="h-2 overflow-hidden bg-surface0">
						<motion.div
							className="h-full"
							style={{
								background: "linear-gradient(90deg, var(--mauve), var(--teal))",
							}}
							initial={false}
							animate={{ width: `${percent}%` }}
							transition={
								reduced
									? { duration: 0 }
									: { type: "spring", stiffness: 220, damping: 26 }
							}
						/>
					</div>
				</div>

				<div className="grid gap-1.5 sm:grid-cols-2">
					{TIPS.map((tip) => {
						const checked = Boolean(on[tip.id]);
						const Icon = tip.icon;
						return (
							<button
								key={tip.id}
								type="button"
								aria-checked={checked}
								onClick={() =>
									setOn((prev) => ({ ...prev, [tip.id]: !prev[tip.id] }))
								}
								className={cn(
									"flex items-center gap-2 border px-2.5 py-1.5 text-left  text-[11px] transition-colors",
									checked
										? "border-mauve/45 bg-mauve/10 text-text"
										: "border-border/70 bg-surface0/25 text-subtext0 hover:border-mauve/30 hover:text-text",
								)}
							>
								<Icon
									className={cn(
										"size-3.5 shrink-0",
										checked ? "text-mauve" : "text-overlay1",
									)}
								/>
								<span className="min-w-0 flex-1 truncate">{tip.label}</span>
								<span
									className={cn(
										"grid size-4 shrink-0 place-items-center border transition-colors",
										checked
											? "border-mauve bg-mauve text-on-accent"
											: "border-border",
									)}
								>
									<AnimatePresence initial={false}>
										{checked ? (
											<motion.span
												key="check"
												initial={reduced ? false : { scale: 0.4, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												exit={reduced ? undefined : { scale: 0.4, opacity: 0 }}
												transition={{
													type: "spring",
													stiffness: 520,
													damping: 26,
												}}
											>
												<Check className="size-3" strokeWidth={3} />
											</motion.span>
										) : null}
									</AnimatePresence>
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</Panel>
	);
}
