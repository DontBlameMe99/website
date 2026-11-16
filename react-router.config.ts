import type { Config } from "@react-router/dev/config";
import { postSlugs } from "./app/content/posts/slugs";
import { PAGES } from "./app/lib/site";

export default {
	ssr: false,
	prerender() {
		return [
			...PAGES,
			"/404",
			"/rss.xml",
			"/atom.xml",
			"/sitemap.xml",
			...postSlugs.map((slug) => `/blog/${slug}`),
		];
	},
} satisfies Config;
