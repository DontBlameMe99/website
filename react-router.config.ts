import type { Config } from "@react-router/dev/config";
import { posts } from "./app/lib/posts";

export default {
	ssr: false,
	prerender() {
		return [
			"/",
			"/blog",
			"/projects",
			"/contact",
			"/404",
			...posts.map((post) => `/blog/${post.slug}`),
		];
	},
} satisfies Config;
