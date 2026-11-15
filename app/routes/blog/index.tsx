import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	Search,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Stagger, StaggerItem } from "~/components/ui/blur_fade";
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
		<div className="grid items-start gap-2 lg:grid-cols-[17rem_minmax(0,1fr)]">
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
							className="w-full rounded-[2px] border border-border bg-crust px-2 py-1.5 pl-7 pr-7 text-xs text-text placeholder:text-overlay0 focus:border-mauve/50 focus:outline-none"
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

					<button
						type="button"
						onClick={() => setNewestFirst((value) => !value)}
						className="inline-flex w-full items-center justify-center gap-1.5 rounded-[2px] border border-border px-2 py-1.5 text-[11px] text-subtext0 transition-colors hover:border-mauve/40 hover:text-mauve"
					>
						{newestFirst ? (
							<ArrowDownWideNarrow className="size-3.5" />
						) : (
							<ArrowUpNarrowWide className="size-3.5" />
						)}
						{newestFirst ? "newest first" : "oldest first"}
					</button>

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
				aside={`${filtered.length} shown`}
			>
				{filtered.length ? (
					<Stagger step={0.03}>
						<ul className="divide-y divide-border">
							{filtered.map((post) => (
								<StaggerItem key={post.slug}>
									<Link
										to={`/blog/${post.slug}`}
										className="group flex items-start gap-3 px-3 py-3 transition-colors hover:bg-surface0/25"
									>
										<span
											aria-hidden="true"
											className="mt-2 size-1.5 shrink-0 rounded-full"
											style={{
												background: `var(--${post.accent}, var(--mauve))`,
											}}
										/>
										<span className="min-w-0 flex-1">
											<span className="block text-sm font-semibold leading-snug text-text transition-colors group-hover:text-mauve">
												{post.title}
											</span>
											<span className="mt-1 block text-xs leading-relaxed text-overlay1">
												{post.summary}
											</span>
											<span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-overlay0">
												{post.tags.map((value) => (
													<span key={value}>#{value}</span>
												))}
												<span>·</span>
												<span>{post.words} words</span>
											</span>
										</span>
										<span className="flex shrink-0 flex-col items-end gap-1 text-[10px] text-overlay1">
											<time dateTime={post.date}>{formatDate(post.date)}</time>
											<span>{post.minutes} min</span>
										</span>
									</Link>
								</StaggerItem>
							))}
						</ul>
					</Stagger>
				) : (
					<div className="grid place-items-center gap-2 px-6 py-16 text-center">
						<p className="text-xs text-subtext0">no posts match that.</p>
						<button
							type="button"
							onClick={() => {
								setQuery("");
								setTag(null);
							}}
							className="text-[11px] text-mauve underline underline-offset-4"
						>
							reset the filter
						</button>
					</div>
				)}
				<div className="border-t border-border px-3 py-1.5 text-[10px] text-overlay1">
					{posts.length} posts, {allTags.length} tags. The text is the author's,
					the figures are extra.
				</div>
			</Tile>
		</div>
	);
}
