import { useEffect, useRef, useState } from "react";
import { PageHeader, SectionLabel } from "~/components/layout/page_header";
import {
	CustomPaletteEditor,
	CustomStyleEditor,
	ThemeShare,
} from "~/components/theme/custom_editors";
import type { CustomTheme } from "~/lib/custom_theme";
import { seo } from "~/lib/seo";
import { useTheme } from "~/lib/theme_provider";
import { startLiquidWipe } from "~/lib/theme_wipe";
import {
	ACCENT_HUES,
	type Accent,
	type AccentHue,
	type ColorScheme,
	DARK_SCHEMES,
	inkOn,
	LIGHT_SCHEMES,
	type Mode,
	type SchemeChoice,
	STYLES,
	type Style,
} from "~/lib/themes";
import { cn } from "~/lib/utils";

export const meta = () =>
	seo({
		title: "Theme",
		description:
			"Pick the interface style, the colorscheme used in dark and light, and the accent color, or build your own palette and style.",
	});

const SWATCHES = [
	"bg-crust",
	"bg-base",
	"bg-surface0",
	"bg-surface1",
	"bg-accent",
	"bg-text",
] as const;

/** One second rule marks the chosen card in every group on this page. */
const ACTIVE = "outline outline-2 outline-accent";

/** The color picker needs a hex to open on, so it starts at the accent in use. */
const FALLBACK_HEX = "#cba6f7";

function Selected() {
	return (
		<span className="chip-in">
			<span className="nb-chip nb-accent">Selected</span>
		</span>
	);
}

/** A change of style or palette spills out of the card that was clicked. */
function wipeFrom(element: HTMLElement, apply: () => void) {
	const rect = element.getBoundingClientRect();
	startLiquidWipe(
		rect.left + rect.width / 2,
		rect.top + rect.height / 2,
		apply,
	);
}

/**
 * A preview scopes its own palette, so it has to spell out the accent too: an
 * attribute for a hue, the two variables for a hex.
 */
function accentScope(accent: Accent): {
	"data-accent"?: AccentHue;
	style?: React.CSSProperties;
} {
	if (accent.kind === "hue") return { "data-accent": accent.hue };
	return {
		style: {
			"--accent-surface": accent.hex,
			"--on-accent": inkOn(accent.hex),
		} as React.CSSProperties,
	};
}

/** Token values as inline custom properties. */
function tokenStyle(
	tokens: Record<string, string> | null,
): Record<string, string> | undefined {
	if (!tokens) return undefined;
	const style: Record<string, string> = {};
	for (const [token, value] of Object.entries(tokens))
		style[`--${token}`] = value;
	return style;
}

/**
 * A preview of the visitor's own look cannot use an attribute block, because
 * the tokens live in storage. Inline them, palette and style together.
 */
function customPreview(
	mode: Mode,
	custom: CustomTheme,
	palette = true,
): React.CSSProperties | undefined {
	const tokens: Record<string, string> = {};
	if (palette && custom[mode]) Object.assign(tokens, custom[mode]);
	if (custom.style) Object.assign(tokens, custom.style);
	if (!Object.keys(tokens).length) return undefined;

	return {
		...tokenStyle(tokens),
		colorScheme: mode,
		// The build lowers light-dark() to this pair, and a custom scope has no
		// scheme block to declare it.
		"--lightningcss-light": mode === "light" ? "initial" : " ",
		"--lightningcss-dark": mode === "dark" ? "initial" : " ",
	} as React.CSSProperties;
}

function AccentHueOption({ hue }: { hue: AccentHue }) {
	const { accent, setAccent } = useTheme();
	const selected = accent.kind === "hue" && accent.hue === hue;
	// The id is the palette token name, so the swatch is one variable read.
	const paint = `var(--${hue})`;

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={() => setAccent({ kind: "hue", hue })}
			className="flex flex-col items-stretch gap-2"
		>
			<span
				aria-hidden="true"
				className={cn(
					"nb-line h-9",
					selected && "outline outline-2 outline-offset-2",
				)}
				style={{ backgroundColor: paint, outlineColor: paint }}
			/>
			<span
				className={cn(
					"text-center text-[10px]",
					selected ? "font-bold text-text" : "text-subtext0",
				)}
			>
				{hue}
			</span>
		</button>
	);
}

function CustomAccent() {
	const { accent, setAccent } = useTheme();
	const [seed, setSeed] = useState(
		accent.kind === "custom" ? accent.hex : FALLBACK_HEX,
	);
	const [draft, setDraft] = useState<string | null>(
		accent.kind === "custom" ? accent.hex : null,
	);
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (accent.kind === "custom") {
			setDraft(accent.hex);
			return;
		}
		setDraft(null);
		// A hue only becomes a hex in the browser, so the picker opens on the
		// color the page is already painting.
		const value = getComputedStyle(document.documentElement)
			.getPropertyValue("--accent-surface")
			.trim();
		if (/^#[0-9a-f]{6}$/i.test(value)) setSeed(value);
	}, [accent]);

	useEffect(() => {
		const field = input.current;
		if (!field) return;
		// Change lands once the OS picker is done, so dragging a color repaints
		// this swatch and nothing else. Input would commit on every step.
		const done = () => setAccent({ kind: "custom", hex: field.value });
		field.addEventListener("change", done);
		return () => field.removeEventListener("change", done);
	}, [setAccent]);

	return (
		<label className="flex cursor-pointer flex-col items-stretch gap-2">
			<input
				ref={input}
				type="color"
				aria-label="Custom accent color"
				value={draft ?? seed}
				onInput={(event) => setDraft(event.currentTarget.value)}
				onBlur={() => setDraft(accent.kind === "custom" ? accent.hex : null)}
				className="peer sr-only"
			/>
			{/* Empty until picked: an outline, not a color. */}
			<span
				aria-hidden="true"
				className={cn(
					"h-9 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
					draft && "nb-line outline outline-2 outline-offset-2",
				)}
				style={
					draft
						? { backgroundColor: draft, outlineColor: draft }
						: {
								borderWidth: "var(--bw)",
								borderStyle: "dashed",
								borderColor: "var(--overlay0)",
							}
				}
			/>
			<span
				className={cn(
					"text-center text-[10px]",
					draft ? "font-bold text-text" : "text-subtext0",
				)}
			>
				Custom
			</span>
		</label>
	);
}

function AccentSection() {
	const { scheme } = useTheme();

	return (
		<section>
			<SectionLabel as="h2">Accent color</SectionLabel>

			<div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-[repeat(7,minmax(0,1fr))] lg:grid-cols-[repeat(13,minmax(0,1fr))]">
				{ACCENT_HUES.map((hue) => (
					<AccentHueOption key={hue} hue={hue} />
				))}
				<CustomAccent key={scheme} />
			</div>
		</section>
	);
}

function StyleOption({ option }: { option: Style }) {
	const { style, scheme, accent, setStyle } = useTheme();
	const active = style === option.id;

	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={(event) => {
				if (active) return;
				wipeFrom(event.currentTarget, () => setStyle(option.id));
			}}
			className={cn("nb-panel nb-lift min-w-0 p-6 text-left", active && ACTIVE)}
		>
			<span
				{...accentScope(accent)}
				data-style={option.id}
				data-scheme={scheme}
				aria-hidden="true"
				className="nb-well flex h-28 flex-col justify-between gap-2 p-3"
			>
				<span className="nb-panel flex items-center justify-between gap-2 p-2">
					<span className="text-[11px] font-bold text-text">Panel</span>
					<span className="nb-chip nb-accent">Chip</span>
				</span>
				<span className="flex items-center gap-2">
					<span className="nb-button px-2 py-1 text-[11px]">Button</span>
					<span className="text-[11px] text-subtext0">Body text</span>
				</span>
			</span>

			<span className="mt-4 flex min-w-0 flex-wrap items-baseline justify-between gap-2 sm:gap-4">
				<span className="min-w-0 text-lg font-extrabold tracking-[-0.02em] text-text">
					{option.label}
				</span>
				{active ? <Selected /> : null}
			</span>

			<span className="mt-2 block text-[13px] leading-relaxed text-subtext0">
				{option.blurb}
			</span>
		</button>
	);
}

function PaletteOption({
	option,
	selected,
}: {
	option: ColorScheme;
	selected: boolean;
}) {
	const { style, mode, accent, custom, setScheme } = useTheme();
	const scope = accentScope(accent);

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={(event) => {
				if (selected) return;
				// A palette for the other brightness is only saved for later, so it
				// has nothing to wipe in.
				if (option.mode !== mode) {
					setScheme(option.id);
					return;
				}
				wipeFrom(event.currentTarget, () => setScheme(option.id));
			}}
			{...scope}
			data-scheme={option.id}
			data-style={style}
			style={{
				...tokenStyle(style === "custom" ? custom.style : null),
				...scope.style,
			}}
			className={cn(
				"nb-panel nb-lift min-w-0 p-6 text-left",
				selected && ACTIVE,
			)}
		>
			<span aria-hidden="true" className="nb-line flex">
				{SWATCHES.map((tone) => (
					<span key={tone} className={cn("h-3 flex-1", tone)} />
				))}
			</span>

			<span className="mt-4 flex min-w-0 flex-wrap items-baseline justify-between gap-2 sm:gap-4">
				<span className="min-w-0 text-lg font-extrabold tracking-[-0.02em] text-text">
					{option.label}
				</span>
				{selected ? <Selected /> : null}
			</span>

			<span className="mt-2 block text-[13px] leading-relaxed text-subtext0">
				{option.blurb}
			</span>
		</button>
	);
}

function PaletteGroup({
	label,
	mode,
	options,
	selected,
}: {
	label: string;
	mode: Mode;
	options: readonly ColorScheme[];
	selected: SchemeChoice;
}) {
	const { mode: active } = useTheme();
	const live = active === mode;

	return (
		<section>
			<SectionLabel as="h2">
				{label}
				{live ? " (in use)" : null}
			</SectionLabel>

			<div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{options.map((option) => (
					<PaletteOption
						key={option.id}
						option={option}
						selected={selected === option.id}
					/>
				))}
				<CustomPaletteCard mode={mode} selected={selected === "custom"} />
			</div>

			{selected === "custom" ? (
				<div className="mt-6">
					<CustomPaletteEditor mode={mode} />
				</div>
			) : null}
		</section>
	);
}

/** A palette with no built-in preview: these colors come from storage. */
function CustomPaletteCard({
	mode,
	selected,
}: {
	mode: Mode;
	selected: boolean;
}) {
	const { custom, mode: active, accent, setScheme } = useTheme();
	const palette = custom[mode];

	const accentFill = accent.kind === "hue" ? palette?.[accent.hue] : accent.hex;
	const tones: { key: string; color: string | undefined }[] = palette
		? [
				{ key: "crust", color: palette.crust },
				{ key: "base", color: palette.base },
				{ key: "surface0", color: palette.surface0 },
				{ key: "surface1", color: palette.surface1 },
				{ key: "accent", color: accentFill },
				{ key: "text", color: palette.text },
			]
		: [];

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={(event) => {
				if (selected) return;
				// A palette for the other brightness is only saved for later, so it
				// has nothing to wipe in.
				if (mode !== active) {
					setScheme("custom", mode);
					return;
				}
				wipeFrom(event.currentTarget, () => setScheme("custom", mode));
			}}
			className={cn(
				"nb-panel nb-lift min-w-0 p-6 text-left",
				selected && ACTIVE,
			)}
		>
			<span
				aria-hidden="true"
				className={cn("nb-line flex", !palette && "border-dashed")}
			>
				{tones.map((tone) => (
					<span
						key={tone.key}
						className="h-3 flex-1"
						style={{ backgroundColor: tone.color }}
					/>
				))}
			</span>

			<span className="mt-4 flex min-w-0 flex-wrap items-baseline justify-between gap-2 sm:gap-4">
				<span className="min-w-0 text-lg font-extrabold tracking-[-0.02em] text-text">
					Custom
				</span>
				{selected ? <Selected /> : null}
			</span>

			<span className="mt-2 block text-[13px] leading-relaxed text-subtext0">
				{palette
					? "Your own palette. Every color is yours to edit."
					: "Any colorscheme you like, starting from the one in use."}
			</span>
		</button>
	);
}

/** The same preview the built-ins get, painted from the style in storage. */
function CustomStyleCard({ selected }: { selected: boolean }) {
	const { custom, mode, accent, darkScheme, lightScheme, setStyle } =
		useTheme();
	const scope = accentScope(accent);
	const lives = (mode === "dark" ? darkScheme : lightScheme) === "custom";

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={(event) => {
				if (selected) return;
				wipeFrom(event.currentTarget, () => setStyle("custom"));
			}}
			className={cn(
				"nb-panel nb-lift min-w-0 p-6 text-left",
				selected && ACTIVE,
			)}
		>
			<span
				{...scope}
				data-style="custom"
				style={{ ...customPreview(mode, custom, lives), ...scope.style }}
				aria-hidden="true"
				className="nb-well flex h-28 flex-col justify-between gap-2 p-3"
			>
				<span className="nb-panel flex items-center justify-between gap-2 p-2">
					<span className="text-[11px] font-bold text-text">Panel</span>
					<span className="nb-chip nb-accent">Chip</span>
				</span>
				<span className="flex items-center gap-2">
					<span className="nb-button px-2 py-1 text-[11px]">Button</span>
					<span className="text-[11px] text-subtext0">Body text</span>
				</span>
			</span>

			<span className="mt-4 flex min-w-0 flex-wrap items-baseline justify-between gap-2 sm:gap-4">
				<span className="min-w-0 text-lg font-extrabold tracking-[-0.02em] text-text">
					Custom
				</span>
				{selected ? <Selected /> : null}
			</span>

			<span className="mt-2 block text-[13px] leading-relaxed text-subtext0">
				{custom.style
					? "Your own shape and material."
					: "Build a look the catalog does not have."}
			</span>
		</button>
	);
}

export default function ThemePage() {
	const { darkScheme, lightScheme, style } = useTheme();

	return (
		<div>
			<PageHeader
				index="06"
				label="Theme"
				title="Make it yours."
				lead="Pick your preferred design. You decide what you enjoy."
			/>

			<div className="mt-14 flex flex-col gap-12">
				<AccentSection />

				<section>
					<SectionLabel as="h2">Interface style</SectionLabel>

					<div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{STYLES.map((option) => (
							<StyleOption key={option.id} option={option} />
						))}
						<CustomStyleCard selected={style === "custom"} />
					</div>

					{style === "custom" ? (
						<div className="mt-6">
							<CustomStyleEditor />
						</div>
					) : null}
				</section>

				<PaletteGroup
					label="Dark colorscheme"
					mode="dark"
					options={DARK_SCHEMES}
					selected={darkScheme}
				/>

				<PaletteGroup
					label="Light colorscheme"
					mode="light"
					options={LIGHT_SCHEMES}
					selected={lightScheme}
				/>

				<ThemeShare />
			</div>
		</div>
	);
}
