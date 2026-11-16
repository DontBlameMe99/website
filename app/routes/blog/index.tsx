import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	Clock,
	Search,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { PageHeader } from "~/components/layout/page_header";
import { allTags, formatDate, posts } from "~/lib/posts";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";

export const meta = () =>
	seo({
		title: "Writing",
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
		<div>
			<PageHeader
				index="02"
				label="Writing"
				title="Writing"
				lead="Long-form notes on privacy, Linux, and the software I break on purpose. No schedule, no newsletter, no tracking."
			/>

			<div className="mt-12 flex flex-col gap-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<label className="search-field nb-input flex w-full items-center gap-2 sm:max-w-sm">
						<Search className="size-4 shrink-0 text-subtext0" />
						<input
							type="search"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Filter posts"
							aria-label="Filter posts"
							className="w-full bg-transparent"
						/>
						<button
							type="button"
							onClick={() => setQuery("")}
							aria-label="Clear filter"
							tabIndex={query ? 0 : -1}
							className={cn(
								"grid size-6 shrink-0 place-items-center text-subtext0 transition-colors hover:text-text",
								!query && "invisible",
							)}
						>
							<X aria-hidden="true" className="size-3.5" />
						</button>
					</label>

					<div className="flex items-center gap-4">
						<span
							aria-live="polite"
							className="min-w-14 text-right text-meta tabular-nums"
						>
							{filtered.length} / {posts.length}
						</span>
						<button
							type="button"
							onClick={() => setNewestFirst((value) => !value)}
							className="nb-button min-w-28 justify-center bg-base py-1.5 text-[11px] uppercase tracking-[0.08em] text-text"
						>
							{newestFirst ? (
								<ArrowDownWideNarrow className="size-3.5" />
							) : (
								<ArrowUpNarrowWide className="size-3.5" />
							)}
							{newestFirst ? "Newest" : "Oldest"}
						</button>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setTag(null)}
						aria-pressed={tag === null}
						className={cn(
							"nb-chip transition-colors",
							tag === null
								? "bg-mauve text-on-accent"
								: "bg-base text-subtext0 hover:bg-surface0 hover:text-text",
						)}
					>
						All
					</button>
					{allTags.map((value) => (
						<button
							key={value}
							type="button"
							onClick={() => setTag(tag === value ? null : value)}
							aria-pressed={tag === value}
							className={cn(
								"nb-chip transition-colors",
								tag === value
									? "bg-mauve text-on-accent"
									: "bg-base text-subtext0 hover:bg-surface0 hover:text-text",
							)}
						>
							{value}
						</button>
					))}
				</div>
			</div>

			{filtered.length ? (
				<ul className="mt-10 grid gap-6 sm:grid-cols-2">
					{filtered.map((post) => (
						<li key={post.slug} className="flex">
							<Link
								to={`/blog/${post.slug}`}
								className="nb-panel nb-lift group flex h-full w-full flex-col p-6"
							>
								<div className="flex items-start justify-between gap-4">
									<h2 className="text-xl font-bold leading-[1.1] tracking-[-0.02em] text-text transition-colors group-hover:text-mauve">
										{post.title}
									</h2>
									<span className="flex shrink-0 items-center gap-1 text-label text-subtext0">
										<Clock aria-hidden="true" className="size-3" />
										{post.minutes} min
									</span>
								</div>

								<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
									{post.summary}
								</p>

								<div className="mt-auto flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3 text-meta">
									<time dateTime={post.date}>{formatDate(post.date)}</time>
									<span className="text-right">
										{post.tags.map((value) => `#${value}`).join(" ")}
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<div className="mt-12 nb-panel p-8">
					<p className="text-sm text-subtext0">Nothing matches that filter.</p>
					<button
						type="button"
						onClick={() => {
							setQuery("");
							setTag(null);
						}}
						className="nb-button mt-4 bg-mauve text-on-accent"
					>
						Reset it
					</button>
				</div>
			)}
		</div>
	);
}
