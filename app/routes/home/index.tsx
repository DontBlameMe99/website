import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { Article } from "~/components/post/article";
import { socialIcon } from "~/components/shared/social_icons";
import { BlurFade } from "~/components/ui/blur_fade";
import { Marquee } from "~/components/ui/marquee";
import { NumberTicker } from "~/components/ui/number_ticker";
import { Tile } from "~/components/wm/tile";
import { parseMarkdown } from "~/lib/markdown";
import { formatDate, posts } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { PROJECTS, SITE, SOCIALS, TOPICS } from "~/lib/site";

export const meta = () => seo({ title: SITE.name });

const WELCOME = `
## 👋 Welcome to My Website

Hey there!

I am DontBlameMe, a self-taught developer passionate about technology, development, privacy, open-source software, Linux, and security.

## What Does This Site Include?

This site includes my blog, which you can find below, and a [Projects](/projects) page. To get in touch, visit [Contact](/contact). Both pages are also linked in the header.

## How Do I Access an RSS Feed?

To access the RSS feed, you can simply use this website's URL directly in your RSS reader of choice. If you need a direct \`rss.xml\`, you may use [this URL](https://dontblameme.codeberg.page/index.xml), and if you prefer a \`sitemap.xml\` you may use [this URL](https://dontblameme.codeberg.page/sitemap.xml).
`;

const welcomeBlocks = parseMarkdown(WELCOME);

const stats = [
	{ label: "posts", value: posts.length },
	{
		label: "words",
		value: posts.reduce((total, post) => total + post.words, 0),
	},
	{ label: "tags", value: new Set(posts.flatMap((post) => post.tags)).size },
];

function Hero() {
	return (
		<Tile
			title="~/whoami"
			label="dbm@nixos: ~/whoami"
			accent="var(--mauve)"
			aside={
				<span className="inline-flex items-center gap-1">
					<Sparkles className="size-3 text-mauve" />
					v2.0
				</span>
			}
			className="h-full"
		>
			<div className="px-4 py-5 sm:px-6 sm:py-7">
				<BlurFade delay={0.02}>
					<p className="text-[10px] uppercase tracking-[0.22em] text-overlay1">
						nixos · catppuccin · malva
					</p>
				</BlurFade>

				<BlurFade delay={0.08}>
					<h1 className="mt-2 text-fluid-5xl leading-[1.02]">
						<span className="text-gradient">{SITE.name}</span>
					</h1>
				</BlurFade>

				<BlurFade delay={0.16}>
					<p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-fluid-sm text-subtext0">
						<span className="text-mauve">
							<ArrowRight className="inline size-4" />
						</span>
						<span className="text-teal">{SITE.roles[0]}</span>
						<span className="text-overlay0">and</span>
						<span className="text-pink">{SITE.roles[3]}</span>
					</p>
				</BlurFade>

				<BlurFade delay={0.24}>
					<p className="mt-4 max-w-prose text-fluid-sm leading-relaxed text-subtext0">
						I write about the things I break, fix, and then write down so I
						don't forget. Linux, privacy, note taking, keyboards, and the
						occasional strong opinion.
					</p>
				</BlurFade>

				<BlurFade delay={0.32}>
					<div className="mt-5 flex flex-wrap items-center gap-2">
						<Link
							to="/blog"
							className="group inline-flex items-center gap-2 rounded-[2px] border border-mauve/60 bg-mauve/15 px-3 py-1.5 text-xs font-semibold text-mauve transition-colors hover:bg-mauve/25"
						>
							<BookOpen className="size-3.5" />
							read the blog
							<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
						</Link>
						<Link
							to="/projects"
							className="inline-flex items-center gap-2 rounded-[2px] border border-border px-3 py-1.5 text-xs text-subtext1 transition-colors hover:border-teal/50 hover:text-teal"
						>
							projects
						</Link>
					</div>
				</BlurFade>

				<BlurFade delay={0.4}>
					<div className="mt-5 flex items-center gap-1.5">
						{SOCIALS.map((social) => {
							const Icon = socialIcon(social.icon);
							return (
								<motion.a
									key={social.label}
									href={social.href}
									target={
										social.href.startsWith("mailto:") ? undefined : "_blank"
									}
									rel="noopener noreferrer"
									aria-label={social.label}
									title={social.label}
									whileHover={{ y: -2 }}
									transition={{ type: "spring", stiffness: 400, damping: 16 }}
									className="grid size-7 place-items-center rounded-[2px] border border-border text-overlay1 transition-colors hover:border-mauve/40 hover:text-mauve"
								>
									<Icon className="size-3.5" />
								</motion.a>
							);
						})}
					</div>
				</BlurFade>

				<BlurFade delay={0.48}>
					<dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4">
						{stats.map((stat) => (
							<div key={stat.label}>
								<dd className="text-base font-bold text-text">
									<NumberTicker value={stat.value} />
								</dd>
								<dt className="text-[10px] uppercase tracking-[0.18em] text-overlay1">
									{stat.label}
								</dt>
							</div>
						))}
						<div>
							<dd className="text-base font-bold text-text">100%</dd>
							<dt className="text-[10px] uppercase tracking-[0.18em] text-overlay1">
								catppuccin
							</dt>
						</div>
					</dl>
				</BlurFade>
			</div>
		</Tile>
	);
}

function Profile() {
	const reduced = useReducedMotion();

	return (
		<Tile
			title="~/profile"
			label="profile.png"
			accent="var(--green)"
			className="h-full"
		>
			<div className="flex h-full flex-col gap-3 p-3">
				<div
					className="relative grid flex-1 place-items-center overflow-hidden rounded-[2px] border border-border"
					style={{
						background:
							"radial-gradient(120% 110% at 20% 10%, color-mix(in srgb, var(--mauve) 16%, transparent), transparent 55%), radial-gradient(100% 100% at 90% 90%, color-mix(in srgb, var(--green) 12%, transparent), transparent 60%), var(--crust)",
					}}
				>
					<motion.img
						src="/images/avatar.png"
						alt="DontBlameMe's profile picture: a gradient dbm wordmark"
						width={800}
						height={800}
						className="w-[76%] max-w-[16rem]"
						animate={reduced ? undefined : { y: [0, -6, 0] }}
						transition={{
							duration: 7,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>
				<div className="flex items-center justify-between text-[10px] text-overlay1">
					<span className="uppercase tracking-[0.16em]">profile.png</span>
					<span className="inline-flex items-center gap-1.5 text-green">
						<span className="relative grid size-1.5 place-items-center">
							<span className="size-1.5 rounded-full bg-green" />
							<motion.span
								className="absolute size-1.5 rounded-full bg-green"
								animate={
									reduced ? undefined : { scale: [1, 2.6], opacity: [0.6, 0] }
								}
								transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
							/>
						</span>
						online
					</span>
				</div>
				<ul className="grid gap-1 border-t border-border pt-2 text-[11px]">
					{[
						["os", "nixos"],
						["editor", "neovim"],
						["notes", "typst"],
						["layout", "colemak dh"],
					].map(([key, value]) => (
						<li key={key} className="flex items-baseline justify-between gap-2">
							<span className="text-overlay1">{key}</span>
							<span className="text-subtext1">{value}</span>
						</li>
					))}
				</ul>
			</div>
		</Tile>
	);
}

function TopicMarquee() {
	return (
		<div className="relative my-2 overflow-hidden border border-border bg-mantle py-1.5">
			<Marquee duration={44}>
				{TOPICS.map((topic) => (
					<span key={topic} className="flex items-center gap-5">
						<span className="text-[10px] uppercase tracking-[0.22em] text-overlay1">
							{topic}
						</span>
						<span aria-hidden="true" className="text-mauve/60">
							✦
						</span>
					</span>
				))}
			</Marquee>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-mantle to-transparent"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-mantle to-transparent"
			/>
		</div>
	);
}

function LatestPosts() {
	return (
		<Tile
			title="~/blog/latest.log"
			label="latest.log"
			accent="var(--teal)"
			aside={
				<Link
					to="/blog"
					className="inline-flex items-center gap-1 hover:text-mauve"
				>
					all {posts.length}
					<ArrowUpRight className="size-3" />
				</Link>
			}
			className="h-full"
		>
			<ul className="divide-y divide-border">
				{posts.slice(0, 4).map((post) => (
					<li key={post.slug}>
						<Link
							to={`/blog/${post.slug}`}
							className="group flex items-baseline gap-3 px-3 py-2.5 transition-colors hover:bg-surface0/30"
						>
							<span
								aria-hidden="true"
								className="mt-1 size-1.5 shrink-0 self-center rounded-full"
								style={{ background: `var(--${post.accent}, var(--mauve))` }}
							/>
							<span className="min-w-0 flex-1">
								<span className="block text-[13px] font-semibold leading-snug text-text group-hover:text-mauve">
									{post.title}
								</span>
								<span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] text-overlay1">
									<span>{post.tags.slice(0, 3).join(" · ")}</span>
									<span className="text-overlay0">{post.minutes} min</span>
								</span>
							</span>
							<time
								dateTime={post.date}
								className="shrink-0 text-[10px] text-overlay1"
							>
								{formatDate(post.date)}
							</time>
						</Link>
					</li>
				))}
			</ul>
		</Tile>
	);
}

function ProjectsTeaser() {
	return (
		<Tile
			title="~/projects"
			label="projects"
			accent="var(--green)"
			className="h-full"
		>
			<ul className="divide-y divide-border">
				{PROJECTS.map((project) => (
					<li key={project.name}>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-surface0/30"
						>
							<span
								aria-hidden="true"
								className="size-1.5 shrink-0 rounded-full"
								style={{ background: `var(--${project.accent})` }}
							/>
							<span className="min-w-0 flex-1 truncate text-[12px] text-subtext1 group-hover:text-text">
								{project.name}
							</span>
							<ArrowUpRight className="size-3 shrink-0 text-overlay1 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
						</a>
					</li>
				))}
			</ul>
		</Tile>
	);
}

function Welcome() {
	return (
		<Tile title="~/welcome.txt" label="welcome.txt" accent="var(--pink)">
			<div className="prose-dbm max-w-none px-4 py-5 sm:px-6">
				<Article
					post={{
						slug: "welcome",
						title: "Welcome",
						date: "",
						summary: "",
						tags: [],
						accent: "pink",
						blocks: welcomeBlocks,
						headings: [],
						words: 0,
						minutes: 0,
						order: 0,
					}}
				/>
			</div>
		</Tile>
	);
}

export default function Home() {
	return (
		<div className="space-y-2">
			<div className="grid gap-2 lg:grid-cols-[1.5fr_0.8fr]">
				<Hero />
				<Profile />
			</div>
			<TopicMarquee />
			<div className="grid gap-2 lg:grid-cols-[1.5fr_0.8fr]">
				<LatestPosts />
				<ProjectsTeaser />
			</div>
			<Welcome />
		</div>
	);
}
