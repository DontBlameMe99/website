import Body, {
	sections,
} from "~/content/posts/the_perfect_productivity_system";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("the_perfect_productivity_system");

export default function Post() {
	return (
		<PostPage
			slug="the_perfect_productivity_system"
			sections={sections}
			Body={Body}
		/>
	);
}
