import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "~/components/layout/page_header";
import { seo } from "~/lib/seo";
import { PROJECTS } from "~/lib/site";

export const meta = () =>
	seo({
		title: "Projects",
		description:
			"Selvage, Minecraft plugins, and everything else DontBlameMe keeps on Codeberg.",
	});

const KIND = {
	app: "Application",
	plugin: "Minecraft plugin",
	source: "Source",
} as const;

export default function ProjectsPage() {
	return (
		<div>
			<PageHeader
				index="03"
				label="Projects"
				meta={`${PROJECTS.length} entries`}
				title="Projects"
				lead="Things I build and keep running. Source lives on Codeberg; everything here is one click away from the code."
			/>

			<ul className="mt-14 grid gap-6 sm:grid-cols-2">
				{PROJECTS.map((project, index) => (
					<li key={project.name} className="flex">
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="nb-panel nb-lift group flex h-full w-full flex-col p-6"
						>
							<div className="flex items-baseline justify-between">
								<span className="text-label text-subtext0 tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="nb-chip bg-base text-subtext0">
									{KIND[project.kind]}
								</span>
							</div>

							<h2 className="mt-8 text-2xl font-extrabold leading-none tracking-[-0.03em] text-text transition-colors group-hover:text-mauve">
								{project.name}
							</h2>

							<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
								{project.blurb}
							</p>

							<span className="mt-auto flex items-center justify-between gap-4 border-t-2 border-ink pt-3 text-meta">
								<span className="truncate">
									{project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
								</span>
								<ArrowUpRight className="size-4 shrink-0 text-subtext0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mauve" />
							</span>
						</a>
					</li>
				))}
			</ul>

			<div className="mt-16 max-w-[60ch] border-t-2 border-ink pt-6">
				<p className="text-label text-subtext0">More</p>
				<p className="mt-3 text-sm leading-relaxed text-subtext0">
					Browse{" "}
					<a
						href="https://git.dontblameme.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-mauve px-1 font-semibold text-crust no-underline transition-colors hover:bg-text"
					>
						my Codeberg profile
					</a>{" "}
					for more projects and source code.
				</p>
			</div>
		</div>
	);
}
