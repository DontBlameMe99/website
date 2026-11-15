import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "~/lib/site";

export function SiteFooter() {
	return (
		<footer className="mt-28 border-t-2 border-ink">
			<div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:grid-cols-[1fr_auto]">
				<div>
					<p className="text-label text-subtext0">Elsewhere</p>
					<ul className="mt-4 flex flex-wrap gap-2">
						{SOCIALS.map((social) => (
							<li key={social.label}>
								<a
									href={social.href}
									target={
										social.href.startsWith("mailto:") ? undefined : "_blank"
									}
									rel="noopener noreferrer"
									className="nb-chip group bg-base transition-colors hover:bg-mauve hover:text-crust"
								>
									{social.label}
									<ArrowUpRight className="size-3 opacity-60 transition-opacity group-hover:opacity-100" />
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="text-meta sm:text-right">
					<p className="text-subtext0">
						© {new Date().getFullYear()} DontBlameMe
					</p>
					<p className="mt-1">Catppuccin · Montserrat · Malva accent</p>
					<p className="mt-1">No cookies, no analytics, no newsletter.</p>
				</div>
			</div>
		</footer>
	);
}
