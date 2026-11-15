import { useEffect, useState } from "react";

/** Tracks which heading of the article is currently closest to the top. */
export function useActiveHeading(ids: string[]): string | null {
	const [active, setActive] = useState<string | null>(ids[0] ?? null);

	useEffect(() => {
		if (!ids.length || typeof IntersectionObserver === "undefined") return;
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => Boolean(element));

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-96px 0px -70% 0px", threshold: 0 },
		);

		for (const element of elements) observer.observe(element);
		return () => observer.disconnect();
	}, [ids]);

	return active;
}
