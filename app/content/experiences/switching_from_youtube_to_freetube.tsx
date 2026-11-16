import {
	ArrowRight,
	Fingerprint,
	HardDrive,
	MonitorPlay,
	X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Chip, Panel } from "~/components/post/kit";

const RED = "var(--red)";
const GREEN = "var(--green)";

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
			<div className="flex items-center gap-2 border border-border/70 bg-surface0/40 px-2.5 py-1.5">
				<MonitorPlay className="size-3.5 shrink-0 text-red" />
				<div className="min-w-0 flex-1  leading-tight">
					<div className="truncate text-[11px] text-subtext0">
						one viewing session
					</div>
					<div className="truncate text-[9px] text-overlay1">
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
						className="min-w-0 border border-border/70 bg-base/40 px-1.5 py-1.5 text-center"
					>
						<div className="truncate  text-[11px] text-red">{site.label}</div>
						<div className="truncate  text-[9px] text-overlay1">
							{site.note}
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-3 border border-border/70 bg-surface0/30 p-2.5">
				<div className="flex items-center gap-2">
					<HardDrive className="size-3.5 shrink-0 text-green" />
					<span className="min-w-0 flex-1 truncate  text-[11px] text-subtext0">
						freetube, same machine
					</span>
					<Chip accent={GREEN} className="shrink-0">
						local only
					</Chip>
				</div>
				<div className="mt-2 flex items-center gap-2">
					<span className="truncate  text-[9px] text-overlay1">
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

/* -------------------------------------------------- thumbnail preference */

function Clickbait() {
	const reduced = useReducedMotion();

	return (
		<motion.div
			className="absolute inset-0"
			initial={reduced ? false : { opacity: 0, scale: 1.03 }}
			animate={{ opacity: 1, scale: 1 }}
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
				className="absolute right-[8%] top-[14%] size-[44%] border-[3px] border-[var(--yellow)]/90"
			/>
			<div
				aria-hidden
				className="absolute left-[11%] top-[24%] h-[54%] w-[24%] bg-pink/85"
			>
				<span className="absolute left-[24%] top-[28%] size-[13%] bg-crust" />
				<span className="absolute right-[24%] top-[28%] size-[13%] bg-crust" />
				<span className="absolute left-[38%] top-[56%] h-[22%] w-[24%] bg-crust" />
			</div>
			<div
				aria-hidden
				className="absolute left-[36%] top-[38%] text-[var(--yellow)]"
			>
				<ArrowRight className="size-10 sm:size-16" strokeWidth={3} />
			</div>
			<span className="absolute bottom-[9%] left-[38%] -rotate-6 border border-crust/50 bg-crust/75 px-1.5 py-0.5  text-[11px] font-bold uppercase tracking-tight text-text sm:text-xs">
				shocking
			</span>
			<span className="absolute bottom-[6%] right-[4%]  bg-crust/75 px-1  text-[9px] text-text">
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
				className="absolute right-[10%] top-[16%] size-[15%] bg-surface1/50"
			/>
			<span
				aria-hidden
				className="absolute bottom-0 left-[12%] h-[36%] w-[22%]  bg-surface0/80"
			/>
			<span
				aria-hidden
				className="absolute bottom-0 right-[18%] h-[50%] w-[17%]  bg-surface0/60"
			/>
			<span
				aria-hidden
				className="absolute inset-x-0 top-[62%] h-px bg-surface1/40"
			/>
			<span className="absolute bottom-[6%] right-[4%]  bg-crust/80 px-1  text-[9px] text-overlay1">
				04:12
			</span>
		</motion.div>
	);
}

export function ThumbnailPreference() {
	return (
		<div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
			<div>
				<div
					role="img"
					aria-label="A loud thumbnail with a shocked face and a big arrow"
					className="relative aspect-video overflow-hidden border border-border/70"
				>
					<Clickbait />
				</div>
				<div className="mt-2 truncate  text-[11px] text-overlay1">
					the thumbnail as uploaded
				</div>
			</div>
			<div>
				<div
					role="img"
					aria-label="A plain frame from the video"
					className="relative aspect-video overflow-hidden border border-border/70"
				>
					<VideoFrame />
				</div>
				<div className="mt-2 truncate  text-[11px] text-overlay1">
					a frame from the video
				</div>
			</div>
		</div>
	);
}
