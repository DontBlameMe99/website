import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	CalendarDays,
	Check,
	Eye,
	Globe,
	Phone,
	ShieldCheck,
	UserRound,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Callout, Chip, Panel, Switch, Tabs } from "~/components/post/kit";
import { cn } from "~/lib/utils";

/* Interactive figures for "Becoming private online". Every label below is
   either a literal section heading or a noun the post itself uses, so the
   author's prose stays untouched and the figures never invent a step. */

function Fill({
	value,
	accent = "var(--mauve)",
}: {
	value: number;
	accent?: string;
}) {
	const reduced = useReducedMotion();
	const clamped = Math.max(0, Math.min(100, value));
	return (
		<div className="h-1.5 overflow-hidden bg-surface0" aria-hidden>
			<motion.div
				className="h-full"
				style={{ background: accent }}
				initial={false}
				animate={{ width: `${clamped}%` }}
				transition={
					reduced
						? { duration: 0.15 }
						: { type: "spring", stiffness: 170, damping: 24, mass: 0.6 }
				}
			/>
		</div>
	);
}

const STEPS: { label: string; moves: string[] }[] = [
	{
		label: "First Steps",
		moves: ["search engine", "settings", "old accounts", "passwords", "VPNs"],
	},
	{
		label: "Second Steps",
		moves: ["2FA", "browser", "alternatives"],
	},
	{
		label: "Third Steps",
		moves: [
			"pseudonyms",
			"throwaway e-mails",
			"accounts",
			"privacy policy",
			"open source",
			"compartmentalize",
		],
	},
];

export function PrivacyMeter() {
	const reduced = useReducedMotion();
	const [taken, setTaken] = useState(0);
	const next = STEPS[taken];

	return (
		<Panel
			title="privacy-meter"
			icon={<ShieldCheck className="size-3.5" />}
			footer="You will never achieve 100% Privacy though."
		>
			<div className="space-y-3">
				<div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1.5">
					<div className="flex items-baseline gap-1.5">
						<span className="relative inline-flex overflow-hidden">
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.span
									key={taken}
									initial={reduced ? false : { y: 14, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={reduced ? { opacity: 0 } : { y: -14, opacity: 0 }}
									transition={{ type: "spring", stiffness: 420, damping: 30 }}
									className="text-xl leading-none tabular-nums text-text"
								>
									{taken}
								</motion.span>
							</AnimatePresence>
						</span>
						<span className="text-xs text-overlay0">/3</span>
						<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
							steps taken
						</span>
					</div>
					<Chip accent={next ? "var(--mauve)" : "var(--green)"}>
						{next
							? `next: ${next.label.toLowerCase()}`
							: "some level of Privacy"}
					</Chip>
				</div>

				<Fill
					value={(taken / STEPS.length) * 100}
					accent={taken === STEPS.length ? "var(--green)" : "var(--mauve)"}
				/>

				<div className="space-y-1.5">
					{STEPS.map((step, index) => {
						const done = index < taken;
						const current = index === taken;
						return (
							<motion.button
								key={step.label}
								type="button"
								layout={!reduced}
								aria-pressed={done}
								onClick={() =>
									setTaken(index + 1 === taken ? index : index + 1)
								}
								whileTap={reduced ? undefined : { scale: 0.985 }}
								className={cn(
									"flex w-full items-start gap-2 border px-2 py-1.5 text-left transition-colors",
									done && "border-mauve/40 bg-mauve/10",
									current && "border-border bg-surface0/40",
									!done &&
										!current &&
										"border-border/60 opacity-55 hover:opacity-100",
								)}
							>
								<span
									className={cn(
										"mt-0.5 grid size-4 shrink-0 place-items-center  border  text-[9px]",
										done
											? "border-mauve bg-mauve text-on-accent"
											: "border-overlay0/60 text-overlay0",
									)}
								>
									{done ? (
										<Check className="size-2.5" strokeWidth={3} />
									) : (
										index + 1
									)}
								</span>
								<span className="min-w-0 flex-1">
									<span className="block  text-[11px] text-text">
										{step.label}
									</span>
									<span className="mt-1 flex flex-wrap gap-1">
										{step.moves.map((move) => (
											<Chip
												key={move}
												accent={done ? "var(--mauve)" : "var(--overlay1)"}
											>
												{move}
											</Chip>
										))}
									</span>
								</span>
								{current ? (
									reduced ? (
										<ArrowRight className="mt-1 size-3 shrink-0 text-mauve" />
									) : (
										<motion.span
											className="mt-1 shrink-0 text-mauve"
											animate={{ x: [0, 3, 0] }}
											transition={{
												duration: 1.4,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											<ArrowRight className="size-3" />
										</motion.span>
									)
								) : null}
							</motion.button>
						);
					})}
				</div>
			</div>
		</Panel>
	);
}

const SITES = ["site 01", "site 02", "site 03", "site 04", "site 05"];

export function IdentitySplit() {
	const reduced = useReducedMotion();

	return (
		<Switch
			off="one e-mail: one address"
			on="aliases: five addresses"
			initial={false}
			accent="var(--mauve)"
		>
			{(separate) => {
				const accent = separate ? "var(--green)" : "var(--peach)";
				const linked = separate ? 0 : SITES.length;
				return (
					<div className="space-y-3">
						<div className="flex items-center justify-between gap-2">
							<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
								sites that can link you
							</span>
							<span
								className="text-[11px] tabular-nums"
								style={{ color: accent }}
							>
								{linked} / {SITES.length}
							</span>
						</div>

						<Fill value={(linked / SITES.length) * 100} accent={accent} />

						<ul className="space-y-1">
							{SITES.map((site, index) => (
								<motion.li
									key={site}
									layout={!reduced}
									className="flex items-center gap-2 border border-border/60 px-2 py-1.5"
								>
									<Globe className="size-3 shrink-0 text-overlay1" />
									<span className="shrink-0  text-[11px] text-subtext0">
										{site}
									</span>
									<span className="min-w-4 flex-1 border-t border-dashed border-border/70" />
									<span className="relative inline-flex shrink-0 overflow-hidden">
										<AnimatePresence mode="popLayout" initial={false}>
											<motion.span
												key={separate ? "alias" : "shared"}
												initial={reduced ? false : { y: 10, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={reduced ? { opacity: 0 } : { y: -10, opacity: 0 }}
												transition={{ duration: 0.18 }}
											>
												<Chip accent={accent}>
													{separate
														? `alias ${String(index + 1).padStart(2, "0")}`
														: "one address"}
												</Chip>
											</motion.span>
										</AnimatePresence>
									</span>
								</motion.li>
							))}
						</ul>

						<div className="flex items-start gap-2  text-[11px] leading-relaxed text-overlay1">
							<UserRound className="mt-0.5 size-3 shrink-0 text-mauve" />
							<span>
								{separate
									? "each site only ever sees its own address"
									: "every site sees the same address"}
							</span>
						</div>
					</div>
				);
			}}
		</Switch>
	);
}

const PUBLISHED: { label: string; icon: LucideIcon }[] = [
	{ label: "real name", icon: UserRound },
	{ label: "age", icon: CalendarDays },
	{ label: "phone number", icon: Phone },
];

function Exposure({ flagged }: { flagged: boolean }) {
	const reduced = useReducedMotion();
	const accent = flagged ? "var(--red)" : "var(--green)";

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between gap-2">
				<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
					published, years ago
				</span>
				<Chip accent={accent}>{flagged ? "re-read now" : "harmless"}</Chip>
			</div>

			<ul className="space-y-1">
				{PUBLISHED.map((entry, index) => {
					const Icon = entry.icon;
					return (
						<motion.li
							key={entry.label}
							initial={reduced ? false : { opacity: 0, x: -6 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.25, delay: reduced ? 0 : index * 0.06 }}
						>
							<div
								className="flex items-center gap-2 border px-2 py-1.5"
								style={{
									borderColor: flagged
										? "color-mix(in srgb, var(--red) 35%, transparent)"
										: "var(--color-border)",
								}}
							>
								<Icon className="size-3 shrink-0" style={{ color: accent }} />
								<span className="text-[11px] text-text">{entry.label}</span>
								<span className="min-w-0 flex-1" />
								<span
									className="text-[9px] uppercase tracking-[0.12em]"
									style={{ color: accent }}
								>
									{flagged ? "flagged" : "fine"}
								</span>
							</div>
						</motion.li>
					);
				})}
			</ul>

			<div className="flex items-center justify-between gap-2  text-[11px] text-overlay1">
				<span>exposed fields</span>
				<span className="tabular-nums" style={{ color: accent }}>
					{flagged ? PUBLISHED.length : 0} / {PUBLISHED.length}
				</span>
			</div>
		</div>
	);
}

export function NothingToHide() {
	return (
		<div>
			<Tabs
				tabs={[
					{
						id: "today",
						label: "today",
						content: <Exposure flagged={false} />,
					},
					{
						id: "later",
						label: "when the rules change",
						content: <Exposure flagged />,
					},
				]}
			/>
			<Callout icon={<Eye className="size-3.5" />}>
				You have something to hide. And even if you think you are doing nothing
				which someone else could understand wrong, the rules might change.
			</Callout>
		</div>
	);
}
