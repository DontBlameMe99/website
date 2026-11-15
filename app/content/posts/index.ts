import type { ComponentType } from "react";
import type { PostMeta, Section } from "~/lib/post_types";
import Post11, {
	meta as meta11,
	sections as sections11,
} from "./backups_you_only_want_them_once_you_need_them";
import Post10, {
	meta as meta10,
	sections as sections10,
} from "./becoming_private_online";
import Post9, {
	meta as meta9,
	sections as sections9,
} from "./i_found_a_better_alternative_to_logseq";
import Post8, {
	meta as meta8,
	sections as sections8,
} from "./is_nixos_the_perfect_linux_distribution_for_you";
import Post7, {
	meta as meta7,
	sections as sections7,
} from "./learning_colemak_dh";
import Post6, {
	meta as meta6,
	sections as sections6,
} from "./learning_to_learn";
import Post5, {
	meta as meta5,
	sections as sections5,
} from "./learning_to_use_a_split_keyboard";
import Post4, {
	meta as meta4,
	sections as sections4,
} from "./replacing_obsidian_with_neovim_and_typst";
import Post3, {
	meta as meta3,
	sections as sections3,
} from "./switching_from_youtube_to_freetube";
import Post2, {
	meta as meta2,
	sections as sections2,
} from "./the_perfect_productivity_system";
import Post1, {
	meta as meta1,
	sections as sections1,
} from "./the_psychology_of_social_media_addiction";
import Post0, {
	meta as meta0,
	sections as sections0,
} from "./what_is_this_new_website_design";

export type PostModule = {
	Component: ComponentType;
	meta: PostMeta;
	sections: Section[];
};

export const postModules: Record<string, PostModule> = {
	what_is_this_new_website_design: {
		Component: Post0,
		meta: meta0,
		sections: sections0,
	},
	the_psychology_of_social_media_addiction: {
		Component: Post1,
		meta: meta1,
		sections: sections1,
	},
	the_perfect_productivity_system: {
		Component: Post2,
		meta: meta2,
		sections: sections2,
	},
	switching_from_youtube_to_freetube: {
		Component: Post3,
		meta: meta3,
		sections: sections3,
	},
	replacing_obsidian_with_neovim_and_typst: {
		Component: Post4,
		meta: meta4,
		sections: sections4,
	},
	learning_to_use_a_split_keyboard: {
		Component: Post5,
		meta: meta5,
		sections: sections5,
	},
	learning_to_learn: { Component: Post6, meta: meta6, sections: sections6 },
	learning_colemak_dh: { Component: Post7, meta: meta7, sections: sections7 },
	is_nixos_the_perfect_linux_distribution_for_you: {
		Component: Post8,
		meta: meta8,
		sections: sections8,
	},
	i_found_a_better_alternative_to_logseq: {
		Component: Post9,
		meta: meta9,
		sections: sections9,
	},
	becoming_private_online: {
		Component: Post10,
		meta: meta10,
		sections: sections10,
	},
	backups_you_only_want_them_once_you_need_them: {
		Component: Post11,
		meta: meta11,
		sections: sections11,
	},
};

export const postSlugs = Object.keys(postModules);
