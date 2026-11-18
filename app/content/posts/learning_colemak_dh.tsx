import { PostHeading, Prose } from "~/components/post/prose";
import {
	LayoutFigure,
	LearningCurve,
} from "~/content/experiences/learning_colemak_dh";

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="what-is-colemak-dh">
				What Is Colemak DH
			</PostHeading>
			<p>
				<a
					href="https://colemakmods.github.io/mod-dh/keyboards.html"
					target="_blank"
					rel="noreferrer"
				>
					Colemak DH
				</a>
				{
					" is a keyboard layout. It is a slightly modified version of Colemak that aims to improve typing efficiency and ergonomics."
				}
			</p>
			<PostHeading level={2} id="why-learn-another-layout">
				Why Learn Another Layout?
			</PostHeading>
			<p>
				{
					"I decided to learn a new keyboard layout because I had some free time and was experiencing pain in both arms. Additionally, my arms would occasionally fall asleep. Although I went to the hospital and was told it was "
				}
				<code>{"nothing harmful"}</code>, I noticed that taking breaks from
				Computer usage alleviated the pain.
			</p>
			<p>
				To address these issues, I made the choice to: Invest in a split
				keyboard. Switch to Colemak DH.
			</p>
			<PostHeading level={2} id="why-colemak-dh-though">
				Why Colemak DH Though?
			</PostHeading>
			<p>
				Colemak DH appealed to me because it is known for its all-around
				efficiency and ergonomic benefits. Unlike some other layouts, it is a
				relatively modern design that offers improvements over traditional
				layouts like QWERTY.
			</p>
			<p>
				Furthermore, Colemak DH retains enough similarity to QWERTY, making it
				easier to learn and adapt to the new layout.
			</p>
			<LayoutFigure />
			<PostHeading level={2} id="how-was-the-learning-process">
				How Was the Learning Process?
			</PostHeading>
			<p>
				During the Learning process, which has spanned around 20 hours of
				practice, I have used the Colemak DH layout for normal typing tasks and
				also on "typing learn" sites.
			</p>
			<p>
				Initially, I practiced around one hour every day, but due to time
				constraints, I have been averaging 2-4 hours once a week, which is not
				ideal for efficient learning.
			</p>
			<LearningCurve />
			<p>
				Currently, I can achieve a typing speed of around 65-70 WPM on
				Monkeytype using 50 words, all lowercase, and no punctuation. Before
				switching to Colemak DH, I was typing at around 100 WPM.
			</p>
			<p>
				It's worth noting that I switched to a split keyboard, which helped
				facilitate the learning process. Surprisingly, adapting to the new
				layout felt like relearning typing entirely, as I had never previously
				used all ten fingers to type. This allowed me to break old habits and
				embrace the new layout more easily.
			</p>
			<PostHeading level={2} id="how-does-typing-feel-on-colemak-dh">
				How Does Typing Feel on Colemak DH?
			</PostHeading>
			<p>
				Typing on Colemak DH feels amazing. The layout eliminates the need to
				move my fingers more than one row, resulting in a more natural typing
				experience.
			</p>
			<p>
				Thanks to the switch to Colemak DH and the use of a split keyboard, my
				pain and the issue of my arms falling asleep have completely
				disappeared. The split keyboard design has played a significant role in
				improving my ergonomics. I highly recommend checking out my post on
				split keyboards to learn more about their benefits.
			</p>
			<p>
				Overall, typing on Colemak DH requires minimal hand movement, making it
				a highly efficient and comfortable layout.
			</p>
			<PostHeading level={2} id="can-you-still-type-on-a-normal-layout">
				Can You Still Type on a Normal Layout?
			</PostHeading>
			<p>
				Yes, I can still type on a "normal" layout. I have used the QWERTY
				layout on other computers while Learning, which kept the muscle memory
				of typing on QWERTY alive.
			</p>
			<p>
				However, I have noticed a decrease in typing speed when using QWERTY
				since switching to Colemak DH. After a few minutes of practice, I can
				regain my old speed, but it's clear that using Colemak DH has influenced
				my muscle memory.
			</p>
			<p>
				It's difficult to say how it would be if I had solely used Colemak DH
				without switching back to the QWERTY layout.
			</p>
			<PostHeading level={2} id="would-i-recommend-learning-colemak-dh">
				Would I Recommend Learning Colemak DH?
			</PostHeading>
			<p>
				That depends on your willingness to learn something new and the time you
				can invest. If you enjoy Learning and have the free time, I highly
				recommend giving
			</p>
			<p>Colemak DH a try.</p>
			<p>
				It's important to fully commit to the switch and not revert to your old
				layout.
			</p>
			<p>Embracing the new layout will yield the best results.</p>
			<p>
				If you are experiencing any pain issues, I suggest considering a split
				keyboard as well. This has been instrumental in relieving my own pain.
				Additionally, consulting with a doctor is essential. Don't solely rely
				on advice from the internet.
			</p>
			<p>
				If you're aiming to increase your typing speed, Colemak DH could be
				worth the investment of 20+ hours of learning.
			</p>
			<PostHeading level={2} id="which-typing-sites-did-i-use">
				Which Typing Sites Did I Use?
			</PostHeading>
			<p>
				{"To learn typing with Colemak DH, I initially used "}
				<a href="https://keybr.com" target="_blank" rel="noreferrer">
					KeyBR
				</a>
				{
					" to practice touch typing and familiarize myself with the key positions. Once I became proficient with every key, I switched to "
				}
				<a href="https://monkeytype.com" target="_blank" rel="noreferrer">
					Monkeytype
				</a>
				.
			</p>
			<p>
				I prefer Monkeytype because of its user-friendly interface and
				comprehensive statistics. The modern look and feel of the site align
				with my preferences.
			</p>
			<p>
				However, the choice of typing site may vary based on personal
				preference.
			</p>
			<PostHeading level={2} id="conclusion">
				Conclusion
			</PostHeading>
			<p>
				Learning Colemak DH has been an interesting journey. It involved
				relearning typing from scratch, but the benefits of improved efficiency
				and ergonomics outweigh the time invested in Learning.
			</p>
			<p>
				I would definitely choose to learn Colemak DH again if I had the chance.
			</p>
			<p>
				Although I haven't reached my previous typing speeds yet, I'm actively
				working on it. With consistent practice and dedication, I believe I will
				regain my speed and even surpass it.
			</p>
		</Prose>
	);
}
