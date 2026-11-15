import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
	parseInline,
	parseMarkdown,
	plainText,
	slugify,
	splitFrontmatter,
} from "../lib/markdown";

const dir = join(import.meta.dir, "../content/posts");
const files = readdirSync(dir).filter((file) => file.endsWith(".md"));
const posts = files.map((file) => {
	const { meta, body } = splitFrontmatter(
		readFileSync(join(dir, file), "utf8"),
	);
	return {
		slug: file.replace(/\.md$/, ""),
		meta,
		blocks: parseMarkdown(body),
	};
});

describe("markdown", () => {
	test("parses headings with stable ids", () => {
		const blocks = parseMarkdown("## What Is This?\n\n### Second Step");
		expect(blocks).toHaveLength(2);
		expect(blocks[0]).toMatchObject({
			type: "heading",
			level: 2,
			id: "what-is-this",
		});
		expect(blocks[1]).toMatchObject({
			type: "heading",
			level: 3,
			id: "second-step",
		});
	});

	test("keeps fenced code untouched", () => {
		const blocks = parseMarkdown(
			"```nix\n# not a heading\nprograms.foo = true;\n```",
		);
		expect(blocks[0]).toMatchObject({
			type: "code",
			lang: "nix",
			code: "# not a heading\nprograms.foo = true;",
		});
	});

	test("splits inline marks", () => {
		const nodes = parseInline(
			"a **bold** and *em* and `code` and [link](https://x.dev)",
		);
		expect(nodes.map((node) => node.type)).toEqual([
			"text",
			"strong",
			"text",
			"em",
			"text",
			"code",
			"text",
			"link",
		]);
		expect(plainText(nodes)).toContain("link");
	});

	test("heading ids survive links and code spans", () => {
		const heading = parseInline(
			"What Is [Borgmatic](https://torsion.org/borgmatic/)?",
		);
		expect(slugify(plainText(heading))).toBe("what-is-borgmatic");
	});
});

describe("content", () => {
	test("every post has metadata and renderable blocks", () => {
		expect(posts.length).toBe(12);
		for (const post of posts) {
			expect(post.meta.title?.length ?? 0).toBeGreaterThan(0);
			expect(post.meta.date ?? "").toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect((post.meta.summary ?? "").length).toBeGreaterThan(20);
			expect((post.meta.tags ?? "").length).toBeGreaterThan(0);
			expect(post.blocks.length).toBeGreaterThan(5);
		}
	});

	test("no unconverted typst markup leaks into the prose", () => {
		for (const post of posts) {
			const text = JSON.stringify(post.blocks);
			expect(text).not.toContain("#link(");
			expect(text).not.toContain("#image(");
			expect(text).not.toContain("#quote[");
			expect(text).not.toContain("#frontmatter");
		}
	});

	test("post images exist on disk", () => {
		const sources = posts.flatMap((post) =>
			post.blocks.flatMap((block) => {
				if (block.type === "image") return [block.src];
				if (block.type === "paragraph") {
					return block.content
						.filter((node) => node.type === "image")
						.map((node) => node.src);
				}
				return [];
			}),
		);
		expect(sources.length).toBeGreaterThan(0);
		for (const src of sources) {
			const file = Bun.file(
				join(import.meta.dir, "../..", "public", decodeURIComponent(src)),
			);
			expect(file.size).toBeGreaterThan(0);
		}
	});
});
