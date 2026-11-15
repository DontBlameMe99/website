import { PostHeading, Prose } from "~/components/post/prose";
import { SystemFlow } from "~/content/experiences/the_perfect_productivity_system";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "The perfect productivity system",
	date: "2025-06-28",
	summary:
		"The perfect system is the one you stop optimizing. Notes, tasks and reviews arranged so the arrangement stops being the hobby.",
	tags: ["productivity", "notes"],
	accent: "pink",
	words: 1363,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "introduction", text: "Introduction", level: 2 },
	{
		id: "what-is-the-perfect-productivity-system",
		text: "What is the Perfect Productivity System?",
		level: 2,
	},
	{
		id: "the-productivity-system-treadmill",
		text: "The Productivity System Treadmill",
		level: 2,
	},
	{
		id: "so-a-system-for-note-taking-is-useless",
		text: "So a System for Note-Taking Is Useless?",
		level: 2,
	},
	{ id: "what-do-you-need", text: "What Do You Need?", level: 2 },
	{
		id: "but-when-do-i-actually-need-a-new-setup-plugin",
		text: "But When Do I Actually Need a New Setup/Plugin?",
		level: 2,
	},
	{ id: "conclusion", text: "Conclusion", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="introduction">
				Introduction
			</PostHeading>
			<p>
				Productivity systems are everywhere: Apps, templates, and workflows
				promise to make us more efficient. But is there really a perfect system
				out there, or are we trying to achieve the impossible? Here's what I've
				learned after years of tweaking, testing, and (finally) simplifying.
			</p>
			<PostHeading level={2} id="what-is-the-perfect-productivity-system">
				What is the Perfect Productivity System?
			</PostHeading>
			<p>
				<em>What is the perfect productivity system?</em>
			</p>
			<p>
				This question is hard to answer, since it is different for everybody.
				For me, it's something that allows me to easily take notes anywhere,
				anytime. Maybe even with nice voice notes? Oh yeah, and it should also
				allow me to easily retrieve any note at any point in time, as soon as I
				need it. Also, it should have no issues ever. Everything should work
				perfectly out-of-the-box all the time. It should also include everything
				I want a system to have right now, everything I would want the system to
				have in the future, but not bother me with it.
			</p>
			<p>
				<em>This sounded nice, didn't it?</em>
			</p>
			<p>
				{
					"Having this awesome system which never breaks and does everything you want and more. But I'm sorry to tell you, but this system "
				}
				<strong>does not exist and never will exist</strong>. If you are
				currently trying to create such a system let me tell you:
			</p>
			<p>
				<strong>stop it</strong>. Read this post and please do not waste your
				efforts. Now let me tell you why I am saying this:
			</p>
			<PostHeading level={2} id="the-productivity-system-treadmill">
				The Productivity System Treadmill
			</PostHeading>
			<p>
				{"This might be you (it definitely was me some time ago): "}
				<em>
					I think that tweaking X, installing Y and doing Z will improve my
					productivity system a lot. Let me just do this one more change
				</em>
				.
			</p>
			<p>
				{"This went on for a long time. To be exact, I spent "}
				<strong>at least 20 hours</strong>
				{" customizing my "}
				<a href="https://www.notion.com/" target="_blank" rel="noreferrer">
					Notion
				</a>
				{
					" pages to behave like I wanted them to. I set up external tools for graphs, automated scripts and so much more."
				}
			</p>
			<p>
				It felt like the perfect place to be productive - everything happened
				perfectly and you only needed to click some buttons and categorize your
				notes. Do you know what happened?
			</p>
			<p>
				{
					"After all these 20+ hours of customizing everything I spent a total of "
				}
				<strong>two hours</strong>
				{
					" using the system. I procrastinated doing work by customizing my workplace. This is "
				}
				<strong>exactly</strong>
				{" the trap I want to talk about."}
			</p>
			<p>
				{
					"Customizing your workplace/productivity system feels much better (and quite frankly is easier to do) than to do actual work. When you are trying to achieve the "
				}
				<em>perfect</em>
				{" system you are basically always on the lookout for the "}
				<strong>one thing that makes your system perfect</strong>.
			</p>
			<p>
				Just one more plugin and I will achieve perfection. One more thing. I
				can't stop now.
			</p>
			<p>
				{"This is a prime example of the "}
				<a
					href="https://en.wikipedia.org/wiki/Sunk_cost#Psychological_factors"
					target="_blank"
					rel="noreferrer"
				>
					Sunk Cost Fallacy
				</a>
				:
			</p>
			<p>
				You spent so much time customizing every little detail of the system.
				You can't just stop now and maybe even throw everything away?
			</p>
			<p>
				{
					"Applications like Notion do this perfectly. They perfectly exploit the "
				}
				<a
					href="https://en.wikipedia.org/wiki/IKEA_effect"
					target="_blank"
					rel="noreferrer"
				>
					IKEA Effect
				</a>
				:
			</p>
			<p>
				{
					"Since you have already customized so much, the system feels much more valuable than it actually is. I can tell you that my 20+ hours system felt amazing: It felt like it was worth a lot (apparently other people think this as well and "
				}
				<em>sell their notion templates for money??</em>).
			</p>
			<p>It also felt amazing to create something in Notion:</p>
			<p>
				You spent 2 hours fixing a formula and finally it works! Wow, what an
				amazing feeling!
			</p>
			<p>
				But this was a total misconception. The only thing I was doing was
				implementing a bit of everyone else's "_perfect productivity LifeOS
				workflow system_" in my mess. Slowly but surely I was simply
				implementing everyone else's system, combining it into a huge ball of
				productivity mess.
			</p>
			<p>
				{"And sorry to break your illusion, but "}
				<strong>
					consuming content about becoming productive (or improving your setup)
					is not productive
				</strong>
				{
					". It feels like work, because it is work. But is it actually helping you accomplish your goals? I don't think so. Basically improving your productivity system is the "
				}
				<em>most difficult form of procrastination</em>
				{". You are doing something to "}
				<strong>
					help your future self be more productive, instead of actually being
					productive
				</strong>
				.
			</p>
			<p>
				{
					"You might think that helping your future self will be a net-positive at some point. But no, a person spending this much time customizing their setup will "
				}
				<strong>always</strong>
				{" accomplish "}
				<em>much less</em>
				{" than someone simply doing the work. But why?"}
			</p>
			<p>For this worse performance there are two reasons:</p>
			<ul>
				<li>
					You will never be finished creating the perfect system. There will
					always be something you would want to improve/change.
				</li>
				<li>
					Using the system, since it is becoming so complex, is actually slowing
					you down. Simply using a notepad would be faster.
				</li>
			</ul>
			<p>
				So yes, simply doing the work is actually faster than preparing for work
				all the time.
			</p>
			<PostHeading level={2} id="so-a-system-for-note-taking-is-useless">
				So a System for Note-Taking Is Useless?
			</PostHeading>
			<p>You might now think that:</p>
			<ul>
				<li>I am totally against any sort of note-taking or organization</li>
				<li>
					I want you to trash everything and simply write things in your notepad
				</li>
			</ul>
			<p>
				{"Let me quickly settle this: "}
				<strong>No!</strong>
			</p>
			<p>
				A system for note taking is really important. Being organized,
				especially in the digital realm where every bit of knowledge of you is
				stored, is really important.
			</p>
			<p>
				{"But what I am saying is please "}
				<strong>use a really simple system</strong>
				{". For you it actually might be enough to use simple "}
				<code>{".txt"}</code>
				{" or "}
				<code>{".md"}</code>
				{
					" files in a folder, written by a text editor. What I want you to realize is that it is "
				}
				<strong>way more productive</strong>
				{" to "}
				<strong>
					use a simple system and only expand it if you actually need it
				</strong>
				.
			</p>
			<p>Take me as an example. My route went like this:</p>
			<ul>
				<li>No note taking or organizing at all</li>
				<li>
					Jumping on the productivity treadmill, optimizing everything and
					creating the "perfect" Notion setup
				</li>
				<li>
					{"Realizing that this is a waste of time and effort, switching to "}
					<a href="https://logseq.com/" target="_blank" rel="noreferrer">
						Logseq
					</a>
				</li>
				<li>
					{
						"Realizing that I didn't like some practices and file storing of Logseq, switching to "
					}
					<a href="https://obsidian.md" target="_blank" rel="noreferrer">
						Obsidian
					</a>
					{" instead"}
				</li>
			</ul>
			<p>
				{"If you want a more in-depth look, check out the blog "}
				<a
					href="https://dontblameme.codeberg.page/posts/i-found-a-better-alternative-to-logseq/"
					target="_blank"
					rel="noreferrer"
				>
					why I switched to Obsidian instead of Logseq
				</a>
				{" or "}
				<a
					href="https://dontblameme.codeberg.page/posts/learning-to-learn/"
					target="_blank"
					rel="noreferrer"
				>
					how I learnt to learn
				</a>
				.
			</p>
			<p>
				{"Now I use a pretty simple setup in Obsidian, which I "}
				<strong>expand only when I actually need something new</strong>, Not
				before.
			</p>
			<SystemFlow />
			<PostHeading level={2} id="what-do-you-need">
				What Do You Need?
			</PostHeading>
			<p>
				If you expect me to tell you exactly what you need, I am sorry but I
				can't. The exact need is different for everybody. For me it is
			</p>
			<p>
				<a href="https://obsidian.md" target="_blank" rel="noreferrer">
					Obsidian
				</a>
				{" and "}
				<a href="https://ankiweb.net/" target="_blank" rel="noreferrer">
					Anki
				</a>
				:
			</p>
			<ul>
				<li>
					Obsidian to capture everything and build my "second brain" (another
					productivity marketing word, but I think it fits this pretty well)
				</li>
				<li>
					Anki to learn everything I need to using flashcards. This is the
					system I found works the best for me to remember things.
				</li>
			</ul>
			<p>
				{"If you want you can try out Obsidian, but "}
				<strong>only add plugins once you actively need them</strong>
				{". Please "}
				<strong>do not</strong>
				{" search for "}
				<em>the one missing plugin which makes everything perfect</em>. This is
				exactly the same as with Notions "the one formula/page/system".
			</p>
			<PostHeading
				level={2}
				id="but-when-do-i-actually-need-a-new-setup-plugin"
			>
				But When Do I Actually Need a New Setup/Plugin?
			</PostHeading>
			<p>
				{
					"This is an interesting question. You might have just seen a new video about the new best productivity setup, or found out about a plugin in Obsidian you want to try. The best way to test if you actually need the plugin/setup is simple: Just don't think about it for a week and see if it is still important to you. If it is, set it up and try it for a week. After said week do a review: Has it actually had the wanted effect? Is it as useful as you thought it would be? Is it adding any downtime to your workflow? If the new setup/plugin is a net-positive, continue to use it. If not, "
				}
				<strong>get rid of it!</strong>
				{
					" Yes I know that it might feel annoying. You spent time setting it up etc. and now have to delete it ("
				}
				<a
					href="https://en.wikipedia.org/wiki/Sunk_cost#Psychological_factors"
					target="_blank"
					rel="noreferrer"
				>
					Sunk Cost Fallacy
				</a>
				).
			</p>
			<p>
				But this is necessary. If you keep it around you are degrading your
				overall system - slowly making it the same as the original Notion setup
				you wanted to prevent.
			</p>
			<PostHeading level={2} id="conclusion">
				Conclusion
			</PostHeading>
			<p>
				{
					"I hope that I could explain to you why the perfect system does not and will never exist. The perfect system is something made up in your head to justify you spending your time optimizing your system, instead of simply doing work. "
				}
				<strong>So, what about you?</strong>
			</p>
			<ul>
				<li>What's your current system?</li>
				<li>
					{
						"What could you simplify today? If you'd like to discuss or share your thoughts, feel free to contact me via Matrix or any method listed on my "
					}
					<a
						href="https://dontblameme.codeberg.page/"
						target="_blank"
						rel="noreferrer"
					>
						homepage
					</a>
					. I look forward to hearing from you!
				</li>
			</ul>
		</Prose>
	);
}
