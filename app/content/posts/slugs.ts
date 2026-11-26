export const postSlugs = [
	"programming_with_just_vibes",
	"what_is_this_new_website_design",
	"the_psychology_of_social_media_addiction",
	"the_perfect_productivity_system",
	"switching_from_youtube_to_freetube",
	"replacing_obsidian_with_neovim_and_typst",
	"learning_to_use_a_split_keyboard",
	"learning_to_learn",
	"learning_colemak_dh",
	"is_nixos_the_perfect_linux_distribution_for_you",
	"i_found_a_better_alternative_to_logseq",
	"becoming_private_online",
	"backups_you_only_want_them_once_you_need_them",
] as const;

export type PostSlug = (typeof postSlugs)[number];
