import { postEntries } from "~/content/posts";
import { type PostSlug, postSlugs } from "~/content/posts/slugs";
import type { PostMeta } from "./post_types";

export type Post = PostMeta & {
	slug: PostSlug;
	order: number;
};

export const posts: Post[] = postSlugs
	.map((slug) => {
		const { meta } = postEntries[slug];
		return {
			...meta,
			slug,
			order: Date.parse(meta.date) || 0,
		};
	})
	.sort((a, b) => b.order - a.order);

const bySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: PostSlug): Post | undefined {
	return bySlug.get(slug);
}

export function neighbours(slug: PostSlug): { previous?: Post; next?: Post } {
	const index = posts.findIndex((post) => post.slug === slug);
	return {
		previous: index >= 0 ? posts[index + 1] : undefined,
		next: index > 0 ? posts[index - 1] : undefined,
	};
}

export const allTags = Array.from(
	new Set(posts.flatMap((post) => post.tags)),
).sort();

const dateFormats = new Map<string, string>();

export function formatDate(date: string): string {
	if (!date) return "";
	const cached = dateFormats.get(date);
	if (cached) return cached;
	const formatted = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	dateFormats.set(date, formatted);
	return formatted;
}
