import { PageHeader, SectionLabel } from "~/components/layout/page_header";
import { seo } from "~/lib/seo";
import { CONTACT } from "~/lib/site";

export const meta = () =>
	seo({
		title: "Disclosure",
		description:
			"Every post here is written by me. AI helps with the code and interactive visualizations that carry them.",
	});

const MINE = [
	"Every post, drafted and finished by me",
	"My voice, my tangents, my mistakes",
	"No model has been asked to write a line",
];

const BUILD = [
	"Components, layout and styling, drafted with AI",
	"Interactive figures inside posts, drafted with AI",
	"Reviewed, corrected and tested by me",
];

function Split({ label, items }: { label: string; items: string[] }) {
	return (
		<section className="nb-panel p-6">
			<SectionLabel>{label}</SectionLabel>
			<ul className="mt-5 flex flex-col gap-3">
				{items.map((item) => (
					<li
						key={item}
						className="flex gap-3 text-[13px] leading-relaxed text-subtext0"
					>
						<span
							aria-hidden="true"
							className="mt-[0.5em] size-1.5 shrink-0 bg-accent"
						/>
						{item}
					</li>
				))}
			</ul>
		</section>
	);
}

export default function DisclosurePage() {
	return (
		<div>
			<PageHeader
				index="05"
				label="Disclosure"
				title="How this site is made"
				lead="I write every post on this site. AI helps with the code and interactive visualizations."
			/>

			<div className="mt-14 grid gap-6 lg:grid-cols-2">
				<Split label="The words" items={MINE} />
				<Split label="The build" items={BUILD} />
			</div>

			<p className="mt-10 max-w-[62ch] text-sm text-subtext0">
				Questions, or found a mistake? Reach out at{" "}
				<a
					href={`mailto:${CONTACT.email}`}
					className="font-semibold text-text underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
				>
					{CONTACT.email}
				</a>
			</p>
		</div>
	);
}
