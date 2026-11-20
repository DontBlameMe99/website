import Body, {
	sections,
} from "~/content/posts/backups_you_only_want_them_once_you_need_them";
import { PostPage, postMeta } from "~/routes/blog/post";

export const meta = postMeta("backups_you_only_want_them_once_you_need_them");

export default function Post() {
	return (
		<PostPage
			slug="backups_you_only_want_them_once_you_need_them"
			sections={sections}
			Body={Body}
		/>
	);
}
