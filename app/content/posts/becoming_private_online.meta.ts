import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Becoming private online",
	date: "2023-08-27",
	summary:
		"Privacy is not a switch you flip. It is a series of small, boring decisions about what you install, what you share, and who profits from the gap.",
	tags: ["privacy"],
	accent: "mauve",
	words: 1452,
	minutes: 7,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "privacy-what-is-this", text: "Privacy? What Is This?", level: 2 },
	{
		id: "but-why-care-about-privacy-i-have-nothing-to-hide",
		text: "But Why Care About Privacy? I Have Nothing to Hide?",
		level: 3,
	},
	{
		id: "okay-so-should-i-delete-everything-and-move-in-the-woods",
		text: "Okay. So Should I Delete Everything and Move in the Woods?",
		level: 3,
	},
	{ id: "first-steps", text: "First Steps", level: 2 },
	{
		id: "changing-your-search-engine",
		text: "Changing Your Search Engine",
		level: 3,
	},
	{ id: "becoming-aware", text: "Becoming Aware", level: 3 },
	{
		id: "using-available-settings",
		text: "Using Available Settings",
		level: 3,
	},
	{ id: "deleting-old-accounts", text: "Deleting Old Accounts", level: 3 },
	{ id: "don-t-reuse-passwords", text: "Don't Reuse Passwords", level: 3 },
	{ id: "be-careful-with-vpns", text: "Be Careful with VPNs", level: 3 },
	{
		id: "don-t-share-your-identity",
		text: "Don't Share Your Identity",
		level: 3,
	},
	{ id: "second-steps", text: "Second Steps", level: 2 },
	{
		id: "use-two-factor-authentication",
		text: "Use Two-Factor Authentication",
		level: 3,
	},
	{ id: "switching-your-browser", text: "Switching... Your Browser", level: 3 },
	{ id: "finding-alternatives", text: "Finding Alternatives", level: 3 },
	{ id: "third-steps", text: "Third Steps", level: 2 },
	{
		id: "using-pseudonyms-and-aliases",
		text: "Using Pseudonyms and Aliases",
		level: 3,
	},
	{
		id: "using-different-throwaway-e-mails",
		text: "Using Different (Throwaway) E-Mails",
		level: 3,
	},
	{
		id: "don-t-create-an-account-on-every-website",
		text: "Don't Create an Account on Every Website",
		level: 3,
	},
	{ id: "read-the-privacy-policy", text: "Read the Privacy Policy", level: 3 },
	{
		id: "switching-to-as-much-open-source-stuff-as-you-can",
		text: "Switching to as Much Open-Source Stuff as You Can",
		level: 3,
	},
	{ id: "compartmentalize", text: "Compartmentalize", level: 3 },
	{ id: "most-important-step", text: "Most Important Step", level: 2 },
];
