import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Is NixOS the Perfect Linux Distribution for You",
	date: "2025-09-13",
	summary:
		"NixOS does not ask whether you are ready. It asks whether you want your system described as code, rebuilt from a single file.",
	tags: ["linux"],
	accent: "sapphire",
	words: 1881,
	minutes: 9,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "what-even-is-nixos", text: "What Even Is NixOS?", level: 2 },
	{ id: "why-should-i-care", text: "Why Should I Care?", level: 2 },
	{ id: "reproducible", text: "Reproducible", level: 3 },
	{ id: "my-use-case", text: "My Use Case", level: 4 },
	{ id: "my-current-workflow", text: "My Current Workflow", level: 5 },
	{
		id: "package-availability-and-stability",
		text: "Package Availability and Stability",
		level: 3,
	},
	{ id: "package-availability", text: "Package Availability", level: 4 },
	{ id: "package-stability", text: "Package Stability", level: 4 },
	{ id: "configuration", text: "Configuration", level: 3 },
	{
		id: "toggles-toggles-and-toggles",
		text: "Toggles, Toggles, and Toggles",
		level: 4,
	},
	{
		id: "danger-of-seeking-perfection",
		text: "Danger of Seeking Perfection",
		level: 4,
	},
	{ id: "multi-versioning", text: "Multi-Versioning", level: 3 },
	{ id: "dev-environment", text: "Dev Environment", level: 3 },
	{ id: "ability-to-restore", text: "Ability To Restore", level: 3 },
	{
		id: "what-is-the-difference-between-btrfs-snapshots-nixos-rollbacks-and-git",
		text: "What Is the Difference Between Btrfs Snapshots, NixOS Rollbacks and Git?",
		level: 4,
	},
	{ id: "btrfs", text: "Btrfs", level: 4 },
	{ id: "git", text: "Git", level: 3 },
	{ id: "secure-boot", text: "Secure Boot", level: 3 },
	{ id: "conclusion", text: "Conclusion", level: 2 },
];
