import { SITE } from "~/lib/site";
import { NotFound } from "./not_found";

export const meta = () => [{ title: `404 | ${SITE.name}` }];

export default function NotFoundRoute() {
	return <NotFound status={404} />;
}
