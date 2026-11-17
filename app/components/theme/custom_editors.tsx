import { useEffect, useRef, useState } from "react";
import {
	AAA,
	type CustomPalette,
	contrastFailures,
	PALETTE_GROUPS,
	STYLE_GROUPS,
} from "~/lib/custom_theme";
import { useTheme } from "~/lib/theme_provider";
import {
	DARK_SCHEMES,
	LIGHT_SCHEMES,
	type Mode,
	type SchemeId,
	STYLES,
	type StyleId,
} from "~/lib/themes";

type Field = {
	token: string;
	label: string;
	group: string;
};

const byGroup = (fields: readonly Field[]) => {
	const groups: { name: string; fields: Field[] }[] = [];
	for (const field of fields) {
		const group = groups.find((item) => item.name === field.group);
		if (group) group.fields.push(field);
		else groups.push({ name: field.group, fields: [field] });
	}
	return groups;
};

function GroupLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-[10px] font-bold uppercase tracking-[0.1em] text-subtext0">
			{children}
		</p>
	);
}

function ColorField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (hex: string) => void;
}) {
	const [draft, setDraft] = useState(value);
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => setDraft(value), [value]);

	useEffect(() => {
		const field = input.current;
		if (!field) return;
		// The picker streams input while a color is dragged. Change lands once it
		// is done, so dragging repaints this swatch and nothing else.
		const done = () => onChange(field.value);
		field.addEventListener("change", done);
		return () => field.removeEventListener("change", done);
	}, [onChange]);

	return (
		<label className="flex cursor-pointer flex-col gap-2">
			<input
				ref={input}
				type="color"
				aria-label={label}
				value={draft}
				onInput={(event) => setDraft(event.currentTarget.value)}
				className="nb-line h-9 w-full cursor-pointer bg-transparent p-0"
			/>
			<span className="text-[10px] leading-tight text-subtext0">{label}</span>
		</label>
	);
}

function ValueField({
	label,
	token,
	value,
	onChange,
}: {
	label: string;
	token: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<label className="flex flex-col gap-1">
			<span className="text-[11px] font-semibold text-text">{label}</span>
			<input
				value={value}
				placeholder="default"
				onChange={(event) => onChange(event.currentTarget.value)}
				spellCheck={false}
				className="nb-input min-w-0 font-mono text-[11px] placeholder:text-overlay0"
			/>
			<span className="truncate font-mono text-[10px] text-overlay0">
				--{token}
			</span>
		</label>
	);
}

/**
 * The audit's own pairs, reported while the visitor paints. A custom palette is
 * outside the CI audit, so this is the only check it gets.
 */
function ContrastNote({ palette }: { palette: CustomPalette }) {
	const failures = contrastFailures(palette);

	if (!failures.length) {
		return (
			<p className="mt-6 border-t border-rule pt-4 text-[12px] text-subtext0">
				Every text pair clears AAA ({AAA}:1).
			</p>
		);
	}

	const worst = failures.slice(0, 5);

	return (
		<div className="mt-6 border-t border-rule pt-4">
			<p className="text-[12px] font-bold text-red">
				{failures.length} pairs fall below AAA ({AAA}:1).
			</p>
			<ul className="mt-2 flex flex-col gap-1">
				{worst.map((failure) => (
					<li
						key={`${failure.ink}-${failure.surface}`}
						className="text-[12px] text-subtext0"
					>
						{failure.ink} on {failure.surface}: {failure.ratio.toFixed(1)}:1
					</li>
				))}
			</ul>
			{failures.length > worst.length ? (
				<p className="mt-1 text-[11px] text-overlay0">
					And {failures.length - worst.length} more.
				</p>
			) : null}
		</div>
	);
}

function SourcePicker<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: readonly { id: T; label: string }[];
	onChange: (value: T) => void;
}) {
	return (
		<label className="flex flex-col gap-1">
			<span className="text-[10px] uppercase tracking-[0.08em] text-subtext0">
				{label}
			</span>
			<select
				value={value}
				onChange={(event) => onChange(event.currentTarget.value as T)}
				className="nb-input py-1 text-[12px]"
			>
				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}

/** One palette's colors, in the order and grouping the labels declare. */
export function CustomPaletteEditor({ mode }: { mode: Mode }) {
	const { custom, darkScheme, lightScheme, copyPalette, setPaletteToken } =
		useTheme();
	const options = (mode === "dark" ? DARK_SCHEMES : LIGHT_SCHEMES).map(
		(scheme) => ({ id: scheme.id, label: scheme.label }),
	);
	const active = mode === "dark" ? darkScheme : lightScheme;
	const [from, setFrom] = useState<SchemeId>(
		active === "custom" ? options[0].id : active,
	);
	const palette = custom[mode];

	if (!palette) return null;

	return (
		<section className="nb-panel p-6">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 className="text-lg font-extrabold tracking-[-0.02em] text-text">
						Custom {mode} palette
					</h2>
					<p className="mt-1 max-w-[46ch] text-[13px] leading-relaxed text-subtext0">
						Every color in the {mode} color scheme.
					</p>
				</div>

				<div className="flex items-end gap-2">
					<SourcePicker
						label="Start from"
						value={from}
						options={options}
						onChange={setFrom}
					/>
					<button
						type="button"
						onClick={() => {
							if (!window.confirm("Replace this palette with a copy?")) return;
							copyPalette(mode, from);
						}}
						className="nb-button"
					>
						Copy colors
					</button>
				</div>
			</div>

			{byGroup(PALETTE_GROUPS).map((group) => (
				<div key={group.name} className="mt-6">
					<GroupLabel>{group.name}</GroupLabel>
					<div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-8">
						{group.fields.map((field) => (
							<ColorField
								key={field.token}
								label={field.label}
								value={palette[field.token] ?? "#000000"}
								onChange={(hex) => setPaletteToken(mode, field.token, hex)}
							/>
						))}
					</div>
				</div>
			))}

			<ContrastNote palette={palette} />
		</section>
	);
}

/** Every shape token one style can override. A blank field follows the default. */
export function CustomStyleEditor() {
	const { custom, style, copyStyle, setStyleToken } = useTheme();
	const source = style === "custom" ? STYLES[0].id : style;
	const [from, setFrom] = useState<StyleId>(source);
	const tokens = custom.style;

	if (!tokens) return null;

	return (
		<section className="nb-panel p-6">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 className="text-lg font-extrabold tracking-[-0.02em] text-text">
						Custom interface style
					</h2>
					<p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-subtext0">
						Your own shape, type, edges, and fills. Keep it empty to follow the
						default.
					</p>
				</div>

				<div className="flex items-end gap-2">
					<SourcePicker
						label="Start from"
						value={from}
						options={STYLES}
						onChange={setFrom}
					/>
					<button
						type="button"
						onClick={() => {
							if (!window.confirm("Replace these values with a copy?")) return;
							copyStyle(from);
						}}
						className="nb-button"
					>
						Copy values
					</button>
				</div>
			</div>

			{byGroup(STYLE_GROUPS).map((group) => (
				<div key={group.name} className="mt-6">
					<GroupLabel>{group.name}</GroupLabel>
					<div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{group.fields.map((field) => (
							<ValueField
								key={field.token}
								label={field.label}
								token={field.token}
								value={tokens[field.token] ?? ""}
								onChange={(value) => setStyleToken(field.token, value)}
							/>
						))}
					</div>
				</div>
			))}
		</section>
	);
}

/**
 * One JSON file carries the whole look, so a theme can move between browsers or
 * people without the site storing anything about them.
 */
export function ThemeShare() {
	const { exportTheme, importTheme, resetCustom } = useTheme();
	const [text, setText] = useState("");
	const [notice, setNotice] = useState<string | null>(null);

	const copy = async () => {
		const json = exportTheme();
		setText(json);
		try {
			await navigator.clipboard.writeText(json);
			setNotice("Copied.");
		} catch {
			setNotice("Copy the text above.");
		}
	};

	const apply = () => {
		if (!text.trim()) {
			setNotice("Paste a theme file first.");
			return;
		}
		setNotice(importTheme(text) ?? "Theme applied.");
	};

	const reset = () => {
		if (!window.confirm("Discard your custom palettes and style?")) return;
		resetCustom();
		setText("");
		setNotice("Custom theme cleared.");
	};

	return (
		<section className="nb-panel p-6">
			<h2 className="text-lg font-extrabold tracking-[-0.02em] text-text">
				Share or import
			</h2>
			<p className="mt-1 max-w-[56ch] text-[13px] leading-relaxed text-subtext0">
				One JSON with style, accent and brightness.
			</p>

			<textarea
				value={text}
				onChange={(event) => setText(event.currentTarget.value)}
				placeholder="Paste a theme file here."
				spellCheck={false}
				aria-label="Theme file"
				className="nb-input mt-4 h-40 w-full resize-y font-mono text-[11px] placeholder:text-overlay0"
			/>

			<div className="mt-3 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => {
						void copy();
					}}
					className="nb-button"
				>
					Copy my theme
				</button>
				<button type="button" onClick={apply} className="nb-button">
					Import pasted
				</button>
				<button type="button" onClick={reset} className="nb-button">
					Reset custom
				</button>
			</div>

			{notice ? (
				<p role="status" className="mt-3 text-[12px] text-subtext0">
					{notice}
				</p>
			) : null}
		</section>
	);
}
