import { describe, expect, test } from "bun:test";
import { liquidWipeFrames } from "../lib/liquid_wipe";

type Point = { x: number; y: number };

function vertices(frame: string): Point[] {
	return frame
		.slice("polygon(".length, -1)
		.split(", ")
		.map((pair) => {
			const [x, y] = pair.split(" ");
			return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
		});
}

function contains(polygon: Point[], point: Point): boolean {
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
		const a = polygon[i];
		const b = polygon[j];
		const crosses =
			a.y > point.y !== b.y > point.y &&
			point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
		if (crosses) inside = !inside;
	}
	return inside;
}

const x = 320;
const y = 24;
const width = 1280;
const height = 800;
const corners: Point[] = [
	{ x: 0, y: 0 },
	{ x: width, y: 0 },
	{ x: 0, y: height },
	{ x: width, y: height },
];

describe("liquidWipeFrames", () => {
	test("starts collapsed at the toggle", () => {
		const [first] = liquidWipeFrames(x, y, width, height);
		for (const point of vertices(first)) {
			expect(Math.hypot(point.x - x, point.y - y)).toBeLessThan(0.5);
		}
	});

	test("ends on a still frame that covers every corner", () => {
		const frames = liquidWipeFrames(x, y, width, height);
		const last = vertices(frames[frames.length - 1]);
		for (const corner of corners) {
			expect(contains(last, corner)).toBe(true);
		}
	});
});
