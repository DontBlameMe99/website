import { motion, useReducedMotion } from "motion/react";
import { Panel } from "~/components/post/kit";

/* The whole system as one static flow, built from the post's own parts:
   capture, notes, Anki, and the one-week review. */

function Lights() {
	return (
		<span className="flex items-center gap-1" aria-hidden="true">
			<span className="size-2 bg-red/70" />
			<span className="size-2 bg-yellow/70" />
			<span className="size-2 bg-green/70" />
		</span>
	);
}

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

export function SystemFlow() {
	const reduced = useReducedMotion();

	return (
		<Panel
			title="~/system"
			icon={<Lights />}
			footer="the dashed arrow is one week of not thinking about it."
		>
			<svg
				viewBox="0 0 420 196"
				className="w-full"
				role="img"
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
					const part = SYSTEM_PARTS[index];
					return (
						<motion.g
							key={part.label}
							initial={reduced ? undefined : { opacity: 0, y: 8 }}
							whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.35, delay: 0.25 + index * 0.08 }}
						>
							<rect
								x={node.x}
								y={node.y}
								width={NODE_W}
								height={NODE_H}
								rx={12}
								fill="color-mix(in srgb, var(--surface0) 45%, var(--well-surface))"
								stroke="var(--surface1)"
								strokeWidth={1.25}
							/>
							<text
								x={node.x + 16}
								y={node.y + 22}
								fontSize={10}
								letterSpacing="0.12em"
								fill="var(--subtext1)"
								style={{ fontFamily: "inherit" }}
							>
								{`0${index + 1}`}
							</text>
							<text
								x={node.x + 16}
								y={node.y + 44}
								fontSize={18}
								fill="var(--text)"
								style={{ fontFamily: "inherit" }}
							>
								{part.label}
							</text>
						</motion.g>
					);
				})}
			</svg>

			<div className="mt-3 space-y-1.5">
				{SYSTEM_PARTS.map((part) => (
					<p
						key={part.label}
						className="text-[11px] leading-relaxed text-subtext0"
					>
						{part.note}
					</p>
				))}
			</div>
		</Panel>
	);
}
