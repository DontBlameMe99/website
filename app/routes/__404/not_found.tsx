import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function NotFound({ status = 404 }: { status?: number }) {
	return (
		<div className="nb-line-t pt-4">
			<div className="flex items-baseline justify-between">
				<span className="nb-chip nb-accent uppercase tracking-[0.1em]">
					Error
				</span>
				<span className="text-meta uppercase tracking-[0.12em] tabular-nums">
					{status}
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
					: "Something broke while building this view. Try again, or head back to the index."}
			</p>

			<div className="mt-10 flex flex-wrap gap-3">
				<Link to="/" className="nb-button nb-accent">
					<ArrowLeft className="size-4" />
					Index
				</Link>
				<Link to="/blog" className="nb-button">
					Read the writing
					<ArrowRight className="size-4" />
				</Link>
			</div>
		</div>
	);
}
