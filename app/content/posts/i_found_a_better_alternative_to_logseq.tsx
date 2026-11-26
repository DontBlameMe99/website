import type { Section } from "~/lib/post_types";
import { Callout } from "~/components/post/kit";
import { PostHeading, PostImage, Prose } from "~/components/post/prose";

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="logseq-a-brief-recap">
				Logseq - a Brief Recap
			</PostHeading>
			<p>
				{"So you might be unaware of what "}
				<a href="https://logseq.com/" target="_blank" rel="noreferrer">
					Logseq
				</a>
				{" is. Logseq is basically a "}
				<a
					href="https://en.wikipedia.org/wiki/Personal_knowledge_management"
					target="_blank"
					rel="noreferrer"
				>
					PKM
				</a>
				{
					" application. This means that you can write everything you think of in there and know how to search for it. This allows your brain to "
				}
				<strong>no longer have to think of it</strong>
				{
					". This basically increases your peace of mind, while also ensuring that you are never going to forget "
				}
				<strong>anything</strong>.
			</p>
			<PostHeading level={2} id="problems-of-logseq">
				Problems of Logseq
			</PostHeading>
			<p>
				The problems of Logseq took awhile to surface for me, but when they did,
				they were really bothering me.
			</p>
			<PostHeading level={3} id="1-slow-performance">
				1: Slow Performance
			</PostHeading>
			<p>
				Logseq got really slow, really fast for me. I had been using Logseq for
				somewhere around two months when it started to get really slow. What do
				I mean by that? Searching took ~3 seconds and opening notes took around
				a second as well. Starting Logseq maybe took around 5-10 seconds,
				depending on the day. This might not seem that bad, but when you quickly
				want to write something down, this becomes annoying really fast.
			</p>
			<PostHeading level={3} id="2-bad-latex-support">
				{"2: Bad "}
				<a
					href="https://en.wikipedia.org/wiki/LaTeX"
					target="_blank"
					rel="noreferrer"
				>
					LaTeX
				</a>
				{" Support"}
			</PostHeading>
			<p>
				I don't want Logseq to look bad. The support for LaTeX was fine, but
				compared to another alternative (which I will explain in a short time),
				it just seems like it misses a lot. You can write LaTeX, but there are
				no automatic completions and you have to write every character yourself.
			</p>
			<PostHeading level={3} id="3-syncing-conflicts">
				3: Syncing Conflicts
			</PostHeading>
			<p>
				{
					'Now, this is a "me personally" issue. I am syncing all my notes across multiple devices using '
				}
				<a href="https://syncthing.net/" target="_blank" rel="noreferrer">
					Syncthing
				</a>
				{
					". When Syncthing has a problem syncing files (because there might be two different files on each device), it creates a "
				}
				<code>{"sync-conflict"}</code>
				{" file. This happened "}
				<strong>a lot</strong>
				{
					" to me while using Logseq. Yes, I could just use another sync provider, but I want everything to remain fully local."
				}
			</p>
			<PostHeading level={3} id="4-bad-links">
				4: Bad Links
			</PostHeading>
			<p>
				{"Logseq uses the "}
				<a
					href="https://en.wikipedia.org/wiki/Markdown"
					target="_blank"
					rel="noreferrer"
				>
					Markdown
				</a>
				{
					" format for its files. But when using links between files, for whatever reason, Logseq starts using some kind of weird links. Normally, a Markdown link should look like this: "
				}
				<code>{"[[FileName]]"}</code>
				{" or, if it should have a custom name, it would look like this: "}
				<code>{"[[FileName|DisplayName]]"}</code>
				{" or "}
				<code>{"[DisplayName](FileName)"}</code>.
			</p>
			<Callout kind="info" title="Update">
				I have noticed on a friend's PC that Logseq now apparently also uses
				"normal" links? So I am not sure if they: A) Changed this behavior or B)
				It just was a me-problem but anyways, this seems to no longer be an
				issue now.
			</Callout>
			<p>But for whatever reason, Logseq uses a format along the lines of:</p>
			<p>
				<code>{"[MyFile|1f02da65-77b8-6821-86b8-562aef941e89]"}</code>
			</p>
			<Callout kind="note" title="Disclaimer">
				I am unaware of the exact format it used. This is what I think it looked
				like.
			</Callout>
			<PostHeading level={3} id="5-plugins">
				5: Plugins
			</PostHeading>
			<p>
				{
					"Logseq does not have a large number of plugins (at the time of writing, Logseq has "
				}
				<strong>374</strong>
				{
					" plugins). But compared to the alternative I am going to tell you about, this is a small amount. Personally, I often had the problem that I wanted to achieve task X, but there was no plugin available to achieve this. This changed with the alternative (even though I had this problem there as well, "
				}
				<a
					href="https://github.com/DontBlameMe99/Tick-Tones"
					target="_blank"
					rel="noreferrer"
				>
					but I was able to create my own solution for the problem
				</a>
				{" 🙂)."}
			</p>
			<PostHeading level={2} id="the-solution">
				The Solution
			</PostHeading>
			<p>
				{"The solution is another PKM with the name "}
				<a href="https://obsidian.md/" target="_blank" rel="noreferrer">
					"Obsidian"
				</a>
				{". It is sadly not "}
				<a
					href="https://en.wikipedia.org/wiki/Open-source_software"
					target="_blank"
					rel="noreferrer"
				>
					OSS
				</a>
				{
					", but it is local-first and privacy-respecting. Obsidian is basically available "
				}
				<strong>for free</strong>{" "}
				<a href="https://obsidian.md/download" target="_blank" rel="noreferrer">
					everywhere
				</a>
				{
					". The only paid thing there is, is their paid syncing service. But because I am using "
				}
				<a href="https://syncthing.net" target="_blank" rel="noreferrer">
					Syncthing
				</a>
				, I did not care about this offer.
			</p>
			<p>Addressing the problems:</p>
			<PostHeading level={3} id="1-slow-performance-2">
				1: Slow Performance
			</PostHeading>
			<p>
				{
					"The performance of Obsidian is way better compared to Logseq. From my subjective experience, I can say that searching for files (thanks to "
				}
				<a
					href="https://github.com/scambier/obsidian-omnisearch"
					target="_blank"
					rel="noreferrer"
				>
					Omnisearch
				</a>
				{
					") is snappy, opening them doesn't take ages, and launching Obsidian is also pretty fast. The only "
				}
				<strong>major disadvantage</strong>
				{
					" I have found is that Obsidian is really slow on mobile. But this is a known issue, and I hope for it to be fixed in the future."
				}
			</p>
			<p>
				{"Just to be clear, Obsidian Mobile takes around 6-8 "}
				<strong>seconds</strong>
				{" for me to load."}
			</p>
			<p>
				{
					"Not closing it (and letting Android do the work) reduces it to split seconds, though. But compared to Logseq, it is not that bad; Logseq had around 5 "
				}
				<strong>seconds</strong>
				{
					" as well. And on Desktop, Logseq took ages, and Obsidian starts within two seconds."
				}
			</p>
			<PostHeading level={3} id="2-bad-latex-support-2">
				{"2: Bad "}
				<a
					href="https://en.wikipedia.org/wiki/LaTeX"
					target="_blank"
					rel="noreferrer"
				>
					LaTeX
				</a>
				{" Support"}
			</PostHeading>
			<p>
				{
					"Obsidian natively has pretty okay LaTeX support (similar to Logseq). But when you install an awesome community plugin, it is simply the best. The plugin I am talking about is, of course, "
				}
				<a
					href="https://github.com/artisticat1/obsidian-latex-suite"
					target="_blank"
					rel="noreferrer"
				>
					LaTeX Suite
				</a>
				. Why is the plugin so awesome? Simple. Because it includes:
			</p>
			<ul>
				<li>A live rendered preview of what you are doing.</li>
				<li>
					{"Awesome autocompletes (e.g., typing "}
					<code>{"vec"}</code>
					{" would automatically become "}
					<code>{"\\vec{}"}</code>).
				</li>
				<li>
					{"Customizable autocompletes. I, for example, made "}
					<code>{"/ml"}</code>
					{" automatically create a LaTeX block with the "}
					<code>{"align"}</code>
					{" enabled."}
				</li>
			</ul>
			<PostHeading level={3} id="3-syncing-conflicts-2">
				3: Syncing Conflicts
			</PostHeading>
			<p>
				{
					"Obsidian is not the holy fix for all syncing conflicts ever, but it includes an awesome setting to mitigate a lot of them. Obsidian allows you to enable a separate profile folder for each device. This means that my desktop could save to a "
				}
				<code>{".desktop"}</code>
				{" folder, while my smartphone saves to a "}
				<code>{".smartphone"}</code>
				{" folder."}
			</p>
			<p>
				This eliminates a lot of syncing conflicts I previously had with
				Obsidian.
			</p>
			<p>
				<strong>Yes, there are still some syncing conflicts,</strong>
				{
					" but they are pretty rare. I would say on one day of heavy mixed-device usage, I would get around one sync conflict. Compared to Logseq, where I had ~10 in the same time, this is a blessing."
				}
			</p>
			<PostHeading level={3} id="4-bad-links-2">
				4: Bad Links
			</PostHeading>
			<p>
				This simply is not an issue in Obsidian. Obsidian uses this linking
				format:
			</p>
			<p>
				<code>{"[[FileName]]"}</code>
				{" and that's it. You may define a custom display name using "}
				<code>{"[[FileName|DisplayName]]"}</code>, but that is not always
				needed. By the way, this defining of a display name was not possible in
				Logseq. This allows you to not have to create an alias for a page just
				because you want to write the plural of something, and so on. Basically,
				this feature has saved me a lot of headaches.
			</p>
			<PostHeading level={3} id="5-plugins-2">
				5: Plugins
			</PostHeading>
			<p>
				{
					"Compared to Logseq, Obsidian has a ton of plugins. At the time of writing this, Obsidian has around "
				}
				<strong>2,450</strong>
				{
					' plugins. Compared to the "only" 374 plugins of Logseq, this feels amazing. You can basically search for whatever you want and (most of the time) you will find exactly what you were looking for. If you can\'t find what you were looking for, just create the plugin yourself ('
				}
				<a
					href="https://github.com/DontBlameMe99/Tick-Tones"
					target="_blank"
					rel="noreferrer"
				>
					like I did 😄
				</a>
				).
			</p>
			<PostHeading level={2} id="moving-files-from-logseq-into-obsidian">
				Moving Files from Logseq into Obsidian
			</PostHeading>
			<p>
				This might seem like the easiest process, you think. But let me tell
				you, it was not. Because of all the differences in Logseq's
				interpretation of Markdown and the actual Markdown syntax (as Obsidian
				uses it), it was a pain.
			</p>
			<p>
				There are some plugins in Obsidian to help with this process, but for
				me, they created more work than they solved. For me, the final solution
				was pretty simple: Manually copy over the notes I needed, and simply let
				the other stuff stay on my hard drive, but not in Obsidian.
			</p>
			<p>
				{
					"This decision was made easier by me taking a look at the notes and links I had in Logseq and realizing that a lot of them were dumb and useless. As an example, I had a page named "
				}
				<code>{"I"}</code>
				{" which was automatically linked to every "}
				<code>{"I"}</code>
				{
					" I typed? Why would someone do that? Anyways, now after quite some time of usage, I think that I am no longer missing anything."
				}
			</p>
			<PostHeading level={3} id="how-many-files-do-you-have-now">
				How Many Files Do You Have Now?
			</PostHeading>
			<p>
				{"Before my transformation, I had "}
				<strong>493</strong>
				{
					" custom files (and 618 pages with all the automatic pages) in Logseq. Now in Obsidian, I have "
				}
				<strong>412</strong>
				{
					" files. Yes, a few ones (I would guess around 100 files) are missing, but apparently I don't need them."
				}
			</p>
			<PostHeading level={2} id="how-does-your-graph-look">
				How Does Your Graph Look?
			</PostHeading>
			<p>
				This is the one and only (obviously useless) question you may ask a
				PKM-system user. Yes, I will answer it. Here is my old Logseq graph:
			</p>
			<PostImage
				src="/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031703.webp"
				avifSrcSet="/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031703-500.avif 500w"
				width={500}
				height={291}
				alt={
					"My old Logseq graph: every note wired to several others, a dense ball of connections"
				}
			/>
			<p>And here is my new Obsidian graph:</p>
			<PostImage
				src="/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031716.webp"
				avifSrcSet="/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031716-500.avif 500w"
				width={500}
				height={368}
				alt={"The same notes in Obsidian: fewer links, three loose clusters"}
			/>
			<PostHeading level={2} id="but-what-happened-to-your-blog-pipeline">
				But What Happened to Your Blog Pipeline?
			</PostHeading>
			<p>
				{
					"If you read my (no longer available) blog post about redesigning my website, you might know that I was able to write my blog in Logseq, hit a button to export it, and then simply run a script. Thanks to "
				}
				<a
					href="https://blog.networkchuck.com/posts/my-insane-blog-pipeline/"
					target="_blank"
					rel="noreferrer"
				>
					NetworkChuck's blog post
				</a>
				{
					" I randomly found, I now simply run one single script to compile and publish my blog (getting everything straight from Obsidian). I needed to tweak the script from NetworkChuck a lot, but in the end, it worked out perfectly. I might write another blog post about this topic (which explains it in more detail) in the future. 😀"
				}
			</p>
			<PostHeading level={2} id="more-general-advantages-of-obsidian-i-found">
				More General Advantages of Obsidian I Found
			</PostHeading>
			<PostHeading level={3} id="separating-tags-and-links">
				Separating Tags and Links
			</PostHeading>
			<p>
				Some generally positive things I found in Obsidian are the splitting of
				tags (<code>{"#something"}</code>) and links (
				<code>{"[[something]]"}</code>). At first, I thought that this was
				useless and/or weird behavior, but after actually using it separately, I
				must say that I actually love that behavior and I would never want it to
				change.
			</p>
			<p>
				{"But why? Simple: Because I use "}
				<code>{"#something"}</code>
				{" to "}
				<strong>organize</strong>
				{
					' my files (like a directory, but using a tag allows a file to be in multiple "directories" at once), and I use the '
				}
				<code>{"[[page]]"}</code>
				{" to actually link two pages together."}
			</p>
			<PostHeading level={3} id="the-community">
				The Community
			</PostHeading>
			<p>
				{
					"Obviously, Obsidian is bigger. This is why it is also no surprise that the community is way bigger. But the thing I was surprised about: The community is still completely nice and friendly. This is something I did not expect (I chatted with a lot of them via their "
				}
				<a
					href="https://obsidian.md/community"
					target="_blank"
					rel="noreferrer"
				>
					Discord server
				</a>
				).
			</p>
			<PostHeading level={3} id="the-themes">
				The Themes
			</PostHeading>
			<p>
				Obsidian also allows users to create their custom themes. Yes, Logseq
				did also allow that. But once again: Obsidian's community is bigger,
				therefore there are also way more (high-quality) themes. Another thing
				about themes which surprised me is that you can use a plugin (
				<a
					href="https://github.com/mgmeyers/obsidian-style-settings"
					target="_blank"
					rel="noreferrer"
				>
					Obsidian Style Settings
				</a>
				) to customize how the theme behaves, its colors, and so much more. You
				can even create and use your own CSS snippets.
			</p>
		</Prose>
	);
}

export const sections: Section[] = [
	{ id: "logseq-a-brief-recap", text: "Logseq - a Brief Recap", level: 2 },
	{ id: "problems-of-logseq", text: "Problems of Logseq", level: 2 },
	{ id: "1-slow-performance", text: "1: Slow Performance", level: 3 },
	{ id: "2-bad-latex-support", text: "2: Bad LaTeX Support", level: 3 },
	{ id: "3-syncing-conflicts", text: "3: Syncing Conflicts", level: 3 },
	{ id: "4-bad-links", text: "4: Bad Links", level: 3 },
	{ id: "5-plugins", text: "5: Plugins", level: 3 },
	{ id: "the-solution", text: "The Solution", level: 2 },
	{ id: "1-slow-performance-2", text: "1: Slow Performance", level: 3 },
	{ id: "2-bad-latex-support-2", text: "2: Bad LaTeX Support", level: 3 },
	{ id: "3-syncing-conflicts-2", text: "3: Syncing Conflicts", level: 3 },
	{ id: "4-bad-links-2", text: "4: Bad Links", level: 3 },
	{ id: "5-plugins-2", text: "5: Plugins", level: 3 },
	{
		id: "moving-files-from-logseq-into-obsidian",
		text: "Moving Files from Logseq into Obsidian",
		level: 2,
	},
	{
		id: "how-many-files-do-you-have-now",
		text: "How Many Files Do You Have Now?",
		level: 3,
	},
	{
		id: "how-does-your-graph-look",
		text: "How Does Your Graph Look?",
		level: 2,
	},
	{
		id: "but-what-happened-to-your-blog-pipeline",
		text: "But What Happened to Your Blog Pipeline?",
		level: 2,
	},
	{
		id: "more-general-advantages-of-obsidian-i-found",
		text: "More General Advantages of Obsidian I Found",
		level: 2,
	},
	{
		id: "separating-tags-and-links",
		text: "Separating Tags and Links",
		level: 3,
	},
	{ id: "the-community", text: "The Community", level: 3 },
	{ id: "the-themes", text: "The Themes", level: 3 },
];
