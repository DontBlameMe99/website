import { describe, expect, test } from "bun:test";
import { glassMarkerVars } from "../lib/glass_marker";

describe("glass marker", () => {
	test("positions the marker relative to its scope", () => {
		expect(
			glassMarkerVars(
				{ left: 100, top: 20, width: 300, height: 40 },
				{ left: 125, top: 24, width: 60, height: 32 },
			),
		).toEqual({
			"--marker-left": "25px",
			"--marker-top": "4px",
			"--marker-width": "60px",
			"--marker-height": "32px",
			"--marker-opacity": "1",
		});
	});

	test("clears every marker property", () => {
		const scope = {
			style: {
				removeProperty: (name: string) => removed.push(name),
			},
		} as unknown as HTMLElement;
		const removed: string[] = [];
		glassMarkerVars.clear(scope);
		expect(removed).toEqual([
			"--marker-left",
			"--marker-top",
			"--marker-width",
			"--marker-height",
			"--marker-opacity",
		]);
	});
});
