import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { cn } from "~/lib/utils";

/* Shared vocabulary for the per-post interactive figures. Everything here is
   presentational: no routing, no data loading, so a post can drop a figure in
   anywhere the article renders. */

export function Panel({
	title,
	icon,
	children,
	className,
	footer,
}: {
	title?: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	footer?: React.ReactNode;
}) {
	return (
		<div className={cn("not-prose my-8 overflow-hidden nb-well", className)}>
			{title ? (
				<div className="flex items-center gap-2 nb-line-b kit-titlebar px-3 py-2">
					<span className="text-accent">{icon}</span>
					<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
						{title}
					</span>
				</div>
			) : null}
			<div className="p-3 sm:p-4">{children}</div>
			{footer ? (
				<div className="nb-line-t px-3 py-2 text-[11px] text-overlay1">
					{footer}
				</div>
			) : null}
		</div>
	);
}

export function Chip({
	children,
	accent = "var(--accent-surface)",
	className,
}: {
	children: React.ReactNode;
	accent?: string;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 nb-line px-2 py-0.5 text-[11px] font-bold leading-relaxed text-on-accent nb-shadow-sm",
				className,
			)}
			style={{ background: accent }}
		>
			{children}
		</span>
	);
}

export function Stat({
	label,
	value,
	hint,
}: {
	label: string;
	value: React.ReactNode;
	hint?: string;
}) {
	return (
		<div className="not-prose nb-line nb-shadow-sm nb-fill px-3 py-2">
			<div className="text-[11px] uppercase tracking-[0.12em] text-overlay1">
				{label}
			</div>
			<div className="mt-0.5  text-sm text-text">{value}</div>
			{hint ? (
				<div className="mt-0.5 text-[11px] text-overlay1">{hint}</div>
			) : null}
		</div>
	);
}

export function Bars({
	data,
	accent = "var(--accent-surface)",
	max,
	format = (value: number) => String(value),
}: {
	data: { label: string; value: number }[];
	accent?: string;
	max?: number;
	format?: (value: number) => string;
}) {
	const reduced = useReducedMotion();
	const ceiling = max ?? Math.max(...data.map((entry) => entry.value), 1);
	return (
		<div className="not-prose space-y-2.5">
			{data.map((entry, index) => (
				<div
					key={entry.label}
					className="grid grid-cols-[minmax(0,6rem)_1fr_auto] items-center gap-2 sm:grid-cols-[7.5rem_1fr_auto] sm:gap-3"
				>
					<span className="truncate  text-[11px] text-subtext0">
						{entry.label}
					</span>
					<div className="h-3 overflow-hidden nb-line bg-surface0">
						<motion.div
							className="h-full"
							style={{
								background: accent,
								opacity: 1 - index * 0.1,
								width: reduced
									? `${(entry.value / ceiling) * 100}%`
									: undefined,
							}}
							initial={reduced ? false : { width: 0 }}
							whileInView={
								reduced
									? undefined
									: { width: `${(entry.value / ceiling) * 100}%` }
							}
							viewport={{ once: true }}
							transition={{
								duration: 0.8,
								delay: index * 0.06,
								ease: [0.22, 1, 0.36, 1],
							}}
						/>
					</div>
					<span className="text-[11px] tabular-nums text-overlay1">
						{format(entry.value)}
					</span>
				</div>
			))}
		</div>
	);
}

export function Tabs({
	tabs,
	label = "Tabs",
	accent = "var(--accent-surface)",
}: {
	tabs: { id: string; label: string; content: React.ReactNode }[];
	label?: string;
	accent?: string;
}) {
	const reduced = useReducedMotion();
	const [active, setActive] = useState(tabs[0]?.id);
	const id = useId();
	const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

	const select = (index: number) => {
		const tab = tabs[(index + tabs.length) % tabs.length];
		if (!tab) return;
		setActive(tab.id);
		document.getElementById(`${id}-${tab.id}`)?.focus();
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		const index = tabs.findIndex((tab) => tab.id === current?.id);
		if (event.key === "ArrowRight") {
			event.preventDefault();
			select(index + 1);
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			select(index - 1);
		} else if (event.key === "Home") {
			event.preventDefault();
			select(0);
		} else if (event.key === "End") {
			event.preventDefault();
			select(tabs.length - 1);
		}
	};

	return (
		<div className="not-prose my-6 nb-well">
			<div
				role="tablist"
				aria-label={label}
				className="flex flex-wrap gap-1 nb-line-b p-1.5"
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						id={`${id}-${tab.id}`}
						aria-selected={tab.id === current?.id}
						aria-controls={`${id}-panel`}
						tabIndex={tab.id === current?.id ? 0 : -1}
						onKeyDown={onKeyDown}
						onClick={() => setActive(tab.id)}
						className={cn(
							"relative isolate px-2.5 py-1.5 text-[11px] transition-colors",
							tab.id === current?.id
								? "text-on-accent"
								: "text-overlay1 hover:bg-surface0/60 hover:text-text",
						)}
					>
						{tab.id === current?.id ? (
							<motion.span
								layoutId={`${id}-tab`}
								className="absolute inset-0 -z-10 nb-line"
								style={{ background: accent }}
								transition={
									reduced
										? { duration: 0 }
										: { type: "spring", stiffness: 380, damping: 30 }
								}
							/>
						) : null}
						{tab.label}
					</button>
				))}
			</div>
			<div
				id={`${id}-panel`}
				role="tabpanel"
				aria-labelledby={`${id}-${current?.id}`}
				className="p-3 text-xs text-subtext0 sm:p-4"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={current?.id}
						initial={reduced ? false : { opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
						transition={{ duration: reduced ? 0 : 0.18 }}
					>
						{current?.content}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

export function Switch({
	on,
	off,
	label,
	children,
	accent = "var(--accent-surface)",
	initial = false,
}: {
	on: string;
	off: string;
	label?: string;
	children: (state: boolean) => React.ReactNode;
	accent?: string;
	initial?: boolean;
}) {
	const reduced = useReducedMotion();
	const [state, setState] = useState(initial);
	return (
		<div className="not-prose my-6 overflow-hidden nb-well">
			<div className="flex items-center justify-between gap-3 nb-line-b px-3 py-2">
				<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
					{state ? on : off}
				</span>
				<button
					type="button"
					role="switch"
					aria-checked={state}
					aria-label={`Toggle ${label ?? on}`}
					onClick={() => setState(!state)}
					className="relative h-6 w-11 shrink-0 nb-line bg-surface2 transition-colors"
					style={state ? { background: accent } : undefined}
				>
					<motion.span
						layout
						transition={
							reduced
								? { duration: 0 }
								: { type: "spring", stiffness: 500, damping: 30 }
						}
						className={cn(
							"absolute top-0.5 size-4 nb-line nb-fill",
							state ? "right-0.5" : "left-0.5",
						)}
					/>
				</button>
			</div>
			<div className="p-3 sm:p-4">{children(state)}</div>
		</div>
	);
}

export function Range({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	label,
	accent = "var(--accent-surface)",
}: {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	accent?: string;
}) {
	const percent = ((value - min) / (max - min)) * 100;
	return (
		<label className="not-prose block space-y-2">
			{label ? (
				<span className="flex items-baseline justify-between  text-[11px] text-subtext0">
					{label}
					<span className="tabular-nums text-overlay1">{value}</span>
				</span>
			) : null}
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				className="h-6 w-full cursor-pointer appearance-none nb-line outline-offset-4"
				style={{
					background: `linear-gradient(to right, ${accent} ${percent}%, var(--surface0) ${percent}%)`,
				}}
			/>
		</label>
	);
}

export function Callout({
	children,
	icon,
	accent = "var(--accent-surface)",
}: {
	children: React.ReactNode;
	icon?: React.ReactNode;
	accent?: string;
}) {
	return (
		<div
			className="not-prose my-6 flex gap-3 nb-callout p-3 text-xs leading-relaxed text-subtext0"
			style={{
				borderLeftColor: accent,
				background: `color-mix(in srgb, ${accent} 6%, transparent)`,
			}}
		>
			{icon ? (
				<span className="mt-0.5 shrink-0" style={{ color: accent }}>
					{icon}
				</span>
			) : null}
			<div>{children}</div>
		</div>
	);
}

export function Sparkline({
	points,
	accent = "var(--accent-surface)",
	height = 64,
	label,
}: {
	points: number[];
	accent?: string;
	height?: number;
	label?: string;
}) {
	const reduced = useReducedMotion();
	const max = Math.max(...points, 1);
	const min = Math.min(...points, 0);
	const range = max - min || 1;
	const width = 320;
	const path = points
		.map((point, index) => {
			const x = (index / Math.max(points.length - 1, 1)) * width;
			const y = height - ((point - min) / range) * (height - 8) - 4;
			return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(" ");

	return (
		<figure className="not-prose my-6 space-y-1.5">
			<svg
				viewBox={`0 0 ${width} ${height}`}
				className="w-full"
				role="img"
				aria-label={label ?? "trend"}
				preserveAspectRatio="none"
				style={{ height }}
			>
				<motion.path
					d={path}
					fill="none"
					stroke={accent}
					strokeWidth={2}
					strokeLinecap="round"
					initial={reduced ? undefined : { pathLength: 0 }}
					whileInView={reduced ? undefined : { pathLength: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1.2, ease: "easeInOut" }}
				/>
			</svg>
			{label ? (
				<figcaption className="text-[11px] text-overlay1">{label}</figcaption>
			) : null}
		</figure>
	);
}
