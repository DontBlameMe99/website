import { CopyStateIcon, useCopy } from "~/components/ui/copy_state";

type Kind = "plain" | "comment" | "string" | "keyword" | "number" | "command";

type Spec = {
	label: string;
	pattern: RegExp;
	kinds: Kind[];
};

const LANGUAGE_ALIASES: Record<string, string> = {
	typ: "typst",
	sh: "shell",
	bash: "shell",
};

const LANGUAGES: Record<string, Spec> = {
	nix: {
		label: "nix",
		pattern:
			/(#[^\n]*)|("(?:\\.|[^"\\])*")|(\b(?:let|in|with|rec|inherit|if|then|else|assert|import)\b)|(\b\d+(?:\.\d+)?\b)/g,
		kinds: ["comment", "string", "keyword", "number"],
	},
	latex: {
		label: "latex",
		pattern: /(%[^\n]*)|(\\[a-zA-Z@]+\*?)|(\b\d+(?:\.\d+)?\b)/g,
		kinds: ["comment", "command", "number"],
	},
	typst: {
		label: "typst",
		pattern:
			/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(\b(?:let|set|show|if|else|for|in|import|include|context|none|auto)\b)|(\b\d+(?:\.\d+)?(?:pt|em|%|cm|mm)?\b)/g,
		kinds: ["comment", "string", "keyword", "number"],
	},
	shell: {
		label: "shell",
		pattern:
			/(#[^\n]*)|("(?:\\.|[^"\\])*"|'[^']*')|(\b(?:if|then|else|fi|for|in|do|done|case|esac|function)\b)|(\b\d+\b)/g,
		kinds: ["comment", "string", "keyword", "number"],
	},
};

/** Splits code into colored spans. Unknown languages render as plain text. */
function tokenize(code: string, spec: Spec): { text: string; kind: Kind }[] {
	spec.pattern.lastIndex = 0;
	const tokens: { text: string; kind: Kind }[] = [];
	let last = 0;
	for (const match of code.matchAll(spec.pattern)) {
		const index = match.index ?? 0;
		const group = match.slice(1).findIndex((value) => value !== undefined);
		if (index > last) {
			tokens.push({ text: code.slice(last, index), kind: "plain" });
		}
		// Group order in each pattern must match its `kinds` list.
		tokens.push({ text: match[0], kind: spec.kinds[group] ?? "plain" });
		last = index + match[0].length;
	}
	if (last < code.length) {
		tokens.push({ text: code.slice(last), kind: "plain" });
	}
	return tokens;
}

/**
 * A code block with a language tab and a copy button. Long lines stay reachable
 * from the keyboard because the `pre` itself scrolls.
 */
export function CodeBlock({ lang, code }: { lang: string; code: string }) {
	const key = LANGUAGE_ALIASES[lang] ?? lang;
	const spec = LANGUAGES[key];
	const body = code.replace(/^\n/, "").replace(/\n\s*$/, "");
	const { copied, copy } = useCopy();

	return (
		<div className="code-block not-prose">
			<div className="code-block__bar">
				<span>{spec?.label ?? lang}</span>
				<button
					type="button"
					className="code-block__copy inline-flex items-center gap-1"
					data-copied={copied ? "" : undefined}
					onClick={() => copy(body)}
				>
					<CopyStateIcon copied={copied} />
					{copied ? "Copied" : "Copy"}
				</button>
				<span role="status" className="sr-only">
					{copied ? "Code copied to the clipboard" : ""}
				</span>
			</div>
			{/* biome-ignore lint/a11y/noNoninteractiveTabindex: long lines scroll */}
			<pre tabIndex={0}>
				<code>
					{spec
						? tokenize(body, spec).map((token, index) =>
								token.kind === "plain" ? (
									token.text
								) : (
									<span key={index} className={`tok-${token.kind}`}>
										{token.text}
									</span>
								),
							)
						: body}
				</code>
			</pre>
		</div>
	);
}
