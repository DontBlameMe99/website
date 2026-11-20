import Body, {
	sections,
} from "~/content/posts/switching_from_youtube_to_freetube";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("switching_from_youtube_to_freetube");

export default function Post() {
	return (
		<PostPage
			slug="switching_from_youtube_to_freetube"
			sections={sections}
			Body={Body}
		/>
	);
}
