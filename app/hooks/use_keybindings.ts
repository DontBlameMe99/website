import { useEffect } from "react";
import { useNavigate } from "react-router";
import { randomSlug } from "~/lib/posts";
import { useTheme } from "~/lib/theme_provider";

const WORKSPACE_ROUTES = ["/", "/blog", "/projects", "/contact"];

/**
 * Alt+1..4 jumps workspaces, alt+t flips the theme, alt+r opens a random post.
 * Alt is used because browsers and window managers swallow Super.
 */
export function useKeybindings() {
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
				return;
			const target = event.target as HTMLElement | null;
			if (
				target &&
				(target.isContentEditable ||
					["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
			) {
				return;
			}

			const key = event.key.toLowerCase();
			const workspace = Number(key);
			if (
				Number.isInteger(workspace) &&
				workspace >= 1 &&
				workspace <= WORKSPACE_ROUTES.length
			) {
				event.preventDefault();
				navigate(WORKSPACE_ROUTES[workspace - 1]);
				return;
			}

			if (key === "t") {
				event.preventDefault();
				setTheme(theme === "dark" ? "light" : "dark");
				return;
			}

			if (key === "r") {
				event.preventDefault();
				navigate(`/blog/${randomSlug()}`);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [navigate, setTheme, theme]);
}
