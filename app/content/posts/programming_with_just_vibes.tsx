import type { ReactNode } from "react";
import { Link } from "react-router";
import { Callout } from "~/components/post/kit";
import { PostHeading, PostImage, Prose } from "~/components/post/prose";
import {
	ChatCopyPasteFlow,
	InlineAutocomplete,
	McpContextComparison,
	RainbowAde,
} from "~/content/experiences/programming_with_just_vibes";
import type { Section } from "~/lib/post_types";

function Footnote({ n }: { n: number }) {
	return (
		<sup className="text-[10px] font-bold text-accent">
			<a
				className="footnote-anchor"
				id={`fnref-${n}`}
				href={`#fn-${n}`}
				aria-label={`Footnote ${n}`}
			>
				{n}
			</a>
		</sup>
	);
}

const NOTES: ReactNode[] = [
	<>
		Named tab-complete, since this is typically the key you use to accept such a
		suggestion. However, before AI, these were just function names.
	</>,
	<>
		This is how some people work to this day. We are currently in a transition
		period between this and the next point.
	</>,
	<>
		The need for training data is so big that said companies create their own
		training data.
	</>,
	<>
		Not always getting a reward actually makes it more fun for us.{" "}
		<a
			href="https://en.wikipedia.org/wiki/Reinforcement"
			target="_blank"
			rel="noreferrer"
		>
			See here for more details
		</a>
		.
	</>,
	<>
		I know that we are currently not talking about AI models, but harnesses. I
		personally want to tell my story, and my setup (until very recently) wasn't
		really focused on which model exactly I was using. To be fair, I mostly just
		used whichever one was currently free in{" "}
		<a href="https://opencode.ai" target="_blank" rel="noreferrer">
			OpenCode
		</a>
		.
	</>,
	<>
		Of course my{" "}
		<Link
			to="/blog/is_nixos_the_perfect_linux_distribution_for_you"
			prefetch="intent"
		>
			NixOS / Linux
		</Link>{" "}
		brain had to catch up at some point :D
	</>,
	<>
		A package is like a plugin - everybody can easily create their own, with or
		without AI.
	</>,
	<>
		Turns out, when you know what you are doing, using Electron isn't that bad.
		I personally still don't really like it, but bad performance isn't always
		the case.
	</>,
	<>
		A harness is the tool you use to run your AI coding agent. Be it PI,
		OpenCode, Claude Code, Codex, ...
	</>,
	<>
		This is a term which originated{" "}
		<a
			href="https://www.reddit.com/r/ProgrammerHumor/comments/1r7o7sa/openingtherepository/"
			target="_blank"
			rel="noreferrer"
		>
			here
		</a>
		, I personally find it amusing and fitting.
	</>,
	<>A protocol that gives the agent tools instead of instructions.</>,
];

function FootnoteList() {
	return (
		<section aria-label="Footnotes" className="mt-16 nb-line-t pt-6">
			<p className="text-label uppercase tracking-[0.12em] text-overlay1">
				Footnotes
			</p>
			<ol className="mt-3 space-y-2 text-xs text-subtext0">
				{NOTES.map((note, index) => (
					<li key={index} id={`fn-${index + 1}`}>
						{note} <a href={`#fnref-${index + 1}`}>↩</a>
					</li>
				))}
			</ol>
		</section>
	);
}

export const sections: Section[] = [
	{ id: "disclaimer", text: "Disclaimer", level: 2 },
	{ id: "aging-of-this-post", text: "Aging of this post", level: 3 },
	{ id: "personal-stance", text: "Personal stance", level: 3 },
	{ id: "history", text: "History", level: 2 },
	{ id: "chat-copy-paste", text: "Chat Copy & Paste", level: 3 },
	{ id: "inline-auto-complete", text: "Inline Auto-Complete", level: 3 },
	{
		id: "split-view-coding-windows",
		text: "Split-View Coding Windows",
		level: 3,
	},
	{ id: "ade", text: "ADE", level: 3 },
	{
		id: "affordability-and-concerns",
		text: "Affordability and Concerns",
		level: 2,
	},
	{ id: "ethics", text: "Ethics", level: 3 },
	{ id: "codeberg-and-github", text: "Codeberg and GitHub", level: 3 },
	{ id: "pricing", text: "Pricing", level: 3 },
	{ id: "security-and-privacy", text: "Security and Privacy", level: 3 },
	{ id: "code-quality", text: "Code Quality", level: 3 },
	{ id: "my-use-case-and-history", text: "My Use-Case and History", level: 2 },
	{ id: "inline-completion", text: "Inline Completion", level: 3 },
	{ id: "opencode", text: "OpenCode", level: 3 },
	{ id: "pi", text: "PI", level: 3 },
	{ id: "herdr", text: "Herdr", level: 3 },
	{ id: "t3code", text: "T3Code", level: 3 },
	{ id: "contracts", text: "Contracts", level: 3 },
	{ id: "access", text: "Access", level: 3 },
	{ id: "catching-bugs", text: "Catching Bugs", level: 3 },
	{ id: "closing-words", text: "Closing Words", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="disclaimer">
				Disclaimer
			</PostHeading>
			<PostHeading level={3} id="aging-of-this-post">
				Aging of this post
			</PostHeading>
			<p>
				This post will, most likely, age badly. It is mid November of 2026, and
				the tools move faster than I can write posts. Read it as one person's
				setup at one moment, not as a recommendation.
			</p>
			<PostHeading level={3} id="personal-stance">
				Personal stance
			</PostHeading>
			<p>I want to be clear up front.</p>
			<p>I am a software developer who went through multiple phases:</p>
			<ol>
				<li>
					<strong>Denial:</strong> I thought AI could never reach a point where
					it would actually be useful in the software world.
				</li>
				<li>
					<strong>Grief:</strong> I badly wanted it to not be true. My lovely
					craft was being "taken" by a machine - this cannot be true.
				</li>
				<li>
					<strong>Acceptance:</strong> I accepted that this may be the case, but
					didn't think that I would have to adopt.
				</li>
				<li>
					<strong>Joy:</strong> I started to use these tools. They sparked joy.
					It may be a different kind of work, but, oh boy, it can be a lot of
					fun.
				</li>
			</ol>
			<p>
				Therefore, my POV will definitely be biased. I cannot and will not speak
				from a POV of someone who just uses AI to "chat on a casual basis", nor
				someone who follows trends and sees doomsday around the corner.
			</p>
			<p>
				I personally believe that AI is a tool which should be used, and, of
				course, has its ups and downs.
			</p>

			<PostHeading level={2} id="history">
				History
			</PostHeading>
			<p>
				Let's go on a quick history detour. Yes, you may already be familiar
				with AI's history in general, which is why I am focusing on SWE
				specifically.
			</p>
			<PostHeading level={3} id="chat-copy-paste">
				Chat Copy &amp; Paste
			</PostHeading>
			<p>
				In the beginnings, which was 2022 (this somehow feels not long ago, but
				also a long time ago), OpenAI released their first chat model - ChatGPT.
			</p>
			<p>It took the world by storm.</p>
			<p>In this era, "coding with AI" mostly meant the following workflow:</p>
			<ChatCopyPasteFlow />
			<PostHeading level={3} id="inline-auto-complete">
				Inline Auto-Complete
			</PostHeading>
			<p>
				Then, luckily, after some time we got <em>inline auto-complete</em>.
				This fancy word meant that suddenly words would{" "}
				<em>appear inside our editor</em>. This word-suggestion was quicker than
				copy-pasting from the web, and it allowed the AI to get <em>context</em>{" "}
				on the entire file/project, instead of only receiving what you pasted.
			</p>
			<InlineAutocomplete />
			<p>
				This got improved even further, which resulted in being able to
				tab-complete
				<Footnote n={1} /> entire functions at once.
			</p>
			<PostHeading level={3} id="split-view-coding-windows">
				Split-View Coding Windows
			</PostHeading>
			<p>
				After another window of that being the default, we received the
				split-view coding windows. Editor on one side, coding agent on the other
				<Footnote n={2} />.
			</p>
			<p>This would look something like this:</p>
			<PostImage
				src="/posts/programming_with_just_vibes/vscode_agent_sidebar.png"
				avifSrcSet="/posts/programming_with_just_vibes/vscode_agent_sidebar-640.avif 640w, /posts/programming_with_just_vibes/vscode_agent_sidebar-960.avif 960w, /posts/programming_with_just_vibes/vscode_agent_sidebar-1440.avif 1440w"
				alt="Image of a VSCode agent sidebar"
				width={1440}
				height={900}
			/>
			<Callout>
				This personally is funny to me, because VSCode is always known for
				having 20 sidebars open at once, and now there is another one coming in
				the mix.
			</Callout>
			<PostHeading level={3} id="ade">
				ADE
			</PostHeading>
			<p>
				Now for the current internet buzzword of the time: <RainbowAde />.
			</p>
			<p>
				This stands for <em>Agentic Development Environment</em>.
			</p>
			<p>
				This basically is an{" "}
				<a
					href="https://en.wikipedia.org/wiki/Integrated_development_environment"
					target="_blank"
					rel="noreferrer"
				>
					IDE
				</a>
				, which has been optimized for agent work. The definition of this term
				is still pretty lossy. Some people say that e.g. VSCode with the chat
				sidebar already counts as an ADE, for others it starts at something
				being primarily focused on the <em>agent</em>, not the code.
			</p>
			<p>For me, I define it as:</p>
			<blockquote>
				An ADE is an application which allows for frictionless interaction with
				an AI agent, to accomplish work, whilst the AI is the main focus.
			</blockquote>

			<PostHeading level={2} id="affordability-and-concerns">
				Affordability and Concerns
			</PostHeading>
			<p>Now let's get to the part no one wants to talk about.</p>
			<p>How was this made possible?</p>
			<p>What are the risks?</p>
			<PostHeading level={3} id="ethics">
				Ethics
			</PostHeading>
			<p>The ethics of AI code are a field with lots of debate.</p>
			<p>
				Firstly, there is the intellectual property, which has been stolen by
				the companies. Things like public GitHub repositories, books, movies.
				Everything has been stolen, just to train the AI models.
				<Footnote n={3} />
			</p>
			<p>
				Of course, this is morally and ethically wrong. Taking the work of other
				people without their permission, using it to train something which you
				then sell to the same people, is unacceptable.
			</p>
			<p>
				But it has happened already. You can not do anything about this. This is
				the past. Yes, courts may (and hopefully will) decide on whether
				something like that is allowed, but this is not something you can
				influence.
			</p>
			<PostHeading level={3} id="codeberg-and-github">
				Codeberg and GitHub
			</PostHeading>
			<p>
				All of these things may be nice and all, but isn't{" "}
				<a
					href="https://blog.codeberg.org/protecting-our-floss-commons-from-llms.html"
					target="_blank"
					rel="noreferrer"
				>
					Codeberg against the use of AIs in general?
				</a>
			</p>
			<p>
				Yes. That is why I have created{" "}
				<a
					href="https://github.com/DontBlameMeDev"
					target="_blank"
					rel="noreferrer"
				>
					a GitHub account
				</a>
				, even though I despise Microsoft and GitHub.
			</p>
			<p>
				All my "I use AI heavily" work will land there and everything I do by
				hand, or only small amounts of AI usage, will go to{" "}
				<a
					href="https://codeberg.org/DontBlameMe"
					target="_blank"
					rel="noreferrer"
				>
					Codeberg
				</a>
				.
			</p>
			<p>
				So if you want to see my AI psychosis in action, head to GitHub not
				Codeberg.
			</p>
			<PostHeading level={3} id="pricing">
				Pricing
			</PostHeading>
			<p>The pricing is something I do not see many people talking about.</p>
			<p>
				Currently AI models are heavily subsidized. But even then, these prices
				are not affordable for all people across the world. This creates a
				meaningful difference in what someone from e.g. the US can develop,
				compared to someone from Kyrgyzstan.
			</p>
			<p>
				Of course those models cost money to host. I am not here to say the
				models should be hosted for free. Local models keep getting better, and
				hopefully in the future hosting a model yourself on your old GPU is
				quality-wise so good that it meets all your needs.
			</p>
			<PostHeading level={3} id="security-and-privacy">
				Security and Privacy
			</PostHeading>
			<p>
				If you are not living in the US, can you trust a US-based company with
				all your sensitive data?
			</p>
			<p>
				How do you know they do not{" "}
				<a
					href="https://www.2oceansvibe.com/technology/openai-caught-selling-your-chat-secrets-to-meta-and-google/"
					target="_blank"
					rel="noreferrer"
				>
					sell your data to advertisers
				</a>
				?
			</p>
			<p>
				Do you really want such a company to know about your medical records
				etc.?
			</p>
			<p>
				I hear a lot of people bring up the argument of "I have nothing to
				hide", or something along the lines of "at least I get a good response".
			</p>
			<p>
				First of all, using AI as a replacement for a medical professional is a
				terrible choice. Secondly, please read{" "}
				<a
					href="https://en.wikipedia.org/wiki/Nothing_to_hide_argument"
					target="_blank"
					rel="noreferrer"
				>
					this Wikipedia article
				</a>
				.
			</p>
			<PostHeading level={3} id="code-quality">
				Code Quality
			</PostHeading>
			<p>
				The final argument, which was true until very recently, is the code
				quality.
			</p>
			<blockquote>AI will never write decent code</blockquote>
			<p>
				This is an argument I have brought up myself and hear a lot, even today.
			</p>
			<p>
				But I can reassure you that the current best models, and even "mid-tier"
				ones, like as an example <code>DeepSeek V4.1 Flash 1017</code>, write
				code which is on par with most junior to mid-tier developers. Something
				like <code>Opus 5.5</code> I would say is on par with most professional
				devs, if not even better.
			</p>
			<p>
				Yes, this may sound scary, but{" "}
				<em>
					we are entering an era where AI writes better code than humans could
				</em>
				.
			</p>

			<PostHeading level={2} id="my-use-case-and-history">
				My Use-Case and History
			</PostHeading>
			<p>
				Now let's get to the fun part - how the AI is solving real-world
				problems for me right now.
			</p>
			<p>
				For that to actually be understandable for you, I wish to briefly talk
				through my history of using LLMs.
			</p>
			<PostHeading level={3} id="inline-completion">
				Inline Completion
			</PostHeading>
			<p>
				My first contact was, of course, the inline completion. "Back then" it
				seemed useful, but also kind of dumb. Often the AI would make silly
				mistakes, or just not understand what I want to do at all.
			</p>
			<PostHeading level={3} id="opencode">
				OpenCode
			</PostHeading>
			<p>
				This all changed when I first tried out OpenCode, though. Yes, this is
				quite a jump in time (~1-2 years), but this is when it actually began
				being useful.
			</p>
			<p>
				Now the AI wasn't an enhanced tab-completer anymore, but a machine which
				could edit files faster than I ever could.
			</p>
			<p>
				Yes, it made mistakes. I'd say roughly 50% of all edits were either
				partially or completely wrong. But that sparked the joy
				<Footnote n={4} />
			</p>
			<Callout>
				I know that we are currently not talking about AI models, but harnesses.
				I personally want to tell my story, and my setup (until very recently)
				wasn't really focused on which model exactly I was using. To be fair, I
				mostly just used whichever one was currently free in{" "}
				<a
					className="callout-link"
					href="https://opencode.ai"
					target="_blank"
					rel="noreferrer"
				>
					OpenCode
				</a>
				.
				<Footnote n={5} />
			</Callout>
			<PostHeading level={3} id="pi">
				PI
			</PostHeading>
			<p>
				Then after a while, OpenCode just felt "bloated" to me
				<Footnote n={6} />
			</p>
			<p>
				So, I switched to{" "}
				<a href="https://pi.dev" target="_blank" rel="noreferrer">
					PI
				</a>
				. PI basically is a minimal TUI coding agent, and you add everything on
				top you <em>actually need</em>.
			</p>
			<p>
				This resulted in me trying out basically every package
				<Footnote n={7} /> and creating my own (without publishing them to
				others, though).
			</p>
			<p>
				I was living the dream. A coding agent who could do anything I wanted,
				in a way I wanted.
			</p>
			<p>But... what if you want to run multiple coding agents at once?</p>
			<p>That's right, you end up with something like this:</p>
			<PostImage
				src="/posts/programming_with_just_vibes/pi_open_multiple_times.webp"
				avifSrcSet="/posts/programming_with_just_vibes/pi_open_multiple_times-640.avif 640w, /posts/programming_with_just_vibes/pi_open_multiple_times-960.avif 960w, /posts/programming_with_just_vibes/pi_open_multiple_times-1600.avif 1600w"
				alt="PI coding agent being open multiple times at once"
				width={1600}
				height={1046}
			/>
			<PostHeading level={3} id="herdr">
				Herdr
			</PostHeading>
			<p>
				And this was unacceptable. The more I got into the "AI psychosis"
				(letting AI do more and more work, whilst I was just cuck coding
				<Footnote n={10} />
				), the more I got annoyed by all the terminal windows open at once on
				the same screen.
			</p>
			<p>
				And this is where{" "}
				<a href="https://herdr.dev/tui/" target="_blank" rel="noreferrer">
					Herdr
				</a>{" "}
				came into play. It allowed me to simply open as many coding agents as I
				want, leave them running, and come back to finished work.
			</p>
			<p>All whilst:</p>
			<ul>
				<li>Staying running, even when I close the window</li>
				<li>
					Not taking up any more space than a single window would (when it is
					open)
				</li>
			</ul>
			<p>
				But what about parallel work in one repository? For that I have used git
				worktrees for a while. Specifically{" "}
				<a
					href="https://github.com/max-sixty/worktrunk"
					target="_blank"
					rel="noreferrer"
				>
					Worktrunk
				</a>
				, since it makes git worktrees easy to work with (with or without AI).
			</p>
			<p>
				But how do you get AI to create such worktrees? Telling them every time?
			</p>
			<p>
				No, there must be a better way. That's why I created multiple scripts to
				create, manage, and remove those worktrees.
			</p>
			<p>
				This was getting ridiculous, but still something I could justify to
				myself.
			</p>
			<p>
				Well, but now I also want to check on the agents whilst not sitting in
				front of my PC. Luckily, I am already heavily utilizing{" "}
				<a href="https://tailscale.com" target="_blank" rel="noreferrer">
					Tailscale
				</a>
				. There I was, using a terminal client on my phone to SSH into my PC
				over Tailscale, running Herdr and fiddling with a TUI on my phone.
			</p>
			<p>There must be a better way.</p>
			<PostHeading level={3} id="t3code">
				T3Code
			</PostHeading>
			<p>Turns out... there is!</p>
			<p>
				<a href="https://t3.codes" target="_blank" rel="noreferrer">
					T3Code
				</a>{" "}
				is the way.
			</p>
			<p>
				Yes, it isn't a TUI anymore. Yes, it is Electron
				<Footnote n={8} />.
			</p>
			<p>But, oh boy, it flies. And it does everything it needs to and more.</p>
			<p>I can:</p>
			<ul>
				<li>
					Use any harness
					<Footnote n={9} />
				</li>
				<li>
					Use the builtin agent-controlled web browser (so the AI can verify
					changes it made on the real site).
				</li>
				<li>
					Use the builtin agent-controlled Android/iOS emulator (so the AI can
					verify its changes in there as well).
				</li>
				<li>
					Request secrets and hand them in a way where it doesn't end up in the
					AI's context window (which most likely will be sold to advertisers,
					and I would prefer them not to have access to my secrets).
				</li>
				<li>
					Easily start threads across machines using Tailscale, SSH or whatever
					I want.
				</li>
				<li>Control everything from my phone using a fast app.</li>
			</ul>
			<p>... and so much more.</p>
			<PostHeading level={3} id="contracts">
				Contracts
			</PostHeading>
			<p>
				T3Code gave me a place to run agents. How far an agent may go is a
				different layer, and it is not determined by a program.
			</p>
			<p>
				A skill is a text file the agent reads when I say a phrase. That file
				states when the it applies, what it may do without asking, what counts
				as proof, and when to stop and ask. Mine live in my{" "}
				<a
					href="https://codeberg.org/dontblameme/nix_dotfiles/src/branch/main/modules/features/pi/skills"
					target="_blank"
					rel="noreferrer"
				>
					dotfiles
				</a>
				, so they are on every machine. The first ones came from{" "}
				<a
					href="https://github.com/t3dotgg/tstack"
					target="_blank"
					rel="noreferrer"
				>
					TStack
				</a>
				, edited until they matched what I actually want.
			</p>
			<div className="table-wrap">
				<table>
					<thead>
						<tr>
							<th>I say</th>
							<th>What it does</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>full send</code>
							</td>
							<td>Proves, reviews, files, babysits, merges the PR</td>
						</tr>
						<tr>
							<td>
								<code>full stop</code>
							</td>
							<td>The same, and stops with the PR ready for me to merge</td>
						</tr>
						<tr>
							<td>
								<code>babysit</code>
							</td>
							<td>Watches CI and the review bots, fixes the real findings</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				The skill file is a list of permissions. Force-push this branch and no
				other. Run the tests however they need to run. Merge with squash. Stop
				and ask me when you cannot prove the change. That last rule is the one
				that matters, because an agent that guesses looks the same as an agent
				that is right. Until the PR loads.
			</p>
			<PostHeading level={3} id="access">
				Access
			</PostHeading>
			<p>
				My old Anki skill is gone. It drove my flashcards through a handful of
				Python scripts I had wrapped around the collection, and it worked.
			</p>
			<p>
				Then a plugin that speaks MCP
				<Footnote n={11} /> showed up, and the scripts became useless. A skill
				tells the agent how to do a thing. An MCP gives it concrete tools to
				use, which behaves the same every time.
			</p>
			<p>
				That difference is easy to miss until you have it. I run MCP servers for
				my course PDFs, my mail, and my calendar, so "read this PDF of dates and
				put them in my calendar" is not difficult. It is a search, a read, and a
				few writes. The version I would have written by hand is a script that
				breaks the first time a date is formatted differently.
			</p>
			<p>
				PI adds a second reason to like this. MCP servers usually hand every one
				of their tools to the model up front, so the context fills with
				definitions nobody asked for. PI's{" "}
				<a
					href="https://docs.pi.dev/latest/codemode"
					target="_blank"
					rel="noreferrer"
				>
					codemode
				</a>{" "}
				inverts it: the agent sees a short index of what exists, then writes a
				few lines of code to call the tool it needs. Two hundred tools cost{" "}
				<em>nothing</em> until one is called.
			</p>
			<McpContextComparison />
			<p>
				As you can probably see by my writing, this is where the rabbit hole
				currently ends for me. I could now write about things I have learnt and
				maybe want to try out at some point, but these are things I will keep
				secret for now, since I am not sure what I think about them yet.
			</p>
			<PostHeading level={3} id="catching-bugs">
				Catching Bugs
			</PostHeading>
			<blockquote>
				AI code is always insecure, though. And full of bugs.
			</blockquote>
			<p>
				<strong>No</strong>. This is simply not true.
			</p>
			<p>
				About the bug part: Yes, it happens. Really dumb ones. This happens to
				humans too, though. This is what{" "}
				<a
					href="https://wikipedia.org/wiki/Continuous_integration"
					target="_blank"
					rel="noreferrer"
				>
					CI
				</a>{" "}
				and{" "}
				<a
					href="https://en.wikipedia.org/wiki/Unit_testing"
					target="_blank"
					rel="noreferrer"
				>
					unit tests
				</a>{" "}
				are for.
			</p>
			<p>
				If you build a thorough testing, CI/CD and (in case of a mistake making
				it to prod) rollback system, everything will be fine. And you will be a
				lot more productive. I am talking <em>a lot</em>.
			</p>

			<PostHeading level={2} id="closing-words">
				Closing Words
			</PostHeading>
			<p>
				So this is where my AI journey (or psychosis) currently stands. I am
				basically letting AI write most of the code I produce, creating things I
				never would have thought I would be able to create in such a quick
				succession.
			</p>
			<p>
				All of that, of course, costs one thing: the joy of{" "}
				<em>solving hard problems yourself</em>.
			</p>
			<p>
				But is this really a loss if you can build much bigger? Think bigger?
				Produce greater meaning? Also, since everybody can do this now, isn't
				this expected? The norm?
			</p>

			<FootnoteList />
		</Prose>
	);
}
