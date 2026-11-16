import { rss } from "~/lib/feeds";

export function loader() {
	return new Response(rss(), {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
