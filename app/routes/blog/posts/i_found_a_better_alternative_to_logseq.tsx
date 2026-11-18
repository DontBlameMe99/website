import Body from "~/content/posts/i_found_a_better_alternative_to_logseq";
import { sections } from "~/content/posts/i_found_a_better_alternative_to_logseq.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("i_found_a_better_alternative_to_logseq");

export default function Post() {
	return (
		<PostPage
			slug="i_found_a_better_alternative_to_logseq"
			sections={sections}
			Body={Body}
		/>
	);
}
