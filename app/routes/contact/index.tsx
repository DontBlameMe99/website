import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/layout/page_header";
import { MatrixIcon, socialIcon } from "~/components/shared/icons";
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
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(CONTACT.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			// Clipboard can be blocked. The address stays visible either way.
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={copy}
				className="nb-button min-w-20 justify-center py-1.5 text-[11px] uppercase tracking-[0.08em]"
			>
				<Copy aria-hidden="true" className="size-3" />
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
				lead="Want to get in touch? Email is the reliable one. Matrix works too. I read everything, replies are slow."
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
						className="mt-6 block break-all text-lg font-extrabold tracking-[-0.02em] text-text transition-colors hover:text-mauve"
					>
						{CONTACT.email}
					</a>
					<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
						The one inbox I actually read. PGP on request.
					</p>
				</section>

				<section className="nb-panel p-6">
					<div className="flex items-baseline justify-between">
						<p className="flex items-center gap-1.5 text-label text-subtext0">
							<MatrixIcon className="size-3.5" />
							Matrix
						</p>
						<ArrowUpRight aria-hidden="true" className="size-4 text-subtext0" />
					</div>
					<a
						href={CONTACT.matrix}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 block text-lg font-extrabold tracking-[-0.02em] text-text transition-colors hover:text-mauve"
					>
						Find me on Matrix
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
										className="nb-chip group text-subtext0 transition-colors hover:bg-mauve hover:text-on-accent"
									>
										<Icon className="size-3.5 shrink-0" />
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
