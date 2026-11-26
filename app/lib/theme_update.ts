/**
 * Pure theme state transitions that need the built-in token blocks. The
 * provider loads this module when a custom set is first created; importing it
 * registers the seeded transitions so its public actions stay synchronous.
 */
import type { ThemeState } from "~/lib/custom_theme";
import { seedPalette, seedStyle } from "~/lib/theme_seeds";
import {
	seedSource,
	setBuiltinStyle,
	styleSource,
} from "~/lib/theme_update_core";
import {
	type Mode,
	type SchemeChoice,
	type SchemeId,
	type StyleChoice,
	type StyleId,
	withScheme,
} from "~/lib/themes";

export {
	resetCustom,
	seedSource,
	setAccent,
	setBuiltinScheme,
	setBuiltinStyle,
	setMode,
	setPaletteToken,
	setStyleToken,
	styleSource,
} from "~/lib/theme_update_core";

export const setStyle = (state: ThemeState, style: StyleChoice): ThemeState => {
	if (style !== "custom") return setBuiltinStyle(state, style);
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

export const seededActions = {
	setStyle: (state: ThemeState) => setStyle(state, "custom"),
	setScheme: (state: ThemeState, slot?: Mode) =>
		setScheme(state, "custom", slot),
	copyPalette,
	copyStyle,
};
