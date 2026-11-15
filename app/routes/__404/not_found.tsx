import { ArrowLeft, Ghost, Terminal } from "lucide-react";
import { Link } from "react-router";
import { Tile } from "~/components/wm/tile";

export function NotFound({ status = 404 }: { status?: number }) {
	return (
		<Tile
			title="~/404"
			label={`error ${status} — not found`}
			accent="var(--red)"
			aside="exit 1"
		>
			<div className="grid place-items-center px-6 py-14 text-center">
				<Ghost className="size-10 text-mauve" strokeWidth={1.4} />
				<p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-overlay1">
					no such file or directory
				</p>
				<h1 className="mt-2 text-fluid-3xl text-text">
					{status === 404 ? "this tile is empty" : "something broke"}
				</h1>
				<p className="mt-2 max-w-sm text-xs leading-relaxed text-subtext0">
					{status === 404
						? "The pane you asked for is not on this workspace. It may have been moved, renamed, or never existed."
						: "The page failed while rendering. Try again, or head back to the desktop."}
				</p>
				<div className="mt-5 flex flex-wrap items-center justify-center gap-2">
					<Link
						to="/"
						className="inline-flex items-center gap-2 rounded-[2px] border border-mauve/60 bg-mauve/15 px-3 py-1.5 text-xs font-semibold text-mauve transition-colors hover:bg-mauve/25"
					>
						<ArrowLeft className="size-3.5" />
						back to workspace 1
					</Link>
					<Link
						to="/blog"
						className="inline-flex items-center gap-2 rounded-[2px] border border-border px-3 py-1.5 text-xs text-subtext1 transition-colors hover:border-teal/50 hover:text-teal"
					>
						<Terminal className="size-3.5" />
						read something instead
					</Link>
				</div>
			</div>
		</Tile>
	);
}
