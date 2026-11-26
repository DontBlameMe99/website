import { describe, expect, test } from "bun:test";
import { EMPTY_CUSTOM, type ThemeState } from "../lib/custom_theme";
import { seedPalette, seedStyle } from "../lib/theme_seeds";
import {
	copyPalette,
	copyStyle,
	resetCustom,
	seedSource,
	setAccent,
	setMode,
	setPaletteToken,
	setScheme,
	setStyle,
	setStyleToken,
	styleSource,
} from "../lib/theme_update";
import { DEFAULT_PREFS, PALETTE_TOKENS, type ThemePrefs } from "../lib/themes";

const palette = (overrides: Record<string, string> = {}) => {
	const colors: Record<string, string> = {};
	for (const token of PALETTE_TOKENS) colors[token] = "#123456";
	return { ...colors, ...overrides };
};

const state = (overrides: Partial<ThemeState> = {}): ThemeState => ({
	prefs: { ...DEFAULT_PREFS },
	custom: EMPTY_CUSTOM,
	...overrides,
});

describe("seed sources", () => {
	test("a custom choice falls back to that mode's default", () => {
		expect(
			seedSource({ ...DEFAULT_PREFS, lightScheme: "custom" }, "light"),
		).toBe(DEFAULT_PREFS.lightScheme);
		expect(
			seedSource({ ...DEFAULT_PREFS, lightScheme: "custom" }, "dark"),
		).toBe(DEFAULT_PREFS.darkScheme);
	});

	test("a custom style falls back to the default style", () => {
		expect(styleSource(DEFAULT_PREFS)).toBe(DEFAULT_PREFS.style);
		expect(styleSource({ ...DEFAULT_PREFS, style: "custom" })).toBe(
			DEFAULT_PREFS.style,
		);
	});
});

describe("preference changes", () => {
	test("mode and accent leave custom tokens alone", () => {
		const base = state({
			custom: { ...EMPTY_CUSTOM, style: { bw: "3px" } },
		});
		const lit = setMode(base, "light");
		expect(lit.prefs.mode).toBe("light");
		expect(lit.custom).toBe(base.custom);

		const accented = setAccent(lit, { kind: "custom", hex: "#abcdef" });
		expect(accented.prefs.accent).toEqual({ kind: "custom", hex: "#abcdef" });
		expect(accented.prefs.mode).toBe("light");
	});

	test("a built-in palette saves itself for its own brightness", () => {
		const base = state();
		const next = setScheme(base, "latte");
		expect(next.prefs.mode).toBe("dark");
		expect(next.prefs.lightScheme).toBe("latte");
		expect(next.prefs.darkScheme).toBe(DEFAULT_PREFS.darkScheme);
		expect(next.custom).toBe(base.custom);
	});

	test("a custom palette takes a named slot", () => {
		const own = palette({ base: "#abcdef" });
		const base = state({ custom: { ...EMPTY_CUSTOM, light: own } });
		const next = setScheme(base, "custom", "light");
		expect(next.prefs.lightScheme).toBe("custom");
		expect(next.prefs.darkScheme).toBe(DEFAULT_PREFS.darkScheme);
		expect(next.custom.light).toEqual(own);
		expect(base.prefs.lightScheme).toBe(DEFAULT_PREFS.lightScheme);
	});

	test("a first custom pick seeds from the slot's built-in", () => {
		const prefs: ThemePrefs = { ...DEFAULT_PREFS, lightScheme: "nord-light" };
		const next = setScheme(state({ prefs }), "custom", "light");
		expect(next.custom.light).toEqual(seedPalette("nord-light"));
		expect(next.custom.dark).toBeNull();
	});

	test("a custom slot with no built-in seed uses that mode's default", () => {
		const prefs: ThemePrefs = { ...DEFAULT_PREFS, lightScheme: "custom" };
		const next = setScheme(state({ prefs }), "custom", "light");
		expect(next.custom.light).toEqual(seedPalette(DEFAULT_PREFS.lightScheme));
	});
});

describe("custom edits", () => {
	test("a custom style reuses existing tokens or seeds from the style in use", () => {
		const own = seedStyle("flat");
		const existing = state({ custom: { ...EMPTY_CUSTOM, style: own } });
		const reused = setStyle(existing, "custom");
		expect(reused.custom.style).toBe(own);
		expect(reused.prefs.style).toBe("custom");

		const seeded = setStyle(state(), "custom");
		expect(seeded.custom.style).toEqual(seedStyle(DEFAULT_PREFS.style));
		expect(seeded.prefs.style).toBe("custom");

		const builtIn = setStyle(state(), "flat");
		expect(builtIn.prefs.style).toBe("flat");
		expect(builtIn.custom).toBe(EMPTY_CUSTOM);
	});

	test("copying a palette fills only the named slot", () => {
		const dark = palette({ base: "#000000" });
		const base = state({ custom: { ...EMPTY_CUSTOM, dark } });
		const next = copyPalette(base, "light", "latte");
		expect(next.custom.dark).toBe(dark);
		expect(next.custom.light).toEqual(seedPalette("latte"));
	});

	test("copying a style seeds a new token set", () => {
		const next = copyStyle(state(), "flat");
		expect(next.custom.style).toEqual(seedStyle("flat"));
	});

	test("a palette token needs a custom palette", () => {
		const base = state();
		expect(setPaletteToken(base, "dark", "base", "#ffffff")).toBe(base);

		const own = palette();
		const existing = state({ custom: { ...EMPTY_CUSTOM, dark: own } });
		const next = setPaletteToken(existing, "dark", "base", "#ffffff");
		expect(next.custom.dark?.base).toBe("#ffffff");
		expect(own.base).toBe("#123456");
	});

	test("a style token keeps the typed value, drops blanks and rejects junk", () => {
		const base = state({ custom: { ...EMPTY_CUSTOM, style: { bw: "3px" } } });
		const spaced = setStyleToken(base, "radius", " 4px ");
		expect(spaced.custom.style?.radius).toBe(" 4px ");

		const dropped = setStyleToken(spaced, "bw", "  ");
		expect(dropped.custom.style).toEqual({ radius: " 4px " });

		expect(setStyleToken(base, "bw", "<script>")).toBe(base);
	});

	test("reset clears custom tokens and saved choices but keeps brightness", () => {
		const prefs: ThemePrefs = {
			...DEFAULT_PREFS,
			mode: "light",
			darkScheme: "dracula",
			accent: { kind: "custom", hex: "#abcdef" },
		};
		const base = state({
			prefs,
			custom: {
				dark: palette(),
				light: palette(),
				style: { bw: "3px" },
			},
		});
		const next = resetCustom(base);
		expect(next.prefs.mode).toBe("light");
		expect(next.prefs.darkScheme).toBe(DEFAULT_PREFS.darkScheme);
		expect(next.prefs.lightScheme).toBe(DEFAULT_PREFS.lightScheme);
		expect(next.prefs.style).toBe(DEFAULT_PREFS.style);
		expect(next.prefs.accent).toEqual(DEFAULT_PREFS.accent);
		expect(next.custom).toEqual(EMPTY_CUSTOM);
	});
});
