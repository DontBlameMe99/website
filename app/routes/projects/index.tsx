import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { PageHeader } from "~/components/layout/page_header";
import {
	CodebergIcon,
	GitHubIcon,
	projectIcon,
} from "~/components/shared/icons";
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
	noctalia: "Noctalia plugin",
} as const;

type Project = (typeof PROJECTS)[number];

/** Keeps the pointer position in percent, so a style can paint a sheen under it. */
function useSpotlight() {
	const frame = useRef(0);

	useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
		const element = event.currentTarget;
		const { clientX, clientY } = event;
		if (frame.current) return;
		frame.current = requestAnimationFrame(() => {
			frame.current = 0;
			const rect = element.getBoundingClientRect();
			element.style.setProperty(
				"--spot-x",
				`${((clientX - rect.left) / rect.width) * 100}%`,
			);
			element.style.setProperty(
				"--spot-y",
				`${((clientY - rect.top) / rect.height) * 100}%`,
			);
		});
	};

	return { onPointerMove };
}

function ProjectCard({ project }: { project: Project }) {
	const KindIcon = projectIcon(project.kind);
	const spotlight = useSpotlight();

	return (
		<li className="flex min-w-0">
			<a
				{...spotlight}
				href={project.href}
				target="_blank"
				rel="noopener noreferrer"
				className="nb-panel nb-lift nb-spot group flex h-full w-full min-w-0 flex-col p-6"
			>
				<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
					<div className="flex min-w-0 items-center gap-3">
						<span className="block size-10 shrink-0 overflow-hidden nb-line nb-fill">
							<img
								src={project.icon}
								alt=""
								width={40}
								height={40}
								className="size-full object-cover transition-transform duration-[var(--motion-base)] ease-out group-hover:scale-[1.06]"
							/>
						</span>
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
					<span className="min-w-0 break-all sm:truncate">
						{project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
					</span>
					<ArrowUpRight className="icon-nudge-up size-4 shrink-0 text-subtext0 group-hover:text-accent" />
				</span>
			</a>
		</li>
	);
}

export default function ProjectsPage() {
	return (
		<div>
			<PageHeader
				index="03"
				label="Projects"
				title="Projects"
				lead={
					<>
						Things I build. Everything is Open Source. Browse my{" "}
						<a
							href="https://git.dontblameme.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-accent px-1 font-semibold text-on-accent no-underline transition-colors hover:bg-text hover:text-crust"
						>
							<CodebergIcon className="icon-tilt mr-1 inline-block size-3.5 align-[-0.125em]" />
							Codeberg
						</a>{" "}
						or{" "}
						<a
							href="https://github.dontblameme.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-accent px-1 font-semibold text-on-accent no-underline transition-colors hover:bg-text hover:text-crust"
						>
							<GitHubIcon className="icon-tilt mr-1 inline-block size-3.5 align-[-0.125em]" />
							GitHub
						</a>{" "}
						profile for more projects.
					</>
				}
			/>

			<ul className="mt-14 grid gap-6 sm:grid-cols-2">
				{PROJECTS.map((project) => (
					<ProjectCard key={project.name} project={project} />
				))}
			</ul>
		</div>
	);
}
