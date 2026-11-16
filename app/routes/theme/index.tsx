import { PageHeader, SectionLabel } from "~/components/layout/page_header";
import { seo } from "~/lib/seo";
import { useTheme } from "~/lib/theme_provider";
import {
	type ColorScheme,
	DARK_SCHEMES,
	LIGHT_SCHEMES,
	type SchemeId,
	type Style,
	STYLES,
} from "~/lib/themes";
import { cn } from "~/lib/utils";

export const meta = () =>
	seo({
		title: "Theme",
		description:
			"Pick the interface style and the colorscheme used in dark and light.",
	});

const SWATCHES = [
	"bg-crust",
	"bg-base",
	"bg-surface0",
	"bg-surface1",
	"bg-mauve",
	"bg-text",
] as const;

/** One second rule marks the chosen card in every group on this page. */
const ACTIVE = "outline outline-2 outline-mauve";

function Selected() {
	return <span className="nb-chip nb-accent">Selected</span>;
}

function StyleOption({ option }: { option: Style }) {
	const { style, scheme, setStyle } = useTheme();
	const active = style === option.id;

	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={() => setStyle(option.id)}
			className={cn("nb-panel nb-lift p-6 text-left", active && ACTIVE)}
		>
			<span
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
	const { style, setScheme } = useTheme();

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={() => setScheme(option.id)}
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
