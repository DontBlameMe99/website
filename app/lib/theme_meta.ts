/**
 * Ids, labels, and token names that the browser needs before any module
 * loads. The CSS token blocks live in theme_catalog.ts.
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

/**
 * The colors a palette owns: everything a scheme block colors, minus the tokens
 * it derives. A custom palette replaces all of them at once, so its stored form
 * is complete and a missing color can never fall back to another scheme's.
 *
 * The boot script needs this list before any module loads, so the catalog keeps
 * it away from the editor's labels.
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

export const STYLE_META = [
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
	{
		id: "glassmorphism",
		label: "Glassmorphism",
		blurb: "Frosted panes, soft light, an aurora behind them.",
	},
	{
		id: "xp",
		label: "Windows XP",
		blurb: "Luna chrome: glossy buttons, beveled fields, rounded windows.",
	},
	{
		id: "msdos",
		label: "MS-DOS",
		blurb: "Monospace text, scanlines, and a blinking cursor.",
	},
	{
		id: "minecraft",
		label: "Minecraft",
		blurb: "Dirt, pixel type, and chunky beveled panels.",
	},
	{
		id: "material",
		label: "Material",
		blurb: "Tonal fills, soft elevation, pill controls.",
	},
	{
		id: "skeuomorphic",
		label: "Skeuomorphic",
		blurb: "Molded corners, beveled slabs, embossed labels.",
	},
	{
		id: "futuristic",
		label: "Futuristic",
		blurb: "Bayer-dithered fields, hairline HUD frames, and mono readouts.",
	},
] as const;

export const SCHEME_META = [
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
		id: "dracula",
		label: "Dracula",
		mode: "dark",
		blurb: "Violet night, with bright saturated inks.",
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
		blurb: "Greys, each with a whisper of its own hue.",
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
		id: "everforest-dark",
		label: "Everforest Dark",
		mode: "dark",
		blurb: "Warm forest greens on a soft slate night.",
	},
	{
		id: "latte",
		label: "Catppuccin Latte",
		mode: "light",
		blurb: "Creamy light, with strong contrast.",
	},
	{
		id: "alucard",
		label: "Alucard",
		mode: "light",
		blurb: "Dracula's daylight twin: purple ink on warm parchment.",
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
		blurb: "The same tinted greys, inverted onto white paper.",
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
	{
		id: "everforest-light",
		label: "Everforest Light",
		mode: "light",
		blurb: "Sunlit cream, with deep forest inks.",
	},
] as const;
