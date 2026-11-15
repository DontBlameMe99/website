import { CodeBlock } from "~/components/post/code_block";
import { PostHeading, PostImage, Prose } from "~/components/post/prose";
import { NoteSyntaxSwitcher } from "~/content/experiences/replacing_obsidian_with_neovim_and_typst";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Replacing Obsidian with Neovim and Typst",
	date: "2026-07-22",
	summary:
		"Obsidian, Neovim and Typst all solve the same problem differently. A long walk through the toolchain I actually write in now.",
	tags: ["notes"],
	accent: "lavender",
	words: 2906,
	minutes: 13,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "hello-there", text: "Hello There", level: 2 },
	{ id: "my-old-setup", text: "My Old Setup", level: 2 },
	{ id: "obsidian-my-beloved", text: "Obsidian, My Beloved", level: 3 },
	{ id: "own-plugin", text: "Own Plugin", level: 4 },
	{ id: "anki", text: "Anki", level: 3 },
	{ id: "syncthing", text: "Syncthing", level: 3 },
	{ id: "markdown", text: "Markdown", level: 3 },
	{ id: "why-it-broke", text: "Why It Broke", level: 2 },
	{ id: "obsidian", text: "Obsidian", level: 3 },
	{ id: "bad-mobile-ui-ux", text: "Bad Mobile UI/UX", level: 4 },
	{
		id: "plugins-customizations-and-themes",
		text: "Plugins, Customizations, and Themes",
		level: 4,
	},
	{ id: "vim-mode", text: "Vim Mode", level: 4 },
	{ id: "syncthing-2", text: "Syncthing", level: 3 },
	{ id: "markdown-2", text: "Markdown", level: 3 },
	{ id: "inconsistent-syntax", text: "Inconsistent Syntax", level: 4 },
	{ id: "math", text: "Math", level: 4 },
	{ id: "pdf", text: "PDF", level: 4 },
	{ id: "latex", text: "LaTeX?", level: 2 },
	{ id: "complicated", text: "Complicated", level: 3 },
	{ id: "but-it-is-popular", text: "But It Is Popular", level: 3 },
	{ id: "typst", text: "Typst", level: 2 },
	{ id: "new", text: "New", level: 3 },
	{ id: "easy", text: "Easy", level: 3 },
	{ id: "speed", text: "Speed", level: 3 },
	{ id: "simpler-math-syntax", text: "Simpler Math Syntax", level: 3 },
	{ id: "tradeoffs", text: "Tradeoffs", level: 3 },
	{ id: "ecosystem", text: "Ecosystem", level: 4 },
	{ id: "younger-project", text: "Younger Project", level: 4 },
	{ id: "fewer-integrations", text: "Fewer Integrations", level: 4 },
	{ id: "neovim", text: "Neovim", level: 2 },
	{ id: "already-used", text: "Already Used", level: 3 },
	{ id: "unify-setup", text: "Unify Setup", level: 3 },
	{ id: "my-new-setup", text: "My New Setup", level: 2 },
	{ id: "typst-configuration", text: "Typst Configuration", level: 3 },
	{
		id: "a-script-to-create-new-notes",
		text: "A Script to Create New Notes",
		level: 4,
	},
	{
		id: "a-script-to-compile-all-notes",
		text: "A Script to Compile All Notes",
		level: 4,
	},
	{ id: "neovim-configuration", text: "Neovim Configuration", level: 3 },
	{ id: "typst-lsp", text: "Typst LSP", level: 4 },
	{ id: "markview-nvim", text: "Markview-Nvim", level: 4 },
	{ id: "example-pages", text: "Example Pages", level: 3 },
	{ id: "mobile-experience", text: "Mobile Experience", level: 3 },
	{ id: "but-what-about-links", text: "But What About Links?", level: 3 },
	{
		id: "why-not-just-plain-markdown-neovim",
		text: "Why Not Just Plain Markdown + Neovim?",
		level: 3,
	},
	{ id: "conclusion", text: "Conclusion", level: 2 },
	{ id: "tldr", text: "TLDR", level: 3 },
	{
		id: "bonus-what-about-this-blog",
		text: "Bonus: What About This Blog?",
		level: 3,
	},
	{ id: "final-words", text: "Final Words", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="hello-there">
				Hello There
			</PostHeading>
			<p>
				{"Hey, you! Yes, you read that right. I've "}
				<strong>replaced</strong>
				{" my Obsidian setup with Neovim and Typst."}
			</p>
			<p>I opened Obsidian one morning.</p>
			<p>Blank screen.</p>
			<p>No notes.</p>
			<p>I could have spent an afternoon debugging an Electron app.</p>
			<p>
				Instead, I spent a week replacing my entire note-taking workflow with a
				relatively young typesetting system, and I love it.
			</p>
			<p>
				I am a huge fan of Obsidian. I've convinced several people to give it a
				try. I've even created my own plugin and donated money to the Obsidian
				project.
			</p>
			<p>
				So let's start with the good parts: What was my setup and why was it so
				amazing?
			</p>
			<PostHeading level={2} id="my-old-setup">
				My Old Setup
			</PostHeading>
			<blockquote>
				{
					"This is just a short summary, if you want to know it in more detail, check out "
				}
				<a
					href="https://dontblameme.codeberg.page/blog/i-found-a-better-alternative-to-logseq"
					target="_blank"
					rel="noreferrer"
				>
					this
				</a>
				{" blog post."}
			</blockquote>
			<PostHeading level={3} id="obsidian-my-beloved">
				Obsidian, My Beloved
			</PostHeading>
			<p>
				Obsidian, Obsidian, Obsidian. I've been using it for roughly a year.
			</p>
			<p>
				{
					"I've been using it for writing (e.g. the blog posts I wrote in the past), taking notes (trying to link every tiny detail I can find, building a "
				}
				<a
					href="https://en.wikipedia.org/wiki/Zettelkasten"
					target="_blank"
					rel="noreferrer"
				>
					Zettelkasten
				</a>
				{" along the way), flashcards using "}
				<a href="https://apps.ankiweb.net/" target="_blank" rel="noreferrer">
					Anki
				</a>
				{" and at some point even task management."}
			</p>
			<p>
				I would say that whenever I actually try to use something, I quickly
				become a power user. Obsidian was no different. This, of course, made me
				feel amazing - I knew more than anyone else around me.
			</p>
			<PostHeading level={4} id="own-plugin">
				Own Plugin
			</PostHeading>
			<p>
				{
					"This even went as far as creating my own plugin. I created the plugin TickTones (which you may be able to find "
				}
				<a
					href="https://community.obsidian.md/plugins/tick-tones"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				, but I don't know for how long, since I've deleted my GitHub account
				(more on that later)).
			</p>
			<p>
				Developing this plugin was fun and I got to interact with some parts of
				the community - it is a great feeling knowing that somebody actually
				uses the projects you develop 😀
			</p>
			<PostHeading level={3} id="anki">
				Anki
			</PostHeading>
			<p>
				{"Anki was (and "}
				<strong>still is</strong>) my go-to tool for flashcards. It is a core
				part of my learning workflow. In Obsidian, I actually utilized a plugin
				to convert simple Markdown files into Anki flashcards (which, now
				thinking about it with a fresh mind, sounds like a classic
				"_trying-to-get-one-tool-to-do-everything_" situation).
			</p>
			<p>
				This workflow felt amazing - just create a note in Obsidian in a
				specific way, tag it, and your flashcard is ready to be reviewed.
			</p>
			<PostHeading level={3} id="syncthing">
				Syncthing
			</PostHeading>
			<p>
				{
					"Syncing my notes from one device to another was something I had already been doing (thanks to me wanting to sync other things as well). For this, I am using "
				}
				<a href="https://syncthing.net/" target="_blank" rel="noreferrer">
					Syncthing
				</a>
				{
					" - a tool that I've been using for a while now, and I am very happy with it."
				}
			</p>
			<PostHeading level={3} id="markdown">
				Markdown
			</PostHeading>
			<p>
				{
					"Markdown was the format that was used for all my notes in Obsidian. Naturally, just after I switched to Typst, I found out that there actually are plugins available to let "
				}
				<a
					href="https://community.obsidian.md/plugins/typst-book-preview"
					target="_blank"
					rel="noreferrer"
				>
					Obsidian use Typst
				</a>
				, but this is not native and will likely feel a little bit hacky.
			</p>
			<p>
				As far as I knew, Markdown was also really easy to use - just one simple
				way to write your documents (oh, if I knew…).
			</p>
			<PostHeading level={2} id="why-it-broke">
				Why It Broke
			</PostHeading>
			<p>
				Now we get to the interesting part. What could possibly break in my
				setup (except for Obsidian, of course, but that is to be expected)?
			</p>
			<PostHeading level={3} id="obsidian">
				Obsidian
			</PostHeading>
			<p>
				Yeah, I just said it: Obsidian, of course, is the main reason for my
				switch.
			</p>
			<p>
				{"Not being able to use my notes because an "}
				<a
					href={"https://en.wikipedia.org/wiki/Electron_(software_framework"}
					target="_blank"
					rel="noreferrer"
				>
					electron-based
				</a>
				) app (consuming enough memory to noticeably affect my older machine)
				doesn't want to load today is not a great feeling.
			</p>
			<p>But this isn't the only Obsidian-related issue I had.</p>
			<PostHeading level={4} id="bad-mobile-ui-ux">
				Bad Mobile UI/UX
			</PostHeading>
			<PostImage
				src="/posts/replacing_obsidian_with_neovim_and_typst/obsidian_mobile.png"
				alt={
					"Obsidian on a phone: the note above a formatting toolbar and the on-screen keyboard"
				}
			/>
			<p>
				{
					"First of all, the layout of the mobile app does not fit my workflow at all. When I am on my phone, I want to "
				}
				<strong>view</strong>
				{" my notes and "}
				<strong>search</strong>
				{
					" through them, not edit an arbitrary page. I actually don't like writing on my phone. I just want to retrieve knowledge or make minor edits."
				}
			</p>
			<p>
				{
					"Then there is the load time. On my phone, the app can often take roughly "
				}
				<strong>30 seconds</strong>
				{
					" to load. In this time I can install another file browsing app, open a note, do my edits, uninstall it and the app still isn't launched."
				}
			</p>
			<p>
				{"This is so bad that community members made a plugin, just to load "}
				<em>other plugins</em>
				{
					" later, in the hope of making the app load faster. This just felt completely bonkers to me."
				}
			</p>
			<PostHeading level={4} id="plugins-customizations-and-themes">
				Plugins, Customizations, and Themes
			</PostHeading>
			<p>
				As mentioned in the introduction, I am a huge fan of customization. This
				means I spend a lot of time "perfecting" my setup and finding minor
				tweaks or improvements along the way.
			</p>
			<p>
				This, however, started feeling like a big waste of time in Obsidian. But
				I could not stop myself. I've been trying out a new plugin here and
				there, maybe a new theme, custom CSS snippet or anything else.
			</p>
			<p>
				Yes, customization is a good thing (more on that later), but in Obsidian
				it felt useless because I just use it to write notes on my desktop - for
				nothing else.
			</p>
			<PostHeading level={4} id="vim-mode">
				Vim Mode
			</PostHeading>
			<p>
				{"I've been using "}
				<a href="https://neovim.io/" target="_blank" rel="noreferrer">
					Neovim
				</a>
				{" for a long time. My entire muscle memory is based "}
				<strong>on my own custom Neovim bindings</strong>.
			</p>
			<p>
				This results in a problem in Obsidian, since I cannot easily replicate
				that workflow. Yes, vim mode exists, but the bindings are not the ones I
				am used to.
			</p>
			<p>
				{"The only saving grace would be "}
				<a
					href="https://community.obsidian.md/plugins/obsidian-vimrc-support"
					target="_blank"
					rel="noreferrer"
				>
					a plugin which adds vimrc support
				</a>
				{", but since I heavily rely on "}
				<a
					href="https://dontblameme.codeberg.page/blog/is-nixos-the-perfect-linux-distribution-for-you"
					target="_blank"
					rel="noreferrer"
				>
					NixOS
				</a>
				{" and the "}
				<a
					href="https://en.wikipedia.org/wiki/Lua"
					target="_blank"
					rel="noreferrer"
				>
					Lua
				</a>
				{" configuration of Neovim, this does not solve my issue."}
			</p>
			<PostHeading level={3} id="syncthing-2">
				Syncthing
			</PostHeading>
			<p>
				Syncthing, as I mentioned earlier, is an amazing tool. The only problem
				it has is frequent file changes, which happen simultaneously on
				different devices. This is exactly something Obsidian does, which
				results in many conflicts.
			</p>
			<p>
				{"Yes, there are "}
				<em>some</em>
				{" strategies to "}
				<em>reduce</em>
				{
					" the amount of conflicts, such as creating a different profile for each device, but I still get roughly one conflict every single day. This might not seem like a lot, but it's these mild annoyances which, over time, drive you insane."
				}
			</p>
			<PostHeading level={3} id="markdown-2">
				Markdown
			</PostHeading>
			<p>Oh, of course, there also is Markdown.</p>
			<PostHeading level={4} id="inconsistent-syntax">
				Inconsistent Syntax
			</PostHeading>
			<p>
				{"The syntax is just inconsistent. Yes, things like "}
				<code>{"# Headings"}</code>
				{" or "}
				<code>{"*bold*"}</code>
				{
					" text are (most of the time) the same, but this is not the case for the rest."
				}
			</p>
			<p>
				{"Just take a look at Obsidian's Markdown link syntax: "}
				<code>{"[[Links]]"}</code>
				{" with "}
				<code>{"[[Link|Named Links]]"}</code>. This is not "vanilla" Markdown.
				Using this link syntax might work for some editors, but break for
				others.
			</p>
			<NoteSyntaxSwitcher />
			<p>
				Markdown's strength is also its weakness: it is simple and widely
				supported, but different tools often extend it in incompatible ways,
				which is a problem once such software stops being maintained.
			</p>
			<blockquote>
				Markdown was never designed to be a complete document format.
			</blockquote>
			<PostHeading level={4} id="math">
				Math
			</PostHeading>
			<p>
				{"Math syntax? Yeah, Obsidian just embeds "}
				<a
					href="https://en.wikipedia.org/wiki/LaTeX"
					target="_blank"
					rel="noreferrer"
				>
					LaTeX
				</a>
				{" in your notes. You can write it with "}
				<code>{"$...$"}</code>
				{" or "}
				<code>{"$$...$$"}</code>, but the choice of LaTeX just seems arbitrary.
			</p>
			<p>
				If LaTeX is used anyway, why not just write your notes in LaTeX instead
				of Typst? More on that in a bit.
			</p>
			<PostHeading level={4} id="pdf">
				PDF
			</PostHeading>
			<p>
				And then the final boss of Markdown: PDFs. Generating a PDF from a
				Markdown file requires you to use an external tool.
			</p>
			<p>
				It may be a website, a local tool, or anything you can get your hands
				on, but it won't be simple or consistent. The output might look
				different all the time and, unless you write your own generator, will
				never look the same.
			</p>
			<PostHeading level={2} id="latex">
				LaTeX?
			</PostHeading>
			<p>
				{
					"Now, why didn't I choose LaTeX over Typst? LaTeX is the industry standard, used in universities and professional publishing. Just wait - the syntax of Typst is much better and it fits "
				}
				<em>my</em>
				{" workflow."}
			</p>
			<PostHeading level={3} id="complicated">
				Complicated
			</PostHeading>
			<p>This is the main reason why I didn't simply switch to LaTeX.</p>
			<p>
				Did you look at the syntax? I mean, not as somebody who is used to it,
				but as a beginner? LaTeX is incredibly powerful, but its mental model is
				closer to traditional publishing than modern document authoring - for a
				new user, it just is not intuitive and is very complicated.
			</p>
			<p>
				This is a simple document that creates a Hello World page, with a
				centered title:
			</p>
			<CodeBlock
				lang="latex"
				code={`
\\documentclass{article}

\\title{My Centered Title}
\\author{}
\\date{}

\\begin{document}

\\maketitle

Hello, world!

\\end{document}
				`}
			/>
			<p>
				{"Now, explain this for someone who is new. Why do we need a "}
				<code>{"\\documentclass"}</code>? Why "article"? I just want a page? Why
				do I need an author and a date?
			</p>
			<p>
				{"What is this "}
				<code>{"\\begin"}</code>
				{" and "}
				<code>{"\\end"}</code>
				{" syntax? What is a document? Can I write outside of it?"}
			</p>
			<PostHeading level={3} id="but-it-is-popular">
				But It Is Popular
			</PostHeading>
			<p>
				{"LaTeX is in use literally "}
				<em>everywhere</em>. This does not mean that it is good, though. Yes,
				LaTeX has done an amazing job (especially for my CV). But this does not
				mean that we shouldn't opt for something better, if it exists.
			</p>
			<p>
				Popularity alone is not enough reason for me to choose a tool. Why are
				you using Linux if Windows is more popular? Why are you using a
				programming language if JavaScript is more popular (sorry JavaScript
				🙃)?
			</p>
			<PostHeading level={2} id="typst">
				Typst
			</PostHeading>
			<p>Now, finally, let's talk about Typst.</p>
			<PostHeading level={3} id="new">
				New
			</PostHeading>
			<p>It is ✨new and shiny✨.</p>
			<p>
				Typst was designed using decades of experience with TeX and modern
				document tooling.
			</p>
			<p>
				It is also written in 🦀 Rust 🦀!!!… Okay, I'll stop before I get too
				far into the Rust cult.
			</p>
			<PostHeading level={3} id="easy">
				Easy
			</PostHeading>
			<p>Typst is easy to use.</p>
			<p>
				Take a look at the old LaTeX example above and compare it to the Typst
				version:
			</p>
			<CodeBlock
				lang="typ"
				code={`
#align(center)[
  #text(size: 20pt, weight: "bold")[My Centered Title]
]

Hello, world!
				`}
			/>
			<p>It is more readable and has less boilerplate.</p>
			<blockquote>
				Of course, experienced LaTeX users rarely write this boilerplate
				themselves - templates solve much of this problem. My issue is that the
				underlying system still feels harder to understand.
			</blockquote>
			<p>
				I am sure that you can, without actually learning either Typst or any
				programming, understand a large chunk of it.
			</p>
			<p>
				{"You may be hung up on the "}
				<code>{"#align(center)[]"}</code>
				{". Yes, maybe the "}
				<code>{"[BLOCK CONTENT]"}</code>
				{
					" is a bit confusing (it is simply everything that is affected by it), but "
				}
				<code>{"#align(center)"}</code>
				{" should be pretty self-explanatory."}
			</p>
			<p>
				{"As for a "}
				<code>{'#text[size: 20pt, weight: "bold"][My Centered Title]'}</code>,
				this honestly does not need any further explanation.
			</p>
			<p>
				{"And then the text itself - there is no need for a "}
				<code>{"\\begin{document}"}</code>
				{" and "}
				<code>{"\\end{document}"}</code>
				{". It is "}
				<em>just the text you want to write</em>.
			</p>
			<PostHeading level={3} id="speed">
				Speed
			</PostHeading>
			<p>Typst is fast to compile.</p>
			<p>
				{
					"Compared to LaTeX, I would say that it is (according to my experience) at "
				}
				<em>least</em>
				{" ten times as fast to compile."}
			</p>
			<p>
				For live previews, it is even faster - it feels instant. Maybe there are
				a few milliseconds of delay, but compared to LaTeX, it is barely
				noticeable.
			</p>
			<PostHeading level={3} id="simpler-math-syntax">
				Simpler Math Syntax
			</PostHeading>
			<p>Typst math syntax is simpler and more consistent than LaTeX.</p>
			<p>
				Just compare these two examples, the first one is LaTeX, and the second
				one is Typst:
			</p>
			<CodeBlock
				lang="latex"
				code={`
\\[
f(x) = \\frac{\\sum_{i=1}^{n} \\alpha_i x_i^2}{\\sqrt{1 + \\beta^2}} + \\int_0^\\pi \\sin(x)\\,dx
\\]
				`}
			/>
			<CodeBlock
				lang="typ"
				code={`
$
f(x) = (sum_(i=1)^n alpha_i x_i^2) / sqrt(1 + beta^2) + integral_0^pi sin(x) dif x
$
				`}
			/>
			<p>You can instantly see that one is easier to type and understand.</p>
			<p>
				{
					"It is not the characters that matter (even though I prefer fewer `` in my math), it is the "
				}
				<em>representation</em>, which is closer to the visual idea.
			</p>
			<p>
				Also, since Typst is used for the entire document and not just the math
				syntax, the syntax feels in place and not "off" (as it does in a
				Markdown document).
			</p>
			<PostHeading level={3} id="tradeoffs">
				Tradeoffs
			</PostHeading>
			<p>
				I do not want to only glamorize Typst, so here are some things I
				dislike.
			</p>
			<PostHeading level={4} id="ecosystem">
				Ecosystem
			</PostHeading>
			<p>I miss the huge LaTeX ecosystem.</p>
			<p>
				The things which exist in Typst are great, but it is so much smaller
				compared to LaTeX. This also includes templates and other libraries.
			</p>
			<PostHeading level={4} id="younger-project">
				Younger Project
			</PostHeading>
			<p>I accept that Typst may not exist forever.</p>
			<p>
				The project itself is young, which may lead to it being abandoned. I
				personally do not think this is the case, since it is open source and
				has a solid business model, but this is a valid point.
			</p>
			<PostHeading level={4} id="fewer-integrations">
				Fewer Integrations
			</PostHeading>
			<p>
				{"I miss "}
				<em>just works</em>
				{" integrations."}
			</p>
			<p>
				{
					"Typst, since it is so young, has fewer integrations. This is also true for Neovim, where there is only "
				}
				<em>one</em>
				{" mature LSP, which doesn't even support every single feature yet."}
			</p>
			<PostHeading level={2} id="neovim">
				Neovim
			</PostHeading>
			<p>
				Now to my text editor, personal religion and lifestyle choice: Neovim.
			</p>
			<PostHeading level={3} id="already-used">
				Already Used
			</PostHeading>
			<p>
				Neovim is something I already use. I know it is hard to believe, but
				since I already have my PDE already set up and working, it just feels
				strange to not use it…
			</p>
			<blockquote>
				When I've spent so much time setting up my PDE, I want to use it
				everywhere I can.
			</blockquote>
			<PostHeading level={3} id="unify-setup">
				Unify Setup
			</PostHeading>
			<p>
				{"This directly ties into the previous point. I want to "}
				<em>reduce</em>
				{
					" the amount of apps I have to use. This means using one tool for as much as I can do, as long as it is "
				}
				<em>the right tool for the job</em>.
			</p>
			<PostHeading level={2} id="my-new-setup">
				My New Setup
			</PostHeading>
			<p>
				Now let us take a look at my personal setup. Maybe this can inspire you
				to give it a try.
			</p>
			<p>
				What was important for me to realize was that I needed two different
				solutions: One for editing documents and one for rendering documents.
			</p>
			<p>Neovim solves the first. Typst solves the second.</p>
			<PostHeading level={3} id="typst-configuration">
				Typst Configuration
			</PostHeading>
			<p>
				For Typst, I am (obviously) using a nix flake. My Nix flake allows me to
				easily create notes in my required format and compile them into PDFs. My
				Nix flake is generally pretty simple, with a few key exceptions:
			</p>
			<PostHeading level={4} id="a-script-to-create-new-notes">
				A Script to Create New Notes
			</PostHeading>
			<p>I've created a custom script which allows me to create a new note.</p>
			<p>
				{"The main reason is that I always want my notes to be "}
				<code>{"in_this_format.typ"}</code>
				{" and to include some boilerplate content by default."}
			</p>
			<PostHeading level={4} id="a-script-to-compile-all-notes">
				A Script to Compile All Notes
			</PostHeading>
			<p>
				I've also created a custom script which allows me to compile all my
				notes, using a hash-based caching system to only recompile when
				necessary.
			</p>
			<p>
				{"This one exists because when you compile a document using Typst, it "}
				<em>actually compiles it</em>
				{". For my specific setup, I would like it to "}
				<em>only compile</em>
				{" if the content has "}
				<em>actually changed</em>.
			</p>
			<PostHeading level={3} id="neovim-configuration">
				Neovim Configuration
			</PostHeading>
			<p>
				{"Now, for Neovim, I am using my configuration which can be found "}
				<a
					href="https://codeberg.org/DontBlameMe/nix_dotfiles/src/branch/main/modules/features/nvim.nix"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				.
			</p>
			<p>
				{"The most important parts are the "}
				<code>{"Typst"}</code>
				{" LSP and the "}
				<code>{"markview-nvim"}</code>
				{" plugin."}
			</p>
			<PostHeading level={4} id="typst-lsp">
				Typst LSP
			</PostHeading>
			<p>
				{
					"The Typst LSP allows me to have syntax highlighting, in-line errors and "
				}
				<code>{":TypstPreview"}</code>, which is a live preview of my current
				Typst document (using the above mentioned near-instant live preview).
			</p>
			<PostHeading level={4} id="markview-nvim">
				Markview-Nvim
			</PostHeading>
			<p>
				This plugin renders Markdown, Typst, and LaTeX documents in Neovim. This
				means, while I am not in insert mode, my documents look like this:
			</p>
			<PostImage
				src="/posts/replacing_obsidian_with_neovim_and_typst/markview_nvim.png"
				alt={"A Typst document rendered inside Neovim by the Markview plugin"}
			/>
			<PostHeading level={3} id="example-pages">
				Example Pages
			</PostHeading>
			<p>Now let's actually get some examples. How would I style my notes?</p>
			<p>
				Honestly, if you are not very specific about what you want, you can
				simply just use the default styling.
			</p>
			<p>The default styling looks like this:</p>
			<PostImage
				src="/posts/replacing_obsidian_with_neovim_and_typst/typst_default_style.png"
				alt={"Typst default styling: plain serif page with wide margins"}
			/>
			<p>
				… which is actually fine for an academic document, but I prefer
				something more like this:
			</p>
			<PostImage
				src="/posts/replacing_obsidian_with_neovim_and_typst/typst_styled_example.png"
				alt={
					"The same page with my Catppuccin theme, larger type and tighter spacing"
				}
			/>
			<p>
				… which uses my Catppuccin theme, a larger font size, my preferred font
				and a readable spacing.
			</p>
			<p>
				{"For the unstyled example, you don't need to style "}
				<em>anything</em>
				{", this is how it looks "}
				<em>out of the box</em>.
			</p>
			<p>Let's take a look at a simple example:</p>
			<CodeBlock
				lang="typ"
				code={`
// Styles all headings
// \`#show\` to specify styling
// \`heading\` to specify styling for headings
#show heading: it => {
  // Creates a box filled with an accent color
  box(fill: accent)[
    // Inserts the actual text of the heading
    #it.body
  ]
}
				`}
			/>
			<p>
				This is the part I like about Typst: customization feels like
				programming rather than fighting a template system.
			</p>
			<p>
				For my style, I've customized more things. If you are interested, reach
				out to me and I can share the styling.
			</p>
			<PostHeading level={3} id="mobile-experience">
				Mobile Experience
			</PostHeading>
			<p>
				And the mobile experience is actually good. Yes, I am not using Neovim
				on my phone, but having a tool which just searches files and allows
				simple editing is just so much snappier than Obsidian.
			</p>
			<p>
				{"To be exact, I am using "}
				<a
					href="https://apt.izzysoft.de/fdroid/index/apk/com.raival.compose.file.explorer"
					target="_blank"
					rel="noreferrer"
				>
					this F-Droid app
				</a>
				, but I am not tied to it. My criteria for my app were the following:
			</p>
			<ul>
				<li>Allows me to set up a default directory to open</li>
				<li>
					{"Allows me to search for "}
					<strong>and inside of</strong>
					{" files"}
				</li>
				<li>Allows me to open files</li>
				<li>Allows me to make very simple, plain-text-based edits</li>
			</ul>
			<p>
				{
					"And actually, it was pretty hard finding an app which does that. Most of the ✨PKM productivity✨ mobile apps either do not allow me to set up my own directory, or require me to use their specific format. This is why, in the end, I went with a general "
				}
				<em>file manager</em>.
			</p>
			<PostHeading level={3} id="but-what-about-links">
				But What About Links?
			</PostHeading>
			<p>
				{"In Obsidian, you can link to a note by using "}
				<code>{"[[Link]]"}</code>.
			</p>
			<p>
				{"This is something I heavily utilized to create my own "}
				<a
					href="https://en.wikipedia.org/wiki/Zettelkasten"
					target="_blank"
					rel="noreferrer"
				>
					Zettelkasten
				</a>
				.
			</p>
			<p>
				Now, I personally no longer require direct links. I just take notes when
				I want to remember something, or reflect on a topic.
			</p>
			<p>
				{
					"For discoverability, I rely on my words, used in a way that will allow me to later find them when using "
				}
				<a
					href="https://github.com/BurntSushi/ripgrep"
					target="_blank"
					rel="noreferrer"
				>
					ripgrep
				</a>
			</p>
			<ul>
				<li>or any other search tool I might use.</li>
			</ul>
			<p>
				{"I no longer rely on any backlinks "}
				<em>between</em>
				{" my notes. At most, I use links to external sources."}
			</p>
			<p>
				{"I use a "}
				<a
					href="https://typst.app/docs/reference/model/bibliography"
					target="_blank"
					rel="noreferrer"
				>
					Bibliography
				</a>
				{
					" to link to things such as books and websites, which is actually a nice habit to build when getting into academic work in the future."
				}
			</p>
			<PostHeading level={3} id="why-not-just-plain-markdown-neovim">
				Why Not Just Plain Markdown + Neovim?
			</PostHeading>
			<p>
				You might wonder why I didn't simply move my Markdown files into Neovim.
				The answer is that Neovim solves the editing problem, but not the
				document problem. I wanted a format that could naturally handle notes,
				math, and polished PDFs without additional conversion steps.
			</p>
			<PostHeading level={2} id="conclusion">
				Conclusion
			</PostHeading>
			<p>Now let's come to a conclusion.</p>
			<PostHeading level={3} id="tldr">
				TLDR
			</PostHeading>
			<blockquote>
				Obsidian is optimized for managing knowledge. I realized that what I
				actually needed was a reliable environment for creating knowledge.
			</blockquote>
			<p>A week ago I thought I was just fixing a broken note-taking app.</p>
			<p>Instead, I ended up replacing my entire writing workflow.</p>
			<p>I expected compromises.</p>
			<p>Instead, I found that my workflow became simpler:</p>
			<ul>
				<li>One editor</li>
				<li>One document format</li>
				<li>Faster mobile access</li>
				<li>Easier PDF generation</li>
			</ul>
			<p>
				But, of course, there are some things I will probably miss from
				Obsidian:
			</p>
			<ul>
				<li>A beautiful UI without any tinkering</li>
				<li>Easy plugin installation and usage</li>
				<li>Built-in backlinks</li>
			</ul>
			<p>
				{
					"But, of course, I would not recommend this setup for everyone. This setup works for me because I live in Neovim and want to rely on this specific workflow. Always try to find your own setup and workflow, and "
				}
				<a
					href="https://dontblameme.codeberg.page/blog/the-perfect-productivity-system"
					target="_blank"
					rel="noreferrer"
				>
					stop chasing the perfect setup
				</a>
			</p>
			<ul>
				<li>it does not exist.</li>
			</ul>
			<PostHeading level={3} id="bonus-what-about-this-blog">
				Bonus: What About This Blog?
			</PostHeading>
			<p>
				{
					"This blog is still written in Markdown, as it was before I switched to Typst. However, it is no longer written in "
				}
				<em>Obsidian</em>, but pure Markdown inside of Neovim:
			</p>
			<PostImage
				src="/posts/replacing_obsidian_with_neovim_and_typst/image_of_me_writing.png"
				alt={
					"This blog written in Markdown inside Neovim, with the file tree and a terminal below"
				}
			/>
			<PostHeading level={2} id="final-words">
				Final Words
			</PostHeading>
			<p>I hope that you enjoyed this blog post.</p>
			<p>
				If you have any questions or comments, feel free to reach out to me via
				email or Matrix (or Mastodon if you prefer) - I love to hear from you!
				All those links can be found below (in the footer).
			</p>
		</Prose>
	);
}
