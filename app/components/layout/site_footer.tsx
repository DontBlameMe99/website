import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "~/lib/site";

export function SiteFooter() {
	return (
		<footer className="mt-28 border-t-2 border-ink">
			<div className="mx-auto max-w-[1240px] px-5 py-12">
				<p className="text-label text-subtext0">Elsewhere</p>
				<ul className="mt-4 flex flex-wrap gap-2">
					{SOCIALS.map((social) => (
						<li key={social.label}>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="nb-chip group bg-base transition-colors hover:bg-mauve hover:text-on-accent"
							>
								{social.label}
								<ArrowUpRight className="size-3 opacity-60 transition-opacity group-hover:opacity-100" />
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
