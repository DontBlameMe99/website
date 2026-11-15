import { ArrowLeft, ArrowRight, Clock, Hash } from "lucide-react";
import { Link, useParams } from "react-router";
import { Tile } from "~/components/wm/tile";
import { useActiveHeading } from "~/hooks/use_active_heading";
import { accentVar, formatDate, getPost, neighbours } from "~/lib/posts";
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
		<nav
			aria-label="More posts"
			className="mt-10 grid gap-2 border-t border-border pt-4 sm:grid-cols-2"
		>
			{previous ? (
				<Link
					to={`/blog/${previous.slug}`}
					className="group flex flex-col gap-1 rounded-[2px] border border-border p-2.5 transition-colors hover:border-mauve/40"
				>
					<span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-overlay1">
						<ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
						older
					</span>
					<span className="text-xs leading-snug text-text group-hover:text-mauve">
						{previous.title}
					</span>
				</Link>
			) : (
				<span className="hidden sm:block" />
			)}
			{next ? (
				<Link
					to={`/blog/${next.slug}`}
					className="group flex flex-col items-end gap-1 rounded-[2px] border border-border p-2.5 text-right transition-colors hover:border-mauve/40"
				>
					<span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-overlay1">
						newer
						<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
					</span>
					<span className="text-xs leading-snug text-text group-hover:text-mauve">
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
		<div className="grid items-start gap-2 lg:grid-cols-[minmax(0,1fr)_16rem]">
			<Tile
				title={`~/blog/${post.slug}`}
				label={post.title}
				accent={accentVar(post.accent)}
				progress
				aside={`${post.minutes} min`}
			>
				<article className="min-w-0 px-4 py-6 sm:px-7">
					<Link
						to="/blog"
						className="inline-flex items-center gap-1.5 text-[11px] text-overlay1 transition-colors hover:text-mauve"
					>
						<ArrowLeft className="size-3" />
						all posts
					</Link>

					<header className="mt-4">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-overlay1">
							<time dateTime={post.date}>{formatDate(post.date)}</time>
							<span className="inline-flex items-center gap-1">
								<Clock className="size-3" />
								{post.minutes} min
							</span>
							<span>{post.words} words</span>
						</div>
						<h1 className="mt-2 max-w-[24ch] text-fluid-3xl text-mauve">
							{post.title}
						</h1>
						<p className="mt-3 max-w-prose border-l-2 border-post-accent pl-3 text-fluid-sm leading-relaxed text-subtext0">
							{post.summary}
						</p>
						<div className="mt-3 flex flex-wrap gap-1.5">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									to={`/blog?tag=${tag}`}
									className="inline-flex items-center gap-1 rounded-[2px] border border-border px-1.5 py-0.5 text-[10px] text-overlay1 transition-colors hover:border-post-accent/50 hover:text-post-accent"
								>
									<Hash className="size-2.5" />
									{tag}
								</Link>
							))}
						</div>
					</header>

					<div className="mt-7">
						<PostBody />
					</div>

					<PostNav previous={previous} next={next} />
				</article>
			</Tile>

			<aside className="flex flex-col gap-2 lg:sticky lg:top-10">
				<Tile
					title="~/toc"
					label="on this page"
					accent={accentVar(post.accent)}
				>
					<nav
						aria-label="On this page"
						className="max-h-[60vh] overflow-y-auto p-2"
					>
						<ul className="space-y-0.5">
							{post.sections.map((section) => (
								<li key={section.id}>
									<a
										href={`#${section.id}`}
										className={cn(
											"block border-l-2 py-0.5 pl-2 text-[11px] leading-relaxed transition-colors",
											section.level >= 3 && "pl-4 text-[10px]",
											active === section.id
												? "border-mauve text-text"
												: "border-transparent text-overlay1 hover:text-subtext0",
										)}
									>
										{section.text}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</Tile>

				<Tile
					title="~/meta"
					label="post.meta"
					accent={accentVar(post.accent)}
					className="hidden lg:flex"
				>
					<dl className="space-y-1 p-2 text-[11px]">
						{[
							["date", formatDate(post.date)],
							["words", String(post.words)],
							["reading", `${post.minutes} min`],
							["tags", post.tags.join(", ")],
						].map(([key, value]) => (
							<div
								key={key}
								className="flex items-baseline justify-between gap-2"
							>
								<dt className="text-overlay1">{key}</dt>
								<dd className="text-right text-subtext1">{value}</dd>
							</div>
						))}
					</dl>
				</Tile>
			</aside>
		</div>
	);
}
