import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "The perfect productivity system",
	date: "2025-06-28",
	summary:
		"The perfect system is the one you stop optimizing. Notes, tasks and reviews arranged so the arrangement stops being the hobby.",
	tags: ["productivity", "notes"],
	accent: "pink",
	words: 1363,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "introduction", text: "Introduction", level: 2 },
	{
		id: "what-is-the-perfect-productivity-system",
		text: "What is the Perfect Productivity System?",
		level: 2,
	},
	{
		id: "the-productivity-system-treadmill",
		text: "The Productivity System Treadmill",
		level: 2,
	},
	{
		id: "so-a-system-for-note-taking-is-useless",
		text: "So a System for Note-Taking Is Useless?",
		level: 2,
	},
	{ id: "what-do-you-need", text: "What Do You Need?", level: 2 },
	{
		id: "but-when-do-i-actually-need-a-new-setup-plugin",
		text: "But When Do I Actually Need a New Setup/Plugin?",
		level: 2,
	},
	{ id: "conclusion", text: "Conclusion", level: 2 },
];
