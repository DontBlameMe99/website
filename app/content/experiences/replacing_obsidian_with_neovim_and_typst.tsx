import type { ReactNode } from "react";
import { Tabs } from "~/components/post/kit";

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
];

export function NoteSyntaxSwitcher() {
	return (
		<div className="not-prose">
			<Tabs tabs={NOTE_TABS} label="Syntax" />
			<p className="text-[11px] text-overlay0">
				same note, different delimiters
			</p>
		</div>
	);
}
