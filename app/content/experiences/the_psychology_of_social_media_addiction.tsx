import {
	BatteryCharging,
	Bell,
	Calendar,
	Camera,
	Compass,
	Dices,
	Film,
	Gamepad2,
	Gift,
	Globe,
	Heart,
	Image as ImageIcon,
	Layers,
	Mail,
	MessageCircle,
	MessageSquare,
	MousePointerClick,
	Play,
	Radio,
	Repeat,
	ShoppingBag,
	Sparkles,
	ThumbsUp,
	UserPlus,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Callout, Chip, Panel, Stat, Switch } from "~/components/post/kit";

/* A window chrome keeps the hero in the same family as the site's desktop
   surfaces, without borrowing the interactive Window (no document writes). */
function Frame({
	title,
	footer,
	children,
}: {
	title: string;
	footer?: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="not-prose my-6 overflow-hidden border border-border bg-base">
			<div className="flex items-center gap-2 rounded-none border-b border-border bg-mantle/70 px-3 py-2">
				<span className="flex shrink-0 items-center gap-1.5" aria-hidden>
					<span className="size-2.5 bg-[var(--traffic-red)]" />
					<span className="size-2.5 bg-[var(--traffic-yellow)]" />
					<span className="size-2.5 bg-[var(--traffic-green)]" />
				</span>
				<span className="min-w-0 flex-1 truncate text-center  text-[11px] tracking-wide text-overlay1">
					{title}
				</span>
				<span className="w-[2.625rem] shrink-0" aria-hidden />
			</div>
			<div className="p-3 sm:p-4">{children}</div>
			{footer ? (
				<div className="rounded-none border-t border-border/70 px-3 py-2  text-[11px] text-overlay1">
					{footer}
				</div>
			) : null}
		</div>
	);
}

/* --- the reward loop ------------------------------------------------------ */

const LOOP_STEPS = [
	{
		label: "trigger",
		caption:
			"A badge, a buzz, a quiet minute. Something in the day says: check.",
		icon: <Bell className="size-3" aria-hidden />,
	},
	{
		label: "action",
		caption:
			"Opening the app costs one thumb movement. That is the whole barrier.",
		icon: <MousePointerClick className="size-3" aria-hidden />,
	},
	{
		label: "reward",
		caption:
			"The payoff changes each time. Unpredictable lands harder than certain.",
		icon: <Gift className="size-3" aria-hidden />,
	},
	{
		label: "invest",
		caption: "Every post, reply and scroll adds one more reason to come back.",
		icon: <Repeat className="size-3" aria-hidden />,
	},
];

export function RewardLoop() {
	return (
		<Frame
			title="reward-loop.app"
			footer="a sketch of the loop, not a measurement"
		>
			<ol className="space-y-2" style={{ listStyle: "none", paddingLeft: 0 }}>
				{LOOP_STEPS.map((item) => (
					<li
						key={item.label}
						className="flex items-start gap-2 text-[11px] leading-relaxed"
					>
						<span className="mt-0.5 text-accent">{item.icon}</span>
						<span className="min-w-0 text-subtext0">
							<span className="text-accent">{item.label}</span> {item.caption}
						</span>
					</li>
				))}
			</ol>
		</Frame>
	);
}

/* --- the slot machine ---------------------------------------------------- */

const REEL_ICONS = [
	<Heart className="size-5" aria-hidden />,
	<MessageCircle className="size-5" aria-hidden />,
	<UserPlus className="size-5" aria-hidden />,
	<ThumbsUp className="size-5" aria-hidden />,
];

const REEL_COLORS = [
	"var(--pink)",
	"var(--blue)",
	"var(--green)",
	"var(--peach)",
];

export function SlotMachine() {
	const reduced = useReducedMotion();
	const [reels, setReels] = useState([1, 3, 0]);
	const [spinning, setSpinning] = useState(false);
	const [spin, setSpin] = useState(0);
	const [pulls, setPulls] = useState(0);
	const [hits, setHits] = useState(0);
	const [outcome, setOutcome] = useState<"idle" | "hit" | "miss">("idle");
	const timer = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timer.current !== null) window.clearTimeout(timer.current);
		};
	}, []);

	const pull = () => {
		if (spinning) return;
		setSpinning(true);
		setOutcome("idle");
		setPulls((count) => count + 1);
		setSpin((count) => count + 1);

		const landed = Math.random() < 0.25;
		timer.current = window.setTimeout(() => {
			const first = Math.floor(Math.random() * REEL_ICONS.length);
			if (landed) {
				setReels([first, first, first]);
				setHits((count) => count + 1);
				setOutcome("hit");
			} else {
				let second = Math.floor(Math.random() * REEL_ICONS.length);
				if (second === first) second = (first + 1) % REEL_ICONS.length;
				setReels([first, first, second]);
				setOutcome("miss");
			}
			setSpinning(false);
		}, 620);
	};

	const status = spinning
		? "spinning"
		: outcome === "hit"
			? "three of a kind. something landed."
			: outcome === "miss"
				? "two out of three. so close."
				: "pull the lever.";

	return (
		<Panel
			title="slot-machine.app"
			icon={<Dices className="size-3.5" />}
			footer="odds fixed at 1 in 4. every miss is a near miss on purpose. nothing leaves this page."
		>
			<div className="flex items-center justify-between gap-2">
				<motion.div
					className="flex items-center gap-1.5"
					animate={reduced ? undefined : { y: outcome === "hit" ? -3 : 0 }}
					transition={{ type: "spring", stiffness: 420, damping: 14 }}
				>
					{reels.map((value, index) => (
						<div
							key={index}
							className="relative size-11 overflow-hidden border bg-crust/70"
							style={{
								borderColor:
									outcome === "hit"
										? "color-mix(in srgb, var(--accent-surface) 60%, transparent)"
										: "var(--color-border)",
							}}
						>
							<AnimatePresence initial={false}>
								<motion.span
									key={`${spin}-${value}`}
									className="absolute inset-0 grid place-items-center"
									initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
									transition={{ type: "spring", stiffness: 320, damping: 26 }}
								>
									<span style={{ color: REEL_COLORS[value] }}>
										{REEL_ICONS[value]}
									</span>
								</motion.span>
							</AnimatePresence>
						</div>
					))}
				</motion.div>

				<button
					type="button"
					onClick={pull}
					disabled={spinning}
					aria-label="Pull the lever"
					className="group grid h-16 w-10 place-items-end justify-center border border-border bg-surface0/40 pb-1 transition-colors hover:border-accent/50 disabled:opacity-60"
				>
					<motion.span
						className="flex flex-col items-center"
						style={{ transformOrigin: "bottom center" }}
						animate={reduced ? undefined : { rotate: spinning ? 24 : 0 }}
						transition={{ type: "spring", stiffness: 320, damping: 16 }}
					>
						<span className="size-3 bg-accent" />
						<span className="h-9 w-1 bg-surface2 group-hover:bg-overlay0" />
					</motion.span>
				</button>
			</div>

			<div
				className="mt-3 flex min-h-[1.25rem] items-center  text-[11px]"
				aria-live="polite"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={`${spin}-${outcome}`}
						initial={reduced ? false : { opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -4 }}
						transition={{ duration: 0.16 }}
						className={outcome === "hit" ? "text-accent" : "text-overlay1"}
					>
						{status}
					</motion.span>
				</AnimatePresence>
			</div>

			<div className="mt-3 grid grid-cols-2 gap-2">
				<Stat label="pulls" value={pulls} hint="this session" />
				<Stat label="hits" value={hits} hint="1 in 4, by design" />
			</div>

			<Callout kind="info">
				A toy, not a measurement. The payoff is unpredictable on purpose. A real
				feed sets its own odds and never shows you the table.
			</Callout>
		</Panel>
	);
}

/* --- the minimal phone --------------------------------------------------- */

const FULL_APPS = [
	{ name: "feed", icon: <Compass className="size-4" aria-hidden /> },
	{ name: "reels", icon: <Film className="size-4" aria-hidden /> },
	{ name: "shorts", icon: <Play className="size-4" aria-hidden /> },
	{ name: "likes", icon: <Heart className="size-4" aria-hidden /> },
	{ name: "dms", icon: <MessageCircle className="size-4" aria-hidden /> },
	{ name: "alerts", icon: <Bell className="size-4" aria-hidden /> },
	{ name: "shop", icon: <ShoppingBag className="size-4" aria-hidden /> },
	{ name: "games", icon: <Gamepad2 className="size-4" aria-hidden /> },
	{ name: "camera", icon: <Camera className="size-4" aria-hidden /> },
	{ name: "photos", icon: <ImageIcon className="size-4" aria-hidden /> },
	{ name: "stories", icon: <Radio className="size-4" aria-hidden /> },
	{ name: "explore", icon: <Sparkles className="size-4" aria-hidden /> },
];

const MINIMAL_APPS = [
	{ name: "browser", icon: <Globe className="size-4" aria-hidden /> },
	{ name: "flip cards", icon: <Layers className="size-4" aria-hidden /> },
	{ name: "messages", icon: <MessageSquare className="size-4" aria-hidden /> },
	{ name: "e-mail", icon: <Mail className="size-4" aria-hidden /> },
	{ name: "calendar", icon: <Calendar className="size-4" aria-hidden /> },
];

export function MinimalPhone() {
	const reduced = useReducedMotion();

	return (
		<Switch
			on="minimal phone"
			off="everything installed"
			label="phone apps"
			initial
		>
			{(minimal) => {
				const apps = minimal ? MINIMAL_APPS : FULL_APPS;
				return (
					<div className="space-y-3">
						<div className="mx-auto w-full max-w-[13rem] border border-border bg-crust p-2">
							<div
								className="mx-auto mb-1.5 h-1 w-10 bg-surface1"
								aria-hidden
							/>
							<div className=" border border-border/60 bg-base/80 p-2">
								<div className="mb-2 flex items-center justify-between  text-[8px] text-overlay1">
									<span>9:41</span>
									<span className="flex items-center gap-1">
										<BatteryCharging className="size-2.5" aria-hidden />
										{minimal ? "quiet" : "busy"}
									</span>
								</div>
								<div className="grid grid-cols-3 gap-1.5">
									<AnimatePresence initial={false} mode="popLayout">
										{apps.map((app) => (
											<motion.div
												key={app.name}
												layout={!reduced}
												initial={reduced ? false : { opacity: 0, scale: 0.7 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={
													reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }
												}
												transition={{
													type: "spring",
													stiffness: 420,
													damping: 32,
												}}
												className="flex flex-col items-center gap-1 border border-border/60 bg-surface0/20 px-1 py-1.5"
											>
												<span
													style={{
														color: minimal
															? "var(--accent-surface)"
															: "var(--overlay1)",
													}}
												>
													{app.icon}
												</span>
												<span className="max-w-full truncate  text-[8px] text-overlay1">
													{app.name}
												</span>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</div>
							<div className="mx-auto mt-1.5 h-1 w-8 bg-surface1" aria-hidden />
						</div>

						<div className="flex flex-wrap items-center justify-center gap-1.5">
							<Chip accent={minimal ? "var(--green)" : "var(--red)"}>
								{apps.length} apps
							</Chip>
							<Chip accent="var(--overlay1)">
								{minimal ? "one screen" : "pages of them"}
							</Chip>
						</div>
					</div>
				);
			}}
		</Switch>
	);
}
