import { postEntries } from "~/content/posts";
import type { PostMeta } from "./post_types";

export type Post = PostMeta & {
	slug: string;
	order: number;
};

export const posts: Post[] = Object.entries(postEntries)
	.map(([slug, entry]) => ({
		...entry.meta,
		slug,
		order: Date.parse(entry.meta.date) || 0,
	}))
	.sort((a, b) => b.order - a.order);

export const postSlugs = posts.map((post) => post.slug);

const bySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string): Post | undefined {
	return bySlug.get(slug);
}

export function neighbours(slug: string): { previous?: Post; next?: Post } {
	const index = posts.findIndex((post) => post.slug === slug);
	return {
		previous: index >= 0 ? posts[index + 1] : undefined,
		next: index > 0 ? posts[index - 1] : undefined,
	};
}

export const allTags = Array.from(
	new Set(posts.flatMap((post) => post.tags)),
).sort();

export const accentVar = (accent: string) =>
	`var(--${accent}, var(--accent-surface))`;

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

export function randomSlug(except?: string): string {
	const pool = postSlugs.filter((slug) => slug !== except);
	return pool[Math.floor(Math.random() * pool.length)] ?? postSlugs[0];
}
