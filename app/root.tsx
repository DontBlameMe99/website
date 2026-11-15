import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "react-router";

import "./app.css";
import { KeyBar } from "~/components/wm/key_bar";
import { SiteFooter } from "~/components/wm/site_footer";
import { StatusBar } from "~/components/wm/status_bar";
import { Wallpaper } from "~/components/wm/wallpaper";
import { useKeybindings } from "~/hooks/use_keybindings";
import { seo } from "~/lib/seo";
import { SITE } from "~/lib/site";
import { ThemeProvider, themeBootScript } from "~/lib/theme_provider";
import { NotFound } from "~/routes/__404/not_found";

export const meta = () => seo({ title: SITE.name });

export const links = () => [
	{ rel: "icon", href: "/images/logo.svg", type: "image/svg+xml" },
	{ rel: "apple-touch-icon", href: "/images/avatar-square.png" },
	{
		rel: "preload",
		href: "/fonts/montserrat/Montserrat-Variable.woff2",
		as: "font",
		type: "font/woff2",
		crossOrigin: "anonymous",
	},
];

function Shortcuts() {
	useKeybindings();
	return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#11111b" />
				<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
				<Meta />
				<Links />
			</head>
			<body className="min-h-dvh bg-crust text-text antialiased">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-10 focus:left-2 focus:z-[100] focus:rounded-[2px] focus:border focus:border-mauve focus:bg-mantle focus:px-2 focus:py-1 focus:text-xs"
				>
					Skip to content
				</a>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function Shell({ children }: { children: React.ReactNode }) {
	const location = useLocation();

	return (
		<ThemeProvider>
			<Wallpaper />
			<StatusBar />
			<main
				id="main-content"
				className="relative z-10 mx-auto w-full max-w-[1800px] px-2 pb-10 pt-10 transition-[max-width] duration-300"
			>
				<div
					key={location.pathname}
					className="animate-boot motion-reduce:animate-none"
				>
					{children}
				</div>
				<SiteFooter />
			</main>
			<KeyBar />
			<Shortcuts />
		</ThemeProvider>
	);
}

export default function App() {
	return (
		<Shell>
			<Outlet />
		</Shell>
	);
}

export function ErrorBoundary({ error }: { error: unknown }) {
	const status = isRouteErrorResponse(error) ? error.status : 500;
	return (
		<Shell>
			<NotFound status={status} />
		</Shell>
	);
}
