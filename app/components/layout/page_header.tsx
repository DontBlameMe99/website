import { cn } from "~/lib/utils";

type PageHeaderProps = {
	index: string;
	label: string;
	meta?: React.ReactNode;
	title: React.ReactNode;
	lead?: React.ReactNode;
	className?: string;
};

/**
 * The masthead every page shares: a numbered label block, the title, and one
 * lead paragraph.
 */
export function PageHeader({
	index,
	label,
	meta,
	title,
	lead,
	className,
}: PageHeaderProps) {
	return (
		<header className={cn("nb-line-t pt-4 page-window", className)}>
			<div className="flex items-baseline justify-between gap-6">
				<span className="nb-chip nb-accent uppercase tracking-[0.1em]">
					{index}
					<span className="mx-1">/</span>
					{label}
				</span>
				<span className="flex items-center gap-3">
					{meta ? (
						<span className="text-meta uppercase tracking-[0.12em]">
							{meta}
						</span>
					) : null}
				</span>
			</div>

			<h1 className="mt-12 text-page-title text-text">{title}</h1>

			{lead ? <p className="mt-6 max-w-[54ch] text-lead">{lead}</p> : null}
		</header>
	);
}

/** A left-rail or section label: small, bold, ruled. */
export function SectionLabel({
	children,
	className,
	as: Tag = "p",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "p" | "h2";
}) {
	const Heading = Tag;
	return (
		<Heading className={cn("nb-line-b pb-2 text-label text-text", className)}>
			{children}
		</Heading>
	);
}
