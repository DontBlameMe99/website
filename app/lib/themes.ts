/**
 * Theme types, storage guards, and the plain-JS boot script. The catalog lives
 * in theme_catalog.ts and is re-exported here so existing imports keep working.
 */
import {
	ACCENT_HUES,
	ACCENT_TOKENS,
	FOCUS_RING_TOKENS,
	PALETTE_TOKENS,
	ROOT_SCHEME_TOKENS,
	ROOT_STYLE_TOKENS,
	SCHEMES,
	STYLE_TOKENS,
	STYLES,
	XP_DARK_TOKENS,
} from "./theme_catalog";

export {
	ACCENT_HUES,
	ACCENT_TOKENS,
	PALETTE_TOKENS,
	ROOT_SCHEME_TOKENS,
	ROOT_STYLE_TOKENS,
	SCHEMES,
	STYLE_TOKENS,
	STYLES,
};

export type AccentHue = (typeof ACCENT_HUES)[number];
export type Accent =
	| { kind: "hue"; hue: AccentHue }
	| { kind: "custom"; hex: string };

export type Mode = "dark" | "light";
export type StyleId =
	| "neobrutalist"
	| "flat"
	| "glassmorphism"
	| "xp"
	| "msdos"
	| "minecraft"
	| "material"
	| "futuristic"
	| "skeuomorphic";
export type SchemeId =
	| "frappe"
	| "macchiato"
	| "mocha"
	| "dracula"
	| "nord"
	| "mono"
	| "gruvbox-dark"
	| "solarized-dark"
	| "everforest-dark"
	| "latte"
	| "alucard"
	| "nord-light"
	| "mono-light"
	| "gruvbox-light"
	| "solarized-light"
	| "everforest-light";

/** A choice points at a built-in entry or at the visitor's own tokens. */
export type SchemeChoice = SchemeId | "custom";
export type StyleChoice = StyleId | "custom";

export type PaletteToken = (typeof PALETTE_TOKENS)[number];
export type StyleToken = (typeof STYLE_TOKENS)[number];

/**
 * An expanded page image is long: a style copied from the built CSS can carry a
 * gradient over a formatter's line budget. The boot script and the validator
 * must agree on the cap, or the first paint drops a value hydration keeps.
 */
export const STYLE_VALUE_MAX = 2000;

export type Style = {
	id: StyleId;
	label: string;
	blurb: string;
	tokens: Record<string, string>;
};

export type ColorScheme = {
	id: SchemeId;
	label: string;
	mode: Mode;
	blurb: string;
	tokens: Record<string, string>;
};

export const DARK_SCHEMES: readonly ColorScheme[] = SCHEMES.filter(
	(scheme) => scheme.mode === "dark",
);

export const LIGHT_SCHEMES: readonly ColorScheme[] = SCHEMES.filter(
	(scheme) => scheme.mode === "light",
);

export type ThemePrefs = {
	mode: Mode;
	style: StyleChoice;
	darkScheme: SchemeChoice;
	lightScheme: SchemeChoice;
	accent: Accent;
};

export const STORAGE_KEYS = {
	mode: "dbm-theme",
	style: "dbm-style",
	darkScheme: "dbm-dark-scheme",
	lightScheme: "dbm-light-scheme",
	accent: "dbm-accent",
	custom: "dbm-custom",
} as const;

export const DEFAULT_PREFS = {
	mode: "dark",
	style: "neobrutalist",
	darkScheme: "mocha",
	lightScheme: "latte",
	accent: { kind: "hue", hue: "mauve" },
} as const satisfies ThemePrefs;

export const isMode = (value: unknown): value is Mode =>
	value === "dark" || value === "light";

export const isStyleId = (value: unknown): value is StyleId =>
	STYLES.some((style) => style.id === value);

export const isStyleChoice = (value: unknown): value is StyleChoice =>
	value === "custom" || isStyleId(value);

const HEX = /^#[0-9a-f]{6}$/i;

export const isHex = (value: unknown): value is string =>
	typeof value === "string" && HEX.test(value);

const isAccentHue = (value: unknown): value is AccentHue =>
	ACCENT_HUES.includes(value as AccentHue);

/** Storage holds the hue name or the hex itself, so there is nothing to migrate. */
export const accentToStored = (accent: Accent): string =>
	accent.kind === "hue" ? accent.hue : accent.hex;

export const resolveAccent = (value: unknown): Accent => {
	if (isAccentHue(value)) return { kind: "hue", hue: value };
	if (typeof value === "string" && HEX.test(value))
		return { kind: "custom", hex: value.toLowerCase() };
	return DEFAULT_PREFS.accent;
};

/**
 * Where dark and white ink trade places. The later of the two always carries at
 * least 4.3:1, which is the best a two-ink choice can do at the crossover.
 */
const INK_THRESHOLD = 0.192;

/** Ink for a custom fill: dark or white, whichever the color can carry. */
export const inkOn = (hex: string): string => {
	const toLinear = (channel: number) => {
		const c = channel / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	const value = Number.parseInt(hex.slice(1), 16);
	const luminance =
		0.2126 * toLinear((value >> 16) & 255) +
		0.7152 * toLinear((value >> 8) & 255) +
		0.0722 * toLinear(value & 255);
	return luminance > INK_THRESHOLD ? "#11111b" : "#ffffff";
};

/** A scheme belongs to one brightness, so it can never be picked for the other.
 * A custom palette belongs to a brightness too, but whether one was saved is a
 * separate question: the caller checks that before painting.
 */
export const isSchemeForMode = (
	value: unknown,
	mode: Mode,
): value is SchemeChoice =>
	value === "custom" ||
	SCHEMES.some((scheme) => scheme.id === value && scheme.mode === mode);

export const schemeForMode = (
	mode: Mode,
	darkScheme: SchemeChoice,
	lightScheme: SchemeChoice,
): SchemeChoice => (mode === "dark" ? darkScheme : lightScheme);

export const getScheme = (id: SchemeId): ColorScheme =>
	SCHEMES.find((scheme) => scheme.id === id) ?? SCHEMES[0];

/**
 * Saves a scheme for its own brightness without changing the brightness in
 * use. A dark page can keep a light palette on file for later. A custom entry
 * has no brightness of its own, so the caller names the slot for it.
 */
export const withScheme = (
	prefs: ThemePrefs,
	id: SchemeChoice,
	mode: Mode = prefs.mode,
): ThemePrefs => {
	const slot = id === "custom" ? mode : getScheme(id).mode;
	return slot === "dark"
		? { ...prefs, darkScheme: id }
		: { ...prefs, lightScheme: id };
};

export type StoredPrefs = Partial<Record<keyof ThemePrefs, string | null>>;

/** Storage is user-editable, so every value gets checked before it is used. */
export function resolvePrefs(
	stored: StoredPrefs,
	fallbackMode: Mode = DEFAULT_PREFS.mode,
): ThemePrefs {
	const darkScheme = isSchemeForMode(stored.darkScheme, "dark")
		? stored.darkScheme
		: DEFAULT_PREFS.darkScheme;
	const lightScheme = isSchemeForMode(stored.lightScheme, "light")
		? stored.lightScheme
		: DEFAULT_PREFS.lightScheme;

	return {
		mode: isMode(stored.mode) ? stored.mode : fallbackMode,
		style: isStyleChoice(stored.style) ? stored.style : DEFAULT_PREFS.style,
		darkScheme,
		lightScheme,
		accent: resolveAccent(stored.accent),
	};
}

/**
 * Runs before hydration so the first paint already has the right shape,
 * palette, and accent. Duplicates resolvePrefs and the custom-token validation
 * in plain JS on purpose: it may not import a module, and a flash of the wrong
 * theme is worse than one short copy.
 */
export const themeBootScript = `
	(function () {
		var ids = {
			style: ${JSON.stringify(STYLES.map((style) => style.id))},
			dark: ${JSON.stringify(DARK_SCHEMES.map((scheme) => scheme.id))},
			light: ${JSON.stringify(LIGHT_SCHEMES.map((scheme) => scheme.id))},
			accent: ${JSON.stringify(ACCENT_HUES)}
		};
		var keys = ${JSON.stringify(STORAGE_KEYS)};
		var palette = ${JSON.stringify(PALETTE_TOKENS)};
		var styles = ${JSON.stringify(STYLE_TOKENS)};
		var hex = /^#[0-9a-f]{6}$/i;
		var unsafe = /[;{}<>\\\\]/;
		var read = function (key) {
			try { return localStorage.getItem(key); } catch (e) { return null; }
		};
		var valid = function (value, list) { return list.indexOf(value) !== -1; };
		var color = function (value) {
			return typeof value === 'string' && hex.test(value);
		};
		var ink = function (value) {
			var toLinear = function (channel) {
				var c = channel / 255;
				return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
			};
			var n = parseInt(value.slice(1), 16);
			var luminance =
				0.2126 * toLinear((n >> 16) & 255) +
				0.7152 * toLinear((n >> 8) & 255) +
				0.0722 * toLinear(n & 255);
			return luminance > ${INK_THRESHOLD} ? '#11111b' : '#ffffff';
		};
		var paletteOf = function (raw) {
			if (!raw || typeof raw !== 'object') return null;
			var out = {};
			for (var i = 0; i < palette.length; i++) {
				var value = raw[palette[i]];
				if (!color(value)) return null;
				out[palette[i]] = value.toLowerCase();
			}
			return out;
		};
		var styleOf = function (raw) {
			if (!raw || typeof raw !== 'object') return null;
			var out = {};
			for (var token in raw) {
				if (!Object.prototype.hasOwnProperty.call(raw, token)) continue;
				var value = raw[token];
				if (!valid(token, styles) || typeof value !== 'string') continue;
				if (!value || value.length > ${STYLE_VALUE_MAX} || unsafe.test(value)) continue;
				out[token] = value;
			}
			return out;
		};
		var pick = function (stored, list, fallback, own) {
			if (valid(stored, list)) return stored;
			if (stored === 'custom' && own) return 'custom';
			return fallback;
		};

		var root = document.documentElement;
		var mode = read(keys.mode);
		if (mode !== 'light' && mode !== 'dark') {
			mode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		}

		var custom = { dark: null, light: null, style: null };
		var saved = read(keys.custom);
		if (saved) {
			try {
				var parsed = JSON.parse(saved);
				custom.dark = paletteOf(parsed.dark);
				custom.light = paletteOf(parsed.light);
				custom.style = styleOf(parsed.style);
			} catch (e) {}
		}

		var style = pick(read(keys.style), ids.style, ${JSON.stringify(DEFAULT_PREFS.style)}, custom.style);
		var dark = pick(read(keys.darkScheme), ids.dark, ${JSON.stringify(DEFAULT_PREFS.darkScheme)}, custom.dark);
		var light = pick(read(keys.lightScheme), ids.light, ${JSON.stringify(DEFAULT_PREFS.lightScheme)}, custom.light);
		var accent = read(keys.accent);
		var scheme = mode === 'dark' ? dark : light;

		root.classList.remove('light', 'dark');
		root.classList.add(mode);
		root.dataset.style = style;
		root.dataset.scheme = scheme;
		/* A custom palette has no scheme block to declare its brightness, and the
		   build lowers light-dark() to this pair. */
		root.style.colorScheme = mode;
		root.style.setProperty('--lightningcss-light', mode === 'light' ? 'initial' : ' ');
		root.style.setProperty('--lightningcss-dark', mode === 'dark' ? 'initial' : ' ');

		var write = function (tokens) {
			if (!tokens) return;
			for (var token in tokens) {
				if (Object.prototype.hasOwnProperty.call(tokens, token)) {
					root.style.setProperty('--' + token, tokens[token]);
				}
			}
		};
		if (scheme === 'custom') write(custom[mode]);
		if (style === 'custom') write(custom.style);

		if (accent && hex.test(accent)) {
			root.style.setProperty('--accent-surface', accent);
			root.style.setProperty('--on-accent', ink(accent));
		} else {
			root.dataset.accent = valid(accent, ids.accent) ? accent : ${JSON.stringify(
				DEFAULT_PREFS.accent.kind === "hue"
					? DEFAULT_PREFS.accent.hue
					: "mauve",
			)};
		}
	})();
`;

/** Attribute-scoped custom properties emitted by app/theme_plugin.ts. */
export function themeTokenBlocks(): {
	selector: string;
	declarations: Record<string, string>;
}[] {
	return [
		{
			selector: ':root, [data-scheme="mocha"]',
			declarations: ROOT_SCHEME_TOKENS,
		},
		{ selector: ":root, [data-style]", declarations: ROOT_STYLE_TOKENS },
		...SCHEMES.filter((scheme) => scheme.id !== "mocha").map((scheme) => ({
			selector: `[data-scheme="${scheme.id}"]`,
			declarations: scheme.tokens,
		})),
		...ACCENT_HUES.map((hue) => ({
			selector: `[data-accent="${hue}"]`,
			declarations: ACCENT_TOKENS[hue],
		})),
		...STYLES.map((style) => ({
			selector: `[data-style="${style.id}"]`,
			declarations: style.tokens,
		})),
		{ selector: '.dark[data-style="xp"]', declarations: XP_DARK_TOKENS },
		{ selector: ":root", declarations: FOCUS_RING_TOKENS },
	];
}
