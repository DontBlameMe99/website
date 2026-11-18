import Body from "~/content/posts/learning_colemak_dh";
import { sections } from "~/content/posts/learning_colemak_dh.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("learning_colemak_dh");

export default function Post() {
	return (
		<PostPage slug="learning_colemak_dh" sections={sections} Body={Body} />
	);
}
