import { ArrowLeft, ArrowRight, Clock, Type } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { type ComponentType, useMemo } from "react";
import { Link } from "react-router";
import { SectionLabel } from "~/components/layout/page_header";
import { useActiveHeading } from "~/hooks/use_active_heading";
import { formatDate, getPost, neighbours } from "~/lib/posts";
import type { Section } from "~/lib/post_types";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";
import { NotFound } from "~/routes/__404/not_found";

/** Route meta for one post. Called by the post's own route module. */
export function postMeta(slug: string) {
	const post = getPost(slug);
	const tags = seo({
		title: post?.title ?? "Not found",
		description: post?.summary,
		type: post ? "article" : "website",
	});
	return () => tags;
}

function PostNav({
	previous,
	next,
}: {
	previous?: { slug: string; title: string };
	next?: { slug: string; title: string };
}) {
	return (
		<nav aria-label="More posts" className="mt-20 grid gap-6 sm:grid-cols-2">
			{previous ? (
				<Link
					to={`/blog/${previous.slug}`}
					prefetch="intent"
					className="nb-panel nb-lift group flex flex-col gap-3 p-5"
				>
					<span className="inline-flex items-center gap-2 text-label text-subtext0">
						<ArrowLeft className="icon-nudge-left size-3" />
						Older
					</span>
					<span className="text-sm font-bold leading-snug text-text group-hover:text-accent">
						{previous.title}
					</span>
				</Link>
			) : (
				<span className="hidden sm:block" />
			)}
			{next ? (
				<Link
					to={`/blog/${next.slug}`}
					prefetch="intent"
					className="nb-panel nb-lift group flex flex-col items-end gap-3 p-5 text-right"
				>
					<span className="inline-flex items-center gap-2 text-label text-subtext0">
						Newer
						<ArrowRight className="icon-nudge size-3" />
					</span>
					<span className="text-sm font-bold leading-snug text-text group-hover:text-accent">
						{next.title}
					</span>
				</Link>
			) : null}
		</nav>
	);
}

function Toc({
	sections,
	active,
	markerId,
	className,
}: {
	sections: { id: string; text: string; level: number }[];
	active: string | null;
	markerId: string;
	className?: string;
}) {
	return (
		<motion.nav layoutScroll aria-label="On this page" className={className}>
			<ul className="[&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-b-rule [&>li]:rounded-none">
				{sections.map((section) => (
					<li key={section.id} className="relative">
						{active === section.id ? (
							<motion.span
								layoutId={markerId}
								className="absolute inset-y-0 left-0 w-0.5 bg-accent"
								transition={{ type: "spring", stiffness: 380, damping: 30 }}
							/>
						) : null}
						<a
							href={`#${section.id}`}
							aria-current={active === section.id ? "true" : undefined}
							className={cn(
								"block py-2 text-[11px] leading-relaxed transition-colors",
								section.level >= 5
									? "pl-6"
									: section.level >= 3
										? "pl-3"
										: "pl-2",
								active === section.id
									? "text-accent underline decoration-2 underline-offset-4"
									: "text-subtext0 hover:text-text",
							)}
						>
							{section.text}
						</a>
					</li>
				))}
			</ul>
		</motion.nav>
	);
}

export function PostPage({
	slug,
	sections,
	Body,
}: {
	slug: string;
	sections: Section[];
	Body: ComponentType;
}) {
	const post = getPost(slug);

	if (!post) return <NotFound status={404} />;

	const { previous, next } = neighbours(post.slug);
	const ids = useMemo(() => sections.map((section) => section.id), [sections]);
	const active = useActiveHeading(ids);

	return (
		<MotionConfig reducedMotion="user">
			<article>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
					<div className="min-w-0 max-w-[70ch]">
						<header className="nb-line-t pt-4 page-window">
							<div className="flex items-baseline justify-between gap-6">
								<span className="nb-chip nb-accent uppercase tracking-[0.1em]">
									Post
								</span>
								<span className="flex items-center gap-3">
									<time
										dateTime={post.date}
										className="text-meta uppercase tracking-[0.12em]"
									>
										{formatDate(post.date)}
									</time>
									<span className="win-controls" aria-hidden="true">
										<span />
										<span />
										<span />
									</span>
								</span>
							</div>

							<h1 className="mt-12 max-w-[24ch] text-page-title text-text">
								{post.title}
							</h1>

							<p className="mt-6 max-w-[52ch] text-lead">{post.summary}</p>

							<div className="mt-7 flex flex-wrap items-center gap-2">
								<span className="nb-chip text-subtext0">
									<Clock aria-hidden="true" className="size-3" />
									{post.minutes} min read
								</span>
								<span className="nb-chip text-subtext0">
									<Type aria-hidden="true" className="size-3" />
									{post.words.toLocaleString("en-US")} words
								</span>
								{post.tags.map((tag) => (
									<span key={tag} className="nb-chip text-subtext0">
										#{tag}
									</span>
								))}
							</div>
						</header>

						<details className="nb-panel mt-12 p-5 lg:hidden">
							<summary className="cursor-pointer text-label text-text">
								Contents
							</summary>
							<Toc
								sections={sections}
								active={active}
								markerId="post-toc-mobile"
								className="mt-3 max-h-64 overflow-y-auto overscroll-contain pl-1 -ml-1"
							/>
						</details>

						<div className="mt-14">
							<Body />
						</div>

						<PostNav previous={previous} next={next} />

						<Link to="/blog" prefetch="intent" className="nb-button mt-10">
							<ArrowLeft className="icon-nudge-left size-4" />
							All writing
						</Link>
					</div>

					<aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:self-start">
						<div className="nb-panel flex max-h-[calc(100dvh-8rem)] flex-col p-5">
							<SectionLabel>Contents</SectionLabel>
							<Toc
								sections={sections}
								active={active}
								markerId="post-toc-desktop"
								className="mt-3 min-h-0 overflow-y-auto overscroll-contain pl-1 -ml-1 pr-1"
							/>

							<div className="mt-6">
								<SectionLabel>Meta</SectionLabel>
								<dl className="mt-3 text-meta">
									<div className="flex justify-between border-b border-rule py-1.5">
										<dt>Date</dt>
										<dd className="text-subtext1">{formatDate(post.date)}</dd>
									</div>
									<div className="flex justify-between border-b border-rule py-1.5">
										<dt>Words</dt>
										<dd className="text-subtext1">
											{post.words.toLocaleString("en-US")}
										</dd>
									</div>
									<div className="flex justify-between py-1.5">
										<dt>Reading</dt>
										<dd className="text-subtext1">{post.minutes} min</dd>
									</div>
								</dl>
							</div>
						</div>
					</aside>
				</div>
			</article>
		</MotionConfig>
	);
}
