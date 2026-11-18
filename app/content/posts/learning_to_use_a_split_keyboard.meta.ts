import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Learning to use a split keyboard",
	date: "2023-06-16",
	summary:
		"Two halves of a keyboard, a few weeks of confusion, and shoulders that finally stopped complaining. A practical account of switching.",
	tags: ["keyboard", "health"],
	accent: "peach",
	words: 1297,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{
		id: "why-would-you-use-a-split-keyboard",
		text: "Why Would You Use a Split Keyboard?",
		level: 2,
	},
	{
		id: "advantages-of-using-a-split-keyboard",
		text: "Advantages of Using a Split Keyboard",
		level: 3,
	},
	{ id: "ergonomics", text: "Ergonomics", level: 4 },
	{ id: "customization", text: "Customization", level: 4 },
	{ id: "ortholinear-lay-out", text: "Ortholinear Lay Out", level: 4 },
	{ id: "hot-swappable-switches", text: "Hot-Swappable Switches", level: 4 },
	{
		id: "build-quality-and-durability",
		text: "Build Quality and Durability",
		level: 4,
	},
	{ id: "portability", text: "Portability", level: 4 },
	{ id: "qmk-firmware", text: "QMK Firmware", level: 4 },
	{ id: "the-keyboard-i-chose", text: "The Keyboard I Chose", level: 2 },
	{
		id: "why-did-i-choose-this-keyboard",
		text: "Why Did I Choose This Keyboard?",
		level: 3,
	},
	{ id: "the-zsa-moonlander", text: "The ZSA Moonlander", level: 3 },
	{ id: "cost-comparison", text: "Cost Comparison", level: 3 },
	{ id: "would-i-buy-it-again", text: "Would I Buy It Again?", level: 3 },
	{ id: "learning-and-adaptation", text: "Learning and Adaptation", level: 2 },
	{ id: "learning-experience", text: "Learning Experience", level: 3 },
	{ id: "time-taken-to-learn", text: "Time Taken to Learn", level: 3 },
	{ id: "recommendation", text: "Recommendation", level: 2 },
];
