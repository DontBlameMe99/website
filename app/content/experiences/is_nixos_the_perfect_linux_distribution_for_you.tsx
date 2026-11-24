import { Layers, Plus, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
	Callout,
	Chip,
	Panel,
	Sparkline,
	Stat,
	Switch,
} from "~/components/post/kit";

/* Figure 1: a boot menu, read only. */

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
	return (
		<Panel
			title="system generations"
			icon={<Layers className="size-3.5" />}
			footer="a toy: three made-up generations"
		>
			<div className="space-y-1.5">
				{GENERATIONS.map((generation, index) => (
					<div
						key={generation.label}
						className="border border-border/60 bg-surface0/20 px-2.5 py-2"
					>
						<span className="flex flex-wrap items-baseline gap-x-2">
							<span className="text-[11px] text-text">{generation.label}</span>
							<span className="text-[11px] text-overlay1">
								{generation.meta}
							</span>
							{index === 0 ? <Chip accent="var(--green)">latest</Chip> : null}
						</span>
						<span className="mt-0.5 block  text-[11px] leading-relaxed text-overlay1">
							{generation.changes.join(", ")}
						</span>
					</div>
				))}
			</div>
		</Panel>
	);
}

/* Figure 2: one toggle, one line, one rebuild. */

const CONFIG_HEAD = [
	"{ pkgs, ... }:",
	"{",
	"# everything is a toggle",
	"programs.firefox.enable = true;",
	"",
];
const CONFIG_TOGGLE = "programs.obs-studio.enable = true;";
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
			<div className=" border border-border/60 bg-crust/60 p-1">
				<div className="overflow-x-auto scrollbar-none">
					<div className="min-w-max  text-[11px] leading-[1.8]">
						{CONFIG_HEAD.map((line, index) => (
							<div key={`head-${index}`} className="flex gap-2 px-1">
								<span className="w-4 shrink-0 select-none text-right text-overlay1">
									{index + 1}
								</span>
								<span className="w-2 shrink-0 select-none whitespace-pre">
									{"  "}
								</span>
								<span className="whitespace-pre text-subtext0">{line}</span>
							</div>
						))}
						{on ? (
							<motion.div
								initial={reduced ? false : { opacity: 0, y: -3 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2 }}
								className="flex gap-2 rounded-none border-l-2 border-green/60 bg-green/5 px-1"
							>
								<span className="w-4 shrink-0 select-none text-right text-text">
									{toggleNumber}
								</span>
								<span className="w-2 shrink-0 select-none text-text">+</span>
								<span className="whitespace-pre text-text">
									{visible}
									<motion.span
										aria-hidden="true"
										className="text-text"
										animate={reduced ? undefined : { opacity: [1, 0.1, 1] }}
										transition={
											reduced
												? undefined
												: { duration: 1, repeat: Infinity, ease: "linear" }
										}
									>
										{typing ? "▌" : ""}
									</motion.span>
									<span className="invisible" aria-hidden="true">
										{CONFIG_TOGGLE.slice(typed)}
									</span>
								</span>
							</motion.div>
						) : null}
						{CONFIG_TAIL.map((line, index) => (
							<div key={`tail-${index}`} className="flex gap-2 px-1">
								<span className="w-4 shrink-0 select-none text-right text-overlay1">
									{tailNumber}
								</span>
								<span className="w-2 shrink-0 select-none whitespace-pre">
									{"  "}
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
				<span className="inline-flex items-center gap-1  text-[11px] text-overlay1">
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
			<Switch
				on="obs-studio enabled"
				off="obs-studio off"
				label="obs-studio"
				initial={false}
			>
				{(on) => <ConfigFile on={on} />}
			</Switch>
			<p className="not-prose mt-2  text-[11px] leading-relaxed text-overlay1">
				illustrative snippet, shortened to fit. the toggle only edits this
				mockup file.
			</p>
		</>
	);
}

/* Figure 3: the rice spiral, drawn as two curves. */

const BENEFIT = [8, 46, 72, 84, 90, 91, 91, 92, 92, 92, 92, 92];
const HOURS_OFF = [3, 6, 10, 14, 17, 19, 20, 20, 20, 20, 20, 20];
const HOURS_ON = [3, 7, 12, 18, 26, 35, 45, 57, 70, 84, 96, 100];

function SpiralChart({ spiral }: { spiral: boolean }) {
	const mode = spiral ? "on" : "off";

	return (
		<div className="space-y-1">
			<Sparkline
				key="benefit"
				points={BENEFIT}
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
					value="92"
					hint={spiral ? "+0 for +80 hours" : "already there"}
				/>
			</div>
			<Callout kind="note">
				illustrative curve, not measured. the toggle only changes the drawing.
			</Callout>
		</div>
	);
}

export function RiceSpiral() {
	return (
		<Switch
			on="spiral: on"
			off="spiral: off"
			label="rice spiral"
			initial={false}
		>
			{(spiral) => <SpiralChart spiral={spiral} />}
		</Switch>
	);
}
