import { motion, useReducedMotion } from "motion/react";

/** Wallpaper behind the tiles: a dot grid and two slow glows, like a rice. */
export function Wallpaper() {
	const reduced = useReducedMotion();

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
		>
			<div className="absolute inset-0 bg-crust" />
			<div className="wallpaper-grid absolute inset-0 opacity-80" />
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(110% 70% at 50% -20%, color-mix(in srgb, var(--mauve) 9%, transparent), transparent 65%)",
				}}
			/>
			<motion.div
				className="absolute -left-48 top-24 size-[32rem] rounded-full blur-[120px]"
				style={{ background: "var(--wallpaper-glow-a)" }}
				animate={
					reduced ? undefined : { x: [0, 70, -20, 0], y: [0, 50, 10, 0] }
				}
				transition={{
					duration: 36,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute -right-56 top-1/2 size-[30rem] rounded-full blur-[130px]"
				style={{ background: "var(--wallpaper-glow-b)" }}
				animate={
					reduced ? undefined : { x: [0, -60, 20, 0], y: [0, -40, 20, 0] }
				}
				transition={{
					duration: 44,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}
