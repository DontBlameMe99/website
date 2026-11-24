import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	type CustomTheme,
	EMPTY_CUSTOM,
	isCssValue,
	readCustomTheme,
	readThemeFile,
	resolveSelection,
	seedPalette,
	seedStyle,
	type ThemeState,
	themeFile,
	writeCustomTheme,
} from "~/lib/custom_theme";
import {
	type Accent,
	accentToStored,
	DEFAULT_PREFS,
	inkOn,
	type Mode,
	PALETTE_TOKENS,
	resolvePrefs,
	type SchemeChoice,
	type SchemeId,
	STORAGE_KEYS,
	STYLE_TOKENS,
	type StoredPrefs,
	type StyleChoice,
	type StyleId,
	schemeForMode,
	type ThemePrefs,
	withScheme,
} from "~/lib/themes";

export { themeBootScript } from "~/lib/themes";

type ThemeContextValue = ThemePrefs & {
	/** The scheme the current mode resolves to. */
	scheme: SchemeChoice;
	/** Both palettes and the style the visitor has edited, or null per slot. */
	custom: CustomTheme;
	setMode: (mode: Mode) => void;
	setStyle: (style: StyleChoice) => void;
	/** Saves a scheme for its own brightness. A custom entry takes a slot. */
	setScheme: (scheme: SchemeChoice, mode?: Mode) => void;
	setAccent: (accent: Accent) => void;
	/** Replaces one custom palette with a copy of a built-in scheme. */
	copyPalette: (mode: Mode, from: SchemeId) => void;
	/** Replaces the custom style with a copy of a built-in style. */
	copyStyle: (from: StyleId) => void;
	setPaletteToken: (mode: Mode, token: string, hex: string) => void;
	/** An empty value drops the override and follows the default again. */
	setStyleToken: (token: string, value: string) => void;
	resetCustom: () => void;
	exportTheme: () => string;
	/** Applies a pasted theme file. Returns an error message, or null. */
	importTheme: (text: string) => string | null;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const systemMode = (): Mode =>
	window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

/**
 * A surface token as a plain sRGB color. Reading the custom property back gives
 * whatever the style wrote, which can be a scheme-dependent function like
 * light-dark(); a used color resolves it, and the canvas turns that into the
 * `rgb()` form `theme-color` parses everywhere.
 */
const usedColor = (node: Element, token: string): string => {
	const probe = document.createElement("span");
	probe.style.color = `var(${token})`;
	node.appendChild(probe);
	const used = getComputedStyle(probe).color;
	probe.remove();

	// A plain sRGB value is what theme-color wants already. Anything wider is
	// read back through the canvas, which always answers in sRGB.
	if (used.startsWith("rgb")) return used;

	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;
	const context = canvas.getContext("2d", { willReadFrequently: true });
	if (!context) return used;
	context.fillStyle = used;
	context.fillRect(0, 0, 1, 1);
	const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
	return `rgb(${r}, ${g}, ${b})`;
};

const readStored = (): StoredPrefs => {
	try {
		return {
			mode: localStorage.getItem(STORAGE_KEYS.mode),
			style: localStorage.getItem(STORAGE_KEYS.style),
			darkScheme: localStorage.getItem(STORAGE_KEYS.darkScheme),
			lightScheme: localStorage.getItem(STORAGE_KEYS.lightScheme),
			accent: localStorage.getItem(STORAGE_KEYS.accent),
		};
	} catch {
		// Storage can be blocked. Fall through to the defaults.
		return {};
	}
};

/** Saved choices, or the OS for brightness when there is no saved choice. */
const storedState = (): ThemeState => {
	if (typeof window === "undefined") {
		return { prefs: DEFAULT_PREFS, custom: EMPTY_CUSTOM };
	}
	const custom = readCustomTheme();
	return {
		prefs: resolveSelection(resolvePrefs(readStored(), systemMode()), custom),
		custom,
	};
};

const writePrefs = (prefs: ThemePrefs) => {
	try {
		localStorage.setItem(STORAGE_KEYS.mode, prefs.mode);
		localStorage.setItem(STORAGE_KEYS.style, prefs.style);
		localStorage.setItem(STORAGE_KEYS.darkScheme, prefs.darkScheme);
		localStorage.setItem(STORAGE_KEYS.lightScheme, prefs.lightScheme);
		localStorage.setItem(STORAGE_KEYS.accent, accentToStored(prefs.accent));
	} catch {
		// The theme still applies for this page view.
	}
};

const writeState = (state: ThemeState) => {
	writePrefs(state.prefs);
	writeCustomTheme(state.custom);
};

/* Every token a custom set can write, so a change of theme leaves none behind. */
const CUSTOM_KEYS = [...PALETTE_TOKENS, ...STYLE_TOKENS, "accent-surface"];

/** Every visible surface reads its color and shape from these attributes. */
const apply = ({ prefs, custom }: ThemeState) => {
	const root = document.documentElement;
	root.classList.toggle("dark", prefs.mode === "dark");
	root.classList.toggle("light", prefs.mode === "light");
	root.dataset.style = prefs.style;
	const scheme = schemeForMode(prefs.mode, prefs.darkScheme, prefs.lightScheme);
	root.dataset.scheme = scheme;

	for (const token of CUSTOM_KEYS) root.style.removeProperty(`--${token}`);
	// A custom palette has no scheme block to declare its brightness, and the
	// build lowers light-dark() to this pair, so both have to be written here.
	root.style.colorScheme = prefs.mode;
	writeBrightness(prefs.mode);
	if (scheme === "custom") writeTokens(custom[prefs.mode]);
	if (prefs.style === "custom") writeTokens(custom.style);

	// A hue is an attribute the palette re-resolves per scheme. A hex has to be
	// written over it, and it brings its own ink.
	if (prefs.accent.kind === "custom") {
		delete root.dataset.accent;
		root.style.setProperty("--accent-surface", prefs.accent.hex);
		root.style.setProperty("--on-accent", inkOn(prefs.accent.hex));
	} else {
		root.dataset.accent = prefs.accent.hue;
	}

	// A style may write a scheme-dependent function here, so read a used color.
	syncChromeColor();
};

/** The browser chrome color follows the page surface, not the mode. */
const syncChromeColor = () => {
	const page = usedColor(document.documentElement, "--page-surface");
	if (!page) return;
	// There is one meta per color-scheme query for the pre-hydration paint.
	for (const meta of document.querySelectorAll<HTMLMetaElement>(
		'meta[name="theme-color"]',
	))
		meta.content = page;
};

/**
 * light-dark() is lowered to a pair of custom properties at build time, and only
 * the scheme blocks declare them. A custom palette needs them written too, or
 * every lowered color takes the dark branch.
 */
const writeBrightness = (mode: Mode) => {
	const root = document.documentElement;
	root.style.setProperty(
		"--lightningcss-light",
		mode === "light" ? "initial" : " ",
	);
	root.style.setProperty(
		"--lightningcss-dark",
		mode === "dark" ? "initial" : " ",
	);
};

const writeTokens = (tokens: Record<string, string> | null) => {
	if (!tokens) return;
	const root = document.documentElement;
	for (const [token, value] of Object.entries(tokens))
		root.style.setProperty(`--${token}`, value);
};

/** The built-in a slot starts from: its own choice, or the default. */
const seedSource = (prefs: ThemePrefs, mode: Mode): SchemeId => {
	const choice = mode === "dark" ? prefs.darkScheme : prefs.lightScheme;
	if (choice !== "custom") return choice;
	return mode === "dark" ? DEFAULT_PREFS.darkScheme : DEFAULT_PREFS.lightScheme;
};

const styleSource = (prefs: ThemePrefs): StyleId =>
	prefs.style === "custom" ? DEFAULT_PREFS.style : prefs.style;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// Start from the defaults so the first client render matches the prerendered
	// one. The boot script has already painted the saved theme; the effect below
	// adopts it into React state and applies it from then on.
	const [state, setState] = useState<ThemeState>({
		prefs: DEFAULT_PREFS,
		custom: EMPTY_CUSTOM,
	});
	const latest = useRef(state);

	useEffect(() => {
		// The boot script has already painted the saved theme, so adopting it here
		// must not repaint. Two things can still differ: the browser chrome color,
		// which the script does not write, and the OS preference, if it flipped
		// between that first paint and this effect.
		const next = storedState();
		latest.current = next;
		setState(next);
		const root = document.documentElement;
		const expectedScheme = schemeForMode(
			next.prefs.mode,
			next.prefs.darkScheme,
			next.prefs.lightScheme,
		);
		const matches =
			root.dataset.style === next.prefs.style &&
			root.dataset.scheme === expectedScheme &&
			root.classList.contains(next.prefs.mode);
		if (
			matches &&
			(next.prefs.accent.kind !== "hue" ||
				root.dataset.accent === next.prefs.accent.hue)
		)
			syncChromeColor();
		else apply(next);
	}, []);

	/**
	 * Applies and persists in one step, so a view transition sees the new paint.
	 * The update reads the newest state, not this render's: the header calls it
	 * from the view transition's async callback.
	 */
	const commit = useCallback((update: (current: ThemeState) => ThemeState) => {
		const next = update(latest.current);
		// A rejected or unchanged update must not repaint or write storage.
		if (next === latest.current) return;
		latest.current = next;
		apply(next);
		writeState(next);
		setState(next);
	}, []);

	const value = useMemo<ThemeContextValue>(() => {
		const { prefs, custom } = state;

		return {
			...prefs,
			scheme: schemeForMode(prefs.mode, prefs.darkScheme, prefs.lightScheme),
			custom,
			setMode: (mode) =>
				commit((current) => ({
					...current,
					prefs: { ...current.prefs, mode },
				})),
			setStyle: (style) =>
				commit((current) => {
					if (style !== "custom")
						return { ...current, prefs: { ...current.prefs, style } };
					const tokens =
						current.custom.style ?? seedStyle(styleSource(current.prefs));
					return {
						prefs: { ...current.prefs, style },
						custom: { ...current.custom, style: tokens },
					};
				}),
			setScheme: (scheme, slot) =>
				commit((current) => {
					const prefs = withScheme(current.prefs, scheme, slot);
					if (scheme !== "custom") return { ...current, prefs };

					// The first pick starts from the palette in use for that mode.
					const mode = slot ?? current.prefs.mode;
					const palette =
						current.custom[mode] ??
						seedPalette(seedSource(current.prefs, mode));
					if (!palette) return current;
					return {
						prefs,
						custom: { ...current.custom, [mode]: palette },
					};
				}),
			setAccent: (accent) =>
				commit((current) => ({
					...current,
					prefs: { ...current.prefs, accent },
				})),
			copyPalette: (mode, from) =>
				commit((current) => {
					const palette = seedPalette(from);
					if (!palette) return current;
					return {
						...current,
						custom: { ...current.custom, [mode]: palette },
					};
				}),
			copyStyle: (from) =>
				commit((current) => ({
					...current,
					custom: { ...current.custom, style: seedStyle(from) },
				})),
			setPaletteToken: (mode, token, hex) =>
				commit((current) => {
					const palette = current.custom[mode];
					if (!palette) return current;
					return {
						...current,
						custom: {
							...current.custom,
							[mode]: { ...palette, [token]: hex },
						},
					};
				}),
			setStyleToken: (token, value) =>
				commit((current) => {
					const style = { ...current.custom.style };
					// Store what was typed, spaces included: a value is often several
					// parts, and trimming each keystroke eats the joins.
					if (!value.trim()) delete style[token];
					else if (isCssValue(value)) style[token] = value;
					else return current;
					return { ...current, custom: { ...current.custom, style } };
				}),
			resetCustom: () =>
				commit((current) => ({
					prefs: {
						...current.prefs,
						darkScheme: DEFAULT_PREFS.darkScheme,
						lightScheme: DEFAULT_PREFS.lightScheme,
						style: DEFAULT_PREFS.style,
						accent: DEFAULT_PREFS.accent,
					},
					custom: EMPTY_CUSTOM,
				})),
			exportTheme: () => themeFile(latest.current),
			importTheme: (text) => {
				const result = readThemeFile(text);
				if ("error" in result) return result.error;
				commit(() => result.state);
				return null;
			},
		};
	}, [state, commit]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const value = useContext(ThemeContext);
	if (!value) throw new Error("useTheme must be called inside ThemeProvider");
	return value;
}
