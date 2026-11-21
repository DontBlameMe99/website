const NAMES = [
	"--marker-left",
	"--marker-top",
	"--marker-width",
	"--marker-height",
	"--marker-opacity",
] as const;

type Rect = { left: number; top: number; width: number; height: number };

/** Position the marker in the coordinate space of its scope. */
export function glassMarkerVars(scope: Rect, active: Rect) {
	return {
		"--marker-left": `${active.left - scope.left}px`,
		"--marker-top": `${active.top - scope.top}px`,
		"--marker-width": `${active.width}px`,
		"--marker-height": `${active.height}px`,
		"--marker-opacity": "1",
	};
}

glassMarkerVars.clear = (element: HTMLElement) => {
	for (const name of NAMES) element.style.removeProperty(name);
};
