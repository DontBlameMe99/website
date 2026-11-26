import type { PostMeta } from "~/lib/post_types";
import { meta as backupsMeta } from "./backups_you_only_want_them_once_you_need_them.meta";
import { meta as privateOnlineMeta } from "./becoming_private_online.meta";
import { meta as logseqMeta } from "./i_found_a_better_alternative_to_logseq.meta";
import { meta as nixosMeta } from "./is_nixos_the_perfect_linux_distribution_for_you.meta";
import { meta as colemakMeta } from "./learning_colemak_dh.meta";
import { meta as learnMeta } from "./learning_to_learn.meta";
import { meta as splitMeta } from "./learning_to_use_a_split_keyboard.meta";
import { meta as vibesMeta } from "./programming_with_just_vibes.meta";
import { meta as typstMeta } from "./replacing_obsidian_with_neovim_and_typst.meta";
import type { PostSlug } from "./slugs";
import { meta as freetubeMeta } from "./switching_from_youtube_to_freetube.meta";
import { meta as productivityMeta } from "./the_perfect_productivity_system.meta";
import { meta as psychologyMeta } from "./the_psychology_of_social_media_addiction.meta";
import { meta as designMeta } from "./what_is_this_new_website_design.meta";

/**
 * Post metadata for every route, without the article bodies or their heading
 * lists. Both are chunks of their own (see routes/blog/posts), so an index page
 * never downloads them.
 */
export type PostEntry = {
	meta: PostMeta;
};

export const postEntries: Record<PostSlug, PostEntry> = {
	programming_with_just_vibes: {
		meta: vibesMeta,
	},
	what_is_this_new_website_design: {
		meta: designMeta,
	},
	the_psychology_of_social_media_addiction: {
		meta: psychologyMeta,
	},
	the_perfect_productivity_system: {
		meta: productivityMeta,
	},
	switching_from_youtube_to_freetube: {
		meta: freetubeMeta,
	},
	replacing_obsidian_with_neovim_and_typst: {
		meta: typstMeta,
	},
	learning_to_use_a_split_keyboard: {
		meta: splitMeta,
	},
	learning_to_learn: { meta: learnMeta },
	learning_colemak_dh: { meta: colemakMeta },
	is_nixos_the_perfect_linux_distribution_for_you: {
		meta: nixosMeta,
	},
	i_found_a_better_alternative_to_logseq: {
		meta: logseqMeta,
	},
	becoming_private_online: {
		meta: privateOnlineMeta,
	},
	backups_you_only_want_them_once_you_need_them: {
		meta: backupsMeta,
	},
};
