import { ArrowLeftRight, Hand, Keyboard } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Range, Stat, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const ACCENT = "var(--mauve)";

/* --- hero: the halves drift apart and tent ------------------------------- */

function Half({ side }: { side: "left" | "right" }) {
	return (
		<div className="rounded-[8px] border border-border/80 bg-mantle/80 p-1.5 shadow-[0_12px_24px_-16px_rgba(0,0,0,0.85)]">
			<div className="grid grid-cols-5 gap-1">
				{Array.from({ length: 20 }, (_, index) => {
					const home = Math.floor(index / 5) === 1;
					return (
						<span
							key={index}
							className={cn(
								"aspect-square rounded-[3px] border",
								home
									? "border-mauve/40 bg-mauve/20"
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
				<span className="aspect-[2/1] rounded-[3px] border border-border bg-surface1/70" />
				<span className="aspect-[2/1] rounded-[3px] border border-border bg-surface1/70" />
			</div>
		</div>
	);
}

export function Stance() {
	const reduced = useReducedMotion();
	const [stance, setStance] = useState(78);
	const [seen, setSeen] = useState(false);
	const [hover, setHover] = useState(false);

	const t = stance / 100;
	const tent = t * (hover && !reduced ? 16 : 10);
	const drift = t * 6;
	const label =
		t < 0.15 ? "together" : t > 0.72 ? "shoulder width" : "drifting";

	return (
		<Panel
			title="keyboard / stance"
			icon={<Keyboard className="size-3.5" />}
			footer="drag the stance, hover to tent"
		>
			<motion.div
				aria-hidden="true"
				className="relative flex items-center justify-center overflow-hidden rounded-md border border-border/60 bg-base/60 px-2 py-7"
				onViewportEnter={() => setSeen(true)}
				viewport={{ once: true, margin: "-40px" }}
				onHoverStart={() => setHover(true)}
				onHoverEnd={() => setHover(false)}
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
								animate={
									seen
										? { x: `${dir * drift}%`, rotate: dir * tent }
										: { x: "0%", rotate: 0 }
								}
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

/* --- the Moonlander, with hotspots -------------------------------------- */

const KEY = 22;
const KEY_GAP = 4;
const GRID_W = 5 * KEY + 4 * KEY_GAP;
const LEFT_X = 32;
const RIGHT_X = 242;
const GRID_Y = 26;

type Hotspot = {
	id: string;
	label: string;
	quote: string;
	x: number;
	y: number;
	region: {
		x: number;
		y: number;
		width: number;
		height: number;
		radius: number;
	};
};

const HOTSPOTS: Hotspot[] = [
	{
		id: "ortholinear",
		label: "Ortholinear lay out",
		quote: "the keys are aligned in a grid pattern",
		x: 23.75,
		y: 38,
		region: { x: 22, y: 14, width: 146, height: 120, radius: 12 },
	},
	{
		id: "switches",
		label: "Hot-Swappable Switches",
		quote: "change switches without soldering",
		x: 69.75,
		y: 44.5,
		region: { x: 264, y: 74, width: 30, height: 30, radius: 7 },
	},
	{
		id: "qmk",
		label: "QMK Firmware",
		quote: "an open-source keyboard firmware",
		x: 89.5,
		y: 76,
		region: { x: 344, y: 140, width: 28, height: 24, radius: 5 },
	},
	{
		id: "halves",
		label: "The split layout",
		quote: "position the two halves of the keyboard shoulder-width apart",
		x: 50,
		y: 50,
		region: { x: 164, y: 40, width: 72, height: 130, radius: 10 },
	},
];

function Plate({ x, side }: { x: number; side: "left" | "right" }) {
	const inner = side === "left" ? x + GRID_W : x;
	const controllerX = side === "left" ? x + 2 : x + GRID_W - 18;

	return (
		<g>
			<rect
				x={x - 8}
				y={GRID_Y - 8}
				width={GRID_W + 16}
				height={158}
				rx={12}
				fill="var(--mantle)"
				stroke="var(--surface1)"
				strokeWidth={1}
			/>

			{Array.from({ length: 20 }, (_, index) => {
				const col = index % 5;
				const row = Math.floor(index / 5);
				return (
					<rect
						key={index}
						x={x + col * (KEY + KEY_GAP)}
						y={GRID_Y + row * (KEY + KEY_GAP)}
						width={KEY}
						height={KEY}
						rx={5}
						fill={row === 1 ? "var(--surface1)" : "var(--surface0)"}
						stroke="var(--surface2)"
						strokeWidth={0.7}
					/>
				);
			})}

			{[0, 1, 2].map((index) => (
				<rect
					key={`thumb-${index}`}
					x={side === "left" ? inner - 30 * (index + 1) : inner + 30 * index}
					y={138 + index * 7}
					width={26}
					height={16}
					rx={4}
					fill="var(--surface0)"
					stroke="var(--surface2)"
					strokeWidth={0.7}
				/>
			))}

			<rect
				x={controllerX}
				y={146}
				width={16}
				height={12}
				rx={2}
				fill="var(--surface1)"
				stroke="var(--surface2)"
				strokeWidth={0.7}
			/>
		</g>
	);
}

export function MoonlanderFigure() {
	const reduced = useReducedMotion();
	const [activeId, setActiveId] = useState(HOTSPOTS[0].id);
	const active =
		HOTSPOTS.find((hotspot) => hotspot.id === activeId) ?? HOTSPOTS[0];
	const position =
		HOTSPOTS.findIndex((hotspot) => hotspot.id === active.id) + 1;

	return (
		<Panel
			title="moonlander / hotspots"
			icon={<Keyboard className="size-3.5" />}
			footer="tap a dot, every label names something in the post"
		>
			<div className="relative">
				<svg
					viewBox="0 0 400 200"
					className="block w-full"
					role="img"
					aria-label="Diagram of a split keyboard with numbered hotspots"
				>
					<Plate x={LEFT_X} side="left" />
					<Plate x={RIGHT_X} side="right" />

					<motion.path
						d="M 158 100 C 184 148 216 148 242 100"
						fill="none"
						stroke="var(--surface2)"
						strokeWidth={1.4}
						strokeDasharray="3 4"
						initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
						whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: "easeInOut" }}
					/>

					<motion.rect
						key={active.id}
						x={active.region.x}
						y={active.region.y}
						width={active.region.width}
						height={active.region.height}
						rx={active.region.radius}
						fill="var(--mauve)"
						fillOpacity={0.07}
						stroke="var(--mauve)"
						strokeWidth={1.2}
						strokeDasharray="4 4"
						initial={reduced ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: reduced ? 0 : 0.25 }}
					/>
				</svg>

				{HOTSPOTS.map((hotspot, index) => {
					const selected = hotspot.id === active.id;
					return (
						<motion.button
							key={hotspot.id}
							type="button"
							onClick={() => setActiveId(hotspot.id)}
							aria-pressed={selected}
							aria-label={`Hotspot ${index + 1}: ${hotspot.label}`}
							whileHover={reduced ? undefined : { scale: 1.15 }}
							transition={{ type: "spring", stiffness: 400, damping: 22 }}
							className={cn(
								"absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border  text-[9px] transition-colors",
								selected
									? "border-mauve bg-mauve text-crust"
									: "border-mauve/40 bg-base/90 text-mauve hover:border-mauve",
							)}
							style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
						>
							{index + 1}
							{selected ? (
								<motion.span
									layoutId="hotspot-ring"
									className="pointer-events-none absolute -inset-1 rounded-full border border-mauve/60"
									transition={{ type: "spring", stiffness: 420, damping: 30 }}
								/>
							) : null}
						</motion.button>
					);
				})}
			</div>

			<div
				aria-live="polite"
				className="mt-3 min-h-[4.5rem] rounded-md border border-border/70 bg-surface0/20 p-3"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={active.id}
						initial={reduced ? false : { opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -6 }}
						transition={{ duration: 0.16 }}
					>
						<div className="flex items-center gap-2">
							<Chip accent={ACCENT}>{active.label}</Chip>
							<span className="text-[10px] tabular-nums text-overlay0">
								{position}/4
							</span>
						</div>
						<p className="mt-1.5  text-[11px] leading-relaxed text-subtext0">
							&ldquo;{active.quote}&rdquo;
						</p>
					</motion.div>
				</AnimatePresence>
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
		<Switch on="layer: raise" off="layer: base" accent={ACCENT}>
			{(raised) => {
				const keycaps = raised ? RAISE_KEYCAPS : BASE_KEYCAPS;
				return (
					<div className="space-y-3">
						<div className="grid grid-cols-5 gap-1.5">
							{keycaps.map((cap, index) => (
								<div
									key={index}
									className="relative grid aspect-square place-items-center overflow-hidden rounded-[5px] border border-border bg-surface0/60"
								>
									<AnimatePresence mode="popLayout" initial={false}>
										<motion.span
											key={cap}
											initial={reduced ? false : { opacity: 0, scale: 0.85 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={reduced ? undefined : { opacity: 0, scale: 0.85 }}
											transition={{ duration: 0.14 }}
											className="text-[10px] text-subtext1"
										>
											{cap}
										</motion.span>
									</AnimatePresence>
								</div>
							))}
						</div>

						<div className="flex items-center gap-1.5">
							<div className="relative grid h-7 w-16 place-items-center overflow-hidden rounded-[5px] border border-mauve/40 bg-mauve/10">
								<motion.span
									className="absolute inset-0 bg-mauve/25"
									animate={{ opacity: raised ? 1 : 0 }}
									transition={{ duration: reduced ? 0 : 0.18 }}
								/>
								<span className="relative  text-[10px] text-mauve">layer</span>
							</div>
							<div className="grid h-7 flex-1 place-items-center rounded-[5px] border border-border bg-surface0/40  text-[10px] text-overlay0">
								space
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-1.5">
							<Chip accent={ACCENT}>{raised ? "raise" : "base"}</Chip>
							<Chip accent="var(--teal)">remap</Chip>
							<Chip accent="var(--peach)">macros</Chip>
						</div>

						<p className="text-[10px] leading-relaxed text-overlay0">
							Illustrative keymap: the same keys carry a second legend on the
							other layer.
						</p>
					</div>
				);
			}}
		</Switch>
	);
}

/* --- adaptation: hours in, wrists out ----------------------------------- */

function Posture({ relax, reduced }: { relax: number; reduced: boolean }) {
	const transition = reduced
		? { duration: 0 }
		: { type: "spring" as const, stiffness: 110, damping: 16 };

	// Each finger rotates around its knuckle (bottom center of its own box).
	const fingers = [
		{ x: 62, y: 20, height: 68, rotate: 8 - 14 * relax },
		{ x: 83, y: 10, height: 78, rotate: 2 - 4 * relax },
		{ x: 104, y: 16, height: 72, rotate: -2 + 6 * relax },
		{ x: 125, y: 32, height: 56, rotate: -9 + 17 * relax },
	];

	return (
		<svg
			viewBox="0 0 200 236"
			className="mx-auto block w-full max-w-[13rem]"
			role="img"
			aria-label={`A hand at ${Math.round(relax * 100)} percent of a relaxed posture`}
		>
			<line
				x1="102"
				y1="150"
				x2="102"
				y2="232"
				stroke="var(--surface2)"
				strokeWidth="1"
				strokeDasharray="3 4"
			/>

			<motion.rect
				x="82"
				y="150"
				width="40"
				height="76"
				rx="12"
				fill="var(--surface0)"
				stroke="var(--surface1)"
				strokeWidth="1.2"
				style={{ transformOrigin: "50% 0%" }}
				animate={{ rotate: 14 * (1 - relax), x: -8 * (1 - relax) }}
				transition={transition}
			/>

			<rect
				x="60"
				y="80"
				width="84"
				height="70"
				rx="20"
				fill="var(--surface0)"
				stroke="var(--surface1)"
				strokeWidth="1.2"
			/>

			{fingers.map((finger, index) => (
				<motion.rect
					key={index}
					x={finger.x}
					y={finger.y}
					width="17"
					height={finger.height}
					rx="8.5"
					fill="var(--surface0)"
					stroke="var(--surface1)"
					strokeWidth="1.2"
					style={{ transformOrigin: "50% 100%" }}
					animate={{ rotate: finger.rotate }}
					transition={transition}
				/>
			))}

			<motion.rect
				x="136"
				y="92"
				width="20"
				height="46"
				rx="10"
				fill="var(--surface0)"
				stroke="var(--surface1)"
				strokeWidth="1.2"
				style={{ transformOrigin: "50% 100%" }}
				animate={{ rotate: 64 - 22 * relax }}
				transition={transition}
			/>

			<motion.path
				d="M 78 176 A 32 32 0 0 1 126 176"
				fill="none"
				stroke="var(--peach)"
				strokeWidth="1.2"
				strokeDasharray="4 3"
				animate={{ opacity: 1 - relax }}
				transition={{ duration: reduced ? 0 : 0.3 }}
			/>

			<motion.circle
				cx="102"
				cy="150"
				r="2.6"
				fill="var(--mauve)"
				animate={{ opacity: 0.35 + relax * 0.65 }}
				transition={{ duration: reduced ? 0 : 0.3 }}
			/>
		</svg>
	);
}

export function AdaptationFigure() {
	const reduced = useReducedMotion();
	const [hours, setHours] = useState(3);
	const [seen, setSeen] = useState(false);

	const relax = Math.min(1, hours / 6);
	const shownRelax = seen ? relax : 0;

	return (
		<Panel
			title="learning / hours to comfortable"
			icon={<Hand className="size-3.5" />}
			footer="illustrative posture, not a measurement"
		>
			<motion.div
				className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_8.5rem]"
				onViewportEnter={() => setSeen(true)}
				viewport={{ once: true, margin: "-40px" }}
			>
				<Posture relax={shownRelax} reduced={!!reduced} />
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
					<Stat label="author" value="3 to 6 h" hint="comfortable" />
					<Stat
						label="you"
						value={`${hours} h`}
						hint={
							relax > 0.75 ? "relaxed" : relax > 0.35 ? "settling" : "cramped"
						}
					/>
				</div>
			</motion.div>

			<div className="mt-4">
				<Range
					label="hours in"
					value={hours}
					onChange={setHours}
					min={0}
					max={8}
					step={1}
				/>

				<div className="relative mt-2 h-1 rounded-full bg-surface0/70">
					<motion.div
						className="absolute inset-y-0 rounded-full bg-mauve/35"
						style={{ left: "37.5%" }}
						initial={{ width: 0 }}
						whileInView={{ width: "37.5%" }}
						viewport={{ once: true }}
						transition={{
							duration: reduced ? 0 : 0.7,
							delay: 0.2,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
				</div>

				<div className="relative mt-1 h-3  text-[9px] text-overlay0">
					<span className="absolute -translate-x-1/2" style={{ left: "37.5%" }}>
						3h
					</span>
					<span className="absolute -translate-x-1/2" style={{ left: "75%" }}>
						6h
					</span>
					<span className="absolute right-0">8h</span>
				</div>
			</div>
		</Panel>
	);
}
