import { ArrowLeft, ArrowRight, Clock, Type } from "lucide-react";
import { type ReactElement, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
import { SectionLabel } from "~/components/layout/page_header";
import type { PostSlug } from "~/content/posts/slugs";
import { useActiveHeading } from "~/hooks/use_active_heading";
import type { Section } from "~/lib/post_types";
import { formatDate, getPost, neighbours } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";
import { NotFound } from "~/routes/__404/not_found";

/* One level of nesting, scaled so narrow screens keep room for the label. */
const TOC_INDENT_STEP = "clamp(0.75rem, 2vw, 1.25rem)";

/** Route meta for one post. Called by the post's own route module. */
export function postMeta(slug: PostSlug) {
	const post = getPost(slug);
	const tags = seo({
		title: post?.title ?? "Not found",
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
	className,
	onNavigate,
}: {
	sections: Section[];
	active: string | null;
	className?: string;
	onNavigate?: () => void;
}) {
	const activeRef = useRef<HTMLAnchorElement>(null);
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const reveal = () => {
			const nav = navRef.current;
			const link = activeRef.current;
			if (!nav || !link || !window.matchMedia("(min-width: 1024px)").matches)
				return;
			const box = nav.getBoundingClientRect();
			const item = link.getBoundingClientRect();
			if (item.top < box.top) nav.scrollTop -= box.top - item.top;
			else if (item.bottom > box.bottom)
				nav.scrollTop += item.bottom - box.bottom;
		};

		reveal();
		window.addEventListener("resize", reveal);
		return () => window.removeEventListener("resize", reveal);
	}, [active]);
	return (
		<nav ref={navRef} aria-label="On this page" className={className}>
			<ul className="[&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-b-rule [&>li]:rounded-none">
				{sections.map((section) => (
					<li
						key={section.id}
						className="relative"
						style={{
							paddingLeft: `calc(0.5rem + ${section.level - 2} * ${TOC_INDENT_STEP})`,
						}}
					>
						{active === section.id ? (
							<span
								aria-hidden="true"
								className="toc-marker absolute inset-y-0 left-0 w-0.5 bg-accent"
							/>
						) : null}
						<a
							href={`#${section.id}`}
							aria-current={active === section.id ? "true" : undefined}
							ref={active === section.id ? activeRef : undefined}
							onClick={onNavigate}
							className={cn(
								"block py-2 text-[11px] leading-relaxed transition-colors",
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
		</nav>
	);
}

export function PostPage({
	slug,
	sections,
	Body,
}: {
	slug: PostSlug;
	sections: Section[];
	Body: () => ReactElement;
}) {
	const post = getPost(slug);
	const ids = useMemo(() => sections.map((section) => section.id), [sections]);
	const active = useActiveHeading(ids);
	const body = useMemo(() => <Body />, [Body]);
	const contentsRef = useRef<HTMLDetailsElement>(null);

	if (!post) return <NotFound status={404} />;

	const { previous, next } = neighbours(post.slug);
	return (
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
							</span>
						</div>

						<h1 className="mt-12 max-w-[24ch] text-page-title text-text">
							{post.title}
						</h1>

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
								<Link
									key={tag}
									to={`/blog?tag=${encodeURIComponent(tag)}`}
									prefetch="intent"
									className="nb-chip text-subtext0 transition-colors hover:bg-accent hover:text-on-accent"
								>
									#{tag}
								</Link>
							))}
						</div>
					</header>

					<details ref={contentsRef} className="nb-panel mt-12 p-5 lg:hidden">
						<summary className="list-item min-h-6 cursor-pointer py-1 text-label text-text">
							Contents
						</summary>
						<Toc
							sections={sections}
							active={active}
							className="mt-3 max-h-64 overflow-y-auto pl-1 -ml-1"
							onNavigate={() => contentsRef.current?.removeAttribute("open")}
						/>
					</details>

					<div className="mt-14">{body}</div>

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
							className="mt-3 min-h-0 overflow-y-auto pl-1 -ml-1 pr-1"
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
	);
}
