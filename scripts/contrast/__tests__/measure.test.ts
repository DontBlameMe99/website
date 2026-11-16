import { describe, expect, test } from "bun:test";
import {
	composite,
	contrastRatio,
	hex,
	parseColor,
	requirements,
} from "../measure";

describe("contrast", () => {
	test("black on white is the full 21:1", () => {
		expect(
			contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }),
		).toBeCloseTo(21, 5);
	});

	test("order does not matter", () => {
		const a = { r: 30, g: 40, b: 50 };
		const b = { r: 200, g: 210, b: 220 };
		expect(contrastRatio(a, b)).toBe(contrastRatio(b, a));
	});
});

describe("parseColor", () => {
	test("reads the two serializations Chromium uses", () => {
		expect(parseColor("rgb(205, 214, 244)")).toEqual({
			r: 205,
			g: 214,
			b: 244,
			a: 1,
		});
		expect(parseColor("rgba(0, 0, 0, 0.5)")).toEqual({
			r: 0,
			g: 0,
			b: 0,
			a: 0.5,
		});
		expect(parseColor("color(srgb 0.5 0.25 0.75 / 0.5)")).toEqual({
			r: 128,
			g: 64,
			b: 191,
			a: 0.5,
		});
	});

	test("rejects what it cannot measure", () => {
		expect(parseColor("oklch(0.7 0.1 200)")).toBeNull();
		expect(parseColor("not a color")).toBeNull();
	});

	test("formats to hex", () => {
		expect(hex({ r: 17, g: 17, b: 27 })).toBe("#11111b");
	});
});

describe("composite", () => {
	test("blends a translucent foreground over its background", () => {
		expect(
			composite({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, 0.5),
		).toEqual({
			r: 128,
			g: 128,
			b: 128,
		});
	});
});

describe("requirements", () => {
	test("uses the large-text thresholds above 24px or 18.66px bold", () => {
		expect(requirements(16, 400)).toEqual({ aa: 4.5, aaa: 7, large: false });
		expect(requirements(23.9, 400).aa).toBe(4.5);
		expect(requirements(24, 400).aa).toBe(3);
		expect(requirements(18.66, 700).aa).toBe(3);
		expect(requirements(18.66, 400).aa).toBe(4.5);
	});
});
