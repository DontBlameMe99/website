import { Activity } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const ACCENT = "var(--post-accent)";

/* Typing sites lie about being fun. This post's figures stick to the two
   things it does claim: a layout moved keys around, and the first weeks of the
   switch are worse than the speed you started with. */

/* ------------------------------------------------------- layout switch ---- */

const ROW_NAMES = ["top", "home", "bottom"];

const QWERTY_ROWS = ["qwertyuiop", "asdfghjkl ", "zxcvbnm"];
/* Colemak DH: D and H leave the home row for the index-finger column below,
   B and K take their place on the top and bottom rows. */
const COLEMAK_ROWS = ["qwfpbjluy ", "arstgmneio", "zxcdvkh"];

const FINGERS = [
	{ label: "left pinky", color: "var(--pink)" },
	{ label: "left ring", color: "var(--mauve)" },
	{ label: "left middle", color: "var(--blue)" },
	{ label: "left index", color: "var(--teal)" },
	{ label: "right index", color: "var(--teal)" },
	{ label: "right middle", color: "var(--blue)" },
	{ label: "right ring", color: "var(--mauve)" },
	{ label: "right pinky", color: "var(--pink)" },
];
const FINGER_BY_COL = [0, 1, 2, 3, 3, 4, 4, 5, 6, 7];

type Position = { row: number; col: number };

function positionsOf(rows: string[]) {
	const map = new Map<string, Position>();
	rows.forEach((row, rowIndex) => {
		[...row].forEach((letter, col) => {
			if (letter.trim()) map.set(letter, { row: rowIndex, col });
		});
	});
	return map;
}

const QWERTY_POS = positionsOf(QWERTY_ROWS);
const COLEMAK_POS = positionsOf(COLEMAK_ROWS);

type Cell = { id: string; letter: string | null; row: number; col: number };

function cellsOf(rows: string[]): Cell[] {
	const cells: Cell[] = [];
	rows.forEach((row, rowIndex) => {
		for (let col = 0; col < 10; col += 1) {
			const letter = row[col] ?? " ";
			cells.push({
				id: letter.trim() ? letter : `gap-${rowIndex}-${col}`,
				letter: letter.trim() ? letter : null,
				row: rowIndex,
				col,
			});
		}
	});
	return cells;
}

function moveWords(dr: number, dc: number) {
	if (dr === 0 && dc === 0) return "this key never moves";
	const parts: string[] = [];
	if (dr !== 0)
		parts.push(
			`${Math.abs(dr)} row${Math.abs(dr) === 1 ? "" : "s"} ${dr > 0 ? "down" : "up"}`,
		);
	if (dc !== 0)
		parts.push(
			`${Math.abs(dc)} key${Math.abs(dc) === 1 ? "" : "s"} ${dc > 0 ? "right" : "left"}`,
		);
	return `moved ${parts.join(", ")}`;
}

function LayoutBoard({ colemak }: { colemak: boolean }) {
	const reduced = useReducedMotion();
	const [selected, setSelected] = useState("d");

	const cells = cellsOf(colemak ? COLEMAK_ROWS : QWERTY_ROWS);
	const there = (colemak ? QWERTY_POS : COLEMAK_POS).get(selected);
	const qwerty = QWERTY_POS.get(selected);
	const dh = COLEMAK_POS.get(selected);

	if (!there || !qwerty || !dh) return null;

	const dr = dh.row - qwerty.row;
	const dc = dh.col - qwerty.col;
	const travel = Math.sqrt(dr * dr + dc * dc);
	const fromFinger = FINGERS[FINGER_BY_COL[qwerty.col]];
	const toFinger = FINGERS[FINGER_BY_COL[dh.col]];
	const ghost = there.row * 10 + there.col;

	return (
		<>
			<div className="relative">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 grid grid-cols-10 gap-[3px] sm:gap-1"
				>
					{Array.from({ length: 30 }, (_, index) => (
						<div
							key={`band-${index}`}
							className={cn(
								"",
								Math.floor(index / 10) === 1 && "bg-surface0/40",
							)}
						/>
					))}
				</div>

				<div className="relative grid grid-cols-10 gap-[3px] sm:gap-1">
					{cells.map((cell) => {
						if (!cell.letter) {
							return (
								<div
									key={cell.id}
									className="h-7 border border-border/25 bg-surface0/10 sm:h-8"
								/>
							);
						}
						const finger = FINGERS[FINGER_BY_COL[cell.col]];
						const active = cell.letter === selected;
						return (
							<motion.button
								key={cell.id}
								type="button"
								layout={!reduced}
								onClick={() => setSelected(cell.letter as string)}
								aria-pressed={active}
								aria-label={`${cell.letter}, ${ROW_NAMES[cell.row]} row, ${finger.label}`}
								className={cn(
									"relative h-7 border  text-[11px] leading-none sm:h-8",
									active && "z-10",
								)}
								style={{
									borderColor: active
										? finger.color
										: `color-mix(in srgb, ${finger.color} 32%, var(--color-border))`,
									// A selected key is a solid accent fill with the palette's own
									// ink, the same pair the Chip below uses. A tint would put the
									// letter under AAA once an ink ramp is tuned to it.
									// Only the selected key takes a fill: a tint under a label eats
									// the AAA the palette's ink is tuned to, so the finger color
									// stays in the border and the legend.
									backgroundColor: active ? finger.color : "transparent",
									color: active ? "var(--on-accent)" : "var(--text)",
									boxShadow: active ? `0 0 0 1px ${finger.color}` : undefined,
								}}
								transition={
									reduced
										? { duration: 0 }
										: { type: "spring" as const, stiffness: 380, damping: 32 }
								}
							>
								<span className="flex h-full items-center justify-center">
									{cell.letter}
								</span>
								{cell.row === 1 ? (
									<span
										aria-hidden
										className="absolute bottom-[3px] left-1/2 size-[2px] -translate-x-1/2"
										style={{ background: "currentColor", opacity: 0.55 }}
									/>
								) : null}
							</motion.button>
						);
					})}
				</div>

				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 z-20 grid grid-cols-10 gap-[3px] sm:gap-1"
				>
					<div
						className="relative"
						style={{
							gridColumn: `${Math.floor(ghost % 10) + 1}`,
							gridRow: `${Math.floor(ghost / 10) + 1}`,
							border: `1px dashed color-mix(in srgb, ${toFinger.color} 75%, transparent)`,
						}}
					>
						<span
							className="absolute -right-0.5 -top-0.5 size-1.5"
							style={{
								background: toFinger.color,
								boxShadow:
									"0 0 0 2px color-mix(in srgb, var(--mantle) 90%, transparent)",
							}}
						/>
					</div>
				</div>
			</div>

			<div className="mt-3 space-y-1.5 border border-border/60 bg-surface0/30 p-2.5">
				<div className="flex flex-wrap items-center gap-2  text-[11px]">
					<span
						className="inline-flex size-5 items-center justify-center border leading-none text-on-accent"
						style={{
							borderColor: toFinger.color,
							backgroundColor: toFinger.color,
						}}
					>
						{selected}
					</span>
					<span className="text-text">
						{ROW_NAMES[qwerty.row]} → {ROW_NAMES[dh.row]}
					</span>
					<Chip accent={toFinger.color}>{toFinger.label}</Chip>
				</div>
				<div className="text-[11px] leading-relaxed text-overlay1">
					{moveWords(dr, dc)}
					{dr !== 0 || dc !== 0
						? `, ${travel.toFixed(1)} key widths, center to center`
						: ""}
				</div>
				<div className="text-[11px] leading-relaxed text-overlay1">
					{fromFinger.label} → {toFinger.label}
				</div>
			</div>

			<div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1  text-[11px] text-overlay1">
				{[
					{ label: "pinky", color: "var(--pink)" },
					{ label: "ring", color: "var(--mauve)" },
					{ label: "middle", color: "var(--blue)" },
					{ label: "index", color: "var(--teal)" },
				].map((entry) => (
					<span key={entry.label} className="inline-flex items-center gap-1">
						<span className="size-2" style={{ background: entry.color }} />
						{entry.label}
					</span>
				))}
				<span className="text-overlay1">home row shaded</span>
				<span className="text-overlay1">
					click a key to trace where it went
				</span>
			</div>

			<p className="mt-2  text-[11px] leading-relaxed text-overlay1">
				Letters only, punctuation slots dimmed. The dashed outline and dot mark
				where the selected key sits in the other layout.
			</p>
		</>
	);
}

export function LayoutFigure() {
	return (
		<Switch
			on="Colemak DH"
			off="QWERTY"
			label="keyboard layout"
			accent={ACCENT}
		>
			{(colemak) => <LayoutBoard colemak={colemak} />}
		</Switch>
	);
}

/* --------------------------------------------------------- learning curve -- */

const DAYS = 42;
const OLD_WPM = 100;
const LOW_WPM = 24;
const LOW_DAY = 6;
const NOW_WPM = 66;

/** Illustrative speed curve: a smooth drop to a floor, then a recovery that
    never quite reaches the speed the post started from. */
function speedAt(day: number) {
	if (day <= LOW_DAY) {
		const t = day / LOW_DAY;
		const eased = t * t * (3 - 2 * t);
		return OLD_WPM - (OLD_WPM - LOW_WPM) * eased;
	}
	const t = (day - LOW_DAY) / (DAYS - LOW_DAY);
	return LOW_WPM + (NOW_WPM - LOW_WPM) * (1 - (1 - t) ** 2.2);
}

const SERIES = Array.from({ length: DAYS + 1 }, (_, day) => ({
	day,
	wpm: speedAt(day),
}));

const CHART_W = 300;
const CHART_H = 110;
const CHART_TOP = 10;
const CHART_BOTTOM = 96;

const CHART_SIDE = 5;

const yFor = (wpm: number) =>
	CHART_BOTTOM - (wpm / 110) * (CHART_BOTTOM - CHART_TOP);
const xFor = (day: number) =>
	CHART_SIDE + (day / DAYS) * (CHART_W - CHART_SIDE * 2);

const CURVE_PATH = SERIES.map(
	(point, index) =>
		`${index === 0 ? "M" : "L"}${xFor(point.day).toFixed(2)} ${yFor(point.wpm).toFixed(2)}`,
).join(" ");

const AREA_PATH = [
	`M${xFor(0)} ${yFor(OLD_WPM)}`,
	...SERIES.map(
		(point) => `L${xFor(point.day).toFixed(2)} ${yFor(point.wpm).toFixed(2)}`,
	),
	`L${xFor(DAYS)} ${yFor(OLD_WPM)}`,
	"Z",
].join(" ");

const PHASE_NOTE = "six weeks in: 65–70 wpm. Old speed not back yet.";

export function LearningCurve() {
	const reduced = useReducedMotion();

	return (
		<Panel
			title="learning / first six weeks"
			icon={<Activity className="size-3" />}
			footer="illustrative. the shape follows the post's six-week claim, the numbers are a toy."
		>
			<div className="flex items-center justify-between gap-2  text-[11px] text-overlay1">
				<span>wpm</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="inline-block w-4 rounded-none border-t border-dashed border-overlay1" />
					100 wpm before the switch
				</span>
			</div>

			<div className="relative mt-1">
				<svg
					viewBox={`0 0 ${CHART_W} ${CHART_H}`}
					className="h-[110px] w-full"
					preserveAspectRatio="none"
					role="img"
					aria-label={`Illustrative typing speed over ${DAYS} days, ending around ${Math.round(speedAt(DAYS))} words per minute`}
				>
					<path
						d={AREA_PATH}
						fill={`color-mix(in srgb, ${ACCENT} 12%, transparent)`}
					/>
					<line
						x1={CHART_SIDE}
						x2={CHART_W - CHART_SIDE}
						y1={yFor(OLD_WPM)}
						y2={yFor(OLD_WPM)}
						stroke="var(--overlay1)"
						strokeDasharray="4 4"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						opacity={0.7}
					/>
					<motion.path
						d={CURVE_PATH}
						fill="none"
						stroke={ACCENT}
						strokeWidth={1.75}
						strokeLinecap="round"
						strokeLinejoin="round"
						vectorEffect="non-scaling-stroke"
						initial={reduced ? false : { pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{
							duration: reduced ? 0 : 1.4,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
				</svg>

				<div
					aria-hidden
					className="absolute size-2 -translate-x-1/2 -translate-y-1/2"
					style={{
						left: `${(xFor(DAYS) / CHART_W) * 100}%`,
						top: yFor(speedAt(DAYS)),
						background: ACCENT,
						boxShadow: `0 0 0 4px color-mix(in srgb, ${ACCENT} 18%, transparent)`,
					}}
				/>
			</div>

			<p className="mt-2.5  text-[11px] leading-relaxed text-subtext0">
				{PHASE_NOTE}
			</p>
		</Panel>
	);
}
