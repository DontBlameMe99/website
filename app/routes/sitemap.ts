import { sitemap } from "~/lib/feeds";

export function loader() {
	return new Response(sitemap(), {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
