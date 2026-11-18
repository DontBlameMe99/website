import Body from "~/content/posts/is_nixos_the_perfect_linux_distribution_for_you";
import { sections } from "~/content/posts/is_nixos_the_perfect_linux_distribution_for_you.meta";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("is_nixos_the_perfect_linux_distribution_for_you");

export default function Post() {
	return (
		<PostPage
			slug="is_nixos_the_perfect_linux_distribution_for_you"
			sections={sections}
			Body={Body}
		/>
	);
}
