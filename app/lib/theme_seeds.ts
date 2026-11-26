/**
 * Values a custom palette or style starts from. The token maps live in
 * theme_catalog.ts, which only the editor and this module import.
 */
import {
	type CustomPalette,
	type CustomStyle,
	hex6,
	isCssValue,
} from "./custom_theme";
import {
	ROOT_STYLE_TOKENS,
	SCHEME_TOKENS,
	STYLE_TOKENS_BY_ID,
} from "./theme_catalog";
import {
	PALETTE_TOKENS,
	type SchemeId,
	STYLE_TOKENS,
	type StyleId,
} from "./themes";

const catalogTokens = (
	tokens: Record<string, string>,
): Record<string, string> =>
	Object.fromEntries(
		Object.entries(tokens)
			.filter(([name]) => name.startsWith("--"))
			.map(([name, value]) => [name.slice(2), value]),
	);
const VAR_ONLY = /^var\(\s*--([a-z0-9-]+)\s*\)$/i;

/** Mocha writes `--ink: var(--text)`; a palette copy needs the color itself. */
const resolveRefs = (
	values: Record<string, string>,
): Record<string, string> => {
	const resolved = { ...values };
	for (let pass = 0; pass < 4; pass++) {
		let changed = false;
		for (const [token, value] of Object.entries(resolved)) {
			const ref = VAR_ONLY.exec(value);
			if (!ref) continue;
			const target = resolved[ref[1]];
			if (!target || target === value) continue;
			resolved[token] = target;
			changed = true;
		}
		if (!changed) break;
	}
	return resolved;
};

/** A palette copy that is complete and answered by the catalog. */
export const seedPalette = (schemeId: SchemeId): CustomPalette | null => {
	const declarations = resolveRefs(catalogTokens(SCHEME_TOKENS[schemeId]));
	const palette: CustomPalette = {};
	for (const token of PALETTE_TOKENS) {
		const value = hex6(declarations[token]);
		if (!value) return null;
		palette[token] = value;
	}
	return palette;
};

const STYLE_TOKEN_SET = new Set<string>(STYLE_TOKENS);
/* Kept as references on purpose: the accent and the border bridge lean on the
   live theme, and a copy must keep following it. */
const DYNAMIC = new Set(["accent-surface", "color-border"]);
const REF = /var\(\s*--([a-z0-9-]+)\s*\)/gi;

/**
 * Fills in a style block's private declarations (`--aurora-*`, `--dos-*`,
 * `--xp-*`). They only exist inside that one style, so a copied value that
 * points at them would be invalid in a custom scope. A style token stays a
 * reference, so editing the target still moves it.
 */
export const expandStyleRefs = (
	value: string,
	declarations: Record<string, string>,
	depth = 0,
): string => {
	if (depth > 4) return value;
	return value.replace(REF, (ref, token: string) => {
		const target = declarations[token];
		if (target === undefined) return ref;
		if (STYLE_TOKEN_SET.has(token) || DYNAMIC.has(token)) return ref;
		return expandStyleRefs(target, declarations, depth + 1);
	});
};

/** Every token the defaults plus one style declare, in their authored form. */
export const seedStyle = (styleId: StyleId): CustomStyle => {
	const merged = {
		...catalogTokens(ROOT_STYLE_TOKENS),
		...catalogTokens(STYLE_TOKENS_BY_ID[styleId]),
	};
	const tokens: CustomStyle = {};
	for (const token of STYLE_TOKENS) {
		const value = merged[token];
		if (value === undefined) continue;
		// The dev stylesheet keeps its line breaks in a declaration; a custom
		// property does not care, and the validator wants one line.
		const line = expandStyleRefs(value, merged).replace(/\s+/g, " ").trim();
		if (isCssValue(line)) tokens[token] = line;
	}
	return tokens;
};
