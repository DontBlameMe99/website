/**
 * A deliberately small markdown subset: exactly what the converted blog posts
 * use. The posts are generated once from the author's Typst sources, so the
 * grammar stays fixed and does not need a general purpose parser.
 */

export type Inline =
	| { type: "text"; value: string }
	| { type: "strong"; value: string }
	| { type: "em"; value: string }
	| { type: "code"; value: string }
	| { type: "link"; href: string; value: string }
	| { type: "image"; src: string; alt: string };

export type ListItem = { depth: number; content: Inline[] };

export type Block =
	| { type: "heading"; level: 2 | 3 | 4; id: string; content: Inline[] }
	| { type: "paragraph"; content: Inline[] }
	| { type: "list"; ordered: boolean; items: ListItem[] }
	| { type: "quote"; content: Inline[] }
	| { type: "code"; lang: string; code: string }
	| { type: "image"; src: string; alt: string }
	| { type: "table"; header: string[]; rows: string[][] }
	| { type: "hr" };

const INLINE_PATTERN =
	/(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)|(!\[[^\]]*\]\([^)]+\))|(\[[^\]]*\]\([^)]+\))/g;

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[`*_[\]()#!]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function plainText(inlines: Inline[]): string {
	return inlines
		.map((node) => {
			if (node.type === "image") return node.alt;
			if (node.type === "code") return node.value;
			return node.value;
		})
		.join("");
}

export function parseInline(source: string): Inline[] {
	const nodes: Inline[] = [];
	let last = 0;
	for (const match of source.matchAll(INLINE_PATTERN)) {
		const at = match.index ?? 0;
		if (at > last) nodes.push({ type: "text", value: source.slice(last, at) });
		const token = match[0];

		if (token.startsWith("**")) {
			nodes.push({ type: "strong", value: token.slice(2, -2) });
		} else if (token.startsWith("`")) {
			nodes.push({ type: "code", value: token.slice(1, -1) });
		} else if (token.startsWith("![")) {
			const [, alt, src] = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/) ?? [];
			if (src) nodes.push({ type: "image", src, alt: alt ?? "" });
		} else if (token.startsWith("[")) {
			const [, value, href] = token.match(/^\[([^\]]*)\]\(([^)]+)\)$/) ?? [];
			if (href) nodes.push({ type: "link", href, value: value ?? "" });
		} else {
			nodes.push({ type: "em", value: token.slice(1, -1) });
		}

		last = at + token.length;
	}
	if (last < source.length) {
		nodes.push({ type: "text", value: source.slice(last) });
	}
	return nodes;
}

const HEADING = /^(#{2,4})\s+(.*)$/;
const LIST_ITEM = /^(\s*)([-+]|\d+\.)\s+(.*)$/;

export function parseMarkdown(source: string): Block[] {
	const lines = source.replace(/\r\n/g, "\n").split("\n");
	const blocks: Block[] = [];
	let i = 0;

	const flushParagraph = (buffer: string[]) => {
		if (!buffer.length) return;
		const content = parseInline(buffer.join(" "));
		const onlyImages = content.every(
			(node) =>
				node.type === "image" || (node.type === "text" && !node.value.trim()),
		);
		if (onlyImages) {
			for (const node of content) {
				if (node.type === "image") {
					blocks.push({ type: "image", src: node.src, alt: node.alt });
				}
			}
		} else {
			blocks.push({ type: "paragraph", content });
		}
		buffer.length = 0;
	};

	while (i < lines.length) {
		const line = lines[i];

		if (!line.trim()) {
			i++;
			continue;
		}

		const fence = line.match(/^```(\w*)\s*$/);
		if (fence) {
			const body: string[] = [];
			i++;
			while (i < lines.length && !/^```\s*$/.test(lines[i])) {
				body.push(lines[i]);
				i++;
			}
			i++;
			blocks.push({
				type: "code",
				lang: fence[1] ?? "",
				code: body.join("\n"),
			});
			continue;
		}

		const heading = line.match(HEADING);
		if (heading) {
			const content = parseInline(heading[2]);
			blocks.push({
				type: "heading",
				level: heading[1].length as 2 | 3 | 4,
				id: slugify(plainText(content)),
				content,
			});
			i++;
			continue;
		}

		if (/^(\*\s*){3,}$|^(-\s*){3,}$|^(_\s*){3,}$/.test(line.trim())) {
			blocks.push({ type: "hr" });
			i++;
			continue;
		}

		if (line.startsWith("|")) {
			const rows: string[][] = [];
			while (i < lines.length && lines[i].startsWith("|")) {
				rows.push(
					lines[i]
						.replace(/^\||\|$/g, "")
						.split("|")
						.map((cell) => cell.trim()),
				);
				i++;
			}
			const [header, ...rest] = rows;
			blocks.push({
				type: "table",
				header: header ?? [],
				rows: rest.filter(
					(row) => !row.every((cell) => /^:?-{2,}:?$/.test(cell)),
				),
			});
			continue;
		}

		if (line.startsWith("> ")) {
			const body: string[] = [];
			while (i < lines.length && lines[i].startsWith("> ")) {
				body.push(lines[i].slice(2));
				i++;
			}
			blocks.push({ type: "quote", content: parseInline(body.join(" ")) });
			continue;
		}

		const listItem = line.match(LIST_ITEM);
		if (listItem) {
			const ordered = /\d/.test(listItem[2]);
			const items: ListItem[] = [];
			while (i < lines.length) {
				const item = lines[i].match(LIST_ITEM);
				if (!item) break;
				items.push({
					depth: Math.floor(item[1].length / 2),
					content: parseInline(item[3]),
				});
				i++;
			}
			blocks.push({ type: "list", ordered, items });
			continue;
		}

		const buffer: string[] = [];
		while (
			i < lines.length &&
			lines[i].trim() &&
			!/^```/.test(lines[i]) &&
			!HEADING.test(lines[i]) &&
			!LIST_ITEM.test(lines[i]) &&
			!lines[i].startsWith("|") &&
			!lines[i].startsWith("> ")
		) {
			buffer.push(lines[i].trim());
			i++;
		}
		flushParagraph(buffer);
	}

	return blocks;
}

export type Frontmatter = {
	title: string;
	date: string;
	summary: string;
	tags: string[];
	accent: string;
};

export function splitFrontmatter(source: string): {
	meta: Record<string, string>;
	body: string;
} {
	const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) return { meta: {}, body: source };
	const meta: Record<string, string> = {};
	for (const line of match[1].split("\n")) {
		const at = line.indexOf(":");
		if (at === -1) continue;
		meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
	}
	return { meta, body: source.slice(match[0].length) };
}
