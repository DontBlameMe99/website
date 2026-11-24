import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Panel } from "~/components/post/kit";

const TYPED = "for (const post of posts)";
const SUGGESTION = " console.log(post.title);";
const ACCEPTED = `${TYPED}${SUGGESTION}`;

type ChatStep = { who: string; text: string; edge?: string };

const CHAT_STEPS: ChatStep[] = [
	{ who: "You", text: "Start" },
	{ who: "You", text: "Ask: How do I create a loop?" },
	{ who: "AI", text: "Reply with a while-loop code sample", edge: "question" },
	{ who: "You", text: "Copy the code", edge: "answer" },
	{ who: "You", text: "Paste it into your editor" },
	{ who: "You", text: "Done" },
];

function FlowArrow({ label }: { label?: string }) {
	return (
		<div aria-hidden className="flex flex-col items-center gap-1 py-1">
			{label ? (
				<span className="text-[10px] uppercase tracking-[0.14em] text-accent">
					{label}
				</span>
			) : null}
			<svg
				aria-hidden="true"
				viewBox="0 0 24 52"
				className="h-12 w-8 text-accent"
				fill="none"
				stroke="currentColor"
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 2 V38 M4 30 L12 40 L20 30" />
			</svg>
		</div>
	);
}

export function ChatCopyPasteFlow() {
	return (
		<figure className="not-prose my-8 nb-well p-3 sm:p-4">
			<div className="mx-auto flex max-w-sm flex-col items-center">
				{CHAT_STEPS.map((step, index) => (
					<div key={`${step.who}-${index}`} className="w-full">
						{index > 0 ? <FlowArrow label={step.edge} /> : null}
						<div
							className={`nb-line px-4 py-3 text-center ${
								step.who === "AI"
									? "bg-accent text-on-accent"
									: "bg-surface0 text-text"
							}`}
						>
							<span
								className={`block text-[10px] uppercase tracking-[0.14em] ${
									step.who === "AI" ? "text-on-accent" : "text-overlay1"
								}`}
							>
								{step.who}
							</span>
							<span className="mt-1 block text-xs leading-relaxed">
								{step.text}
							</span>
						</div>
					</div>
				))}
			</div>
			<figcaption className="mt-3 text-center text-[11px] text-overlay1">
				The chat copy and paste loop.
			</figcaption>
		</figure>
	);
}

const MCP_TOOLS = [
	"send_mail",
	"receive_mail",
	"list_events",
	"create_event",
	"read_pdf",
	"add_card",
	"search_notes",
	"update_card",
];

export function McpContextComparison() {
	return (
		<div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
			<div className="nb-line bg-surface0 p-3">
				<span className="text-[10px] uppercase tracking-[0.14em] text-overlay1">
					Usual MCP
				</span>
				<div className="mt-3 flex flex-wrap gap-1 font-mono text-[10px]">
					{MCP_TOOLS.map((tool) => (
						<span
							key={tool}
							className="nb-line bg-surface1 px-2 py-1 text-subtext0"
						>
							{tool}
						</span>
					))}
				</div>
			</div>
			<div className="nb-line bg-surface0 p-3">
				<span className="text-[10px] uppercase tracking-[0.14em] text-overlay1">
					codemode
				</span>
				<div className="mt-3 flex flex-wrap gap-1 font-mono text-[10px]">
					<span
						className="nb-line px-2 py-1 text-on-accent"
						style={{ background: "var(--accent-surface)" }}
					>
						run_mcp
					</span>
				</div>
			</div>
		</div>
	);
}

export function InlineAutocomplete() {
	const reduced = useReducedMotion();
	const [typed, setTyped] = useState(reduced ? TYPED.length : 0);
	const [accepted, setAccepted] = useState(Boolean(reduced));
	const [fading, setFading] = useState(false);

	useEffect(() => {
		if (reduced) return;
		if (fading) {
			const timer = setTimeout(() => {
				setTyped(0);
				setAccepted(false);
				setFading(false);
			}, 240);
			return () => clearTimeout(timer);
		}
		if (typed < TYPED.length) {
			const timer = setTimeout(() => setTyped((count) => count + 1), 80);
			return () => clearTimeout(timer);
		}
		if (!accepted) {
			const timer = setTimeout(() => setAccepted(true), 3000);
			return () => clearTimeout(timer);
		}
		const timer = setTimeout(() => setFading(true), 3200);
		return () => clearTimeout(timer);
	}, [typed, accepted, fading, reduced]);

	const ghost = typed === TYPED.length && !accepted;

	return (
		<Panel title="posts.ts">
			<motion.div
				className="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap font-mono text-xs leading-relaxed"
				role="img"
				aria-label={
					accepted
						? `The suggestion was accepted: ${ACCEPTED}`
						: `Typing code, with the inline suggestion ${SUGGESTION.trim()}`
				}
				initial={false}
				animate={{ opacity: fading ? 0 : 1 }}
				transition={{ duration: reduced ? 0 : 0.24, ease: "easeInOut" }}
			>
				<code
					style={{
						background: "transparent",
						border: 0,
						padding: 0,
						marginInline: 0,
						overflowWrap: "normal",
						color: "inherit",
						fontSize: "inherit",
					}}
				>
					{TYPED.slice(0, typed)}
					{!accepted ? <span className="text-text">▏</span> : null}
					{ghost || accepted ? (
						<motion.span
							key={accepted ? "accepted" : "ghost"}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: reduced ? 0 : 0.16,
								ease: "easeInOut",
							}}
							className={accepted ? "text-text" : "text-accent"}
						>
							{SUGGESTION}
						</motion.span>
					) : null}
				</code>
				{ghost || accepted ? (
					<motion.span
						aria-hidden
						className={`inline-flex h-5 shrink-0 items-center justify-center nb-line px-2 font-mono text-[10px] leading-none text-on-accent ${
							accepted ? "" : "nb-shadow-sm"
						}`}
						style={{ background: "var(--accent-surface)" }}
						initial={false}
						animate={{
							y: accepted ? 1 : 0,
							scale: accepted ? 0.94 : 1,
						}}
						transition={{
							duration: reduced ? 0 : 0.12,
							ease: "easeInOut",
						}}
					>
						TAB
					</motion.span>
				) : null}
			</motion.div>
		</Panel>
	);
}

export function RainbowAde() {
	return <span className="ade-rainbow font-bold">ADE</span>;
}
