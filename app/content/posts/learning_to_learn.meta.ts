import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Learning to learn",
	date: "2024-09-29",
	summary:
		"Studying harder is the trap. Spaced repetition, active recall, and the uncomfortable amount of forgetting that learning actually requires.",
	tags: ["learning", "psychology", "productivity"],
	accent: "yellow",
	words: 1340,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "general-introduction", text: "General Introduction", level: 2 },
	{
		id: "is-it-hard-to-learn-how-to-learn",
		text: "Is It Hard to Learn How to Learn?",
		level: 2,
	},
	{
		id: "how-much-time-do-i-need-to-learn-new-things",
		text: "How Much Time Do I Need to Learn New Things?",
		level: 3,
	},
	{
		id: "how-to-get-the-habit-of-learning",
		text: "How to Get the Habit of Learning",
		level: 3,
	},
	{
		id: "game-changing-tools-for-effective-learning",
		text: "Game-Changing Tools for Effective Learning",
		level: 2,
	},
	{ id: "anki", text: "Anki", level: 3 },
	{
		id: "what-advantages-does-creating-simple-flashcards-give-me",
		text: "What Advantages Does Creating Simple Flashcards Give Me?",
		level: 4,
	},
	{ id: "logseq", text: "Logseq", level: 3 },
	{ id: "how-to-stay-motivated", text: "How to Stay Motivated", level: 2 },
	{ id: "reward-yourself", text: "Reward Yourself", level: 3 },
	{ id: "work-towards-a-goal", text: "Work Towards a Goal", level: 3 },
	{ id: "celebrate-small-wins", text: "Celebrate Small Wins", level: 3 },
	{ id: "adjusting-your-approach", text: "Adjusting Your Approach", level: 3 },
	{ id: "conclusion", text: "Conclusion", level: 2 },
];
