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
	Info,
	Layers,
	Mail,
	MessageCircle,
	MessageSquare,
	MousePointerClick,
	Play,
	Radio,
	Repeat,
	ShoppingBag,
	Smartphone,
	Sparkles,
	ThumbsUp,
	UserPlus,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
	Callout,
	Chip,
	Panel,
	Range,
	Stat,
	Switch,
} from "~/components/post/kit";
import type { PostExperience } from "~/lib/experiences";
import { slugify } from "~/lib/markdown";

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
		<div className="not-prose my-6 overflow-hidden rounded-panel border border-border bg-base">
			<div className="flex items-center gap-2 border-b border-border bg-mantle/70 px-3 py-2">
				<span className="flex shrink-0 items-center gap-1.5" aria-hidden>
					<span className="size-2.5 rounded-full bg-[var(--traffic-red)]" />
					<span className="size-2.5 rounded-full bg-[var(--traffic-yellow)]" />
					<span className="size-2.5 rounded-full bg-[var(--traffic-green)]" />
				</span>
				<span className="min-w-0 flex-1 truncate text-center  text-[10px] tracking-wide text-overlay1">
					{title}
				</span>
				<span className="w-[2.625rem] shrink-0" aria-hidden />
			</div>
			<div className="p-3 sm:p-4">{children}</div>
			{footer ? (
				<div className="border-t border-border/70 px-3 py-2  text-[10px] text-overlay1">
					{footer}
				</div>
			) : null}
		</div>
	);
}

/* --- the reward loop ------------------------------------------------------ */

const RING_RADIUS = 42;

function ringPoint(radius: number, degrees: number): [number, number] {
	const radians = (degrees * Math.PI) / 180;
	return [50 + radius * Math.cos(radians), 50 + radius * Math.sin(radians)];
}

function arcPath(from: number, to: number) {
	const [x1, y1] = ringPoint(RING_RADIUS, from);
	const [x2, y2] = ringPoint(RING_RADIUS, to);
	return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${RING_RADIUS} ${RING_RADIUS} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

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

const LOOP_ANGLES = [225, 315, 45, 135];
const LOOP_ARCS = LOOP_ANGLES.map((angle) => arcPath(angle + 14, angle + 76));
const LOOP_SLOT = [
	"col-start-1 row-start-1",
	"col-start-3 row-start-1",
	"col-start-3 row-start-3",
	"col-start-1 row-start-3",
];

function RewardLoop() {
	const reduced = useReducedMotion();
	const [active, setActive] = useState(0);
	const step = LOOP_STEPS[active];

	return (
		<Frame
			title="reward-loop.app"
			footer="a sketch of the loop, not a measurement"
		>
			<div className="relative mx-auto w-full max-w-[16rem]">
				<svg
					viewBox="0 0 100 100"
					className="absolute inset-0 size-full"
					aria-hidden
				>
					<circle
						cx="50"
						cy="50"
						r={RING_RADIUS}
						fill="none"
						stroke="var(--surface1)"
						strokeWidth="0.5"
						strokeDasharray="1.2 2.6"
					/>
					{LOOP_ARCS.map((path, index) => (
						<motion.path
							key={path}
							d={path}
							fill="none"
							stroke={index === active ? "var(--mauve)" : "var(--surface2)"}
							strokeWidth="0.9"
							strokeLinecap="round"
							initial={reduced ? false : { pathLength: 0, opacity: 0 }}
							whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: 0.1 + index * 0.12,
								ease: "easeInOut",
							}}
						/>
					))}
				</svg>

				<motion.div
					className="pointer-events-none absolute inset-0"
					style={{ transformOrigin: "50% 50%" }}
					animate={reduced ? undefined : { rotate: 360 }}
					transition={
						reduced
							? undefined
							: { duration: 18, ease: "linear", repeat: Infinity }
					}
					aria-hidden
				>
					<span
						className="absolute left-1/2 top-[8%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mauve"
						style={{ boxShadow: "0 0 10px var(--mauve)" }}
					/>
				</motion.div>

				<div className="relative grid aspect-square w-full grid-cols-3 grid-rows-3 place-items-center">
					<div className="col-start-2 row-start-2 flex flex-col items-center gap-1">
						<Chip>the loop</Chip>
						<span className="text-[9px] text-overlay0">click a node</span>
					</div>

					{LOOP_STEPS.map((item, index) => {
						const selected = index === active;
						return (
							<button
								key={item.label}
								type="button"
								onClick={() => setActive(index)}
								aria-pressed={selected}
								className={
									"relative inline-flex items-center gap-1 rounded-full border px-2 py-0.5  text-[10px] transition-colors " +
									LOOP_SLOT[index] +
									(selected
										? " border-transparent text-crust"
										: " border-border text-subtext0 hover:border-mauve/50 hover:text-text")
								}
							>
								{selected ? (
									<motion.span
										layoutId="loop-node"
										className="absolute inset-0 -z-10 rounded-full bg-mauve"
										transition={
											reduced
												? { duration: 0 }
												: { type: "spring", stiffness: 380, damping: 30 }
										}
									/>
								) : null}
								{item.icon}
								{item.label}
							</button>
						);
					})}
				</div>
			</div>

			<AnimatePresence mode="wait" initial={false}>
				<motion.p
					key={step.label}
					initial={reduced ? false : { opacity: 0, y: 4 }}
					animate={{ opacity: 1, y: 0 }}
					exit={reduced ? undefined : { opacity: 0, y: -4 }}
					transition={{ duration: 0.18 }}
					className="mt-3 min-h-[2.5rem] text-center  text-[11px] leading-relaxed text-subtext0"
				>
					<span className="text-mauve">{step.label}</span> {step.caption}
				</motion.p>
			</AnimatePresence>
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

function SlotMachine() {
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
			footer="a demo, not a measurement · odds fixed at 1 in 4 · nothing leaves this page"
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
							className="relative size-11 overflow-hidden rounded-lg border bg-crust/70"
							style={{
								borderColor:
									outcome === "hit"
										? "color-mix(in srgb, var(--mauve) 60%, transparent)"
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
					className="group grid h-16 w-10 place-items-end justify-center rounded-panel border border-border bg-surface0/40 pb-1 transition-colors hover:border-mauve/50 disabled:opacity-60"
				>
					<motion.span
						className="flex flex-col items-center"
						style={{ transformOrigin: "bottom center" }}
						animate={reduced ? undefined : { rotate: spinning ? 24 : 0 }}
						transition={{ type: "spring", stiffness: 320, damping: 16 }}
					>
						<span className="size-3 rounded-full bg-mauve shadow-[0_0_10px_var(--mauve)]" />
						<span className="h-9 w-1 rounded-full bg-surface2 group-hover:bg-overlay0" />
					</motion.span>
				</button>
			</div>

			<div className="mt-3 flex min-h-[1.25rem] items-center  text-[11px]">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={`${spin}-${outcome}`}
						initial={reduced ? false : { opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? undefined : { opacity: 0, y: -4 }}
						transition={{ duration: 0.16 }}
						className={outcome === "hit" ? "text-mauve" : "text-overlay1"}
					>
						{status}
					</motion.span>
				</AnimatePresence>
				<span className="sr-only" aria-live="polite">
					{status}
				</span>
			</div>

			<div className="mt-3 grid grid-cols-2 gap-2">
				<Stat label="pulls" value={pulls} hint="this session" />
				<Stat label="hits" value={hits} hint="1 in 4, by design" />
			</div>

			<Callout icon={<Info className="size-3.5" />}>
				A toy, not a measurement. The payoff is unpredictable on purpose. A real
				feed sets its own odds and never shows you the table.
			</Callout>
		</Panel>
	);
}

/* --- one day, 24 hours --------------------------------------------------- */

const DAY_CIRCUMFERENCE = 2 * Math.PI * 40;
const DAY_DASH = `${DAY_CIRCUMFERENCE} ${DAY_CIRCUMFERENCE}`;

const DAY_TICKS = Array.from({ length: 24 }, (_, index) => {
	const angle = index * 15 - 90;
	const [x1, y1] = ringPoint(41, angle);
	const [x2, y2] = ringPoint(index % 6 === 0 ? 48 : 45.5, angle);
	return { key: index, x1, y1, x2, y2, major: index % 6 === 0 };
});

function formatHours(value: number) {
	const whole = Math.floor(value);
	const minutes = Math.round((value - whole) * 60);
	return minutes === 0 ? `${whole}h` : `${whole}h ${minutes}m`;
}

function DayInPhone() {
	const reduced = useReducedMotion();
	const [hours, setHours] = useState(6);
	const left = 24 - hours;
	const accent = hours >= 8 ? "var(--peach)" : "var(--mauve)";
	const offset = DAY_CIRCUMFERENCE * (1 - hours / 24);

	return (
		<Panel
			title="one day, 24 hours"
			icon={<Smartphone className="size-3.5" />}
			footer="illustrative: phone time as one block, sleep counted inside the hours that are left"
		>
			<div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
				<div className="relative aspect-square w-full max-w-[11rem] shrink-0">
					<svg viewBox="0 0 100 100" className="size-full" aria-hidden>
						<circle
							cx="50"
							cy="50"
							r="40"
							fill="none"
							stroke="var(--surface0)"
							strokeWidth="6"
						/>
						<g transform="rotate(-90 50 50)">
							<motion.circle
								cx="50"
								cy="50"
								r="40"
								fill="none"
								stroke={accent}
								strokeWidth="6"
								strokeLinecap="round"
								strokeDasharray={DAY_DASH}
								initial={false}
								animate={{ strokeDashoffset: offset }}
								transition={
									reduced
										? { duration: 0 }
										: { type: "spring", stiffness: 140, damping: 24 }
								}
							/>
						</g>
						{DAY_TICKS.map((tick) => (
							<line
								key={tick.key}
								x1={tick.x1}
								y1={tick.y1}
								x2={tick.x2}
								y2={tick.y2}
								stroke={tick.major ? "var(--overlay0)" : "var(--surface1)"}
								strokeWidth={tick.major ? 0.7 : 0.4}
								strokeLinecap="round"
							/>
						))}
					</svg>
					<div className="pointer-events-none absolute inset-0 grid place-items-center">
						<div className="text-center">
							<div className="text-lg tabular-nums leading-none text-text">
								{left}h
							</div>
							<div className="mt-1  text-[9px] uppercase tracking-[0.1em] text-overlay1">
								left in the day
							</div>
						</div>
					</div>
				</div>

				<div className="w-full min-w-0 space-y-3">
					<Range
						value={hours}
						onChange={setHours}
						min={0}
						max={16}
						step={0.5}
						label="hours on the phone"
						accent={accent}
					/>
					<div className="grid grid-cols-2 gap-2">
						<Stat label="on the phone" value={formatHours(hours)} />
						<Stat label="elsewhere" value={formatHours(left)} />
					</div>
					<p className="text-[10px] leading-relaxed text-overlay1">
						Drag the slider. The ring starts at midnight and fills clockwise.
					</p>
				</div>
			</div>
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

function MinimalPhone() {
	const reduced = useReducedMotion();

	return (
		<Switch on="minimal phone" off="everything installed" initial={false}>
			{(minimal) => {
				const apps = minimal ? MINIMAL_APPS : FULL_APPS;
				return (
					<div className="space-y-3">
						<div className="mx-auto w-full max-w-[13rem] rounded-[1.75rem] border border-border bg-crust p-2">
							<div
								className="mx-auto mb-1.5 h-1 w-10 rounded-full bg-surface1"
								aria-hidden
							/>
							<div className="rounded-[1.35rem] border border-border/60 bg-base/80 p-2">
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
												className="flex flex-col items-center gap-1 rounded-md border border-border/60 bg-surface0/40 px-1 py-1.5"
											>
												<span
													style={{
														color: minimal ? "var(--mauve)" : "var(--overlay1)",
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
							<div
								className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-surface1"
								aria-hidden
							/>
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

const experience: PostExperience = {
	hero: RewardLoop,
	visuals: {
		[slugify("But Why Is Social Media So Addictive?")]: SlotMachine,
		[slugify("Personal Opinion: Wasted Time")]: DayInPhone,
		[slugify("But What Can I Do About It?")]: MinimalPhone,
	},
};

export default experience;
