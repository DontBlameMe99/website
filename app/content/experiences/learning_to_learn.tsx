import {
	Check,
	Gift,
	PartyPopper,
	RotateCcw,
	SlidersHorizontal,
	Sparkles,
	Target,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Range, Stat } from "~/components/post/kit";
import type { PostExperience } from "~/lib/experiences";
import { cn } from "~/lib/utils";

/* Each figure owns its state and never touches the document, so the post still
   prerenders. Aggressive motion steps aside for reduced-motion readers. */

function WindowDots() {
	return (
		<span className="flex items-center gap-1">
			{["--traffic-red", "--traffic-yellow", "--traffic-green"].map((token) => (
				<span
					key={token}
					className="size-2 rounded-full ring-1 ring-black/20"
					style={{ background: `var(${token})` }}
				/>
			))}
		</span>
	);
}

/* --- one hour a day ------------------------------------------------------ */

const HOURS_PER_YEAR = 365;

function HourAccumulator() {
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
						<div className="mt-1  text-[10px] text-overlay0">
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
								"size-[5px] rounded-[2px] transition-colors duration-500 motion-reduce:transition-none sm:size-[6px]",
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

const NEVER_REVIEWED = samplePath(
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

function retentionAt(day: number, completed: number) {
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

function SpacedRepetitionCurve() {
	const [completed, setCompleted] = useState(0);
	const reduced = useReducedMotion();
	const tail = tailWindow(completed);
	const done = completed >= REVIEW_DAYS.length;
	const dip = Math.round(retentionAt(tail.to, completed));
	const curve = samplePath(tail.to, (day) => retentionAt(day, completed), 180);

	return (
		<Panel
			title="review.app"
			icon={<WindowDots />}
			footer="illustration of spaced repetition · each review resets the curve and doubles the gap · not a real Anki schedule"
		>
			<div className="space-y-3">
				<svg
					viewBox={`0 0 ${CURVE_WIDTH} ${CURVE_HEIGHT}`}
					className="w-full"
					role="img"
					aria-label={`Retention after ${completed} reviews: ${dip}% left at day ${tail.to}`}
				>
					{[0, 25, 50, 75, 100].map((value) => (
						<line
							key={value}
							x1={PAD.left}
							x2={CURVE_WIDTH - PAD.right}
							y1={py(value)}
							y2={py(value)}
							stroke="var(--surface0)"
							strokeWidth={0.6}
							strokeDasharray={value === 0 ? undefined : "2 3"}
						/>
					))}
					{[100, 50, 0].map((value) => (
						<text
							key={value}
							x={PAD.left - 4}
							y={py(value) + 2.5}
							textAnchor="end"
							fontSize={7}
							fill="var(--overlay0)"
							fontFamily="var(--font-sans)"
						>
							{value}%
						</text>
					))}
					<text
						x={PAD.left}
						y={CURVE_HEIGHT - 4}
						fontSize={7}
						fill="var(--overlay0)"
						fontFamily="var(--font-sans)"
					>
						day 0
					</text>
					<text
						x={CURVE_WIDTH - PAD.right}
						y={CURVE_HEIGHT - 4}
						textAnchor="end"
						fontSize={7}
						fill="var(--overlay0)"
						fontFamily="var(--font-sans)"
					>
						day {HORIZON}
					</text>

					<path
						d={NEVER_REVIEWED}
						fill="none"
						stroke="var(--overlay0)"
						strokeWidth={1}
						strokeDasharray="3 4"
					/>

					<motion.path
						key={`curve-${completed}`}
						d={curve}
						fill="none"
						stroke="var(--mauve)"
						strokeWidth={2}
						strokeLinecap="round"
						initial={reduced ? false : { pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{ duration: reduced ? 0 : 0.55, ease: "easeOut" }}
					/>

					{REVIEW_DAYS.slice(0, completed).map((day) => (
						<motion.circle
							key={`review-${day}`}
							cx={px(day)}
							cy={py(retentionAt(day, completed))}
							r={2.4}
							fill="var(--mauve)"
							initial={reduced ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.25 }}
						/>
					))}
				</svg>

				<div className="flex flex-wrap items-center gap-1.5">
					<Chip>with review</Chip>
					<Chip accent="var(--overlay1)">no review</Chip>
					<span className="text-[10px] text-overlay0">
						{dip}% left at day {tail.to}
					</span>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div className="grid grid-cols-2 gap-2 sm:w-64">
						<Stat
							label="reviews"
							value={`${completed} / ${REVIEW_DAYS.length}`}
						/>
						<Stat label="gap" value={`${tail.span} d`} />
					</div>
					<motion.button
						type="button"
						onClick={() => setCompleted(done ? 0 : completed + 1)}
						whileTap={reduced ? undefined : { scale: 0.96 }}
						className="inline-flex items-center justify-center gap-1.5 rounded-full border border-mauve/50 bg-mauve/15 px-3 py-1.5  text-[11px] text-mauve transition-colors hover:bg-mauve/25"
					>
						{done ? (
							<RotateCcw className="size-3.5" />
						) : (
							<Sparkles className="size-3.5" />
						)}
						{done ? "start over" : "review now"}
					</motion.button>
				</div>
			</div>
		</Panel>
	);
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

function MomentumTracker() {
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
					<div className="h-2 overflow-hidden rounded-full bg-surface0">
						<motion.div
							className="h-full rounded-full"
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
									"flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-left  text-[11px] transition-colors",
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
										"grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors",
										checked
											? "border-mauve bg-mauve text-crust"
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

const experience: PostExperience = {
	visuals: {
		"how-much-time-do-i-need-to-learn-new-things": HourAccumulator,
		anki: SpacedRepetitionCurve,
		"how-to-stay-motivated": MomentumTracker,
	},
};

export default experience;
