import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { SectionLabel } from "~/components/layout/page_header";
import { formatDate, posts } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { PROJECTS, SITE } from "~/lib/site";

export const meta = () => seo({ title: SITE.name });

function WritingList() {
	return (
		<section>
			<div className="flex items-baseline justify-between">
				<SectionLabel>Writing</SectionLabel>
				<Link
					to="/blog"
					className="inline-flex min-h-6 items-center py-1 text-meta uppercase tracking-[0.12em] hover:text-mauve"
				>
					All {posts.length}
				</Link>
			</div>

			<ul>
				{posts.slice(0, 6).map((post, index) => (
					<li key={post.slug} className="border-b-2 border-ink">
						<Link
							to={`/blog/${post.slug}`}
							className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-5 sm:grid-cols-[2rem_minmax(0,1fr)_7rem]"
						>
							<span className="text-meta pt-1.5 text-overlay1 tabular-nums">
								{String(index + 1).padStart(2, "0")}
							</span>
							<span className="min-w-0">
								<span className="block text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-text transition-colors group-hover:bg-mauve group-hover:text-on-accent">
									{post.title}
								</span>
								<span className="mt-1.5 block text-meta">
									{post.tags.map((tag) => `#${tag}`).join("  ")}
								</span>
							</span>
							<time
								dateTime={post.date}
								className="text-meta col-start-2 sm:col-start-3 sm:text-right"
							>
								{formatDate(post.date)}
							</time>
						</Link>
					</li>
				))}
			</ul>

			<Link to="/blog" className="nb-button mt-8 bg-base text-text">
				Read all writing
				<ArrowRight className="size-4" />
			</Link>
		</section>
	);
}

function ProjectsRail() {
	return (
		<section className="nb-panel p-5">
			<div className="flex items-baseline justify-between">
				<p className="text-label text-subtext0">Projects</p>
				<Link
					to="/projects"
					className="inline-flex min-h-6 items-center py-1 text-meta uppercase tracking-[0.12em] hover:text-mauve"
				>
					All
				</Link>
			</div>
			<ul className="mt-3">
				{PROJECTS.map((project) => (
					<li key={project.name}>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-baseline justify-between gap-4 border-b border-rule py-2.5 last:border-b-0"
						>
							<span className="text-[13px] font-semibold text-text transition-colors group-hover:text-mauve">
								{project.name}
							</span>
							<ArrowUpRight className="size-3.5 shrink-0 text-subtext0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}

export default function Home() {
	return (
		<div>
			<header className="border-t-2 border-ink pt-4">
				<div className="flex items-baseline justify-between gap-6">
					<span className="nb-chip bg-mauve uppercase tracking-[0.1em] text-on-accent">
						01<span className="mx-1 opacity-40">/</span>Index
					</span>
				</div>

				<div className="mt-12">
					<h1 className="text-display text-text">{SITE.name}</h1>
					<p className="mt-7 max-w-[52ch] text-lead">
						Self-taught developer. I write about privacy, Linux, note taking and
						the tools I keep rebuilding.
					</p>
					<div className="mt-9 flex flex-wrap items-center gap-3">
						<Link to="/blog" className="nb-button bg-mauve text-on-accent">
							Read the writing
							<ArrowRight className="size-4" />
						</Link>
						<Link to="/projects" className="nb-button bg-base text-text">
							Projects
						</Link>
						<a
							href="mailto:contact@dontblameme.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="nb-button bg-base text-text"
						>
							Email
						</a>
					</div>
				</div>
			</header>

			<div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
				<WritingList />
				<div className="flex flex-col gap-6">
					<ProjectsRail />
				</div>
			</div>
		</div>
	);
}
