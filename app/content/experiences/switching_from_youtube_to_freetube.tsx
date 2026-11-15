import {
	ArrowRight,
	Check,
	Clock,
	Fingerprint,
	Ghost,
	HardDrive,
	ListVideo,
	Lock,
	MonitorPlay,
	Play,
	ShieldOff,
	Wifi,
	X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Callout, Chip, Panel, Stat, Switch } from "~/components/post/kit";
import { cn } from "~/lib/utils";

const MAUVE = "var(--mauve)";
const RED = "var(--red)";
const GREEN = "var(--green)";

function TileMarks() {
	return (
		<span aria-hidden="true" className="flex shrink-0 items-center gap-1">
			<span className="size-2 rounded-[1px] bg-mauve/70" />
			<span className="size-2 rounded-[1px] border border-border" />
		</span>
	);
}

/* ------------------------------------------------------------------ hero */

const BEACONS = [
	{ top: "14%", left: "54%" },
	{ top: "18%", left: "74%" },
	{ top: "30%", left: "88%" },
	{ top: "46%", left: "66%" },
	{ top: "62%", left: "82%" },
];

const RAILS = ["up next", "for you", "trending"];

export function VideoPageMockup() {
	const id = useId();
	const reduced = useReducedMotion();
	const [free, setFree] = useState(false);

	const spring = reduced
		? { duration: 0 }
		: { type: "spring" as const, stiffness: 320, damping: 28 };
	const fade = { duration: reduced ? 0 : 0.22 };

	return (
		<div className="not-prose my-6 overflow-hidden rounded-panel border border-border bg-mantle/80">
			<div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
				<TileMarks />
				<div className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-border/60 bg-crust/50 px-2 py-0.5">
					{free ? (
						<Lock className="size-2.5 shrink-0 text-green" />
					) : (
						<Wifi className="size-2.5 shrink-0 text-red" />
					)}
					<span className="truncate  text-[10px] text-overlay1">
						{free
							? "freetube://subscriptions"
							: "youtube.com/feed/subscriptions"}
					</span>
				</div>
				<Chip className="shrink-0">mockup</Chip>
			</div>

			<div className="p-3 sm:p-4">
				<div className="flex flex-wrap items-center gap-2">
					<div
						aria-label="Front end shown in the mockup"
						className="relative inline-flex rounded-full border border-border bg-surface0/60 p-1"
					>
						{(
							[
								{ key: "youtube", label: "youtube.com" },
								{ key: "freetube", label: "freetube" },
							] as const
						).map((option) => {
							const active = (option.key === "freetube") === free;
							return (
								<button
									key={option.key}
									type="button"
									aria-pressed={active}
									onClick={() => setFree(option.key === "freetube")}
									className={cn(
										"relative rounded-full px-3 py-1  text-[11px] transition-colors sm:text-xs",
										active ? "text-crust" : "text-overlay1 hover:text-text",
									)}
								>
									{active ? (
										<motion.span
											layoutId={`${id}-pill`}
											className="absolute inset-0 rounded-full"
											style={{
												background: option.key === "freetube" ? MAUVE : RED,
											}}
											transition={spring}
										/>
									) : null}
									<span className="relative">{option.label}</span>
								</button>
							);
						})}
					</div>
					<span className="text-[10px] text-overlay0">
						{free ? "the front end is yours" : "the official site"}
					</span>
				</div>

				<div className="relative mt-3 overflow-hidden rounded-lg border border-border/70 bg-crust/60">
					<div className="relative aspect-video">
						<AnimatePresence initial={false}>
							<motion.div
								key={free ? "free" : "yt"}
								aria-hidden
								className="absolute inset-0"
								style={{
									background: free
										? "radial-gradient(120% 100% at 15% 0%, color-mix(in srgb, var(--mauve) 26%, transparent), transparent 62%)"
										: "radial-gradient(120% 100% at 15% 0%, color-mix(in srgb, var(--red) 26%, transparent), transparent 62%)",
								}}
								initial={reduced ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: reduced ? 0 : 0.35 }}
							/>
						</AnimatePresence>

						<AnimatePresence>
							{free ? null : (
								<motion.div
									key="beacons"
									aria-hidden
									className="absolute inset-0"
									initial={reduced ? false : { opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={fade}
								>
									{BEACONS.map((beacon, index) => (
										<motion.span
											key={`${beacon.top}-${beacon.left}`}
											className="absolute size-1.5 rounded-full"
											style={{
												top: beacon.top,
												left: beacon.left,
												background: RED,
											}}
											animate={
												reduced
													? undefined
													: { opacity: [0.25, 1, 0.25], scale: [1, 1.7, 1] }
											}
											transition={{
												duration: 2.4,
												delay: index * 0.28,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeInOut",
											}}
										/>
									))}
								</motion.div>
							)}
						</AnimatePresence>

						<div className="absolute left-2 top-2">
							<AnimatePresence mode="wait" initial={false}>
								<motion.div
									key={free ? "clean" : "ad"}
									initial={reduced ? false : { opacity: 0, y: -4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
									transition={{ duration: reduced ? 0 : 0.18 }}
								>
									<Chip accent={free ? GREEN : RED}>
										{free ? (
											<>
												<ShieldOff className="size-2.5" /> no ads
											</>
										) : (
											<>
												<Clock className="size-2.5" /> ad 0:15
											</>
										)}
									</Chip>
								</motion.div>
							</AnimatePresence>
						</div>

						<div
							aria-hidden
							className="absolute inset-0 grid place-items-center"
						>
							<motion.div
								className="grid size-11 place-items-center rounded-full border border-border/70 bg-crust/50 backdrop-blur-sm"
								whileHover={reduced ? undefined : { scale: 1.06 }}
							>
								<Play
									className="size-4 translate-x-px"
									style={{ color: free ? MAUVE : RED }}
									fill="currentColor"
									strokeWidth={0}
								/>
							</motion.div>
						</div>

						<div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-crust/85 to-transparent px-2 pb-1.5 pt-5">
							<div className="relative h-1 overflow-hidden rounded-full bg-surface1/60">
								<motion.span
									className="absolute inset-y-0 left-0 rounded-full"
									style={{ background: free ? MAUVE : RED }}
									initial={reduced ? false : { width: 0 }}
									animate={{ width: "46%" }}
									transition={{
										duration: reduced ? 0 : 0.9,
										ease: [0.22, 1, 0.36, 1],
									}}
								/>
							</div>
							<div className="flex items-center justify-between gap-2  text-[9px] text-overlay1">
								<span>12:04 / 24:31</span>
								<span className="inline-flex items-center gap-1">
									<span
										className="size-1.5 rounded-full"
										style={{ background: free ? "var(--surface2)" : GREEN }}
									/>
									autoplay {free ? "off" : "on"}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_7.5rem]">
					<div className="min-w-0">
						<div className="truncate  text-[11px] text-subtext0">
							a video from a channel you follow
						</div>
						<div className="mt-1.5">
							<motion.div
								key={free ? "free-stats" : "yt-stats"}
								initial={reduced ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: reduced ? 0 : 0.25 }}
								className="grid grid-cols-2 gap-2"
							>
								<Stat
									label="requests"
									value={free ? "30" : "240"}
									hint="illustrative"
								/>
								<Stat
									label="trackers"
									value={free ? "0" : "9"}
									hint="illustrative"
								/>
							</motion.div>
						</div>
					</div>

					<div className="min-h-[4.5rem]">
						<div className="mb-1  text-[9px] uppercase tracking-[0.14em] text-overlay0">
							rails
						</div>
						<AnimatePresence mode="wait" initial={false}>
							{free ? (
								<motion.div
									key="none"
									initial={reduced ? false : { opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={fade}
									className="grid h-[3.25rem] place-items-center rounded-md border border-dashed border-border/70 text-center"
								>
									<Ghost className="size-3.5 text-overlay0" />
									<span className="text-[9px] leading-tight text-overlay0">
										no rail
									</span>
								</motion.div>
							) : (
								<motion.div
									key="rails"
									initial={reduced ? false : { opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={fade}
									className="space-y-1"
								>
									{RAILS.map((label) => (
										<div
											key={label}
											className="flex items-center gap-1.5 rounded-md border border-border/60 bg-base/40 px-1.5 py-1"
										>
											<span className="size-4 shrink-0 rounded bg-surface1/70" />
											<span className="truncate  text-[9px] text-overlay0">
												{label}
											</span>
										</div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>

			<div className="border-t border-border/70 px-3 py-2  text-[10px] leading-relaxed text-overlay0">
				Both sides are a mockup of a video page. Request and beacon counts are
				illustrative, not measured.
			</div>
		</div>
	);
}

/* ------------------------------------------------------- what follows you */

const DESTINATIONS = [
	{ label: "youtube", note: "watch page" },
	{ label: "search", note: "suggestions" },
	{ label: "ads", note: "partners" },
];

export function WhatFollowsYou() {
	const reduced = useReducedMotion();

	return (
		<Panel
			title="what follows you"
			icon={<Fingerprint className="size-3" />}
			footer="Illustrative mockup. The direction of travel matters here, not the number of sites."
		>
			<div className="flex items-center gap-2 rounded-md border border-border/70 bg-surface0/40 px-2.5 py-1.5">
				<MonitorPlay className="size-3.5 shrink-0 text-red" />
				<div className="min-w-0 flex-1  leading-tight">
					<div className="truncate text-[10px] text-subtext0">
						one viewing session
					</div>
					<div className="truncate text-[9px] text-overlay0">
						same cookie, same address
					</div>
				</div>
				<Chip accent={RED} className="shrink-0">
					signed in
				</Chip>
			</div>

			<svg
				aria-hidden
				className="block h-12 w-full"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				{[16, 50, 84].map((target, index) => (
					<motion.path
						key={target}
						d={`M50 0 C 50 52, ${target} 48, ${target} 100`}
						fill="none"
						stroke={RED}
						strokeOpacity={0.6}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						initial={reduced ? undefined : { pathLength: 0 }}
						whileInView={reduced ? undefined : { pathLength: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{
							duration: reduced ? 0 : 0.6,
							delay: reduced ? 0 : index * 0.1,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
				))}
			</svg>

			<div className="grid grid-cols-3 gap-1.5">
				{DESTINATIONS.map((site, index) => (
					<motion.div
						key={site.label}
						initial={reduced ? false : { opacity: 0, y: 6 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{
							duration: reduced ? 0 : 0.35,
							delay: reduced ? 0 : 0.1 + index * 0.08,
						}}
						className="min-w-0 rounded-md border border-border/70 bg-base/40 px-1.5 py-1.5 text-center"
					>
						<div className="truncate  text-[10px] text-red">{site.label}</div>
						<div className="truncate  text-[9px] text-overlay0">
							{site.note}
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-3 rounded-panel border border-border/70 bg-surface0/30 p-2.5">
				<div className="flex items-center gap-2">
					<HardDrive className="size-3.5 shrink-0 text-green" />
					<span className="min-w-0 flex-1 truncate  text-[10px] text-subtext0">
						freetube, same machine
					</span>
					<Chip accent={GREEN} className="shrink-0">
						local only
					</Chip>
				</div>
				<div className="mt-2 flex items-center gap-2">
					<span className="truncate  text-[9px] text-overlay0">
						subscriptions, history
					</span>
					<span aria-hidden className="h-px flex-1 bg-border" />
					<span className="inline-flex items-center gap-1  text-[9px] text-overlay1">
						<X className="size-2.5" /> goes no further
					</span>
				</div>
			</div>
		</Panel>
	);
}

/* ----------------------------------------------------- migration checklist */

const MIGRATION = [
	{
		id: "install",
		label: "install",
		detail: "package manager or the Windows download",
	},
	{
		id: "subscriptions",
		label: "subscriptions",
		detail:
			"import, or add channels by hand. 2,000+ subscribed, 10 to 20 watched",
	},
	{
		id: "playback",
		label: "playback",
		detail: "720p plays. 1080p came from Invidious instances that buffered",
	},
	{
		id: "account",
		label: "no account",
		detail: "subscribing needs no profile",
	},
	{
		id: "local",
		label: "local data",
		detail: "subscriptions and history stay on the disk",
	},
];

export function MigrationChecklist() {
	const reduced = useReducedMotion();
	const [ticked, setTicked] = useState<Record<string, boolean>>({});
	const done = MIGRATION.filter((item) => ticked[item.id]).length;
	const complete = done === MIGRATION.length;
	const percent = Math.round((done / MIGRATION.length) * 100);

	return (
		<Panel
			title="migration checklist"
			icon={<ListVideo className="size-3" />}
			footer="Every item comes from the post. The ticks are yours."
		>
			<div className="space-y-1.5">
				<div className="flex items-baseline justify-between  text-[10px]">
					<span className="uppercase tracking-[0.14em] text-overlay1">
						progress
					</span>
					<span className="tabular-nums text-overlay0">
						{done}/{MIGRATION.length}
					</span>
				</div>
				<div
					role="progressbar"
					aria-label="Migration checklist progress"
					aria-valuemin={0}
					aria-valuemax={MIGRATION.length}
					aria-valuenow={done}
					className="h-1.5 overflow-hidden rounded-full bg-surface0"
				>
					<motion.div
						className="h-full rounded-full"
						style={{ background: complete ? GREEN : MAUVE }}
						initial={reduced ? false : { width: 0 }}
						animate={{ width: `${percent}%` }}
						transition={
							reduced
								? { duration: 0 }
								: { type: "spring", stiffness: 240, damping: 26 }
						}
					/>
				</div>
			</div>

			<div className="mt-2.5 space-y-0.5">
				{MIGRATION.map((item) => {
					const checked = Boolean(ticked[item.id]);
					return (
						<button
							key={item.id}
							type="button"
							aria-checked={checked}
							onClick={() =>
								setTicked((current) => ({
									...current,
									[item.id]: !current[item.id],
								}))
							}
							className="flex w-full items-start gap-2.5 rounded-md border border-transparent px-1.5 py-1.5 text-left transition-colors hover:border-border/70 hover:bg-surface0/40"
						>
							<span
								className={cn(
									"mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors",
									checked ? "border-transparent" : "border-border",
								)}
								style={checked ? { background: GREEN } : undefined}
							>
								<AnimatePresence initial={false}>
									{checked ? (
										<motion.span
											key="tick"
											initial={reduced ? false : { scale: 0.4, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0.4, opacity: 0 }}
											transition={
												reduced
													? { duration: 0 }
													: { type: "spring", stiffness: 520, damping: 24 }
											}
										>
											<Check className="size-3 text-crust" strokeWidth={3} />
										</motion.span>
									) : null}
								</AnimatePresence>
							</span>
							<span className="min-w-0">
								<span
									className={cn(
										"block  text-[11px] leading-snug transition-colors",
										checked ? "text-overlay0 line-through" : "text-subtext0",
									)}
								>
									{item.label}
								</span>
								<span className="mt-0.5 block  text-[10px] leading-snug text-overlay0">
									{item.detail}
								</span>
							</span>
						</button>
					);
				})}
			</div>

			<AnimatePresence initial={false}>
				{complete ? (
					<motion.div
						key="done"
						initial={reduced ? false : { opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduced ? 0 : 0.25 }}
					>
						<Callout accent={GREEN} icon={<Check className="size-3.5" />}>
							That is the whole switch. Nothing in this list asked for an
							account.
						</Callout>
					</motion.div>
				) : null}
			</AnimatePresence>
		</Panel>
	);
}

/* -------------------------------------------------- thumbnail preference */

function Clickbait() {
	const reduced = useReducedMotion();

	return (
		<motion.div
			className="absolute inset-0"
			initial={reduced ? false : { opacity: 0, scale: 1.03 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ duration: reduced ? 0 : 0.22 }}
		>
			<div
				aria-hidden
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(135deg, color-mix(in srgb, var(--red) 62%, var(--crust)) 0%, color-mix(in srgb, var(--yellow) 42%, var(--crust)) 100%)",
				}}
			/>
			<div
				aria-hidden
				className="absolute right-[8%] top-[14%] size-[44%] rounded-full border-[3px] border-[var(--yellow)]/90"
			/>
			<div
				aria-hidden
				className="absolute left-[11%] top-[24%] h-[54%] w-[24%] rounded-[50%] bg-rosewater/85"
			>
				<span className="absolute left-[24%] top-[28%] size-[13%] rounded-full bg-crust" />
				<span className="absolute right-[24%] top-[28%] size-[13%] rounded-full bg-crust" />
				<span className="absolute left-[38%] top-[56%] h-[22%] w-[24%] rounded-full bg-crust" />
			</div>
			<motion.div
				aria-hidden
				className="absolute left-[36%] top-[38%] text-[var(--yellow)]"
				animate={reduced ? undefined : { x: [0, 7, 0] }}
				transition={{
					duration: 1.7,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<ArrowRight className="size-10 sm:size-16" strokeWidth={3} />
			</motion.div>
			<span className="absolute bottom-[9%] left-[38%] -rotate-6 rounded-sm border border-crust/50 bg-crust/75 px-1.5 py-0.5  text-[10px] font-bold uppercase tracking-tight text-text sm:text-xs">
				shocking
			</span>
			<span className="absolute bottom-[6%] right-[4%] rounded bg-crust/75 px-1  text-[9px] text-text">
				0:03
			</span>
		</motion.div>
	);
}

function VideoFrame() {
	const reduced = useReducedMotion();

	return (
		<motion.div
			className="absolute inset-0 bg-[var(--crust)]"
			initial={reduced ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: reduced ? 0 : 0.22 }}
		>
			<div
				aria-hidden
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(80% 70% at 70% 30%, color-mix(in srgb, var(--teal) 18%, transparent), transparent 62%), linear-gradient(160deg, color-mix(in srgb, var(--mauve) 12%, transparent), transparent 55%)",
				}}
			/>
			<span
				aria-hidden
				className="absolute right-[10%] top-[16%] size-[15%] rounded-full bg-surface1/50"
			/>
			<span
				aria-hidden
				className="absolute bottom-0 left-[12%] h-[36%] w-[22%] rounded-t-md bg-surface0/80"
			/>
			<span
				aria-hidden
				className="absolute bottom-0 right-[18%] h-[50%] w-[17%] rounded-t-full bg-surface0/60"
			/>
			<span
				aria-hidden
				className="absolute inset-x-0 top-[62%] h-px bg-surface1/40"
			/>
			<span className="absolute bottom-[6%] right-[4%] rounded bg-crust/80 px-1  text-[9px] text-overlay1">
				04:12
			</span>
		</motion.div>
	);
}

export function ThumbnailPreference() {
	return (
		<Switch on="frame thumbnails" off="clickbait thumbnails">
			{(frames) => (
				<div>
					<div
						role="img"
						aria-label={
							frames
								? "A plain frame from the video"
								: "A loud thumbnail with a shocked face and a big arrow"
						}
						className="relative aspect-video overflow-hidden rounded-md border border-border/70"
					>
						<AnimatePresence initial={false} mode="wait">
							{frames ? (
								<VideoFrame key="frame" />
							) : (
								<Clickbait key="clickbait" />
							)}
						</AnimatePresence>
					</div>
					<div className="mt-2 flex items-center justify-between gap-2  text-[10px] text-overlay0">
						<span className="truncate">
							{frames ? "a frame from the video" : "the thumbnail as uploaded"}
						</span>
						<Chip accent={frames ? MAUVE : RED} className="shrink-0">
							{frames ? "thumbnail preference" : "clickbait"}
						</Chip>
					</div>
				</div>
			)}
		</Switch>
	);
}
