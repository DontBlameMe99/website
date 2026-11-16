import { inflateSync } from "node:zlib";

export type Bitmap = { width: number; height: number; data: Uint8Array };

/**
 * A screenshot decoder for the only PNGs we see: 8-bit RGB or RGBA, no
 * interlacing. Avoids a dependency for the handful of chunks Chromium emits.
 */
export function decodePng(buf: Uint8Array): Bitmap {
	if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47)
		throw new Error("not a PNG");

	let off = 8;
	let width = 0;
	let height = 0;
	let bitDepth = 0;
	let colorType = 0;
	let interlace = 0;
	const idat: Uint8Array[] = [];

	while (off + 8 <= buf.length) {
		const len =
			((buf[off] << 24) |
				(buf[off + 1] << 16) |
				(buf[off + 2] << 8) |
				buf[off + 3]) >>>
			0;
		const type = String.fromCharCode(
			buf[off + 4],
			buf[off + 5],
			buf[off + 6],
			buf[off + 7],
		);
		const data = buf.subarray(off + 8, off + 8 + len);
		if (type === "IHDR") {
			width =
				((data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3]) >>> 0;
			height =
				((data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]) >>> 0;
			bitDepth = data[8];
			colorType = data[9];
			interlace = data[12];
		} else if (type === "IDAT") {
			idat.push(data);
		} else if (type === "IEND") {
			break;
		}
		off += 12 + len;
	}

	if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth ${bitDepth}`);
	if (interlace !== 0) throw new Error("interlaced PNGs are not supported");
	const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
	if (channels === 0)
		throw new Error(`unsupported PNG color type ${colorType}`);

	const raw = inflateSync(idat.length === 1 ? idat[0] : Buffer.concat(idat));
	const stride = width * channels;
	const out = new Uint8Array(width * height * 4);
	const prev = new Uint8Array(stride);
	const cur = new Uint8Array(stride);
	let pos = 0;

	for (let y = 0; y < height; y++) {
		const filter = raw[pos++];
		for (let x = 0; x < stride; x++) {
			const a = x >= channels ? cur[x - channels] : 0;
			const b = prev[x];
			const c = x >= channels ? prev[x - channels] : 0;
			let v = raw[pos + x];
			switch (filter) {
				case 0:
					break;
				case 1:
					v += a;
					break;
				case 2:
					v += b;
					break;
				case 3:
					v = (v + ((a + b) >> 1)) & 255;
					break;
				case 4: {
					const p = a + b - c;
					const pa = Math.abs(p - a);
					const pb = Math.abs(p - b);
					const pc = Math.abs(p - c);
					v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
					break;
				}
				default:
					throw new Error(`unsupported PNG filter ${filter}`);
			}
			cur[x] = v & 255;
		}
		pos += stride;

		let o = y * width * 4;
		for (let x = 0; x < width; x++) {
			const s = x * channels;
			out[o++] = cur[s];
			out[o++] = cur[s + 1];
			out[o++] = cur[s + 2];
			out[o++] = channels === 4 ? cur[s + 3] : 255;
		}
		prev.set(cur);
	}

	return { width, height, data: out };
}
