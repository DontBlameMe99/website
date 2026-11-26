/**
 * Pure theme state transitions. The provider owns React, painting and storage;
 * these functions only decide what the next state is. Returning the current
 * state means a change was rejected and nothing should happen.
 */
import {
	EMPTY_CUSTOM,
	isCssValue,
	seedPalette,
	seedStyle,
	type ThemeState,
} from "~/lib/custom_theme";
import {
	type Accent,
	DEFAULT_PREFS,
	type Mode,
	type SchemeChoice,
	type SchemeId,
	type StyleChoice,
	type StyleId,
	withScheme,
} from "~/lib/themes";

/** The built-in a slot starts from: its own choice, or the default. */
export const seedSource = (
	prefs: ThemeState["prefs"],
	mode: Mode,
): SchemeId => {
	const choice = mode === "dark" ? prefs.darkScheme : prefs.lightScheme;
	if (choice !== "custom") return choice;
	return mode === "dark" ? DEFAULT_PREFS.darkScheme : DEFAULT_PREFS.lightScheme;
};

export const styleSource = (prefs: ThemeState["prefs"]): StyleId =>
	prefs.style === "custom" ? DEFAULT_PREFS.style : prefs.style;

export const setMode = (state: ThemeState, mode: Mode): ThemeState => ({
	...state,
	prefs: { ...state.prefs, mode },
});

export const setStyle = (state: ThemeState, style: StyleChoice): ThemeState => {
	if (style !== "custom") return { ...state, prefs: { ...state.prefs, style } };
	const tokens = state.custom.style ?? seedStyle(styleSource(state.prefs));
	return {
		prefs: { ...state.prefs, style },
		custom: { ...state.custom, style: tokens },
	};
};

export const setScheme = (
	state: ThemeState,
	scheme: SchemeChoice,
	slot?: Mode,
): ThemeState => {
	const prefs = withScheme(state.prefs, scheme, slot);
	if (scheme !== "custom") return { ...state, prefs };

	// The first pick starts from the palette in use for that mode.
	const mode = slot ?? state.prefs.mode;
	const palette =
		state.custom[mode] ?? seedPalette(seedSource(state.prefs, mode));
	if (!palette) return state;
	return {
		prefs,
		custom: { ...state.custom, [mode]: palette },
	};
};

export const setAccent = (state: ThemeState, accent: Accent): ThemeState => ({
	...state,
	prefs: { ...state.prefs, accent },
});

export const copyPalette = (
	state: ThemeState,
	mode: Mode,
	from: SchemeId,
): ThemeState => {
	const palette = seedPalette(from);
	if (!palette) return state;
	return { ...state, custom: { ...state.custom, [mode]: palette } };
};

export const copyStyle = (state: ThemeState, from: StyleId): ThemeState => ({
	...state,
	custom: { ...state.custom, style: seedStyle(from) },
});

export const setPaletteToken = (
	state: ThemeState,
	mode: Mode,
	token: string,
	hex: string,
): ThemeState => {
	const palette = state.custom[mode];
	if (!palette) return state;
	return {
		...state,
		custom: {
			...state.custom,
			[mode]: { ...palette, [token]: hex },
		},
	};
};

export const setStyleToken = (
	state: ThemeState,
	token: string,
	value: string,
): ThemeState => {
	const style = { ...state.custom.style };
	// Store what was typed, spaces included: a value is often several parts,
	// and trimming each keystroke eats the joins.
	if (!value.trim()) delete style[token];
	else if (isCssValue(value)) style[token] = value;
	else return state;
	return { ...state, custom: { ...state.custom, style } };
};

export const resetCustom = (state: ThemeState): ThemeState => ({
	prefs: {
		...state.prefs,
		darkScheme: DEFAULT_PREFS.darkScheme,
		lightScheme: DEFAULT_PREFS.lightScheme,
		style: DEFAULT_PREFS.style,
		accent: DEFAULT_PREFS.accent,
	},
	custom: EMPTY_CUSTOM,
});
