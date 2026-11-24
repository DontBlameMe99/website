import Body, { sections } from "~/content/posts/programming_with_just_vibes";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("programming_with_just_vibes");

export default function Post() {
	return (
		<PostPage
			slug="programming_with_just_vibes"
			sections={sections}
			Body={Body}
		/>
	);
}
