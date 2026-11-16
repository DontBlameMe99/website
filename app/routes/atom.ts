import { atom } from "~/lib/feeds";

export function loader() {
	return new Response(atom(), {
		headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
	});
}
