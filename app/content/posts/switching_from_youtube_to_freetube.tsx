import { PostHeading, Prose } from "~/components/post/prose";
import {
	MigrationChecklist,
	ThumbnailPreference,
	WhatFollowsYou,
} from "~/content/experiences/switching_from_youtube_to_freetube";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Switching from YouTube to FreeTube",
	date: "2023-07-10",
	summary:
		"What YouTube does when you are not looking, and what changes when the front end is yours. FreeTube, subscriptions, and the cost of leaving.",
	tags: ["privacy"],
	accent: "red",
	words: 1227,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{
		id: "why-would-you-switch-away-from-youtube",
		text: "Why Would You Switch Away from YouTube?",
		level: 2,
	},
	{
		id: "but-isn-t-it-slower-worse-looking",
		text: "But Isn't It Slower/Worse/Looking?",
		level: 2,
	},
	{
		id: "what-can-you-do-with-freetube",
		text: "What Can You Do with FreeTube?",
		level: 2,
	},
	{
		id: "how-did-the-transition-feel",
		text: "How Did the Transition Feel?",
		level: 2,
	},
	{
		id: "how-do-you-live-without-an-algorithm-serving-you-everything",
		text: "How Do You Live Without an Algorithm Serving You Everything?",
		level: 2,
	},
	{
		id: "special-features-i-love-about-freetube",
		text: "Special Features I Love About FreeTube",
		level: 2,
	},
	{
		id: "how-can-you-live-without-an-algorithm-serving-you-content",
		text: "How Can You Live Without an Algorithm Serving You Content?",
		level: 2,
	},
	{
		id: "the-bad-things-i-experienced",
		text: "The Bad Things I Experienced",
		level: 2,
	},
	{ id: "should-you-use-freetube", text: "Should You Use FreeTube", level: 2 },
	{ id: "how-to-install-freetube", text: "How to Install FreeTube", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="why-would-you-switch-away-from-youtube">
				Why Would You Switch Away from YouTube?
			</PostHeading>
			<p>
				{"This question is understandable, but not correct. "}
				<strong>You are not leaving YouTube</strong>
			</p>
			<p>You are just leaving the following things behind:</p>
			<ul>
				<li>Forced creation of an Account to subscribe to channels</li>
				<li>Watching Advertisements</li>
				<li>(Optionally) Skipping sponsored segments</li>
				<li>Slow, Bloated Site</li>
				<li>
					{"Tracking from "}
					<strong>YouTube</strong>
					{" itself"}
				</li>
			</ul>
			<p>This now raises the following question:</p>
			<p>
				<strong>Why?</strong>
			</p>
			<p>
				{"The answer is simple. Because I don't want to have a "}
				<strong>Google</strong>
				{
					" Account (because of the tracking), I don't want to use a slow website, and I also don't want to be tracked."
				}
			</p>
			<WhatFollowsYou />
			<PostHeading level={2} id="but-isn-t-it-slower-worse-looking">
				But Isn't It Slower/Worse/Looking?
			</PostHeading>
			<p>
				<strong>No. Definitely not.</strong>
			</p>
			<p>
				{"The application I am talking about is called "}
				<a href="https://freetubeapp.io/" target="_blank" rel="noreferrer">
					**FreeTube**
				</a>
				.
			</p>
			<p>Let me quote from their site:</p>
			<p>
				"FreeTube is a YouTube client for Windows, Mac, and Linux built around
				using YouTube more privately. You can enjoy your favorite content and
				creators without your habits being tracked. All of your user data is
				stored locally and never sent or published to the internet. FreeTube
				grabs data by scraping the information it needs (with either local
				methods or by optionally utilizing the Invidious API). With many
				features similar to YouTube, FreeTube has become one of the best methods
				to watch YouTube privately on desktop."
			</p>
			<p>
				Because you have the tracking, no bloat, and no ads, the overall
				experience feels much faster and more responsive.
			</p>
			<p>
				{
					"The looks of the application are also pretty awesome, in my opinion. You have "
				}
				<strong>five</strong>
				{
					" different themes (Light, Dark, Black, Dracula, Catpuccin, Mocha) and a "
				}
				<strong>ton</strong>
				{" of different Main and secondary accent colors."}
			</p>
			<p>
				You can also adjust the scale of the application, which is pretty
				important to me because my main monitor has a resolution of 3840x3160p.
			</p>
			<PostHeading level={2} id="what-can-you-do-with-freetube">
				What Can You Do with FreeTube?
			</PostHeading>
			<p>
				{"Let me also use their text from "}
				<a href="https://freetubeapp.io/" target="_blank" rel="noreferrer">
					their Website
				</a>
			</p>
			<ul>
				<li>
					<strong>Subscriptions</strong>
					{" Subscribe to channels without an account"}
				</li>
				<li>
					<strong>Local Data</strong>
					{" All Subscriptions and histories are stored locally"}
				</li>
				<li>
					<strong>No Ads</strong>
					{" Enjoy an ad-free experience as you watch"}
				</li>
				<li>
					<strong>Private</strong>
					{" Your viewing habits are not tracked by us or YouTube"}
				</li>
				<li>
					<strong>Familiar Design</strong>
					{
						" A design similar to YouTube makes it easy to transition to FreeTube"
					}
				</li>
				<li>
					<strong>Open Source</strong>
					{
						" FreeTube is Free and Open Source Software under the AGPLv3 License"
					}
				</li>
				<li>
					<strong>Import Subscriptions</strong>
					{" Import your subscriptions from YouTube to see your feed instantly"}
				</li>
				<li>
					<strong>Multi Platform</strong>
					{" Runs on Windows, Mac, and several Linux distributions"}
				</li>
				<li>
					<strong>Multilingual</strong>
					{" Translated into many languages"}
				</li>
			</ul>
			<PostHeading level={2} id="how-did-the-transition-feel">
				How Did the Transition Feel?
			</PostHeading>
			<p>
				{
					"For me, it was pretty simple. Just install the app using either your "
				}
				<strong>package manager</strong>, or the Windows download.
			</p>
			<p>
				{"I personally never imported my subscriptions from YouTube, though. "}
				<strong>Why?</strong>
			</p>
			<p>
				{"Because I literally had 2,000+ subscriptions. And I only "}
				<strong>actively</strong>
				{" watched 10–20 of them."}
			</p>
			<p>
				{
					"I decided to manually subscribe to all channels I like to watch. Because of this, my YouTube consumption has also decreased. "
				}
				<strong>Why?</strong>
				{" I literally forgot about some channels I never watched."}
			</p>
			<PostHeading
				level={2}
				id="how-do-you-live-without-an-algorithm-serving-you-everything"
			>
				How Do You Live Without an Algorithm Serving You Everything?
			</PostHeading>
			<p>
				By using my brain. No, seriously, I just watch what I want to. I watch
				the channels I subscribe to and what I search for, and that's it. This
				is also a huge benefit. You won't believe how much time you had spent
				watching YouTube!
			</p>
			<p>
				{'For me, it was like a "hole". I watched some videos, and '}
				<strong>bang!</strong>
				{" It's now 5 hours later."}
			</p>
			<p>
				{"This changed. "}
				<strong>Why?</strong>
				{
					" Because you no longer have this really bad (or good, depending on your perspective) algorithm doing its best to force you to watch another video. And another one. And maybe one more."
				}
			</p>
			<PostHeading level={2} id="special-features-i-love-about-freetube">
				Special Features I Love About FreeTube
			</PostHeading>
			<p>
				{"I love that on "}
				<a href="https://freetubeapp.io/" target="_blank" rel="noreferrer">
					FreeTube
				</a>
				{" you have so many "}
				<strong>distraction-free</strong>
				{" settings."}
			</p>
			<p>This allows you to remove lots of clutter you don't really need.</p>
			<p>
				I also love that you can enable/change the "Thumbnail Preference" in
				FreeTube.
			</p>
			<p>
				{
					"This allows you to remove those clickbait thumbnails, and replace them with some actual frames of the video. This change to frame-based thumbnails was actually really weird for me at first. "
				}
				<strong>Why?</strong>
				{
					" Because my brain was actually trained to just focus on those big red arrow thumbnails. Pretty creepy, if you ask me."
				}
			</p>
			<ThumbnailPreference />
			<p>
				{
					"I also really love that you can block sponsored segments. FreeTube has integrated YouTube SponsorBlock support, which allows you to select what you want to skip and then skip it. If you don't know what I mean, This will skip those annoying ads YouTubers include in their videos. Not the ads playing "
				}
				<strong>before/in</strong>
				{" the video. This is for ads the creators include on their own."}
			</p>
			<p>
				{"Another big point is that you don't have to view "}
				<strong>any</strong>
				{
					" ads. Not before, in, or even after the video. This saves so much time; you wouldn't believe it."
				}
			</p>
			<PostHeading
				level={2}
				id="how-can-you-live-without-an-algorithm-serving-you-content"
			>
				How Can You Live Without an Algorithm Serving You Content?
			</PostHeading>
			<p>
				In my opinion, it's really concerning that someone even asks this kind
				of question.
			</p>
			<p>
				In my opinion, you should only consume content when you want to. And
				only what you already chose to watch.
			</p>
			<p>
				{
					"I find it really concerning that most people just watch/consume content like a brain-dead robot. Just watching one thing after the next, and so on. And before you can notice, 5 hours have passed. And if I ask you what you watched the last few hours? "
				}
				<strong>I think you will have no idea.</strong>
			</p>
			<p>
				{"Because of those points, I am really "}
				<strong>thankful for not having such an algorithm!</strong>
			</p>
			<p>
				Not having this algorithm, which just "forces" you to watch longer, is
				really nice. I just love watching what I want to, from the channels I
				want to.
			</p>
			<p>
				If I want to watch something regarding the topic X, I just search for
				it.
			</p>
			<PostHeading level={2} id="the-bad-things-i-experienced">
				The Bad Things I Experienced
			</PostHeading>
			<p>Yes, this does also exist.</p>
			<p>
				{
					"I have and had some problems with FreeTube. A few months ago, I had a really annoying problem. "
				}
				<strong>Some</strong>
				{
					" of the videos simply caused FreeTube to crash. The screen just went blank, and that was it. I instantly contacted the developers via email and reported the bug (sending the error, a message, and a Video)."
				}
			</p>
			<p>
				{"But this request was ignored. "}
				<strong>
					Yes, I know that you normally should use their Bug Tracker
				</strong>
				. But I don't want to create a GitHub account. Because of this, I was
				not so mad about it that I received no response at all.
			</p>
			<p>
				{
					"Another really annoying thing are the Invidious instances. Some of them won't work, and some of them are so laggy that you can't watch anything. Here, I am not mad at anyone as well. Those instances are hosted, most of the time, by people like "
				}
				<strong>you and me</strong>. It is just something that can sometimes
				annoy you when you just want to watch something, and it is not
				loading/just gives an error.
			</p>
			<p>
				And then there is also the quality. YouTube, at least for me, no longer
				supports 1080p. Because of this, you may want to use an Invidious
				instance, which can send you 1080p video material. But boy, those are
				rare. I only had 3–5 instances actually send me 1080p videos. But those
				also have a huge problem:
			</p>
			<p>
				<strong>Buffering</strong>. For me it is not worth it trying to watch a
				1080p video, when it is buffering every 5s.
			</p>
			<p>
				Instead, I watch my videos in 720p. This is not a huge issue for me,
				because I don't watch videos where graphics are that important.
			</p>
			<p>
				<em>
					It is important to note that all of those said things are only
					happening currently at the time of writing. Those things may be fixed
					in the future.
				</em>
			</p>
			<PostHeading level={2} id="should-you-use-freetube">
				Should You Use FreeTube
			</PostHeading>
			<p>
				<strong>Yes!!</strong>
			</p>
			<p>
				All in all, it is a really solid alternative to the YouTube website. It
				is faster than the official YouTube site, (in my opinion) looks better,
				and (the best part) is not tracking you. The last point (not tracking)
				alone would be reason enough to use it for me.
			</p>
			<MigrationChecklist />
			<PostHeading level={2} id="how-to-install-freetube">
				How to Install FreeTube
			</PostHeading>
			<p>
				{
					"If you want to see the newest/up-to-date installation methods, be sure to check out "
				}
				<a href="https://freetubeapp.io/" target="_blank" rel="noreferrer">
					FreeTube's Website!
				</a>
			</p>
		</Prose>
	);
}
