import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { socialIcon } from "~/components/shared/social_icons";
import { Tile } from "~/components/wm/tile";
import { formatDate, posts } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { PROJECTS, SITE, SOCIALS, TOPICS } from "~/lib/site";

export const meta = () => seo({ title: SITE.name });

const _STACK = ["nixos", "neovim", "typst", "colemak dh"];

function Hero({ className }: { className?: string }) {
	return (
		<Tile
			title="~/whoami"
			label="dbm@nixos: ~/whoami"
			accent="var(--mauve)"
			className={className}
		>
			<div className="flex h-full flex-col px-5 py-6 sm:px-7 sm:py-8">
				<p className="text-[10px] uppercase tracking-[0.2em] text-overlay1">
					personal site · privacy · linux · open source
				</p>

				<h1 className="mt-3 text-fluid-4xl text-text">{SITE.name}</h1>

				<p className="mt-4 max-w-[52ch] text-fluid-sm leading-relaxed text-subtext0">
					Self-taught developer. I write about the things I break, fix, and then
					write down so I don't forget: Linux, privacy, note taking, keyboards,
					and the occasional strong opinion.
				</p>

				<div className="mt-6 flex flex-wrap items-center gap-2">
					<Link
						to="/blog"
						className="group inline-flex items-center gap-2 rounded-[2px] border border-mauve/50 bg-mauve/12 px-3 py-1.5 text-xs font-semibold text-mauve transition-colors hover:border-mauve hover:bg-mauve/20"
					>
						<BookOpen className="size-3.5" />
						Read the blog
						<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
					</Link>
					<Link
						to="/projects"
						className="inline-flex items-center gap-2 rounded-[2px] border border-border px-3 py-1.5 text-xs text-subtext1 transition-colors hover:border-teal/50 hover:text-teal"
					>
						Projects
					</Link>
				</div>

				<div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
					<div className="flex items-center gap-1.5">
						{SOCIALS.map((social) => {
							const Icon = socialIcon(social.icon);
							return (
								<a
									key={social.label}
									href={social.href}
									target={
										social.href.startsWith("mailto:") ? undefined : "_blank"
									}
									rel="noopener noreferrer"
									aria-label={social.label}
									title={social.label}
									className="grid size-7 place-items-center rounded-[2px] border border-border text-overlay1 transition-colors hover:border-mauve/40 hover:text-mauve"
								>
									<Icon className="size-3.5" />
								</a>
							);
						})}
					</div>

					<p className="text-[11px] text-overlay1">
						{posts.length} posts ·{" "}
						{posts
							.reduce((total, post) => total + post.words, 0)
							.toLocaleString("en-US")}{" "}
						words
					</p>
				</div>
			</div>
		</Tile>
	);
}

function Profile({ className }: { className?: string }) {
	return (
		<Tile
			title="~/profile"
			label="profile.png"
			accent="var(--green)"
			className={className}
		>
			<div className="flex h-full flex-col p-3">
				<div
					className="relative grid min-h-[10.5rem] flex-1 place-items-center overflow-hidden rounded-[2px] border border-border"
					style={{
						background:
							"radial-gradient(120% 110% at 20% 10%, color-mix(in srgb, var(--mauve) 14%, transparent), transparent 58%), var(--crust)",
					}}
				>
					<img
						src="/images/avatar.png"
						alt="The dbm mark used as my avatar"
						width={800}
						height={800}
						className="w-[72%] max-w-[15rem]"
					/>
				</div>

				<dl className="mt-3 grid gap-1 text-[11px]">
					{[
						["os", "nixos"],
						["editor", "neovim"],
						["notes", "typst"],
						["layout", "colemak dh"],
					].map(([key, value]) => (
						<div
							key={key}
							className="flex items-baseline justify-between gap-2"
						>
							<dt className="text-overlay1">{key}</dt>
							<dd className="text-subtext1">{value}</dd>
						</div>
					))}
				</dl>

				<ul className="mt-3 flex flex-wrap gap-1 border-t border-border pt-3">
					{TOPICS.slice(0, 5).map((topic) => (
						<li
							key={topic}
							className="rounded-[2px] border border-border px-1.5 py-0.5 text-[10px] text-overlay1"
						>
							{topic}
						</li>
					))}
				</ul>
			</div>
		</Tile>
	);
}

function Writing({ className }: { className?: string }) {
	return (
		<Tile
			title="~/blog"
			label="recent posts"
			accent="var(--teal)"
			aside={
				<Link
					to="/blog"
					className="inline-flex items-center gap-1 transition-colors hover:text-mauve"
				>
					all {posts.length}
					<ArrowUpRight className="size-3" />
				</Link>
			}
			className={className}
		>
			<ul className="divide-y divide-border">
				{posts.slice(0, 5).map((post) => (
					<li key={post.slug}>
						<Link
							to={`/blog/${post.slug}`}
							className="group flex items-baseline gap-3 px-3 py-3 transition-colors hover:bg-surface0/25"
						>
							<span
								aria-hidden="true"
								className="size-1.5 shrink-0 self-center rounded-full"
								style={{ background: `var(--${post.accent}, var(--mauve))` }}
							/>
							<span className="min-w-0 flex-1">
								<span className="block text-[13px] font-semibold leading-snug text-text transition-colors group-hover:text-mauve">
									{post.title}
								</span>
								<span className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-overlay1">
									{post.tags.slice(0, 3).map((tag) => (
										<span key={tag}>#{tag}</span>
									))}
								</span>
							</span>
							<span className="flex shrink-0 flex-col items-end gap-0.5 text-[10px] text-overlay1">
								<time dateTime={post.date}>{formatDate(post.date)}</time>
								<span>{post.minutes} min</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</Tile>
	);
}

function Projects({ className }: { className?: string }) {
	return (
		<Tile
			title="~/projects"
			label="projects"
			accent="var(--green)"
			className={className}
		>
			<ul className="divide-y divide-border">
				{PROJECTS.map((project) => (
					<li key={project.name}>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2.5 px-3 py-3 transition-colors hover:bg-surface0/25"
						>
							<span
								aria-hidden="true"
								className="size-1.5 shrink-0 rounded-full"
								style={{ background: `var(--${project.accent})` }}
							/>
							<span className="min-w-0 flex-1">
								<span className="block truncate text-[12px] text-subtext1 transition-colors group-hover:text-text">
									{project.name}
								</span>
								<span className="mt-0.5 block truncate text-[10px] text-overlay1">
									{project.blurb}
								</span>
							</span>
							<ArrowUpRight className="size-3 shrink-0 text-overlay1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</a>
					</li>
				))}
			</ul>
		</Tile>
	);
}

export default function Home() {
	return (
		<div className="grid items-start gap-2 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr]">
			<Hero className="lg:col-start-1 lg:row-start-1" />
			<Profile className="lg:col-start-2 lg:row-start-1" />
			<Writing className="lg:col-start-1 lg:row-start-2" />
			<Projects className="lg:col-start-2 lg:row-start-2" />
		</div>
	);
}
