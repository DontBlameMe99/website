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
	type Accent,
	accentToStored,
	DEFAULT_PREFS,
	inkOn,
	type Mode,
	resolvePrefs,
	type SchemeId,
	STORAGE_KEYS,
	type StoredPrefs,
	type StyleId,
	schemeForMode,
	type ThemePrefs,
	withScheme,
} from "~/lib/themes";

export { themeBootScript } from "~/lib/themes";

type ThemeContextValue = ThemePrefs & {
	/** The scheme the current mode resolves to. */
	scheme: SchemeId;
	setMode: (mode: Mode) => void;
	setStyle: (style: StyleId) => void;
	/** Saves a scheme for its own brightness. The mode does not change. */
	setScheme: (scheme: SchemeId) => void;
	setAccent: (accent: Accent) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const systemMode = (): Mode =>
	window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

/**
 * A surface token as a plain color. Reading the custom property back gives
 * whatever the style wrote, which can be a scheme-dependent function like
 * light-dark(); a used color resolves it. `theme-color` takes a color only.
 */
const usedColor = (node: Element, token: string): string => {
	const probe = document.createElement("span");
	probe.style.color = `var(${token})`;
	node.appendChild(probe);
	const color = getComputedStyle(probe).color;
	probe.remove();
	return color;
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

/** Saved choices, or the OS for brightness when there is no saved choice. */ const storedPrefs =
	(): ThemePrefs =>
		typeof window === "undefined"
			? DEFAULT_PREFS
			: resolvePrefs(readStored(), systemMode());

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

/** Every visible surface reads its color and shape from these attributes. */
const apply = (prefs: ThemePrefs) => {
	const root = document.documentElement;
	root.classList.toggle("dark", prefs.mode === "dark");
	root.classList.toggle("light", prefs.mode === "light");
	root.dataset.style = prefs.style;
	root.dataset.scheme = schemeForMode(
		prefs.mode,
		prefs.darkScheme,
		prefs.lightScheme,
	);

	// A hue is an attribute the palette re-resolves per scheme. A hex has to be
	// written over it, and it brings its own ink.
	if (prefs.accent.kind === "custom") {
		delete root.dataset.accent;
		root.style.setProperty("--accent-surface", prefs.accent.hex);
		root.style.setProperty("--on-accent", inkOn(prefs.accent.hex));
	} else {
		root.style.removeProperty("--accent-surface");
		root.style.removeProperty("--on-accent");
		root.dataset.accent = prefs.accent.hue;
	}

	// A style may write a scheme-dependent function here, so read a used color.
	const page = usedColor(root, "--page-surface");
	if (page) {
		// There is one meta per color-scheme query for the pre-hydration paint.
		for (const meta of document.querySelectorAll<HTMLMetaElement>(
			'meta[name="theme-color"]',
		))
			meta.content = page;
	}
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// Start from the defaults so the first client render matches the prerendered
	// one. The boot script has already painted the saved theme; the effect below
	// adopts it into React state and applies it from then on.
	const [prefs, setPrefs] = useState<ThemePrefs>(DEFAULT_PREFS);
	const latest = useRef(prefs);
	const painted = useRef(false);

	useEffect(() => {
		setPrefs(storedPrefs());
	}, []);

	useEffect(() => {
		latest.current = prefs;
		if (!painted.current) {
			painted.current = true;
			return;
		}
		apply(prefs);
	}, [prefs]);

	/**
	 * Applies and persists in one step, so a view transition sees the new paint.
	 * The update reads the newest prefs, not this render's: the header calls it
	 * from the view transition's async callback.
	 */
	const commit = useCallback((update: (current: ThemePrefs) => ThemePrefs) => {
		const next = update(latest.current);
		latest.current = next;
		apply(next);
		writePrefs(next);
		setPrefs(next);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			...prefs,
			scheme: schemeForMode(prefs.mode, prefs.darkScheme, prefs.lightScheme),
			setMode: (mode) => commit((current) => ({ ...current, mode })),
			setStyle: (style) => commit((current) => ({ ...current, style })),
			setScheme: (scheme) => commit((current) => withScheme(current, scheme)),
			setAccent: (accent) => commit((current) => ({ ...current, accent })),
		}),
		[prefs, commit],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const value = useContext(ThemeContext);
	if (!value) throw new Error("useTheme must be called inside ThemeProvider");
	return value;
}
