import { FileText, Folder, Waypoints } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Chip, Panel, Range, Stat, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Figures for the Logseq post. The article keeps its own prose: every number
   and phrase quoted below is lifted from it. */

const MAUVE = "var(--mauve)";
const PEACH = "var(--peach)";

type Problem = {
	n: string;
	title: string;
	logseq: string;
	logseqTag: string;
	obsidian: string;
	obsidianTag: string;
};

const PROBLEMS: Problem[] = [
	{
		n: "1",
		title: "slow performance",
		logseq: "Searching took ~3 seconds and opening notes took around a second.",
		logseqTag: "~3s search",
		obsidian: "Searching for files is snappy, opening them doesn't take ages.",
		obsidianTag: "snappy",
	},
	{
		n: "2",
		title: "LaTeX support",
		logseq: "You can write LaTeX, but there are no automatic completions.",
		logseqTag: "no autocomplete",
		obsidian: "A live rendered preview, and awesome autocompletes.",
		obsidianTag: "LaTeX Suite",
	},
	{
		n: "3",
		title: "syncing conflicts",
		logseq: "~10 sync conflicts in the same time.",
		logseqTag: "~10 a day",
		obsidian: "Around one sync conflict on a heavy mixed-device day.",
		obsidianTag: "~1 a day",
	},
	{
		n: "4",
		title: "bad links",
		logseq: "[MyFile|1f02da65-77b8-6821-86b8-562aef941e89]",
		logseqTag: "uuid links",
		obsidian: "[[FileName]], and that's it.",
		obsidianTag: "[[FileName]]",
	},
	{
		n: "5",
		title: "plugins",
		logseq: "374 plugins at the time of writing.",
		logseqTag: "374",
		obsidian: "Around 2,450 plugins, and counting.",
		obsidianTag: "2,450",
	},
];

export function ProblemsFigure() {
	const reduced = useReducedMotion();

	return (
		<figure className="not-prose my-5">
			<div className="-my-5">
				<Switch on="obsidian" off="logseq" initial={false}>
					{(obsidian) => (
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={obsidian ? "obsidian" : "logseq"}
								className="space-y-2.5"
								initial={reduced ? false : { opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
								transition={{ duration: reduced ? 0 : 0.16 }}
							>
								{PROBLEMS.map((problem) => (
									<div key={problem.title} className="space-y-0.5">
										<div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
											<span className="text-[11px] text-text">
												<span className="mr-1 text-overlay0">{problem.n}</span>
												{problem.title}
											</span>
											<Chip accent={obsidian ? MAUVE : PEACH}>
												{obsidian ? problem.obsidianTag : problem.logseqTag}
											</Chip>
										</div>
										<p className="text-[11px] leading-relaxed text-overlay1">
											{obsidian ? problem.obsidian : problem.logseq}
										</p>
									</div>
								))}
							</motion.div>
						</AnimatePresence>
					)}
				</Switch>
			</div>
			<figcaption className="mt-2  text-[10px] leading-relaxed text-overlay1">
				The same five problems, read side by side. Numbers and phrasing are the
				author's.
			</figcaption>
		</figure>
	);
}

type NoteNode = { id: string; x: number; y: number; hub?: boolean };

const NODES: NoteNode[] = [
	{ id: "pkm", x: 50, y: 47, hub: true },
	{ id: "notes", x: 31, y: 25 },
	{ id: "reading", x: 15, y: 45 },
	{ id: "daily", x: 29, y: 70 },
	{ id: "journal", x: 45, y: 88 },
	{ id: "blog", x: 68, y: 29 },
	{ id: "nix", x: 86, y: 45 },
	{ id: "typst", x: 73, y: 69 },
	{ id: "latex", x: 57, y: 81 },
	{ id: "obsidian", x: 64, y: 11 },
	{ id: "logseq", x: 39, y: 9 },
	{ id: "sync", x: 21, y: 86 },
	{ id: "theme", x: 88, y: 15 },
	{ id: "plugins", x: 81, y: 87 },
];

const LINKS: [string, string][] = [
	["pkm", "notes"],
	["pkm", "daily"],
	["pkm", "blog"],
	["pkm", "obsidian"],
	["pkm", "logseq"],
	["notes", "reading"],
	["notes", "daily"],
	["daily", "journal"],
	["daily", "sync"],
	["blog", "nix"],
	["blog", "typst"],
	["nix", "theme"],
	["typst", "latex"],
	["obsidian", "plugins"],
	["obsidian", "theme"],
	["logseq", "sync"],
	["sync", "journal"],
];

const AT = new Map(NODES.map((node) => [node.id, node]));

function degree(id: string) {
	return LINKS.reduce(
		(count, [a, b]) => count + (a === id || b === id ? 1 : 0),
		0,
	);
}

export function GraphFigure() {
	const reduced = useReducedMotion();
	const [hovered, setHovered] = useState<string | null>(null);

	const neighbours = new Set<string>();
	if (hovered) {
		for (const [a, b] of LINKS) {
			if (a === hovered) neighbours.add(b);
			if (b === hovered) neighbours.add(a);
		}
	}

	const lit = (id: string) => !hovered || id === hovered || neighbours.has(id);

	return (
		<figure className="not-prose my-5">
			<div className="-my-5">
				<Panel
					title="graph view"
					icon={<Waypoints className="size-3.5" />}
					footer={
						hovered
							? `${hovered} - ${degree(hovered)} links`
							: "hover or tap a note to trace its links"
					}
				>
					<div className="relative aspect-[8/5] w-full">
						<svg
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
							aria-hidden="true"
							className="absolute inset-0 size-full"
						>
							{LINKS.map(([a, b], index) => {
								const from = AT.get(a);
								const to = AT.get(b);
								if (!from || !to) return null;
								const active = !hovered || a === hovered || b === hovered;
								return (
									<motion.path
										key={`${a}-${b}`}
										d={`M${from.x} ${from.y}L${to.x} ${to.y}`}
										fill="none"
										stroke={active ? MAUVE : "var(--overlay0)"}
										strokeOpacity={active ? 0.7 : 0.16}
										strokeWidth={1}
										strokeLinecap="round"
										vectorEffect="non-scaling-stroke"
										initial={reduced ? undefined : { pathLength: 0 }}
										whileInView={reduced ? undefined : { pathLength: 1 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.7,
											delay: 0.1 + index * 0.04,
											ease: "easeOut",
										}}
									/>
								);
							})}
						</svg>

						{NODES.map((node, index) => {
							const isHovered = hovered === node.id;
							const isNeighbour = hovered ? neighbours.has(node.id) : false;
							return (
								<div
									key={node.id}
									className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
									style={{
										left: `${node.x}%`,
										top: `${node.y}%`,
										opacity: lit(node.id) ? 1 : 0.35,
									}}
								>
									<button
										type="button"
										aria-label={`${node.id}, ${degree(node.id)} links`}
										onMouseEnter={() => setHovered(node.id)}
										onMouseLeave={() => setHovered(null)}
										onFocus={() => setHovered(node.id)}
										onBlur={() => setHovered(null)}
										onClick={() => setHovered(isHovered ? null : node.id)}
										className="relative grid place-items-center"
									>
										<motion.span
											className={cn(
												"block border transition-colors",
												node.hub ? "size-3" : "size-2",
											)}
											style={{
												background: isHovered
													? MAUVE
													: isNeighbour
														? "color-mix(in srgb, var(--mauve) 55%, var(--surface1))"
														: "var(--surface1)",
												borderColor:
													isHovered || isNeighbour ? MAUVE : "var(--overlay0)",
											}}
											initial={reduced ? false : { scale: 0, opacity: 0 }}
											whileInView={{ scale: 1, opacity: 1 }}
											viewport={{ once: true }}
											transition={{
												type: "spring",
												stiffness: 340,
												damping: 22,
												delay: 0.1 + index * 0.03,
											}}
										/>
										<span
											className={cn(
												"absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap  text-[9px] leading-none transition-colors",
												isHovered
													? "text-text"
													: lit(node.id)
														? "text-overlay1"
														: "text-overlay0",
											)}
										>
											{node.id}
										</span>
									</button>
								</div>
							);
						})}
					</div>
				</Panel>
			</div>
			<figcaption className="mt-2  text-[10px] leading-relaxed text-overlay1">
				An illustration of a note graph, not a screenshot of the author's vault.
			</figcaption>
		</figure>
	);
}

const FILE_NAMES = [
	"daily",
	"reading",
	"nix",
	"typst",
	"blog",
	"recipes",
	"keyboard",
	"colemak",
	"latex",
	"graph",
	"ideas",
	"inbox",
];

export function FilesFigure() {
	const reduced = useReducedMotion();
	const [notes, setNotes] = useState(412);
	const shown = Math.min(notes, 24);
	const hidden = notes - shown;

	return (
		<figure className="not-prose my-5">
			<div className="-my-5">
				<Panel
					title="vault"
					icon={<Folder className="size-3.5" />}
					footer="one note, one .md file. the two numbers below are the post's."
				>
					<div className="space-y-3">
						<Range
							label="notes"
							value={notes}
							min={0}
							max={600}
							onChange={setNotes}
						/>

						<div className="overflow-hidden border border-border/60 bg-crust/40">
							<div className="flex items-center justify-between gap-2 border-b border-border/60 px-2 py-1.5  text-[10px] text-overlay1">
								<span className="inline-flex min-w-0 items-center gap-1.5">
									<Folder className="size-3 shrink-0" />
									<span className="truncate">obsidian / vault</span>
								</span>
								<span className="inline-flex shrink-0 items-baseline gap-1 tabular-nums">
									<motion.span
										key={notes}
										initial={reduced ? false : { opacity: 0, y: -3 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-text"
									>
										{notes}
									</motion.span>
									files
								</span>
							</div>

							<div className="p-2">
								{notes === 0 ? (
									<p className="py-6 text-center  text-[10px] text-overlay0">
										empty vault
									</p>
								) : (
									<div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
										{Array.from({ length: shown }, (_, index) => {
											const name = `${FILE_NAMES[index % FILE_NAMES.length]}-${String(
												index + 1,
											).padStart(3, "0")}.md`;
											return (
												<div
													key={name}
													className="flex min-w-0 items-center gap-1.5  border border-border/50 bg-surface0/30 px-1.5 py-1"
												>
													<FileText className="size-3 shrink-0 text-overlay0" />
													<span className="truncate  text-[9px] text-subtext0">
														{name}
													</span>
												</div>
											);
										})}
										{hidden > 0 ? (
											<div className="flex items-center justify-center  border border-dashed border-border px-1.5 py-1  text-[9px] text-overlay0">
												+{hidden} more
											</div>
										) : null}
									</div>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-2">
							<Stat
								label="logseq, before"
								value="493 files"
								hint="618 pages with the automatic ones"
							/>
							<Stat
								label="obsidian, now"
								value="412 files"
								hint="what survived the move"
							/>
						</div>
					</div>
				</Panel>
			</div>
			<figcaption className="mt-2  text-[10px] leading-relaxed text-overlay1">
				Drag the slider. Nothing is read from a disk here, the file count is
				only the notes you say you wrote.
			</figcaption>
		</figure>
	);
}
