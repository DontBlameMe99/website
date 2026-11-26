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
		icon: "/images/projects/selvage.png",
		accent: "mauve",
		kind: "app",
	},
	{
		name: "BasedChallenges",
		blurb: "Minecraft plugin that adds challenges worth doing on purpose.",
		href: "https://modrinth.com/plugin/basedchallenges",
		icon: "/images/projects/basedchallenges.png",
		accent: "green",
		kind: "plugin",
	},
	{
		name: "BasedUtils",
		blurb: "The utility plugin that keeps the rest of the server sane.",
		href: "https://modrinth.com/plugin/basedutils",
		icon: "/images/projects/basedutils.png",
		accent: "teal",
		kind: "plugin",
	},
	{
		name: "Typo",
		blurb:
			"Typst notes in a plain folder on Android. Search, edit, read the PDF.",
		href: "https://github.com/DontBlameMeDev/typo",
		icon: "/images/projects/typo.png",
		accent: "lavender",
		kind: "android",
	},
	{
		name: "FindConflict",
		blurb: "Finds Syncthing conflict files and settles each one in a TUI.",
		href: "https://codeberg.org/DontBlameMe/find_conflict",
		icon: "/images/projects/findconflict.png",
		accent: "blue",
		kind: "tool",
	},
	{
		name: "Timed",
		blurb: "Countdown timers you start from the Noctalia bar or launcher.",
		href: "https://github.com/DontBlameMeDev/timed",
		icon: "/images/projects/timed.png",
		accent: "mauve",
		kind: "noctalia",
	},
] as const;

export const PAGES = [
	"/",
	"/blog",
	"/projects",
	"/contact",
	"/disclosure",
	"/theme",
] as const;

export const NAV = [
	{ label: "Home", to: "/" },
	{ label: "Blog", to: "/blog" },
	{ label: "Projects", to: "/projects" },
	{ label: "Contact", to: "/contact" },
	{ label: "Theme", to: "/theme" },
] as const;
