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
	DEFAULT_PREFS,
	type Mode,
	resolvePrefs,
	type SchemeId,
	schemeForMode,
	type StoredPrefs,
	STORAGE_KEYS,
	type StyleId,
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
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const systemMode = (): Mode =>
	window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const readStored = (): StoredPrefs => {
	try {
		return {
			mode: localStorage.getItem(STORAGE_KEYS.mode),
			style: localStorage.getItem(STORAGE_KEYS.style),
			darkScheme: localStorage.getItem(STORAGE_KEYS.darkScheme),
			lightScheme: localStorage.getItem(STORAGE_KEYS.lightScheme),
		};
	} catch {
		// Storage can be blocked. Fall through to the defaults.
		return {};
	}
};

/** Saved choices, or the OS for brightness when there is no saved choice. */
const storedPrefs = (): ThemePrefs =>
	typeof window === "undefined"
		? DEFAULT_PREFS
		: resolvePrefs(readStored(), systemMode());

const writePrefs = (prefs: ThemePrefs) => {
	try {
		localStorage.setItem(STORAGE_KEYS.mode, prefs.mode);
		localStorage.setItem(STORAGE_KEYS.style, prefs.style);
		localStorage.setItem(STORAGE_KEYS.darkScheme, prefs.darkScheme);
		localStorage.setItem(STORAGE_KEYS.lightScheme, prefs.lightScheme);
	} catch {
		// The theme still applies for this page view.
	}
};

/** Every visible surface reads its color and shape from these two attributes. */
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

	const page = getComputedStyle(root).getPropertyValue("--page-surface").trim();
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
	const painted = useRef(false);

	useEffect(() => {
		setPrefs(storedPrefs());
	}, []);

	useEffect(() => {
		if (!painted.current) {
			painted.current = true;
			return;
		}
		apply(prefs);
	}, [prefs]);

	/** Applies and persists in one step, so a view transition sees the new paint. */
	const commit = useCallback((next: ThemePrefs) => {
		apply(next);
		writePrefs(next);
		setPrefs(next);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			...prefs,
			scheme: schemeForMode(prefs.mode, prefs.darkScheme, prefs.lightScheme),
			setMode: (mode) => commit({ ...prefs, mode }),
			setStyle: (style) => commit({ ...prefs, style }),
			setScheme: (scheme) => commit(withScheme(prefs, scheme)),
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
