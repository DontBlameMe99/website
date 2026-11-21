import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { postEntries } from "../content/posts";
import { postSlugs } from "../content/posts/slugs";
import { slugify } from "../lib/slug";
import { countBodyWords } from "../lib/word_count";

const dir = join(import.meta.dir, "../content/posts");
const routeDir = join(import.meta.dir, "../routes/blog/posts");
const bodyFiles = readdirSync(dir).filter((file) => file.endsWith(".tsx"));
const metaFiles = readdirSync(dir).filter((file) => file.endsWith(".meta.ts"));

const loaded = await Promise.all(
	postSlugs.map(async (slug) => {
		const meta = await import(`../content/posts/${slug}.meta`);
		const body = await import(`../content/posts/${slug}.tsx`);
		return { slug, meta, body };
	}),
);

describe("post registry", () => {
	test("every post has metadata and sections", () => {
		expect(Object.keys(postEntries).length).toBe(12);
		for (const { slug, meta, body } of loaded) {
			expect(slug).toMatch(/^[a-z0-9_]+$/);
			expect(meta.meta.title.length).toBeGreaterThan(0);
			expect(meta.meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(meta.meta.summary.length).toBeGreaterThan(20);
			expect(meta.meta.tags.length).toBeGreaterThan(0);
			expect(meta.meta.minutes).toBeGreaterThanOrEqual(1);
			expect(body.sections.length).toBeGreaterThan(0);
		}
	});

	test("the registry carries the same metadata as the files", () => {
		for (const { slug, meta } of loaded) {
			expect(postEntries[slug].meta).toEqual(meta.meta);
		}
	});

	test("word counts come from the article body", () => {
		for (const { body } of loaded) {
			expect(countBodyWords(body.default)).toBeGreaterThan(200);
		}
	});

	test("word counts include text rendered from props", () => {
		const Caption = ({ text }: { text: string }) =>
			createElement("p", null, text);
		const Probe = () => createElement(Caption, { text: "rendered prop words" });
		expect(countBodyWords(Probe)).toBe(3);
	});

	test("section ids are unique and stable", () => {
		for (const { body } of loaded) {
			const ids = body.sections.map((section) => section.id);
			expect(new Set(ids).size).toBe(ids.length);
			for (const section of body.sections) {
				expect(section.id).toBe(slugify(section.id));
				expect([2, 3, 4, 5]).toContain(section.level);
			}
		}
	});

	test("the pretender list and the registry agree", () => {
		expect([...postSlugs].sort()).toEqual(Object.keys(postEntries).sort());
	});

	test("every post has a body and its own route", () => {
		expect(bodyFiles.length).toBe(12);
		expect(metaFiles.length).toBe(12);
		expect(readdirSync(routeDir).length).toBe(12);
		for (const { slug, body } of loaded) {
			expect(typeof body.default).toBe("function");
			const route = readFileSync(join(routeDir, `${slug}.tsx`), "utf8");
			expect(route).toContain(`slug="${slug}"`);
			expect(route).toContain("export default");
		}
	});
});

describe("post sources", () => {
	test("bodies are React components, not markdown", () => {
		for (const file of bodyFiles) {
			const source = readFileSync(join(dir, file), "utf8");
			expect(source).toContain("export default function Post()");
			expect(source).not.toMatch(/^#{1,6} /m);
			expect(source).not.toMatch(/<p>\s*(?:\{\s*")?#{1,6} /);
			expect(source).not.toContain("#link(");
			expect(source).not.toContain("#image(");
			expect(source).not.toContain("window-shadow");
		}
	});

	test("metadata lives in its own file", () => {
		for (const file of metaFiles) {
			const source = readFileSync(join(dir, file), "utf8");
			expect(source).toContain("export const meta =");
			expect(source).not.toContain("export const sections");
			expect(source).not.toContain("export default");
		}
		for (const file of bodyFiles) {
			const source = readFileSync(join(dir, file), "utf8");
			expect(source).toContain("export const sections");
		}
	});

	test("local images point at files that exist", () => {
		const sources = bodyFiles
			.map((file) => readFileSync(join(dir, file), "utf8"))
			.flatMap((source) =>
				[...source.matchAll(/src="(\/posts\/[^"]+)"/g)].map((m) => m[1]),
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
