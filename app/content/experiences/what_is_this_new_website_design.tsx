import { ArrowRight, Plus, RotateCcw, Route, Waypoints } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const SPRING = { type: "spring" as const, stiffness: 340, damping: 30 };

function springFor(reduced: boolean) {
	return reduced ? { duration: 0 } : SPRING;
}

/* ---------------------------------------------------------------- hero ---- */

function MiniRail() {
	const rows = [0, 1, 1, 2, 1, 2, 1];

	return (
		<div className="flex w-12 flex-col gap-1 rounded-[4px] bg-mantle/50 p-1">
			{rows.map((depth, index) => (
				<div
					key={index}
					className="flex items-center gap-0.5"
					style={{ paddingLeft: depth * 3 }}
				>
					<span
						className={cn(
							"size-1 shrink-0 rounded-[1px]",
							index === 0 ? "bg-mauve" : "bg-surface2",
						)}
					/>
					<span
						className="h-1 rounded-full bg-surface1"
						style={{ width: 12 + (index % 3) * 5 }}
					/>
				</div>
			))}
		</div>
	);
}

const MINI_NODES: [number, number][] = [
	[27, 12],
	[10, 32],
	[44, 30],
	[18, 52],
	[40, 58],
	[26, 74],
];

const MINI_EDGES: [number, number][] = [
	[0, 1],
	[0, 2],
	[1, 3],
	[2, 4],
	[3, 4],
	[3, 5],
	[4, 5],
];

function MiniGraph({ reduced }: { reduced: boolean }) {
	return (
		<div className="h-full w-[54px] rounded-[4px] bg-mantle/50 p-1">
			<svg
				viewBox="0 0 54 84"
				className="h-full w-full"
				role="img"
				aria-label="A miniature note graph"
			>
				{MINI_EDGES.map(([a, b], index) => (
					<motion.line
						key={`${a}-${b}`}
						x1={MINI_NODES[a][0]}
						y1={MINI_NODES[a][1]}
						x2={MINI_NODES[b][0]}
						y2={MINI_NODES[b][1]}
						stroke="var(--mauve)"
						strokeWidth={0.8}
						initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 0.55 }}
						transition={{ duration: 0.45, delay: 0.12 + index * 0.05 }}
					/>
				))}
				{MINI_NODES.map(([x, y], index) => (
					<motion.circle
						key={index}
						cx={x}
						cy={y}
						fill={index === 0 ? "var(--mauve)" : "var(--overlay2)"}
						initial={reduced ? undefined : { r: 0 }}
						animate={{ r: index === 0 ? 2.6 : 2 }}
						transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
					/>
				))}
			</svg>
		</div>
	);
}

const ARTICLE_LINES = [
	["92%", "78%", "86%"],
	["88%", "64%"],
	["90%", "84%", "58%"],
];

function MiniArticle({ fresh, reduced }: { fresh: boolean; reduced: boolean }) {
	return (
		<div className="flex h-full min-w-0 flex-col gap-1.5 rounded-[4px] bg-mantle/50 p-1.5">
			<motion.div
				className={cn(
					"h-1.5 rounded-full",
					fresh ? "bg-mauve/80" : "bg-surface1",
				)}
				animate={{ width: fresh ? "72%" : "64%" }}
				transition={springFor(reduced)}
			/>
			<AnimatePresence initial={false}>
				{fresh ? (
					<motion.div
						key="tags"
						className="flex gap-1"
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.2 }}
					>
						{["meta", "design"].map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-mauve/40 bg-mauve/10 px-1  text-[7px] leading-3 text-mauve"
							>
								#{tag}
							</span>
						))}
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className="space-y-1">
				{ARTICLE_LINES.map((paragraph, index) => (
					<div key={index} className="space-y-1">
						{paragraph.map((width) => (
							<div
								key={width}
								className="h-1 rounded-full bg-surface1/80"
								style={{ width }}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function MiniLayout({ fresh, reduced }: { fresh: boolean; reduced: boolean }) {
	const transition = springFor(reduced);

	return (
		<div className="overflow-hidden rounded-panel border border-border/80 bg-base">
			<div className="flex items-center gap-2 border-b border-border/70 bg-mantle/60 px-2.5 py-1.5">
				<span className="flex shrink-0 gap-1">
					<span className="size-1.5 rounded-full bg-[var(--red)]" />
					<span className="size-1.5 rounded-full bg-[var(--yellow)]" />
					<span className="size-1.5 rounded-full bg-[var(--green)]" />
				</span>
				<span className="truncate  text-[9px] text-overlay1">
					dontblameme.codeberg.page
				</span>
				<span className="ml-auto shrink-0  text-[8px] uppercase tracking-[0.12em] text-overlay0">
					{fresh ? "rail + graph" : "one column"}
				</span>
			</div>
			<div className="flex items-stretch gap-1.5 p-2">
				<AnimatePresence initial={false}>
					{fresh ? (
						<motion.div
							key="rail"
							className="shrink-0 overflow-hidden"
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: 48, opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={transition}
						>
							<MiniRail />
						</motion.div>
					) : null}
				</AnimatePresence>
				<div className="min-w-0 flex-1">
					<MiniArticle fresh={fresh} reduced={reduced} />
				</div>
				<AnimatePresence initial={false}>
					{fresh ? (
						<motion.div
							key="graph"
							className="shrink-0 overflow-hidden"
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: 54, opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={transition}
						>
							<MiniGraph reduced={reduced} />
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	);
}

export function HeroFigure() {
	const reduced = useReducedMotion();

	return (
		<Switch on="new layout" off="old layout" initial={false}>
			{(fresh) => (
				<div className="space-y-2">
					<MiniLayout fresh={fresh} reduced={!!reduced} />
					<p className="text-[10px] leading-relaxed text-overlay0">
						Wireframes only, no screenshots. The toggle adds a directory rail
						and a graph rail to the same page.
					</p>
				</div>
			)}
		</Switch>
	);
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

const SPARE_EDGES: Edge[] = [
	[0, 4],
	[1, 9],
	[4, 11],
	[5, 7],
	[7, 12],
	[14, 6],
	[2, 11],
	[8, 0],
];

const hexId = (index: number) =>
	`#${(0x3f0 + index * 0x47).toString(16).padStart(4, "0")}`;
const edgeKey = ([a, b]: Edge) => `${a}-${b}`;

export function NoteGraphFigure() {
	const reduced = useReducedMotion();
	const [extra, setExtra] = useState<Edge[]>([]);
	const [active, setActive] = useState<number | null>(null);
	const [newest, setNewest] = useState<string | null>(null);

	const edges: Edge[] = [...BASE_EDGES, ...extra];
	const neighbours = new Set<number>();
	if (active !== null) {
		for (const [a, b] of edges) {
			if (a === active) neighbours.add(b);
			if (b === active) neighbours.add(a);
		}
	}

	const exhausted = extra.length === SPARE_EDGES.length;

	const connect = () => {
		if (exhausted) {
			setExtra([]);
			setNewest(null);
			setActive(null);
			return;
		}
		const edge = SPARE_EDGES[extra.length];
		if (!edge) return;
		setExtra([...extra, edge]);
		setNewest(edgeKey(edge));
		setActive(edge[0]);
	};

	const lit = (a: number, b: number) =>
		active === null || a === active || b === active;

	return (
		<Panel
			title="note graph"
			icon={<Waypoints className="size-3.5" />}
			footer="Hover a note to light its links. Connect adds one more edge."
		>
			<svg
				viewBox="0 0 320 230"
				className="block w-full select-none"
				aria-label="A toy note graph: sixteen notes and the links between them"
			>
				{edges.map((edge, index) => {
					const [a, b] = edge;
					const key = edgeKey(edge);
					const isNew = key === newest;
					const touched = active !== null && (a === active || b === active);
					return (
						<motion.line
							key={key}
							x1={NODES[a][0]}
							y1={NODES[a][1]}
							x2={NODES[b][0]}
							y2={NODES[b][1]}
							stroke={
								touched
									? "var(--mauve)"
									: isNew
										? "var(--peach)"
										: "var(--overlay0)"
							}
							strokeLinecap="round"
							initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
							animate={{
								pathLength: 1,
								opacity: lit(a, b) ? 0.85 : 0.16,
								strokeWidth: isNew ? 2.2 : touched ? 1.6 : 1,
							}}
							transition={{
								duration: reduced ? 0 : 0.35,
								delay: index < BASE_EDGES.length && !reduced ? index * 0.03 : 0,
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
							role="img"
							aria-label={`note ${hexId(index)}`}
							tabIndex={0}
							onPointerEnter={() => setActive(index)}
							onPointerLeave={() => setActive(null)}
							onFocus={() => setActive(index)}
							onBlur={() => setActive(null)}
							className="cursor-pointer outline-none"
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
				className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1  text-[10px] text-overlay1"
			>
				<AnimatePresence initial={false}>
					<motion.span
						key={active ?? "idle"}
						className="inline-flex items-center gap-2"
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.14 }}
					>
						{active === null ? (
							<span className="text-overlay0">hover a note</span>
						) : (
							<>
								<Chip>{hexId(active)}</Chip>
								<span className="text-subtext0">
									note {String(active + 1).padStart(2, "0")}
								</span>
								<span className="text-overlay0">links {neighbours.size}</span>
							</>
						)}
					</motion.span>
				</AnimatePresence>
				<span className="ml-auto tabular-nums text-overlay0">
					{edges.length} edges
				</span>
				<button
					type="button"
					onClick={connect}
					className={cn(
						"inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 transition-colors",
						exhausted
							? "border-border text-overlay1 hover:border-mauve/50 hover:text-mauve"
							: "border-mauve/40 bg-mauve/10 text-mauve hover:bg-mauve/20",
					)}
				>
					{exhausted ? (
						<RotateCcw className="size-3" />
					) : (
						<Plus className="size-3" />
					)}
					{exhausted ? "reset" : "connect"}
				</button>
			</div>
		</Panel>
	);
}

/* ------------------------------------------------------------ redirects ---- */

const REDIRECTS = [
	{
		id: "feed",
		chip: "index.xml",
		from: "index.xml",
		to: "https://dontblameme.codeberg.page/index.xml",
	},
	{
		id: "sitemap",
		chip: "sitemap.xml",
		from: "sitemap.xml",
		to: "https://dontblameme.codeberg.page/sitemap.xml",
	},
	{
		id: "post",
		chip: "posts/…",
		from: "/posts/my-blog-post",
		to: "https://dontblameme.codeberg.page/Blog/my-blog-post",
	},
];

export function RedirectFigure() {
	const reduced = useReducedMotion();
	const [selected, setSelected] = useState(REDIRECTS[0].id);
	const current =
		REDIRECTS.find((entry) => entry.id === selected) ?? REDIRECTS[0];

	return (
		<Panel
			title="redirects"
			icon={<Route className="size-3.5" />}
			footer="Old link in, new link out, three links named in this post."
		>
			<div className="flex flex-wrap gap-1">
				{REDIRECTS.map((entry) => (
					<button
						key={entry.id}
						type="button"
						onClick={() => setSelected(entry.id)}
						className={cn(
							"relative rounded-md px-2 py-1  text-[10px] transition-colors",
							entry.id === selected
								? "text-base"
								: "text-overlay1 hover:text-text",
						)}
					>
						{entry.id === selected ? (
							<motion.span
								layoutId="redirect-pill"
								className="absolute inset-0 -z-10 rounded-md bg-mauve"
								transition={springFor(!!reduced)}
							/>
						) : null}
						{entry.chip}
					</button>
				))}
			</div>

			<div className="mt-2.5 rounded-panel border border-border/70 bg-surface0/20 p-2.5">
				<div className="flex items-baseline gap-2  text-[10px]">
					<span className="shrink-0 text-overlay0">GET</span>
					<span className="min-w-0 break-all text-subtext0">
						{current.from}
					</span>
				</div>

				<div className="my-2 flex items-center gap-1.5">
					<motion.span
						key={`${current.id}-track`}
						className="h-px flex-1"
						style={{
							transformOrigin: "left",
							backgroundImage:
								"repeating-linear-gradient(to right, var(--surface2) 0 4px, transparent 4px 8px)",
						}}
						initial={reduced ? undefined : { scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
					/>
					<motion.span
						key={`${current.id}-arrow`}
						className="text-mauve"
						initial={reduced ? undefined : { x: -6, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={springFor(!!reduced)}
					>
						<ArrowRight className="size-3" />
					</motion.span>
				</div>

				<div className="flex items-start gap-2">
					<span className="shrink-0">
						<Chip accent="var(--green)">301</Chip>
					</span>
					<div className="min-w-0">
						<div className="text-[9px] uppercase tracking-[0.12em] text-overlay0">
							location
						</div>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={current.id}
								className="break-all  text-[10px] leading-relaxed text-text"
								initial={{ opacity: 0, y: 4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -4 }}
								transition={{ duration: 0.16 }}
							>
								{current.to}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</Panel>
	);
}
