import { NAV } from "~/lib/site";

export type Workspace = {
	index: number;
	label: string;
	to: string;
};

export const WORKSPACES: Workspace[] = NAV.map((item, index) => ({
	index: index + 1,
	label: item.label,
	to: item.to,
}));

/** Which workspace a path belongs to, and what the focused tile is called. */
export function describePath(pathname: string): {
	workspace: number;
	title: string;
} {
	if (pathname === "/") return { workspace: 1, title: "~/whoami" };
	if (pathname.startsWith("/blog/")) {
		const slug = pathname.replace("/blog/", "");
		return { workspace: 2, title: `~/blog/${slug}` };
	}
	if (pathname === "/blog") return { workspace: 2, title: "~/blog" };
	if (pathname === "/projects") return { workspace: 3, title: "~/projects" };
	if (pathname === "/contact") return { workspace: 4, title: "~/contact" };
	return { workspace: 0, title: "~/404" };
}
