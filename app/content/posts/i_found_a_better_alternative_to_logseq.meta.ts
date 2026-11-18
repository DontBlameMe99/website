import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "I found a better alternative to Logseq",
	date: "2025-05-15",
	summary:
		"Logseq was almost right. Here is what pushed me back to Obsidian, what the graph looks like now, and how it feeds this blog.",
	tags: ["notes"],
	accent: "blue",
	words: 1555,
	minutes: 7,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "logseq-a-brief-recap", text: "Logseq - a Brief Recap", level: 2 },
	{ id: "problems-of-logseq", text: "Problems of Logseq", level: 2 },
	{ id: "1-slow-performance", text: "1: Slow Performance", level: 3 },
	{ id: "2-bad-latex-support", text: "2: Bad LaTeX Support", level: 3 },
	{ id: "3-syncing-conflicts", text: "3: Syncing Conflicts", level: 3 },
	{ id: "4-bad-links", text: "4: Bad Links", level: 3 },
	{ id: "5-plugins", text: "5: Plugins", level: 3 },
	{ id: "the-solution", text: "The Solution", level: 2 },
	{ id: "1-slow-performance-2", text: "1: Slow Performance", level: 3 },
	{ id: "2-bad-latex-support-2", text: "2: Bad LaTeX Support", level: 3 },
	{ id: "3-syncing-conflicts-2", text: "3: Syncing Conflicts", level: 3 },
	{ id: "4-bad-links-2", text: "4: Bad Links", level: 3 },
	{ id: "5-plugins-2", text: "5: Plugins", level: 3 },
	{
		id: "moving-files-from-logseq-into-obsidian",
		text: "Moving Files from Logseq into Obsidian",
		level: 2,
	},
	{
		id: "how-many-files-do-you-have-now",
		text: "How Many Files Do You Have Now?",
		level: 3,
	},
	{
		id: "how-does-your-graph-look",
		text: "How Does Your Graph Look?",
		level: 2,
	},
	{
		id: "but-what-happened-to-your-blog-pipeline",
		text: "But What Happened to Your Blog Pipeline?",
		level: 2,
	},
	{
		id: "more-general-advantages-of-obsidian-i-found",
		text: "More General Advantages of Obsidian I Found",
		level: 2,
	},
	{
		id: "separating-tags-and-links",
		text: "Separating Tags and Links",
		level: 3,
	},
	{ id: "the-community", text: "The Community", level: 3 },
	{ id: "the-themes", text: "The Themes", level: 3 },
];
