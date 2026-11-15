import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	ArrowUpRight,
	Search,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Tile } from "~/components/wm/tile";
import { allTags, formatDate, posts } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";

export const meta = () =>
	seo({
		title: "Blog",
		description:
			"Everything DontBlameMe has written down: privacy, Linux, NixOS, note taking, keyboards, and the psychology of the feed.",
	});

export default function BlogIndex() {
	const [params] = useSearchParams();
	const [query, setQuery] = useState("");
	const [tag, setTag] = useState<string | null>(params.get("tag"));
	const [newestFirst, setNewestFirst] = useState(true);

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		const list = posts.filter((post) => {
			const matchesTag = !tag || post.tags.includes(tag);
			const matchesQuery =
				!needle ||
				post.title.toLowerCase().includes(needle) ||
				post.summary.toLowerCase().includes(needle) ||
				post.tags.some((value) => value.includes(needle));
			return matchesTag && matchesQuery;
		});
		return newestFirst ? list : [...list].reverse();
	}, [query, tag, newestFirst]);

	return (
		<div className="grid items-start gap-2 lg:grid-cols-[15rem_minmax(0,1fr)]">
			<Tile
				title="~/blog/filters"
				label="filters"
				accent="var(--mauve)"
				className="lg:sticky lg:top-10"
			>
				<div className="space-y-3 p-3">
					<label className="relative flex items-center">
						<Search className="pointer-events-none absolute left-2 size-3.5 text-overlay1" />
						<input
							type="search"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="grep the blog"
							aria-label="Search posts"
							className="w-full rounded-[2px] border border-border bg-crust px-2 py-1.5 pl-7 pr-7 text-xs text-text placeholder:text-overlay0 focus:border-mauve/60 focus:outline-none"
						/>
						{query ? (
							<button
								type="button"
								onClick={() => setQuery("")}
								aria-label="Clear search"
								className="absolute right-2 text-overlay1 hover:text-text"
							>
								<X className="size-3" />
							</button>
						) : null}
					</label>

					<div className="flex items-center justify-between text-[10px] text-overlay1">
						<span>
							{filtered.length} of {posts.length}
						</span>
						<button
							type="button"
							onClick={() => setNewestFirst((value) => !value)}
							className="inline-flex items-center gap-1 rounded-[2px] px-1 py-0.5 transition-colors hover:bg-surface0 hover:text-text"
						>
							{newestFirst ? (
								<ArrowDownWideNarrow className="size-3" />
							) : (
								<ArrowUpNarrowWide className="size-3" />
							)}
							{newestFirst ? "newest" : "oldest"}
						</button>
					</div>

					<div className="flex flex-wrap gap-1 border-t border-border pt-3">
						<button
							type="button"
							onClick={() => setTag(null)}
							className={cn(
								"rounded-[2px] border px-1.5 py-0.5 text-[10px] transition-colors",
								tag === null
									? "border-mauve/50 bg-mauve/15 text-mauve"
									: "border-border text-overlay1 hover:border-mauve/30 hover:text-text",
							)}
						>
							all
						</button>
						{allTags.map((value) => (
							<button
								key={value}
								type="button"
								onClick={() => setTag(tag === value ? null : value)}
								className={cn(
									"rounded-[2px] border px-1.5 py-0.5 text-[10px] transition-colors",
									tag === value
										? "border-mauve/50 bg-mauve/15 text-mauve"
										: "border-border text-overlay1 hover:border-mauve/30 hover:text-text",
								)}
							>
								{value}
							</button>
						))}
					</div>
				</div>
			</Tile>

			<Tile
				title="~/blog"
				label={`blog — ${posts.length} posts`}
				accent="var(--teal)"
			>
				{filtered.length ? (
					<ul className="grid gap-2 p-3 sm:grid-cols-2">
						{filtered.map((post) => (
							<li key={post.slug} className="flex">
								<Link
									to={`/blog/${post.slug}`}
									style={
										{
											"--post-accent": `var(--${post.accent}, var(--mauve))`,
										} as React.CSSProperties
									}
									className="group flex w-full flex-col gap-3 rounded-[2px] border border-border bg-base/40 p-3.5 transition-colors hover:border-[color-mix(in_srgb,var(--post-accent)_50%,transparent)] hover:bg-surface0/20 focus-visible:border-[color-mix(in_srgb,var(--post-accent)_60%,transparent)]"
								>
									<div className="flex items-center justify-between text-[10px] text-overlay1">
										<time dateTime={post.date}>{formatDate(post.date)}</time>
										<span>{post.minutes} min read</span>
									</div>

									<h2 className="text-[15px] font-semibold leading-snug text-text transition-colors group-hover:text-post-accent">
										{post.title}
									</h2>

									<p className="line-clamp-3 text-xs leading-relaxed text-overlay1">
										{post.summary}
									</p>

									<div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-2.5">
										<span className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-overlay0">
											{post.tags.map((value) => (
												<span key={value}>#{value}</span>
											))}
										</span>
										<ArrowUpRight className="size-3.5 shrink-0 text-overlay1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-post-accent" />
									</div>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<div className="grid place-items-center gap-2 px-6 py-16 text-center">
						<p className="text-xs text-subtext0">No posts match that.</p>
						<button
							type="button"
							onClick={() => {
								setQuery("");
								setTag(null);
							}}
							className="text-[11px] text-mauve underline underline-offset-4"
						>
							Reset the filter
						</button>
					</div>
				)}
			</Tile>
		</div>
	);
}
