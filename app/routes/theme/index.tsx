import { useEffect, useRef, useState } from "react";
import { PageHeader, SectionLabel } from "~/components/layout/page_header";
import { seo } from "~/lib/seo";
import { useTheme } from "~/lib/theme_provider";
import {
	ACCENT_HUES,
	type Accent,
	type AccentHue,
	type ColorScheme,
	DARK_SCHEMES,
	inkOn,
	LIGHT_SCHEMES,
	type SchemeId,
	STYLES,
	type Style,
} from "~/lib/themes";
import { cn } from "~/lib/utils";

export const meta = () =>
	seo({
		title: "Theme",
		description:
			"Pick the interface style, the colorscheme used in dark and light, and the accent color.",
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
	return <span className="nb-chip nb-accent">Selected</span>;
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
					"text-center text-[10px] text-subtext0",
					selected && "font-bold text-text",
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
					"text-center text-[10px] text-subtext0",
					draft && "font-bold text-text",
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
			<SectionLabel>Accent color</SectionLabel>

			<div className="mt-4 grid grid-cols-6 gap-x-3 gap-y-4 sm:grid-cols-[repeat(13,minmax(0,1fr))]">
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
			onClick={() => setStyle(option.id)}
			className={cn("nb-panel nb-lift p-6 text-left", active && ACTIVE)}
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

			<span className="mt-4 flex items-baseline justify-between gap-4">
				<span className="text-lg font-extrabold tracking-[-0.02em] text-text">
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
	const { style, accent, setScheme } = useTheme();

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={() => setScheme(option.id)}
			{...accentScope(accent)}
			data-scheme={option.id}
			data-style={style}
			className={cn("nb-panel nb-lift p-6 text-left", selected && ACTIVE)}
		>
			<span aria-hidden="true" className="nb-line flex">
				{SWATCHES.map((tone) => (
					<span key={tone} className={cn("h-3 flex-1", tone)} />
				))}
			</span>

			<span className="mt-4 flex items-baseline justify-between gap-4">
				<span className="text-lg font-extrabold tracking-[-0.02em] text-text">
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
	options,
	selected,
}: {
	label: string;
	options: readonly ColorScheme[];
	selected: SchemeId;
}) {
	const { mode } = useTheme();
	const live = mode === options[0]?.mode;

	return (
		<section>
			<SectionLabel>
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
			</div>
		</section>
	);
}

export default function ThemePage() {
	const { darkScheme, lightScheme } = useTheme();

	return (
		<div>
			<PageHeader
				index="05"
				label="Theme"
				title="Make it yours."
				lead="Pick your preferred design. You decide what you enjoy."
			/>

			<div className="mt-14 flex flex-col gap-12">
				<AccentSection />

				<section>
					<SectionLabel>Interface style</SectionLabel>

					<div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{STYLES.map((option) => (
							<StyleOption key={option.id} option={option} />
						))}
					</div>
				</section>

				<PaletteGroup
					label="Dark colorscheme"
					options={DARK_SCHEMES}
					selected={darkScheme}
				/>

				<PaletteGroup
					label="Light colorscheme"
					options={LIGHT_SCHEMES}
					selected={lightScheme}
				/>
			</div>
		</div>
	);
}
