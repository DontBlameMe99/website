import type { Section } from "~/lib/post_types";
import { PostHeading, Prose } from "~/components/post/prose";
import { IdentitySplit } from "~/content/experiences/becoming_private_online";

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="privacy-what-is-this">
				Privacy? What Is This?
			</PostHeading>
			<p>
				{"Privacy is a general concept. It means that "}
				<strong>you</strong>
				{" care about what is "}
				<strong>public or available about you</strong>
				{". This includes things "}
				<strong>Google</strong>
				{" or "}
				<strong>TikTok</strong>
				{" knows about you."}
			</p>
			<PostHeading
				level={3}
				id="but-why-care-about-privacy-i-have-nothing-to-hide"
			>
				But Why Care About Privacy? I Have Nothing to Hide?
			</PostHeading>
			<p>
				This is a common sentence. Nearly everybody confronted with Privacy says
				that.
			</p>
			<p>
				<a href="https://youtu.be/0aXIXozAsOE" target="_blank" rel="noreferrer">
					This is a good video explaining why you should care.
				</a>
			</p>
			<p>
				<strong>TLDR:</strong>
				{" You have something to hide. And even if you think you are doing "}
				<strong>nothing</strong>
				{" which someone else could "}
				<strong>understand wrong</strong>, the rules might change. And then you
				will maybe regret publishing your resource number X.
			</p>
			<PostHeading
				level={3}
				id="okay-so-should-i-delete-everything-and-move-in-the-woods"
			>
				Okay. So Should I Delete Everything and Move in the Woods?
			</PostHeading>
			<p>
				{"Yes. You can do this. "}
				<strong>But really. Who would want this?</strong>
				{" There are some basic and "}
				<strong>easy</strong>
				{" things everybody could implement."}
			</p>
			<p>
				<strong>You will never achieve 100% Privacy though</strong>.
			</p>
			<PostHeading level={2} id="first-steps">
				First Steps
			</PostHeading>
			<p>
				{"Glad you want to read the first steps you could take to achieve "}
				<strong>some level</strong>
				{" of Privacy."}
			</p>
			<PostHeading level={3} id="changing-your-search-engine">
				Changing Your Search Engine
			</PostHeading>
			<p>
				<strong>WHHAAAT???</strong>
				{
					" Yes I know this is what you will think. But honestly: Google can see everything you search for. Collect it. "
				}
				<a
					href="https://www.cnet.com/news/privacy/google-is-giving-data-to-police-based-on-search-keywords-court-docs-show/"
					target="_blank"
					rel="noreferrer"
				>
					Use it against you
				</a>
				{" or "}
				<a
					href="https://www.dailydot.com/debug/police-search-internet-history-browser-history-rights/"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				{
					" (If you don't trust these sources, search it on your own. There are tons of cases)."
				}
			</p>
			<p>
				{"Okay so I should maybe care about what "}
				<strong>Google</strong>
				{" knows about me. But..."}
			</p>
			<p>
				<strong>Aren't all the other search engines bad and dated?</strong>
			</p>
			<p>
				{
					"No. They are not. I will now provide you with a small list of search engines you could use. "
				}
				<strong>But remember:</strong>
				{
					' What is "the best" constantly changes. If you are reading this in 3 months, it maybe changed completely. You can check out '
				}
				<a
					href="https://privacyguides.org/en/search-engines"
					target="_blank"
					rel="noreferrer"
				>
					this Website
				</a>
				{
					", but be aware: They accept sponsors and sometimes get paid. They also had some scandals. You can also use "
				}
				<a href="https://alternativeto.net" target="_blank" rel="noreferrer">
					this Website
				</a>
				{" to find alternatives to your current things."}
			</p>
			<p>Here are some good search engines:</p>
			<ul>
				<li>
					<a href="https://search.brave.com" target="_blank" rel="noreferrer">
						Brave Search
					</a>
				</li>
				<li>
					<a
						href="https://github.com/searxng/searxng"
						target="_blank"
						rel="noreferrer"
					>
						SearXNG
					</a>
				</li>
				<li>
					<a
						href="https://github.com/searx/searx"
						target="_blank"
						rel="noreferrer"
					>
						SearX
					</a>
				</li>
				<li>
					<a
						href="https://github.com/benbusby/whoogle-search"
						target="_blank"
						rel="noreferrer"
					>
						Whoogle
					</a>
				</li>
				<li>
					<a href="https://duckduckgo.com/" target="_blank" rel="noreferrer">
						DuckDuckGo
					</a>
				</li>
			</ul>
			<PostHeading level={3} id="becoming-aware">
				Becoming Aware
			</PostHeading>
			<p>
				{"This may be one of the most important steps at all. You need to "}
				<strong>understand</strong>
				{" why Privacy is important. You need to "}
				<strong>care</strong>
				{
					" about it. If you simply follow these steps and use Instagram Threads next week and post your entire life, sorry, but "
				}
				<strong>you missed the point</strong>.
			</p>
			<p>
				<strong>Of course</strong>
				{
					" you can do this. It is your life. What I want you to understand is the concept "
				}
				<strong>why</strong>
				{" privacy matters. If you "}
				<strong>want to use Instagram Threads</strong>
				{" and you are fine with what you are exposing, go ahead."}
			</p>
			<PostHeading level={3} id="using-available-settings">
				Using Available Settings
			</PostHeading>
			<p>
				Please go inside every application you have and check their Privacy
				settings.
			</p>
			<p>
				{
					"Maybe you can disable some data collection in there. This is at least a little step in the right direction! (This includes your "
				}
				<strong>Windows</strong>
				{" settings and apps!)"}
			</p>
			<PostHeading level={3} id="deleting-old-accounts">
				Deleting Old Accounts
			</PostHeading>
			<p>
				This is something you should always do. If you don't need the Account
				anymore, delete it.
			</p>
			<p>
				<strong>But why?</strong>
				{
					" Because every Account you leave open is a security risk. Someone could hack it using your password (you possibly reuse everywhere)."
				}
			</p>
			<PostHeading level={3} id="don-t-reuse-passwords">
				Don't Reuse Passwords
			</PostHeading>
			<p>
				{"Yes this is maybe not fitting. But I want to mention it. "}
				<strong>Please for god's sake don't reuse your passwords!</strong>
				{" Use a password manager. Don't use a system you thought of. Simply "}
				<strong>use a password manager!</strong>
			</p>
			<p>Good Password managers include:</p>
			<ul>
				<li>
					<a href="https://bitwarden.com/" target="_blank" rel="noreferrer">
						Bitwarden
					</a>
					{" (Online)"}
				</li>
				<li>
					<a href="https://keepassxc.org/" target="_blank" rel="noreferrer">
						KeePassXC
					</a>
					{" (Offline)"}
				</li>
			</ul>
			<PostHeading level={3} id="be-careful-with-vpns">
				Be Careful with VPNs
			</PostHeading>
			<p>
				{"Yes I know what they say in their advertisements: "}
				<strong>
					Now it also blocks malware, trackers, and your old girlfriend from
					contacting you!
				</strong>
				{" Ah yes, and we "}
				<strong>definitely don't collect any data ;)</strong>.
			</p>
			<p>
				Seriously: Do you believe that pile of sh
				<em>
					{
						"t? This is complete nonsense. Yeah, maybe it blocks you from downloading some stuff by "
					}
				</em>
				<em>analyzing your traffic on their servers</em>*. Oh wow, really
				private, isn't is?
			</p>
			<p>
				And yes, most of them collect data. Just search up "X VPN, Scandal". So
				please be careful.
			</p>
			<p>
				{"An exception is "}
				<strong>Mullvad</strong>
				{". They allow you to pay with "}
				<strong>cash</strong>
				{", don't even need an E-mail to register and got "}
				<a
					href="https://www.theverge.com/2023/4/21/23692580/mullvad-vpn-raid-sweden-police"
					target="_blank"
					rel="noreferrer"
				>
					raided by police (they got nothing)
				</a>
			</p>
			<PostHeading level={3} id="don-t-share-your-identity">
				Don't Share Your Identity
			</PostHeading>
			<p>
				{
					"This should be common sense, but I'll still write it down. You should "
				}
				<strong>never share Personal information</strong>
				{" online. Not your real name, not your age and "}
				<strong>especially not your Phone number!</strong>
			</p>
			<PostHeading level={2} id="second-steps">
				Second Steps
			</PostHeading>
			<p>
				Now it is becoming a little bit more advanced. But this is still really
				simple.
			</p>
			<PostHeading level={3} id="use-two-factor-authentication">
				Use Two-Factor Authentication
			</PostHeading>
			<p>
				Please just enable this everywhere you can. The Password Managers I
				mentioned have a direct integration with 2FA.
			</p>
			<p>
				{"But please "}
				<strong>don't use your Smartphone (SMS) as 2FA!</strong>
				{
					" This exposes your Phone number to this company (which they can use to track you). And SMS is really insecure."
				}
			</p>
			<p>
				{"Ah, and: "}
				<strong>You don't need to use Google Authenticator!</strong>
				{
					" There are many great open source apps which can do the same. Google just uses it to track you even more."
				}
			</p>
			<PostHeading level={3} id="switching-your-browser">
				{"Switching... Your "}
				<strong>Browser</strong>
			</PostHeading>
			<p>
				Oh, no. This is too much. But I love my chrome!!... Okay. I can
				understand that.
			</p>
			<p>And you can keep your chrome.</p>
			<p>
				<strong>But why should you switch at all?</strong>
			</p>
			<p>
				Ad Blocking. Maybe you have an Ad Blocker already, maybe not. This is
				something you will miss if you have used it once though.
			</p>
			<p>
				{"Privacy. Great reason isn't it? No seriously. Google Chrome sends "}
				<strong>every piece of information it can find</strong>
				{" straight home to "}
				<strong>Google</strong>. This is something I wouldn't like to use
			</p>
			<p>
				{
					"Freedom. Google tries (at least at the moment) to push some seriously concerning stuff. They are currently trying to implement a "
				}
				<strong>global Website DRM</strong>.
			</p>
			<p>
				{"You can: "}
				<strong>Switch to [Brave](https://brave.com/)</strong>
				{". This is a Browser "}
				<strong>based on Chromium</strong>
				{". "}
				<strong>TLDR</strong>
				{
					" It is nearly the same to your chrome. Differences: It looks somewhat different and is Privacy respecting."
				}
			</p>
			<p>
				{"Okay maybe you don't want to use a Browser which has "}
				<a href="https://brave.com/wallet/" target="_blank" rel="noreferrer">
					Cryptocurrency baked in?
				</a>
				{
					" (You can mostly disable it, but I can understand why you wouldn't want to use such things)"
				}
			</p>
			<p>
				{"You can also: "}
				<strong>Use [Mullvad Browser](https://mullvad.net/en/browser)</strong>
				{". This is a Browser created by "}
				<strong>[Tor](https://www.torproject.org/)</strong>
				{" and "}
				<strong>[Mullvad](https://mullvad.net/en)</strong>. Both are well known
				for their upmost security and privacy standards.
			</p>
			<p>
				{"You can also use plain "}
				<a
					href="https://www.mozilla.org/en-US/firefox/new/"
					target="_blank"
					rel="noreferrer"
				>
					Firefox
				</a>
				.
			</p>
			<p>
				{"But you need to change "}
				<strong>a lot of things</strong>
				{
					" to make it somewhat private. So I would much rather use the other solutions."
				}
			</p>
			<p>
				{"Or maybe you want to "}
				<strong>[use Tor directly?](https://www.torproject.org/)</strong>
			</p>
			<p>
				{"Another option would be "}
				<a href="https://librewolf.net/" target="_blank" rel="noreferrer">
					LibreWolf
				</a>
				. This is a good privacy focused Browser too.
			</p>
			<PostHeading level={3} id="finding-alternatives">
				Finding Alternatives
			</PostHeading>
			<p>
				{"If you can and want, you can find "}
				<a href="https://alternativeto.net/" target="_blank" rel="noreferrer">
					alternatives
				</a>
				{
					" for your current applications (which are Open-Source and privacy respecting)."
				}
			</p>
			<PostHeading level={2} id="third-steps">
				Third Steps
			</PostHeading>
			<p>
				This is now becoming more advanced. In here are some things which may
				are too much for you.
			</p>
			<PostHeading level={3} id="using-pseudonyms-and-aliases">
				Using Pseudonyms and Aliases
			</PostHeading>
			<p>
				Wait. But I want that all my friends know me everywhere as
				xXCoolGamer420Xx!!
			</p>
			<p>
				Okay. Thanks for letting me know. But you should seriously use different
				names on different platforms.
			</p>
			<p>
				<strong>But why?</strong>
				{" Because if you do this it is harder for someone trying to "}
				<a
					href="https://en.wikipedia.org/wiki/Doxing"
					target="_blank"
					rel="noreferrer"
				>
					dox
				</a>
				{
					" you to link those accounts. Also, it provides another shield of protection. Why?"
				}
			</p>
			<p>
				Because someone trying out your password on every site does need to know
				the username too.
			</p>
			<PostHeading level={3} id="using-different-throwaway-e-mails">
				Using Different (Throwaway) E-Mails
			</PostHeading>
			<p>
				{"This sounds difficult. "}
				<strong>No you should not create 20 new Gmail Accounts!</strong>
			</p>
			<p>
				{"You can use a service like "}
				<a href="https://addy.io/" target="_blank" rel="noreferrer">
					AnonAddy
				</a>
				{" or "}
				<a href="https://simplelogin.io/" target="_blank" rel="noreferrer">
					Simplelogin
				</a>
				{" to achieve this."}
			</p>
			<p>
				{
					"This also provides another advantage over the point above: When some company gets hacked and your E-Mail gets exposed, you can just delete it. You receive spam? "
				}
				<strong>Just delete the E-mail!</strong>
			</p>
			<IdentitySplit />
			<PostHeading level={3} id="don-t-create-an-account-on-every-website">
				Don't Create an Account on Every Website
			</PostHeading>
			<p>
				Sounds hard, doesn't it? Before creating an Account on website X think
				about it.
			</p>
			<p>Do I need this account?</p>
			<p>Can I achieve it without an account?</p>
			<p>Is it really needed right now?</p>
			<p>And if you really need it, go ahead. Create it.</p>
			<PostHeading level={3} id="read-the-privacy-policy">
				Read the Privacy Policy
			</PostHeading>
			<p>Waiiiiit... WHAT???</p>
			<p>
				{"Yeah, I know. That sounds stupid. "}
				<em>Who reads that sh</em>t?*
			</p>
			<p>No I don't want you to read the entire thing twice and take notes.</p>
			<p>
				{"I want you to look at the essential points: "}
				<strong>
					Which data do they collect? For which reason? What do they do with it?
				</strong>
			</p>
			<p>
				{"This is basically it. "}
				<strong>But why??</strong>
				{" So you know what happens with your data."}
			</p>
			<p>
				What will they do? Will they sell it? This is important to know, at
				least in my opinion.
			</p>
			<PostHeading
				level={3}
				id="switching-to-as-much-open-source-stuff-as-you-can"
			>
				Switching to as Much Open-Source Stuff as You Can
			</PostHeading>
			<p>
				Yeah, this maybe sounds hard. But really: For nearly everything there is
				a good open source alternative (Exception: Gaming).
			</p>
			<ul>
				<li>
					{"Windows: "}
					<a href="https://kernel.org/" target="_blank" rel="noreferrer">
						Linux
					</a>
				</li>
				<li>
					{"Smartphone OS: "}
					<a href="https://grapheneos.org/" target="_blank" rel="noreferrer">
						Graphene
					</a>
					{", "}
					<a href="https://lineageos.org/" target="_blank" rel="noreferrer">
						Lineage
					</a>
				</li>
				<li>
					{"Photoshop: "}
					<a href="https://www.gimp.org/" target="_blank" rel="noreferrer">
						GIMP
					</a>
				</li>
				<li>
					{"WhatsApp: "}
					<a href="https://www.signal.org/" target="_blank" rel="noreferrer">
						Signal
					</a>
					{", "}
					<a href="https://briarproject.org/" target="_blank" rel="noreferrer">
						Briar
					</a>
				</li>
				<li>
					{"Discord: "}
					<a href="https://element.io/" target="_blank" rel="noreferrer">
						Element
					</a>
				</li>
				<li>
					{"Spotify: "}
					<a href="https://nuclear.js.org/" target="_blank" rel="noreferrer">
						Nuclear
					</a>
					, Downloading Music
				</li>
				<li>OBS: OBS</li>
				<li>
					{"Microsoft Office: "}
					<a
						href="https://www.libreoffice.org/"
						target="_blank"
						rel="noreferrer"
					>
						LibreOffice
					</a>
				</li>
				<li>
					{"Adobe Premiere: "}
					<a href="https://kdenlive.org/en/" target="_blank" rel="noreferrer">
						Kdenlive
					</a>
				</li>
				<li>
					{"Anything else: "}
					<a href="https://alternativeto.net/" target="_blank" rel="noreferrer">
						AlternativeTo
					</a>
				</li>
			</ul>
			<PostHeading level={3} id="compartmentalize">
				Compartmentalize
			</PostHeading>
			<p>You can try to split your life in parts. No, not that way.</p>
			<p>
				{"You can use virtual machines to achieve that too. Or maybe "}
				<a href="https://www.qubes-os.org/" target="_blank" rel="noreferrer">
					QubesOS
				</a>
				. I personally love QubesOS, but due to me also loving to play games, I
				am sadly unable to use it.
			</p>
			<p>You can also use different profiles on your Phone for that too.</p>
			<PostHeading level={2} id="most-important-step">
				Most Important Step
			</PostHeading>
			<p>Educate your friends, Family (and strangers? Maybe? I don't know?).</p>
			<p>
				No seriously. This is the best thing you can do. Convince more people on
				this world why privacy matters. Destroy their dream of "every piece of
				cooperation is so nice and provides me their services for free :)".
			</p>
			<p>
				<strong>Remember:</strong>
				{" If it is free, you are the product. ("}
				<em>Most of the time</em>)
			</p>
			<p>
				{
					'Also, be sure to educate your family. Especially older people are a "great" attack vector. '
				}
				<strong>
					If you have great security / privacy, why not attack your mother /
					grandmother who doesn't care at all?
				</strong>
			</p>
		</Prose>
	);
}

export const sections: Section[] = [
	{ id: "privacy-what-is-this", text: "Privacy? What Is This?", level: 2 },
	{
		id: "but-why-care-about-privacy-i-have-nothing-to-hide",
		text: "But Why Care About Privacy? I Have Nothing to Hide?",
		level: 3,
	},
	{
		id: "okay-so-should-i-delete-everything-and-move-in-the-woods",
		text: "Okay. So Should I Delete Everything and Move in the Woods?",
		level: 3,
	},
	{ id: "first-steps", text: "First Steps", level: 2 },
	{
		id: "changing-your-search-engine",
		text: "Changing Your Search Engine",
		level: 3,
	},
	{ id: "becoming-aware", text: "Becoming Aware", level: 3 },
	{
		id: "using-available-settings",
		text: "Using Available Settings",
		level: 3,
	},
	{ id: "deleting-old-accounts", text: "Deleting Old Accounts", level: 3 },
	{ id: "don-t-reuse-passwords", text: "Don't Reuse Passwords", level: 3 },
	{ id: "be-careful-with-vpns", text: "Be Careful with VPNs", level: 3 },
	{
		id: "don-t-share-your-identity",
		text: "Don't Share Your Identity",
		level: 3,
	},
	{ id: "second-steps", text: "Second Steps", level: 2 },
	{
		id: "use-two-factor-authentication",
		text: "Use Two-Factor Authentication",
		level: 3,
	},
	{ id: "switching-your-browser", text: "Switching... Your Browser", level: 3 },
	{ id: "finding-alternatives", text: "Finding Alternatives", level: 3 },
	{ id: "third-steps", text: "Third Steps", level: 2 },
	{
		id: "using-pseudonyms-and-aliases",
		text: "Using Pseudonyms and Aliases",
		level: 3,
	},
	{
		id: "using-different-throwaway-e-mails",
		text: "Using Different (Throwaway) E-Mails",
		level: 3,
	},
	{
		id: "don-t-create-an-account-on-every-website",
		text: "Don't Create an Account on Every Website",
		level: 3,
	},
	{ id: "read-the-privacy-policy", text: "Read the Privacy Policy", level: 3 },
	{
		id: "switching-to-as-much-open-source-stuff-as-you-can",
		text: "Switching to as Much Open-Source Stuff as You Can",
		level: 3,
	},
	{ id: "compartmentalize", text: "Compartmentalize", level: 3 },
	{ id: "most-important-step", text: "Most Important Step", level: 2 },
];
