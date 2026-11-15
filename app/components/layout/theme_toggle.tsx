import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "~/lib/theme_provider";

type DocumentWithTransitions = Document & {
	startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

/** A square button that wipes the next palette in from its own corner. */
export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const ref = useRef<HTMLButtonElement>(null);
	const nextTheme = theme === "dark" ? "light" : "dark";

	const toggle = () => {
		const doc = document as DocumentWithTransitions;
		const button = ref.current;

		if (!doc.startViewTransition || !button) {
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
						duration: 500,
						easing: "cubic-bezier(0.16, 1, 0.3, 1)",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			})
			.catch(() => {
				document.documentElement.classList.remove("theme-vt");
			});
	};

	return (
		<button
			ref={ref}
			type="button"
			onClick={toggle}
			aria-label={`Switch to ${nextTheme} mode`}
			title={`Switch to ${nextTheme} mode`}
			className="nb-button h-9 w-9 shrink-0 justify-center bg-base p-0"
		>
			{theme === "dark" ? (
				<Moon className="size-3.5" />
			) : (
				<Sun className="size-3.5" />
			)}
		</button>
	);
}
