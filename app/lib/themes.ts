/**
 * The theming catalog: one list of shapes, one list per brightness, and the pure
 * helpers that keep stored values honest. The palette and style values live in
 * this catalog with each entry. Tailwind emits them as CSS variables keyed by
 * `data-scheme` and `data-style`, so a preview can scope a theme to any element
 * from the same source.
 */

/**
 * The accent is either one of the hues every palette defines, or a raw hex.
 * A hue name is a pointer into the scheme in use, so one pick follows every
 * colorscheme and both brightnesses without a value per combination.
 */
export const ACCENT_HUES = [
	"pink",
	"mauve",
	"red",
	"maroon",
	"peach",
	"yellow",
	"green",
	"teal",
	"sky",
	"sapphire",
	"blue",
	"lavender",
] as const;

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

/**
 * The colors a palette owns: everything a scheme block colors, minus the tokens
 * it derives. A custom palette replaces all of them at once, so its stored form
 * is complete and a missing color can never fall back to another scheme's.
 *
 * The boot script needs this list before any module loads, so it lives here
 * next to the catalog rather than with the editor's labels.
 */
export const PALETTE_TOKENS = [
	"pink",
	"mauve",
	"red",
	"maroon",
	"peach",
	"yellow",
	"green",
	"teal",
	"sky",
	"sapphire",
	"blue",
	"lavender",
	"text",
	"subtext1-base",
	"subtext0-base",
	"overlay2-base",
	"overlay1-base",
	"overlay0",
	"ink",
	"surface2",
	"surface1",
	"surface0",
	"base",
	"mantle",
	"crust",
	"on-accent",
] as const;

export type PaletteToken = (typeof PALETTE_TOKENS)[number];

/**
 * The shape tokens a style owns. A custom style overrides any subset of them,
 * so an absent token keeps whatever the default block says.
 */
export const STYLE_TOKENS = [
	"font-sans",
	"button-weight",
	"bw",
	"bw-heavy",
	"line-style",
	"radius",
	"control-radius",
	"panel-radius",
	"well-radius",
	"edge",
	"control-edge",
	"panel-edge",
	"panel-top-edge",
	"well-edge",
	"button-edge",
	"hover-edge",
	"lift",
	"press",
	"backdrop",
	"shadow-hard",
	"shadow-hard-lg",
	"shadow-hard-sm",
	"shadow-well",
	"label-shadow",
	"input-shadow",
	"button-hover-shadow",
	"button-press-shadow",
	"scrollbar-thumb-shadow",
	"scrollbar-track-shadow",
	"page-surface",
	"panel-surface",
	"well-surface",
	"plain-surface",
	"button-surface",
	"hover-fill",
	"press-fill",
	"card-hover-fill",
	"accent-hover-fill",
	"accent-press-fill",
	"page-image",
	"panel-image",
	"well-image",
	"plain-image",
	"button-image",
	"accent-image",
	"scrollbar-thumb-image",
	"button-ink",
	"chip-accent-ink",
	"scrollbar-size",
	"scrollbar-radius",
	"scrollbar-thumb",
	"scrollbar-thumb-line",
	"scrollbar-track",
] as const;

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

export const STYLES: readonly Style[] = [
	{
		id: "neobrutalist",
		label: "Neobrutalist",
		blurb: "Heavy ink, hard shadows, square corners.",
		tokens: {
			"--bw": "3px",
			"--bw-heavy": "14px",
			"--lift": "-3px",
			"--press": "3px",
			"--radius": "0px",
			"--control-radius": "0px",
			"--edge": "var(--ink)",
			"--control-edge": "var(--ink)",
			"--panel-edge": "var(--bw) solid var(--edge)",
			"--panel-top-edge": "var(--bw) solid var(--edge)",
			"--well-edge": "var(--bw) solid var(--edge)",
			"--button-edge": "var(--bw) solid var(--edge)",
			"--button-weight": "800",
			"--shadow-hard": "7px 7px 0 var(--ink)",
			"--shadow-hard-lg": "11px 11px 0 var(--ink)",
			"--shadow-hard-sm": "4px 4px 0 var(--ink)",
			"--shadow-well":
				"inset 4px 4px 0 color-mix(in srgb, var(--ink) 30%, transparent)",
			"--input-shadow": "var(--shadow-well)",
			"--button-hover-shadow": "5px 5px 0 var(--ink)",
			"--button-press-shadow": "1px 1px 0 var(--ink)",
			"--hover-edge": "var(--ink)",
			"--hover-fill": "var(--plain-surface)",
			"--press-fill": "var(--plain-surface)",
			"--card-hover-fill": "var(--panel-surface)",
			"--accent-hover-fill": "var(--accent-surface)",
			"--accent-press-fill": "var(--accent-surface)",
			"--label-shadow": "none",
			"--scrollbar-size": "18px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "var(--ink)",
			"--scrollbar-thumb-line": "3px solid var(--page-surface)",
			"--scrollbar-thumb-shadow": "none",
			"--scrollbar-track": "var(--page-surface)",
			"--scrollbar-track-shadow": "none",
		},
	},
	{
		id: "flat",
		label: "Flat",
		blurb: "Hairline rules, soft corners, no shadows.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "2px",
			"--radius": "6px",
			"--control-radius": "var(--radius)",
			"--panel-radius": "var(--radius)",
			"--well-radius": "var(--radius)",
			"--lift": "0px",
			"--press": "0px",
			"--shadow-hard": "none",
			"--shadow-hard-lg": "none",
			"--shadow-hard-sm": "none",
			"--scrollbar-size": "8px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "color-mix(in srgb, var(--ink) 70%, transparent)",
			"--scrollbar-thumb-line": "2px solid transparent",
			"--edge": "color-mix(in srgb, var(--ink) 70%, transparent)",
			"--panel-edge": "1px solid var(--edge)",
			"--panel-top-edge": "2px solid var(--ink)",
			"--well-edge": "1px solid var(--edge)",
			"--button-edge": "1px solid var(--ink)",
			"--hover-edge": "var(--ink)",
			"--button-weight": "700",
			"--hover-fill": "color-mix(in srgb, var(--mantle) 40%, var(--base))",
			"--press-fill": "var(--mantle)",
			"--card-hover-fill":
				"color-mix( in srgb, var(--mantle) 30%, var(--panel-surface) )",
			"--accent-hover-fill": "var(--accent-surface)",
			"--accent-press-fill": "var(--accent-surface)",
		},
	},
	{
		id: "glassmorphism",
		label: "Glassmorphism",
		blurb: "Frosted panes, soft light, an aurora behind them.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "2px",
			"--radius": "30px",
			"--control-radius": "999px",
			"--panel-radius": "30px",
			"--well-radius": "18px",
			"--lift": "-2px",
			"--press": "0px",
			"--backdrop": "none",
			"--glass-rim": "color-mix(in srgb, var(--text) 55%, transparent)",
			"--glass-rim-soft": "color-mix(in srgb, var(--text) 24%, transparent)",
			"--glass-shade": "color-mix(in srgb, var(--ink) 28%, transparent)",
			"--glass-drop": "color-mix(in srgb, var(--ink) 45%, transparent)",
			"--aurora-mauve":
				"light-dark( color-mix(in srgb, var(--mauve) 3%, var(--crust)), color-mix(in srgb, var(--mauve) 12%, var(--crust)) )",
			"--aurora-blue":
				"light-dark( color-mix(in srgb, var(--blue) 3%, var(--crust)), color-mix(in srgb, var(--blue) 11%, var(--crust)) )",
			"--aurora-wash":
				"light-dark( color-mix(in srgb, var(--sapphire) 2.5%, var(--crust)), color-mix(in srgb, var(--sapphire) 9%, var(--crust)) )",
			"--aurora-pink":
				"light-dark( color-mix(in srgb, var(--pink) 3%, var(--crust)), color-mix(in srgb, var(--pink) 10%, var(--crust)) )",
			"--page-image":
				"radial-gradient( 56rem 44rem at 12% -6%, var(--aurora-mauve), transparent 72% ), radial-gradient(52rem 40rem at 88% 2%, var(--aurora-blue), transparent 72%), linear-gradient( 160deg, var(--aurora-wash) 0%, var(--aurora-mauve) 45%, var(--aurora-pink) 100% )",
			"--panel-surface": "light-dark(var(--base), var(--mantle))",
			"--well-surface": "light-dark(var(--mantle), var(--crust))",
			"--plain-surface": "light-dark(var(--base), var(--mantle))",
			"--panel-image":
				"linear-gradient( 180deg, color-mix(in srgb, var(--text) 6%, transparent), transparent 6px )",
			"--well-image": "none",
			"--plain-image": "none",
			"--button-image": "none",
			"--edge": "color-mix(in srgb, var(--ink) 20%, transparent)",
			"--control-edge": "color-mix(in srgb, var(--ink) 18%, transparent)",
			"--panel-edge":
				"1px solid color-mix(in srgb, var(--text) 26%, transparent)",
			"--panel-top-edge": "2px solid var(--glass-rim)",
			"--well-edge":
				"1px solid color-mix(in srgb, var(--ink) 22%, transparent)",
			"--button-edge":
				"1px solid color-mix(in srgb, var(--ink) 18%, transparent)",
			"--shadow-hard":
				"0 22px 44px -28px var(--glass-drop), 0 4px 12px -8px color-mix(in srgb, var(--ink) 35%, transparent), inset 0 1px 0 var(--glass-rim), inset 1px 0 0 var(--glass-rim-soft), inset -1px 0 0 var(--glass-rim-soft), inset 0 -1px 0 var(--glass-shade)",
			"--shadow-hard-lg":
				"0 30px 60px -30px var(--glass-drop), 0 8px 18px -12px color-mix(in srgb, var(--ink) 40%, transparent), inset 0 1px 0 var(--glass-rim), inset 1px 0 0 var(--glass-rim-soft), inset -1px 0 0 var(--glass-rim-soft), inset 0 -1px 0 var(--glass-shade)",
			"--shadow-hard-sm":
				"0 10px 24px -16px var(--glass-drop), inset 0 1px 0 var(--glass-rim), inset 0 -1px 0 var(--glass-shade)",
			"--shadow-well":
				"inset 0 1px 0 var(--glass-rim-soft), inset 0 -1px 0 var(--glass-shade)",
			"--input-shadow": "none",
			"--button-hover-shadow": "var(--shadow-hard-lg)",
			"--button-press-shadow": "none",
			"--label-shadow": "none",
			"--hover-edge":
				"color-mix(in srgb, var(--accent-surface) 45%, var(--edge))",
			"--hover-fill":
				"color-mix(in srgb, var(--mantle) 55%, var(--plain-surface))",
			"--press-fill":
				"color-mix(in srgb, var(--crust) 85%, var(--plain-surface))",
			"--card-hover-fill":
				"color-mix(in srgb, var(--crust) 38%, var(--panel-surface))",
			"--accent-hover-fill":
				"color-mix( in srgb, var(--ink) 14%, var(--accent-surface) )",
			"--accent-press-fill":
				"color-mix( in srgb, var(--ink) 22%, var(--accent-surface) )",
			"--scrollbar-size": "14px",
			"--scrollbar-radius": "999px",
			"--scrollbar-thumb": "color-mix(in srgb, var(--text) 45%, transparent)",
			"--scrollbar-thumb-line": "4px solid transparent",
			"--scrollbar-thumb-shadow": "inset 0 1px 0 var(--glass-rim)",
		},
	},
	{
		id: "xp",
		label: "Windows XP",
		blurb: "Luna chrome: glossy buttons, beveled fields, rounded windows.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "3px",
			"--radius": "3px",
			"--line-style": "solid",
			"--lift": "-1px",
			"--press": "1px",
			"--font-sans": 'Tahoma, "Segoe UI", Verdana, sans-serif',
			"--xp-desktop-top": "#79b4ef",
			"--xp-title-radius": "8px",
			"--xp-title":
				"linear-gradient( 180deg, #004da3 0%, #004aa5 8%, #0049a3 40%, #0048a0 88%, #0048a0 93%, #004a9c 95%, #003f96 96%, #003f96 100% )",
			"--xp-title-ink": "#fff",
			"--xp-title-shadow": "1px 1px 0 #0f1089",
			"--xp-frame": "#0831d9",
			"--xp-frame-light": "#166aee",
			"--xp-frame-dark": "#001ea0",
			"--xp-silver": "#ece9d8",
			"--xp-border": "#003c74",
			"--xp-field": "#7f9db9",
			"--xp-select": "#1f4a90",
			"--xp-taskbar":
				"linear-gradient( 180deg, #0d4a98 0%, #17478f 10%, #1a4a94 40%, #17468d 100% )",
			"--xp-btn-face":
				"linear-gradient(180deg, #fcfcfb 0%, #f3f3ef 45%, #ecebe6 100%)",
			"--xp-btn-hot":
				"inset 0 0 0 1px #fff, 0 0 0 2px #fdd98c, 0 0 0 3px #e59700",
			"--xp-selected":
				"linear-gradient( 180deg, color-mix(in srgb, var(--xp-frame-dark) 15%, var(--xp-select)) 0%, var(--xp-select) 45%, color-mix(in srgb, var(--xp-frame-dark) 45%, var(--xp-select)) 100% )",
			"--xp-raised":
				"inset 1px 1px 0 color-mix(in srgb, var(--xp-title-ink) 65%, transparent), inset -1px -1px 0 color-mix(in srgb, var(--xp-frame-dark) 55%, transparent)",
			"--xp-recessed":
				"inset 1px 1px 2px color-mix(in srgb, var(--xp-frame-dark) 60%, transparent), inset -1px -1px 0 color-mix(in srgb, var(--xp-title-ink) 45%, transparent)",
			"--xp-success-ink": "#0b4d0b",
			"--edge": "color-mix(in srgb, var(--base) 85%, var(--subtext0))",
			"--page-surface": "var(--crust)",
			"--panel-surface": "var(--base)",
			"--well-surface": "var(--mantle)",
			"--panel-edge": "3px solid var(--xp-frame)",
			"--panel-top-edge": "3px solid var(--xp-frame)",
			"--panel-radius": "8px 8px 3px 3px",
			"--well-edge": "3px solid var(--xp-frame)",
			"--well-radius": "8px 8px 3px 3px",
			"--shadow-well": "var(--xp-recessed)",
			"--plain-surface":
				"light-dark( color-mix(in srgb, var(--base) 55%, var(--surface0)), color-mix(in srgb, var(--base) 75%, var(--crust)) )",
			"--plain-image": "none",
			"--button-edge": "1px solid var(--xp-border)",
			"--button-surface": "var(--xp-silver)",
			"--button-image": "var(--xp-btn-face)",
			"--button-ink": "#000",
			"--button-weight": "400",
			"--accent-image": "none",
			"--xp-link": "#0a3aa5",
			"--input-shadow": "var(--xp-recessed)",
			"--hover-edge": "var(--xp-border)",
			"--hover-fill": "var(--xp-silver)",
			"--press-fill": "#d1ccc1",
			"--button-hover-shadow": "var(--xp-btn-hot)",
			"--button-press-shadow": "inset 1px 1px 2px rgb(0 0 0 / 0.25)",
			"--card-hover-fill":
				"color-mix( in srgb, var(--xp-select) 5%, var(--panel-surface) )",
			"--shadow-hard":
				"inset 1px 1px 0 var(--xp-frame-light), inset -1px -1px 0 var(--xp-frame-dark), 2px 2px 10px rgb(0 0 0 / 0.35)",
			"--shadow-hard-lg":
				"inset 1px 1px 0 var(--xp-frame-light), inset -1px -1px 0 var(--xp-frame-dark), 3px 3px 16px rgb(0 0 0 / 0.4)",
			"--overlay1": "var(--subtext0)",
			"--shadow-hard-sm": "var(--xp-raised)",
			"--backdrop": "none",
			"--scrollbar-size": "16px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "#d6d3c2",
			"--scrollbar-thumb-image": "linear-gradient(90deg, #fdfdfd, #d8d0c4)",
			"--scrollbar-thumb-line": "1px solid #aca899",
			"--scrollbar-thumb-shadow": "inset 0 0 0 1px #fff",
			"--scrollbar-track": "#f1efe2",
			"--scrollbar-track-shadow": "inset 1px 0 0 #aca899",
		},
	},
	{
		id: "msdos",
		label: "MS-DOS",
		blurb: "Monospace text, scanlines, and a blinking cursor.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "3px",
			"--radius": "0px",
			"--control-radius": "0px",
			"--lift": "0px",
			"--press": "0px",
			"--line-style": "solid",
			"--font-sans":
				'"JetBrains Mono NF", ui-monospace, "Courier New", monospace',
			"--panel-edge": "1px solid var(--edge)",
			"--panel-top-edge": "1px solid var(--edge)",
			"--well-edge": "1px solid var(--edge)",
			"--button-edge": "1px solid var(--edge)",
			"--control-edge": "var(--edge)",
			"--button-weight": "700",
			"--hover-edge": "var(--accent-surface)",
			"--hover-fill": "var(--plain-surface)",
			"--press-fill": "var(--plain-surface)",
			"--button-hover-shadow": "none",
			"--button-press-shadow": "none",
			"--input-shadow": "inset 0 0 0 1px var(--edge)",
			"--label-shadow": "none",
			"--shadow-hard":
				"inset 0 0 0 1px var(--edge), 0 0 0 1px var(--page-surface), 0 0 0 2px var(--edge)",
			"--shadow-hard-lg":
				"inset 0 0 0 1px var(--edge), 0 0 0 1px var(--page-surface), 0 0 0 2px var(--edge)",
			"--shadow-hard-sm": "none",
			"--shadow-well": "inset 0 0 0 1px var(--edge)",
			"--dos-chrome":
				"color-mix(in srgb, var(--surface0) 45%, var(--page-surface))",
			"--dos-scan":
				"light-dark(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.045))",
			"--page-image":
				"repeating-linear-gradient( to bottom, transparent 0 2px, var(--dos-scan) 2px 3px )",
			"--panel-image": "var(--page-image)",
			"--plain-image": "var(--page-image)",
			"--well-image": "var(--page-image)",
			"--scrollbar-size": "14px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "var(--accent-surface)",
			"--scrollbar-thumb-image": "none",
			"--scrollbar-thumb-line": "1px solid var(--edge)",
			"--scrollbar-thumb-shadow": "none",
			"--scrollbar-track": "var(--page-surface)",
			"--scrollbar-track-shadow": "none",
		},
	},
	{
		id: "minecraft",
		label: "Minecraft",
		blurb: "Dirt, pixel type, and chunky beveled panels.",
		tokens: {
			"--bw": "2px",
			"--bw-heavy": "6px",
			"--radius": "0px",
			"--lift": "0px",
			"--press": "2px",
			"--font-sans":
				'"Minecraft", "Montserrat", ui-sans-serif, system-ui, sans-serif',
			"--button-weight": "700",
			"--mc-gui": "#c6c6c6",
			"--mc-light": "#ffffff",
			"--mc-dark": "#555555",
			"--mc-deep": "#373737",
			"--mc-hover": "#d8d8d8",
			"--mc-press": "#bdbdbd",
			"--mc-ink": "#262626",
			"--mc-dirt": "#1e150f",
			"--page-surface": "var(--mc-dirt)",
			"--page-image":
				'image-set( url("/images/minecraft/dirt.png") 1x, url("/images/minecraft/dirt@2x.png") 2x, url("/images/minecraft/dirt@3x.png") 3x )',
			"--panel-surface": "var(--base)",
			"--panel-image": "none",
			"--well-surface": "var(--mantle)",
			"--well-image": "none",
			"--plain-surface": "var(--base)",
			"--plain-image": "none",
			"--edge": "var(--mc-deep)",
			"--control-edge": "var(--mc-deep)",
			"--panel-edge": "3px solid var(--mc-deep)",
			"--panel-top-edge": "3px solid var(--mc-deep)",
			"--panel-radius": "0px",
			"--well-edge": "2px solid var(--mc-deep)",
			"--well-radius": "0px",
			"--shadow-hard":
				"inset 2px 2px 0 var(--mc-light), inset -2px -2px 0 var(--mc-dark), 5px 5px 0 color-mix(in srgb, var(--mc-ink) 45%, transparent)",
			"--shadow-hard-lg":
				"inset 2px 2px 0 var(--mc-light), inset -2px -2px 0 var(--mc-dark), 7px 7px 0 color-mix(in srgb, var(--mc-ink) 45%, transparent)",
			"--shadow-hard-sm":
				"inset 2px 2px 0 var(--mc-light), inset -2px -2px 0 var(--mc-dark)",
			"--shadow-well":
				"inset 2px 2px 0 var(--mc-dark), inset -2px -2px 0 var(--mc-light)",
			"--button-edge": "3px solid var(--mc-deep)",
			"--button-surface": "var(--mc-gui)",
			"--button-image": "none",
			"--button-ink": "var(--mc-ink)",
			"--hover-edge": "var(--mc-deep)",
			"--hover-fill": "var(--mc-hover)",
			"--press-fill": "var(--mc-press)",
			"--button-hover-shadow":
				"inset 2px 2px 0 var(--mc-light), inset -2px -2px 0 var(--mc-dark), 6px 6px 0 color-mix(in srgb, var(--mc-ink) 45%, transparent)",
			"--button-press-shadow":
				"inset 2px 2px 0 var(--mc-dark), inset -2px -2px 0 var(--mc-light)",
			"--input-shadow":
				"inset 2px 2px 0 var(--mc-dark), inset -2px -2px 0 var(--mc-light)",
			"--card-hover-fill": "var(--mantle)",
			"--accent-hover-fill": "var(--accent-surface)",
			"--accent-press-fill": "var(--accent-surface)",
			"--label-shadow": "none",
			"--backdrop": "none",
			"--scrollbar-size": "16px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "var(--mc-gui)",
			"--scrollbar-thumb-image":
				"repeating-linear-gradient( 90deg, transparent 0 5px, color-mix(in srgb, var(--mc-dark) 35%, transparent) 5px 6px )",
			"--scrollbar-thumb-line": "2px solid var(--mc-deep)",
			"--scrollbar-thumb-shadow": "inset 2px 2px 0 var(--mc-light)",
			"--scrollbar-track": "var(--mc-dark)",
			"--scrollbar-track-shadow": "inset 2px 0 0 var(--mc-ink)",
		},
	},
	{
		id: "material",
		label: "Material",
		blurb: "Tonal fills, soft elevation, pill controls.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "3px",
			"--radius": "20px",
			"--control-radius": "999px",
			"--panel-radius": "24px",
			"--well-radius": "16px",
			"--lift": "0px",
			"--press": "0px",
			"--button-weight": "700",
			"--shadow-hard":
				"0 1px 3px light-dark(rgb(0 0 0 / 0.16), rgb(0 0 0 / 0.45))",
			"--shadow-hard-lg":
				"0 6px 16px light-dark(rgb(0 0 0 / 0.14), rgb(0 0 0 / 0.55))",
			"--shadow-hard-sm": "none",
			"--button-hover-shadow":
				"0 2px 8px light-dark(rgb(0 0 0 / 0.15), rgb(0 0 0 / 0.45))",
			"--button-press-shadow": "none",
			"--backdrop": "none",
			"--mat-bar":
				"light-dark( color-mix(in srgb, var(--accent-surface) 3%, #fff), color-mix(in srgb, var(--accent-surface) 3%, var(--base)) )",
			"--mat-track":
				"light-dark( color-mix(in srgb, var(--accent-surface) 8%, #fff), color-mix(in srgb, var(--accent-surface) 3%, var(--base)) )",
			"--mat-state":
				"light-dark( color-mix(in srgb, var(--accent-surface) 12%, #fff), color-mix(in srgb, var(--accent-surface) 4%, var(--base)) )",
			"--mat-line": "color-mix(in srgb, var(--ink) 12%, transparent)",
			"--scrollbar-size": "12px",
			"--scrollbar-radius": "999px",
			"--scrollbar-thumb":
				"color-mix( in srgb, var(--accent-surface) 45%, var(--surface2) )",
			"--scrollbar-thumb-line": "4px solid transparent",
			"--page-surface":
				"light-dark( color-mix(in srgb, var(--accent-surface) 3%, #fff), color-mix(in srgb, var(--accent-surface) 3%, var(--base)) )",
			"--panel-surface":
				"light-dark( color-mix(in srgb, var(--accent-surface) 4%, #fff), color-mix(in srgb, var(--accent-surface) 4%, var(--base)) )",
			"--plain-surface":
				"light-dark( color-mix(in srgb, var(--accent-surface) 5%, #fff), color-mix(in srgb, var(--accent-surface) 4%, var(--base)) )",
			"--well-surface": "var(--mantle)",
			"--mat-pole": "light-dark(#000, #fff)",
			"--mat-ink-lift": "color-mix(in srgb, var(--text) 80%, var(--mat-pole))",
			"--subtext1":
				"color-mix(in srgb, var(--subtext1-base) 50%, var(--mat-ink-lift))",
			"--subtext0":
				"color-mix(in srgb, var(--subtext0-base) 50%, var(--mat-ink-lift))",
			"--overlay2":
				"color-mix(in srgb, var(--overlay2-base) 50%, var(--mat-ink-lift))",
			"--overlay1":
				"color-mix(in srgb, var(--overlay1-base) 50%, var(--mat-ink-lift))",
			"--edge": "var(--mat-line)",
			"--control-edge": "color-mix(in srgb, var(--ink) 22%, transparent)",
			"--panel-edge": "1px solid var(--mat-line)",
			"--panel-top-edge": "var(--panel-edge)",
			"--well-edge": "1px solid transparent",
			"--button-edge": "1px solid transparent",
			"--hover-edge":
				"color-mix(in srgb, var(--accent-surface) 45%, transparent)",
			"--hover-fill":
				"light-dark( color-mix(in srgb, var(--accent-surface) 8%, #fff), color-mix(in srgb, var(--accent-surface) 4%, var(--base)) )",
			"--press-fill": "var(--mat-state)",
			"--card-hover-fill":
				"light-dark( color-mix(in srgb, var(--accent-surface) 6%, #fff), color-mix(in srgb, var(--accent-surface) 4%, var(--base)) )",
			"--accent-hover-fill":
				"color-mix(in srgb, var(--ink) 8%, var(--accent-surface))",
			"--accent-press-fill":
				"color-mix( in srgb, var(--ink) 14%, var(--accent-surface) )",
			"--input-shadow":
				"inset 0 -2px 0 color-mix(in srgb, var(--accent-surface) 60%, transparent)",
		},
	},
	{
		id: "skeuomorphic",
		label: "Skeuomorphic",
		blurb: "Molded corners, beveled slabs, embossed labels.",
		tokens: {
			"--bw": "2px",
			"--bw-heavy": "8px",
			"--radius": "8px",
			"--control-radius": "5px",
			"--panel-radius": "14px",
			"--well-radius": "7px",
			"--lift": "-2px",
			"--press": "3px",
			"--edge":
				"light-dark( color-mix(in srgb, var(--crust) 60%, #000), color-mix(in srgb, var(--crust) 45%, #000) )",
			"--subtext1": "color-mix(in srgb, var(--subtext1-base) 30%, var(--ink))",
			"--subtext0": "color-mix(in srgb, var(--subtext0-base) 30%, var(--ink))",
			"--overlay2": "color-mix(in srgb, var(--overlay2-base) 30%, var(--ink))",
			"--overlay1": "color-mix(in srgb, var(--overlay1-base) 30%, var(--ink))",
			"--page-surface":
				"light-dark( color-mix(in srgb, var(--crust) 25%, #fff), color-mix(in srgb, var(--crust) 55%, #000) )",
			"--shadow-hard":
				"inset 0 3px 0 light-dark(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)), inset 0 -3px 0 light-dark(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.55)), 0 6px 0 light-dark( color-mix(in srgb, var(--crust) 40%, #000), color-mix(in srgb, var(--base) 45%, var(--crust)) ), 0 2px 5px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), 0 20px 32px -12px light-dark(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.9))",
			"--shadow-hard-lg":
				"inset 0 3px 0 light-dark(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.65)), inset 0 -3px 0 light-dark(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.55)), 0 8px 0 light-dark( color-mix(in srgb, var(--crust) 40%, #000), color-mix(in srgb, var(--base) 45%, var(--crust)) ), 0 4px 9px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), 0 28px 42px -14px light-dark(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.95))",
			"--button-hover-shadow":
				"inset 0 2px 0 light-dark(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)), inset 0 -2px 0 light-dark(rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.55)), 0 5px 0 light-dark( color-mix(in srgb, var(--crust) 40%, #000), color-mix(in srgb, var(--base) 45%, var(--crust)) ), 0 3px 6px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), 0 12px 18px -8px light-dark(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))",
			"--shadow-hard-sm":
				"inset 0 2px 0 light-dark( rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.55) ), inset 0 -2px 0 light-dark(rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.55)), 0 4px 0 light-dark( color-mix(in srgb, var(--crust) 40%, #000), color-mix(in srgb, var(--base) 45%, var(--crust)) ), 0 2px 4px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), 0 10px 16px -8px light-dark(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))",
			"--shadow-well":
				"inset 0 3px 7px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.6)), inset 0 1px 0 light-dark(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.45)), inset 0 -2px 0 light-dark(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.14))",
			"--button-press-shadow":
				"inset 0 4px 9px light-dark(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.7)), inset 0 -1px 0 light-dark(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))",
			"--page-image":
				"radial-gradient( 130% 80% at 50% -10%, light-dark(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.3)), transparent 62% )",
			"--panel-image":
				"linear-gradient( 180deg, light-dark(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4)) 0, light-dark(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08)) 6px, light-dark(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0)) 14px, light-dark(rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.28)) 100% ), repeating-linear-gradient( 90deg, color-mix(in srgb, var(--ink) 2.5%, transparent) 0 1px, transparent 1px 4px )",
			"--well-image":
				"light-dark( linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 55%), linear-gradient(180deg, rgba(0, 0, 0, 0.08), transparent 55%) )",
			"--plain-image":
				"linear-gradient( 180deg, light-dark(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.5)) 0, light-dark(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) 2px, transparent 4px, light-dark(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.2)) 100% )",
			"--accent-image": "none",
			"--input-shadow": "var(--shadow-well)",
			"--label-shadow":
				"0 1px 0 light-dark(rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.55))",
			"--hover-edge": "color-mix(in srgb, var(--mauve) 40%, var(--edge))",
			"--hover-fill":
				"color-mix(in srgb, var(--mantle) 45%, var(--plain-surface))",
			"--press-fill": "var(--crust)",
			"--card-hover-fill":
				"color-mix(in srgb, var(--crust) 35%, var(--panel-surface))",
			"--accent-hover-fill": "var(--accent-surface)",
			"--accent-press-fill": "var(--accent-surface)",
			"--scrollbar-size": "16px",
			"--scrollbar-radius": "6px",
			"--scrollbar-thumb": "var(--surface2)",
			"--scrollbar-thumb-shadow":
				"inset 0 2px 0 light-dark(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5)), inset 0 -2px 0 light-dark(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.5))",
			"--scrollbar-track": "var(--well-surface)",
			"--scrollbar-track-shadow":
				"inset 0 2px 4px light-dark(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.45))",
		},
	},
	{
		id: "futuristic",
		label: "Futuristic",
		blurb: "Bayer-dithered fields, hairline HUD frames, and mono readouts.",
		tokens: {
			"--bw": "1px",
			"--bw-heavy": "2px",
			"--radius": "0px",
			"--control-radius": "0px",
			"--lift": "0px",
			"--press": "0px",
			"--fut-display": '"Montserrat", ui-sans-serif, system-ui, sans-serif',
			"--fut-dot":
				"color-mix(in srgb, var(--accent-surface) 1.5%, transparent)",
			"--fut-line": "color-mix(in srgb, var(--ink) 5%, transparent)",
			"--fut-strip":
				"color-mix(in srgb, var(--accent-surface) 42%, transparent)",
			"--fut-frame":
				"color-mix(in srgb, var(--accent-surface) 45%, var(--edge))",
			"--fut-scan":
				"color-mix(in srgb, var(--accent-surface) 12%, transparent)",
			"--fut-mesh":
				"conic-gradient( from 90deg, var(--fut-dot) 0 25%, transparent 0 50%, var(--fut-dot) 0 75%, transparent 0 )",
			"--fut-grid":
				"linear-gradient(90deg, var(--fut-line) 1px, transparent 1px)",
			"--fut-ticks":
				"repeating-linear-gradient( 90deg, var(--fut-line) 0 1px, transparent 1px 6px )",
			"--page-image": "none",
			"--panel-image":
				"linear-gradient(180deg, var(--fut-strip), transparent), var(--fut-grid)",
			"--well-image":
				"linear-gradient(transparent, transparent), var(--fut-grid)",
			"--plain-image":
				"linear-gradient(transparent, transparent), var(--fut-grid)",
			"--button-image":
				"linear-gradient(180deg, var(--fut-strip), transparent), var(--fut-ticks)",
			"--accent-image": "none",
			"--edge": "color-mix(in srgb, var(--ink) 58%, var(--accent-surface))",
			"--control-edge": "var(--fut-frame)",
			"--panel-edge": "var(--bw) solid var(--fut-frame)",
			"--panel-top-edge": "var(--bw-heavy) solid var(--fut-frame)",
			"--well-edge": "var(--bw) solid var(--edge)",
			"--button-edge": "var(--bw) solid var(--fut-frame)",
			"--hover-edge": "var(--accent-surface)",
			"--hover-fill":
				"color-mix(in srgb, var(--mantle) 50%, var(--plain-surface))",
			"--press-fill": "var(--crust)",
			"--card-hover-fill":
				"color-mix(in srgb, var(--crust) 30%, var(--panel-surface))",
			"--accent-hover-fill": "var(--accent-surface)",
			"--accent-press-fill": "var(--accent-surface)",
			"--shadow-hard":
				"2px 2px 0 color-mix(in srgb, var(--accent-surface) 24%, transparent)",
			"--shadow-hard-lg":
				"3px 3px 0 color-mix(in srgb, var(--accent-surface) 32%, transparent)",
			"--shadow-hard-sm":
				"1px 1px 0 color-mix(in srgb, var(--accent-surface) 22%, transparent)",
			"--shadow-well":
				"inset 0 0 0 1px color-mix(in srgb, var(--ink) 18%, transparent)",
			"--input-shadow": "var(--shadow-well)",
			"--button-hover-shadow":
				"2px 2px 0 color-mix(in srgb, var(--accent-surface) 38%, transparent)",
			"--button-press-shadow": "none",
			"--label-shadow": "none",
			"--backdrop": "none",
			"--scrollbar-size": "10px",
			"--scrollbar-radius": "0px",
			"--scrollbar-thumb": "var(--accent-surface)",
			"--scrollbar-thumb-image": "none",
			"--scrollbar-thumb-line": "2px solid transparent",
			"--scrollbar-track": "var(--page-surface)",
		},
	},
];

export const SCHEMES: readonly ColorScheme[] = [
	{
		id: "frappe",
		label: "Catppuccin Frappé",
		mode: "dark",
		blurb: "Cool, muted, and easy on the eyes.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#f4b8e4",
			"--mauve": "#dabbee",
			"--red": "#f2b8ba",
			"--maroon": "#f0b8ba",
			"--peach": "#f4ba9d",
			"--yellow": "#e5c890",
			"--green": "#a8d28c",
			"--teal": "#96d1c8",
			"--sky": "#99d1db",
			"--sapphire": "#9ccde3",
			"--blue": "#b2c6f3",
			"--lavender": "#c1c2f2",
			"--text": "#c6d0f5",
			"--subtext1-base": "#c5cde8",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#c6cce0",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#c7cbdb",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#c6cbdb",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#c8cbd5",
			"--surface2": "#626880",
			"--surface1": "#51576d",
			"--surface0": "#414559",
			"--base": "#303446",
			"--mantle": "#292c3c",
			"--crust": "#232634",
			"--ink": "var(--text)",
			"--on-accent": "#292c3c",
		},
	},
	{
		id: "macchiato",
		label: "Catppuccin Macchiato",
		mode: "dark",
		blurb: "Cool and crisp, with brighter accents.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#f5bde6",
			"--mauve": "#caa6f6",
			"--red": "#f09fab",
			"--maroon": "#f0a0a7",
			"--peach": "#f5a97f",
			"--yellow": "#eed49f",
			"--green": "#a6da95",
			"--teal": "#8bd5ca",
			"--sky": "#91d7e3",
			"--sapphire": "#7dc4e4",
			"--blue": "#95b6f5",
			"--lavender": "#b7bdf8",
			"--text": "#cad3f5",
			"--subtext1-base": "#b8c0e0",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#b4bbd4",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#b5bacd",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#b4bacb",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#b7b9c6",
			"--surface2": "#5b6078",
			"--surface1": "#494d64",
			"--surface0": "#363a4f",
			"--base": "#24273a",
			"--mantle": "#1e2030",
			"--crust": "#181926",
			"--ink": "var(--text)",
			"--on-accent": "#1e2030",
		},
	},
	{
		id: "mocha",
		label: "Catppuccin Mocha",
		mode: "dark",
		blurb: "Deep and saturated.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#f5c2e7",
			"--mauve": "#cba6f7",
			"--red": "#f38daa",
			"--maroon": "#eba0ac",
			"--peach": "#fab387",
			"--yellow": "#f9e2af",
			"--green": "#a6e3a1",
			"--teal": "#94e2d5",
			"--sky": "#89dceb",
			"--sapphire": "#74c7ec",
			"--blue": "#89b4fa",
			"--lavender": "#b4befe",
			"--text": "#cdd6f4",
			"--subtext1-base": "#bac2de",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#aab1ca",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#acb0c3",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#abb0c4",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#acb0c2",
			"--surface2": "#585b70",
			"--surface1": "#45475a",
			"--surface0": "#313244",
			"--base": "#1e1e2e",
			"--mantle": "#181825",
			"--crust": "#11111b",
			"--ink": "var(--text)",
			"--on-accent": "#11111b",
			"--post-accent": "var(--accent-surface)",
			"--motion-quick": "120ms",
			"--motion-hover": "150ms",
			"--motion-base": "180ms",
		},
	},
	{
		id: "dracula",
		label: "Dracula",
		mode: "dark",
		blurb: "Violet night, with bright saturated inks.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#ff97d2",
			"--mauve": "#cba9fa",
			"--red": "#ff9e9e",
			"--maroon": "#ffa3a3",
			"--peach": "#ffb86c",
			"--yellow": "#f1fa8c",
			"--green": "#50fa7b",
			"--teal": "#8dede0",
			"--sky": "#8be9fd",
			"--sapphire": "#b1dfff",
			"--blue": "#c4d9ff",
			"--lavender": "#b5b1ff",
			"--text": "#f8f8f2",
			"--subtext1-base": "#e4e4ec",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#c8c9d6",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#b9bdce",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#b9bcd2",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#b8bcd0",
			"--surface2": "#6272a4",
			"--surface1": "#44475a",
			"--surface0": "#353747",
			"--base": "#282a36",
			"--mantle": "#242633",
			"--crust": "#21222c",
			"--ink": "var(--text)",
			"--on-accent": "#21222c",
		},
	},
	{
		id: "nord",
		label: "Nord",
		mode: "dark",
		blurb: "Arctic blues on Polar Night.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#d9bdd4",
			"--mauve": "#cbc1da",
			"--red": "#ecb7bd",
			"--maroon": "#e3bbc0",
			"--peach": "#e6bbad",
			"--yellow": "#ebcb8b",
			"--green": "#b6cca3",
			"--teal": "#a9cccb",
			"--sky": "#9fccd9",
			"--sapphire": "#b4c7da",
			"--blue": "#b3c6e1",
			"--lavender": "#c1c1e5",
			"--text": "#eceff4",
			"--subtext1-base": "#e5e9f0",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#d8dee9",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#c2cbd7",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#c4cad5",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#c3cad3",
			"--surface2": "#4c566a",
			"--surface1": "#434c5e",
			"--surface0": "#3b4252",
			"--base": "#2e3440",
			"--mantle": "#292e39",
			"--crust": "#232831",
			"--ink": "var(--text)",
			"--on-accent": "#232831",
		},
	},
	{
		id: "mono",
		label: "Monochrome",
		mode: "dark",
		blurb: "Greys, each with a whisper of its own hue.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#e6ccd9",
			"--mauve": "#bfb4cc",
			"--red": "#c6a9a6",
			"--maroon": "#cdafb3",
			"--peach": "#d9c0b1",
			"--yellow": "#ebe5cb",
			"--green": "#c5d6c1",
			"--teal": "#b8d8d3",
			"--sky": "#b4d3da",
			"--sapphire": "#a7bfcf",
			"--blue": "#a7b4ca",
			"--lavender": "#c1c0d9",
			"--text": "#ededed",
			"--subtext1-base": "#cfcfcf",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#b4b4b4",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#ababab",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#a9a9a9",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#a9a9a9",
			"--surface2": "#3b3b3b",
			"--surface1": "#2f2f2f",
			"--surface0": "#242424",
			"--base": "#171717",
			"--mantle": "#111111",
			"--crust": "#0b0b0b",
			"--ink": "var(--text)",
			"--on-accent": "#0b0b0b",
		},
	},
	{
		id: "gruvbox-dark",
		label: "Gruvbox Dark",
		mode: "dark",
		blurb: "Warm brown, with bright retro accents.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#e5b1ce",
			"--mauve": "#cbb9e2",
			"--red": "#fdaba2",
			"--maroon": "#f3afac",
			"--peach": "#feae6d",
			"--yellow": "#fabd2f",
			"--green": "#c3c728",
			"--teal": "#75d1c5",
			"--sky": "#a6c5cc",
			"--sapphire": "#a0c4dc",
			"--blue": "#b0bfd9",
			"--lavender": "#bebdd6",
			"--text": "#fbf1c7",
			"--subtext1-base": "#ebdbb2",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#d5c5a2",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#cfc4b0",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#cdc4b5",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#ccc4b7",
			"--surface2": "#665c54",
			"--surface1": "#504945",
			"--surface0": "#3c3836",
			"--base": "#32302f",
			"--mantle": "#282828",
			"--crust": "#1d2021",
			"--ink": "var(--text)",
			"--on-accent": "#1d2021",
		},
	},
	{
		id: "solarized-dark",
		label: "Solarized Dark",
		mode: "dark",
		blurb: "Deep blue canvas, calm teal ink.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#ea9dc2",
			"--mauve": "#cfa5dd",
			"--red": "#ef9f9e",
			"--maroon": "#f399a7",
			"--peach": "#f1a07e",
			"--yellow": "#e3ac00",
			"--green": "#a6c000",
			"--teal": "#34c8bd",
			"--sky": "#33c3dc",
			"--sapphire": "#7abbe7",
			"--blue": "#93b3ee",
			"--lavender": "#aeb1de",
			"--text": "#b1bebe",
			"--subtext1-base": "#b3bdbd",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#b3bdbd",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#b1bebe",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#b3bdbd",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#b3bdbd",
			"--surface2": "#657b83",
			"--surface1": "#586e75",
			"--surface0": "#073642",
			"--base": "#002b36",
			"--mantle": "#002b36",
			"--crust": "#002b36",
			"--ink": "var(--text)",
			"--on-accent": "#002b36",
		},
	},
	{
		id: "everforest-dark",
		label: "Everforest Dark",
		mode: "dark",
		blurb: "Warm forest greens on a soft slate night.",
		tokens: {
			"color-scheme": "dark",
			"--pink": "#e1b8de",
			"--mauve": "#cfbfe4",
			"--red": "#f1b6b8",
			"--maroon": "#e6bbc0",
			"--peach": "#eebaa2",
			"--yellow": "#dec189",
			"--green": "#b7cc97",
			"--teal": "#8ed2c8",
			"--sky": "#a1ccd5",
			"--sapphire": "#a8c9df",
			"--blue": "#b3c4e3",
			"--lavender": "#c2c2db",
			"--text": "#d8ccb3",
			"--subtext1-base": "#d8ccb3",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#c5cdc7",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#c5cdc7",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#c5cdc7",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#c4cbc7",
			"--surface2": "#475258",
			"--surface1": "#3d484d",
			"--surface0": "#343f44",
			"--base": "#2d353b",
			"--mantle": "#232a2e",
			"--crust": "#1e2326",
			"--ink": "var(--text)",
			"--on-accent": "#1e2326",
		},
	},
	{
		id: "latte",
		label: "Catppuccin Latte",
		mode: "light",
		blurb: "Creamy light, with strong contrast.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#841258",
			"--mauve": "#5b1da9",
			"--red": "#8c0e24",
			"--maroon": "#822028",
			"--peach": "#743209",
			"--yellow": "#5d3f03",
			"--green": "#1e4f16",
			"--teal": "#094e49",
			"--sky": "#004d59",
			"--sapphire": "#1d4862",
			"--blue": "#123e99",
			"--lavender": "#31399e",
			"--text": "#3c3e55",
			"--subtext1-base": "#3d3f54",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#3e4052",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#3e4151",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#3e4052",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#3f4153",
			"--surface2": "#acb0be",
			"--surface1": "#bcc0cc",
			"--surface0": "#ccd0da",
			"--base": "#eff1f5",
			"--mantle": "#e6e9ef",
			"--crust": "#dce0e8",
			"--ink": "#11111b",
			"--on-accent": "#ffffff",
		},
	},
	{
		id: "alucard",
		label: "Alucard",
		mode: "light",
		blurb: "Dracula's daylight twin: purple ink on warm parchment.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#911244",
			"--mauve": "#68269d",
			"--red": "#8b251b",
			"--maroon": "#872a21",
			"--peach": "#78380f",
			"--yellow": "#58490e",
			"--green": "#105608",
			"--teal": "#00554e",
			"--sky": "#01525f",
			"--sapphire": "#024f70",
			"--blue": "#2f4877",
			"--lavender": "#4e35a6",
			"--text": "#1f1f1f",
			"--subtext1-base": "#3a3730",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#4b4636",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#4b4734",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#4b4734",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#4c4734",
			"--surface2": "#cfcfde",
			"--surface1": "#d4cfbd",
			"--surface0": "#e2deca",
			"--base": "#fffbeb",
			"--mantle": "#f5f0df",
			"--crust": "#ede8d7",
			"--ink": "var(--text)",
			"--on-accent": "#fffbeb",
		},
	},
	{
		id: "nord-light",
		label: "Nord Light",
		mode: "light",
		blurb: "Snow Storm, with deep frost.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#603654",
			"--mauve": "#4d3e5e",
			"--red": "#732c34",
			"--maroon": "#67353b",
			"--peach": "#6a361f",
			"--yellow": "#4f430b",
			"--green": "#304b23",
			"--teal": "#1f4b49",
			"--sky": "#1b4a57",
			"--sapphire": "#1e4862",
			"--blue": "#2b456a",
			"--lavender": "#424063",
			"--text": "#2e3440",
			"--subtext1-base": "#393f4f",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#394050",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#39404f",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#3a414e",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#3a4150",
			"--surface2": "#b3bfd1",
			"--surface1": "#c1cbda",
			"--surface0": "#cfd7e3",
			"--base": "#eceff4",
			"--mantle": "#e5e9f0",
			"--crust": "#d8dee9",
			"--ink": "#2e3440",
			"--on-accent": "#eceff4",
		},
	},
	{
		id: "mono-light",
		label: "Monochrome Light",
		mode: "light",
		blurb: "The same tinted greys, inverted onto white paper.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#35222d",
			"--mauve": "#42394d",
			"--red": "#573e3c",
			"--maroon": "#50383b",
			"--peach": "#432f24",
			"--yellow": "#221d08",
			"--green": "#22301f",
			"--teal": "#15322e",
			"--sky": "#183339",
			"--sapphire": "#2b404d",
			"--blue": "#394456",
			"--lavender": "#343448",
			"--text": "#1a1a1a",
			"--subtext1-base": "#373737",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#424242",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#424242",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#424242",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#434343",
			"--surface2": "#b7b7b7",
			"--surface1": "#c7c7c7",
			"--surface0": "#d7d7d7",
			"--base": "#f3f3f3",
			"--mantle": "#eaeaea",
			"--crust": "#e1e1e1",
			"--ink": "#0a0a0a",
			"--on-accent": "#ffffff",
		},
	},
	{
		id: "gruvbox-light",
		label: "Gruvbox Light",
		mode: "light",
		blurb: "Creamy tan, with deep retro inks.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#772347",
			"--mauve": "#533771",
			"--red": "#8c0005",
			"--maroon": "#811535",
			"--peach": "#782802",
			"--yellow": "#5d3c0b",
			"--green": "#474509",
			"--teal": "#174b45",
			"--sky": "#1a4950",
			"--sapphire": "#2d4554",
			"--blue": "#2e4164",
			"--lavender": "#414055",
			"--text": "#282828",
			"--subtext1-base": "#3c3836",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#443e3a",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#453e39",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#443f39",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#453f39",
			"--surface2": "#a89984",
			"--surface1": "#bdae93",
			"--surface0": "#d5c4a1",
			"--base": "#fbf1c7",
			"--mantle": "#f2e5bc",
			"--crust": "#ebdbb2",
			"--ink": "#282828",
			"--on-accent": "#ffffff",
		},
	},
	{
		id: "solarized-light",
		label: "Solarized Light",
		mode: "light",
		blurb: "Warm cream canvas, calm teal ink.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#98215b",
			"--mauve": "#77368d",
			"--red": "#a01d1a",
			"--maroon": "#902f45",
			"--peach": "#903510",
			"--yellow": "#674e00",
			"--green": "#4c5600",
			"--teal": "#185c57",
			"--sky": "#185a66",
			"--sapphire": "#185683",
			"--blue": "#345087",
			"--lavender": "#4248a2",
			"--text": "#073642",
			"--subtext1-base": "#3d5057",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#3d5057",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#3d5057",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#3d5057",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#3d5057",
			"--surface2": "#839496",
			"--surface1": "#93a1a1",
			"--surface0": "#eee8d5",
			"--base": "#fdf6e3",
			"--mantle": "#fdf6e3",
			"--crust": "#fdf6e3",
			"--ink": "#002b36",
			"--on-accent": "#fdf6e3",
		},
	},
	{
		id: "everforest-light",
		label: "Everforest Light",
		mode: "light",
		blurb: "Sunlit cream, with deep forest inks.",
		tokens: {
			"color-scheme": "light",
			"--pink": "#86255d",
			"--mauve": "#673197",
			"--red": "#8f2322",
			"--maroon": "#852d41",
			"--peach": "#7b3807",
			"--yellow": "#604700",
			"--green": "#455100",
			"--teal": "#1b5540",
			"--sky": "#0a5460",
			"--sapphire": "#1f506a",
			"--blue": "#364a6f",
			"--lavender": "#444a6b",
			"--text": "#3d484e",
			"--subtext1-base": "#3d484e",
			"--subtext1": "var(--subtext1-base)",
			"--subtext0-base": "#3f494f",
			"--subtext0": "var(--subtext0-base)",
			"--overlay2-base": "#3d474d",
			"--overlay2": "var(--overlay2-base)",
			"--overlay1-base": "#40494f",
			"--overlay1": "var(--overlay1-base)",
			"--overlay0": "#414a4e",
			"--surface2": "#bdc3af",
			"--surface1": "#e0dcc7",
			"--surface0": "#e6e2cc",
			"--base": "#fdf6e3",
			"--mantle": "#f4f0d9",
			"--crust": "#efebd4",
			"--ink": "#3b484d",
			"--on-accent": "#ffffff",
		},
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

/** Root defaults and accent pointers emitted by the Tailwind plugin. */
const ROOT_SCHEME_EXTRAS: Record<string, string> = {
	"--post-accent": "var(--accent-surface)",
	"--motion-quick": "120ms",
	"--motion-hover": "150ms",
	"--motion-base": "180ms",
};

/** Root defaults and accent pointers emitted by the Tailwind plugin. */
export const ROOT_SCHEME_TOKENS: Record<string, string> = {
	...getScheme("mocha").tokens,
	...ROOT_SCHEME_EXTRAS,
};
export const ROOT_STYLE_TOKENS: Record<string, string> = {
	"--font-sans": '"Montserrat", ui-sans-serif, system-ui, sans-serif',
	"--bw": "2px",
	"--bw-heavy": "10px",
	"--line-style": "solid",
	"--edge": "var(--ink)",
	"--control-edge": "var(--edge)",
	"--radius": "0px",
	"--control-radius": "var(--radius)",
	"--lift": "-2px",
	"--press": "2px",
	"--backdrop": "none",
	"--shadow-hard": "4px 4px 0 var(--ink)",
	"--shadow-hard-lg": "6px 6px 0 var(--ink)",
	"--shadow-hard-sm": "2px 2px 0 var(--ink)",
	"--shadow-well": "var(--shadow-hard)",
	"--label-shadow": "none",
	"--page-surface": "var(--crust)",
	"--page-image": "none",
	"--panel-surface": "var(--base)",
	"--panel-image": "none",
	"--panel-edge": "var(--bw) var(--line-style) var(--edge)",
	"--panel-top-edge": "var(--bw) var(--line-style) var(--edge)",
	"--panel-radius": "var(--radius)",
	"--well-surface": "var(--mantle)",
	"--well-image": "none",
	"--well-edge": "var(--bw) var(--line-style) var(--edge)",
	"--well-radius": "var(--radius)",
	"--plain-surface": "var(--base)",
	"--plain-image": "none",
	"--button-edge": "var(--bw) var(--line-style) var(--edge)",
	"--button-surface": "var(--plain-surface)",
	"--button-image": "var(--plain-image)",
	"--button-ink": "currentColor",
	"--button-weight": "700",
	"--chip-accent-ink": "var(--on-accent)",
	"--input-shadow": "none",
	"--accent-surface": "var(--mauve)",
	"--accent-image": "none",
	"--hover-edge": "var(--edge)",
	"--hover-fill": "var(--plain-surface)",
	"--press-fill": "var(--plain-surface)",
	"--button-hover-shadow": "var(--shadow-hard)",
	"--button-press-shadow": "none",
	"--card-hover-fill": "var(--panel-surface)",
	"--accent-hover-fill": "var(--accent-surface)",
	"--accent-press-fill": "var(--accent-surface)",
	"--scrollbar-size": "14px",
	"--scrollbar-radius": "0px",
	"--scrollbar-thumb": "var(--ink)",
	"--scrollbar-thumb-image": "none",
	"--scrollbar-thumb-line": "2px solid transparent",
	"--scrollbar-thumb-shadow": "none",
	"--scrollbar-track": "transparent",
	"--scrollbar-track-shadow": "none",
	"--color-border": "var(--edge)",
	"font-family": "var(--font-sans)",
};
export const ACCENT_TOKENS: Record<string, Record<string, string>> = {
	pink: {
		"--accent-surface": "var(--pink)",
	},
	mauve: {
		"--accent-surface": "var(--mauve)",
	},
	red: {
		"--accent-surface": "var(--red)",
	},
	maroon: {
		"--accent-surface": "var(--maroon)",
	},
	peach: {
		"--accent-surface": "var(--peach)",
	},
	yellow: {
		"--accent-surface": "var(--yellow)",
	},
	green: {
		"--accent-surface": "var(--green)",
	},
	teal: {
		"--accent-surface": "var(--teal)",
	},
	sky: {
		"--accent-surface": "var(--sky)",
	},
	sapphire: {
		"--accent-surface": "var(--sapphire)",
	},
	blue: {
		"--accent-surface": "var(--blue)",
	},
	lavender: {
		"--accent-surface": "var(--lavender)",
	},
};

const XP_DARK_TOKENS: Record<string, string> = { "--xp-link": "#96cbff" };
const FOCUS_RING_TOKENS: Record<string, string> = {
	"--focus-ring": "var(--ink)",
};

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
