/**
 * Editor labels for the catalog tokens, with the grouped fields the theme
 * editor renders. custom_theme.ts re-exports them for existing imports.
 */

import { PALETTE_TOKENS, STYLE_TOKENS } from "./theme_catalog";

import type { PaletteToken, StyleToken } from "./themes";

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

/** One table for the editor, in the order themes.ts lists the tokens. */
export const PALETTE_GROUPS = PALETTE_TOKENS.map((token) => ({
	token,
	...PALETTE_LABELS[token],
}));

export const STYLE_GROUPS = STYLE_TOKENS.map((token) => ({
	token,
	...STYLE_LABELS[token],
}));
