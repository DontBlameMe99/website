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
	getScheme,
	isHex,
	PALETTE_TOKENS,
	type PaletteToken,
	resolvePrefs,
	ROOT_STYLE_TOKENS,
	type SchemeId,
	STORAGE_KEYS,
	STYLES,
	STYLE_TOKENS,
	STYLE_VALUE_MAX,
	type StoredPrefs,
	type StyleId,
	type StyleToken,
	type ThemePrefs,
} from "~/lib/themes";

type TokenInfo = {
	label: string;
	group: string;
};

/**
 * The editor's labels, keyed by the token lists in themes.ts. Every palette
 * token and every style token has one entry, so a new token fails the type
 * check until it gets a label.
 */
export const PALETTE_LABELS: Record<PaletteToken, TokenInfo> = {
	pink: { label: "Pink", group: "Accents" },
	mauve: { label: "Mauve", group: "Accents" },
	red: { label: "Red", group: "Accents" },
	maroon: { label: "Maroon", group: "Accents" },
	peach: { label: "Peach", group: "Accents" },
	yellow: { label: "Yellow", group: "Accents" },
	green: { label: "Green", group: "Accents" },
	teal: { label: "Teal", group: "Accents" },
	sky: { label: "Sky", group: "Accents" },
	sapphire: { label: "Sapphire", group: "Accents" },
	blue: { label: "Blue", group: "Accents" },
	lavender: { label: "Lavender", group: "Accents" },
	text: { label: "Text", group: "Ink" },
	"subtext1-base": { label: "Subtext 1", group: "Ink" },
	"subtext0-base": { label: "Subtext 0", group: "Ink" },
	"overlay2-base": { label: "Overlay 2", group: "Ink" },
	"overlay1-base": { label: "Overlay 1", group: "Ink" },
	overlay0: { label: "Overlay 0", group: "Ink" },
	ink: { label: "Ink", group: "Ink" },
	surface2: { label: "Surface 2", group: "Surfaces" },
	surface1: { label: "Surface 1", group: "Surfaces" },
	surface0: { label: "Surface 0", group: "Surfaces" },
	base: { label: "Base", group: "Surfaces" },
	mantle: { label: "Mantle", group: "Surfaces" },
	crust: { label: "Crust", group: "Surfaces" },
	"on-accent": { label: "Text on accent", group: "Fills" },
};

export const STYLE_LABELS: Record<StyleToken, TokenInfo> = {
	"font-sans": { label: "Font stack", group: "Type" },
	"button-weight": { label: "Button weight", group: "Type" },
	bw: { label: "Border width", group: "Shape" },
	"bw-heavy": { label: "Heavy border", group: "Shape" },
	"line-style": { label: "Border style", group: "Shape" },
	radius: { label: "Corner radius", group: "Shape" },
	"control-radius": { label: "Control radius", group: "Shape" },
	"panel-radius": { label: "Panel radius", group: "Shape" },
	"well-radius": { label: "Well radius", group: "Shape" },
	lift: { label: "Hover lift", group: "Shape" },
	press: { label: "Press offset", group: "Shape" },
	backdrop: { label: "Backdrop filter", group: "Shape" },
	edge: { label: "Edge", group: "Edges" },
	"control-edge": { label: "Control edge", group: "Edges" },
	"panel-edge": { label: "Panel edge", group: "Edges" },
	"panel-top-edge": { label: "Panel top edge", group: "Edges" },
	"well-edge": { label: "Well edge", group: "Edges" },
	"button-edge": { label: "Button edge", group: "Edges" },
	"hover-edge": { label: "Hover edge", group: "Edges" },
	"shadow-hard": { label: "Shadow", group: "Shadows" },
	"shadow-hard-lg": { label: "Large shadow", group: "Shadows" },
	"shadow-hard-sm": { label: "Small shadow", group: "Shadows" },
	"shadow-well": { label: "Well shadow", group: "Shadows" },
	"label-shadow": { label: "Label shadow", group: "Shadows" },
	"input-shadow": { label: "Input shadow", group: "Shadows" },
	"button-hover-shadow": { label: "Button hover shadow", group: "Shadows" },
	"button-press-shadow": { label: "Button press shadow", group: "Shadows" },
	"scrollbar-thumb-shadow": {
		label: "Scrollbar thumb shadow",
		group: "Shadows",
	},
	"scrollbar-track-shadow": {
		label: "Scrollbar track shadow",
		group: "Shadows",
	},
	"page-surface": { label: "Page fill", group: "Fills" },
	"panel-surface": { label: "Panel fill", group: "Fills" },
	"well-surface": { label: "Well fill", group: "Fills" },
	"plain-surface": { label: "Plain fill", group: "Fills" },
	"button-surface": { label: "Button fill", group: "Fills" },
	"hover-fill": { label: "Hover fill", group: "Fills" },
	"press-fill": { label: "Press fill", group: "Fills" },
	"card-hover-fill": { label: "Card hover fill", group: "Fills" },
	"accent-hover-fill": { label: "Accent hover fill", group: "Fills" },
	"accent-press-fill": { label: "Accent press fill", group: "Fills" },
	"page-image": { label: "Page image", group: "Images" },
	"panel-image": { label: "Panel image", group: "Images" },
	"well-image": { label: "Well image", group: "Images" },
	"plain-image": { label: "Plain image", group: "Images" },
	"button-image": { label: "Button image", group: "Images" },
	"accent-image": { label: "Accent image", group: "Images" },
	"scrollbar-thumb-image": { label: "Thumb image", group: "Images" },
	"button-ink": { label: "Button ink", group: "Ink" },
	"chip-accent-ink": { label: "Accent chip ink", group: "Ink" },
	"scrollbar-size": { label: "Scrollbar width", group: "Scrollbar" },
	"scrollbar-radius": { label: "Scrollbar radius", group: "Scrollbar" },
	"scrollbar-thumb": { label: "Thumb fill", group: "Scrollbar" },
	"scrollbar-thumb-line": { label: "Thumb line", group: "Scrollbar" },
	"scrollbar-track": { label: "Track fill", group: "Scrollbar" },
};

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

/** One table for the editor, in the order themes.ts lists the tokens. */
export const PALETTE_GROUPS = PALETTE_TOKENS.map((token) => ({
	token,
	...PALETTE_LABELS[token],
}));

export const STYLE_GROUPS = STYLE_TOKENS.map((token) => ({
	token,
	...STYLE_LABELS[token],
}));

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
const hex6 = (value: unknown): string | null => {
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

/* --- seeding -------------------------------------------------------------- */

const catalogTokens = (
	tokens: Record<string, string>,
): Record<string, string> =>
	Object.fromEntries(
		Object.entries(tokens)
			.filter(([name]) => name.startsWith("--"))
			.map(([name, value]) => [name.slice(2), value]),
	);
const VAR_ONLY = /^var\(\s*--([a-z0-9-]+)\s*\)$/i;

/** Mocha writes `--ink: var(--text)`; a palette copy needs the color itself. */
const resolveRefs = (
	values: Record<string, string>,
): Record<string, string> => {
	const resolved = { ...values };
	for (let pass = 0; pass < 4; pass++) {
		let changed = false;
		for (const [token, value] of Object.entries(resolved)) {
			const ref = VAR_ONLY.exec(value);
			if (!ref) continue;
			const target = resolved[ref[1]];
			if (!target || target === value) continue;
			resolved[token] = target;
			changed = true;
		}
		if (!changed) break;
	}
	return resolved;
};

/** A palette copy that is complete and answered by the catalog. */
export const seedPalette = (schemeId: SchemeId): CustomPalette | null => {
	const declarations = resolveRefs(catalogTokens(getScheme(schemeId).tokens));
	const palette: CustomPalette = {};
	for (const token of PALETTE_TOKENS) {
		const value = hex6(declarations[token]);
		if (!value) return null;
		palette[token] = value;
	}
	return palette;
};

const STYLE_TOKEN_SET = new Set<string>(STYLE_TOKENS);
/* Kept as references on purpose: the accent and the border bridge lean on the
   live theme, and a copy must keep following it. */
const DYNAMIC = new Set(["accent-surface", "color-border"]);
const REF = /var\(\s*--([a-z0-9-]+)\s*\)/gi;

/**
 * Fills in a style block's private declarations (`--aurora-*`, `--dos-*`,
 * `--xp-*`). They only exist inside that one style, so a copied value that
 * points at them would be invalid in a custom scope. A style token stays a
 * reference, so editing the target still moves it.
 */
export const expandStyleRefs = (
	value: string,
	declarations: Record<string, string>,
	depth = 0,
): string => {
	if (depth > 4) return value;
	return value.replace(REF, (ref, token: string) => {
		const target = declarations[token];
		if (target === undefined) return ref;
		if (STYLE_TOKEN_SET.has(token) || DYNAMIC.has(token)) return ref;
		return expandStyleRefs(target, declarations, depth + 1);
	});
};

/** Every token the defaults plus one style declare, in their authored form. */
export const seedStyle = (styleId: StyleId): CustomStyle => {
	const own = STYLES.find((style) => style.id === styleId);
	const merged = {
		...catalogTokens(ROOT_STYLE_TOKENS),
		...catalogTokens(own?.tokens ?? {}),
	};
	const tokens: CustomStyle = {};
	for (const token of STYLE_TOKENS) {
		const value = merged[token];
		if (value === undefined) continue;
		// The dev stylesheet keeps its line breaks in a declaration; a custom
		// property does not care, and the validator wants one line.
		const line = expandStyleRefs(value, merged).replace(/\s+/g, " ").trim();
		if (isCssValue(line)) tokens[token] = line;
	}
	return tokens;
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
