export const SITE = {
	name: "DontBlameMe",
	handle: "dbm",
	tagline: "Self-taught developer. Privacy, Linux, and open source.",
	url: "https://dontblameme.dev",
	description:
		"Personal site and blog of DontBlameMe: self-taught developer writing about privacy, Linux, NixOS, note taking and whatever else survives the tinkering.",
};

export const SOCIALS = [
	{ label: "Codeberg", href: "https://git.dontblameme.dev", icon: "codeberg" },
	{
		label: "Mastodon",
		href: "https://mastodon.dontblameme.dev",
		icon: "mastodon",
	},
	{ label: "Matrix", href: "https://matrix.dontblameme.dev", icon: "matrix" },
	{ label: "Twitch", href: "https://twitch.dontblameme.dev", icon: "twitch" },
	{ label: "GitHub", href: "https://github.dontblameme.dev", icon: "github" },
	{ label: "Email", href: "mailto:contact@dontblameme.dev", icon: "mail" },
] as const;

export const CONTACT = {
	email: "contact@dontblameme.dev",
	matrix: "https://matrix.dontblameme.dev",
};

export const PROJECTS = [
	{
		name: "Selvage",
		blurb: "A self-hosted something I keep rebuilding. Visit it and see.",
		href: "https://selvage.dontblameme.dev",
		accent: "mauve",
		kind: "app",
	},
	{
		name: "BasedChallenges",
		blurb: "Minecraft plugin that adds challenges worth doing on purpose.",
		href: "https://modrinth.com/plugin/basedchallenges",
		accent: "green",
		kind: "plugin",
	},
	{
		name: "BasedUtils",
		blurb: "The utility plugin that keeps the rest of the server sane.",
		href: "https://modrinth.com/plugin/basedutils",
		accent: "teal",
		kind: "plugin",
	},
	{
		name: "Codeberg",
		blurb: "Everything else, including the dotfiles this site was built in.",
		href: "https://git.dontblameme.dev",
		accent: "blue",
		kind: "source",
	},
] as const;

export const NAV = [
	{ label: "Home", to: "/" },
	{ label: "Blog", to: "/blog" },
	{ label: "Projects", to: "/projects" },
	{ label: "Contact", to: "/contact" },
] as const;

export const TOPICS = [
	"privacy",
	"linux",
	"nixos",
	"typst",
	"neovim",
	"obsidian",
	"keyboards",
	"colemak",
	"self-hosting",
	"psychology",
	"open source",
	"backups",
];
