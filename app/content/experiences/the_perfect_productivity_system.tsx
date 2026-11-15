import { Check, Plus, RotateCcw, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
	Callout,
	Chip,
	Meter,
	Panel,
	Range,
	Stat,
	Tabs,
} from "~/components/post/kit";
import type { PostExperience } from "~/lib/experiences";
import { cn } from "~/lib/utils";

/* Three little tiled panes and one test harness, all built from the post's
   own parts: capture, notes, Anki, and the one-week review. */

function Lights() {
	return (
		<span className="flex items-center gap-1" aria-hidden="true">
			<span className="size-2 rounded-full bg-red/70" />
			<span className="size-2 rounded-full bg-yellow/70" />
			<span className="size-2 rounded-full bg-green/70" />
		</span>
	);
}

const BUTTON =
	"inline-flex items-center gap-1.5 rounded-full border border-border bg-surface0/40 px-2.5 py-1  text-[11px] text-subtext0 transition-colors hover:border-mauve/50 hover:text-mauve";

/* --- hero: the whole system as a flow ----------------------------------- */

const SYSTEM_PARTS = [
	{
		label: "capture",
		note: "a thought arrives, Obsidian takes it. no deciding where it lives.",
	},
	{
		label: "notes",
		note: "one place for everything you know. the second brain, not a workspace.",
	},
	{
		label: "anki",
		note: "flashcards for the few things you actually want to remember.",
	},
	{
		label: "review",
		note: "a week later: did it help? keep it. otherwise delete it.",
	},
] as const;

const NODE_W = 170;
const NODE_H = 58;
const NODES = [
	{ x: 24, y: 16 },
	{ x: 226, y: 16 },
	{ x: 226, y: 120 },
	{ x: 24, y: 120 },
] as const;

/* capture -> notes -> anki -> review, and a dashed week back to the start. */
const LINKS = [
	"M194 45 H216 M211 41 L217 45 L211 49",
	"M311 74 V108 M307 105 L311 111 L315 105",
	"M226 149 H204 M209 145 L203 149 L209 153",
	"M109 120 V86 M105 90 L109 84 L113 90",
] as const;

function SystemFlow() {
	const reduced = useReducedMotion();
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<Panel
			title="~/system"
			icon={<Lights />}
			footer="the dashed arrow is one week of not thinking about it."
		>
			<svg
				viewBox="0 0 420 196"
				className="w-full"
				aria-label="The system: capture, notes, anki, review"
			>
				{LINKS.map((d, index) => {
					const dashed = index === LINKS.length - 1;
					return (
						<motion.path
							key={d}
							d={d}
							fill="none"
							stroke={dashed ? "var(--mauve)" : "var(--overlay0)"}
							strokeWidth={1.5}
							strokeLinecap="round"
							strokeDasharray={dashed ? "4 5" : undefined}
							initial={
								reduced
									? undefined
									: dashed
										? { opacity: 0 }
										: { opacity: 0, pathLength: 0 }
							}
							whileInView={
								reduced
									? undefined
									: dashed
										? { opacity: 1 }
										: { opacity: 1, pathLength: 1 }
							}
							viewport={{ once: true }}
							transition={{
								duration: 0.5,
								delay: 0.15 + index * 0.1,
								ease: "easeInOut",
							}}
						/>
					);
				})}

				{NODES.map((node, index) => {
					const active = hovered === index;
					const part = SYSTEM_PARTS[index];
					return (
						<motion.g
							key={part.label}
							role="button"
							tabIndex={0}
							aria-label={`${part.label}. ${part.note}`}
							onPointerEnter={() => setHovered(index)}
							onPointerLeave={() =>
								setHovered((current) => (current === index ? null : current))
							}
							onFocus={() => setHovered(index)}
							onBlur={() =>
								setHovered((current) => (current === index ? null : current))
							}
							onClick={() => setHovered(index)}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ")
									setHovered(index);
							}}
							initial={reduced ? undefined : { opacity: 0, y: 8 }}
							whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.35, delay: 0.25 + index * 0.08 }}
							className="cursor-pointer"
						>
							<rect
								x={node.x}
								y={node.y}
								width={NODE_W}
								height={NODE_H}
								rx={12}
								fill={
									active
										? "color-mix(in srgb, var(--mauve) 18%, transparent)"
										: "var(--surface0)"
								}
								stroke={active ? "var(--mauve)" : "var(--surface1)"}
								strokeWidth={1.25}
								style={{ transition: "fill 180ms ease, stroke 180ms ease" }}
							/>
							<text
								x={node.x + 16}
								y={node.y + 22}
								fontSize={10}
								letterSpacing="0.12em"
								fill="var(--overlay1)"
								style={{ fontFamily: "inherit" }}
							>
								{`0${index + 1}`}
							</text>
							<text
								x={node.x + 16}
								y={node.y + 44}
								fontSize={18}
								fill={active ? "var(--mauve)" : "var(--text)"}
								style={{ fontFamily: "inherit", transition: "fill 180ms ease" }}
							>
								{part.label}
							</text>
						</motion.g>
					);
				})}
			</svg>

			<div className="mt-3 flex min-h-11 items-start gap-2 rounded-md border border-border/70 bg-surface0/20 px-2.5 py-2">
				<span className="mt-0.5  text-[10px] uppercase tracking-[0.14em] text-overlay0">
					why
				</span>
				<AnimatePresence mode="wait" initial={false}>
					<motion.p
						key={hovered === null ? "idle" : SYSTEM_PARTS[hovered].label}
						initial={reduced ? undefined : { opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -4 }}
						transition={{ duration: reduced ? 0 : 0.16 }}
						className="text-[11px] leading-relaxed text-subtext0"
					>
						{hovered === null
							? "hover or tap a part. that is the whole system."
							: SYSTEM_PARTS[hovered].note}
					</motion.p>
				</AnimatePresence>
			</div>
		</Panel>
	);
}

/* --- the treadmill: one more app, same system --------------------------- */

const APP_NAMES = [
	"notion",
	"a plugin",
	"a template",
	"a dashboard",
	"a script",
	"a graph view",
	"a sync bot",
	"a second vault",
	"a query",
	"one more plugin",
];

const APP_ACCENTS = [
	"var(--pink)",
	"var(--teal)",
	"var(--blue)",
	"var(--green)",
	"var(--peach)",
	"var(--yellow)",
	"var(--sky)",
	"var(--lavender)",
	"var(--mauve)",
	"var(--red)",
];

function ToolChurn() {
	const reduced = useReducedMotion();
	const [count, setCount] = useState(1);
	const tuned = 20 + (count - 1) * 2;

	return (
		<Panel
			title="~/apps"
			icon={<Lights />}
			footer="the 20 hours tuned and the 2 hours used are the post's numbers. the rest is a joke."
		>
			<div className="flex flex-wrap items-center gap-1.5">
				{SYSTEM_PARTS.map((part) => (
					<Chip key={part.label}>{part.label}</Chip>
				))}
				<span className="text-[10px] text-overlay0">still four parts.</span>
			</div>

			<div className="mt-3 flex min-h-9 flex-wrap items-center gap-1.5">
				<AnimatePresence initial={false}>
					{Array.from({ length: count }, (_, index) => (
						<motion.span
							key={index}
							layout={!reduced}
							initial={reduced ? undefined : { opacity: 0, scale: 0.6, y: 6 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={reduced ? undefined : { opacity: 0, scale: 0.6 }}
							transition={{ type: "spring", stiffness: 420, damping: 26 }}
							className="inline-flex"
						>
							<Chip accent={APP_ACCENTS[index % APP_ACCENTS.length]}>
								{APP_NAMES[index % APP_NAMES.length]}
							</Chip>
						</motion.span>
					))}
				</AnimatePresence>
			</div>

			<div className="mt-3 grid grid-cols-3 gap-2">
				<Stat
					label="apps"
					value={
						<motion.span
							key={count}
							initial={reduced ? undefined : { scale: 1.45, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className="inline-block"
						>
							{String(count).padStart(2, "0")}
						</motion.span>
					}
				/>
				<Stat
					label="hours tuned"
					value={
						<motion.span
							key={tuned}
							initial={reduced ? undefined : { scale: 1.45, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className="inline-block"
						>
							{`${tuned}h`}
						</motion.span>
					}
				/>
				<Stat label="hours used" value="2h" />
			</div>

			<div className="mt-3 flex flex-wrap gap-2">
				<motion.button
					type="button"
					onClick={() => setCount((value) => value + 1)}
					whileTap={reduced ? undefined : { scale: 0.96 }}
					className={cn(BUTTON, "border-mauve/50 bg-mauve/15 text-mauve")}
				>
					<Plus className="size-3" />
					another app
				</motion.button>
				<motion.button
					type="button"
					onClick={() => setCount(1)}
					whileTap={reduced ? undefined : { scale: 0.96 }}
					className={BUTTON}
				>
					<RotateCcw className="size-3" />
					start over
				</motion.button>
			</div>

			<Callout accent="var(--pink)" icon={<Sparkles className="size-3.5" />}>
				A joke. The app count is the punchline. The four parts are the point.
			</Callout>
		</Panel>
	);
}

/* --- the day: scrub it -------------------------------------------------- */

const DAY = [
	{
		at: 7,
		short: "capture",
		title: "catch it",
		body: "a thought, a link, half a sentence. it goes into Obsidian and out of your head.",
		accent: "var(--mauve)",
	},
	{
		at: 9,
		short: "work",
		title: "the work",
		body: "the system stays closed. this is the part that actually counts.",
		accent: "var(--green)",
	},
	{
		at: 19,
		short: "anki",
		title: "ten minutes",
		body: "the cards you made earlier. remembering is the only homework left.",
		accent: "var(--teal)",
	},
	{
		at: 22,
		short: "review",
		title: "two minutes",
		body: "did anything new earn its place this week? keep it or delete it, then close the lid.",
		accent: "var(--pink)",
	},
] as const;

const DAY_START = 6;
const DAY_END = 23;

function DayStrip() {
	const reduced = useReducedMotion();
	const [hour, setHour] = useState(7);
	const index = hour < 9 ? 0 : hour < 19 ? 1 : hour < 22 ? 2 : 3;
	const step = DAY[index];
	const percent = ((hour - DAY_START) / (DAY_END - DAY_START)) * 100;
	const clock = `${String(hour).padStart(2, "0")}:00`;
	const spring = reduced
		? { duration: 0 }
		: { type: "spring" as const, stiffness: 140, damping: 22 };

	return (
		<Panel
			title="~/day"
			icon={<Lights />}
			footer="one made-up day. a toy, not a schedule."
		>
			<div className="flex items-center justify-between gap-2">
				<span className="text-lg tabular-nums text-text">{clock}</span>
				<Chip accent={step.accent}>{step.short}</Chip>
			</div>

			<div className="relative mt-2 h-6">
				<div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface0" />
				<motion.div
					className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
					style={{ background: step.accent }}
					animate={{ width: `${percent}%` }}
					transition={spring}
				/>
				{DAY.map((entry) => (
					<span
						key={entry.short}
						className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
						style={{
							left: `${((entry.at - DAY_START) / (DAY_END - DAY_START)) * 100}%`,
							background: "var(--surface2)",
						}}
					/>
				))}
				<motion.span
					className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-base"
					style={{ background: step.accent }}
					animate={{ left: `${percent}%` }}
					transition={spring}
				/>
			</div>

			<div className="mt-2 min-h-20">
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={step.short}
						initial={reduced ? undefined : { opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -6 }}
						transition={{ duration: reduced ? 0 : 0.16 }}
					>
						<div className="text-xs text-text">{step.title}</div>
						<div className="mt-1  text-[11px] leading-relaxed text-overlay1">
							{step.body}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
				{DAY.map((entry, position) => {
					const active = position === index;
					return (
						<button
							key={entry.short}
							type="button"
							onClick={() => setHour(entry.at)}
							aria-pressed={active}
							className={cn(
								"relative rounded-md px-2 py-1.5 text-left  text-[10px] transition-colors",
								active
									? "text-crust"
									: "text-overlay1 hover:bg-surface0/50 hover:text-subtext0",
							)}
						>
							{active ? (
								<motion.span
									layoutId="day-step"
									className="absolute inset-0 -z-10 rounded-md"
									style={{ background: entry.accent }}
									transition={
										reduced
											? { duration: 0 }
											: { type: "spring", stiffness: 380, damping: 30 }
									}
								/>
							) : null}
							<span className="block tabular-nums">
								{String(entry.at).padStart(2, "0")}:00
							</span>
							<span className="block uppercase tracking-[0.12em] opacity-80">
								{entry.short}
							</span>
						</button>
					);
				})}
			</div>

			<div className="mt-3">
				<Range
					value={hour}
					onChange={setHour}
					min={DAY_START}
					max={DAY_END}
					step={1}
					label="hour"
				/>
			</div>
		</Panel>
	);
}

/* --- the one-week test -------------------------------------------------- */

const REVIEW_QUESTIONS = [
	"did it actually do the thing?",
	"is it as useful as it looked on day 0?",
	"did it slow the rest down?",
];

function Text({ children }: { children: React.ReactNode }) {
	return <p className="leading-relaxed text-subtext0">{children}</p>;
}

function Quiet({ children }: { children: React.ReactNode }) {
	return <p className="text-overlay1">{children}</p>;
}

const TEST_TABS = [
	{
		id: "day-0",
		label: "day 0",
		content: (
			<div className="space-y-3">
				<Text>you found it. this one fixes everything.</Text>
				<Meter
					label="how much it feels like it will help"
					value={94}
					accent="var(--pink)"
					suffix="%"
				/>
				<Quiet>close the tab anyway. give it seven days.</Quiet>
			</div>
		),
	},
	{
		id: "day-7",
		label: "day 7",
		content: (
			<div className="space-y-3">
				<Text>still on your mind? then it earns one week of real use.</Text>
				<Meter
					label="still wanted after a week"
					value={70}
					accent="var(--mauve)"
					suffix="%"
				/>
				<Quiet>forgot about it? that was the whole test.</Quiet>
			</div>
		),
	},
	{
		id: "day-14",
		label: "day 14",
		content: (
			<div className="space-y-3">
				<Text>one week in. ask three things:</Text>
				<div className="space-y-1.5 border-l border-border pl-3">
					{REVIEW_QUESTIONS.map((question) => (
						<div key={question} className="flex gap-1.5">
							<Check className="mt-0.5 size-3 shrink-0 text-teal" />
							<span>{question}</span>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		id: "keep-or-delete",
		label: "review",
		content: (
			<div className="space-y-3">
				<Text>net-positive? keep it. otherwise delete it.</Text>
				<Meter
					label="downtime it added to the week"
					value={18}
					accent="var(--teal)"
					suffix="%"
				/>
				<Quiet>the hours you spent setting it up are gone either way.</Quiet>
			</div>
		),
	},
];

function WeekTest() {
	return (
		<>
			<div className="not-prose mt-5 flex flex-wrap items-center gap-2">
				<Chip accent="var(--teal)">the one-week test</Chip>
				<span className="text-[10px] text-overlay0">
					wait a week, try a week, then decide
				</span>
			</div>
			<Tabs tabs={TEST_TABS} />
		</>
	);
}

const experience: PostExperience = {
	hero: SystemFlow,
	visuals: {
		"the-productivity-system-treadmill": ToolChurn,
		"what-do-you-need": DayStrip,
		"but-when-do-i-actually-need-a-new-setup-plugin": WeekTest,
	},
};

export default experience;
