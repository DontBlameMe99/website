import { NavLink } from "react-router";
import { ThemeToggle } from "~/components/layout/theme_toggle";
import { NAV, SITE } from "~/lib/site";
import { cn } from "~/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }) =>
	cn(
		"text-[10.5px] uppercase tracking-[0.1em] transition-colors hover:text-mauve sm:text-meta sm:tracking-[0.12em]",
		isActive ? "text-text" : "text-subtext0",
	);

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b-2 border-ink bg-crust">
			<div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 sm:gap-10 sm:px-5">
				<NavLink
					to="/"
					end
					className="text-[13px] font-extrabold uppercase tracking-[-0.01em] text-text transition-colors hover:text-mauve"
				>
					{SITE.name}
				</NavLink>

				<nav
					aria-label="Primary"
					className="ml-auto flex items-center gap-2.5 sm:gap-7"
				>
					{NAV.filter((item) => item.to !== "/").map((item) => (
						<NavLink key={item.to} to={item.to} className={linkClass}>
							{item.label}
						</NavLink>
					))}
				</nav>

				<ThemeToggle />
			</div>
		</header>
	);
}
