/**
 * Geometry for the theme switch. The new palette enters as one wobbling blob
 * that swells from the toggle. Its edge is a polygon whose vertices interpolate
 * between frames, so the shape stays smooth while it moves.
 */

const VERTICES = 72;
const STEPS = 22;
const OVERSCAN = 1.02;

/* Edge wobble as a fraction of the radius: lobes, size, drift. */
const WAVES = [
	{ lobes: 3, size: 0.14, drift: 2.1 },
	{ lobes: 5, size: 0.08, drift: -3.4 },
	{ lobes: 9, size: 0.04, drift: 4.7 },
] as const;

/** Distance, in px, from (x, y) to the farthest viewport corner, plus margin. */
function coverRadius(
	x: number,
	y: number,
	width: number,
	height: number,
): number {
	return (
		OVERSCAN *
		Math.max(
			Math.hypot(x, y),
			Math.hypot(width - x, y),
			Math.hypot(x, height - y),
			Math.hypot(width - x, height - y),
		)
	);
}

function round(value: number): number {
	return Math.round(value * 10) / 10;
}

function blob(
	x: number,
	y: number,
	radius: number,
	wobble: number,
	phase: number,
): string {
	const points: string[] = [];
	for (let vertex = 0; vertex < VERTICES; vertex += 1) {
		const angle = (vertex / VERTICES) * Math.PI * 2;
		let edge = 0;
		for (const wave of WAVES) {
			edge += wave.size * Math.sin(wave.lobes * angle + wave.drift * phase);
		}
		const reach = radius * (1 + wobble * edge);
		points.push(
			`${round(x + Math.cos(angle) * reach)}px ${round(y + Math.sin(angle) * reach)}px`,
		);
	}
	return `polygon(${points.join(", ")})`;
}

/**
 * Clip-path keyframes for the reveal. Spread eases out and the wobble dies as
 * the blob lands, so the last frame is a still cover of every corner.
 */
export function liquidWipeFrames(
	x: number,
	y: number,
	width: number,
	height: number,
): string[] {
	const reach = coverRadius(x, y, width, height);
	const frames: string[] = [];
	for (let step = 0; step <= STEPS; step += 1) {
		const phase = step / STEPS;
		const spread = 1 - (1 - phase) ** 3;
		frames.push(blob(x, y, reach * spread, (1 - spread) ** 0.9, phase));
	}
	return frames;
}
