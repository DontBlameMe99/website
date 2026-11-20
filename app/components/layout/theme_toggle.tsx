import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "~/lib/theme_provider";
import { startLiquidWipe } from "~/lib/theme_wipe";

/** A square button that spills the next palette in as a liquid blob. */
export function ThemeToggle() {
	const { mode, setMode } = useTheme();
	const ref = useRef<HTMLButtonElement>(null);
	const nextTheme = mode === "dark" ? "light" : "dark";
	const label = `Switch to ${nextTheme} theme`;

	const toggle = () => {
		const button = ref.current;
		if (!button) return;
		const rect = button.getBoundingClientRect();
		startLiquidWipe(
			rect.left + rect.width / 2,
			rect.top + rect.height / 2,
			() => {
				const current = document.documentElement.classList.contains("light")
					? "light"
					: "dark";
				setMode(current === "dark" ? "light" : "dark");
			},
		);
	};
	return (
		<button
			ref={ref}
			type="button"
			onClick={toggle}
			aria-label={label}
			title={label}
			className="nb-button h-9 w-9 shrink-0 justify-center p-0"
		>
			{/* The glyphs are driven by the mode class the boot script already set,
			    so they animate without waiting for hydration. */}
			<span
				className="relative grid size-3.5 place-items-center"
				aria-hidden="true"
			>
				<span className="theme-moon absolute">
					<Moon className="size-3.5" />
				</span>
				<span className="theme-sun absolute">
					<Sun className="size-3.5" />
				</span>
			</span>
		</button>
	);
}
