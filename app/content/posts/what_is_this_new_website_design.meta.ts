import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "What is this new website design?",
	date: "2025-10-18",
	summary:
		"Why the site changed shape, why the graph exists, and what the new directory structure is actually for.",
	tags: ["design"],
	accent: "mauve",
	words: 1499,
	minutes: 7,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "tldr", text: "TLDR", level: 2 },
	{ id: "why-has-it-changed", text: "Why Has It Changed?", level: 3 },
	{ id: "what-is-different-now", text: "What Is Different Now?", level: 4 },
	{ id: "how-does-it-affect-me", text: "How Does It Affect Me?", level: 3 },
	{ id: "rss", text: "RSS", level: 4 },
	{ id: "old-blogposts", text: "Old Blogposts", level: 4 },
	{ id: "old-blog-links", text: "Old Blog Links", level: 4 },
	{ id: "usability", text: "Usability", level: 4 },
	{ id: "why-the-change", text: "Why the Change?", level: 2 },
	{ id: "obsidian-workflow", text: "Obsidian Workflow", level: 3 },
	{ id: "visuals", text: "Visuals", level: 3 },
	{ id: "what-has-changed", text: "What Has Changed?", level: 2 },
	{ id: "how-does-it-affect-me-2", text: "How Does It Affect Me?", level: 3 },
	{ id: "rss-2", text: "RSS", level: 4 },
	{ id: "old-blogposts-2", text: "Old Blogposts", level: 4 },
	{ id: "old-links", text: "Old Links", level: 4 },
	{
		id: "what-is-the-new-workflow",
		text: "What Is the New Workflow?",
		level: 2,
	},
	{ id: "what-am-i-using-now", text: "What Am I Using Now", level: 3 },
	{ id: "but-why-quartz", text: "But Why Quartz?", level: 4 },
	{ id: "no-downsides-at-all", text: "No Downsides at All?", level: 4 },
	{ id: "attachment-move-it", text: "Attachment? Move It", level: 5 },
	{
		id: "not-in-the-directory-too-bad",
		text: "Not in the Directory? Too Bad",
		level: 5,
	},
	{
		id: "how-exactly-does-the-new-workflow-work",
		text: "How Exactly Does the New Workflow Work",
		level: 3,
	},
	{ id: "but-what-is-this-theme", text: "But What Is This Theme?", level: 3 },
	{ id: "why-is-it-so-amazing", text: "Why Is It So Amazing?", level: 4 },
	{
		id: "which-theme-are-you-using",
		text: "Which Theme Are You Using?",
		level: 4,
	},
	{ id: "did-you-modify-anything", text: "Did You Modify Anything?", level: 3 },
	{ id: "closing-words", text: "Closing Words", level: 2 },
];
