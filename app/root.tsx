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
import { MotionConfig } from "motion/react";
import { SiteFooter } from "~/components/layout/site_footer";
import { SiteHeader } from "~/components/layout/site_header";
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
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-mauve focus:px-3 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-on-accent"
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
			<MotionConfig reducedMotion="user">
				<SiteHeader />
				<main
					id="main-content"
					className="mx-auto w-full max-w-[1240px] px-5 pb-10 pt-10 sm:pt-14"
				>
					<div
						key={location.pathname}
						className="animate-[page-in_180ms_ease-out]"
					>
						{children}
					</div>
				</main>
				<SiteFooter />
			</MotionConfig>
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
