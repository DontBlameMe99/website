import { Link } from "react-router";
import { SocialChip } from "~/components/shared/icons";
import { SOCIALS } from "~/lib/site";

export function SiteFooter() {
	return (
		<footer className="mt-28 nb-line-t">
			<div className="mx-auto max-w-[1240px] px-5 py-12">
				<p className="text-label text-subtext0">Elsewhere</p>
				<ul className="mt-4 flex flex-wrap gap-2">
					<li>
						<SocialChip
							icon="rss"
							href="/rss.xml"
							label="RSS"
							className="nb-chip transition-colors hover:bg-accent hover:text-on-accent"
						/>
					</li>
					{SOCIALS.map((social) => (
						<li key={social.label}>
							<SocialChip
								icon={social.icon}
								href={social.href}
								label={social.label}
								className="nb-chip group transition-colors hover:bg-accent hover:text-on-accent"
							/>
						</li>
					))}
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
						className="inline-flex min-h-6 items-center text-sm font-semibold text-text underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
					>
						How it's made
					</Link>
				</div>
			</div>
		</footer>
	);
}
