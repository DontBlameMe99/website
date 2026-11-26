import {
	Component,
	lazy,
	type ReactNode,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
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
		rel: "alternate",
		type: "application/rss+xml",
		title: `${SITE.name} posts`,
		href: "/rss.xml",
	},
	{
		rel: "alternate",
		type: "application/atom+xml",
		title: `${SITE.name} posts`,
		href: "/atom.xml",
	},
	{
		rel: "preload",
		href: "/fonts/montserrat/Montserrat-Variable.woff2",
		as: "font",
		type: "font/woff2",
		crossOrigin: "anonymous",
	},
];

const Analytics = lazy(() =>
	import("@vercel/analytics/react").then((module) => ({
		default: module.Analytics,
	})),
);
const SpeedInsights = lazy(() =>
	import("@vercel/speed-insights/react").then((module) => ({
		default: module.SpeedInsights,
	})),
);

function DeferredTelemetry() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const timer = window.setTimeout(() => setReady(true), 1500);
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<Suspense fallback={null}>
			{ready ? (
				<>
					<SpeedInsights />
					<Analytics />
				</>
			) : null}
		</Suspense>
	);
}
class TelemetryBoundary extends Component<
	{ children: ReactNode },
	{ failed: boolean }
> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	render() {
		return this.state.failed ? null : this.props.children;
	}
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="dark"
			data-style="neobrutalist"
			data-scheme="mocha"
			data-accent="mauve"
			suppressHydrationWarning
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* Browser chrome before hydration: the OS preference picks the
				    default for that brightness. Both are rewritten on mount. */}
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#11111b"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#dce0e8"
				/>
				<Meta />
				<Links />
				{/* After the stylesheet link, so the browser starts the CSS request
				    before it parses this script. It still runs before first paint. */}
				<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
			</head>
			<body className="min-h-dvh text-text antialiased">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-3 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-on-accent"
				>
					Skip to content
				</a>
				{children}
				<ScrollRestoration />
				<Scripts />
				<TelemetryBoundary>
					<DeferredTelemetry />
				</TelemetryBoundary>
			</body>
		</html>
	);
}

function Shell({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const mainRef = useRef<HTMLElement>(null);
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		mainRef.current?.focus({ preventScroll: true });
	}, [location.pathname]);
	return (
		<ThemeProvider>
			<SiteHeader />
			<main
				id="main-content"
				ref={mainRef}
				tabIndex={-1}
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
