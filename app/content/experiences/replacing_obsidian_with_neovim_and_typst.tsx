import { Keyboard } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Chip, Panel, Tabs } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const MAUVE = "var(--mauve)";
const LAVENDER = "var(--lavender)";
const RED = "var(--red)";
const PEACH = "var(--peach)";

function Tok({ color, children }: { color: string; children: ReactNode }) {
	return (
		<span style={{ color }} className="font-medium">
			{children}
		</span>
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
					<span className="h-3.5 w-1 bg-mauve" />
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
			<div className="flex flex-wrap items-center gap-1.5  text-[11px] text-overlay1">
				<Chip accent={LAVENDER}>heading</Chip>
				<Chip accent={RED}>emphasis</Chip>
				<Chip accent={MAUVE}>link</Chip>
				<Chip accent={PEACH}>math</Chip>
				<span className="text-overlay0">same note, different delimiters</span>
			</div>
		</div>
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
			<span className="inline-flex w-44 shrink-0 items-center gap-1 border border-border/70 bg-crust/60 px-2 py-1 text-[11px]">
				<span
					className={cn(
						"whitespace-pre",
						done || active ? "text-text" : "text-overlay1",
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
			<span className="text-[11px] text-overlay1">{note}</span>
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
