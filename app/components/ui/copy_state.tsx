import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

/** Clipboard state for a copy control, shared by the code block and contact. */
export function useCopy(reset = 1500) {
	const [status, setStatus] = useState<Status>("idle");
	const timer = useRef<number | undefined>(undefined);
	const attempt = useRef(0);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const copy = useCallback(
		async (text: string) => {
			const current = ++attempt.current;
			window.clearTimeout(timer.current);
			timer.current = undefined;
			let next: Status;
			try {
				await navigator.clipboard.writeText(text);
				next = "copied";
			} catch {
				next = "failed";
			}
			if (current !== attempt.current) return;
			setStatus(next);
			timer.current = window.setTimeout(() => setStatus("idle"), reset);
		},
		[reset],
	);

	return { copied: status === "copied", failed: status === "failed", copy };
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

export function CopyControl({
	value,
	className,
	copiedMessage,
	failedMessage,
	reset = 1500,
	dataCopied = false,
}: {
	value: string;
	className: string;
	copiedMessage: string;
	failedMessage: string;
	reset?: number;
	dataCopied?: boolean;
}) {
	const { copied, failed, copy } = useCopy(reset);

	return (
		<>
			<button
				type="button"
				className={className}
				data-copied={dataCopied && copied ? "" : undefined}
				onClick={() => copy(value)}
			>
				<CopyStateIcon copied={copied} />
				{copied ? "Copied" : failed ? "Copy failed" : "Copy"}
			</button>
			<span role="status" className="sr-only">
				{copied ? copiedMessage : failed ? failedMessage : ""}
			</span>
		</>
	);
}
