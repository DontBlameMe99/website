/**
 * The theming catalog: one list of shapes, one list per brightness, and the pure
 * helpers that keep stored values honest. The palettes themselves live in
 * app.css, keyed by `data-scheme`, so a preview can scope a scheme to any
 * element without duplicating a single hex value here.
 */

export type Mode = "dark" | "light";
export type StyleId = "neobrutalist" | "flat";
export type SchemeId =
	| "frappe"
	| "macchiato"
	| "mocha"
	| "nord"
	| "mono"
	| "gruvbox-dark"
	| "solarized-dark"
	| "latte"
	| "nord-light"
	| "mono-light"
	| "gruvbox-light"
	| "solarized-light";

export type Style = {
	id: StyleId;
	label: string;
	blurb: string;
};

export type ColorScheme = {
	id: SchemeId;
	label: string;
	mode: Mode;
	blurb: string;
};

export const STYLES: readonly Style[] = [
	{
		id: "neobrutalist",
		label: "Neobrutalist",
		blurb: "Heavy ink, hard shadows, square corners.",
	},
	{
		id: "flat",
		label: "Flat",
		blurb: "Hairline rules, soft corners, no shadows.",
	},
];

export const SCHEMES: readonly ColorScheme[] = [
	{
		id: "frappe",
		label: "Catppuccin Frappé",
		mode: "dark",
		blurb: "Cool, muted, and easy on the eyes.",
	},
	{
		id: "macchiato",
		label: "Catppuccin Macchiato",
		mode: "dark",
		blurb: "Cool and crisp, with brighter accents.",
	},
	{
		id: "mocha",
		label: "Catppuccin Mocha",
		mode: "dark",
		blurb: "Deep and saturated.",
	},
	{
		id: "nord",
		label: "Nord",
		mode: "dark",
		blurb: "Arctic blues on Polar Night.",
	},
	{
		id: "mono",
		label: "Monochrome",
		mode: "dark",
		blurb: "Greys only. Paper cut out of the dark.",
	},
	{
		id: "gruvbox-dark",
		label: "Gruvbox Dark",
		mode: "dark",
		blurb: "Warm brown, with bright retro accents.",
	},
	{
		id: "solarized-dark",
		label: "Solarized Dark",
		mode: "dark",
		blurb: "Deep blue canvas, calm teal ink.",
	},
	{
		id: "latte",
		label: "Catppuccin Latte",
		mode: "light",
		blurb: "Creamy light, with strong contrast.",
	},
	{
		id: "nord-light",
		label: "Nord Light",
		mode: "light",
		blurb: "Snow Storm, with deep frost.",
	},
	{
		id: "mono-light",
		label: "Monochrome Light",
		mode: "light",
		blurb: "The same greys, inverted onto white paper.",
	},
	{
		id: "gruvbox-light",
		label: "Gruvbox Light",
		mode: "light",
		blurb: "Creamy tan, with deep retro inks.",
	},
	{
		id: "solarized-light",
		label: "Solarized Light",
		mode: "light",
		blurb: "Warm cream canvas, calm teal ink.",
	},
];

export const DARK_SCHEMES: readonly ColorScheme[] = SCHEMES.filter(
	(scheme) => scheme.mode === "dark",
);

export const LIGHT_SCHEMES: readonly ColorScheme[] = SCHEMES.filter(
	(scheme) => scheme.mode === "light",
);

export type ThemePrefs = {
	mode: Mode;
	style: StyleId;
	darkScheme: SchemeId;
	lightScheme: SchemeId;
};

export const STORAGE_KEYS = {
	mode: "dbm-theme",
	style: "dbm-style",
	darkScheme: "dbm-dark-scheme",
	lightScheme: "dbm-light-scheme",
} as const;

export const DEFAULT_PREFS: ThemePrefs = {
	mode: "dark",
	style: "neobrutalist",
	darkScheme: "mocha",
	lightScheme: "latte",
};

export const isMode = (value: unknown): value is Mode =>
	value === "dark" || value === "light";

export const isStyleId = (value: unknown): value is StyleId =>
	STYLES.some((style) => style.id === value);

/** A scheme belongs to one brightness, so it can never be picked for the other. */
export const isSchemeForMode = (
	value: unknown,
	mode: Mode,
): value is SchemeId =>
	SCHEMES.some((scheme) => scheme.id === value && scheme.mode === mode);

export const schemeForMode = (
	mode: Mode,
	darkScheme: SchemeId,
	lightScheme: SchemeId,
): SchemeId => (mode === "dark" ? darkScheme : lightScheme);

export const getScheme = (id: SchemeId): ColorScheme =>
	SCHEMES.find((scheme) => scheme.id === id) ?? SCHEMES[0];

/**
 * Saves a scheme for its own brightness without changing the brightness in
 * use. A dark page can keep a light palette on file for later.
 */
export const withScheme = (prefs: ThemePrefs, id: SchemeId): ThemePrefs =>
	getScheme(id).mode === "dark"
		? { ...prefs, darkScheme: id }
		: { ...prefs, lightScheme: id };

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
		style: isStyleId(stored.style) ? stored.style : DEFAULT_PREFS.style,
		darkScheme,
		lightScheme,
	};
}

/**
 * Runs before hydration so the first paint already has the right shape and
 * palette. Duplicates resolvePrefs in plain JS on purpose: it may not import a
 * module, and a flash of the wrong theme is worse than one short copy.
 */
export const themeBootScript = `
	(function () {
		var ids = {
			style: ${JSON.stringify(STYLES.map((style) => style.id))},
			dark: ${JSON.stringify(DARK_SCHEMES.map((scheme) => scheme.id))},
			light: ${JSON.stringify(LIGHT_SCHEMES.map((scheme) => scheme.id))}
		};
		var keys = ${JSON.stringify(STORAGE_KEYS)};
		var read = function (key) {
			try { return localStorage.getItem(key); } catch (e) { return null; }
		};
		var valid = function (value, list) { return list.indexOf(value) !== -1; };
		var root = document.documentElement;

		var mode = read(keys.mode);
		if (mode !== 'light' && mode !== 'dark') {
			mode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		}
		var style = read(keys.style);
		var dark = read(keys.darkScheme);
		var light = read(keys.lightScheme);

		root.classList.remove('light', 'dark');
		root.classList.add(mode);
		root.dataset.style = valid(style, ids.style) ? style : ${JSON.stringify(DEFAULT_PREFS.style)};
		if (mode === 'dark') {
			root.dataset.scheme = valid(dark, ids.dark) ? dark : ${JSON.stringify(DEFAULT_PREFS.darkScheme)};
		} else {
			root.dataset.scheme = valid(light, ids.light) ? light : ${JSON.stringify(DEFAULT_PREFS.lightScheme)};
		}
	})();
`;
