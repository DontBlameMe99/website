import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type Theme = "dark" | "light";

export const THEME_CHANGING_CLASS = "theme-changing";
export const THEME_STORAGE_KEY = "dbm-theme";

type ThemeContextValue = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
	theme: "dark",
	setTheme: () => {
		throw new Error("setTheme must be called inside ThemeProvider");
	},
	toggle: () => {
		throw new Error("toggle must be called inside ThemeProvider");
	},
});

const readStored = (): Theme | null => {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === "dark" || stored === "light") return stored;
	} catch {
		// Storage can be blocked. Fall through to the OS preference.
	}
	return null;
};

const systemTheme = (): Theme =>
	window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const initialTheme = (): Theme =>
	typeof window === "undefined" ? "dark" : (readStored() ?? systemTheme());

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(initialTheme);

	const apply = useCallback((next: Theme) => {
		const root = document.documentElement;
		if (root.classList.contains(next)) return;
		root.classList.add(THEME_CHANGING_CLASS);
		root.classList.remove("light", "dark");
		root.classList.add(next);
		// Force the recalculation now, so the palette commits before the class
		// that disables transitions is dropped again.
		getComputedStyle(root).getPropertyValue("--base");
		root.classList.remove(THEME_CHANGING_CLASS);

		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);
		if (meta)
			meta.content = getComputedStyle(root).getPropertyValue("--base").trim();
	}, []);

	useEffect(() => {
		apply(theme);
	}, [theme, apply]);

	const setTheme = useCallback(
		(next: Theme) => {
			apply(next);
			try {
				localStorage.setItem(THEME_STORAGE_KEY, next);
			} catch {
				// ignore
			}
			setThemeState(next);
		},
		[apply],
	);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
		}),
		[theme, setTheme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}

/** Runs before hydration so the first paint already has the right palette. */
export const themeBootScript = `
	(function () {
		var theme;
		try { theme = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
		if (theme !== 'light' && theme !== 'dark') {
			theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		}
		document.documentElement.classList.add(theme);
	})();
`;
