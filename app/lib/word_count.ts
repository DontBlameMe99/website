import type { ReactElement } from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";

const NAMED_ENTITIES: Record<string, string> = {
	amp: "&",
	apos: "'",
	gt: ">",
	hellip: "…",
	lt: "<",
	nbsp: " ",
	quot: '"',
};

function decodeEntity(entity: string): string {
	if (entity.startsWith("#")) {
		const hex = entity[1] === "x" || entity[1] === "X";
		const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
		return Number.isFinite(code) ? String.fromCodePoint(code) : " ";
	}
	return NAMED_ENTITIES[entity.toLowerCase()] ?? " ";
}

export function countBodyWords(Body: () => ReactElement): number {
	const html = renderToStaticMarkup(
		createElement(MemoryRouter, null, createElement(Body)),
	);
	const text = html
		.replace(/<[^>]*>/g, " ")
		.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (_, entity: string) =>
			decodeEntity(entity),
		);
	return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
}
