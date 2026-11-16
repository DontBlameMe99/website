import { PostHeading, Prose } from "~/components/post/prose";
import { HourAccumulator } from "~/content/experiences/learning_to_learn";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Learning to learn",
	date: "2024-09-29",
	summary:
		"Studying harder is the trap. Spaced repetition, active recall, and the uncomfortable amount of forgetting that learning actually requires.",
	tags: ["learning", "psychology", "productivity"],
	accent: "yellow",
	words: 1340,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "general-introduction", text: "General Introduction", level: 2 },
	{
		id: "is-it-hard-to-learn-how-to-learn",
		text: "Is It Hard to Learn How to Learn?",
		level: 2,
	},
	{
		id: "how-much-time-do-i-need-to-learn-new-things",
		text: "How Much Time Do I Need to Learn New Things?",
		level: 3,
	},
	{
		id: "how-to-get-the-habit-of-learning",
		text: "How to Get the Habit of Learning",
		level: 3,
	},
	{
		id: "game-changing-tools-for-effective-learning",
		text: "Game-Changing Tools for Effective Learning",
		level: 2,
	},
	{ id: "anki", text: "Anki", level: 3 },
	{
		id: "what-advantages-does-creating-simple-flashcards-give-me",
		text: "What Advantages Does Creating Simple Flashcards Give Me?",
		level: 4,
	},
	{ id: "logseq", text: "Logseq", level: 3 },
	{ id: "how-to-stay-motivated", text: "How to Stay Motivated", level: 2 },
	{ id: "reward-yourself", text: "Reward Yourself", level: 3 },
	{ id: "work-towards-a-goal", text: "Work Towards a Goal", level: 3 },
	{ id: "celebrate-small-wins", text: "Celebrate Small Wins", level: 3 },
	{ id: "adjusting-your-approach", text: "Adjusting Your Approach", level: 3 },
	{ id: "conclusion", text: "Conclusion", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="general-introduction">
				General Introduction
			</PostHeading>
			<p>
				We've all experienced that frustrating moment when we need to complete a
				task but can't seem to convince ourselves to do it. We know that we have
				to do it, or else it will become a problem in the future; yet you find
				yourself doing anything else—like cleaning your room or doing laundry—to
				avoid it.
			</p>
			<p>
				{"What I just described may sound like "}
				<a
					href="https://en.wikipedia.org/wiki/Procrastination"
					target="_blank"
					rel="noreferrer"
				>
					procrastination
				</a>
				{
					", which it totally is. But you can prevent this by learning how to learn and making it a "
				}
				<a
					href="https://en.wikipedia.org/wiki/Habit"
					target="_blank"
					rel="noreferrer"
				>
					habit
				</a>
				.
			</p>
			<PostHeading level={2} id="is-it-hard-to-learn-how-to-learn">
				Is It Hard to Learn How to Learn?
			</PostHeading>
			<p>
				No, but it is difficult. It is a skill that can be learned. And the best
				part is that you can easily boost yourself just by using the right
				tools.
			</p>
			<p>
				{
					"Generally speaking, if you want to effectively learn something, you also need some kind of "
				}
				<strong>"deep focus."</strong>
				{
					" However, I won't dive into that topic here. If you are interested in this topic, I can recommend "
				}
				<a
					href="https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692"
					target="_blank"
					rel="noreferrer"
				>
					this book
				</a>
				.
			</p>
			<PostHeading level={3} id="how-much-time-do-i-need-to-learn-new-things">
				How Much Time Do I Need to Learn New Things?
			</PostHeading>
			<p>It's difficult to provide a one-size-fits-all answer.</p>
			<p>
				{
					"For my part, I am currently learning new things for my education; I do not learn that much per day. If I had to guess, I would say that I learn around "
				}
				<strong>one hour</strong>
				{" every day."}
			</p>
			<p>
				{
					"This may seem like a small amount of time, but you need to remember: I learn "
				}
				<strong>every single day</strong>
				{". This is the "}
				<a
					href="https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299"
					target="_blank"
					rel="noreferrer"
				>
					power of habits
				</a>
				.
			</p>
			<p>
				{"That small hour per day accumulates to "}
				<strong>365 hours per year</strong>. This is a lot of time to learn new
				things.
			</p>
			<HourAccumulator />
			<p>
				Of course, if you want to study and need to learn a new topic by the end
				of next month, you would need to dedicate more time. But always
				remember:
			</p>
			<blockquote>
				Sleep is really important. Do not—NEVER—cut down on your sleeping hours
				to learn more. You learn most things when you sleep.
			</blockquote>
			<PostHeading level={3} id="how-to-get-the-habit-of-learning">
				How to Get the Habit of Learning
			</PostHeading>
			<p>
				{"Now, this is a simple answer: "}
				<a
					href={"https://youtu.be/ZXsQAXx_ao0?t=13"}
					target="_blank"
					rel="noreferrer"
				>
					Just do it
				</a>
				.
			</p>
			<p>
				No, seriously, the only way to get the habit of Learning your flashcards
				every single day is to just learn them every single day. Yes, this may
				sound like I am trying to fool you, but this is literally the only and
				best way.
			</p>
			<p>
				But I can reassure you. After a month (at most), it will feel completely
				natural to learn your flashcards every day.
			</p>
			<p>
				Now let's get into the fun part: tools that can help you with the
				Learning process.
			</p>
			<PostHeading level={2} id="game-changing-tools-for-effective-learning">
				Game-Changing Tools for Effective Learning
			</PostHeading>
			<p>
				{"Now this is exactly where I feel at home. "}
				<strong>Yes, I admit I'm a bit lazy.</strong>
			</p>
			<p>
				{
					"When I found out about these tools, I basically started feeling like I was cheating in real life. Just to provide you with some facts: before I started learning how to learn (and to use those tools), I was a "
				}
				<strong>C-F</strong>
				{" graded student."}
			</p>
			<p>
				{"Maybe if it was a topic I was interested in, I scored some "}
				<strong>B's</strong>.
			</p>
			<p>
				{
					"After I used them and started to learn how to learn, my life completely shifted (in a positive way). I started scoring "
				}
				<strong>A's</strong>
				{" and "}
				<strong>B's</strong>
				{" all the time. "}
				<strong>
					These tools genuinely feel like a cheat code for learning.
				</strong>
			</p>
			<p>
				{"Now, what do I mean exactly? I am talking about the concept of "}
				<strong>
					[spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition)
				</strong>
				. This concept is literally the best way for our brains to learn.
			</p>
			<p>
				{"You do "}
				<strong>not</strong>
				{" learn when you read a Concept over and over again."}
			</p>
			<p>
				{"You do "}
				<strong>not</strong>
				{" learn when you summarize a text."}
			</p>
			<p>
				{"You "}
				<strong>only</strong>
				{" learn when you reproduce and think for yourself."}
			</p>
			<p>
				{"This is exactly what the concept of "}
				<a
					href="https://en.wikipedia.org/wiki/Spaced_repetition"
					target="_blank"
					rel="noreferrer"
				>
					spaced repetition
				</a>
				{
					" does. You create a question and need to recreate and rethink the answers."
				}
			</p>
			<PostHeading level={3} id="anki">
				Anki
			</PostHeading>
			<p>
				{"Now let's get to my favorite app that does this: "}
				<a href="https://apps.ankiweb.net/" target="_blank" rel="noreferrer">
					Anki
				</a>
				.
			</p>
			<p>
				<a href="https://apps.ankiweb.net/" target="_blank" rel="noreferrer">
					Anki
				</a>
				{" is basically a "}
				<a
					href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
					target="_blank"
					rel="noreferrer"
				>
					FOSS
				</a>
				{" implementation of the "}
				<a
					href="https://en.wikipedia.org/wiki/Spaced_repetition"
					target="_blank"
					rel="noreferrer"
				>
					spaced repetition
				</a>
				{" concept."}
			</p>
			<p>
				And it (on top) is the best implementation of the Concept I have ever
				found.
			</p>
			<PostHeading
				level={4}
				id="what-advantages-does-creating-simple-flashcards-give-me"
			>
				What Advantages Does Creating Simple Flashcards Give Me?
			</PostHeading>
			<p>
				{"This is pretty simple to answer: "}
				<strong>easy learning</strong>. No, seriously, for me it is always the
				same. Let's say I need to learn for a simple vocabulary test in another
				language. What do I do? I insert all the vocabulary I need to learn, and
				that's it. I know that by the time the test needs to be written, I will
				totally know every single word and its translation.
			</p>
			<p>
				{"And yes, this only works because of the "}
				<strong>daily habit</strong>
				{
					" of Learning those flashcards. If I were only Learning them once every five days, it would not work at all."
				}
			</p>
			<PostHeading level={3} id="logseq">
				Logseq
			</PostHeading>
			<p>
				{"This is a special candidate. "}
				<a href="https://logseq.com" target="_blank" rel="noreferrer">
					Logseq
				</a>
				{' is not a direct "learning app" like '}
				<a href="https://apps.ankiweb.net" target="_blank" rel="noreferrer">
					Anki
				</a>
				{". It is a "}
				<a
					href="https://en.wikipedia.org/wiki/Personal_knowledge_management"
					target="_blank"
					rel="noreferrer"
				>
					personal knowledge management system (PKM)
				</a>
				.
			</p>
			<p>
				{
					"It basically serves as a dumping space for all your thoughts. But for m, these tools feel like heaven in combination. I may make a separate blog post regarding "
				}
				<a href="https://logseq.com" target="_blank" rel="noreferrer">
					Logseq
				</a>
				{" if you are interested."}
			</p>
			<p>
				{"All in all, "}
				<a href="https://logseq.com" target="_blank" rel="noreferrer">
					Logseq
				</a>
				{
					" allows me to take notes on everything and turn them into flashcards, which I can then learn in "
				}
				<a href="https://apps.ankiweb.net" target="_blank" rel="noreferrer">
					Anki
				</a>
				.
			</p>
			<PostHeading level={2} id="how-to-stay-motivated">
				How to Stay Motivated
			</PostHeading>
			<p>
				Here are some Personal tips that I use to stay motivated while Learning.
			</p>
			<PostHeading level={3} id="reward-yourself">
				Reward Yourself
			</PostHeading>
			<p>
				Now, this may seem obvious at first. But when was the last time you
				consciously rewarded yourself for achieving a Learning goal?
			</p>
			<p>
				So yes, it is fine to reward yourself when you achieve a goal in your
				Learning journey.
			</p>
			<p>
				{"But "}
				<strong>
					please don't reward yourself with a break from Learning.
				</strong>
				{
					' Yes, I know that this may seem obvious, but I have caught myself more times than I would like to admit saying, "I don\'t have to learn today; I learned so much yesterday." But this is something you should prevent from happening.'
				}
			</p>
			<blockquote>
				Building a habit can take weeks, but breaking it only takes a few days.
			</blockquote>
			<p>
				{
					"So if you want to reward yourself, use something positive for your life. If you like reading, read a book for an hour. "
				}
				<strong>
					But please do not break your Learning habits just because you learned
					well.
				</strong>
			</p>
			<PostHeading level={3} id="work-towards-a-goal">
				Work Towards a Goal
			</PostHeading>
			<p>
				This specific point may be the most important. You should always work
				toward a specific goal, even if it is just something trivial.
			</p>
			<p>
				{
					"Having a goal greatly increases your chances and motivation to achieve that goal. Studies have found that "
				}
				<strong>70%</strong>
				{
					" of people reach their goals when they set specific and measurable objectives, compared to only "
				}
				<strong>35%</strong>
				{" who achieve them without clear goals."}
			</p>
			<p>
				It also helps significantly if you write down your goals or even
				communicate them with other people.
			</p>
			<PostHeading level={3} id="celebrate-small-wins">
				Celebrate Small Wins
			</PostHeading>
			<p>
				This one is a big motivation booster. You are allowed, and even
				encouraged, to celebrate small wins. Maybe your end goal is to be an
				all-A student. But why not celebrate that you are a B student right now
				when previously you were only a C or even a D?
			</p>
			<p>
				<strong>
					Yes, it is hard to allow yourself to feel good when you achieve
					something but not exactly your goal.
				</strong>
			</p>
			<p>
				Because of this, it is really important to set yourself some mini-goals.
				These might be the previously discussed B student or anything else. But
				it is fine to celebrate some goals, even when they are smaller
				achievements than your final goal. You know that you'll achieve your
				final goal, so why not celebrate the small steps that make up the big
				step?
			</p>
			<PostHeading level={3} id="adjusting-your-approach">
				Adjusting Your Approach
			</PostHeading>
			<p>If something is not working for you, change it up.</p>
			<p>
				What I mean by this is that if you are trying to learn a new language
				using an app on your smartphone and it just is not working, change it
				up. Try using flashcards, Books, courses—whatever.
			</p>
			<blockquote>
				Just because a single method of Learning is not working for you does not
				mean that you cannot learn. Everybody can easily, without much effort,
				learn anything they want.
			</blockquote>
			<PostHeading level={2} id="conclusion">
				Conclusion
			</PostHeading>
			<p>
				{'"Learning to learn" can be (and totally is) hard. Learning to '}
				<a
					href="https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692"
					target="_blank"
					rel="noreferrer"
				>
					deeply focus
				</a>
				{" again, "}
				<a
					href="https://dontblameme.codeberg.page/posts/psychology-of-social-media-addiction/"
					target="_blank"
					rel="noreferrer"
				>
					after having spent years on social media apps
				</a>
				, is a challenging task.
			</p>
			<p>
				Learning to learn using flashcards every single day is another hard task
				to perform.
			</p>
			<p>
				{
					"But it definitely is worth it. Once you have mastered the initial hurdle of getting started, it totally feels like cheating. "
				}
				<strong>
					You feel like you are doing nothing, but you can do anything.
				</strong>
			</p>
			<p>
				Of course, if you want to start, you should begin small. Do not try to
				learn five languages at once; this may seem overwhelming.
			</p>
			<p>
				{"This is the power of Learning how to learn. "}
				<strong>If you master it, you can achieve anything.</strong>
			</p>
		</Prose>
	);
}
