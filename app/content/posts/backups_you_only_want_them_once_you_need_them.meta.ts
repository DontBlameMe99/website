import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Backups - You only want them once you need them",
	date: "2025-11-12",
	summary:
		"A backup you have never restored is a hope, not a backup. The 3-2-1 rule, the threat model behind it, and the day my password manager lived inside the thing it was meant to save.",
	tags: ["backups", "privacy", "linux"],
	accent: "teal",
	words: 1071,
	minutes: 5,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "what-are-backups", text: "What Are Backups", level: 2 },
	{ id: "a-little-story", text: "A Little Story", level: 2 },
	{ id: "3-2-1-rule", text: "3-2-1 Rule", level: 2 },
	{
		id: "i-interpret-it-a-little-bit",
		text: "I Interpret It a Little Bit",
		level: 3,
	},
	{ id: "my-old-setup", text: "My Old Setup", level: 2 },
	{ id: "my-new-setup", text: "My New Setup", level: 2 },
	{ id: "what-is-borgmatic", text: "What Is Borgmatic?", level: 3 },
	{
		id: "is-the-remote-backup-encrypted-though",
		text: "Is the Remote Backup Encrypted, Though?",
		level: 3,
	},
	{ id: "closing-words", text: "Closing Words", level: 2 },
];
