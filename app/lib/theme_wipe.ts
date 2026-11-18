import { flushSync } from "react-dom";
import { liquidWipeFrames } from "~/lib/liquid_wipe";

type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type DocumentWithTransitions = Document & {
	startViewTransition?: (callback: () => void) => ViewTransition;
};

const FALLBACK_MS = 300;

/* Every click owns its transition. A token keeps a stale run from stripping
   the class or committing the paint of a newer one. */
let runs = 0;
/* A selection whose transition callback has not run yet. A second click lands
   it first, so a fast style and palette click both survive. */
let pending: (() => void) | null = null;

/**
 * Spills the new paint out of one point with the liquid wipe. `apply` commits
 * the new state. The helper bails out to a plain commit when the browser has
 * no View Transitions, the visitor asked for less motion, or the tab is hidden.
 */
export function startLiquidWipe(x: number, y: number, apply: () => void) {
	const doc = document as DocumentWithTransitions;
	const root = document.documentElement;

	// Land a selection that is still waiting for its transition callback before
	// replacing that transition, or the newer one would discard it.
	const previous = pending;
	pending = null;
	if (previous) flushSync(previous);

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// A hidden tab never paints the transition, so do not route the state change
	// through it there.
	if (
		!doc.startViewTransition ||
		reduced ||
		document.visibilityState !== "visible"
	) {
		// Retire the earlier run so a late callback cannot replace this selection,
		// and clear a class that run may have left behind. There is no snapshot to
		// catch here, so the state change does not need a synchronous commit.
		runs++;
		root.classList.remove("theme-switching");
		apply();
		return;
	}

	const id = ++runs;
	const isLatest = () => runs === id;

	root.classList.add("theme-switching");

	const cleanup = () => {
		if (isLatest()) root.classList.remove("theme-switching");
	};

	let ran = false;
	const commit = () => {
		if (ran || !isLatest()) return;
		ran = true;
		pending = null;
		// React must commit before the browser captures the new snapshot,
		// otherwise the wipe shows the paint it just replaced.
		flushSync(apply);
	};

	let transition: ViewTransition;
	try {
		pending = apply;
		transition = doc.startViewTransition(commit);
	} catch {
		// Starting can throw on a document that is not fully active. Commit and
		// leave nothing disabled behind.
		pending = null;
		cleanup();
		apply();
		return;
	}

	// A stalled transition still has to apply the paint.
	const fallback = window.setTimeout(() => {
		commit();
		cleanup();
	}, FALLBACK_MS);

	transition.finished.finally(() => {
		window.clearTimeout(fallback);
		if (isLatest()) pending = null;
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
}
