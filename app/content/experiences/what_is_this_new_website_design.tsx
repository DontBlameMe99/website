import { Waypoints } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel } from "~/components/post/kit";

const SPRING = { type: "spring" as const, stiffness: 340, damping: 30 };

function springFor(reduced: boolean) {
	return reduced ? { duration: 0 } : SPRING;
}

/* --------------------------------------------------------------- graph ---- */

type Edge = [number, number];

const NODES: [number, number][] = [
	[160, 114],
	[92, 58],
	[54, 128],
	[86, 190],
	[150, 208],
	[214, 190],
	[264, 146],
	[258, 76],
	[204, 38],
	[134, 42],
	[34, 74],
	[26, 168],
	[206, 112],
	[118, 152],
	[242, 152],
	[188, 158],
];

const BASE_EDGES: Edge[] = [
	[0, 1],
	[0, 9],
	[0, 13],
	[0, 12],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[8, 9],
	[10, 1],
	[10, 2],
	[10, 11],
	[11, 3],
	[12, 6],
	[12, 14],
	[15, 5],
	[15, 13],
];

const hexId = (index: number) =>
	`#${(0x3f0 + index * 0x47).toString(16).padStart(4, "0")}`;
const edgeKey = ([a, b]: Edge) => `${a}-${b}`;

export function NoteGraphFigure() {
	const reduced = useReducedMotion();
	const [active, setActive] = useState<number | null>(null);

	const neighbours = new Set<number>();
	if (active !== null) {
		for (const [a, b] of BASE_EDGES) {
			if (a === active) neighbours.add(b);
			if (b === active) neighbours.add(a);
		}
	}

	const lit = (a: number, b: number) =>
		active === null || a === active || b === active;

	return (
		<Panel
			title="note graph"
			icon={<Waypoints className="size-3.5" />}
			footer="Hover or focus a note to light its links."
		>
			<svg
				viewBox="0 0 320 230"
				className="block w-full select-none"
				role="group"
				aria-label="A toy note graph: sixteen notes and the links between them"
			>
				{BASE_EDGES.map((edge, index) => {
					const [a, b] = edge;
					const key = edgeKey(edge);
					const touched = active !== null && (a === active || b === active);
					return (
						<motion.line
							key={key}
							x1={NODES[a][0]}
							y1={NODES[a][1]}
							x2={NODES[b][0]}
							y2={NODES[b][1]}
							stroke={touched ? "var(--mauve)" : "var(--overlay0)"}
							strokeLinecap="round"
							initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
							animate={{
								pathLength: 1,
								opacity: lit(a, b) ? 0.85 : 0.16,
								strokeWidth: touched ? 1.6 : 1,
							}}
							transition={{
								duration: reduced ? 0 : 0.35,
								delay: !reduced ? index * 0.03 : 0,
							}}
						/>
					);
				})}
				{NODES.map(([x, y], index) => {
					const isActive = index === active;
					const isNeighbour = neighbours.has(index);
					const dim = active !== null && !isActive && !isNeighbour;
					return (
						<motion.g
							key={hexId(index)}
							role="button"
							tabIndex={0}
							aria-label={`Note ${hexId(index)}, ${BASE_EDGES.filter(([a, b]) => a === index || b === index).length} links`}
							onFocus={() => setActive(index)}
							onBlur={() => setActive(null)}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									setActive(index);
								}
							}}
							onPointerEnter={() => setActive(index)}
							data-note={index}
							onPointerLeave={(event) => {
								const focused =
									event.currentTarget.ownerSVGElement?.querySelector(
										"[data-note]:focus",
									);
								setActive(
									focused ? Number(focused.getAttribute("data-note")) : null,
								);
							}}
							animate={{ opacity: dim ? 0.35 : 1 }}
							transition={{ duration: 0.15 }}
						>
							<circle cx={x} cy={y} r={12} fill="transparent" />
							<motion.circle
								cx={x}
								cy={y}
								fill={
									isActive
										? "var(--mauve)"
										: isNeighbour
											? "var(--lavender)"
											: "var(--overlay2)"
								}
								stroke="var(--base)"
								strokeWidth={1.5}
								animate={{ r: isActive ? 7 : 4.5 }}
								transition={springFor(!!reduced)}
							/>
							{isActive ? (
								<motion.text
									x={x + 10}
									y={y - 8}
									fill="var(--mauve)"
									fontSize={8}
									fontFamily="var(--font-sans)"
									initial={reduced ? undefined : { opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									{hexId(index)}
								</motion.text>
							) : null}
						</motion.g>
					);
				})}
			</svg>
			<div
				aria-live="polite"
				className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1  text-[11px] text-overlay1"
			>
				<AnimatePresence initial={false}>
					<motion.span
						key={active ?? "idle"}
						className="inline-flex items-center gap-2"
						initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
						animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
						exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
						transition={{ duration: 0.14 }}
					>
						{active === null ? (
							<span className="text-overlay1">hover or focus a note</span>
						) : (
							<>
								<Chip>{hexId(active)}</Chip>
								<span className="text-subtext0">
									note {String(active + 1).padStart(2, "0")}
								</span>
								<span className="text-overlay1">links {neighbours.size}</span>
							</>
						)}
					</motion.span>
				</AnimatePresence>
				<span className="ml-auto tabular-nums text-overlay1">
					{BASE_EDGES.length} edges
				</span>
			</div>
		</Panel>
	);
}
