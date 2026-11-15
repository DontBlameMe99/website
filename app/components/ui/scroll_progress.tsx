import { motion, useScroll, useSpring } from "motion/react";

/** Reading progress for a single article, drawn into the window title bar. */
export function ScrollProgress({ className }: { className?: string }) {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 26,
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
