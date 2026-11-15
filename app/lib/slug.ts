/** Heading ids and anchor slugs: lowercase, punctuation dropped, dashes. */
export function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[`*_[\]()#!]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}
