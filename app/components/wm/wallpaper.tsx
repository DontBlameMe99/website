/** Wallpaper behind the tiles: a dot grid and two slow glows, like a rice. */
export function Wallpaper() {
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
		</div>
	);
}
