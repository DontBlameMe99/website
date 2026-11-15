import { Maximize2, Minimize2, Pin, PinOff, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
	closable?: boolean;
};

type Mode = "tiled" | "floating" | "fullscreen";
type Box = { x: number; y: number; width: number; height: number };

const EDGE = 8;
const MIN_WIDTH = 260;
const MIN_HEIGHT = 160;

function clampBox(box: Box): Box {
	const maxX = Math.max(EDGE, window.innerWidth - box.width - EDGE);
	const maxY = Math.max(EDGE, window.innerHeight - box.height - EDGE);
	return {
		width: Math.min(
			Math.max(box.width, MIN_WIDTH),
			window.innerWidth - EDGE * 2,
		),
		height: Math.min(
			Math.max(box.height, MIN_HEIGHT),
			window.innerHeight - EDGE * 2,
		),
		x: Math.min(Math.max(box.x, EDGE), maxX),
		y: Math.min(Math.max(box.y, EDGE), maxY),
	};
}

function Control({
	label,
	onClick,
	active,
	children,
}: {
	label: string;
	onClick: () => void;
	active?: boolean;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			aria-pressed={active}
			title={label}
			className={cn(
				"grid size-6 place-items-center rounded-[2px] text-overlay1 transition-colors hover:bg-surface0 hover:text-text active:translate-y-px sm:size-5",
				active && "bg-surface0 text-text",
			)}
		>
			{children}
		</button>
	);
}

/**
 * One pane of the workspace. It tiles by default, can be detached and dragged
 * or resized by its corner, can fill the workspace, and can be closed and
 * reopened. Escape restores a detached or fullscreen pane.
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
	const [mode, setMode] = useState<Mode>("tiled");
	const [closed, setClosed] = useState(false);
	const [folded, setFolded] = useState(false);
	const [box, setBox] = useState<Box>({ x: 0, y: 0, width: 0, height: 0 });
	const [reserved, setReserved] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();

	const detach = useCallback(() => {
		const rect = sectionRef.current?.getBoundingClientRect();
		const fallback = { x: 40, y: 80, width: 720, height: 520 };
		setBox(
			clampBox(
				rect
					? {
							x: rect.left,
							y: rect.top,
							width: Math.max(rect.width, 520),
							height: Math.max(rect.height, 360),
						}
					: fallback,
			),
		);
		setReserved(rect?.height ?? 0);
		setMode("floating");
	}, []);

	const beginDrag = (event: React.PointerEvent) => {
		if (mode !== "floating") return;
		event.preventDefault();
		const start = { pointerX: event.clientX, pointerY: event.clientY, ...box };
		const target = event.currentTarget as HTMLElement;
		try {
			target.setPointerCapture(event.pointerId);
		} catch {
			// Synthetic pointers and some browsers refuse capture.
		}

		const move = (moveEvent: PointerEvent) => {
			setBox(
				clampBox({
					...box,
					x: box.x + (moveEvent.clientX - start.pointerX),
					y: box.y + (moveEvent.clientY - start.pointerY),
				}),
			);
		};
		const end = () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerup", end);
		};
		target.addEventListener("pointermove", move);
		target.addEventListener("pointerup", end);
	};

	const beginResize = (event: React.PointerEvent) => {
		event.preventDefault();
		event.stopPropagation();

		let origin = box;
		if (mode !== "floating") {
			const rect = sectionRef.current?.getBoundingClientRect();
			if (!rect) return;
			origin = clampBox({
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height,
			});
			setBox(origin);
			setMode("floating");
		}

		const start = {
			pointerX: event.clientX,
			pointerY: event.clientY,
			...origin,
		};
		const target = event.currentTarget as HTMLElement;
		target.setPointerCapture(event.pointerId);

		const move = (moveEvent: PointerEvent) => {
			setBox(
				clampBox({
					x: origin.x,
					y: origin.y,
					width: Math.max(
						MIN_WIDTH,
						start.width + (moveEvent.clientX - start.pointerX),
					),
					height: Math.max(
						MIN_HEIGHT,
						start.height + (moveEvent.clientY - start.pointerY),
					),
				}),
			);
		};
		const end = () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerup", end);
		};
		target.addEventListener("pointermove", move);
		target.addEventListener("pointerup", end);
	};

	useEffect(() => {
		if (mode === "tiled") return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMode("tiled");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mode]);

	useEffect(() => {
		if (mode !== "floating") return;
		const onResize = () => setBox((current) => clampBox(current));
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [mode]);

	if (closed) {
		return (
			<div className="flex min-h-11 items-center justify-between gap-2 rounded-window border border-dashed border-border bg-mantle/40 px-2 py-1.5">
				<span className="text-[11px] text-overlay1">{title} closed</span>
				<button
					type="button"
					onClick={() => setClosed(false)}
					className="inline-flex items-center gap-1 rounded-[2px] px-1.5 py-0.5 text-[11px] text-subtext0 transition-colors hover:bg-surface0 hover:text-mauve"
				>
					<RotateCcw className="size-3" />
					reopen
				</button>
			</div>
		);
	}

	const chrome = (
		<>
			<header
				onPointerDown={mode === "floating" ? beginDrag : undefined}
				className={cn(
					"relative flex items-center gap-2 border-b border-border bg-mantle px-2 py-1",
					mode === "floating" && "cursor-grab active:cursor-grabbing",
				)}
			>
				<span
					aria-hidden="true"
					className="size-2 shrink-0 rounded-[1px] bg-post-accent"
				/>
				<button
					type="button"
					onClick={() => setFolded((value) => !value)}
					aria-expanded={!folded}
					aria-label={folded ? "Unfold pane" : "Fold pane"}
					title={folded ? "Unfold" : "Fold"}
					className="truncate text-left text-[11px] leading-4 text-subtext0 transition-colors hover:text-text"
				>
					{label ?? title}
				</button>

				<div className="ml-auto flex items-center gap-1">
					{aside ? (
						<span className="hidden text-[10px] text-overlay1 sm:inline">
							{aside}
						</span>
					) : null}
					<Control
						label={
							mode === "floating"
								? "Dock pane"
								: "Detach pane (resize and move)"
						}
						active={mode === "floating"}
						onClick={() => (mode === "floating" ? setMode("tiled") : detach())}
					>
						{mode === "floating" ? (
							<PinOff className="size-3" />
						) : (
							<Pin className="size-3" />
						)}
					</Control>
					<Control
						label={
							mode === "fullscreen" ? "Leave fullscreen" : "Fullscreen pane"
						}
						active={mode === "fullscreen"}
						onClick={() =>
							setMode(mode === "fullscreen" ? "tiled" : "fullscreen")
						}
					>
						{mode === "fullscreen" ? (
							<Minimize2 className="size-3" />
						) : (
							<Maximize2 className="size-3" />
						)}
					</Control>
					{closable ? (
						<Control label="Close pane" onClick={() => setClosed(true)}>
							<X className="size-3" />
						</Control>
					) : null}
				</div>

				{progress ? (
					<ScrollProgress className="absolute inset-x-0 bottom-0 h-[2px] bg-post-accent" />
				) : null}
			</header>

			{!folded ? (
				<div
					className={cn(
						"min-w-0 flex-1",
						mode === "tiled" ? "overflow-hidden" : "overflow-y-auto",
						bodyClassName,
					)}
				>
					{children}
				</div>
			) : null}

			<button
				type="button"
				onPointerDown={beginResize}
				aria-label="Resize pane"
				title="Drag to detach and resize"
				className="absolute bottom-0 right-0 z-10 size-4 cursor-nwse-resize opacity-0 transition-opacity focus-visible:opacity-100 group-hover/tile:opacity-100"
			>
				<span className="absolute bottom-1 right-1 block size-2 border-b border-r border-overlay1" />
			</button>
		</>
	);

	const shared = cn(
		"group/tile flex min-w-0 flex-col overflow-hidden rounded-window border border-border bg-base",
		"transition-[border-color,box-shadow] duration-200",
		"hover:border-[color-mix(in_srgb,var(--post-accent)_45%,transparent)] focus-within:border-[color-mix(in_srgb,var(--post-accent)_55%,transparent)]",
		className,
	);

	const placeholder =
		mode === "tiled" ? null : (
			<div
				style={{ height: reserved }}
				className="grid place-items-center rounded-window border border-dashed border-border bg-mantle/25 px-3 text-center text-[10px] leading-relaxed text-overlay1"
			>
				<span>
					{title} is {mode}. Drag its title bar or corner, press Esc to dock it.
				</span>
			</div>
		);

	return (
		<>
			{placeholder}
			<AnimatePresence>
				{mode === "fullscreen" ? (
					<motion.div
						key="scrim"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduced ? 0 : 0.18 }}
						onClick={() => setMode("tiled")}
						className="fixed inset-0 z-[70] bg-crust/80"
					/>
				) : null}
			</AnimatePresence>

			<motion.section
				ref={sectionRef}
				layout={!reduced && mode === "tiled"}
				style={
					{
						"--post-accent": accent ?? "var(--mauve)",
						...(mode === "floating"
							? {
									position: "fixed",
									left: box.x,
									top: box.y,
									width: box.width,
									height: box.height,
									zIndex: 80,
								}
							: {}),
						...(mode === "fullscreen"
							? {
									position: "fixed",
									inset: "0.5rem",
									zIndex: 80,
									height: "auto",
								}
							: {}),
					} as React.CSSProperties
				}
				className={cn(
					shared,
					mode === "floating" && "shadow-[0_24px_60px_-20px_rgb(0_0_0_/_0.65)]",
					mode === "fullscreen" &&
						"shadow-[0_24px_60px_-20px_rgb(0_0_0_/_0.65)]",
				)}
			>
				{chrome}
			</motion.section>
		</>
	);
}
