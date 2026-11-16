import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { postModules } from "../content/posts";
import { postSlugs } from "../content/posts/slugs";
import { slugify } from "../lib/slug";

const dir = join(import.meta.dir, "../content/posts");
const files = readdirSync(dir).filter((file) => file.endsWith(".tsx"));

describe("post registry", () => {
	test("every post has metadata and sections", () => {
		expect(Object.keys(postModules).length).toBe(12);
		for (const [slug, module] of Object.entries(postModules)) {
			expect(slug).toMatch(/^[a-z0-9_]+$/);
			expect(module.meta.title.length).toBeGreaterThan(0);
			expect(module.meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(module.meta.summary.length).toBeGreaterThan(20);
			expect(module.meta.tags.length).toBeGreaterThan(0);
			expect(module.meta.words).toBeGreaterThan(200);
			expect(module.meta.minutes).toBeGreaterThanOrEqual(1);
			expect(module.sections.length).toBeGreaterThan(0);
			expect(typeof module.Component).toBe("function");
		}
	});

	test("section ids are unique and stable", () => {
		for (const module of Object.values(postModules)) {
			const ids = module.sections.map((section) => section.id);
			expect(new Set(ids).size).toBe(ids.length);
			for (const section of module.sections) {
				expect(section.id).toBe(slugify(section.id));
				expect([2, 3, 4, 5]).toContain(section.level);
			}
		}
	});

	test("the pretender list and the registry agree", () => {
		expect([...postSlugs].sort()).toEqual(Object.keys(postModules).sort());
	});
});

describe("post sources", () => {
	test("posts are React components, not markdown", () => {
		expect(files.length).toBe(12);
		for (const file of files) {
			const source = readFileSync(join(dir, file), "utf8");
			expect(source).toContain("export default function Post()");
			expect(source).toContain("export const meta =");
			expect(source).toContain("export const sections");
			expect(source).not.toMatch(/^#{1,6} /m);
			expect(source).not.toMatch(/<p>\s*(?:\{\s*")?#{1,6} /);
			expect(source).not.toContain("#link(");
			expect(source).not.toContain("#image(");
			expect(source).not.toContain("window-shadow");
		}
	});

	test("local images point at files that exist", () => {
		const sources = files
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
