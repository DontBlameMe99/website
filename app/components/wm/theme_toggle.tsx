import { Moon, Rows2, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useTheme } from "~/lib/theme_provider";
import { cn } from "~/lib/utils";

type DocumentWithTransitions = Document & {
	startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

/** Theme switch that reveals the next palette out of the button itself. */
export function ThemeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const ref = useRef<HTMLButtonElement>(null);
	const reduced = useReducedMotion();
	const nextTheme = theme === "dark" ? "light" : "dark";

	const toggle = () => {
		const doc = document as DocumentWithTransitions;
		const button = ref.current;

		if (!doc.startViewTransition || reduced || !button) {
			setTheme(nextTheme);
			return;
		}

		const rect = button.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const radius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y),
		);

		document.documentElement.classList.add("theme-vt");
		// The reveal normally clears the class itself, but a hidden tab can leave
		// the transition pending forever, so the class also expires on its own.
		setTimeout(
			() => document.documentElement.classList.remove("theme-vt"),
			1200,
		);
		const transition = doc.startViewTransition(() => setTheme(nextTheme));
		transition.ready
			.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${radius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 560,
						easing: "cubic-bezier(0.22, 1, 0.36, 1)",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			})
			.finally(() => {
				setTimeout(
					() => document.documentElement.classList.remove("theme-vt"),
					650,
				);
			});
	};

	return (
		<button
			ref={ref}
			type="button"
			onClick={toggle}
			aria-label={`Switch to ${nextTheme} mode`}
			title={`Switch to ${nextTheme} mode (alt+t)`}
			className={cn(
				"grid size-6 place-items-center rounded-[2px] text-overlay1 transition-colors hover:bg-surface0 hover:text-text",
				className,
			)}
		>
			<motion.span
				key={theme}
				initial={reduced ? false : { rotate: -50, opacity: 0, scale: 0.7 }}
				animate={{ rotate: 0, opacity: 1, scale: 1 }}
				transition={{ type: "spring", stiffness: 340, damping: 22 }}
				className="grid place-items-center"
			>
				{theme === "dark" ? (
					<Moon className="size-3.5" />
				) : (
					<Sun className="size-3.5" />
				)}
			</motion.span>
		</button>
	);
}

export function LayoutIndicator() {
	return (
		<span
			className="hidden items-center gap-1 text-overlay1 sm:flex"
			title="tiling layout"
		>
			<Rows2 className="size-3" />
			<span className="text-[10px] uppercase tracking-[0.12em]">tiling</span>
		</span>
	);
}
