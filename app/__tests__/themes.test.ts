import { describe, expect, test } from "bun:test";
import { SCHEME_TOKENS, themeTokenBlocks } from "../lib/theme_catalog";
import {
	ACCENT_HUES,
	DEFAULT_PREFS,
	fontPreloadScript,
	inkOn,
	isSchemeForMode,
	resolveAccent,
	resolvePrefs,
	SCHEMES,
	STORAGE_KEYS,
	STYLE_VALUE_MAX,
	STYLES,
	themeBootScript,
	withScheme,
} from "../lib/themes";

describe("theme catalog", () => {
	test("ids are unique across the lists", () => {
		const schemes = SCHEMES.map((scheme) => scheme.id);
		const styles = STYLES.map((style) => style.id);
		expect(new Set(schemes).size).toBe(schemes.length);
		expect(new Set(styles).size).toBe(styles.length);
	});

	test("the defaults point at real entries", () => {
		expect(isSchemeForMode(DEFAULT_PREFS.darkScheme, "dark")).toBe(true);
		expect(isSchemeForMode(DEFAULT_PREFS.lightScheme, "light")).toBe(true);
		expect(STYLES.some((style) => style.id === DEFAULT_PREFS.style)).toBe(true);
	});
});

describe("withScheme", () => {
	test("saves a scheme without touching the brightness in use", () => {
		const page = {
			...DEFAULT_PREFS,
			mode: "dark" as const,
			lightScheme: "latte" as const,
		};
		const saved = withScheme(page, "latte");
		expect(saved.mode).toBe("dark");
		expect(saved.lightScheme).toBe("latte");
		expect(saved.darkScheme).toBe(page.darkScheme);
	});

	test("writes each scheme to its own slot", () => {
		const prefs = withScheme(DEFAULT_PREFS, "macchiato");
		expect(prefs.darkScheme).toBe("macchiato");
		expect(prefs.lightScheme).toBe(DEFAULT_PREFS.lightScheme);
	});
});

describe("resolvePrefs", () => {
	test("keeps valid stored values", () => {
		expect(
			resolvePrefs({
				mode: "light",
				style: "flat",
				darkScheme: "frappe",
				lightScheme: "latte",
				accent: "sky",
			}),
		).toEqual({
			mode: "light",
			style: "flat",
			darkScheme: "frappe",
			lightScheme: "latte",
			accent: { kind: "hue", hue: "sky" },
		});
	});

	test("falls back for missing or junk values", () => {
		const prefs = resolvePrefs({
			mode: "sepia",
			style: "claymorphism",
			darkScheme: "latte",
			lightScheme: null,
		});
		expect(prefs).toEqual(DEFAULT_PREFS);
	});

	test("takes the caller's brightness fallback", () => {
		expect(resolvePrefs({ mode: "sepia" }, "light").mode).toBe("light");
		expect(resolvePrefs({ mode: "light" }, "dark").mode).toBe("light");
	});

	test("a scheme can never land in the other brightness slot", () => {
		const prefs = resolvePrefs({ darkScheme: "frappe", lightScheme: "mocha" });
		expect(prefs.darkScheme).toBe("frappe");
		expect(prefs.lightScheme).toBe(DEFAULT_PREFS.lightScheme);
	});
});

describe("accent", () => {
	test("a hue name points at the palette instead of carrying a hex", () => {
		expect(resolveAccent("sky")).toEqual({ kind: "hue", hue: "sky" });
		expect(resolveAccent("mauve")).toEqual({ kind: "hue", hue: "mauve" });
	});

	test("a hex is kept as a custom color, lowercased", () => {
		expect(resolveAccent("#7AA2F7")).toEqual({
			kind: "custom",
			hex: "#7aa2f7",
		});
	});

	test("anything else falls back to the default accent", () => {
		for (const value of ["", "purple", "#12345", "rgb(1,2,3)", null, 7]) {
			expect(resolveAccent(value)).toEqual(DEFAULT_PREFS.accent);
		}
	});

	test("a custom fill gets an ink it can carry", () => {
		expect(inkOn("#f9e2af")).toBe("#11111b");
		expect(inkOn("#767676")).toBe("#ffffff");
		expect(inkOn("#3d2f6b")).toBe("#ffffff");
	});
});

describe("boot script", () => {
	test("keeps the font preload ahead of theme initialization", () => {
		expect(fontPreloadScript).toContain(
			"/fonts/montserrat/Montserrat-Variable.woff2",
		);
		expect(fontPreloadScript).toContain('["xp","msdos","minecraft"]');
		expect(themeBootScript).not.toContain("Montserrat-Variable.woff2");
	});
	// It runs before the app module loads, so it must know every id on its own.
	test("knows every storage key and every id", () => {
		for (const key of Object.values(STORAGE_KEYS)) {
			expect(themeBootScript).toContain(key);
		}
		for (const scheme of SCHEMES) {
			expect(themeBootScript).toContain(scheme.id);
		}
		for (const style of STYLES) {
			expect(themeBootScript).toContain(style.id);
		}
		for (const hue of ACCENT_HUES) {
			expect(themeBootScript).toContain(`"${hue}"`);
		}
		expect(themeBootScript).toContain("dataset.style");
		expect(themeBootScript).toContain("dataset.scheme");
		expect(themeBootScript).toContain("dataset.accent");
	});

	test("caps style values at the same length the validator enforces", () => {
		expect(themeBootScript).toContain(String(STYLE_VALUE_MAX));
	});

	test("falls back to the same defaults the app uses", () => {
		for (const value of [
			DEFAULT_PREFS.style,
			DEFAULT_PREFS.darkScheme,
			DEFAULT_PREFS.lightScheme,
		]) {
			expect(themeBootScript).toContain(JSON.stringify(value));
		}
	});
});

describe("themeTokenBlocks", () => {
	test("keeps the emitted block order and selectors", () => {
		expect(themeTokenBlocks().map((block) => block.selector)).toEqual([
			':root, [data-scheme="mocha"]',
			":root, [data-style]",
			...SCHEMES.filter((scheme) => scheme.id !== "mocha").map(
				(scheme) => `[data-scheme="${scheme.id}"]`,
			),
			...ACCENT_HUES.map((hue) => `[data-accent="${hue}"]`),
			...STYLES.map((style) => `[data-style="${style.id}"]`),
			'.dark[data-style="xp"]',
			":root",
		]);
	});

	test("keeps Mocha's declarations and one accent declaration per hue", () => {
		const blocks = themeTokenBlocks();
		const mocha = SCHEME_TOKENS.mocha;
		expect(blocks[0].declarations).toEqual(mocha);
		expect(Object.keys(blocks[0].declarations)).toEqual(Object.keys(mocha));
		expect(
			blocks
				.filter((block) => block.selector.startsWith("[data-accent"))
				.map((block) => block.declarations),
		).toEqual(
			ACCENT_HUES.map((hue) => ({
				"--accent-surface": `var(--${hue})`,
			})),
		);
	});
});
