import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { glassMarkerVars } from "~/lib/glass_marker";
/** Measures the active control and writes the box to the marker's own scope. */
export function useGlassMarker<T extends HTMLElement>(
	active: React.RefObject<HTMLElement | null>,
	enabled: boolean,
	key: string | null,
) {
	const scopeRef = useRef<T>(null);
	const measure = useCallback(() => {
		const scope = scopeRef.current;
		const target = active.current;
		if (!scope) return;
		if (!target) {
			glassMarkerVars.clear(scope);
			return;
		}
		const vars = glassMarkerVars(
			scope.getBoundingClientRect(),
			target.getBoundingClientRect(),
		);
		for (const [name, value] of Object.entries(vars))
			scope.style.setProperty(name, value);
	}, [active]);

	useLayoutEffect(() => {
		const scope = scopeRef.current;
		if (!enabled || key === null) {
			if (scope) glassMarkerVars.clear(scope);
			return;
		}
		measure();
	}, [enabled, key, measure]);

	useEffect(() => {
		if (!enabled) return;
		const scope = scopeRef.current;
		if (!scope) return;
		const observer = new ResizeObserver(measure);
		observer.observe(scope);
		observer.observe(scope.parentElement ?? scope);
		window.addEventListener("resize", measure);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [enabled, measure]);

	return scopeRef;
}
