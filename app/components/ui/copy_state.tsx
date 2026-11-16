import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Clipboard state for a copy control, shared by the code block and contact. */
export function useCopy(reset = 1500) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const copy = useCallback(
		async (text: string) => {
			try {
				await navigator.clipboard.writeText(text);
			} catch {
				// Clipboard can be blocked. The text stays visible either way.
				return;
			}
			setCopied(true);
			window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => setCopied(false), reset);
		},
		[reset],
	);

	return { copied, copy };
}

/**
 * The icon half of a copy control. Both glyphs share one grid cell, so the
 * label beside them never moves while they swap.
 */
export function CopyStateIcon({ copied }: { copied: boolean }) {
	return (
		<span
			aria-hidden="true"
			className="relative inline-grid size-3 place-items-center"
		>
			<motion.span
				className="col-start-1 row-start-1 size-full"
				animate={{
					opacity: copied ? 0 : 1,
					scale: copied ? 0.8 : 1,
					rotate: copied ? 12 : 0,
				}}
				transition={{ duration: 0.15, ease: "easeOut" }}
			>
				<Copy className="size-full" />
			</motion.span>
			<motion.span
				className="col-start-1 row-start-1 size-full"
				animate={{
					opacity: copied ? 1 : 0,
					scale: copied ? 1 : 0.8,
					rotate: copied ? 0 : -12,
				}}
				transition={{ duration: 0.15, ease: "easeOut" }}
			>
				<Check className="size-full" />
			</motion.span>
		</span>
	);
}
