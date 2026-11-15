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
		<div
			className={cn(
				"not-prose my-5 overflow-hidden rounded-panel border border-border bg-mantle/70",
				className,
			)}
		>
			{title ? (
				<div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
					<span className="text-post-accent">{icon}</span>
					<span className="text-[11px] uppercase tracking-[0.14em] text-overlay1">
						{title}
					</span>
				</div>
			) : null}
			<div className="p-3 sm:p-4">{children}</div>
			{footer ? (
				<div className="border-t border-border/70 px-3 py-2  text-[10px] text-overlay1">
					{footer}
				</div>
			) : null}
		</div>
	);
}

export function Chip({
	children,
	accent = "var(--mauve)",
	className,
}: {
	children: React.ReactNode;
	accent?: string;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full border px-2 py-0.5  text-[10px] leading-relaxed",
				className,
			)}
			style={{
				borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
				background: `color-mix(in srgb, ${accent} 12%, transparent)`,
				color: accent,
			}}
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
		<div className="not-prose rounded-panel border border-border/70 bg-surface0/30 px-3 py-2">
			<div className="text-[10px] uppercase tracking-[0.12em] text-overlay1">
				{label}
			</div>
			<div className="mt-0.5  text-sm text-text">{value}</div>
			{hint ? (
				<div className="mt-0.5  text-[10px] text-overlay0">{hint}</div>
			) : null}
		</div>
	);
}

export function Meter({
	value,
	max = 100,
	label,
	accent = "var(--mauve)",
	suffix = "",
}: {
	value: number;
	max?: number;
	label?: string;
	accent?: string;
	suffix?: string;
}) {
	const ratio = Math.max(0, Math.min(1, value / max));
	return (
		<div className="not-prose space-y-1.5">
			{label ? (
				<div className="flex items-baseline justify-between  text-[11px]">
					<span className="text-subtext0">{label}</span>
					<span className="tabular-nums text-overlay0">
						{value}
						{suffix}
					</span>
				</div>
			) : null}
			<div className="h-1.5 overflow-hidden rounded-full bg-surface0">
				<motion.div
					className="h-full rounded-full"
					style={{ background: accent }}
					initial={{ width: 0 }}
					whileInView={{ width: `${ratio * 100}%` }}
					viewport={{ once: true }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
				/>
			</div>
		</div>
	);
}

export function Bars({
	data,
	accent = "var(--mauve)",
	max,
	format = (value: number) => String(value),
}: {
	data: { label: string; value: number }[];
	accent?: string;
	max?: number;
	format?: (value: number) => string;
}) {
	const ceiling = max ?? Math.max(...data.map((entry) => entry.value), 1);
	return (
		<div className="not-prose space-y-2.5">
			{data.map((entry, index) => (
				<div
					key={entry.label}
					className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-3"
				>
					<span className="truncate  text-[11px] text-subtext0">
						{entry.label}
					</span>
					<div className="h-2 overflow-hidden rounded-full bg-surface0/70">
						<motion.div
							className="h-full rounded-full"
							style={{ background: accent, opacity: 1 - index * 0.1 }}
							initial={{ width: 0 }}
							whileInView={{ width: `${(entry.value / ceiling) * 100}%` }}
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

export function Timeline({
	steps,
	accent = "var(--mauve)",
}: {
	steps: { title: string; body?: React.ReactNode }[];
	accent?: string;
}) {
	return (
		<ol className="not-prose relative space-y-4 border-l border-border pl-5">
			{steps.map((step, index) => (
				<motion.li
					key={step.title}
					className="relative"
					initial={{ opacity: 0, x: -8 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 0.4, delay: index * 0.07 }}
				>
					<span
						className="absolute -left-[1.42rem] top-1.5 size-2 rounded-full ring-4 ring-base"
						style={{ background: accent }}
					/>
					<div className="text-xs text-text">{step.title}</div>
					{step.body ? (
						<div className="mt-0.5  text-[11px] leading-relaxed text-overlay1">
							{step.body}
						</div>
					) : null}
				</motion.li>
			))}
		</ol>
	);
}

export function Tabs({
	tabs,
	accent = "var(--mauve)",
}: {
	tabs: { id: string; label: string; content: React.ReactNode }[];
	accent?: string;
}) {
	const [active, setActive] = useState(tabs[0]?.id);
	const id = useId();
	const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

	return (
		<div className="not-prose my-5 rounded-panel border border-border bg-mantle/60">
			<div
				role="tablist"
				aria-label="Sections"
				className="flex flex-wrap gap-1 border-b border-border/70 p-1.5"
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						id={`${id}-${tab.id}`}
						aria-selected={tab.id === current?.id}
						aria-controls={`${id}-${tab.id}-panel`}
						onClick={() => setActive(tab.id)}
						className={cn(
							"relative rounded-md px-2.5 py-1  text-[11px] transition-colors",
							tab.id === current?.id
								? "text-base"
								: "text-overlay1 hover:bg-surface0/60 hover:text-text",
						)}
					>
						{tab.id === current?.id ? (
							<motion.span
								layoutId={`${id}-tab`}
								className="absolute inset-0 -z-10 rounded-md"
								style={{ background: accent }}
								transition={{ type: "spring", stiffness: 380, damping: 30 }}
							/>
						) : null}
						{tab.label}
					</button>
				))}
			</div>
			<div className="p-3 sm:p-4  text-xs text-subtext0">
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={current?.id}
						id={`${id}-${current?.id}-panel`}
						role="tabpanel"
						aria-labelledby={`${id}-${current?.id}`}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.18 }}
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
	children,
	accent = "var(--mauve)",
	initial = false,
}: {
	on: string;
	off: string;
	children: (state: boolean) => React.ReactNode;
	accent?: string;
	initial?: boolean;
}) {
	const [state, setState] = useState(initial);
	return (
		<div className="not-prose my-5 overflow-hidden rounded-panel border border-border bg-mantle/60">
			<div className="flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2">
				<span className="text-[10px] uppercase tracking-[0.14em] text-overlay1">
					{state ? on : off}
				</span>
				<button
					type="button"
					role="switch"
					aria-checked={state}
					aria-label={`Toggle ${on}`}
					onClick={() => setState(!state)}
					className="relative h-5 w-9 rounded-full bg-surface1 transition-colors"
					style={state ? { background: accent } : undefined}
				>
					<motion.span
						layout
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className={cn(
							"absolute top-0.5 size-4 rounded-full bg-base shadow",
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
	accent = "var(--mauve)",
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
				className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-offset-4"
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
	accent = "var(--mauve)",
}: {
	children: React.ReactNode;
	icon?: React.ReactNode;
	accent?: string;
}) {
	return (
		<div
			className="not-prose my-5 flex gap-3 rounded-panel border border-l-2 p-3  text-xs leading-relaxed text-subtext0"
			style={{
				borderColor: "var(--color-border)",
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
	accent = "var(--mauve)",
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
		<figure className="not-prose my-5 space-y-1.5">
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
				<figcaption className="text-[10px] text-overlay1">{label}</figcaption>
			) : null}
		</figure>
	);
}
