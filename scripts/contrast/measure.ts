export type Rgb = { r: number; g: number; b: number };
export type Color = Rgb & { a: number };

const LINEAR = new Float64Array(256);
for (let i = 0; i < 256; i++) {
	const c = i / 255;
	LINEAR[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance({ r, g, b }: Rgb): number {
	return (
		0.2126 * LINEAR[r & 255] +
		0.7152 * LINEAR[g & 255] +
		0.0722 * LINEAR[b & 255]
	);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
	const la = luminance(a);
	const lb = luminance(b);
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function composite(fg: Rgb, bg: Rgb, alpha: number): Rgb {
	if (alpha >= 1) return fg;
	if (alpha <= 0) return bg;
	return {
		r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
		g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
		b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
	};
}

export function hex({ r, g, b }: Rgb): string {
	const part = (n: number) =>
		Math.max(0, Math.min(255, Math.round(n)))
			.toString(16)
			.padStart(2, "0");
	return `#${part(r)}${part(g)}${part(b)}`;
}

/**
 * WCAG large text: 18pt (24px), or 14pt (18.66px) at bold. Pixels, not points,
 * because the computed style is in pixels.
 */
export function requirements(
	fontSize: number,
	fontWeight: number,
): { aa: number; aaa: number; large: boolean } {
	const large = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
	return large ? { aa: 3, aaa: 4.5, large } : { aa: 4.5, aaa: 7, large };
}

function cssNumber(value: string, scale: number): number {
	const trimmed = value.trim();
	if (trimmed.endsWith("%")) {
		return (Number.parseFloat(trimmed) / 100) * scale;
	}
	return Number.parseFloat(trimmed);
}

/**
 * Chromium hands back `rgb()`/`rgba()` for plain colors and `color(srgb ...)`
 * for anything resolved through color-mix. Both appear in this stylesheet.
 */
export function parseColor(input: string): Color | null {
	const value = input.trim().toLowerCase();

	if (value === "transparent") return { r: 0, g: 0, b: 0, a: 0 };

	const srgb = value.match(/^color\(\s*srgb\s+([^)]+)\)$/);
	if (srgb) {
		const parts = srgb[1].split(/[\s/]+/).filter(Boolean);
		if (parts.length < 3) return null;
		return {
			r: Math.round(cssNumber(parts[0], 1) * 255),
			g: Math.round(cssNumber(parts[1], 1) * 255),
			b: Math.round(cssNumber(parts[2], 1) * 255),
			a: parts[3] === undefined ? 1 : cssNumber(parts[3], 1),
		};
	}

	const rgb = value.match(/^rgba?\(([^)]+)\)$/);
	if (rgb) {
		const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
		if (parts.length < 3) return null;
		return {
			r: Math.round(cssNumber(parts[0], 255)),
			g: Math.round(cssNumber(parts[1], 255)),
			b: Math.round(cssNumber(parts[2], 255)),
			a: parts[3] === undefined ? 1 : cssNumber(parts[3], 1),
		};
	}

	return null;
}

export type Sample = { bg: Rgb; contrast: number };

/**
 * Finds the text ink in a pair of screenshots and returns the least contrast
 * between that ink and the background actually painted underneath it.
 *
 * `visible` is the frame with text, `hidden` the same frame with text fill
 * made transparent. Pixels that differ are ink. Pixels at least half covered
 * are glyph cores, which keeps antialiased edges and box borders out of the
 * measurement. When the foreground is translucent, its rendered color is read
 * off the densest ink pixel instead of from the computed style.
 */
export function measureInk(
	visible: BitmapLike,
	hidden: BitmapLike,
	rect: { x: number; y: number; w: number; h: number },
	fg: Rgb,
	alpha: number,
	ignore?: Uint8Array,
): Sample | null {
	const x0 = Math.max(0, Math.floor(rect.x));
	const y0 = Math.max(0, Math.floor(rect.y));
	const x1 = Math.min(visible.width, Math.ceil(rect.x + rect.w));
	const y1 = Math.min(visible.height, Math.ceil(rect.y + rect.h));
	if (x1 <= x0 || y1 <= y0) return null;

	const v = visible.data;
	const h = hidden.data;
	const width = visible.width;

	let peakDist = -1;
	let peakColor: Rgb | null = null;
	let peakBg: Rgb | null = null;
	let worst: number | null = null;
	let worstBg: Rgb | null = null;
	let innerWorst: number | null = null;
	let innerBg: Rgb | null = null;
	const counts = new Map<number, number>();

	for (let y = y0; y < y1; y++) {
		let i = (y * width + x0) * 4;
		let index = y * width + x0;
		for (let x = x0; x < x1; x++, i += 4, index++) {
			if (ignore?.[index]) continue;
			const vb = v[i + 2];
			const hb = h[i + 2];
			const d = Math.max(
				Math.abs(v[i] - h[i]),
				Math.abs(v[i + 1] - h[i + 1]),
				Math.abs(vb - hb),
			);
			if (d <= 3) continue;

			const bg = { r: h[i], g: h[i + 1], b: hb };
			if (x1 - x0 <= 4 || y1 - y0 <= 4) {
				const key = (bg.r << 16) | (bg.g << 8) | bg.b;
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
			if (d > peakDist) {
				peakDist = d;
				peakColor = { r: v[i], g: v[i + 1], b: vb };
				peakBg = bg;
			}

			// Half coverage or better. Edges fade to the background and would
			// otherwise report the contrast of a half-transparent glyph.
			const dr = fg.r - bg.r;
			const dg = fg.g - bg.g;
			const db = fg.b - bg.b;
			const denominator = dr * dr + dg * dg + db * db;
			if (denominator < 16) continue;
			const coverage =
				((v[i] - bg.r) * dr + (v[i + 1] - bg.g) * dg + (vb - bg.b) * db) /
				denominator;
			if (coverage < 0.5) continue;

			const ink =
				alpha < 1 ? { r: v[i], g: v[i + 1], b: vb } : composite(fg, bg, alpha);
			const ratio = contrastRatio(ink, bg);
			if (worst === null || ratio < worst) {
				worst = ratio;
				worstBg = bg;
			}
			// The outermost pixel row can sit on a neighbouring inline box's
			// background. Prefer the interior when the glyphs reach it.
			if (x > x0 && x < x1 - 1 && y > y0 && y < y1 - 1) {
				if (innerWorst === null || ratio < innerWorst) {
					innerWorst = ratio;
					innerBg = bg;
				}
			}
		}
	}
	if (innerWorst !== null) {
		return { bg: innerBg as Rgb, contrast: innerWorst };
	}
	// A very small run can sit wholly inside the outermost pixels, where a
	// neighbouring inline box paints its own background. Trust the tone most
	// of the glyphs actually sit on.
	if (counts.size > 0) {
		let bestKey = 0;
		let best = 0;
		for (const [key, count] of counts) {
			if (count > best) {
				best = count;
				bestKey = key;
			}
		}
		const bg = {
			r: (bestKey >> 16) & 255,
			g: (bestKey >> 8) & 255,
			b: bestKey & 255,
		};
		return {
			bg,
			contrast: contrastRatio(composite(fg, bg, alpha), bg),
		};
	}

	if (worst === null) {
		// No core pixels: either the glyphs are too thin to reach half coverage
		// or the text is not painted at all. Fall back to the densest pixel.
		if (peakColor === null || peakBg === null) return null;
		return {
			bg: peakBg,
			contrast: contrastRatio(
				alpha < 1 ? peakColor : composite(fg, peakBg, alpha),
				peakBg,
			),
		};
	}

	return { bg: worstBg as Rgb, contrast: worst };
}

type BitmapLike = { width: number; height: number; data: Uint8Array };

export function medianColor(
	hidden: BitmapLike,
	rect: { x: number; y: number; w: number; h: number },
): Rgb | null {
	const x0 = Math.max(0, Math.floor(rect.x));
	const y0 = Math.max(0, Math.floor(rect.y));
	const x1 = Math.min(hidden.width, Math.ceil(rect.x + rect.w));
	const y1 = Math.min(hidden.height, Math.ceil(rect.y + rect.h));
	if (x1 <= x0 || y1 <= y0) return null;

	const counts = new Map<number, number>();
	for (let y = y0; y < y1; y += 2) {
		let i = (y * hidden.width + x0) * 4;
		for (let x = x0; x < x1; x += 2, i += 8) {
			const key =
				(hidden.data[i] << 16) | (hidden.data[i + 1] << 8) | hidden.data[i + 2];
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}
	}
	let best = 0;
	let bestKey = 0;
	for (const [key, count] of counts) {
		if (count > best) {
			best = count;
			bestKey = key;
		}
	}
	if (best === 0) return null;
	return {
		r: (bestKey >> 16) & 255,
		g: (bestKey >> 8) & 255,
		b: bestKey & 255,
	};
}

export function formatRatio(ratio: number): string {
	return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}
