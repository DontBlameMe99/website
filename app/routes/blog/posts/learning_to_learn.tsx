import Body from "~/content/posts/learning_to_learn";
import { sections } from "~/content/posts/learning_to_learn.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("learning_to_learn");

export default function Post() {
	return <PostPage slug="learning_to_learn" sections={sections} Body={Body} />;
}
