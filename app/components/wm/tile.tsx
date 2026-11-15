import { Maximize2, Minimize2, RotateCcw, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ScrollProgress } from "~/components/ui/scroll_progress";
import { cn } from "~/lib/utils";

type TileProps = {
	title: string;
	label?: string;
	accent?: string;
	children: React.ReactNode;
	aside?: React.ReactNode;
	className?: string;
	bodyClassName?: string;
	progress?: boolean;
	/** Tiles in a tiling WM can be folded and closed. Keep both possible. */
	closable?: boolean;
};

function Action({
	label,
	onClick,
	children,
}: {
	label: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			title={label}
			className="grid size-5 place-items-center rounded-[2px] text-overlay1 transition-colors hover:bg-surface0 hover:text-text"
		>
			{children}
		</button>
	);
}

/**
 * One tiled surface. Square corners, a hairline border that takes the tile's
 * accent on hover, and a title bar that names the pane like a window manager
 * would.
 */
export function Tile({
	title,
	label,
	accent,
	children,
	aside,
	className,
	bodyClassName,
	progress = false,
	closable = true,
}: TileProps) {
	const [state, setState] = useState<"open" | "folded" | "closed">("open");
	const [wide, setWide] = useState(false);
	const reduced = useReducedMotion();

	const toggleWide = () => {
		const next = !wide;
		setWide(next);
		document.documentElement.classList.toggle("tile-wide", next);
	};

	return (
		<motion.section
			layout={!reduced}
			initial={reduced ? false : { opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
			className={cn(
				"group/tile relative flex min-w-0 flex-col overflow-hidden rounded-window border border-border bg-base",
				"transition-colors hover:border-[color-mix(in_srgb,var(--post-accent)_45%,transparent)] focus-within:border-[color-mix(in_srgb,var(--post-accent)_55%,transparent)]",
				className,
			)}
			style={
				{ "--post-accent": accent ?? "var(--mauve)" } as React.CSSProperties
			}
		>
			<header className="relative flex items-center gap-2 border-b border-border bg-mantle px-2 py-1">
				<span
					aria-hidden="true"
					className="size-2 shrink-0 rounded-[1px] bg-post-accent"
				/>
				<span className="truncate text-[11px] leading-4 text-subtext0">
					{label ?? title}
				</span>

				<div className="ml-auto flex items-center gap-1.5">
					{aside ? (
						<span className="hidden text-[10px] text-overlay1 sm:inline">
							{aside}
						</span>
					) : null}
					<Action
						label="Fold tile"
						onClick={() => setState(state === "folded" ? "open" : "folded")}
					>
						<Minimize2 className="size-3" />
					</Action>
					<Action
						label={wide ? "Restore layout" : "Zoom tile"}
						onClick={toggleWide}
					>
						<Maximize2 className="size-3" />
					</Action>
					{closable ? (
						<Action
							label="Close tile"
							onClick={() => setState(state === "closed" ? "open" : "closed")}
						>
							<X className="size-3" />
						</Action>
					) : null}
				</div>

				{progress ? (
					<ScrollProgress className="absolute inset-x-0 bottom-0 h-[2px] bg-post-accent" />
				) : null}
			</header>

			<motion.div
				layout={!reduced}
				animate={{
					height: state === "folded" ? 0 : "auto",
					opacity: state === "closed" ? 0 : 1,
				}}
				transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
				className="min-w-0 flex-1 overflow-hidden"
			>
				<div className={cn("h-full", bodyClassName)}>{children}</div>
			</motion.div>

			{state === "closed" ? (
				<div className="flex flex-wrap items-center gap-2 border-t border-border/60 bg-mantle/40 px-3 py-2">
					<span className="text-[11px] text-overlay1">tile closed.</span>
					<button
						type="button"
						onClick={() => setState("open")}
						className="inline-flex items-center gap-1 rounded-[2px] border border-border px-2 py-0.5 text-[11px] text-subtext0 transition-colors hover:border-mauve/50 hover:text-mauve"
					>
						<RotateCcw className="size-3" />
						reopen {title}
					</button>
				</div>
			) : null}

			{state === "folded" ? (
				<button
					type="button"
					onClick={() => setState("open")}
					className="block w-full border-t border-border/60 px-2 py-1 text-left text-[10px] text-overlay1 transition-colors hover:text-mauve"
				>
					folded. click to restore
				</button>
			) : null}
		</motion.section>
	);
}
