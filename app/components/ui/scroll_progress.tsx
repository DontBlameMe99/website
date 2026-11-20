import { useEffect, useRef } from "react";

/**
 * Reading progress: a single hairline. It is written straight to the DOM so it
 * cannot lag behind a route change the way a spring can, and a page that fits
 * the viewport reports zero instead of the empty-range 100%.
 */
export function ScrollProgress({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

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
			className={className}
			style={{ transform: "scaleX(0)", transformOrigin: "0% 50%" }}
		/>
	);
}
