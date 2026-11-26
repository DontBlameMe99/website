/**
 * Pure transitions that need no catalog data. The provider uses these on every
 * route; seeding a custom set happens in theme_update.ts, loaded on demand.
 * Returning the current state means a change was rejected.
 */
import { EMPTY_CUSTOM, isCssValue, type ThemeState } from "~/lib/custom_theme";
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

export const setBuiltinStyle = (
	state: ThemeState,
	style: StyleChoice,
): ThemeState => ({
	...state,
	prefs: { ...state.prefs, style },
});

export const setBuiltinScheme = (
	state: ThemeState,
	scheme: SchemeChoice,
	slot?: Mode,
): ThemeState => ({
	...state,
	prefs: withScheme(state.prefs, scheme, slot),
});

export const setAccent = (state: ThemeState, accent: Accent): ThemeState => ({
	...state,
	prefs: { ...state.prefs, accent },
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
