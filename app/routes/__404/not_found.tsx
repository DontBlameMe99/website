import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function NotFound({ status = 404 }: { status?: number }) {
	return (
		<div className="nb-line-t pt-4 page-window">
			<div className="flex items-baseline justify-between">
				<span className="nb-chip nb-accent uppercase tracking-[0.1em]">
					Error
				</span>
				<span className="flex items-center gap-3">
					<span className="text-meta uppercase tracking-[0.12em] tabular-nums">
						{status}
					</span>
					<span className="win-controls" aria-hidden="true">
						<span />
						<span />
						<span />
					</span>
				</span>
			</div>

			<h1 className="mt-12 text-page-title text-text">
				{status === 404
					? "Nothing at this address."
					: "The page failed to render."}
			</h1>

			<p className="mt-6 max-w-[52ch] text-lead">
				{status === 404
					? "The page you asked for was moved, renamed, or never existed. The writing index is a good place to land."
					: "Something broke while building this view. Start from the index."}
			</p>

			<div className="mt-10 flex flex-wrap gap-3">
				<Link to="/" prefetch="intent" className="nb-button nb-accent">
					<ArrowLeft className="icon-nudge-left size-4" />
					Home
				</Link>
				<Link to="/blog" prefetch="intent" className="nb-button">
					Writing index
					<ArrowRight className="icon-nudge size-4" />
				</Link>
			</div>
		</div>
	);
}
