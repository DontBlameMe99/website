import { NavLink } from "react-router";
import { ThemeToggle } from "~/components/layout/theme_toggle";
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
			<div className="mx-auto flex h-16 max-w-[1240px] items-center gap-2 px-3 sm:gap-10 sm:px-5">
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
						className="pfp-mark size-6 shrink-0 border-2 border-ink bg-base object-contain p-px sm:size-7"
					/>
					<span className="truncate max-[359px]:hidden">{SITE.name}</span>
				</NavLink>

				<nav
					aria-label="Primary"
					className="ml-auto flex items-center gap-1 sm:gap-7"
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
