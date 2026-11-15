import { ArrowUpRight, CodeXml, Package, Terminal, Wrench } from "lucide-react";
import { Tile } from "~/components/wm/tile";
import { seo } from "~/lib/seo";
import { PROJECTS } from "~/lib/site";

export const meta = () =>
	seo({
		title: "Projects",
		description:
			"Selvage, Minecraft plugins, and everything else DontBlameMe keeps on Codeberg.",
	});

const ICONS = { app: Package, plugin: Wrench, source: CodeXml } as const;

export default function ProjectsPage() {
	return (
		<div className="space-y-2">
			<div className="grid gap-2 sm:grid-cols-2">
				{PROJECTS.map((project) => {
					const Icon = ICONS[project.kind];
					return (
						<Tile
							key={project.name}
							title={`~/${project.name.toLowerCase()}`}
							label={project.name}
							accent={`var(--${project.accent})`}
						>
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex h-full flex-col gap-3 p-4 transition-colors hover:bg-surface0/20"
							>
								<div className="flex items-center justify-between">
									<span
										className="grid size-7 place-items-center rounded-[2px] border"
										style={{
											borderColor: `color-mix(in srgb, var(--${project.accent}) 35%, transparent)`,
											background: `color-mix(in srgb, var(--${project.accent}) 12%, transparent)`,
											color: `var(--${project.accent})`,
										}}
									>
										<Icon className="size-3.5" strokeWidth={1.8} />
									</span>
									<ArrowUpRight className="size-4 text-overlay1 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
								</div>
								<p className="text-xs leading-relaxed text-subtext0">
									{project.blurb}
								</p>
								<span className="mt-auto truncate text-[10px] text-overlay0">
									{project.href.replace(/^https?:\/\//, "")}
								</span>
							</a>
						</Tile>
					);
				})}
			</div>

			<Tile title="~/more" label="more on codeberg" accent="var(--blue)">
				<div className="p-4">
					<p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-overlay1">
						<Terminal className="size-3" />
						codeberg
					</p>
					<p className="mt-2 max-w-prose text-xs leading-relaxed text-subtext0">
						Browse{" "}
						<a
							href="https://git.dontblameme.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="text-lavender underline decoration-lavender/40 underline-offset-4 hover:text-mauve"
						>
							my Codeberg profile
						</a>{" "}
						for more projects and source code.
					</p>
				</div>
			</Tile>
		</div>
	);
}
