import Body from "~/content/posts/the_psychology_of_social_media_addiction";
import { sections } from "~/content/posts/the_psychology_of_social_media_addiction.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("the_psychology_of_social_media_addiction");

export default function Post() {
	return (
		<PostPage
			slug="the_psychology_of_social_media_addiction"
			sections={sections}
			Body={Body}
		/>
	);
}
