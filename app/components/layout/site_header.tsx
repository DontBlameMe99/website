import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ThemeToggle } from "~/components/layout/theme_toggle";
import { GlassMarker } from "~/components/ui/glass_marker";
import { ScrollProgress } from "~/components/ui/scroll_progress";
import { useGlassMarker } from "~/hooks/use_glass_marker";
import { useTheme } from "~/lib/theme_provider";
import { NAV, SITE } from "~/lib/site";
import { cn } from "~/lib/utils";

const NAV_ITEMS = NAV.filter((item) => item.to !== "/");

const linkClass = ({ isActive }: { isActive: boolean }) =>
	cn(
		"nav-link inline-flex items-center px-1 py-2 text-[11px] uppercase tracking-[0.06em] transition-colors hover:text-accent sm:px-1.5 sm:text-meta sm:tracking-[0.12em]",
		isActive
			? "text-text underline decoration-2 underline-offset-[6px]"
			: "text-subtext0",
	);

type PillBox = { x: number; width: number };

export function SiteHeader() {
	const { style } = useTheme();
	const material = style === "material";
	const glass = style === "glassmorphism";
	const location = useLocation();
	const pathname = location.pathname;
	const navRef = useRef<HTMLElement>(null);
	const activeNav = useRef<HTMLAnchorElement>(null);
	const [pill, setPill] = useState<PillBox>({ x: 0, width: 0 });
	const scopeRef = useGlassMarker<HTMLElement>(activeNav, glass, pathname);

	const activeHref =
		NAV_ITEMS.find((item) => pathname.startsWith(item.to))?.to ?? null;

	useLayoutEffect(() => {
		if (!material) return;

		const measure = () => {
			const nav = navRef.current;
			if (!nav) return;
			const link = activeHref
				? (nav.querySelector(
						`a[href="${activeHref}"]`,
					) as HTMLAnchorElement | null)
				: null;
			if (!link) return;
			const navBox = nav.getBoundingClientRect();
			const linkBox = link.getBoundingClientRect();
			setPill({ x: linkBox.left - navBox.left, width: linkBox.width });
		};

		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [activeHref, material]);

	return (
		<header className="site-header sticky top-0 z-40 nb-page nb-chrome">
			<div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 sm:h-16 sm:flex-nowrap sm:gap-10 sm:px-5 sm:py-0">
				<NavLink
					to="/"
					end
					aria-label={`${SITE.name}, home`}
					className="flex min-w-0 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[-0.01em] text-text transition-colors hover:text-accent sm:text-[13px]"
				>
					<img
						src="/images/logo.svg"
						alt=""
						width={28}
						height={28}
						className="size-6 shrink-0 nb-line nb-fill object-contain p-px sm:size-7"
					/>
					<span>{SITE.name}</span>
				</NavLink>

				<span className="order-2 ml-auto sm:order-3 sm:ml-0">
					<ThemeToggle />
				</span>

				<nav
					ref={(node) => {
						navRef.current = node;
						scopeRef.current = node;
					}}
					aria-label="Primary"
					className="order-3 flex w-full items-center gap-1 sm:order-3 sm:ml-auto sm:w-auto sm:gap-7"
				>
					{material ? (
						<span
							aria-hidden="true"
							className="nav-pill"
							style={{
								transform: `translateX(${pill.x}px)`,
								width: pill.width,
								opacity: activeHref ? 1 : 0,
							}}
						/>
					) : null}
					<GlassMarker visible={glass} />
					{NAV_ITEMS.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							prefetch="intent"
							className={linkClass}
							ref={(node) => {
								if (node?.getAttribute("aria-current") === "page")
									activeNav.current = node;
							}}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<span className="win-controls order-4" aria-hidden="true">
					<span />
					<span />
					<span />
				</span>
			</div>
			{/* The reading bar is the header's bottom rule: accent behind you,
			    edge ahead. It moves with the two-row mobile header instead of
			    crossing it. */}
			<div className="relative h-[var(--bw)] bg-[var(--edge)]">
				<ScrollProgress className="pointer-events-none absolute inset-0 bg-accent" />
			</div>
		</header>
	);
}
