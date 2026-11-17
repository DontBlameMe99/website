import { describe, expect, test } from "bun:test";
import {
	AAA,
	contrastFailures,
	contrastRatio,
	expandStyleRefs,
	isCssValue,
	PALETTE_LABELS,
	readThemeFile,
	resolveCustomTheme,
	resolveSelection,
	STYLE_LABELS,
	themeFile,
} from "../lib/custom_theme";
import { DEFAULT_PREFS, PALETTE_TOKENS, STYLE_TOKENS } from "../lib/themes";

/** A palette that clears AAA, so a test only has to break the pair it names. */
const complete = (overrides: Record<string, string> = {}) => {
	const palette: Record<string, string> = {};
	for (const token of PALETTE_TOKENS) palette[token] = "#101010";
	return Object.assign(
		palette,
		{
			base: "#ffffff",
			mantle: "#f4f4f4",
			crust: "#e8e8e8",
			surface0: "#dcdcdc",
			"on-accent": "#ffffff",
		},
		overrides,
	);
};

describe("token labels", () => {
	test("cover every token the editor can show", () => {
		expect(Object.keys(PALETTE_LABELS).sort()).toEqual(
			[...PALETTE_TOKENS].sort(),
		);
		expect(Object.keys(STYLE_LABELS).sort()).toEqual([...STYLE_TOKENS].sort());
	});
});

describe("resolveCustomTheme", () => {
	test("keeps a complete palette and lowercases it", () => {
		const theme = resolveCustomTheme({
			dark: complete({ text: "#AABBCC", base: "#FFF" }),
			light: null,
			style: null,
		});
		expect(theme.dark?.base).toBe("#ffffff");
		expect(theme.dark?.text).toBe("#aabbcc");
		expect(Object.keys(theme.dark ?? {}).sort()).toEqual(
			[...PALETTE_TOKENS].sort(),
		);
		expect(theme.light).toBeNull();
		expect(theme.style).toBeNull();
	});

	test("rejects an incomplete or malformed palette instead of half-applying it", () => {
		expect(resolveCustomTheme({ dark: { text: "#ffffff" } }).dark).toBeNull();
		expect(
			resolveCustomTheme({ dark: complete({ text: "white" }) }).dark,
		).toBeNull();
		expect(resolveCustomTheme({ dark: "mocha" }).dark).toBeNull();
	});

	test("keeps only known style tokens with a value that stays one value", () => {
		const theme = resolveCustomTheme({
			style: {
				bw: " 3px ",
				"not-a-token": "1px",
				edge: "red; background: black",
				radius: "<script>",
			},
		});
		expect(theme.style).toEqual({ bw: "3px" });
	});

	test("a style with nothing left is still a style", () => {
		expect(resolveCustomTheme({ style: {} }).style).toEqual({});
		expect(resolveCustomTheme({ style: { edge: "<" } }).style).toEqual({});
		expect(resolveCustomTheme({ style: "flat" }).style).toBeNull();
	});

	test("junk input resolves to nothing at all", () => {
		expect(resolveCustomTheme(null)).toEqual({
			dark: null,
			light: null,
			style: null,
		});
		expect(resolveCustomTheme("dark")).toEqual({
			dark: null,
			light: null,
			style: null,
		});
	});
});

describe("expandStyleRefs", () => {
	const declarations = {
		"aurora-mauve": "light-dark(var(--mauve) 3%, var(--crust))",
		"page-gradient": "radial-gradient(var(--aurora-mauve), transparent)",
		radius: "0px",
		"control-radius": "var(--radius)",
		"accent-surface": "var(--mauve)",
	};

	test("fills in a style's private declarations, all the way down", () => {
		expect(expandStyleRefs("var(--page-gradient)", declarations)).toBe(
			"radial-gradient(light-dark(var(--mauve) 3%, var(--crust)), transparent)",
		);
	});

	test("leaves style tokens and the accent as references", () => {
		expect(expandStyleRefs("var(--control-radius)", declarations)).toBe(
			"var(--control-radius)",
		);
		expect(
			expandStyleRefs(
				"color-mix(in srgb, var(--accent-surface) 20%, transparent)",
				declarations,
			),
		).toBe("color-mix(in srgb, var(--accent-surface) 20%, transparent)");
	});

	test("leaves palette references alone", () => {
		expect(expandStyleRefs("1px solid var(--ink)", declarations)).toBe(
			"1px solid var(--ink)",
		);
		expect(expandStyleRefs("var(--missing)", declarations)).toBe(
			"var(--missing)",
		);
	});
});

describe("isCssValue", () => {
	test("takes the values a style table holds", () => {
		expect(isCssValue("2px solid var(--ink)")).toBe(true);
		// A value is often several parts: a trailing space while typing is fine.
		expect(isCssValue("2px solid ")).toBe(true);
		expect(isCssValue("color-mix(in srgb, var(--ink) 50%, transparent)")).toBe(
			true,
		);
		expect(isCssValue("url(/posts/a.webp)")).toBe(true);
		expect(isCssValue("currentColor")).toBe(true);
	});

	test("drops anything that could start a second declaration", () => {
		for (const value of [
			"",
			" ",
			"red; color: blue",
			"red} body { color: blue",
			"<script>",
			"a".repeat(2001),
			null,
			7,
		]) {
			expect(isCssValue(value)).toBe(false);
		}
	});
});

describe("resolveSelection", () => {
	const prefs = {
		...DEFAULT_PREFS,
		darkScheme: "custom" as const,
		lightScheme: "custom" as const,
		style: "custom" as const,
	};

	test("falls back per axis when the matching custom set is gone", () => {
		expect(
			resolveSelection(prefs, { dark: null, light: null, style: null }),
		).toEqual({
			...prefs,
			darkScheme: DEFAULT_PREFS.darkScheme,
			lightScheme: DEFAULT_PREFS.lightScheme,
			style: DEFAULT_PREFS.style,
		});
	});

	test("keeps the axes that still have their own tokens", () => {
		expect(
			resolveSelection(prefs, { dark: complete(), light: null, style: {} }),
		).toEqual({ ...prefs, lightScheme: DEFAULT_PREFS.lightScheme });
	});
});

describe("contrast", () => {
	test("reads the extremes and the floor", () => {
		expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
		expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
		expect(AAA).toBe(7);
	});

	test("passes a palette the built-ins are tuned to", () => {
		expect(contrastFailures(complete())).toEqual([]);
	});

	test("names the worst pair first", () => {
		const failures = contrastFailures(complete({ text: "#e0e0e0" }));
		expect(failures.length).toBeGreaterThan(0);
		expect(failures[0].ink).toBe("Text");
		expect(failures[0].ratio).toBeLessThan(1.5);
	});
});

describe("theme files", () => {
	const state = {
		prefs: {
			...DEFAULT_PREFS,
			mode: "light" as const,
			style: "custom" as const,
			darkScheme: "custom" as const,
			lightScheme: "custom" as const,
		},
		custom: {
			dark: complete(),
			light: complete({ base: "#fafafa" }),
			style: { bw: "1px", radius: "0px" },
		},
	};

	test("round-trips both palettes, the style, and the choices", () => {
		const result = readThemeFile(themeFile(state));
		expect(result).toEqual({ state });
	});

	test("refuses a file that names a custom set it does not carry", () => {
		expect(readThemeFile(JSON.stringify({ darkScheme: "custom" }))).toEqual({
			error: "The file picks a custom dark set but does not carry one.",
		});
		expect(readThemeFile(JSON.stringify({ style: "custom" }))).toEqual({
			error: "The file picks a custom style set but does not carry one.",
		});
	});

	test("round-trips a custom style with every field cleared", () => {
		const cleared = {
			prefs: { ...DEFAULT_PREFS, style: "custom" as const },
			custom: { dark: null, light: null, style: {} },
		};
		expect(readThemeFile(themeFile(cleared))).toEqual({ state: cleared });
	});

	test("refuses anything that is not a theme object", () => {
		expect(readThemeFile("not json")).toEqual({ error: "That is not JSON." });
		expect(readThemeFile("[]")).toEqual({
			error: "A theme file is a JSON object.",
		});
		expect(readThemeFile("null")).toEqual({
			error: "A theme file is a JSON object.",
		});
	});
});
