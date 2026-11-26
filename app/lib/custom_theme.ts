/**
 * Custom themes: the visitor's own palettes and style, plus the validation and
 * sharing around them. A custom palette replaces every color a scheme defines,
 * so any colorscheme fits. A custom style overrides the shape tokens a built-in
 * style starts from, so a look the catalog does not have fits too.
 *
 * Values are stored as plain CSS. Nothing here needs to know what a token
 * paints, which is also why the editor can render the catalog from one table.
 */
import {
	ACCENT_HUES,
	accentToStored,
	DEFAULT_PREFS,
	isHex,
	PALETTE_TOKENS,
	type PaletteToken,
	resolvePrefs,
	STORAGE_KEYS,
	STYLE_TOKENS,
	STYLE_VALUE_MAX,
	type StoredPrefs,
	type ThemePrefs,
} from "~/lib/themes";
import {
	PALETTE_GROUPS,
	PALETTE_LABELS,
	STYLE_GROUPS,
	STYLE_LABELS,
} from "./theme_labels";

export { PALETTE_GROUPS, PALETTE_LABELS, STYLE_GROUPS, STYLE_LABELS };

/** A palette is complete, so a stored or imported one is all 26 colors. */
export type CustomPalette = Record<string, string>;
export type CustomStyle = Record<string, string>;

export type CustomTheme = {
	dark: CustomPalette | null;
	light: CustomPalette | null;
	style: CustomStyle | null;
};

export type ThemeState = {
	prefs: ThemePrefs;
	custom: CustomTheme;
};

export const EMPTY_CUSTOM: CustomTheme = {
	dark: null,
	light: null,
	style: null,
};

/**
 * A value is written straight into an inline custom property, so it has to stay
 * one value: a semicolon or a brace could start a declaration of its own, and
 * the cap keeps a paste from filling storage.
 */
const hasControl = (value: string) => {
	for (const char of value) if (char < " ") return true;
	return false;
};

export const isCssValue = (value: unknown): value is string =>
	typeof value === "string" &&
	value.trim().length > 0 &&
	value.length <= STYLE_VALUE_MAX &&
	!hasControl(value) &&
	!/[;{}<>\\]/.test(value);

const SHORT_HEX = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;

/** The build minifies #ffffff to #fff; storage and the pickers hold six. */
export const hex6 = (value: unknown): string | null => {
	if (typeof value !== "string") return null;
	const short = SHORT_HEX.exec(value);
	if (!short) return isHex(value) ? value.toLowerCase() : null;
	return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
};

const pickPalette = (value: unknown): CustomPalette | null => {
	if (!value || typeof value !== "object") return null;
	const palette: CustomPalette = {};
	for (const token of PALETTE_TOKENS) {
		const hex = hex6((value as Record<string, unknown>)[token]);
		if (!hex) return null;
		palette[token] = hex.toLowerCase();
	}
	return palette;
};

/**
 * A style is sparse: an absent token keeps whatever the defaults say. An empty
 * object is still a style the visitor saved, so it stays one, and the boot
 * script and the import check agree with that.
 */
const pickStyle = (value: unknown): CustomStyle | null => {
	if (!value || typeof value !== "object") return null;
	const style: CustomStyle = {};
	for (const token of STYLE_TOKENS) {
		const item = (value as Record<string, unknown>)[token];
		if (isCssValue(item)) style[token] = item.trim();
	}
	return style;
};

/** Storage and pasted files are user-editable, so every value gets checked. */
export const resolveCustomTheme = (value: unknown): CustomTheme => {
	const raw = (value ?? {}) as Record<string, unknown>;
	return {
		dark: pickPalette(raw.dark),
		light: pickPalette(raw.light),
		style: pickStyle(raw.style),
	};
};

export const isEmptyCustom = (custom: CustomTheme): boolean =>
	!custom.dark && !custom.light && !custom.style;

/**
 * A saved choice can point at a custom set that is no longer there, for example
 * after clearing site data. Fall back per axis instead of painting a scheme
 * attribute that no palette answers.
 */
export const resolveSelection = (
	prefs: ThemePrefs,
	custom: CustomTheme,
): ThemePrefs => ({
	...prefs,
	darkScheme:
		prefs.darkScheme === "custom" && !custom.dark
			? DEFAULT_PREFS.darkScheme
			: prefs.darkScheme,
	lightScheme:
		prefs.lightScheme === "custom" && !custom.light
			? DEFAULT_PREFS.lightScheme
			: prefs.lightScheme,
	style:
		prefs.style === "custom" && !custom.style
			? DEFAULT_PREFS.style
			: prefs.style,
});

/* --- storage -------------------------------------------------------------- */

export const readCustomTheme = (): CustomTheme => {
	try {
		const raw = localStorage.getItem(STORAGE_KEYS.custom);
		return raw ? resolveCustomTheme(JSON.parse(raw)) : EMPTY_CUSTOM;
	} catch {
		// Storage can be blocked or hold junk. The defaults still paint.
		return EMPTY_CUSTOM;
	}
};

export const writeCustomTheme = (custom: CustomTheme) => {
	try {
		if (isEmptyCustom(custom)) {
			localStorage.removeItem(STORAGE_KEYS.custom);
			return;
		}
		localStorage.setItem(STORAGE_KEYS.custom, JSON.stringify(custom));
	} catch {
		// The theme still applies for this page view.
	}
};

/* --- contrast ------------------------------------------------------------- */

const toLinear = (channel: number) => {
	const value = channel / 255;
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const luminance = (hex: string): number => {
	const value = Number.parseInt(hex.slice(1), 16);
	return (
		0.2126 * toLinear((value >> 16) & 255) +
		0.7152 * toLinear((value >> 8) & 255) +
		0.0722 * toLinear(value & 255)
	);
};

export const contrastRatio = (a: string, b: string): number => {
	const first = luminance(a);
	const second = luminance(b);
	const lighter = Math.max(first, second);
	const darker = Math.min(first, second);
	return (lighter + 0.05) / (darker + 0.05);
};

/** The floor the built-in catalogs have to clear, in both modes and both states. */
export const AAA = 7;

const INK_TOKENS: PaletteToken[] = [
	"text",
	"subtext1-base",
	"subtext0-base",
	"overlay2-base",
	"overlay1-base",
	"overlay0",
	"ink",
];

const SURFACE_TOKENS: PaletteToken[] = ["base", "mantle", "crust", "surface0"];

export type ContrastFailure = {
	ink: string;
	surface: string;
	ratio: number;
};

/**
 * The pairs the site's own audit checks: the ink ramp on each surface it
 * renders on, and the fill text on every accent. A custom palette is not
 * audited, so the editor reports the same pairs instead.
 */
export const contrastFailures = (palette: CustomPalette): ContrastFailure[] => {
	const failures: ContrastFailure[] = [];
	const pair = (ink: PaletteToken, surface: PaletteToken) => {
		const foreground = palette[ink];
		const background = palette[surface];
		if (!isHex(foreground) || !isHex(background)) return;
		const ratio = contrastRatio(foreground, background);
		if (ratio >= AAA) return;
		failures.push({
			ink: PALETTE_LABELS[ink].label,
			surface: PALETTE_LABELS[surface].label,
			ratio,
		});
	};

	for (const ink of INK_TOKENS)
		for (const surface of SURFACE_TOKENS) pair(ink, surface);
	for (const hue of ACCENT_HUES) pair("on-accent", hue);

	return failures.sort((a, b) => a.ratio - b.ratio);
};

/* --- sharing -------------------------------------------------------------- */

export const themeFile = ({ prefs, custom }: ThemeState): string =>
	JSON.stringify(
		{
			version: 1,
			mode: prefs.mode,
			style: prefs.style,
			darkScheme: prefs.darkScheme,
			lightScheme: prefs.lightScheme,
			accent: accentToStored(prefs.accent),
			custom,
		},
		null,
		2,
	);

/**
 * Reads the same shape `themeFile` writes. A file that names a custom set it
 * does not carry is an error rather than a silent downgrade, so an imported
 * theme looks like the one that was shared.
 */
export const readThemeFile = (
	text: string,
): { state: ThemeState } | { error: string } => {
	let raw: unknown;
	try {
		raw = JSON.parse(text);
	} catch {
		return { error: "That is not JSON." };
	}
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
		return { error: "A theme file is a JSON object." };
	}

	const record = raw as Record<string, unknown>;
	const custom = resolveCustomTheme(record.custom);
	const string = (value: unknown) => (typeof value === "string" ? value : null);
	const stored: StoredPrefs = {
		mode: string(record.mode),
		style: string(record.style),
		darkScheme: string(record.darkScheme),
		lightScheme: string(record.lightScheme),
		accent: string(record.accent),
	};
	const prefs = resolvePrefs(stored);

	// A set that is present is carried, even when every style field is empty.
	const carries = (slot: "dark" | "light" | "style") => !!custom[slot];
	const missing = (
		[
			["darkScheme", "dark"],
			["lightScheme", "light"],
			["style", "style"],
		] as const
	).find(([key, slot]) => prefs[key] === "custom" && !carries(slot));
	if (missing) {
		return {
			error: `The file picks a custom ${missing[1]} set but does not carry one.`,
		};
	}

	return { state: { prefs, custom } };
};
