import { SITE } from "./site";

type SeoArgs = {
	title: string;
	description?: string;
	image?: string;
	type?: "website" | "article";
};

export function seo({
	title,
	description = SITE.description,
	image = `${SITE.url}/images/avatar-square.png`,
	type = "website",
}: SeoArgs) {
	const pageTitle = title === SITE.name ? title : `${title} | ${SITE.name}`;
	return [
		{ title: pageTitle },
		{ name: "description", content: description },
		{ property: "og:title", content: pageTitle },
		{ property: "og:description", content: description },
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: SITE.name },
		{ property: "og:image", content: image },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: pageTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	];
}
