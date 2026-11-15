import { Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "~/components/wm/logo";
import { LayoutIndicator, ThemeToggle } from "~/components/wm/theme_toggle";
import { posts } from "~/lib/posts";
import { SITE } from "~/lib/site";
import { cn } from "~/lib/utils";
import { describePath, WORKSPACES } from "~/lib/workspaces";

function Clock() {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const timer = setInterval(() => setNow(new Date()), 15_000);
		return () => clearInterval(timer);
	}, []);

	return (
		<span className="text-[11px] tabular-nums text-subtext0">
			{now
				? now.toLocaleTimeString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
					})
				: "--:--"}
		</span>
	);
}

/** The bar the window manager draws: workspaces, focus, status. */
export function StatusBar() {
	const location = useLocation();
	const { workspace, title } = describePath(location.pathname);

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-mantle/95 backdrop-blur-sm">
			<div className="mx-auto flex h-8 max-w-[1800px] items-center gap-2 px-2">
				<Link
					to="/"
					aria-label={`${SITE.name} home`}
					className="flex shrink-0 items-center gap-1.5 rounded-[2px] px-1 py-0.5 transition-colors hover:bg-surface0"
				>
					<Logo className="h-3.5" />
					<span className="hidden text-[11px] font-bold tracking-tight text-text sm:inline">
						{SITE.name}
					</span>
				</Link>

				<span aria-hidden="true" className="h-4 w-px bg-border" />

				<nav aria-label="Workspaces" className="flex items-center gap-0.5">
					{WORKSPACES.map((item) => {
						const active = workspace === item.index;
						return (
							<Link
								key={item.to}
								to={item.to}
								aria-current={active ? "page" : undefined}
								title={`${item.label} (alt+${item.index})`}
								className={cn(
									"relative flex items-center gap-1.5 rounded-[2px] border px-1.5 py-0.5 text-[11px] leading-4 transition-colors",
									active
										? "border-mauve/45 bg-surface0 text-text"
										: "border-transparent text-overlay1 hover:bg-surface0/60 hover:text-text",
								)}
							>
								<span
									className={cn(
										"tabular-nums",
										active ? "text-mauve" : "text-overlay0",
									)}
								>
									{item.index}
								</span>
								<span className="hidden sm:inline">{item.label}</span>
							</Link>
						);
					})}
				</nav>

				<div className="mx-auto hidden min-w-0 items-center gap-2 px-2 md:flex">
					<span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
					<span className="truncate text-[11px] text-overlay1">{title}</span>
				</div>

				<div className="ml-auto flex items-center gap-2.5">
					<LayoutIndicator />
					<span className="hidden text-[10px] uppercase tracking-[0.12em] text-overlay0 sm:inline">
						{posts.length} posts
					</span>
					<motion.span
						aria-hidden="true"
						className="hidden text-green sm:block"
						animate={{ opacity: [1, 0.35, 1] }}
						transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
					>
						<Wifi className="size-3" />
					</motion.span>
					<Clock />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
