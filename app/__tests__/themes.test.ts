import { describe, expect, test } from "bun:test";
import {
	DARK_SCHEMES,
	DEFAULT_PREFS,
	isSchemeForMode,
	LIGHT_SCHEMES,
	resolvePrefs,
	SCHEMES,
	schemeForMode,
	STYLES,
	STORAGE_KEYS,
	themeBootScript,
	withScheme,
} from "../lib/themes";

describe("theme catalog", () => {
	test("ids are unique across the lists", () => {
		const schemes = SCHEMES.map((scheme) => scheme.id);
		const styles = STYLES.map((style) => style.id);
		expect(new Set(schemes).size).toBe(schemes.length);
		expect(new Set(styles).size).toBe(styles.length);
		expect(styles.length).toBeGreaterThan(1);
	});

	test("every scheme belongs to exactly one brightness", () => {
		expect(DARK_SCHEMES.length + LIGHT_SCHEMES.length).toBe(SCHEMES.length);
		for (const scheme of DARK_SCHEMES) {
			expect(isSchemeForMode(scheme.id, "dark")).toBe(true);
			expect(isSchemeForMode(scheme.id, "light")).toBe(false);
		}
		for (const scheme of LIGHT_SCHEMES) {
			expect(isSchemeForMode(scheme.id, "light")).toBe(true);
			expect(isSchemeForMode(scheme.id, "dark")).toBe(false);
		}
	});

	test("the defaults point at real entries", () => {
		expect(isSchemeForMode(DEFAULT_PREFS.darkScheme, "dark")).toBe(true);
		expect(isSchemeForMode(DEFAULT_PREFS.lightScheme, "light")).toBe(true);
		expect(STYLES.some((style) => style.id === DEFAULT_PREFS.style)).toBe(true);
	});
});

describe("schemeForMode", () => {
	test("reads the palette for the active brightness", () => {
		expect(schemeForMode("dark", "macchiato", "latte")).toBe("macchiato");
		expect(schemeForMode("light", "macchiato", "latte")).toBe("latte");
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
			}),
		).toEqual({
			mode: "light",
			style: "flat",
			darkScheme: "frappe",
			lightScheme: "latte",
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

describe("boot script", () => {
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
		expect(themeBootScript).toContain("dataset.style");
		expect(themeBootScript).toContain("dataset.scheme");
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
