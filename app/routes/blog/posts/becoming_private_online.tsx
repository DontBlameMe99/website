import Body from "~/content/posts/becoming_private_online";
import { sections } from "~/content/posts/becoming_private_online.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("becoming_private_online");

export default function Post() {
	return (
		<PostPage slug="becoming_private_online" sections={sections} Body={Body} />
	);
}
