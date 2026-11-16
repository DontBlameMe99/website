import type { LucideIcon } from "lucide-react";
import {
	ArrowDown,
	Brain,
	Cloud,
	Database,
	HardDrive,
	KeyRound,
	RotateCcw,
	ShieldCheck,
	Unplug,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Bars, Chip, Panel } from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Two figures for the backups post. Each one owns its state and never touches
   the document, so the article still prerenders. Aggressive motion steps aside
   for reduced-motion readers. */

const MAUVE = "var(--mauve)";
const GREEN = "var(--green)";
const RED = "var(--red)";
const TEAL = "var(--teal)";
const MUTED = "var(--overlay0)";

const mix = (color: string, percent: number) =>
	`color-mix(in srgb, ${color} ${percent}%, transparent)`;

/* --- shared chrome ------------------------------------------------------- */

function WindowDots() {
	return (
		<span className="flex items-center gap-1">
			{["--traffic-red", "--traffic-yellow", "--traffic-green"].map((token) => (
				<span
					key={token}
					className="size-2 ring-1 ring-black/20"
					style={{ background: `var(${token})` }}
				/>
			))}
		</span>
	);
}

const RETENTION = [
	{ label: "daily", value: 60 },
	{ label: "weekly", value: 52 },
	{ label: "monthly", value: 36 },
	{ label: "yearly", value: 20 },
];

const REPOS: {
	name: string;
	icon: LucideIcon;
	chip: string;
	accent: string;
}[] = [
	{
		name: "external HDD",
		icon: HardDrive,
		chip: "separate disk",
		accent: TEAL,
	},
	{ name: "cloud box", icon: Cloud, chip: "remote location", accent: MAUVE },
];

export function RetentionBoard() {
	return (
		<Panel
			title="retention policy"
			icon={<WindowDots />}
			footer="keepDaily 60, keepWeekly 52, keepMonthly 36, keepYearly 20"
		>
			<div className="space-y-2.5">
				<div className="flex flex-wrap gap-1.5">
					<Chip accent={MAUVE}>incremental</Chip>
					<Chip accent={GREEN}>encrypted</Chip>
				</div>

				<div className="grid gap-1.5">
					{REPOS.map((repo) => {
						const Icon = repo.icon;

						return (
							<div
								key={repo.name}
								className="flex items-center gap-2 border border-border/60 bg-surface0/25 px-2.5 py-1.5"
							>
								<Icon
									className="size-3.5 shrink-0"
									style={{ color: repo.accent }}
								/>
								<span className="min-w-0 flex-1 truncate text-[11px] text-text">
									{repo.name}
								</span>
								<Chip accent={repo.accent} className="shrink-0">
									{repo.chip}
								</Chip>
							</div>
						);
					})}
				</div>

				<Bars data={RETENTION} accent={MAUVE} />

				<div className="text-[9px] leading-relaxed text-overlay1">
					Both repositories get the same schedule. The remote one is written
					over ssh.
				</div>
			</div>
		</Panel>
	);
}

/* --- the recovery chain -------------------------------------------------- */

type ChainLink = {
	id: string;
	title: string;
	detail: string;
	icon: LucideIcon;
	onBreak: string;
};

const CHAIN: ChainLink[] = [
	{
		id: "repo",
		title: "encrypted repository",
		detail: "external HDD, plus the cloud box over ssh",
		icon: Cloud,
		onBreak: "nothing is left to restore from",
	},
	{
		id: "passphrase",
		title: "repository passphrase",
		detail: "fed to borgmatic by storage.encryptionPasscommand",
		icon: KeyRound,
		onBreak: "the repository is ciphertext with no key",
	},
	{
		id: "database",
		title: "KeePassXC database",
		detail: "your copy, plus copies trusted people keep in their own backups",
		icon: Database,
		onBreak: "every copy is gone, including the ones trusted people hold",
	},
	{
		id: "memory",
		title: "remembered password",
		detail: "not written down anywhere",
		icon: Brain,
		onBreak: "the database stays a locked box",
	},
];

export function RecoveryChain() {
	const reduced = useReducedMotion();
	const [broken, setBroken] = useState<string[]>([]);

	const toggle = (id: string) =>
		setBroken((prev) =>
			prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
		);

	const blockedAt = (index: number) =>
		CHAIN.slice(index).some((link) => broken.includes(link.id));

	const failing = CHAIN.find((link) => broken.includes(link.id));
	const ok = broken.length === 0;
	const accent = ok ? GREEN : RED;

	return (
		<Panel
			title="recovery.app"
			icon={<WindowDots />}
			footer="click a link to cut it"
		>
			<div>
				{CHAIN.map((link, index) => {
					const Icon = link.icon;
					const cut = broken.includes(link.id);
					const blocked = !cut && blockedAt(index);
					const state = cut ? "cut" : blocked ? "blocked" : "ok";
					const tint = cut ? RED : blocked ? MUTED : GREEN;

					return (
						<div key={link.id}>
							<motion.button
								type="button"
								onClick={() => toggle(link.id)}
								aria-pressed={cut}
								whileTap={reduced ? undefined : { scale: 0.985 }}
								className="flex w-full items-center gap-2 border px-2 py-1.5 text-left transition-colors"
								style={{
									borderColor: mix(tint, cut ? 50 : 30),
									background: mix(tint, cut ? 3 : 2),
								}}
							>
								<span
									className="grid size-7 shrink-0 place-items-center border"
									style={{ borderColor: mix(tint, 40), color: tint }}
								>
									<Icon className="size-3.5" />
								</span>
								<span className="min-w-0 flex-1">
									<span
										className={cn(
											"block text-[11px] leading-snug text-text",
											cut && "line-through decoration-red/70",
										)}
									>
										{link.title}
									</span>
									<span className="mt-0.5 block text-[9px] leading-relaxed text-overlay1">
										{link.detail}
									</span>
								</span>
								<Chip accent={tint} className="shrink-0">
									{state === "cut"
										? "cut"
										: state === "blocked"
											? "blocked"
											: "intact"}
								</Chip>
							</motion.button>

							{index < CHAIN.length - 1 ? (
								<div className="flex justify-center py-0.5">
									<ArrowDown
										className="size-3"
										style={{
											color: blockedAt(index + 1) ? MUTED : GREEN,
										}}
									/>
								</div>
							) : null}
						</div>
					);
				})}
			</div>

			<div
				aria-live="polite"
				className="mt-2.5 border p-2.5"
				style={{ borderColor: mix(accent, 40), background: mix(accent, 4) }}
			>
				<div className="flex items-center gap-1.5">
					{ok ? (
						<ShieldCheck
							className="size-3.5 shrink-0"
							style={{ color: GREEN }}
						/>
					) : (
						<Unplug className="size-3.5 shrink-0" style={{ color: RED }} />
					)}
					<span className="text-[11px] text-text">
						{ok ? "chain intact" : "chain broken"}
					</span>
					{ok ? null : (
						<button
							type="button"
							onClick={() => setBroken([])}
							className="ml-auto inline-flex items-center gap-1 text-[9px] text-overlay1 transition-colors hover:text-text"
						>
							<RotateCcw className="size-2.5" />
							reset
						</button>
					)}
				</div>
				<div className="mt-1 text-[11px] leading-relaxed text-overlay1">
					{ok
						? "Nothing on this chain lives inside the thing it unlocks."
						: `${failing?.title ?? "a link"}: ${failing?.onBreak ?? "no way through"}.`}
				</div>
			</div>
		</Panel>
	);
}
