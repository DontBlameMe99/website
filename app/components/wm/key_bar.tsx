import { Link, useNavigate } from "react-router";
import { randomSlug } from "~/lib/posts";
import { SOCIALS } from "~/lib/site";

function Hint({ keys, action }: { keys: string; action: string }) {
	return (
		<span className="flex items-center gap-1.5 whitespace-nowrap">
			<kbd className="rounded-[2px] border border-border bg-surface0 px-1 py-px text-[10px] text-subtext1">
				{keys}
			</kbd>
			<span className="hidden text-[10px] text-overlay1 sm:inline">
				{action}
			</span>
		</span>
	);
}

/** The bottom bar: real keybindings, not decoration. */
export function KeyBar() {
	const navigate = useNavigate();
	const codeberg = SOCIALS[0];

	return (
		<footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-mantle">
			<div className="mx-auto flex h-7 max-w-[1800px] items-center gap-3 px-2">
				<div className="flex items-center gap-2 overflow-hidden">
					<span className="hidden items-center gap-1.5 sm:flex">
						<span className="size-1.5 rounded-full bg-mauve" />
						<span className="text-[10px] uppercase tracking-[0.12em] text-overlay1">
							normal
						</span>
					</span>
					<span
						aria-hidden="true"
						className="hidden h-3 w-px bg-border sm:block"
					/>
					<Hint keys="alt 1-4" action="workspace" />
					<Hint keys="alt t" action="theme" />
					<Hint keys="alt r" action="random post" />
				</div>

				<div className="ml-auto flex items-center gap-3 text-[10px] text-overlay1">
					<Link
						to="/blog"
						className="hidden transition-colors hover:text-mauve sm:inline"
					>
						blog
					</Link>
					<a
						href={codeberg?.href}
						target="_blank"
						rel="noopener noreferrer"
						className="hidden transition-colors hover:text-mauve sm:inline"
					>
						codeberg
					</a>
					<button
						type="button"
						onClick={() => navigate(`/blog/${randomSlug()}`)}
						className="transition-colors hover:text-mauve"
					>
						random
					</button>
					<span className="hidden text-overlay0 md:inline">
						catppuccin mocha
					</span>
					<span className="text-text">malva</span>
				</div>
			</div>
		</footer>
	);
}
