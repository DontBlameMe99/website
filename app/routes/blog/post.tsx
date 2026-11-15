import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { SectionLabel } from "~/components/layout/page_header";
import { ScrollProgress } from "~/components/ui/scroll_progress";
import { useActiveHeading } from "~/hooks/use_active_heading";
import { formatDate, getPost, neighbours } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";
import { NotFound } from "~/routes/__404/not_found";

export function meta({ params }: { params: { slug?: string } }) {
	const post = params.slug ? getPost(params.slug) : undefined;
	return seo({
		title: post?.title ?? "Post",
		description: post?.summary,
		type: "article",
	});
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
					className="nb-panel nb-lift group flex flex-col gap-3 p-5"
				>
					<span className="inline-flex items-center gap-2 text-label text-subtext0">
						<ArrowLeft className="size-3" />
						Older
					</span>
					<span className="text-sm font-bold leading-snug text-text group-hover:text-mauve">
						{previous.title}
					</span>
				</Link>
			) : (
				<span className="hidden sm:block" />
			)}
			{next ? (
				<Link
					to={`/blog/${next.slug}`}
					className="nb-panel nb-lift group flex flex-col items-end gap-3 p-5 text-right"
				>
					<span className="inline-flex items-center gap-2 text-label text-subtext0">
						Newer
						<ArrowRight className="size-3" />
					</span>
					<span className="text-sm font-bold leading-snug text-text group-hover:text-mauve">
						{next.title}
					</span>
				</Link>
			) : null}
		</nav>
	);
}

export default function PostPage() {
	const { slug } = useParams();
	const post = slug ? getPost(slug) : undefined;

	if (!post) return <NotFound status={404} />;

	const PostBody = post.Component;
	const { previous, next } = neighbours(post.slug);
	const active = useActiveHeading(post.sections.map((section) => section.id));

	return (
		<article>
			<ScrollProgress className="fixed inset-x-0 top-16 z-50 h-[3px] origin-left bg-mauve" />

			<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
				<div className="min-w-0 max-w-[70ch]">
					<header className="border-t-2 border-ink pt-4">
						<div className="flex items-baseline justify-between gap-6">
							<span className="nb-chip bg-mauve uppercase tracking-[0.1em] text-crust">
								Post
							</span>
							<time
								dateTime={post.date}
								className="text-meta uppercase tracking-[0.12em]"
							>
								{formatDate(post.date)}
							</time>
						</div>

						<h1 className="mt-12 max-w-[24ch] text-page-title text-text">
							{post.title}
						</h1>

						<p className="mt-6 max-w-[52ch] text-lead">{post.summary}</p>

						<div className="mt-7 flex flex-wrap items-center gap-2">
							<span className="nb-chip bg-base text-subtext0">
								{post.minutes} min read
							</span>
							<span className="nb-chip bg-base text-subtext0">
								{post.words.toLocaleString("en-US")} words
							</span>
							{post.tags.map((tag) => (
								<span key={tag} className="nb-chip bg-base text-subtext0">
									#{tag}
								</span>
							))}
						</div>
					</header>

					<div className="mt-14">
						<PostBody />
					</div>

					<PostNav previous={previous} next={next} />

					<Link to="/blog" className="nb-button mt-10 bg-base text-text">
						<ArrowLeft className="size-4" />
						All writing
					</Link>
				</div>

				<aside className="lg:sticky lg:top-24 lg:self-start">
					<div className="nb-panel p-5">
						<SectionLabel>Contents</SectionLabel>
						<nav aria-label="On this page" className="mt-3">
							<ul>
								{post.sections.map((section) => (
									<li key={section.id}>
										<a
											href={`#${section.id}`}
											className={cn(
												"block border-b border-rule py-1.5 text-[11px] leading-relaxed transition-colors last:border-b-0",
												section.level >= 3 && "pl-3 text-[10.5px]",
												active === section.id
													? "font-bold text-mauve"
													: "text-subtext0 hover:text-text",
											)}
										>
											{section.text}
										</a>
									</li>
								))}
							</ul>
						</nav>

						<div className="mt-6 hidden lg:block">
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
