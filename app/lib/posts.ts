import type { ComponentType } from "react";
import { postModules } from "~/content/posts";
import type { PostMeta, Section } from "./post_types";

export type Post = PostMeta & {
	slug: string;
	sections: Section[];
	order: number;
	Component: ComponentType;
};

export const posts: Post[] = Object.entries(postModules)
	.map(([slug, module]) => ({
		...module.meta,
		slug,
		sections: module.sections,
		order: Date.parse(module.meta.date) || 0,
		Component: module.Component,
	}))
	.sort((a, b) => b.order - a.order);

export const postSlugs = posts.map((post) => post.slug);

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
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

export const accentVar = (accent: string) => `var(--${accent}, var(--mauve))`;

export function formatDate(date: string): string {
	if (!date) return "";
	return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function randomSlug(except?: string): string {
	const pool = postSlugs.filter((slug) => slug !== except);
	return pool[Math.floor(Math.random() * pool.length)] ?? postSlugs[0];
}
