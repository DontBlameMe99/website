import { motion, useReducedMotion } from "motion/react";
import { Chip, Panel } from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* The figures avoid document state, so the post still prerenders. Aggressive
   motion steps aside for reduced-motion readers. */

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
	const minutes = 60;
	const reduced = useReducedMotion();
	const hours = Math.round((minutes * HOURS_PER_YEAR) / 60);
	const filled = hours;

	return (
		<Panel title="hours.app" icon={<WindowDots />} footer="one dot per hour">
			<div className="space-y-4">
				<div className="flex flex-wrap items-end justify-between gap-2">
					<div>
						<div className="flex items-baseline gap-1.5">
							<motion.span
								key={hours}
								initial={reduced ? false : { scale: 0.86, opacity: 0.5 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: "spring", stiffness: 420, damping: 24 }}
								className="inline-block  text-3xl leading-none tabular-nums text-accent"
							>
								{hours}
							</motion.span>
							<span className="text-[11px] text-overlay1">hours / year</span>
						</div>
						<div className="mt-1  text-[11px] text-overlay0">
							{minutes} min a day, every day
						</div>
					</div>
					<Chip accent="var(--teal)">1 h a day, 365 h a year</Chip>
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
								index < filled ? "bg-accent" : "bg-surface0",
							)}
						/>
					))}
				</motion.div>
				<span className="sr-only">
					{minutes} minutes a day fills {filled} of {HOURS_PER_YEAR} hours.
				</span>
			</div>
		</Panel>
	);
}
