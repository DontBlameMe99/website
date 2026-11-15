import { motion, useScroll, useSpring } from "motion/react";

/** Reading progress: a single hairline, nothing else. */
export function ScrollProgress({ className }: { className?: string }) {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 160,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			aria-hidden="true"
			className={className}
			style={{ scaleX, transformOrigin: "0% 50%" }}
		/>
	);
}
