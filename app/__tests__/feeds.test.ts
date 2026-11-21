import { describe, expect, test } from "bun:test";
import { atom, rss, sitemap } from "../lib/feeds";
import { posts } from "../lib/posts";
import { PAGES, SITE } from "../lib/site";

const noRawAmpersands = (xml: string) =>
	expect(xml).not.toMatch(/&(?!(amp|lt|gt|quot|apos);)/);

describe("feeds", () => {
	test("rss lists every post", () => {
		const xml = rss();
		expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
		expect(xml).toContain('<rss version="2.0"');
		for (const post of posts) {
			expect(xml).toContain(`<link>${SITE.url}/blog/${post.slug}</link>`);
			const item = xml
				.split("<item>")
				.find((part) =>
					part.includes(`<link>${SITE.url}/blog/${post.slug}</link>`),
				);
			expect(item).not.toContain("<description>");
		}
		noRawAmpersands(xml);
	});

	test("atom lists every post with a valid timestamp", () => {
		const xml = atom();
		expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
		expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
		expect(xml).not.toContain("<summary>");
		expect(xml.match(/<entry>/g)?.length).toBe(posts.length);
		for (const post of posts) {
			expect(xml).toContain(`<id>${SITE.url}/blog/${post.slug}</id>`);
			expect(xml).toContain(`<updated>${post.date}T12:00:00Z</updated>`);
		}
		noRawAmpersands(xml);
	});

	test("sitemap covers pages and posts", () => {
		const xml = sitemap();
		expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
		for (const page of PAGES) {
			expect(xml).toContain(
				`<loc>${SITE.url}${page === "/" ? "" : page}</loc>`,
			);
		}
		for (const post of posts) {
			expect(xml).toContain(
				`<url><loc>${SITE.url}/blog/${post.slug}</loc><lastmod>${post.date}</lastmod></url>`,
			);
		}
		noRawAmpersands(xml);
	});
});
