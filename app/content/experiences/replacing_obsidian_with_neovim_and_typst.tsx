import { Keyboard, RotateCw, Timer } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useInView,
	useReducedMotion,
} from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Bars, Chip, Panel, Stat, Tabs } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const MAUVE = "var(--mauve)";
const LAVENDER = "var(--lavender)";
const GREEN = "var(--green)";
const RED = "var(--red)";
const PEACH = "var(--peach)";

function Tok({ color, children }: { color: string; children: ReactNode }) {
	return (
		<span style={{ color }} className="font-medium">
			{children}
		</span>
	);
}

function SourceLine({
	n,
	indent = false,
	children,
}: {
	n: number;
	indent?: boolean;
	children: ReactNode;
}) {
	return (
		<div className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-2">
			<span className="select-none text-right text-overlay0/50">{n}</span>
			<span className={cn("min-w-0 break-words", indent && "pl-2")}>
				{children}
			</span>
		</div>
	);
}

function TileMarks() {
	return (
		<span aria-hidden="true" className="flex shrink-0 items-center gap-1">
			<span className="size-2 rounded-[1px] bg-mauve/70" />
			<span className="size-2 rounded-[1px] border border-border" />
		</span>
	);
}

const HERO_APPS = [
	{
		id: "obsidian",
		label: "Obsidian",
		title: "vault / Obsidian",
		accent: LAVENDER,
		chips: ["[[wiki links]]", "$latex$", "electron"],
	},
	{
		id: "neovim",
		label: "Neovim",
		title: "note.typ / Neovim",
		accent: GREEN,
		chips: ["typst-lsp", "markview", "NORMAL"],
	},
	{
		id: "typst",
		label: "Typst",
		title: "note.pdf / Typst",
		accent: MAUVE,
		chips: ["#show", "PDF", "live preview"],
	},
] as const;

function ObsidianPane() {
	return (
		<div className="grid gap-2 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
			<div className="hidden flex-col gap-0.5 rounded-md border border-border/60 bg-crust/50 p-2  text-[10px] leading-relaxed text-overlay1 sm:flex">
				<span className="text-overlay0">vault/</span>
				<span className="truncate text-lavender">notes/</span>
				<span className="truncate pl-2 text-subtext0">daily.md</span>
				<span className="truncate pl-2 text-lavender">meeting.md</span>
				<span className="truncate pl-2 text-subtext0">typst.md</span>
			</div>
			<div className="min-w-0 rounded-md border border-border/60 bg-crust/50 p-2.5  text-[11px] leading-relaxed text-subtext0">
				<SourceLine n={1}>
					<Tok color={LAVENDER}>#</Tok> Meeting notes
				</SourceLine>
				<SourceLine n={2}>{"\u00a0"}</SourceLine>
				<SourceLine n={3}>
					Typst compiles <Tok color={RED}>**fast**</Tok>.
				</SourceLine>
				<SourceLine n={4}>
					See <Tok color={LAVENDER}>[[Zettelkasten]]</Tok> and{" "}
					<Tok color={PEACH}>$x^2$</Tok>.
				</SourceLine>
			</div>
		</div>
	);
}

function NeovimPane() {
	return (
		<div className="rounded-md border border-border/60 bg-crust/50 p-2.5  text-[11px] leading-relaxed text-subtext0">
			<div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px]">
				<span className="rounded-sm bg-surface0 px-1.5 py-0.5 text-green">
					1 note.typ
				</span>
				<span className="truncate text-overlay0">~/notes</span>
			</div>
			<SourceLine n={1}>
				<Tok color={GREEN}>#show</Tok> heading: it =&gt; {"{"}
			</SourceLine>
			<SourceLine n={2} indent>
				box(fill: accent)[<Tok color={MAUVE}>#it.body</Tok>]
			</SourceLine>
			<SourceLine n={3}>{"}"}</SourceLine>
			<SourceLine n={4}>
				<span className="text-overlay0/60">~</span>
			</SourceLine>
			<SourceLine n={5}>
				<span className="text-overlay0/60">~</span>
			</SourceLine>
			<div className="mt-2 flex items-center gap-2 rounded-sm bg-surface0/60 px-1.5 py-0.5 text-[10px]">
				<span className="rounded-sm bg-green px-1 font-bold text-crust">
					NORMAL
				</span>
				<span className="text-overlay1">note.typ</span>
				<span className="text-overlay0">typst</span>
			</div>
		</div>
	);
}

function TypstPane() {
	return (
		<div className="rounded-md border border-border/60 bg-mantle/80 p-3">
			<div className="mx-auto max-w-[16rem] space-y-2">
				<div
					className="w-fit rounded-sm px-2 py-0.5  text-xs font-bold text-crust"
					style={{ background: MAUVE }}
				>
					Meeting notes
				</div>
				<p className="text-[11px] leading-relaxed text-subtext0">
					Typst compiles <strong className="text-text">fast</strong>. See{" "}
					<span className="text-mauve underline decoration-mauve/40 underline-offset-2">
						Zettelkasten
					</span>{" "}
					and <span className="text-peach">x²</span>.
				</p>
				<div className="h-px bg-border" />
				<div className="flex items-center justify-between  text-[10px] text-overlay0">
					<span>compiled</span>
					<span className="flex items-center gap-1 text-green">
						<span className="size-1.5 rounded-full bg-green" /> live preview
					</span>
				</div>
			</div>
		</div>
	);
}

export function HeroWindow() {
	const [active, setActive] = useState(0);
	const reduced = useReducedMotion();
	const id = useId();
	const app = HERO_APPS[active] ?? HERO_APPS[0];

	return (
		<motion.section
			className="not-prose my-6 overflow-hidden rounded-panel border border-border bg-base tile-tint"
			style={{ "--post-accent": app.accent } as CSSProperties}
			initial={reduced ? false : { opacity: 0, y: 16, scale: 0.985 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			aria-label="The same note in Obsidian, Neovim and Typst"
		>
			<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border/70 bg-mantle/50 px-3 py-2">
				<TileMarks />
				<span className="truncate text-center  text-[11px] text-overlay1">
					{app.title}
				</span>
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() =>
							setActive((current) => (current + 1) % HERO_APPS.length)
						}
						aria-label="Show the next tool"
						className="group flex items-center gap-1 rounded-md px-1.5 py-0.5  text-[10px] text-overlay1 transition-colors hover:bg-surface0/60 hover:text-text"
					>
						<span className="tabular-nums">
							{active + 1}/{HERO_APPS.length}
						</span>
						<RotateCw className="size-3 transition-transform duration-300 group-hover:rotate-90" />
					</button>
				</div>
			</div>

			<div
				role="tablist"
				aria-label="Tools"
				className="flex flex-wrap gap-1 border-b border-border/70 bg-mantle/30 px-2 py-1.5"
			>
				{HERO_APPS.map((option, index) => (
					<button
						key={option.id}
						type="button"
						role="tab"
						id={`${id}-${option.id}`}
						aria-selected={option.id === app.id}
						aria-controls={`${id}-panel`}
						onClick={() => setActive(index)}
						className={cn(
							"relative rounded-md px-2.5 py-1  text-[11px] transition-colors",
							option.id === app.id
								? "text-crust"
								: "text-overlay1 hover:bg-surface0/60 hover:text-text",
						)}
					>
						{option.id === app.id ? (
							<motion.span
								layoutId={`${id}-hero-pill`}
								className="absolute inset-0 rounded-md"
								style={{ background: option.accent }}
								transition={{ type: "spring", stiffness: 380, damping: 30 }}
							/>
						) : null}
						<span className="relative">{option.label}</span>
					</button>
				))}
			</div>

			<div
				id={`${id}-panel`}
				role="tabpanel"
				aria-labelledby={`${id}-${app.id}`}
				className="relative min-h-[13rem] p-3 sm:p-4"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={app.id}
						initial={reduced ? false : { opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -8 }}
						transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
					>
						{app.id === "obsidian" ? <ObsidianPane /> : null}
						{app.id === "neovim" ? <NeovimPane /> : null}
						{app.id === "typst" ? <TypstPane /> : null}
						<div className="mt-2 flex flex-wrap gap-1.5">
							{app.chips.map((chip) => (
								<Chip key={chip} accent={app.accent}>
									{chip}
								</Chip>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
				<p className="sr-only" aria-live="polite">
					{app.label} preview
				</p>
			</div>

			<div className="flex items-center justify-between gap-2 border-t border-border/70 px-3 py-2  text-[10px] text-overlay1">
				<span>same note, three surfaces</span>
				<span className="hidden text-overlay0 sm:inline">
					click a tool to switch
				</span>
			</div>
		</motion.section>
	);
}

function NoteLine({ children }: { children?: ReactNode }) {
	return (
		<div className="whitespace-pre-wrap break-words leading-relaxed">
			{children ?? "\u00a0"}
		</div>
	);
}

const NOTE_TABS = [
	{
		id: "markdown",
		label: "markdown",
		content: (
			<div className="text-[11px]">
				<NoteLine>
					<Tok color={LAVENDER}>#</Tok> Meeting notes
				</NoteLine>
				<NoteLine />
				<NoteLine>
					Typst compiles <Tok color={RED}>**fast**</Tok>.
				</NoteLine>
				<NoteLine>
					See <Tok color={LAVENDER}>[[Zettelkasten]]</Tok> and{" "}
					<Tok color={PEACH}>$x^2$</Tok>.
				</NoteLine>
			</div>
		),
	},
	{
		id: "typst",
		label: "typst",
		content: (
			<div className="text-[11px]">
				<NoteLine>
					<Tok color={MAUVE}>=</Tok> Meeting notes
				</NoteLine>
				<NoteLine />
				<NoteLine>
					Typst compiles <Tok color={RED}>*fast*</Tok>.
				</NoteLine>
				<NoteLine>
					See <Tok color={MAUVE}>#link("zettelkasten")</Tok> and{" "}
					<Tok color={PEACH}>$x^2$</Tok>.
				</NoteLine>
			</div>
		),
	},
	{
		id: "rendered",
		label: "rendered",
		content: (
			<div className="space-y-2 py-1">
				<div className="flex items-center gap-2">
					<span className="h-3.5 w-1 rounded-full bg-mauve" />
					<span className="text-xs font-bold text-text">Meeting notes</span>
				</div>
				<p className="text-[11px] leading-relaxed">
					Typst compiles <strong className="text-text">fast</strong>. See{" "}
					<span className="text-mauve underline decoration-mauve/40 underline-offset-2">
						Zettelkasten
					</span>{" "}
					and <span className="text-peach">x²</span>.
				</p>
			</div>
		),
	},
];

export function NoteSyntaxSwitcher() {
	return (
		<div className="not-prose">
			<Tabs tabs={NOTE_TABS} />
			<div className="flex flex-wrap items-center gap-1.5  text-[10px] text-overlay1">
				<Chip accent={LAVENDER}>heading</Chip>
				<Chip accent={RED}>emphasis</Chip>
				<Chip accent={MAUVE}>link</Chip>
				<Chip accent={PEACH}>math</Chip>
				<span className="text-overlay0">same note, different delimiters</span>
			</div>
		</div>
	);
}

function _CompileSketch() {
	return (
		<Panel
			title="compile · sketch"
			icon={<Timer className="size-3.5" />}
			footer="Illustrative sketch of the author's experience. Not a benchmark."
		>
			<div className="mb-2 flex flex-wrap items-center justify-between gap-2">
				<span className="text-[10px] uppercase tracking-[0.12em] text-overlay1">
					relative compile time
				</span>
				<Chip>sketch</Chip>
			</div>
			<Bars
				data={[
					{ label: "LaTeX", value: 10 },
					{ label: "Typst", value: 1 },
				]}
				max={10}
				format={(value) => `${value}×`}
			/>
			<div className="mt-3 grid grid-cols-2 gap-2">
				<Stat label="author's read" value="10×+" hint="Typst vs LaTeX" />
				<Stat label="live preview" value="instant" hint="author's impression" />
			</div>
		</Panel>
	);
}

const CHORDS = [
	{ keys: ":TypstPreview", note: "live preview, named in the post" },
	{ keys: ":w", note: "write the buffer" },
	{ keys: "/note", note: "search the notes" },
	{ keys: "i", note: "insert mode" },
	{ keys: "<Esc>", note: "normal mode, rendered view" },
] as const;

function ChordRow({
	chord,
	note,
	index,
	step,
	playing,
	reduced,
}: {
	chord: string;
	note: string;
	index: number;
	step: number;
	playing: boolean;
	reduced: boolean;
}) {
	const active = !reduced && playing && index === step;
	const done = reduced || index < step;
	const [typed, setTyped] = useState(done ? chord.length : 0);

	useEffect(() => {
		if (reduced || done) {
			setTyped(chord.length);
			return;
		}
		if (!active) {
			setTyped(0);
			return;
		}
		setTyped(0);
		const timer = window.setInterval(() => {
			setTyped((current) => (current < chord.length ? current + 1 : current));
		}, 55);
		return () => window.clearInterval(timer);
	}, [active, chord, done, reduced]);

	const text = done || active ? chord.slice(0, typed) : chord;

	return (
		<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
			<span className="inline-flex min-w-[7rem] items-center gap-1 rounded-md border border-border/70 bg-crust/60 px-2 py-1  text-[11px]">
				<span
					className={cn(
						"whitespace-pre",
						done || active ? "text-text" : "text-overlay0/50",
					)}
				>
					{text}
				</span>
				{active ? (
					<motion.span
						aria-hidden="true"
						className="inline-block h-3 w-[2px] bg-mauve"
						animate={{ opacity: [1, 1, 0, 0] }}
						transition={{
							duration: 1,
							repeat: Number.POSITIVE_INFINITY,
							times: [0, 0.5, 0.5, 1],
						}}
					/>
				) : null}
			</span>
			<span
				className={cn(
					"text-[10px]",
					done || active ? "text-overlay1" : "text-overlay0/60",
				)}
			>
				{note}
			</span>
		</div>
	);
}

export function KeyCheatStrip() {
	const reduced = useReducedMotion();
	const [step, setStep] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.5 });

	useEffect(() => {
		if (reduced || !inView) return;
		const chord = CHORDS[step] ?? CHORDS[0];
		const hold = chord.keys.length * 55 + 1100;
		const timer = window.setTimeout(() => {
			setStep((current) => (current + 1) % CHORDS.length);
		}, hold);
		return () => window.clearTimeout(timer);
	}, [step, reduced, inView]);

	return (
		<div ref={ref}>
			<Panel
				title="keys · typed demo"
				icon={<Keyboard className="size-3.5" />}
				footer="Generic Neovim chords, not the author's exact keymap."
			>
				<div className="space-y-1.5">
					{CHORDS.map((chord, index) => (
						<ChordRow
							key={chord.keys}
							chord={chord.keys}
							note={chord.note}
							index={index}
							step={step}
							playing={inView}
							reduced={reduced ?? false}
						/>
					))}
				</div>
			</Panel>
		</div>
	);
}
