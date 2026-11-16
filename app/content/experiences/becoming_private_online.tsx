import { Globe, UserRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Chip, Switch } from "~/components/post/kit";

/* The alias switch for "Becoming private online". Every label below is either a
   literal section heading or a noun the post itself uses. */

function Fill({
	value,
	accent = "var(--accent-surface)",
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

const SITES = ["site 01", "site 02", "site 03", "site 04", "site 05"];

export function IdentitySplit() {
	const reduced = useReducedMotion();

	return (
		<Switch
			off="one e-mail: one address"
			on="aliases: five addresses"
			initial={false}
			label="e-mail aliases"
			accent="var(--accent-surface)"
		>
			{(separate) => {
				const accent = separate ? "var(--green)" : "var(--peach)";
				const shared = separate ? 0 : SITES.length;
				return (
					<div className="space-y-3">
						<div className="flex items-center justify-between gap-2">
							<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
								sites sharing your address
							</span>
							<span
								className="text-[11px] tabular-nums"
								style={{ color: accent }}
							>
								{shared} / {SITES.length}
							</span>
						</div>

						<Fill value={(shared / SITES.length) * 100} accent={accent} />

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
							<UserRound className="mt-0.5 size-3 shrink-0 text-accent" />
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
