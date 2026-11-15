import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

type NumberTickerProps = {
	value: number;
	className?: string;
	decimals?: number;
	suffix?: string;
	prefix?: string;
};

/** Counts up once when the number scrolls into view. */
export function NumberTicker({
	value,
	className,
	decimals = 0,
	suffix = "",
	prefix = "",
}: NumberTickerProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-30px" });
	const reduced = useReducedMotion();

	useEffect(() => {
		const node = ref.current;
		if (!node || !inView) return;
		if (reduced) {
			node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
			return;
		}
		const controls = animate(0, value, {
			duration: 1.1,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (latest) => {
				node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
			},
		});
		return () => controls.stop();
	}, [inView, value, decimals, prefix, suffix, reduced]);

	return (
		<span ref={ref} className={cn("tabular-nums", className)}>
			{`${prefix}${reduced ? value.toFixed(decimals) : 0}${suffix}`}
		</span>
	);
}
