import { useEffect, useState } from "react";

const EDGE = 120;

/** Tracks the last heading that has passed just below the sticky header. */
export function useActiveHeading(ids: string[]): string | null {
	const [active, setActive] = useState<string | null>(ids[0] ?? null);

	useEffect(() => {
		if (!ids.length) return;

		let frame = 0;
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => Boolean(element));

		const update = () => {
			frame = 0;
			let current = elements[0]?.id ?? null;
			for (const element of elements) {
				if (element.getBoundingClientRect().top > EDGE) break;
				current = element.id;
			}
			setActive(current);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		window.addEventListener("hashchange", schedule);
		const observer = new ResizeObserver(schedule);
		observer.observe(document.body);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			window.removeEventListener("hashchange", schedule);
			observer.disconnect();
		};
	}, [ids]);

	return active;
}
