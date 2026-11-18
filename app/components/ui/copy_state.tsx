import { Check, Copy } from "lucide-react";
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
 * label beside them never moves while they swap. The swap itself is a class,
 * which keeps the motion runtime off pages that only copy text.
 */
export function CopyStateIcon({ copied }: { copied: boolean }) {
	return (
		<span
			aria-hidden="true"
			data-copied={copied}
			className="copy-state relative inline-grid size-3 place-items-center"
		>
			<span className="copy-icon copy-icon-idle col-start-1 row-start-1 size-full">
				<Copy className="size-full" />
			</span>
			<span className="copy-icon copy-icon-done col-start-1 row-start-1 size-full">
				<Check className="size-full" />
			</span>
		</span>
	);
}
