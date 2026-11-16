import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { liquidWipeFrames } from "~/lib/liquid_wipe";
import { useTheme } from "~/lib/theme_provider";

type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type DocumentWithTransitions = Document & {
	startViewTransition?: (callback: () => void) => ViewTransition;
};

const FALLBACK_MS = 300;

/** A square button that spills the next palette in as a liquid blob. */
export function ThemeToggle() {
	const { mode, setMode } = useTheme();
	const ref = useRef<HTMLButtonElement>(null);
	// Only a run that owns the class advances the token. Runs that bail out
	// early must not, or the owner's cleanup would no-op forever.
	const runs = useRef(0);
	const nextTheme = mode === "dark" ? "light" : "dark";

	const toggle = () => {
		const doc = document as DocumentWithTransitions;
		const button = ref.current;
		const root = document.documentElement;

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		// A hidden tab never paints the transition, so do not route the state
		// change through it there.
		if (
			!doc.startViewTransition ||
			!button ||
			reduced ||
			document.visibilityState !== "visible"
		) {
			setMode(nextTheme);
			return;
		}

		const rect = button.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		// Every click owns its transition. Tokens keep a stale transition from
		// stripping the class or flipping the palette of a newer one.
		const id = ++runs.current;
		const isLatest = () => runs.current === id;

		root.classList.add("theme-switching");

		const cleanup = () => {
			if (isLatest()) root.classList.remove("theme-switching");
		};

		let ran = false;
		const apply = () => {
			if (ran || !isLatest()) return;
			ran = true;
			// React must commit before the browser captures the new snapshot,
			// otherwise the wipe shows the palette it just replaced.
			flushSync(() => setMode(nextTheme));
		};

		let transition: ViewTransition;
		try {
			transition = doc.startViewTransition(apply);
		} catch {
			// Starting can throw (for example on a document that is not fully
			// active). Flip the theme and leave nothing disabled behind.
			cleanup();
			setMode(nextTheme);
			return;
		}

		// A stalled transition still has to flip the palette.
		const fallback = window.setTimeout(() => {
			apply();
			cleanup();
		}, FALLBACK_MS);

		transition.finished.finally(() => {
			window.clearTimeout(fallback);
			cleanup();
		});

		transition.ready
			.then(() => {
				root.animate(
					{ clipPath: liquidWipeFrames(x, y, innerWidth, innerHeight) },
					{
						// The frames carry the easing, so the track itself runs linear.
						duration: 650,
						pseudoElement: "::view-transition-new(root)",
					},
				);
			})
			.catch(cleanup);
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
			<Moon aria-hidden="true" className="size-3.5 light:hidden" />
			<Sun aria-hidden="true" className="hidden size-3.5 light:block" />
		</button>
	);
}
