import Body, {
	sections,
} from "~/content/posts/what_is_this_new_website_design";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("what_is_this_new_website_design");

export default function Post() {
	return (
		<PostPage
			slug="what_is_this_new_website_design"
			sections={sections}
			Body={Body}
		/>
	);
}
