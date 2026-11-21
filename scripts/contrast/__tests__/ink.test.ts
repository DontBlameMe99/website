import { describe, expect, test } from "bun:test";
import { hasMaskInk } from "../measure";

const bitmap = (rgba: number[]) => ({
	width: 1,
	height: 1,
	data: new Uint8Array(rgba),
});

describe("hasMaskInk", () => {
	test("ignores jitter on an antialiased rule", () => {
		const hidden = bitmap([215, 221, 235, 255]);
		const maskA = bitmap([175, 181, 195, 255]);
		const maskB = bitmap([215, 221, 235, 255]);
		expect(hasMaskInk(maskA, hidden, maskB, 0)).toBe(false);
	});

	test("finds a glyph painted in either mask color", () => {
		const hidden = bitmap([215, 221, 235, 255]);
		const maskA = bitmap([255, 0, 255, 255]);
		const maskB = bitmap([0, 255, 0, 255]);
		expect(hasMaskInk(maskA, hidden, maskB, 0)).toBe(true);
	});
});
