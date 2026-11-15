import type { ComponentType } from "react";

/**
 * A post can dress itself up. `hero` renders above the prose, `visuals` maps a
 * heading id to a figure that renders right after that heading, and `outro`
 * closes the page. Everything is optional, so a post with no experience file
 * still reads as a normal article.
 */
export type PostExperience = {
	hero?: ComponentType;
	visuals?: Record<string, ComponentType>;
	outro?: ComponentType;
};

const modules = import.meta.glob<{ default: PostExperience }>(
	"../content/experiences/*.tsx",
	{ eager: true },
);

const experiences = new Map<string, PostExperience>(
	Object.entries(modules).map(([path, module]) => [
		path
			.split("/")
			.pop()
			?.replace(/\.tsx$/, "") ?? path,
		module.default,
	]),
);

export function getExperience(slug: string): PostExperience | undefined {
	return experiences.get(slug);
}
