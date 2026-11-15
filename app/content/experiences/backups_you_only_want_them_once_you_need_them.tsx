import type { LucideIcon } from "lucide-react";
import {
	ArrowDown,
	ArrowRight,
	Brain,
	Bug,
	Cloud,
	Copy,
	Database,
	FileArchive,
	Flame,
	HardDrive,
	History,
	KeyRound,
	Laptop,
	RotateCcw,
	ShieldCheck,
	Unplug,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import {
	Bars,
	Callout,
	Chip,
	Meter,
	Panel,
	Range,
} from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Four figures for the backups post. Each one owns its state and never touches
   the document, so the article still prerenders. Aggressive motion steps aside
   for reduced-motion readers. */

const MAUVE = "var(--mauve)";
const GREEN = "var(--green)";
const RED = "var(--red)";
const TEAL = "var(--teal)";
const BLUE = "var(--blue)";
const MUTED = "var(--overlay0)";
const BORDER = "var(--color-border)";

const mix = (color: string, percent: number) =>
	`color-mix(in srgb, ${color} ${percent}%, transparent)`;

const spring = (reduced: boolean | null, stiffness = 320) =>
	reduced
		? { duration: 0 }
		: { type: "spring" as const, stiffness, damping: 28 };

/* --- shared chrome ------------------------------------------------------- */

function WindowDots() {
	return (
		<span className="flex items-center gap-1">
			{["--traffic-red", "--traffic-yellow", "--traffic-green"].map((token) => (
				<span
					key={token}
					className="size-2 rounded-full ring-1 ring-black/20"
					style={{ background: `var(${token})` }}
				/>
			))}
		</span>
	);
}

function MiniButton({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] transition-colors"
			style={{
				borderColor: mix(MAUVE, 40),
				background: mix(MAUVE, 10),
				color: MAUVE,
			}}
		>
			{children}
		</button>
	);
}

/* --- figure one: is this a backup? -------------------------------------- */

type SortItem = {
	path: string;
	detail: string;
	icon: LucideIcon;
	backup: boolean;
	quote: string;
	why: string;
};

const SORTER: SortItem[] = [
	{
		path: "~/Pictures",
		detail: "copied to ~/Pictures.old, same SSD",
		icon: Copy,
		backup: false,
		quote: "A copy of your files on the same disk",
		why: "The disk dies and both folders leave together.",
	},
	{
		path: "~/.config/nvim",
		detail: "rsynced to a second, external disk",
		icon: FileArchive,
		backup: false,
		quote: "A partial copy of your important files",
		why: "The rest of the machine still has exactly one copy.",
	},
	{
		path: "~/",
		detail: "full disk image, external HDD",
		icon: HardDrive,
		backup: true,
		quote:
			"A secure, preferably encrypted copy of all your files onto: a separate disk",
		why: "Everything, encrypted, on a disk that is not the one it copies.",
	},
	{
		path: "Borg",
		detail: "ssh://cloud-box/./Borg",
		icon: Cloud,
		backup: true,
		quote:
			"A secure, preferably encrypted copy of all your files onto: a remote location",
		why: "A different machine in a different building.",
	},
	{
		path: "rsync --all",
		detail: "last run: whenever I thought about it",
		icon: History,
		backup: false,
		quote: 'A "I-Do-It-Whenever-I-Think-About-It" copy of your files',
		why: "A schedule measured in good intentions.",
	},
];

export function BackupSorter() {
	const reduced = useReducedMotion();
	const [at, setAt] = useState(0);
	const [pick, setPick] = useState<boolean | null>(null);
	const [results, setResults] = useState<boolean[]>([]);

	const item = SORTER[at];
	const done = at >= SORTER.length;
	const score = results.filter(Boolean).length;
	const correct = item ? pick === item.backup : false;
	const Icon = item?.icon;

	const choose = (guess: boolean) => {
		if (!item || pick !== null) return;
		setPick(guess);
		setResults((prev) => [...prev, guess === item.backup]);
	};

	const advance = () => {
		setAt((prev) => prev + 1);
		setPick(null);
	};

	const restart = () => {
		setAt(0);
		setPick(null);
		setResults([]);
	};

	const swap = {
		initial: reduced ? false : { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
		exit: reduced ? { opacity: 0 } : { opacity: 0, y: -8 },
		transition: spring(reduced),
	};

	return (
		<Panel
			title="backup-or-not.app"
			icon={<WindowDots />}
			footer={
				done
					? `${score} / ${SORTER.length} right`
					: `item ${at + 1} / ${SORTER.length}`
			}
		>
			<AnimatePresence mode="wait" initial={false}>
				{done ? (
					<motion.div key="summary" {...swap} className="space-y-3">
						<div className="flex items-center justify-between gap-2">
							<span className="text-[11px] text-text">
								{score} / {SORTER.length} right
							</span>
							<MiniButton onClick={restart}>
								<RotateCcw className="size-3" />
								again
							</MiniButton>
						</div>
						<div className="text-[10px] leading-relaxed text-overlay1">
							{score === SORTER.length
								? "Every item matched. The definition did the work."
								: `${SORTER.length - score} of them slipped past the definition.`}
						</div>
						<Callout accent={MAUVE} icon={<ShieldCheck className="size-3.5" />}>
							<div>
								A secure, preferably encrypted copy of all your files onto:
							</div>
							<div className="mt-1">a separate disk</div>
							<div>a remote location</div>
						</Callout>
					</motion.div>
				) : item && Icon ? (
					<motion.div key={`item-${at}`} {...swap} className="space-y-3">
						<div className="rounded-panel border border-border/70 bg-surface0/25 p-2.5">
							<div className="flex items-start gap-2.5">
								<span className="grid size-8 shrink-0 place-items-center rounded-md border border-border/70 bg-base/60 text-mauve">
									<Icon className="size-4" />
								</span>
								<div className="min-w-0">
									<div className="break-all text-[11px] leading-snug text-text">
										{item.path}
									</div>
									<div className="mt-0.5 text-[9px] leading-relaxed text-overlay1">
										{item.detail}
									</div>
								</div>
							</div>

							{pick === null ? (
								<div className="mt-2.5 flex gap-1.5">
									<button
										type="button"
										onClick={() => choose(true)}
										className="flex-1 rounded-md border border-border/70 bg-base/60 px-2 py-1.5 text-[10px] text-subtext0 transition-colors hover:border-mauve/60 hover:text-text"
									>
										backup
									</button>
									<button
										type="button"
										onClick={() => choose(false)}
										className="flex-1 rounded-md border border-border/70 bg-base/60 px-2 py-1.5 text-[10px] text-subtext0 transition-colors hover:border-mauve/60 hover:text-text"
									>
										not a backup
									</button>
								</div>
							) : (
								<motion.div
									initial={reduced ? false : { opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: reduced ? 0 : 0.24 }}
									className="mt-2.5 space-y-2"
								>
									<div className="flex flex-wrap items-center gap-1.5">
										<Chip accent={item.backup ? GREEN : RED}>
											{item.backup ? "backup" : "not a backup"}
										</Chip>
										<Chip accent={correct ? GREEN : RED}>
											{correct ? "right" : "wrong"}
										</Chip>
									</div>
									<div
										className="border-l-2 pl-2.5"
										style={{ borderColor: item.backup ? GREEN : RED }}
									>
										<div className="text-[8px] uppercase tracking-[0.12em] text-overlay0">
											from the definition
										</div>
										<div className="break-words text-[10px] leading-relaxed text-subtext0">
											{item.quote}
										</div>
									</div>
									<div className="text-[10px] leading-relaxed text-overlay1">
										{item.why}
									</div>
									<MiniButton onClick={advance}>
										{at + 1 === SORTER.length ? "see the score" : "next item"}
										<ArrowRight className="size-3" />
									</MiniButton>
								</motion.div>
							)}
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</Panel>
	);
}

/* --- figure two: the 3-2-1 board ---------------------------------------- */

type CopyKind = "live" | "local" | "remote";
type DisasterId = "disk" | "fire" | "ransomware";

const DISASTERS: {
	id: DisasterId;
	label: string;
	icon: LucideIcon;
	line: string;
}[] = [
	{
		id: "disk",
		label: "disk dies",
		icon: HardDrive,
		line: "The working disk stops spinning.",
	},
	{
		id: "fire",
		label: "house fire",
		icon: Flame,
		line: "The house is gone, and everything that sat inside it.",
	},
	{
		id: "ransomware",
		label: "ransomware",
		icon: Bug,
		line: "Everything the machine can write to gets encrypted.",
	},
];

const copyLabel = (kind: CopyKind, index: number) =>
	kind === "live" ? "live" : `${kind === "local" ? "L" : "R"}${index + 1}`;

const copyHint = (kind: CopyKind) =>
	kind === "live" ? "in use" : kind === "local" ? "local" : "remote";

const copyAccent = (kind: CopyKind) =>
	kind === "live" ? MAUVE : kind === "local" ? TEAL : BLUE;

export function ThreeTwoOne() {
	const reduced = useReducedMotion();
	const [total, setTotal] = useState(3);
	const [local, setLocalCount] = useState(2);
	const [disaster, setDisaster] = useState<DisasterId | null>(null);

	const remote = total - local;
	const ruleOk = total >= 3 && local >= 2 && remote >= 1;

	const copies: { key: string; kind: CopyKind; index: number }[] = [
		{ key: "live", kind: "live", index: 0 },
		...Array.from({ length: local }, (_, index) => ({
			key: `local-${index}`,
			kind: "local" as const,
			index,
		})),
		...Array.from({ length: remote }, (_, index) => ({
			key: `remote-${index}`,
			kind: "remote" as const,
			index,
		})),
	];

	const gone = (kind: CopyKind) => {
		if (!disaster) return false;
		return disaster === "disk" ? kind === "live" : kind !== "remote";
	};

	const survivors = disaster ? copies.filter((copy) => !gone(copy.kind)) : [];
	const active = DISASTERS.find((entry) => entry.id === disaster);
	const verdict = !disaster
		? "no disaster yet"
		: survivors.length === 0
			? "not safe"
			: "safe";

	const setTotalSafe = (next: number) => {
		setTotal(next);
		setLocalCount((current) => Math.min(current, next));
	};

	return (
		<Panel
			title="3-2-1.app"
			icon={<WindowDots />}
			footer={ruleOk ? "3-2-1 satisfied" : "3-2-1 not satisfied"}
		>
			<div className="space-y-3">
				<div className="grid grid-cols-3 gap-1.5">
					<AnimatePresence initial={false}>
						{copies.map((copy) => {
							const isGone = gone(copy.kind);
							const accent = isGone ? RED : copyAccent(copy.kind);
							const Icon =
								copy.kind === "live"
									? Laptop
									: copy.kind === "local"
										? HardDrive
										: Cloud;

							return (
								<motion.div
									key={copy.key}
									layout={!reduced}
									initial={reduced ? false : { opacity: 0, scale: 0.85 }}
									animate={{
										opacity: isGone ? 0.45 : 1,
										scale: isGone ? 0.94 : 1,
									}}
									exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
									transition={spring(reduced, 380)}
									className="flex flex-col items-center gap-0.5 rounded-md border px-1 py-1.5"
									style={{
										borderColor: mix(accent, 45),
										background: mix(accent, 8),
										color: accent,
									}}
								>
									<Icon className="size-3.5" />
									<span className="text-[9px] leading-none">
										{copyLabel(copy.kind, copy.index)}
									</span>
									<span className="text-[8px] leading-none opacity-70">
										{isGone ? "gone" : copyHint(copy.kind)}
									</span>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>

				<div className="space-y-2.5">
					<Range
						label="backups in total"
						value={total}
						min={1}
						max={5}
						onChange={setTotalSafe}
						accent={MAUVE}
					/>
					<Range
						label="local copies"
						value={local}
						min={0}
						max={total}
						onChange={setLocalCount}
						accent={TEAL}
					/>
					<Range
						label="remote copies"
						value={remote}
						min={0}
						max={total}
						onChange={(next) => setLocalCount(total - next)}
						accent={BLUE}
					/>
				</div>

				<Panel
					title="the rule"
					icon={<ShieldCheck className="size-3" />}
					className="my-0"
				>
					<div className="space-y-2">
						<Meter
							label="backups"
							value={total}
							max={3}
							suffix="/3"
							accent={total >= 3 ? GREEN : MAUVE}
						/>
						<Meter
							label="local"
							value={local}
							max={2}
							suffix="/2"
							accent={local >= 2 ? GREEN : TEAL}
						/>
						<Meter
							label="remote"
							value={remote}
							max={1}
							suffix="/1"
							accent={remote >= 1 ? GREEN : BLUE}
						/>
					</div>
				</Panel>

				<div className="grid grid-cols-3 gap-1.5">
					{DISASTERS.map((entry) => {
						const Icon = entry.icon;
						const on = entry.id === disaster;

						return (
							<button
								key={entry.id}
								type="button"
								onClick={() => setDisaster(entry.id)}
								className={cn(
									"flex flex-col items-center gap-1 rounded-md border px-1 py-1.5 text-[9px] leading-none transition-colors",
									on ? "text-red" : "text-subtext0 hover:text-text",
								)}
								style={{
									borderColor: on ? mix(RED, 55) : BORDER,
									background: on ? mix(RED, 10) : mix("var(--text)", 4),
								}}
							>
								<Icon className="size-3.5" />
								{entry.label}
							</button>
						);
					})}
				</div>

				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={`${disaster ?? "none"}-${survivors.length}`}
						initial={reduced ? false : { opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
						transition={{ duration: reduced ? 0 : 0.22 }}
						className="rounded-panel border p-2.5"
						style={{
							borderColor: disaster
								? mix(survivors.length ? GREEN : RED, 40)
								: BORDER,
							background: disaster
								? mix(survivors.length ? GREEN : RED, 7)
								: "transparent",
						}}
					>
						<div className="flex flex-wrap items-center gap-1.5">
							<span className="text-[10px] text-text">
								{active?.label ?? verdict}
							</span>
							{disaster ? (
								<Chip accent={survivors.length ? GREEN : RED}>{verdict}</Chip>
							) : null}
							{disaster ? (
								<button
									type="button"
									onClick={() => setDisaster(null)}
									className="ml-auto inline-flex items-center gap-1 text-[9px] text-overlay1 transition-colors hover:text-text"
								>
									<RotateCcw className="size-2.5" />
									reset
								</button>
							) : null}
						</div>
						<div className="mt-1 text-[10px] leading-relaxed text-overlay1">
							{disaster && active
								? `${active.line} ${survivors.length} ${
										survivors.length === 1 ? "copy" : "copies"
									} still there.`
								: "Run a disaster and watch which copies survive it."}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</Panel>
	);
}

/* --- figure three: what borgmatic keeps --------------------------------- */

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
			title="borgmatic --list"
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
								className="flex items-center gap-2 rounded-panel border border-border/60 bg-surface0/25 px-2.5 py-1.5"
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

				<div className="text-[9px] leading-relaxed text-overlay0">
					Both repositories get the same schedule. The remote one is written
					over ssh.
				</div>
			</div>
		</Panel>
	);
}

/* --- figure four: the recovery chain ------------------------------------ */

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
		onBreak: "the passphrase has no home left",
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
								className="flex w-full items-center gap-2 rounded-panel border px-2 py-1.5 text-left transition-colors"
								style={{
									borderColor: mix(tint, cut ? 50 : 30),
									background: mix(tint, cut ? 9 : 4),
									opacity: blocked ? 0.55 : 1,
								}}
							>
								<span
									className="grid size-7 shrink-0 place-items-center rounded-md border"
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
											color: blockedAt(index + 1) ? MUTED : mix(GREEN, 70),
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
				className="mt-2.5 rounded-panel border p-2.5"
				style={{ borderColor: mix(accent, 40), background: mix(accent, 6) }}
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
					<span className="text-[10px] text-text">
						{ok ? "recovery works" : "recovery fails"}
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
				<div className="mt-1 text-[10px] leading-relaxed text-overlay1">
					{ok
						? "Nothing on this chain lives inside the thing it unlocks."
						: `${failing?.title ?? "a link"}: ${failing?.onBreak ?? "no way through"}.`}
				</div>
			</div>
		</Panel>
	);
}
