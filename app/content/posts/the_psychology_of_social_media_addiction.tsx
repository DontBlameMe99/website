import { PostHeading, Prose } from "~/components/post/prose";
import {
	MinimalPhone,
	RewardLoop,
	SlotMachine,
} from "~/content/experiences/the_psychology_of_social_media_addiction";
import type { Section } from "~/lib/post_types";

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="what-is-a-social-media-addiction">
				What Is a Social Media Addiction?
			</PostHeading>
			<p>
				{
					"Social media is as popular as never before. Mindlessly scrolling through "
				}
				<strong>TikTok</strong>
				{", "}
				<strong>Instagram</strong>
				{", "}
				<strong>Facebook</strong>
				{", or other sites is something you can see "}
				<strong>everywhere</strong>. In the bus, train or heck even while you
				are walking down a street?
			</p>
			<p>
				<strong>Important to note:</strong>
				{
					" I am not saying that a normal use of social media is bad. In my opinion it's unnecessary and a waste of time. But that is only my "
				}
				<strong>personal opinion</strong>
				{". Normal use of social media can be "}
				<strong>completely fine</strong>
				{" in your life."}
			</p>
			<p>
				{"It begins to get problematic when you are one of the "}
				<strong>5-10%</strong>
				{" of Americans which meet the criteria for a "}
				<strong>social media addiction</strong>.
			</p>
			<p>
				{
					"Social media is a behavioral addiction. This means that you are concerned about the current social media state and get an uncontrollable urge to log on / use social media, and devote so much time that it impairs other important areas of your life. "
				}
				<strong>Note:</strong>
				{
					" This does not mean than you're staying home doing nothing else and are close to getting homeless."
				}
			</p>
			<p>
				You may also feel a discomfort when you are not able to check your
				social media (e.g. Your battery is empty and / or you have no charger).
			</p>
			<PostHeading
				level={3}
				id="those-are-some-scary-statistics-to-get-your-attention"
			>
				Those Are Some Scary Statistics to Get Your Attention
			</PostHeading>
			<ul>
				<li>
					{"Estimates suggest that more than "}
					<strong>210 million</strong>
					{
						" people worldwide suffer from addiction to social media and the internet. (Science Direct)"
					}
				</li>
				<li>
					{"Symptoms of "}
					<strong>depression</strong>
					{" are twice as likely to appear in "}
					<strong>teens</strong>
					{" who spend five to seven hours a day on their smartphones. (NPR)"}
				</li>
				<li>
					{"Not being on social media causes the "}
					<strong>fear of missing out</strong>
					{" in 34% of young adults. (CBS)"}
				</li>
				<li>
					{"Checking social media while driving happens to "}
					<strong>55%</strong>
					{" of drivers. (Shop Owner Mag)"}
				</li>
				<li>
					<strong>43%</strong>
					{" of teenagers feel bad if no one likes their post. (Statista)"}
				</li>
				<li>
					<strong>71%</strong>
					{
						" of all Americans log in to check their Facebook on a daily basis. (Pew Research Center)"
					}
				</li>
				<li>
					{
						"By 2025, the monthly number of active social network users is expected to reach "
					}
					<strong>4.41 billion</strong>
				</li>
				<li>
					{"Social media is currently home to nearly "}
					<strong>58.5%</strong>
					{" of the world population"}
				</li>
				<li>
					{"Social media sees some teens spending more than "}
					<strong>seven hours</strong>
					{" each day logged in."}
				</li>
			</ul>
			<PostHeading level={2} id="but-why-is-social-media-so-addictive">
				But Why Is Social Media So Addictive?
			</PostHeading>
			<p>
				{
					"Great question. It is so addictive because the sites you use provide you with dopamine. Some platforms such as "
				}
				<strong>Facebook</strong>
				{", "}
				<strong>Snapchat</strong>
				{", "}
				<strong>Instagram</strong>
				{", and "}
				<strong>TikTok</strong>
				{" produce the same neural circuity that is caused by "}
				<strong>gambling and recreational drugs</strong>
				{" to keep consumers using their products "}
				<strong>as much as possible</strong>.
			</p>
			<RewardLoop />
			<p>
				{
					"Those sites cause your brain's reward area to trigger the same way as it would trigger when you consume "
				}
				<strong>cocaine</strong>
				{" as an example."}
			</p>
			<SlotMachine />
			<PostHeading level={2} id="social-media-and-mental-health">
				Social Media and Mental Health
			</PostHeading>
			<p>
				{
					"Researchers have found out that there is an undeniable link between social media use and "
				}
				<strong>negative mental health</strong>
				{
					". Using social media frequently can make people feel isolated and unhappy. (Especially woman) Some people also compare themselves with some social media stars. This can lead to the "
				}
				<strong>wish to look like them</strong>
				{". But what those young kids don't know: They are using "}
				<strong>filters</strong>
				{", "}
				<strong>effects</strong>
				{" and "}
				<strong>editing</strong>
				{
					" to look like this. This causes a brain development where you think that "
				}
				<strong>this</strong>
				{
					" is the new natural. Some people even go as far as getting some beauty surgeries done just to look like the "
				}
				<strong>ideal human</strong>.
			</p>
			<p>
				{
					"Excessive social media use can not only make you unhappy but can also cause "
				}
				<strong>anxiety</strong>
				{" and "}
				<strong>depression</strong>
				{". If you are constantly comparing yourself to someone who "}
				<strong>doesn't even look like this in the real life</strong>
				{" makes you feel bad."}
			</p>
			<PostHeading level={2} id="personal-opinion-wasted-time">
				Personal Opinion: Wasted Time
			</PostHeading>
			<p>
				This is something which bothers me personally. Imagine yourself like
				this:
			</p>
			<div className="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Where</th>
							<th>Doing what</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>At Home</td>
							<td>Using social media / your phone</td>
						</tr>
						<tr>
							<td>In the bus / car</td>
							<td>Using social media / your phone</td>
						</tr>
						<tr>
							<td>Before / after sleeping</td>
							<td>Using social media / your phone</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				And maybe sometimes you even sit with others and instead of talking you
				use your phone.
			</p>
			<p>
				{
					"Your entire life's content is just social media. When was the last time you took yourself like 10 minutes and did nothing? "
				}
				<strong>In a world where everything gets faster and faster?</strong>
				{
					" Or when was the last time you talked with some people and had a great time "
				}
				<strong>without</strong>
				{" looking at your smartphone every 10 minutes?"}
			</p>
			<p>
				{"This is just sad in my opinion. Here is the thought which "}
				<strong>changed my way to think about this</strong>:
			</p>
			<p>
				<strong>
					When at some point all the people you love are gone. What will your
					memories be? The times you and them spent at the phone? What was the
					last nice memory you had?
				</strong>
			</p>
			<p>Thinking about this reminded me of what is important.</p>
			<p>
				{"Today the only social network I "}
				<strong>sometimes</strong>
				{" use is "}
				<a
					href={"https://fosstodon.org/@DontBlameMe"}
					target="_blank"
					rel="noreferrer"
				>
					Mastodon
				</a>
				{
					" (and YouTube / Twitch if that counts as a social network for you ;))"
				}
			</p>
			<p>
				{
					"For me it was really shocking. In the past I used my phone while I was sitting in the bus / train. But since I stopped using social media, I looked around while sitting in the bus. And this is insane. Maybe the next time you are sitting in the bus take a look around. (At least where I am living at) nearly "
				}
				<strong>everybody</strong>
				{" (I would say "}
				<strong>93%</strong>) are holding their phone. Isn't this insane?
			</p>
			<p>
				This feels so weird when you look around and are surrounded by these
				people looking like some robots doing the exact same thing over and over
				again.
			</p>
			<p>
				{
					"Recently it also started that I noticed (possibly only recently because I started looking for it) more and more people walking around with their phone in their hand. "
				}
				<em>What the f</em>ck?
				<em>
					{
						" You are missing so much beautiful stuff? I mean I love looking around when walking. There is so much stuff to see "
					}
				</em>
				<em>and to miss</em>*.
			</p>
			<p>
				I also saw someone every day doing the same. Walking to their school
				with a phone and headphones and back, too. This is so weird.
			</p>
			<p>
				{
					"In my opinion this entire phone stuff is really scary and creepy once you really get your head around it. "
				}
				<strong>No I'm not saying get rid of your phones!!</strong>
				{" I personally have a phone. It is a "}
				<strong>really awesome tool</strong>
				{". But what I would love to see is more people "}
				<strong>thinking about what they do</strong>
				{". For most people their entire life only consists only of getting "}
				<strong>the most likes</strong>. This is sad.
			</p>
			<PostHeading level={2} id="but-what-can-i-do-about-it">
				But What Can I Do About It?
			</PostHeading>
			<p>Simple answer: Just use it less.</p>
			<p>
				{
					"Complicated answer: You maybe need some help. Getting rid of an addiction is "
				}
				<strong>not easy</strong>
				{". Don't be ashamed to "}
				<strong>talk about it</strong>
				{" and get "}
				<strong>help</strong>.
			</p>
			<p>
				{
					"What can help too (to reduce usage) is to make your Phone a non-social-media Phone. Simply delete "
				}
				<strong>every social media app</strong>
				{" and "}
				<strong>thing you don't need</strong>. Then only use it on your Computer
				(But not as much as on your Phone before, obviously). Basically you make
				your Phone a "minimal" Phone. This is also what
			</p>
			<p>
				<strong>I have done</strong>. As an example those are the things I have
				on my Phone:
			</p>
			<ul>
				<li>Web Browser</li>
				<li>Flip Card learning application</li>
				<li>Messaging</li>
				<li>
					E-mail (But no spam / public E-mails. This means only one E-mail maybe
					every 2 weeks)
				</li>
				<li>Calendar</li>
			</ul>
			<p>
				{"And that is basically it. You don't need your "}
				<strong>3-5 PAGES</strong>
				{" of apps."}
			</p>
			<MinimalPhone />
			<p>
				{'An advantage of "debloating" / making your phone minimal: '}
				<strong>Your battery will last much longer</strong>.
			</p>
			<PostHeading level={2} id="sources">
				Sources
			</PostHeading>
			<p>The sources I used are:</p>
			<ul>
				<li>
					<a
						href="https://truelist.co/blog/social-media-addiction-statistics/"
						target="_blank"
						rel="noreferrer"
					>
						Truelist
					</a>
				</li>
				<li>
					<a
						href="https://www.addictioncenter.com/drugs/social-media-addiction/"
						target="_blank"
						rel="noreferrer"
					>
						Addiction Center
					</a>
				</li>
			</ul>
		</Prose>
	);
}

export const sections: Section[] = [
	{
		id: "what-is-a-social-media-addiction",
		text: "What Is a Social Media Addiction?",
		level: 2,
	},
	{
		id: "those-are-some-scary-statistics-to-get-your-attention",
		text: "Those Are Some Scary Statistics to Get Your Attention",
		level: 3,
	},
	{
		id: "but-why-is-social-media-so-addictive",
		text: "But Why Is Social Media So Addictive?",
		level: 2,
	},
	{
		id: "social-media-and-mental-health",
		text: "Social Media and Mental Health",
		level: 2,
	},
	{
		id: "personal-opinion-wasted-time",
		text: "Personal Opinion: Wasted Time",
		level: 2,
	},
	{
		id: "but-what-can-i-do-about-it",
		text: "But What Can I Do About It?",
		level: 2,
	},
	{ id: "sources", text: "Sources", level: 2 },
];
