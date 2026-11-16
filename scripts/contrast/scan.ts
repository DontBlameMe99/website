/**
 * Injected into the page. Kept self-contained: it is serialized with
 * `Function.prototype.toString`, so it may not reference imports or outer
 * bindings. Types are stripped by the transpiler.
 */

export type Rect = { x: number; y: number; w: number; h: number };

export type ScanRun = {
	id: number;
	rect: Rect;
	color: string;
	alpha: number;
	size: number;
	weight: number;
	text: string;
	element: string;
	background: string | null;
	pinned: boolean;
	clipped: boolean;
};

export type ScanPseudo = {
	id: number;
	rect: Rect;
	color: string;
	alpha: number;
	size: number;
	weight: number;
	label: string;
	element: string;
	background: string | null;
	pinned: boolean;
	clipped: boolean;
};

export type Scan = {
	width: number;
	height: number;
	headerBottom: number;
	runs: ScanRun[];
	pseudos: ScanPseudo[];
};

export function scanPage(): Scan {
	const styles = new Map<Element, CSSStyleDeclaration>();

	const style = (el: Element): CSSStyleDeclaration => {
		let value = styles.get(el);
		if (!value) {
			value = getComputedStyle(el);
			styles.set(el, value);
		}
		return value;
	};

	const opacityCache = new Map<Element, number>();
	const opacity = (el: Element): number => {
		const cached = opacityCache.get(el);
		if (cached !== undefined) return cached;
		const own = Number(style(el).opacity);
		const parent = el.parentElement;
		const value = parent ? own * opacity(parent) : own;
		opacityCache.set(el, value);
		return value;
	};

	const pinnedCache = new Map<Element, boolean>();
	const pinned = (el: Element): boolean => {
		const cached = pinnedCache.get(el);
		if (cached !== undefined) return cached;
		const position = style(el).position;
		const parent = el.parentElement;
		const value =
			position === "sticky" ||
			position === "fixed" ||
			(parent ? pinned(parent) : false);
		pinnedCache.set(el, value);
		return value;
	};

	const describe = (el: Element): string => {
		let name = el.tagName.toLowerCase();
		if (el.id) name += `#${el.id}`;
		const classes = el.getAttribute("class");
		if (classes) {
			const trimmed = classes
				.trim()
				.split(/\s+/)
				.filter((item) => item !== "__wcag_hover")
				.slice(0, 4)
				.join(".");
			if (trimmed) name += `.${trimmed}`;
		}
		return name;
	};

	// The element's own opaque fill is the exact surface behind its text, so
	// the pixel pass is only needed when a fill is translucent, blurred, or a
	// gradient. The alpha parser is small on purpose: this function is
	// serialized into the page.
	const alphaOf = (value: string): number => {
		const slash = value.lastIndexOf("/");
		if (slash !== -1) {
			const match = value.slice(slash + 1).match(/[\d.]+/);
			return match ? Number(match[0]) : 1;
		}
		const rgba = value.match(/^rgba\(([^)]+)\)$/i);
		if (rgba) {
			const parts = rgba[1].split(",").map((part) => Number(part.trim()));
			return parts[3] ?? 1;
		}
		return 1;
	};

	const ownFill = (
		cs: CSSStyleDeclaration,
		elementOpacity: number,
	): string | null => {
		if (elementOpacity !== 1) return null;
		if (cs.backgroundImage !== "none") return null;
		if (cs.backdropFilter !== "none") return null;
		if (cs.filter !== "none") return null;
		if (cs.mixBlendMode !== "normal") return null;
		if (alphaOf(cs.backgroundColor) < 1) return null;
		return cs.backgroundColor;
	};

	const snippet = (text: string): string => {
		const flat = text.replace(/\s+/g, " ").trim();
		return flat.length > 48 ? `${flat.slice(0, 47)}…` : flat;
	};

	// The part of a line box that the paint actually shows: a scroll container
	// or an overflow clip can hide text that still has a client rect.
	const clipped = (el: Element, rect: Rect): Rect => {
		let left = rect.x;
		let top = rect.y;
		let right = rect.x + rect.w;
		let bottom = rect.y + rect.h;
		for (let cur: Element | null = el; cur; cur = cur.parentElement) {
			const cs = style(cur);
			const ox = cs.overflowX;
			const oy = cs.overflowY;
			if (ox === "visible" && oy === "visible") continue;
			const box = cur.getBoundingClientRect();
			const boxLeft = box.left + (cur as HTMLElement).clientLeft;
			const boxTop = box.top + (cur as HTMLElement).clientTop;
			if (ox !== "visible") {
				left = Math.max(left, boxLeft);
				right = Math.min(right, boxLeft + (cur as HTMLElement).clientWidth);
			}
			if (oy !== "visible") {
				top = Math.max(top, boxTop);
				bottom = Math.min(bottom, boxTop + (cur as HTMLElement).clientHeight);
			}
		}
		return { x: left, y: top, w: right - left, h: bottom - top };
	};

	const runs: ScanRun[] = [];
	const pseudos: ScanPseudo[] = [];
	let nextRun = 0;
	let nextPseudo = 0;

	const addRect = (
		el: Element,
		cs: CSSStyleDeclaration,
		raw: Rect,
		rect: Rect,
		text: string,
	) => {
		if (rect.w < 2 || rect.h < 2) return;
		const svg = el.namespaceURI === "http://www.w3.org/2000/svg";
		const fill = cs.fill;
		if (svg && (fill === "none" || fill.startsWith("url("))) {
			// The mask must not paint text the scan never records.
			el.setAttribute("data-wcag-skip", "");
			return;
		}
		const color = svg ? fill : cs.color;
		const alpha = opacity(el);
		if (alpha <= 0) return;
		runs.push({
			id: nextRun++,
			rect,
			color,
			alpha,
			size: Number.parseFloat(cs.fontSize),
			weight: Number.parseInt(cs.fontWeight, 10) || 400,
			text: snippet(text),
			element: describe(el),
			background: ownFill(cs, alpha),
			pinned: pinned(el),
			clipped:
				Math.abs(raw.x - rect.x) > 0.5 ||
				Math.abs(raw.y - rect.y) > 0.5 ||
				Math.abs(raw.x + raw.w - (rect.x + rect.w)) > 0.5 ||
				Math.abs(raw.y + raw.h - (rect.y + rect.h)) > 0.5,
		});
	};

	const elements = Array.from(document.body.querySelectorAll("*"));
	for (const el of elements) {
		const cs = style(el);
		if (cs.display === "none") continue;
		if (cs.visibility === "hidden" || cs.visibility === "collapse") {
			// A descendant may opt back in, so keep walking but skip this box.
		} else if (opacity(el) > 0) {
			for (const node of Array.from(el.childNodes)) {
				if (node.nodeType !== 3) continue;
				const text = node.textContent ?? "";
				if (!text.trim()) continue;
				const range = document.createRange();
				range.selectNodeContents(node);
				for (const box of Array.from(range.getClientRects())) {
					const raw = { x: box.x, y: box.y, w: box.width, h: box.height };
					addRect(el, cs, raw, clipped(el, raw), text);
				}
				range.detach();
			}
		}

		if (cs.visibility === "hidden" || cs.visibility === "collapse") continue;
		if (opacity(el) <= 0) continue;

		const pseudo = (
			name: "::before" | "::after" | "::marker" | "::placeholder",
		) => {
			let pcs: CSSStyleDeclaration;
			try {
				pcs = getComputedStyle(el, name);
			} catch {
				return;
			}
			const content = pcs.content;
			let label = `${describe(el)}${name}`;
			if (name === "::placeholder") {
				if (
					!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
				)
					return;
				if (el.value) return;
				if (pcs.content === "none" && !el.placeholder) return;
				label = `${describe(el)} placeholder`;
			} else if (name === "::marker") {
				if (cs.display !== "list-item") return;
				const listStyle = cs.listStyleType;
				if (listStyle === "none" || cs.listStyleImage !== "none") return;
			} else {
				if (!content || content === "none" || content === "normal") return;
				if (content === '""' || content === "''") return;
				if (content.startsWith("url(")) return;
			}
			const box = el.getBoundingClientRect();
			const em = Number.parseFloat(pcs.fontSize) || 16;
			// Generated boxes are not measurable through CSSOM. A margin around
			// the element covers outside markers and inside counters; any direct
			// text there is already claimed by its own run.
			const padLeft = Math.max(em * 3, 24);
			const pad = Math.max(em, 8);
			const raw = {
				x: box.left - padLeft,
				y: box.top - pad,
				w: box.width + padLeft + pad,
				h: box.height + pad * 2,
			};
			const rect = clipped(el, raw);
			if (rect.w < 2 || rect.h < 2) return;
			const pseudoAlpha = opacity(el) * Number(pcs.opacity);
			pseudos.push({
				id: nextPseudo++,
				rect,
				color: pcs.color,
				alpha: pseudoAlpha,
				size: Number.parseFloat(pcs.fontSize),
				weight: Number.parseInt(pcs.fontWeight, 10) || 400,
				label,
				element: describe(el),
				background: ownFill(pcs, pseudoAlpha),
				pinned: pinned(el),
				clipped:
					Math.abs(raw.x - rect.x) > 0.5 ||
					Math.abs(raw.y - rect.y) > 0.5 ||
					Math.abs(raw.x + raw.w - (rect.x + rect.w)) > 0.5 ||
					Math.abs(raw.y + raw.h - (rect.y + rect.h)) > 0.5,
			});
		};

		pseudo("::before");
		pseudo("::after");
		pseudo("::marker");
		pseudo("::placeholder");
	}

	const header = document.querySelector("header");
	return {
		width: document.documentElement.clientWidth,
		height: document.documentElement.scrollHeight,
		headerBottom: header ? Math.ceil(header.getBoundingClientRect().bottom) : 0,
		runs,
		pseudos,
	};
}

/** Paints every glyph in one chosen color so coverage never depends on the text color. */
export function setTextMask(color: string | null): string | null {
	const ID = "__wcag_text_mask";
	let tag = document.getElementById(ID) as HTMLStyleElement | null;
	if (!tag) {
		tag = document.createElement("style");
		tag.id = ID;
		tag.textContent = [
			"*,*::before,*::after,*::marker{",
			"-webkit-text-fill-color:var(--wcag-mask) !important;",
			"text-shadow:none !important;",
			"}",
			"svg text:not([data-wcag-skip]){fill:var(--wcag-mask) !important}",
			"input::placeholder,textarea::placeholder,::marker{color:var(--wcag-mask) !important}",
		].join("");
		document.head.appendChild(tag);
	}
	if (!color) {
		tag.disabled = true;
		return null;
	}
	document.documentElement.style.setProperty("--wcag-mask", color);
	tag.disabled = false;
	return color;
}
/** Hides every glyph while keeping every box, border, and background intact. */
export function setTextHidden(hidden: boolean): boolean {
	const ID = "__wcag_text_hidden";
	let tag = document.getElementById(ID) as HTMLStyleElement | null;
	if (!tag) {
		tag = document.createElement("style");
		tag.id = ID;
		tag.textContent = [
			"*,*::before,*::after,*::marker{",
			"-webkit-text-fill-color:transparent !important;",
			"text-shadow:none !important;",
			"}",
			"svg text{fill:transparent !important}",
			"input::placeholder,textarea::placeholder,::marker{color:transparent !important}",
		].join("");
		document.head.appendChild(tag);
	}
	tag.disabled = !hidden;
	return tag.disabled;
}

/**
 * Forces every `:hover` rule on by moving the pseudo-class out of the
 * selector and onto a class added to each element. This keeps the cascade,
 * layers, and media conditions untouched, and is reversible. Sibling-only
 * effects cannot occur in real hover anyway.
 */
export function setHover(hidden: boolean): boolean {
	const MARK = "__wcag_hover";
	const store = window as unknown as {
		__wcagHover?: { rules: [CSSStyleRule, string][]; on: boolean };
	};
	if (!store.__wcagHover) store.__wcagHover = { rules: [], on: false };
	const state = store.__wcagHover;

	if (hidden && !state.on) {
		const visit = (rules: CSSRuleList) => {
			for (const rule of Array.from(rules)) {
				const withNested = rule as CSSRule & { cssRules?: CSSRuleList };
				if (withNested.cssRules) visit(withNested.cssRules);
				const styleRule = rule as CSSStyleRule;
				if (!styleRule.selectorText?.includes(":hover")) continue;
				const original = styleRule.selectorText;
				try {
					styleRule.selectorText = original.replaceAll(":hover", `.${MARK}`);
					state.rules.push([styleRule, original]);
				} catch {
					// A selector that cannot survive the rewrite stays inert.
				}
			}
		};
		for (const sheet of Array.from(document.styleSheets)) {
			try {
				visit(sheet.cssRules);
			} catch {
				// Cross-origin sheets cannot be read.
			}
		}
		for (const el of Array.from(document.querySelectorAll("*"))) {
			el.classList.add(MARK);
		}
		state.on = true;
	} else if (!hidden && state.on) {
		for (const [rule, original] of state.rules) rule.selectorText = original;
		state.rules = [];
		for (const el of Array.from(document.querySelectorAll(`.${MARK}`))) {
			el.classList.remove(MARK);
		}
		state.on = false;
	}
	return state.on;
}

/**
 * Sticky sidebars are pinned to the viewport while scrolling, which would put
 * their text somewhere the tile pass does not look. Their contrast comes from
 * their own surface, not from the scroll position, so flatten them. The header
 * stays pinned: its translucency is exactly what the tile pass must measure.
 */
export function unpinSticky(): number {
	const store = window as unknown as {
		__wcagUnpinned?: [HTMLElement, string][];
	};
	const list: [HTMLElement, string][] = [];
	for (const el of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
		if (el.closest("header")) continue;
		const position = getComputedStyle(el).position;
		if (position !== "sticky" && position !== "fixed") continue;
		list.push([el, el.style.position]);
		el.style.position = "static";
	}
	store.__wcagUnpinned = list;
	return list.length;
}

export function restorePinned(): number {
	const store = window as unknown as {
		__wcagUnpinned?: [HTMLElement, string][];
	};
	const list = store.__wcagUnpinned ?? [];
	for (const [el, position] of list) el.style.position = position;
	store.__wcagUnpinned = [];
	return list.length;
}

/**
 * Jumps every running animation to its end and removes looping ones. Capture
 * pairs must show the same frame apart from the text fill: a bar growing
 * between the two shots would otherwise read as ink.
 */
export function finishAnimations(): number {
	let done = 0;
	for (const animation of document.getAnimations()) {
		try {
			const timing = animation.effect?.getTiming();
			if (timing && timing.iterations === Number.POSITIVE_INFINITY) {
				animation.cancel();
				done++;
				continue;
			}
			animation.finish();
			done++;
		} catch {
			try {
				animation.cancel();
				done++;
			} catch {
				// Nothing left to do with an animation that cannot settle.
			}
		}
	}
	return done;
}
