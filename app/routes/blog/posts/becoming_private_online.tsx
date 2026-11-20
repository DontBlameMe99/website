import Body, { sections } from "~/content/posts/becoming_private_online";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("becoming_private_online");

export default function Post() {
	return (
		<PostPage slug="becoming_private_online" sections={sections} Body={Body} />
	);
}
