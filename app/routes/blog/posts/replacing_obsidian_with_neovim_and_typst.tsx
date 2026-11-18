import Body from "~/content/posts/replacing_obsidian_with_neovim_and_typst";
import { sections } from "~/content/posts/replacing_obsidian_with_neovim_and_typst.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("replacing_obsidian_with_neovim_and_typst");

export default function Post() {
	return (
		<PostPage
			slug="replacing_obsidian_with_neovim_and_typst"
			sections={sections}
			Body={Body}
		/>
	);
}
