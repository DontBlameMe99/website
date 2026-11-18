import { Link } from "react-router";
import { cn } from "~/lib/utils";

/** The one wrapper every post body uses, so prose styles stay in one place. */
export function Prose({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("prose-dbm", className)}>{children}</div>;
}

/**
 * A section heading with a real anchor. The link stays out of the text flow
 * until the heading is hovered or the link itself has focus.
 */
export function PostHeading({
	level,
	id,
	children,
}: {
	level: 2 | 3 | 4 | 5;
	id: string;
	children: React.ReactNode;
}) {
	const Tag = `h${level}` as "h2" | "h3" | "h4" | "h5";
	return (
		<Tag id={id} className="group/heading relative">
			<a
				href={`#${id}`}
				aria-label="Link to this section"
				className="heading-anchor"
			>
				#
			</a>
			{children}
		</Tag>
	);
}

/**
 * Post images are lazy, decodable, and can be opened on their own. The alt text
 * carries the meaning. The caption repeats it for sighted readers, so it is
 * hidden from screen readers to avoid announcing the same sentence twice.
 */
export function PostImage({
	src,
	alt,
	width,
	height,
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
}) {
	return (
		<figure>
			<a
				href={src}
				target="_blank"
				rel="noreferrer"
				aria-label={alt ? `Open full size: ${alt}` : "Open full size"}
			>
				<img
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading="lazy"
					decoding="async"
				/>
			</a>
			{alt ? <figcaption aria-hidden="true">{alt}</figcaption> : null}
		</figure>
	);
}

export { Link };
