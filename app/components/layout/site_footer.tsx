import { socialIcon } from "~/components/shared/icons";
import { SOCIALS } from "~/lib/site";

export function SiteFooter() {
	return (
		<footer className="mt-28 border-t-2 border-ink">
			<div className="mx-auto max-w-[1240px] px-5 py-12">
				<p className="text-label text-subtext0">Elsewhere</p>
				<ul className="mt-4 flex flex-wrap gap-2">
					{SOCIALS.map((social) => {
						const Icon = socialIcon(social.icon);
						return (
							<li key={social.label}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="nb-chip group bg-base transition-colors hover:bg-mauve hover:text-on-accent"
								>
									<Icon className="size-3.5 shrink-0" />
									{social.label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</footer>
	);
}
