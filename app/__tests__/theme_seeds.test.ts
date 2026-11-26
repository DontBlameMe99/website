import { describe, expect, test } from "bun:test";
import {
	ROOT_STYLE_TOKENS,
	SCHEME_TOKENS,
	STYLE_TOKENS_BY_ID,
} from "../lib/theme_catalog";
import { seedPalette, seedStyle } from "../lib/theme_seeds";
import { PALETTE_TOKENS } from "../lib/themes";

describe("seeded custom tokens", () => {
	test("a palette seed reads every color from its catalog map", () => {
		const tokens = SCHEME_TOKENS.mocha;
		const palette = seedPalette("mocha");
		for (const token of PALETTE_TOKENS) {
			expect(palette?.[token]).toBe(
				tokens[`--${token}`].replace(/^var\(--(.+)\)$/, (_, target: string) =>
					String(tokens[`--${target}`]),
				),
			);
		}
	});

	test("a style seed uses its own block and inherits the root defaults", () => {
		expect(seedStyle("flat").radius).toBe(STYLE_TOKENS_BY_ID.flat["--radius"]);
		expect(seedStyle("flat")["font-sans"]).toBe(
			ROOT_STYLE_TOKENS["--font-sans"],
		);
	});
});
