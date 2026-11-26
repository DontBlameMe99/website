import { describe, expect, test } from "bun:test";
import { SCHEME_TOKENS } from "../lib/theme_catalog";
import { ACCENT_HUES, PALETTE_TOKENS, SCHEMES } from "../lib/themes";

/**
 * Every accent is named after a hue, so the value behind the name has to sit in
 * that hue's neighborhood. These are the centers, and how far a palette may
 * lean before the name stops describing the color. Green and yellow are wide
 * because a yellow-green is still green; the cool names are tight because sky,
 * sapphire, and blue run next to each other.
 */
const HUE_CENTER: Record<(typeof ACCENT_HUES)[number], number> = {
	pink: 345,
	mauve: 305,
	red: 25,
	maroon: 10,
	peach: 52,
	yellow: 95,
	green: 140,
	teal: 185,
	sky: 212,
	sapphire: 238,
	blue: 262,
	lavender: 286,
};

const HUE_SPREAD: Record<(typeof ACCENT_HUES)[number], number> = {
	pink: 25,
	mauve: 20,
	red: 25,
	maroon: 20,
	peach: 18,
	yellow: 25,
	green: 35,
	teal: 20,
	sky: 17,
	sapphire: 15,
	blue: 14,
	lavender: 14,
};

const LINEAR = Array.from({ length: 256 }, (_, channel) => {
	const value = channel / 255;
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
});

/** sRGB to OKLCH: the hue angle is what a color's name actually promises. */
const oklch = (hex: string) => {
	const value = Number.parseInt(hex.slice(1), 16);
	const r = LINEAR[(value >> 16) & 255];
	const g = LINEAR[(value >> 8) & 255];
	const b = LINEAR[value & 255];
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	const hue = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
	return { chroma: Math.hypot(a, bb), hue };
};

const HEX = /^#[0-9a-f]{6}$/i;

/** Every palette token in the catalog, with its value untouched. */
const declarations = new Map(
	SCHEMES.map((scheme) => [
		scheme.id,
		Object.fromEntries(
			Object.entries(SCHEME_TOKENS[scheme.id])
				.filter(([name]) => name.startsWith("--"))
				.map(([name, value]) => [name.slice(2), value]),
		),
	]),
);
/** The ones that hold a hex, which is what the accent checks compare. */
const palettes = new Map<string, Record<string, string>>(
	[...declarations].map(([id, declared]) => [
		id,
		Object.fromEntries(
			Object.entries(declared).filter(([, value]) => HEX.test(value)),
		),
	]),
);

const VAR_ONLY = /^var\(\s*--([a-z0-9-]+)\s*\)$/i;

describe("scheme palettes", () => {
	test("every scheme declares every palette token", () => {
		// A custom palette is stored complete, and seeding one copies these
		// declarations. A token a scheme block omits cannot be seeded.
		const broken = SCHEMES.flatMap((scheme) => {
			const declared = declarations.get(scheme.id) ?? {};
			return PALETTE_TOKENS.flatMap((token) => {
				const value = declared[token];
				if (value === undefined) return [`${scheme.id}/${token}: missing`];
				if (HEX.test(value)) return [];
				const ref = VAR_ONLY.exec(value);
				if (ref && HEX.test(declared[ref[1]] ?? "")) return [];
				return [`${scheme.id}/${token}: ${value}`];
			});
		});
		expect(broken).toEqual([]);
	});
});

describe("palette accents", () => {
	test("every scheme defines every accent", () => {
		const missing = SCHEMES.flatMap((scheme) =>
			ACCENT_HUES.filter((name) => !palettes.get(scheme.id)?.[name]).map(
				(name) => `${scheme.id}/${name}`,
			),
		);
		expect(missing).toEqual([]);
	});

	test("every accent sits in the hue its name describes", () => {
		const offHue = SCHEMES.flatMap((scheme) =>
			ACCENT_HUES.flatMap((name) => {
				const { hue } = oklch(palettes.get(scheme.id)?.[name] ?? "#000000");
				const distance = Math.abs(((hue - HUE_CENTER[name] + 540) % 360) - 180);
				return distance > HUE_SPREAD[name]
					? [
							`${scheme.id}/${name}: ${Math.round(hue)}°, want ${HUE_CENTER[name]}±${HUE_SPREAD[name]}`,
						]
					: [];
			}),
		);
		expect(offHue).toEqual([]);
	});

	test("no two accents share a value", () => {
		const copies = SCHEMES.flatMap((scheme) => {
			const palette = palettes.get(scheme.id) ?? {};
			const seen = new Map<string, string>();
			return ACCENT_HUES.flatMap((name) => {
				const hex = palette[name]?.toLowerCase();
				const first = seen.get(hex);
				seen.set(hex, name);
				return first ? [`${scheme.id}: ${first} and ${name}`] : [];
			});
		});
		expect(copies).toEqual([]);
	});

	test("no accent is a plain grey", () => {
		const grey = SCHEMES.flatMap((scheme) =>
			ACCENT_HUES.filter(
				(name) =>
					oklch(palettes.get(scheme.id)?.[name] ?? "#000000").chroma < 0.01,
			).map((name) => `${scheme.id}/${name}`),
		);
		expect(grey).toEqual([]);
	});
});
