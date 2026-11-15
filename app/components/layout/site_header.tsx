import { NavLink } from "react-router";
import { ThemeToggle } from "~/components/layout/theme_toggle";
import { ScrollProgress } from "~/components/ui/scroll_progress";
import { NAV, SITE } from "~/lib/site";
import { cn } from "~/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }) =>
	cn(
		"inline-flex items-center px-1 py-2 text-[11px] uppercase tracking-[0.06em] transition-colors hover:text-mauve sm:px-1.5 sm:text-meta sm:tracking-[0.12em]",
		isActive
			? "text-text underline decoration-2 underline-offset-[6px]"
			: "text-subtext0",
	);

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b-2 border-ink bg-crust">
			<div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 sm:h-16 sm:flex-nowrap sm:gap-10 sm:px-5 sm:py-0">
				<NavLink
					to="/"
					end
					aria-label={`${SITE.name}, home`}
					className="flex min-w-0 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[-0.01em] text-text transition-colors hover:text-mauve sm:text-[13px]"
				>
					<img
						src="/images/logo.svg"
						alt=""
						width={28}
						height={28}
						className="size-6 shrink-0 border-2 border-ink bg-base object-contain p-px sm:size-7"
					/>
					<span>{SITE.name}</span>
				</NavLink>

				<nav
					aria-label="Primary"
					className="order-last flex w-full items-center gap-1 sm:order-none sm:ml-auto sm:w-auto sm:gap-7"
				>
					{NAV.filter((item) => item.to !== "/").map((item) => (
						<NavLink key={item.to} to={item.to} className={linkClass}>
							{item.label}
						</NavLink>
					))}
				</nav>

				<span className="ml-auto sm:ml-0">
					<ThemeToggle />
				</span>
			</div>
			{/* The reading bar rides the header's bottom rule, so it moves with
			    the two-row mobile header instead of crossing it. */}
			<ScrollProgress className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] bg-mauve" />
		</header>
	);
}
