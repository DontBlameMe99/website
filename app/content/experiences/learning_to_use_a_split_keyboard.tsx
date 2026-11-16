import { ArrowLeftRight, Keyboard } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Range, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const ACCENT = "var(--accent-surface)";

/* --- hero: the halves drift apart --------------------------------------- */

function Half({ side }: { side: "left" | "right" }) {
	return (
		<div className=" border border-border/80 bg-mantle/80 p-1.5">
			<div className="grid grid-cols-5 gap-1">
				{Array.from({ length: 20 }, (_, index) => {
					const home = Math.floor(index / 5) === 1;
					return (
						<span
							key={index}
							className={cn(
								"aspect-square border",
								home
									? "border-accent/40 bg-accent/20"
									: "border-border bg-surface0/80",
							)}
						/>
					);
				})}
			</div>
			<div
				className={cn(
					"mt-1 grid w-3/4 grid-cols-2 gap-1",
					side === "left" ? "ml-auto" : "mr-auto",
				)}
			>
				<span className="aspect-[2/1] border border-border bg-surface1/70" />
				<span className="aspect-[2/1] border border-border bg-surface1/70" />
			</div>
		</div>
	);
}

export function Stance() {
	const reduced = useReducedMotion();
	const [stance, setStance] = useState(78);
	const [seen, setSeen] = useState(false);

	const t = stance / 100;
	const drift = t * 36;
	const label =
		t < 0.15 ? "together" : t > 0.72 ? "shoulder width" : "drifting";

	return (
		<Panel
			title="keyboard / stance"
			icon={<Keyboard className="size-3.5" />}
			footer="drag the stance"
		>
			<motion.div
				aria-hidden="true"
				className="relative flex items-center justify-center overflow-hidden border border-border/60 bg-base/60 px-2 py-7"
				onViewportEnter={() => setSeen(true)}
				viewport={{ once: true, margin: "-40px" }}
			>
				<div className="absolute left-2 top-2">
					<Chip accent={ACCENT}>{label}</Chip>
				</div>
				<div className="flex w-full max-w-[22rem] items-center justify-center gap-2">
					{(["left", "right"] as const).map((side) => {
						const dir = side === "left" ? -1 : 1;
						return (
							<motion.div
								key={side}
								className="w-[40%]"
								initial={false}
								animate={seen ? { x: `${dir * drift}%` } : { x: "0%" }}
								transition={
									reduced
										? { duration: 0 }
										: { type: "spring", stiffness: 90, damping: 14 }
								}
							>
								<Half side={side} />
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			<div className="mt-3 flex items-center gap-2">
				<ArrowLeftRight className="size-3.5 shrink-0 text-overlay1" />
				<div className="min-w-0 flex-1">
					<Range
						label="stance"
						value={stance}
						onChange={setStance}
						min={0}
						max={100}
					/>
				</div>
			</div>
		</Panel>
	);
}

/* --- layers: the same keys, a second legend ----------------------------- */

const BASE_KEYCAPS = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"a",
	"s",
	"d",
	"f",
	"g",
	"z",
	"x",
	"c",
	"v",
	"b",
];
const RAISE_KEYCAPS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
];

export function LayersFigure() {
	const reduced = useReducedMotion();

	return (
		<Switch
			on="layer: raise"
			off="layer: base"
			label="keyboard layer"
			accent={ACCENT}
		>
			{(raised) => {
				const keycaps = raised ? RAISE_KEYCAPS : BASE_KEYCAPS;
				return (
					<div className="space-y-3">
						<div className="grid grid-cols-5 gap-1.5">
							{keycaps.map((cap, index) => (
								<div
									key={index}
									className="relative grid aspect-square place-items-center overflow-hidden border border-border bg-surface0/60"
								>
									<AnimatePresence mode="popLayout" initial={false}>
										<motion.span
											key={cap}
											initial={reduced ? false : { opacity: 0, scale: 0.85 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={reduced ? undefined : { opacity: 0, scale: 0.85 }}
											transition={{ duration: 0.14 }}
											className="text-[11px] text-subtext1"
										>
											{cap}
										</motion.span>
									</AnimatePresence>
								</div>
							))}
						</div>

						<div className="flex items-center gap-1.5">
							<div className="relative grid h-7 w-16 place-items-center overflow-hidden border border-accent/40 bg-accent/10">
								<motion.span
									className="absolute inset-0 bg-accent/25"
									animate={{ opacity: raised ? 1 : 0 }}
									transition={{ duration: reduced ? 0 : 0.18 }}
								/>
								<span className="relative  text-[11px] text-text">layer</span>
							</div>
							<div className="grid h-7 flex-1 place-items-center border border-border bg-surface0/40  text-[11px] text-overlay1">
								space
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-1.5">
							<Chip accent={ACCENT}>{raised ? "raise" : "base"}</Chip>
						</div>

						<p className="text-[11px] leading-relaxed text-overlay1">
							Illustrative keymap: the same keys carry a second legend on the
							other layer.
						</p>
					</div>
				);
			}}
		</Switch>
	);
}
