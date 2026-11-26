import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

function supportsScrollTimeline() {
	return (
		typeof CSS !== "undefined" &&
		CSS.supports("animation-timeline: scroll()") &&
		CSS.supports("animation-range: 0 100%")
	);
}

/**
 * Reading progress: a single hairline. CSS drives it from the root scroll
 * timeline when the browser supports scroll-driven animations. Older browsers
 * get the same values through a rAF-throttled listener.
 */
export function ScrollProgress({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element || supportsScrollTimeline()) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const root = document.documentElement;
			const range = root.scrollHeight - root.clientHeight;
			const progress =
				range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
			element.style.setProperty("--progress", String(progress));
			element.style.transform = `scaleX(${progress})`;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		const observer = new ResizeObserver(schedule);
		observer.observe(document.body);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			observer.disconnect();
		};
	}, []);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className={cn("scroll-progress", className)}
		/>
	);
}
