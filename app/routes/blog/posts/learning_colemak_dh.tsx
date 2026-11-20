import Body, { sections } from "~/content/posts/learning_colemak_dh";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("learning_colemak_dh");

export default function Post() {
	return (
		<PostPage slug="learning_colemak_dh" sections={sections} Body={Body} />
	);
}
