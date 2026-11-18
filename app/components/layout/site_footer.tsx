import { Rss } from "lucide-react";
import { Link } from "react-router";
import { socialIcon } from "~/components/shared/icons";
import { SOCIALS } from "~/lib/site";

export function SiteFooter() {
	return (
		<footer className="mt-28 nb-line-t">
			<div className="mx-auto max-w-[1240px] px-5 py-12">
				<p className="text-label text-subtext0">Elsewhere</p>
				<ul className="mt-4 flex flex-wrap gap-2">
					<li>
						<a
							href="/rss.xml"
							className="nb-chip transition-colors hover:bg-accent hover:text-on-accent"
						>
							<Rss className="icon-tilt size-3.5 shrink-0" />
							RSS
						</a>
					</li>
					{SOCIALS.map((social) => {
						const Icon = socialIcon(social.icon);
						return (
							<li key={social.label}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="nb-chip group transition-colors hover:bg-accent hover:text-on-accent"
								>
									<Icon className="icon-tilt size-3.5 shrink-0" />
									{social.label}
								</a>
							</li>
						);
					})}
				</ul>

				<div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
					<p className="text-sm text-subtext0">
						The code is AI-assisted.{" "}
						<span className="font-bold text-text">
							Every word here is mine.
						</span>
					</p>
					<Link
						to="/disclosure"
						prefetch="intent"
						className="text-sm font-semibold text-text underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
					>
						How it's made
					</Link>
				</div>
			</div>
		</footer>
	);
}
