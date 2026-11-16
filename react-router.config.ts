import type { Config } from "@react-router/dev/config";
import { postSlugs } from "./app/content/posts/slugs";

export default {
	ssr: false,
	prerender() {
		return [
			"/",
			"/blog",
			"/projects",
			"/contact",
			"/disclosure",
			"/theme",
			"/404",
			...postSlugs.map((slug) => `/blog/${slug}`),
		];
	},
} satisfies Config;
