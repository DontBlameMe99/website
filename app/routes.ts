import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home/index.tsx"),
	route("blog", "routes/blog/index.tsx"),
	route("blog/:slug", "routes/blog/post.tsx"),
	route("projects", "routes/projects/index.tsx"),
	route("contact", "routes/contact/index.tsx"),
	route("disclosure", "routes/disclosure/index.tsx"),
	route("theme", "routes/theme/index.tsx"),
	route("*", "routes/__404/index.tsx"),
] satisfies RouteConfig;
