import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Learning Colemak DH",
	date: "2023-06-11",
	summary:
		"Six weeks of being worse at typing than you were as a child. Colemak DH, the transition, and whether the pinky pain was worth it.",
	tags: ["keyboard", "health"],
	accent: "green",
	words: 734,
	minutes: 3,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "what-is-colemak-dh", text: "What Is Colemak DH", level: 2 },
	{
		id: "why-learn-another-layout",
		text: "Why Learn Another Layout?",
		level: 2,
	},
	{ id: "why-colemak-dh-though", text: "Why Colemak DH Though?", level: 2 },
	{
		id: "how-was-the-learning-process",
		text: "How Was the Learning Process?",
		level: 2,
	},
	{
		id: "how-does-typing-feel-on-colemak-dh",
		text: "How Does Typing Feel on Colemak DH?",
		level: 2,
	},
	{
		id: "can-you-still-type-on-a-normal-layout",
		text: "Can You Still Type on a Normal Layout?",
		level: 2,
	},
	{
		id: "would-i-recommend-learning-colemak-dh",
		text: "Would I Recommend Learning Colemak DH?",
		level: 2,
	},
	{
		id: "which-typing-sites-did-i-use",
		text: "Which Typing Sites Did I Use?",
		level: 2,
	},
	{ id: "conclusion", text: "Conclusion", level: 2 },
];
