import { PostHeading, Prose } from "~/components/post/prose";
import {
	AdaptationFigure,
	LayersFigure,
	MoonlanderFigure,
	Stance,
} from "~/content/experiences/learning_to_use_a_split_keyboard";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Learning to use a split keyboard",
	date: "2023-06-16",
	summary:
		"Two halves of a keyboard, a few weeks of confusion, and shoulders that finally stopped complaining. A practical account of switching.",
	tags: ["keyboard", "health", "ergonomics"],
	accent: "peach",
	words: 1297,
	minutes: 6,
} satisfies PostMeta;

export const sections: Section[] = [
	{
		id: "why-would-you-use-a-split-keyboard",
		text: "Why Would You Use a Split Keyboard?",
		level: 2,
	},
	{
		id: "advantages-of-using-a-split-keyboard",
		text: "Advantages of Using a Split Keyboard",
		level: 3,
	},
	{ id: "ergonomics", text: "Ergonomics", level: 4 },
	{ id: "customization", text: "Customization", level: 4 },
	{ id: "ortholinear-lay-out", text: "Ortholinear Lay Out", level: 4 },
	{ id: "hot-swappable-switches", text: "Hot-Swappable Switches", level: 4 },
	{
		id: "build-quality-and-durability",
		text: "Build Quality and Durability",
		level: 4,
	},
	{ id: "portability", text: "Portability", level: 4 },
	{ id: "qmk-firmware", text: "QMK Firmware", level: 4 },
	{ id: "the-keyboard-i-chose", text: "The Keyboard I Chose", level: 2 },
	{
		id: "why-did-i-choose-this-keyboard",
		text: "Why Did I Choose This Keyboard?",
		level: 3,
	},
	{ id: "the-zsa-moonlander", text: "The ZSA Moonlander", level: 3 },
	{ id: "cost-comparison", text: "Cost Comparison", level: 3 },
	{ id: "would-i-buy-it-again", text: "Would I Buy It Again?", level: 3 },
	{ id: "learning-and-adaptation", text: "Learning and Adaptation", level: 2 },
	{ id: "learning-experience", text: "Learning Experience", level: 3 },
	{ id: "time-taken-to-learn", text: "Time Taken to Learn", level: 3 },
	{ id: "recommendation", text: "Recommendation", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<Stance />
			<PostHeading level={2} id="why-would-you-use-a-split-keyboard">
				Why Would You Use a Split Keyboard?
			</PostHeading>
			<p>
				A split keyboard offers several advantages over traditional keyboards,
				making it a popular choice for those seeking ergonomic benefits,
				customization options, and improved typing experience. I specifically
				chose it because of my already existing pain I had in my arms.
			</p>
			<PostHeading level={3} id="advantages-of-using-a-split-keyboard">
				Advantages of Using a Split Keyboard
			</PostHeading>
			<p>
				Using a Split Keyboard has lots of advantages. Below you can find some
				of them.
			</p>
			<PostHeading level={4} id="ergonomics">
				Ergonomics
			</PostHeading>
			<p>
				One of the primary reasons to use a split keyboard is its ergonomic
				design. The split layout allows you to position the two halves of the
				keyboard shoulder-width apart, reducing strain on your wrists, arms, and
				Shoulders. This positioning promotes a more natural and comfortable
				typing posture, potentially minimizing the risk of repetitive strain
				injuries (
				<a
					href="https://en.wikipedia.org/wiki/Repetitive_strain_injury"
					target="_blank"
					rel="noreferrer"
				>
					RSI
				</a>
				{") such as "}
				<a
					href="https://en.wikipedia.org/wiki/Carpal_tunnel_syndrome"
					target="_blank"
					rel="noreferrer"
				>
					carpal tunnel syndrome
				</a>
				.
			</p>
			<PostHeading level={4} id="customization">
				Customization
			</PostHeading>
			<p>
				Split keyboards often come with programmable keys and layers, providing
				extensive customization options. You can remap keys, create macros, and
				configure layers to suit your specific needs and workflow. This level of
				customization allows you to optimize the keyboard layout according to
				your preferences, increasing Productivity and efficiency.
			</p>
			<PostHeading level={4} id="ortholinear-lay-out">
				Ortholinear Lay Out
			</PostHeading>
			<p>
				Unlike traditional keyboards with a staggered layout, split keyboards
				often feature an Ortholinear lay out. In an Ortholinear lay out, the
				keys are aligned in a grid pattern, reducing finger movement and making
				it easier to reach keys accurately. This arrangement can improve typing
				accuracy and reduce finger strain, especially when transitioning from a
				non-Ortholinear lay out.
			</p>
			<PostHeading level={4} id="hot-swappable-switches">
				Hot-Swappable Switches
			</PostHeading>
			<p>
				Many split keyboards offer hot-swappable switch functionality, allowing
				you to change switches without soldering. This feature enables you to
				experiment with different switch types, such as linear, tactile, or
				clicky switches, to find the ones that best suit your typing preferences
				and needs. Switch swapping can be a straightforward process, providing
				flexibility and customization options.
			</p>
			<PostHeading level={4} id="build-quality-and-durability">
				Build Quality and Durability
			</PostHeading>
			<p>
				Split keyboards are known for their high build quality and durability.
				They are often constructed using premium materials and components,
				ensuring longevity and withstanding heavy daily use. Investing in a
				well-built split keyboard can provide a reliable typing tool that will
				serve you for years to come.
			</p>
			<PostHeading level={4} id="portability">
				Portability
			</PostHeading>
			<p>
				The split design of keyboards offers an additional advantage in terms of
				portability. These keyboards can be easily disassembled into two smaller
				pieces, making them more convenient to carry in a bag or backpack while
				traveling. The compact size and ease of disassembly make them suitable
				for users who are frequently on the go.
			</p>
			<PostHeading level={4} id="qmk-firmware">
				QMK Firmware
			</PostHeading>
			<p>
				Split keyboards often utilize the QMK firmware, an open-source keyboard
				firmware renowned for its versatility and customization options. QMK
				firmware allows you to program and customize your keyboard's behavior,
				including key mappings, layers, macros, and advanced features. This
				flexibility ensures compatibility with various operating systems and
				empowers users to tailor their typing experience to their liking.
			</p>
			<PostHeading level={2} id="the-keyboard-i-chose">
				The Keyboard I Chose
			</PostHeading>
			<p>
				{"I chose to get my hands on the "}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				. Below you can find out why.
			</p>
			<PostHeading level={3} id="why-did-i-choose-this-keyboard">
				Why Did I Choose This Keyboard?
			</PostHeading>
			<p>
				I chose to get my hands on a split keyboard because of mainly three
				reasons:
			</p>
			<ul>
				<li>
					{"The pain I had, already discussed in my "}
					<a
						href="https://dontblameme.fun/posts/learning-colemak/"
						target="_blank"
						rel="noreferrer"
					>
						Learning Colemak DH Post
					</a>
				</li>
				<li>Simply the interest of Learning something</li>
				<li>Learning to type with ten fingers</li>
			</ul>
			<PostHeading level={3} id="the-zsa-moonlander">
				The ZSA Moonlander
			</PostHeading>
			<MoonlanderFigure />
			<p>
				{"I chose to get the "}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{
					" split keyboard. Mainly because of the popularity of the Keyboard and the ease of use."
				}
			</p>
			<p>Just order and that's it.</p>
			<PostHeading level={3} id="cost-comparison">
				Cost Comparison
			</PostHeading>
			<p>
				{
					"Compared to other split keyboards, especially self-built boards, the "
				}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{
					" is on the higher end in terms of price. It costs around $500, which may seem expensive for two half keyboards. There are cheaper alternatives available, especially for those who are willing to build their own split keyboards. However, considering the learning curve and the convenience of having a prebuilt keyboard with advanced features, the investment in the "
				}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{" was worth it for me."}
			</p>
			<p>
				{
					"If I had the knowledge I have now, I might have considered purchasing one of the more affordable self-built split keyboards. However, as a beginner in the world of split keyboards, I found it beneficial to start with a well-designed, prebuilt option like the "
				}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				. It allowed me to explore the advantages of a split keyboard without
				the additional challenge of building one myself.
			</p>
			<PostHeading level={3} id="would-i-buy-it-again">
				Would I Buy It Again?
			</PostHeading>
			<p>
				{
					"Knowing what I know now and having experienced the benefits of using a split keyboard, if I were to go back in time, I might consider exploring the option of building a split keyboard Myself to save on costs. However, considering my initial goals of alleviating pain and Learning something new, I still believe the investment in the "
				}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{
					" was worth it for me. The convenience, ergonomics, and customization options provided by the keyboard have significantly improved my typing experience and overall comfort."
				}
			</p>
			<p>
				{"In conclusion, while there are cheaper alternatives available, the "}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{
					" offered the perfect balance of ergonomics, customization, and convenience for my needs at the time. It served as an excellent entry point into the world of split keyboards and provided a solid foundation for my typing journey."
				}
			</p>
			<PostHeading level={2} id="learning-and-adaptation">
				Learning and Adaptation
			</PostHeading>
			<p>
				Learning to use a split keyboard can be a unique experience, especially
				if you are transitioning from a traditional keyboard or have never typed
				with ten fingers before. However, with some practice and dedication,
				most users can adapt to the split style relatively quickly.
			</p>
			<PostHeading level={3} id="learning-experience">
				Learning Experience
			</PostHeading>
			<LayersFigure />
			<p>
				Initially, using a split keyboard may feel unfamiliar and require an
				adjustment period. The split design and tilted halves might take some
				getting used to, as you learn to position your hands correctly and find
				a comfortable angle.
			</p>
			<p>
				However, many users report that the split layout feels more natural and
				ergonomic once they adapt to it.
			</p>
			<p>
				The challenge often lies in Learning to navigate the multiple layers and
				efficiently utilize the programmable keys. While the split keyboard
				offers customization options, setting up and memorizing the various
				layers and key mappings can take time and patience. It's essential to
				invest time in understanding the layers' organization and determining
				the most effective layout for your specific needs.
			</p>
			<PostHeading level={3} id="time-taken-to-learn">
				Time Taken to Learn
			</PostHeading>
			<AdaptationFigure />
			<p>
				The time required to learn the split style varies from person to person.
				For me it took around 3 to 6 hours to become comfortable with the split
				keyboard.
			</p>
			<p>
				Notably, prior experience with touch typing can be advantageous, as it
				helps to adapt to the split layout more quickly.
			</p>
			<p>
				It's important to note that the learning process doesn't end with basic
				proficiency. As you continue to use the split keyboard, you will likely
				discover new ways to optimize your workflow, customize your layout, and
				enhance your typing speed and accuracy.
			</p>
			<PostHeading level={2} id="recommendation">
				Recommendation
			</PostHeading>
			<p>
				Whether a split keyboard is the right choice for you depends on various
				factors, including your individual needs, preferences, and willingness
				to adapt. Here are some considerations to help you make an informed
				decision:
			</p>
			<p>
				If you experience discomfort or pain while typing on a traditional
				keyboard, a split keyboard's ergonomic design can provide relief and
				prevent potential injuries.
			</p>
			<p>
				If you value customization and want to tailor your keyboard layout to
				match your workflow and programming needs, a split keyboard with
				programmable keys and layers offers extensive customization options.
			</p>
			<p>
				If you desire improved typing accuracy and reduced finger movement, the
				Ortholinear lay out of split keyboards can enhance your typing
				experience.
			</p>
			<p>
				If you enjoy experimenting with different switch types or want the
				freedom to swap switches easily, a split keyboard with hot-swappable
				switches allows for customization and personalization.
			</p>
			<p>
				If you prioritize portability and need a keyboard that can be easily
				carried while traveling, the compact and disassemble design of split
				keyboards makes them a convenient choice.
			</p>
			<p>
				Considering the learning curve and adaptation period, it's important to
				be prepared to invest time in familiarizing yourself with the split
				keyboard and its customization features. However, the potential benefits
				in terms of ergonomics, customization, and workflow optimization make it
				a worthwhile investment for many users.
			</p>
			<p>
				{
					"Ultimately, the decision to use a split keyboard depends on your personal circumstances and preferences. If you type extensively, prioritize ergonomics, seek customization options, and are willing to adapt to a new layout, a split keyboard like the "
				}
				<a
					href="https://www.zsa.io/moonlander/buy"
					target="_blank"
					rel="noreferrer"
				>
					ZSA Moonlander
				</a>
				{
					" could significantly enhance your typing experience and overall productivity."
				}
			</p>
		</Prose>
	);
}
