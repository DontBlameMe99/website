import { ArrowUpRight, Copy, Mail, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { socialIcon } from "~/components/shared/social_icons";
import { Tile } from "~/components/wm/tile";
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
			// Clipboard can be unavailable. The address stays visible.
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex items-center gap-1.5 rounded-[2px] border border-border px-2 py-0.5 text-[10px] text-overlay1 transition-colors hover:border-mauve/40 hover:text-mauve"
		>
			<Copy className="size-3" />
			{copied ? "copied" : "copy address"}
		</button>
	);
}

export default function ContactPage() {
	return (
		<div className="space-y-2">
			<div className="grid gap-2 sm:grid-cols-2">
				<Tile title="~/mail" label="email" accent="var(--pink)">
					<div className="flex h-full flex-col gap-3 p-4">
						<span className="grid size-7 place-items-center rounded-[2px] border border-mauve/30 bg-mauve/10 text-mauve">
							<Mail className="size-3.5" strokeWidth={1.8} />
						</span>
						<h2 className="text-sm font-bold text-text">Email</h2>
						<a
							href={`mailto:${CONTACT.email}`}
							className="break-all text-xs text-lavender underline decoration-lavender/40 underline-offset-4 hover:text-mauve"
						>
							{CONTACT.email}
						</a>
						<div className="mt-auto pt-1">
							<CopyEmail />
						</div>
					</div>
				</Tile>

				<Tile title="~/matrix" label="matrix" accent="var(--teal)">
					<a
						href={CONTACT.matrix}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex h-full flex-col gap-3 p-4 transition-colors hover:bg-surface0/20"
					>
						<span className="grid size-7 place-items-center rounded-[2px] border border-teal/30 bg-teal/10 text-teal">
							<MessagesSquare className="size-3.5" strokeWidth={1.8} />
						</span>
						<h2 className="text-sm font-bold text-text">Matrix</h2>
						<p className="text-xs leading-relaxed text-overlay1">
							Find me on Matrix / Element. End to end encrypted, no phone
							number.
						</p>
						<span className="mt-auto inline-flex items-center gap-1 text-[10px] text-overlay1 group-hover:text-teal">
							open matrix
							<ArrowUpRight className="size-3" />
						</span>
					</a>
				</Tile>
			</div>

			<Tile title="~/elsewhere" label="elsewhere" accent="var(--blue)">
				<ul className="divide-y divide-border">
					{ELSEWHERE.map((social) => {
						const Icon = socialIcon(social.icon);
						return (
							<li key={social.label}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 px-3 py-2 transition-colors hover:bg-surface0/25"
								>
									<Icon className="size-3.5 text-overlay1 transition-colors group-hover:text-mauve" />
									<span className="text-xs text-subtext0 group-hover:text-text">
										{social.label}
									</span>
									<span className="ml-auto truncate text-[10px] text-overlay0">
										{social.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
									</span>
									<ArrowUpRight className="size-3.5 shrink-0 text-overlay1 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mauve" />
								</a>
							</li>
						);
					})}
				</ul>
			</Tile>
		</div>
	);
}
