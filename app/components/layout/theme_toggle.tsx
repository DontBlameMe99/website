import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useTheme } from "~/lib/theme_provider";
import { startLiquidWipe } from "~/lib/theme_wipe";

/** A square button that spills the next palette in as a liquid blob. */
export function ThemeToggle() {
	const { mode, setMode } = useTheme();
	const ref = useRef<HTMLButtonElement>(null);
	const nextTheme = mode === "dark" ? "light" : "dark";

	const toggle = () => {
		const button = ref.current;
		if (!button) return;
		const rect = button.getBoundingClientRect();
		startLiquidWipe(
			rect.left + rect.width / 2,
			rect.top + rect.height / 2,
			() => setMode(nextTheme),
		);
	};

	return (
		<button
			ref={ref}
			type="button"
			onClick={toggle}
			aria-label="Switch color theme"
			title="Switch color theme"
			className="nb-button h-8 w-8 shrink-0 justify-center p-0 sm:h-9 sm:w-9"
		>
			<span
				className="relative grid size-3.5 place-items-center"
				aria-hidden="true"
			>
				<motion.span
					className="theme-moon absolute"
					animate={{
						opacity: mode === "dark" ? 1 : 0,
						rotate: mode === "dark" ? 0 : -90,
						scale: mode === "dark" ? 1 : 0.7,
					}}
					transition={{ duration: 0.18, ease: "easeOut" }}
				>
					<Moon className="size-3.5" />
				</motion.span>
				<motion.span
					className="theme-sun absolute"
					animate={{
						opacity: mode === "light" ? 1 : 0,
						rotate: mode === "light" ? 0 : 90,
						scale: mode === "light" ? 1 : 0.7,
					}}
					transition={{ duration: 0.18, ease: "easeOut" }}
				>
					<Sun className="size-3.5" />
				</motion.span>
			</span>
		</button>
	);
}
