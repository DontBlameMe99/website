import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Switching from YouTube to FreeTube",
	date: "2023-07-10",
	summary:
		"What YouTube does when you are not looking, and what changes when the front end is yours. FreeTube, subscriptions, and the cost of leaving.",
	tags: ["privacy"],
	accent: "red",
	words: 1227,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{
		id: "why-would-you-switch-away-from-youtube",
		text: "Why Would You Switch Away from YouTube?",
		level: 2,
	},
	{
		id: "but-isn-t-it-slower-worse-looking",
		text: "But Isn't It Slower/Worse/Looking?",
		level: 2,
	},
	{
		id: "what-can-you-do-with-freetube",
		text: "What Can You Do with FreeTube?",
		level: 2,
	},
	{
		id: "how-did-the-transition-feel",
		text: "How Did the Transition Feel?",
		level: 2,
	},
	{
		id: "how-do-you-live-without-an-algorithm-serving-you-everything",
		text: "How Do You Live Without an Algorithm Serving You Everything?",
		level: 2,
	},
	{
		id: "special-features-i-love-about-freetube",
		text: "Special Features I Love About FreeTube",
		level: 2,
	},
	{
		id: "how-can-you-live-without-an-algorithm-serving-you-content",
		text: "How Can You Live Without an Algorithm Serving You Content?",
		level: 2,
	},
	{
		id: "the-bad-things-i-experienced",
		text: "The Bad Things I Experienced",
		level: 2,
	},
	{ id: "should-you-use-freetube", text: "Should You Use FreeTube", level: 2 },
	{ id: "how-to-install-freetube", text: "How to Install FreeTube", level: 2 },
];
