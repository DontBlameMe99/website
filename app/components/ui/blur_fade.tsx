import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type BlurFadeProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	blur?: number;
	y?: number;
	once?: boolean;
};

/** Magic-UI style blur fade. Enters the viewport with a short blur ramp. */
export function BlurFade({
	children,
	className,
	delay = 0,
	duration = 0.5,
	blur = 8,
	y = 14,
	once = true,
}: BlurFadeProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once, margin: "-60px" });
	const reduced = useReducedMotion();

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={reduced ? false : { opacity: 0, filter: `blur(${blur}px)`, y }}
			animate={
				reduced
					? undefined
					: inView
						? { opacity: 1, filter: "blur(0px)", y: 0 }
						: { opacity: 0, filter: `blur(${blur}px)`, y }
			}
			transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

type StaggerProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	step?: number;
};

/** A list that reveals itself one child at a time once it scrolls into view. */
export function Stagger({
	children,
	className,
	delay = 0,
	step = 0.065,
}: StaggerProps) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-40px" }}
			variants={{
				hidden: {},
				visible: {
					transition: { staggerChildren: step, delayChildren: delay },
				},
			}}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
				visible: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
