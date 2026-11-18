import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home/index.tsx"),
	route("blog", "routes/blog/index.tsx"),
	route(
		"blog/backups_you_only_want_them_once_you_need_them",
		"routes/blog/posts/backups_you_only_want_them_once_you_need_them.tsx",
	),
	route(
		"blog/becoming_private_online",
		"routes/blog/posts/becoming_private_online.tsx",
	),
	route(
		"blog/i_found_a_better_alternative_to_logseq",
		"routes/blog/posts/i_found_a_better_alternative_to_logseq.tsx",
	),
	route(
		"blog/is_nixos_the_perfect_linux_distribution_for_you",
		"routes/blog/posts/is_nixos_the_perfect_linux_distribution_for_you.tsx",
	),
	route(
		"blog/learning_colemak_dh",
		"routes/blog/posts/learning_colemak_dh.tsx",
	),
	route("blog/learning_to_learn", "routes/blog/posts/learning_to_learn.tsx"),
	route(
		"blog/learning_to_use_a_split_keyboard",
		"routes/blog/posts/learning_to_use_a_split_keyboard.tsx",
	),
	route(
		"blog/replacing_obsidian_with_neovim_and_typst",
		"routes/blog/posts/replacing_obsidian_with_neovim_and_typst.tsx",
	),
	route(
		"blog/switching_from_youtube_to_freetube",
		"routes/blog/posts/switching_from_youtube_to_freetube.tsx",
	),
	route(
		"blog/the_perfect_productivity_system",
		"routes/blog/posts/the_perfect_productivity_system.tsx",
	),
	route(
		"blog/the_psychology_of_social_media_addiction",
		"routes/blog/posts/the_psychology_of_social_media_addiction.tsx",
	),
	route(
		"blog/what_is_this_new_website_design",
		"routes/blog/posts/what_is_this_new_website_design.tsx",
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
