import { cn } from "~/lib/utils";

type PageHeaderProps = {
	index: string;
	label: string;
	meta?: React.ReactNode;
	title: React.ReactNode;
	lead?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

/**
 * The masthead every page shares: a numbered label block, the title, one lead
 * paragraph, and whatever actions the page adds.
 */
export function PageHeader({
	index,
	label,
	meta,
	title,
	lead,
	children,
	className,
}: PageHeaderProps) {
	return (
		<header className={cn("border-t-2 border-ink pt-4", className)}>
			<div className="flex items-baseline justify-between gap-6">
				<span className="nb-chip bg-mauve uppercase tracking-[0.1em] text-on-accent">
					{index}
					<span className="mx-1 opacity-40">/</span>
					{label}
				</span>
				{meta ? (
					<span className="text-meta uppercase tracking-[0.12em]">{meta}</span>
				) : null}
			</div>

			<h1 className="mt-12 text-page-title text-text">{title}</h1>

			{lead ? <p className="mt-6 max-w-[54ch] text-lead">{lead}</p> : null}
			{children}
		</header>
	);
}

/** A left-rail or section label: small, bold, ruled. */
export function SectionLabel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p
			className={cn(
				"border-b-2 border-ink pb-2 text-label text-text",
				className,
			)}
		>
			{children}
		</p>
	);
}
