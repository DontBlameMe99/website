import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "The psychology of social media addiction",
	date: "2023-09-02",
	summary:
		"The feed is not a product, you are. Variable rewards, notification loops, and why willpower keeps losing to interface design.",
	tags: ["psychology"],
	accent: "red",
	words: 1133,
	minutes: 5,
} satisfies PostMeta;

export const sections: Section[] = [
	{
		id: "what-is-a-social-media-addiction",
		text: "What Is a Social Media Addiction?",
		level: 2,
	},
	{
		id: "those-are-some-scary-statistics-to-get-your-attention",
		text: "Those Are Some Scary Statistics to Get Your Attention",
		level: 3,
	},
	{
		id: "but-why-is-social-media-so-addictive",
		text: "But Why Is Social Media So Addictive?",
		level: 2,
	},
	{
		id: "social-media-and-mental-health",
		text: "Social Media and Mental Health",
		level: 2,
	},
	{
		id: "personal-opinion-wasted-time",
		text: "Personal Opinion: Wasted Time",
		level: 2,
	},
	{
		id: "but-what-can-i-do-about-it",
		text: "But What Can I Do About It?",
		level: 2,
	},
	{ id: "sources", text: "Sources", level: 2 },
];
