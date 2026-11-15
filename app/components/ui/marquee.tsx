import { cn } from "~/lib/utils";

type MarqueeProps = {
	children: React.ReactNode;
	className?: string;
	duration?: number;
	reverse?: boolean;
};

/**
 * Two copies of the row, translated by exactly one copy plus the gap. The
 * duplicate is hidden from assistive tech and from reduced-motion users.
 */
export function Marquee({
	children,
	className,
	duration = 36,
	reverse = false,
}: MarqueeProps) {
	return (
		<div
			data-slot="marquee"
			className={cn("group relative flex w-full overflow-hidden", className)}
			style={
				{
					"--marquee-duration": `${duration}s`,
					"--marquee-gap": "1.5rem",
				} as React.CSSProperties
			}
		>
			<div
				className={cn(
					"flex min-w-full shrink-0 items-center gap-6 pr-6 animate-marquee",
					reverse && "[animation-direction:reverse]",
					"motion-reduce:animate-none",
				)}
			>
				{children}
			</div>
			<div
				aria-hidden="true"
				className={cn(
					"flex min-w-full shrink-0 items-center gap-6 pr-6 animate-marquee",
					reverse && "[animation-direction:reverse]",
					"motion-reduce:hidden",
				)}
			>
				{children}
			</div>
		</div>
	);
}
