import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type RevealProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	y?: number;
};

/** A short fade and lift when the element first scrolls into view. */
export function Reveal({
	children,
	className,
	delay = 0,
	y = 10,
}: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduced = useReducedMotion();

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={reduced ? false : { opacity: 0, y }}
			animate={
				reduced ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y }
			}
			transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			{children}
		</motion.div>
	);
}
