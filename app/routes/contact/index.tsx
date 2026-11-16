import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeader } from "~/components/layout/page_header";
import { MatrixIcon, socialIcon } from "~/components/shared/icons";
import { CopyStateIcon, useCopy } from "~/components/ui/copy_state";
import { seo } from "~/lib/seo";
import { CONTACT, SOCIALS } from "~/lib/site";

export const meta = () =>
	seo({
		title: "Contact",
		description:
			"Email, Matrix, Codeberg, Mastodon and the rest of the ways to reach me.",
	});

const ELSEWHERE = SOCIALS.filter(
	(social) => !["Email", "Matrix"].includes(social.label),
);

function CopyEmail() {
	const { copied, copy } = useCopy(1600);

	return (
		<>
			<button
				type="button"
				onClick={() => copy(CONTACT.email)}
				className="nb-button min-w-20 justify-center py-1.5 text-[11px] uppercase tracking-[0.08em]"
			>
				<CopyStateIcon copied={copied} />
				{copied ? "Copied" : "Copy"}
			</button>
			<span role="status" className="sr-only">
				{copied ? "Email address copied to the clipboard" : ""}
			</span>
		</>
	);
}

export default function ContactPage() {
	return (
		<div>
			<PageHeader
				index="04"
				label="Contact"
				title="Contact"
				lead="Want to get in touch? Matrix is preferred, Email can be slow."
			/>

			<div className="mt-14 grid gap-6 lg:grid-cols-2">
				<section className="nb-panel p-6">
					<div className="flex items-baseline justify-between">
						<p className="flex items-center gap-1.5 text-label text-subtext0">
							<Mail aria-hidden="true" className="size-3.5" />
							Email
						</p>
						<CopyEmail />
					</div>
					<a
						href={`mailto:${CONTACT.email}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 block break-all text-lg font-extrabold tracking-[-0.02em] text-text transition-colors hover:text-accent"
					>
						{CONTACT.email}
					</a>
					<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
						The one inbox I actually read. PGP on request.
					</p>
				</section>

				<section className="nb-panel p-6">
					<p className="flex items-center gap-1.5 text-label text-subtext0">
						<MatrixIcon className="size-3.5" />
						Matrix
					</p>
					<a
						href={CONTACT.matrix}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 flex items-center justify-between gap-4 text-lg font-extrabold tracking-[-0.02em] text-text transition-colors hover:text-accent"
					>
						Find me on Matrix
						<ArrowUpRight
							aria-hidden="true"
							className="icon-nudge-up size-4 shrink-0 text-subtext0"
						/>
					</a>
					<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
						End to end encrypted, no phone number.
					</p>
				</section>

				<section className="nb-panel p-6 lg:col-span-2">
					<p className="text-label text-subtext0">Elsewhere</p>
					<ul className="mt-4 flex flex-wrap gap-2">
						{ELSEWHERE.map((social) => {
							const Icon = socialIcon(social.icon);
							return (
								<li key={social.label}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="nb-chip group text-subtext0 transition-colors hover:bg-accent hover:text-on-accent"
									>
										<Icon className="icon-tilt size-3.5 shrink-0" />
										{social.label}
									</a>
								</li>
							);
						})}
					</ul>
				</section>
			</div>
		</div>
	);
}
