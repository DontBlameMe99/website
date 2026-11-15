import {
	Check,
	CornerUpLeft,
	Flame,
	Layers,
	ListChecks,
	Plus,
	RotateCcw,
	Terminal,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
	Callout,
	Chip,
	Meter,
	Panel,
	Sparkline,
	Stat,
	Switch,
} from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Figure 1: a boot menu you can click. */

const GENERATIONS = [
	{
		label: "generation 44",
		meta: "now",
		changes: ["nixpkgs bump", "obs-studio enabled"],
	},
	{
		label: "generation 43",
		meta: "3 days ago",
		changes: ["hyprland 0.43", "arduino-ide pinned"],
	},
	{
		label: "generation 42",
		meta: "last week",
		changes: ["firefox 129", "zsh theme"],
	},
];

export function GenerationHero() {
	const reduced = useReducedMotion();
	const [active, setActive] = useState(0);

	return (
		<Panel
			title="system generations"
			icon={<Layers className="size-3.5" />}
			footer="a toy: three made-up generations, no real boot menu behind this"
		>
			<div aria-label="Boot an older generation" className="space-y-1.5">
				{GENERATIONS.map((generation, index) => {
					const selected = index === active;
					return (
						<button
							key={generation.label}
							type="button"
							aria-pressed={selected}
							onClick={() => setActive(index)}
							className={cn(
								"flex w-full items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors",
								selected
									? "border-mauve/45 bg-mauve/10"
									: "border-border/60 bg-surface0/20 hover:border-mauve/25 hover:bg-surface0/40",
							)}
						>
							<span
								className={cn(
									"mt-1.5 size-1.5 shrink-0 rounded-full",
									selected ? "bg-mauve" : "bg-overlay0/60",
								)}
							/>
							<span className="min-w-0 flex-1">
								<span className="flex flex-wrap items-baseline gap-x-2">
									<span
										className={cn(
											"text-[11px]",
											selected ? "text-text" : "text-subtext0",
										)}
									>
										{generation.label}
									</span>
									<span className="text-[10px] text-overlay0">
										{generation.meta}
									</span>
									{index === 0 ? (
										<Chip accent="var(--green)">latest</Chip>
									) : null}
								</span>
								<span className="mt-0.5 block  text-[10px] leading-relaxed text-overlay1">
									{generation.changes.join(" · ")}
								</span>
							</span>
							{selected ? (
								<motion.span
									layoutId="generation-cursor"
									transition={
										reduced
											? { duration: 0 }
											: { type: "spring", stiffness: 420, damping: 32 }
									}
									className="mt-0.5 shrink-0 text-mauve"
								>
									<CornerUpLeft className="size-3.5" />
								</motion.span>
							) : null}
						</button>
					);
				})}
			</div>

			<div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-border/60 pt-2.5">
				<Chip accent={active === 0 ? "var(--green)" : "var(--mauve)"}>
					{active === 0 ? (
						<Check className="size-3" />
					) : (
						<CornerUpLeft className="size-3" />
					)}
					{active === 0
						? "booted: latest"
						: `${active} rebuild${active === 1 ? "" : "s"} rolled back`}
				</Chip>
				{active > 0 ? (
					<button
						type="button"
						onClick={() => setActive(0)}
						className="inline-flex items-center gap-1  text-[10px] text-overlay1 transition-colors hover:text-mauve"
					>
						<RotateCcw className="size-3" />
						back to latest
					</button>
				) : (
					<span className="text-[10px] text-overlay0">
						click an older entry to roll back
					</span>
				)}
			</div>
		</Panel>
	);
}

/* Figure 2: one toggle, one line, one rebuild. */

const CONFIG_HEAD = [
	"{ pkgs, ... }:",
	"{",
	"  # everything is a toggle",
	"  programs.firefox.enable = true;",
	"",
];
const CONFIG_TOGGLE = "  programs.obs-studio.enable = true;";
const CONFIG_TAIL = ["}"];

function ConfigFile({ on }: { on: boolean }) {
	const reduced = useReducedMotion();
	const [typed, setTyped] = useState(0);

	useEffect(() => {
		if (!on) {
			setTyped(0);
			return;
		}
		if (reduced) {
			setTyped(CONFIG_TOGGLE.length);
			return;
		}
		setTyped(0);
		let count = 0;
		const timer = window.setInterval(() => {
			count += 1;
			setTyped(count);
			if (count >= CONFIG_TOGGLE.length) window.clearInterval(timer);
		}, 24);
		return () => window.clearInterval(timer);
	}, [on, reduced]);

	const visible = CONFIG_TOGGLE.slice(0, typed);
	const typing = on && typed < CONFIG_TOGGLE.length;
	const toggleNumber = CONFIG_HEAD.length + 1;
	const tailNumber = CONFIG_HEAD.length + (on ? 2 : 1);

	return (
		<div className="space-y-2.5">
			<div className="rounded-lg border border-border/60 bg-crust/60 p-1">
				<div className="overflow-x-auto scrollbar-none">
					<div className="min-w-max  text-[11px] leading-[1.8]">
						{CONFIG_HEAD.map((line, index) => (
							<div key={`head-${index}`} className="flex gap-2 px-1">
								<span className="w-4 shrink-0 select-none text-right text-overlay0/70">
									{index + 1}
								</span>
								<span className="w-2 shrink-0 select-none text-transparent">
									·
								</span>
								<span className="whitespace-pre text-subtext0">{line}</span>
							</div>
						))}
						{on ? (
							<motion.div
								initial={reduced ? false : { opacity: 0, y: -3 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2 }}
								className="flex gap-2 border-l-2 border-green/60 bg-green/10 px-1"
							>
								<span className="w-4 shrink-0 select-none text-right text-green/80">
									{toggleNumber}
								</span>
								<span className="w-2 shrink-0 select-none text-green">+</span>
								<span className="whitespace-pre text-text">
									{visible}
									<motion.span
										aria-hidden="true"
										className="text-mauve"
										animate={reduced ? undefined : { opacity: [1, 0.1, 1] }}
										transition={
											reduced
												? undefined
												: { duration: 1, repeat: Infinity, ease: "linear" }
										}
									>
										{typing ? "▌" : ""}
									</motion.span>
								</span>
							</motion.div>
						) : null}
						{CONFIG_TAIL.map((line, index) => (
							<div key={`tail-${index}`} className="flex gap-2 px-1">
								<span className="w-4 shrink-0 select-none text-right text-overlay0/70">
									{tailNumber}
								</span>
								<span className="w-2 shrink-0 select-none text-transparent">
									·
								</span>
								<span className="whitespace-pre text-subtext0">{line}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
				<Chip accent="var(--green)">
					<Plus className="size-3" />
					{on ? "+1 line" : "no change"}
				</Chip>
				<span className="inline-flex items-center gap-1  text-[10px] text-overlay1">
					<Terminal className="size-3" />
					nixos-rebuild switch
				</span>
			</div>
		</div>
	);
}

export function ConfigDiff() {
	return (
		<>
			<Switch on="obs-studio enabled" off="obs-studio off" initial={false}>
				{(on) => <ConfigFile on={on} />}
			</Switch>
			<p className="not-prose mt-2  text-[10px] leading-relaxed text-overlay0">
				illustrative snippet, shortened to fit. the toggle only edits this
				mockup file.
			</p>
		</>
	);
}

/* Figure 3: five honest claims, one running verdict. */

const CLAIMS = [
	{
		id: "same-config",
		label: "one setup, two machines",
		hint: "a desktop and a laptop from the same file",
	},
	{
		id: "toggles",
		label: "a toggle for every program",
		hint: "programs.obs-studio.enable = true;",
	},
	{
		id: "syntax",
		label: "one more syntax is fine",
		hint: "the config file is a real language",
	},
	{
		id: "packages",
		label: "packages fresher than stable",
		hint: "127,132 packages at time of writing",
	},
	{
		id: "rollback",
		label: "a boot entry to fall back to",
		hint: "an older generation is one reboot away",
	},
];

const VERDICT: Record<number, string> = {
	1: "One match. That is thin ground for a reinstall.",
	2: "Two matches. Read it as curiosity, not a plan.",
	3: "Three matches. A virtual machine is the cheap test.",
	4: "Four matches. Look hard at the one that is missing.",
	5: "All five match. The next step is a test install, not a wipe.",
};

export function FitScoreboard() {
	const reduced = useReducedMotion();
	const [picked, setPicked] = useState<Record<string, boolean>>({});
	const count = CLAIMS.filter((claim) => picked[claim.id]).length;
	const verdict =
		count > 0 ? (VERDICT[count] ?? "") : "Pick the rows that describe you.";

	return (
		<Panel
			title="is this for you"
			icon={<ListChecks className="size-3.5" />}
			footer={
				<div className="flex flex-wrap items-center justify-between gap-2">
					<span>claims come from the post, the score is yours</span>
					<button
						type="button"
						onClick={() => setPicked({})}
						className="inline-flex items-center gap-1 text-overlay0 transition-colors hover:text-mauve"
					>
						<RotateCcw className="size-3" />
						clear
					</button>
				</div>
			}
		>
			<div aria-label="Claims that might describe you" className="space-y-1.5">
				{CLAIMS.map((claim) => {
					const active = Boolean(picked[claim.id]);
					return (
						<button
							key={claim.id}
							type="button"
							aria-pressed={active}
							onClick={() =>
								setPicked((current) => ({
									...current,
									[claim.id]: !current[claim.id],
								}))
							}
							className={cn(
								"flex w-full items-start gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors",
								active
									? "border-mauve/45 bg-mauve/10"
									: "border-border/60 bg-surface0/20 hover:border-mauve/25 hover:bg-surface0/40",
							)}
						>
							<span
								className={cn(
									"mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border",
									active
										? "border-mauve bg-mauve text-crust"
										: "border-overlay0/60 text-transparent",
								)}
							>
								<motion.span
									animate={{ scale: active ? 1 : 0.6 }}
									transition={
										reduced
											? { duration: 0 }
											: { type: "spring", stiffness: 500, damping: 26 }
									}
								>
									<Check className="size-3" />
								</motion.span>
							</span>
							<span className="min-w-0">
								<span
									className={cn(
										"block  text-[11px]",
										active ? "text-text" : "text-subtext0",
									)}
								>
									{claim.label}
								</span>
								<span className="mt-0.5 block  text-[10px] leading-relaxed text-overlay1">
									{claim.hint}
								</span>
							</span>
						</button>
					);
				})}
			</div>

			<div className="mt-3 space-y-2 border-t border-border/60 pt-2.5">
				<AnimatePresence mode="wait" initial={false}>
					<motion.p
						key={count > 0 ? `verdict-${count}` : "prompt"}
						aria-live="polite"
						initial={reduced ? false : { opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -4 }}
						transition={{ duration: 0.18 }}
						className="text-[11px] leading-relaxed text-subtext0"
					>
						{verdict}
					</motion.p>
				</AnimatePresence>
				<Meter
					value={count}
					max={CLAIMS.length}
					label="match"
					suffix={`/${CLAIMS.length}`}
				/>
			</div>
		</Panel>
	);
}

/* Figure 4: the rice spiral, drawn as two curves. */

const BENEFIT = [8, 46, 72, 84, 90, 91, 91, 92, 92, 92, 92, 92];
const BENEFIT_SPIRAL = [8, 46, 72, 84, 90, 91, 91, 92, 92, 92, 93, 94];
const HOURS_OFF = [3, 6, 10, 14, 17, 19, 20, 20, 20, 20, 20, 20];
const HOURS_ON = [3, 7, 12, 18, 26, 35, 45, 57, 70, 84, 96, 100];

function SpiralChart({ spiral }: { spiral: boolean }) {
	const mode = spiral ? "on" : "off";

	return (
		<div className="space-y-1">
			<Sparkline
				key={`benefit-${mode}`}
				points={spiral ? BENEFIT_SPIRAL : BENEFIT}
				accent="var(--teal)"
				height={54}
				label="benefit: what the system does for you"
			/>
			<Sparkline
				key={`hours-${mode}`}
				points={spiral ? HOURS_ON : HOURS_OFF}
				accent="var(--peach)"
				height={54}
				label="hours: time spent configuring"
			/>
			<div className="grid grid-cols-2 gap-2 pt-1">
				<Stat
					label="hours"
					value={spiral ? "~100" : "~20"}
					hint={spiral ? "and counting" : "then you stop"}
				/>
				<Stat
					label="benefit"
					value={spiral ? "94" : "92"}
					hint={spiral ? "+2 for +80 hours" : "already there"}
				/>
			</div>
			<Callout icon={<Flame className="size-3.5" />}>
				illustrative curve, not measured. the toggle only changes the drawing.
			</Callout>
		</div>
	);
}

export function RiceSpiral() {
	return (
		<Switch on="spiral: on" off="spiral: off" initial={false}>
			{(spiral) => <SpiralChart spiral={spiral} />}
		</Switch>
	);
}
