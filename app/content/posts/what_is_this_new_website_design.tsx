import { PostHeading, Prose } from "~/components/post/prose";
import {
	HeroFigure,
	NoteGraphFigure,
	RedirectFigure,
} from "~/content/experiences/what_is_this_new_website_design";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "What is this new website design?",
	date: "2025-10-18",
	summary:
		"Why the site changed shape, why the graph exists, and what the new directory structure is actually for.",
	tags: ["meta", "design", "typst"],
	accent: "mauve",
	words: 1499,
	minutes: 7,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "tldr", text: "TLDR", level: 2 },
	{ id: "why-has-it-changed", text: "Why Has It Changed?", level: 3 },
	{ id: "what-is-different-now", text: "What Is Different Now?", level: 4 },
	{ id: "how-does-it-affect-me", text: "How Does It Affect Me?", level: 3 },
	{ id: "rss", text: "RSS", level: 4 },
	{ id: "old-blogposts", text: "Old Blogposts", level: 4 },
	{ id: "old-blog-links", text: "Old Blog Links", level: 4 },
	{ id: "usability", text: "Usability", level: 4 },
	{ id: "why-the-change", text: "Why the Change?", level: 2 },
	{ id: "obsidian-workflow", text: "Obsidian Workflow", level: 3 },
	{ id: "visuals", text: "Visuals", level: 3 },
	{ id: "what-has-changed", text: "What Has Changed?", level: 2 },
	{ id: "how-does-it-affect-me-2", text: "How Does It Affect Me?", level: 3 },
	{ id: "rss-2", text: "RSS", level: 4 },
	{ id: "old-blogposts-2", text: "Old Blogposts", level: 4 },
	{ id: "old-links", text: "Old Links", level: 4 },
	{
		id: "what-is-the-new-workflow",
		text: "What Is the New Workflow?",
		level: 2,
	},
	{ id: "what-am-i-using-now", text: "What Am I Using Now", level: 3 },
	{ id: "but-why-quartz", text: "But Why Quartz?", level: 4 },
	{ id: "no-downsides-at-all", text: "No Downsides at All?", level: 4 },
	{
		id: "how-exactly-does-the-new-workflow-work",
		text: "How Exactly Does the New Workflow Work",
		level: 3,
	},
	{ id: "but-what-is-this-theme", text: "But What Is This Theme?", level: 3 },
	{ id: "why-is-it-so-amazing", text: "Why Is It So Amazing?", level: 4 },
	{
		id: "which-theme-are-you-using",
		text: "Which Theme Are You Using?",
		level: 4,
	},
	{ id: "did-you-modify-anything", text: "Did You Modify Anything?", level: 3 },
	{ id: "closing-words", text: "Closing Words", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<p>You may have noticed that the website's design has changed a lot.</p>
			<p>
				{"In this post I want to highlight "}
				<strong>what</strong>
				{" and "}
				<strong>why</strong>
				{" has changed."}
			</p>
			<PostHeading level={2} id="tldr">
				TLDR
			</PostHeading>
			<p>
				If you wish a quick summary on what has changed, and how it may affect
				you, this section is for you.
			</p>
			<p>
				Instead, if you want to read in more detail, everything I am saying
				right here is explained in more detail below.
			</p>
			<PostHeading level={3} id="why-has-it-changed">
				Why Has It Changed?
			</PostHeading>
			<p>
				I have changed the website's design because it better fits my style and
				requirements (<strong>for my workflow</strong>).
			</p>
			<PostHeading level={4} id="what-is-different-now">
				What Is Different Now?
			</PostHeading>
			<p>
				The overall design is different, and you can also find a nice graph on
				the side which visualizes connections between notes, just like in my
				note taking system of choice: Obsidian!
			</p>
			<NoteGraphFigure />
			<PostHeading level={3} id="how-does-it-affect-me">
				How Does It Affect Me?
			</PostHeading>
			<PostHeading level={4} id="rss">
				RSS
			</PostHeading>
			<p>
				If you were previously using the RSS-Feed I provided, you may need to
				update your URLs to the ones talked about on the main page.
			</p>
			<p>
				<strong>The old ones no longer function</strong>.
			</p>
			<PostHeading level={4} id="old-blogposts">
				Old Blogposts
			</PostHeading>
			<p>
				I have deleted some of the old blogposts because they simply didn't
				match my quality criteria.
			</p>
			<PostHeading level={4} id="old-blog-links">
				Old Blog Links
			</PostHeading>
			<p>
				The links to the old blogposts (
				<strong>even if they are still present</strong>) no longer function. You
				need to replace them with the new links.
			</p>
			<PostHeading level={4} id="usability">
				Usability
			</PostHeading>
			<p>
				I hope that the new website is really usable (even with the new
				directory-like structure) and that I can provide you with amazing
				blogposts, and maybe even some unrelated files, on this site!
			</p>
			<PostHeading level={2} id="why-the-change">
				Why the Change?
			</PostHeading>
			<p>
				{"The change mainly occurred because of one reason: "}
				<strong>my Obsidian workflow</strong>.
			</p>
			<PostHeading level={3} id="obsidian-workflow">
				Obsidian Workflow
			</PostHeading>
			<p>
				Basically, as I explained in this post, I am now using Obsidian to write
				all of my notes.
			</p>
			<p>
				{
					"But my blog always required me to start up my text editor of choice, "
				}
				<a
					href="https://github.com/neovim/neovim"
					target="_blank"
					rel="noreferrer"
				>
					Neovim
				</a>
				{" (by the way), and write my blog in "}
				<a
					href="https://en.wikipedia.org/wiki/Markdown"
					target="_blank"
					rel="noreferrer"
				>
					Markdown
				</a>
				{" format in the editor."}
			</p>
			<p>
				Yes, I love Markdown, but what I don't love is that I write Markdown in
				Neovim for my blog, and completely separated, Markdown in Obsidian to
				create my personal notes.
			</p>
			<p>
				For me it just feels like those two things should be connected, since I
				do basically all my writing in Obsidian anyways, and I wish to form
				connections between things related and unrelated to my blog.
			</p>
			<blockquote>
				{"Important to remember Connecting both your blog and your personal "}
				<strong>P</strong>ersonal<strong>K</strong>nowledge<strong>M</strong>
				anagement is not always a good choice. Depending on your workflow, it
				may even be a really bad idea. But for me, due to my specific
				requirements, it totally was worth it.
			</blockquote>
			<PostHeading level={3} id="visuals">
				Visuals
			</PostHeading>
			<p>Yes, I need to mention the visuals as well.</p>
			<p>
				{"For me personally, I just love the "}
				<a href="https://catppuccin.com" target="_blank" rel="noreferrer">
					Catppuccin
				</a>
				{" theme (Maybe a little bit too much, I have been using it "}
				<strong>everywhere</strong>).
			</p>
			<p>Using this theme on my website as well, just feels amazing.</p>
			<p>
				Also, I love the "Obsidian-Aesthetic". I don't know why, but having a
				graph in my blog on my website is really cool.
			</p>
			<PostHeading level={2} id="what-has-changed">
				What Has Changed?
			</PostHeading>
			<p>Now to what exactly has changed.</p>
			<p>
				As you are able to see, the entire website has changed a lot
				design-wise.
			</p>
			<HeroFigure />
			<p>
				{
					"It also has changed structurally, now including directories on the left-hand side, and clickable tags (every "
				}
				<code>{"#something"}</code>
				{" is a tag)."}
			</p>
			<p>
				{
					"Also, the performance overall should have improved. The entire site should now be stabler and faster, due to it now being a "
				}
				<a
					href="https://en.wikipedia.org/wiki/Single-page_application"
					target="_blank"
					rel="noreferrer"
				>
					single page application
				</a>
				.
			</p>
			<PostHeading level={3} id="how-does-it-affect-me-2">
				How Does It Affect Me?
			</PostHeading>
			<p>
				{"There are several things which changed "}
				<strong>a lot</strong>, and (hopefully none, or only a few of them)
				affect you.
			</p>
			<PostHeading level={4} id="rss-2">
				RSS
			</PostHeading>
			<p>
				{
					"Due to me now using a completely new site generator and site-layout, if you have been subscribing to the RSS-Feed of this page, "
				}
				<strong>you need to update your links</strong>.
			</p>
			<ul>
				<li>
					{"If you wish to subscribe to the "}
					<code>{"index.xml"}</code>
					{", you may use "}
					<a
						href="https://dontblameme.codeberg.page/index.xml"
						target="_blank"
						rel="noreferrer"
					>
						this URL
					</a>
					.
				</li>
				<li>
					{"And if you wish to subscribe to the "}
					<code>{"sitemap.xml"}</code>
					{" you may use "}
					<a
						href="https://dontblameme.codeberg.page/sitemap.xml"
						target="_blank"
						rel="noreferrer"
					>
						this URL
					</a>
					.
				</li>
			</ul>
			<PostHeading level={4} id="old-blogposts-2">
				Old Blogposts
			</PostHeading>
			<p>
				{"A lot of old blogposts have been "}
				<strong>removed</strong>.
			</p>
			<p>The simple reason is that those were posts which I either</p>
			<ul>
				<li>Created because I simply wanted "to post something".</li>
				<li>
					{"Created with "}
					<strong>massive use of AI</strong>, basically not writing anything
					myself (
					<strong>since about a year ago I have a strict no-AI rule</strong>).
				</li>
				<li>
					Created with no love to the detail, no real insight, or no real reason
					at all.
				</li>
				<li>
					Simply no longer agreed with, or just didn't find worthy to include.
				</li>
			</ul>
			<p>
				{"If you still wish to take a look at them, you can find them "}
				<a
					href="https://codeberg.org/DontBlameMe/pages-old/src/branch/master/posts"
					target="_blank"
					rel="noreferrer"
				>
					in my archived repo
				</a>
				{" (although I can highly recommend against it)."}
			</p>
			<PostHeading level={4} id="old-links">
				Old Links
			</PostHeading>
			<p>
				<strong>Every old link</strong>
				{", be it to a blogpost or maybe a sub-site, "}
				<strong>will likeliest no longer work</strong>.
			</p>
			<p>
				If you have included any page links from my site anywhere, I would love
				if you could please update them to their new format.
			</p>
			<p>
				{"For posts, previously it was something like this: "}
				<code>{"https://dontblameme.codeberg.page/posts/my-blog-post"}</code>,
			</p>
			<p>
				{"Whereas now it's like this: "}
				<code>{"https://dontblameme.codeberg.page/Blog/my-blog-post"}</code>.
			</p>
			<RedirectFigure />
			<p>
				<strong>But please double-check if those links actually work.</strong>
			</p>
			<PostHeading level={2} id="what-is-the-new-workflow">
				What Is the New Workflow?
			</PostHeading>
			<PostHeading level={3} id="what-am-i-using-now">
				What Am I Using Now
			</PostHeading>
			<p>
				{
					"I am now using a new static-site-generator (which can also be found at the bottom of the page): "
				}
				<a
					href="https://github.com/jackyzha0/quartz"
					target="_blank"
					rel="noreferrer"
				>
					Quartz
				</a>
				.
			</p>
			<PostHeading level={4} id="but-why-quartz">
				But Why Quartz?
			</PostHeading>
			<p>
				Yeah the answer is pretty simple. It works in perfect harmony with
				Obsidian.
			</p>
			<p>
				{
					"When creating a new Quartz website, you can specify which Vault-path to use (I am using a subdirectory of my actual Obsidian Vault), and then it "
				}
				<strong>just works</strong>.
			</p>
			<PostHeading level={4} id="no-downsides-at-all">
				No Downsides at All?
			</PostHeading>
			<blockquote>
				{"Disclaimer These issues only affects "}
				<strong>my personal</strong>
				{" use-case, because I am using a "}
				<strong>subdirectory</strong>
				{
					" of my actual Vault. If I would be publishing my entire Vault, this wouldn't be an issue."
				}
			</blockquote>
			<p>##### Attachment? Move It</p>
			<p>
				{
					"If I wish to include an attachment into a blogpost, I actually have to "
				}
				<strong>move the attachment</strong>
				{" into the "}
				<strong>Blogs</strong>
				{" directory I am using to write this."}
			</p>
			<p>
				{"Yes, it makes total sense, since "}
				<strong>Quartz doesn't have access to any other files</strong>
				{
					" in my Vault, but I still wished that it would still be able to include those files without me having to "
				}
				<strong>click two buttons</strong>.
			</p>
			<p>
				<strong>For the interested people:</strong>
				{" This happens because "}
				<strong>
					my attachments directory is in a separate directory than Quartz
				</strong>
				{", "}
				<strong>not</strong>
				{" inside of "}
				<strong>a subdirectory in Quartz</strong>. I did this because I still
				wish to keep those things separate (and I have a lot of personal notes).
			</p>
			<p>##### Not in the Directory? Too Bad</p>
			<p>
				This issue I have directly connects with the attachment issue I just
				mentioned.
			</p>
			<p>
				{"If I mention a page which exists in my "}
				<strong>personal</strong>
				{
					" Vault section, but not in the Blog section, the link shows up as perfectly valid in Obsidian (because in Obsidian it actually is valid)."
				}
			</p>
			<p>But if I take a look at the blog site, it is linking to a 404 page.</p>
			<p>
				{"Yes, this is also because the mentioned page "}
				<strong>does not exist in Quartz</strong>
				{
					", but it is still annoying, because I maybe want to link somewhere to make a "
				}
				<strong>personal Vault connection</strong>.
			</p>
			<p>
				{"I simply wished for the blog to simply "}
				<strong>not include those links</strong>.
			</p>
			<blockquote>
				{
					"Important update I managed to fix this exact issue with the links, by "
				}
				<a
					href="https://quartz.jzhao.xyz/advanced/making-plugins"
					target="_blank"
					rel="noreferrer"
				>
					implementing my own transformer
				</a>
				{
					'! Now every link to a page which exists in Obsidian but not in Quartz will simply be "normal text". This is '
				}
				<strong>exactly</strong>
				{" what I wished for!"}
			</blockquote>
			<PostHeading level={3} id="how-exactly-does-the-new-workflow-work">
				How Exactly Does the New Workflow Work
			</PostHeading>
			<p>Now what did I gain from switching to Quartz?</p>
			<p>
				{"Thanks to the "}
				<a
					href="https://github.com/chhoumann/quickadd"
					target="_blank"
					rel="noreferrer"
				>
					QuickAdd
				</a>
				{" Obsidian plugin I have gained my (almost) dream workflow:"}
			</p>
			<p>
				{"I create and write "}
				<strong>everything</strong>
				{" in Obsidian."}
			</p>
			<p>
				To create a blogpost I simply press one key combination, type in "Blog",
				create and name it, and start writing.
			</p>
			<p>
				{
					"If I wish to live-test how it would be looking on my website, I go into the "
				}
				<strong>Quartz</strong>
				{" directory and simply run "}
				<code>{"nix run .#dev"}</code>
				{" (Thanks, NixOS)."}
			</p>
			<p>
				{"Once I am ready to publish (or update) to my website, I go into the "}
				<strong>Quartz</strong>
				{" directory and simply run "}
				<code>{"nix run .#prod"}</code>
				{" (Thanks, NixOS), which sends it off to "}
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
				<strong>And that is it.</strong>
			</p>
			<p>
				{"The entire building part of the website is handled by a "}
				<a
					href="https://en.wikipedia.org/wiki/CI/CD"
					target="_blank"
					rel="noreferrer"
				>
					CI/CD
				</a>
				{" pipeline hosted on my "}
				<a
					href="https://codeberg.org/DontBlameMe/pages"
					target="_blank"
					rel="noreferrer"
				>
					Codeberg repository
				</a>
				.
			</p>
			<p>
				{"If you wish to see the CI/CD file, you can find it "}
				<a
					href="https://codeberg.org/DontBlameMe/pages/src/branch/v4/.forgejo/workflows/deploy.yml"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				.
			</p>
			<PostHeading level={3} id="but-what-is-this-theme">
				But What Is This Theme?
			</PostHeading>
			<p>
				{"Now you may be wondering: "}
				<strong>Okay, but this is not how Quartz looks out-of-the-box?</strong>
			</p>
			<p>
				{"And you are right. I am using a separate project named "}
				<a
					href="https://github.com/saberzero1/quartz-themes"
					target="_blank"
					rel="noreferrer"
				>
					Quartz-Themes
				</a>
				{" to allow for those amazing themes."}
			</p>
			<PostHeading level={4} id="why-is-it-so-amazing">
				Why Is It So Amazing?
			</PostHeading>
			<p>
				{"It simply is so amazing because "}
				<strong>I can just use my Obsidian theme</strong>.
			</p>
			<p>
				{"And yes, It also is just "}
				<strong>one command</strong>
				{" to adapt my entire website's style to my theme of choice."}
			</p>
			<PostHeading level={4} id="which-theme-are-you-using">
				Which Theme Are You Using?
			</PostHeading>
			<p>
				{"I am currently using the "}
				<strong>AnuPpuccin</strong>
				{" theme. This is the theme I previously used in Obsidian as well."}
			</p>
			<PostHeading level={3} id="did-you-modify-anything">
				Did You Modify Anything?
			</PostHeading>
			<p>
				<strong>Yes!</strong>
			</p>
			<p>I modified quite some CSS (Variables) and configs.</p>
			<p>
				{"First of all, I modified how links and "}
				<strong>highlights like this</strong>
				{" look. Before modifying them, I didn't enjoy the padding of them."}
			</p>
			<p>
				I also did the same to call out blocks, since previously they had close
				to no padding on the left side.
			</p>
			<p>
				{
					"Also, I modified the 404 page to be more my style. You can take a look at it e.g. "
				}
				<a href="https://dontblameme" target="_blank" rel="noreferrer">
					here
				</a>
			</p>
			<p>
				Finally, as mentioned here, I added my own transformer to not show
				non-existing links.
			</p>
			<p>
				{
					"I am pretty sure that this is just the starting point though, since adding custom functionality and custom themes is so easy with "
				}
				<a
					href="https://github.com/jackyzha0/quartz"
					target="_blank"
					rel="noreferrer"
				>
					Quartz
				</a>
				!
			</p>
			<PostHeading level={2} id="closing-words">
				Closing Words
			</PostHeading>
			<p>I just want to say thank you for reading my post.</p>
			<p>
				I love tinkering around, and I especially enjoy it if I can help
				somebody else in the process.
			</p>
			<p>
				If you wish you could let me know what you think about this new design
				on any way of contacting me (linked below)!
			</p>
		</Prose>
	);
}
