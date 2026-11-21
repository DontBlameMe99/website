import { posts } from "./posts";
import { PAGES, SITE } from "./site";

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

const postUrl = (slug: string) => `${SITE.url}/blog/${slug}`;

const timestamp = (date: string) => `${date}T12:00:00Z`;

const updated = timestamp(posts[0]?.date ?? "1970-01-01");

export function rss(): string {
	const items = posts
		.map((post) => {
			const url = postUrl(post.slug);
			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(timestamp(post.date)).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}/blog</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function atom(): string {
	const entries = posts
		.map((post) => {
			const url = postUrl(post.slug);
			return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <updated>${timestamp(post.date)}</updated>
${post.tags.map((tag) => `    <category term="${escapeXml(tag)}" />`).join("\n")}
  </entry>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE.name)}</title>
  <subtitle>${escapeXml(SITE.description)}</subtitle>
  <link href="${SITE.url}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${SITE.url}/blog" rel="alternate" type="text/html" />
  <id>${SITE.url}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(SITE.name)}</name>
    <uri>${SITE.url}</uri>
  </author>
${entries}
</feed>
`;
}

export function sitemap(): string {
	const pages = PAGES.map(
		(path) => `  <url><loc>${SITE.url}${path === "/" ? "" : path}</loc></url>`,
	);
	const articles = posts.map(
		(post) =>
			`  <url><loc>${postUrl(post.slug)}</loc><lastmod>${post.date}</lastmod></url>`,
	);

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...articles].join("\n")}
</urlset>
`;
}
