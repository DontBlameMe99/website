import { Link } from "react-router";
import type { PostExperience } from "~/lib/experiences";
import type { Block, Inline } from "~/lib/markdown";
import type { Post } from "~/lib/posts";

function Inlines({ nodes }: { nodes: Inline[] }) {
	return (
		<>
			{nodes.map((node, index) => {
				const key = `${node.type}-${index}`;
				switch (node.type) {
					case "strong":
						return <strong key={key}>{node.value}</strong>;
					case "em":
						return <em key={key}>{node.value}</em>;
					case "code":
						return <code key={key}>{node.value}</code>;
					case "link":
						return node.href.startsWith("/") || node.href.startsWith("#") ? (
							<Link key={key} to={node.href}>
								{node.value}
							</Link>
						) : (
							<a
								key={key}
								href={node.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{node.value}
							</a>
						);
					case "image":
						return (
							<img
								key={key}
								src={node.src}
								alt={node.alt}
								loading="lazy"
								className="my-4"
							/>
						);
					default:
						return <span key={key}>{node.value}</span>;
				}
			})}
		</>
	);
}

function BlockView({ block }: { block: Block }) {
	switch (block.type) {
		case "heading": {
			const Tag = `h${block.level}` as "h2" | "h3" | "h4";
			return (
				<Tag id={block.id} className="group/heading relative">
					<a
						href={`#${block.id}`}
						className="absolute -left-5 top-0 text-mauve no-underline opacity-0 transition-opacity group-hover/heading:opacity-70"
						aria-label="Link to this section"
					>
						#
					</a>
					<Inlines nodes={block.content} />
				</Tag>
			);
		}
		case "paragraph":
			return (
				<p>
					<Inlines nodes={block.content} />
				</p>
			);
		case "list":
			return block.ordered ? (
				<ol>
					{block.items.map((item, index) => (
						<li key={index} style={{ marginLeft: `${item.depth * 1.2}rem` }}>
							<Inlines nodes={item.content} />
						</li>
					))}
				</ol>
			) : (
				<ul>
					{block.items.map((item, index) => (
						<li key={index} style={{ marginLeft: `${item.depth * 1.2}rem` }}>
							<Inlines nodes={item.content} />
						</li>
					))}
				</ul>
			);
		case "quote":
			return (
				<blockquote>
					<Inlines nodes={block.content} />
				</blockquote>
			);
		case "code":
			return (
				<pre>
					<code data-lang={block.lang}>{block.code}</code>
				</pre>
			);
		case "image":
			return (
				<figure>
					<img src={block.src} alt={block.alt} loading="lazy" />
				</figure>
			);
		case "table":
			return (
				<table>
					<thead>
						<tr>
							{block.header.map((cell, index) => (
								<th key={index}>{cell}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{block.rows.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((cell, cellIndex) => (
									<td key={cellIndex}>{cell}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);
		case "hr":
			return <hr />;
		default:
			return null;
	}
}

/**
 * Renders a post and drops the post's own interactive figures in after the
 * headings they belong to. The prose always comes from the markdown, so the
 * author's text is never rewritten by a figure.
 */
export function Article({
	post,
	experience,
}: {
	post: Post;
	experience?: PostExperience;
}) {
	const visuals = experience?.visuals ?? {};
	const Outro = experience?.outro;
	const nodes: React.ReactNode[] = [];

	for (const [index, block] of post.blocks.entries()) {
		nodes.push(<BlockView key={`block-${index}`} block={block} />);
		if (block.type !== "heading") continue;
		const Visual = visuals[block.id];
		if (Visual) {
			nodes.push(<Visual key={`visual-${index}`} />);
		}
	}

	if (Outro) nodes.push(<Outro key="outro" />);

	return <div className="prose-dbm">{nodes}</div>;
}
