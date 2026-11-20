import Body, {
	sections,
} from "~/content/posts/learning_to_use_a_split_keyboard";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("learning_to_use_a_split_keyboard");

export default function Post() {
	return (
		<PostPage
			slug="learning_to_use_a_split_keyboard"
			sections={sections}
			Body={Body}
		/>
	);
}
