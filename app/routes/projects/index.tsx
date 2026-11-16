import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "~/components/layout/page_header";
import { CodebergIcon, projectIcon } from "~/components/shared/icons";
import { seo } from "~/lib/seo";
import { PROJECTS } from "~/lib/site";

export const meta = () =>
	seo({
		title: "Projects",
		description:
			"Selvage, Minecraft plugins, Typo, and the rest of what DontBlameMe builds and keeps running.",
	});

const KIND = {
	app: "Application",
	android: "Android app",
	plugin: "Minecraft plugin",
	tool: "CLI tool",
} as const;

export default function ProjectsPage() {
	return (
		<div>
			<PageHeader
				index="03"
				label="Projects"
				title="Projects"
				lead="Things I build and keep running. Everything here is one click away from the code."
			/>

			<ul className="mt-14 grid gap-6 sm:grid-cols-2">
				{PROJECTS.map((project) => {
					const KindIcon = projectIcon(project.kind);

					return (
						<li key={project.name} className="flex min-w-0">
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="nb-panel nb-lift group flex h-full w-full min-w-0 flex-col p-6"
							>
								<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
									<div className="flex min-w-0 items-center gap-3">
										<img
											src={project.icon}
											alt=""
											width={40}
											height={40}
											className="size-10 shrink-0 nb-line nb-fill object-cover"
										/>
										<h2 className="min-w-0 break-words text-2xl font-extrabold leading-tight tracking-[-0.03em] text-text transition-colors group-hover:text-accent">
											{project.name}
										</h2>
									</div>
									<span className="nb-chip ml-auto shrink-0 text-subtext0">
										<KindIcon className="size-3" />
										{KIND[project.kind]}
									</span>
								</div>

								<p className="mt-3 text-[13px] leading-relaxed text-subtext0">
									{project.blurb}
								</p>

								<span className="mt-auto flex items-center justify-between gap-4 nb-line-t pt-3 text-meta">
									<span className="truncate">
										{project.href
											.replace(/^https?:\/\//, "")
											.replace(/\/$/, "")}
									</span>
									<ArrowUpRight className="size-4 shrink-0 text-subtext0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
								</span>
							</a>
						</li>
					);
				})}
			</ul>

			<div className="mt-16 max-w-[60ch] nb-line-t pt-6">
				<p className="text-label text-subtext0">More</p>
				<p className="mt-3 text-sm leading-relaxed text-subtext0">
					Browse{" "}
					<a
						href="https://git.dontblameme.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-accent px-1 font-semibold text-on-accent no-underline transition-colors hover:bg-text hover:text-crust"
					>
						<CodebergIcon className="mr-1 inline-block size-3.5 align-[-0.125em]" />
						my Codeberg profile
					</a>{" "}
					for more projects and source code.
				</p>
			</div>
		</div>
	);
}
