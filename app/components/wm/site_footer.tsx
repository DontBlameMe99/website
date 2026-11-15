import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { SOCIALS } from "~/lib/site";

/** A thin bar under the tiling area, not a tile of its own. */
export function SiteFooter() {
	return (
		<footer className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border border-border bg-mantle px-2 py-1.5">
			<nav
				aria-label="Elsewhere"
				className="flex flex-wrap items-center gap-x-3 gap-y-1"
			>
				{SOCIALS.map((social) => (
					<a
						key={social.label}
						href={social.href}
						target={social.href.startsWith("mailto:") ? undefined : "_blank"}
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-0.5 text-[11px] text-overlay1 transition-colors hover:text-mauve"
					>
						{social.label}
						<ArrowUpRight className="size-2.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
					</a>
				))}
			</nav>
			<span className="ml-auto text-[10px] text-overlay0">
				montserrat · jetbrains mono for code ·{" "}
				<Link to="/contact" className="hover:text-mauve">
					say hi
				</Link>
			</span>
		</footer>
	);
}
