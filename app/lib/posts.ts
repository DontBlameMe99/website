import {
	type Block,
	type Frontmatter,
	parseMarkdown,
	plainText,
	splitFrontmatter,
} from "./markdown";

export type Post = Frontmatter & {
	slug: string;
	blocks: Block[];
	headings: { id: string; text: string; level: number }[];
	words: number;
	minutes: number;
	order: number;
};

const raw = import.meta.glob<string>("../content/posts/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
});

function build(path: string, source: string): Post {
	const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? path;
	const { meta, body } = splitFrontmatter(source);
	const blocks = parseMarkdown(body);
	const headings = blocks
		.filter(
			(block): block is Extract<Block, { type: "heading" }> =>
				block.type === "heading",
		)
		.map((block) => ({
			id: block.id,
			text: plainText(block.content),
			level: block.level,
		}));
	const words = blocks.reduce((total, block) => {
		if (block.type === "paragraph" || block.type === "quote") {
			return (
				total + plainText(block.content).split(/\s+/).filter(Boolean).length
			);
		}
		if (block.type === "list") {
			return (
				total +
				block.items.reduce(
					(sum, item) =>
						sum + plainText(item.content).split(/\s+/).filter(Boolean).length,
					0,
				)
			);
		}
		return total;
	}, 0);

	return {
		slug,
		title: meta.title ?? slug,
		date: meta.date ?? "",
		summary: meta.summary ?? "",
		tags: (meta.tags ?? "")
			.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean),
		accent: meta.accent ?? "mauve",
		blocks,
		headings,
		words,
		minutes: Math.max(1, Math.round(words / 220)),
		order: Date.parse(meta.date ?? "") || 0,
	};
}

export const posts: Post[] = Object.entries(raw)
	.map(([path, source]) => build(path, source))
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
