import { NotFound } from "./not_found";

export const meta = () => [{ title: "404 | DontBlameMe" }];

export default function NotFoundRoute() {
	return <NotFound status={404} />;
}
