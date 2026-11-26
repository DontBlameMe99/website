import { index, type RouteConfig, route } from "@react-router/dev/routes";
import { postSlugs } from "./content/posts/slugs";

export default [
	index("routes/home/index.tsx"),
	route("blog", "routes/blog/index.tsx"),
	...postSlugs.map((slug) =>
		route(`blog/${slug}`, `routes/blog/posts/${slug}.tsx`),
	),
	route("projects", "routes/projects/index.tsx"),
	route("contact", "routes/contact/index.tsx"),
	route("disclosure", "routes/disclosure/index.tsx"),
	route("theme", "routes/theme/index.tsx"),
	route("rss.xml", "routes/rss.ts"),
	route("atom.xml", "routes/atom.ts"),
	route("sitemap.xml", "routes/sitemap.ts"),
	route("*", "routes/__404/index.tsx"),
] satisfies RouteConfig;
