import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PostImage } from "../components/post/prose";

describe("PostImage", () => {
	test("keeps the full-size fallback and metadata behind AVIF sources", () => {
		const html = renderToStaticMarkup(
			createElement(PostImage, {
				src: "/posts/example.webp",
				avifSrcSet:
					"/posts/example-640.avif 640w, /posts/example-960.avif 960w",
				alt: "A screenshot",
				width: 1600,
				height: 900,
			}),
		);

		expect(html).toContain("<picture>");
		expect(html).toContain(
			'srcSet="/posts/example-640.avif 640w, /posts/example-960.avif 960w"',
		);
		expect(html).toContain('type="image/avif"');
		expect(html).toContain('href="/posts/example.webp"');
		expect(html).toContain('src="/posts/example.webp"');
		expect(html).toContain('alt="A screenshot"');
		expect(html).toContain('width="1600"');
		expect(html).toContain('height="900"');
		expect(html).toContain('loading="lazy"');
		expect(html).toContain('decoding="async"');
		expect(html).toContain(
			'<figcaption aria-hidden="true">A screenshot</figcaption>',
		);
	});

	test("renders the plain image when no AVIF source is given", () => {
		const html = renderToStaticMarkup(
			createElement(PostImage, {
				src: "/posts/example.webp",
				alt: "A screenshot",
				width: 1600,
				height: 900,
			}),
		);

		expect(html).not.toContain("<picture>");
		expect(html).toContain('src="/posts/example.webp"');
	});
});
