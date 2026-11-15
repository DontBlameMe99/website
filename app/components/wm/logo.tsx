import { cn } from "~/lib/utils";

/** The "dbm" mark from the profile picture, as an inline SVG. */
export function Logo({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 120 56"
			role="img"
			aria-label="dbm"
			className={cn("h-5 w-auto", className)}
		>
			<title>dbm</title>
			<defs>
				<linearGradient id="dbm-mark" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="var(--mauve)" />
					<stop offset="55%" stopColor="var(--teal)" />
					<stop offset="100%" stopColor="var(--green)" />
				</linearGradient>
			</defs>
			<g
				fill="none"
				stroke="url(#dbm-mark)"
				strokeWidth="11"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="21" cy="34" r="13" />
				<path d="M34 9v25" />
				<circle cx="60" cy="34" r="13" />
				<path d="M73 9v25" />
				<path d="M84 47V27c0-4 3-7 7-7s7 3 7 7v20" />
				<path d="M98 27v20" />
			</g>
		</svg>
	);
}
