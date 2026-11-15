import { PostHeading, Prose } from "~/components/post/prose";
import {
	BackupSorter,
	RecoveryChain,
	RetentionBoard,
	ThreeTwoOne,
} from "~/content/experiences/backups_you_only_want_them_once_you_need_them";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Backups - You only want them once you need them",
	date: "2025-11-12",
	summary:
		"A backup you have never restored is a hope, not a backup. The 3-2-1 rule, the threat model behind it, and the day my password manager lived inside the thing it was meant to save.",
	tags: ["backups", "privacy", "linux"],
	accent: "teal",
	words: 1071,
	minutes: 5,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "what-are-backups", text: "What Are Backups", level: 2 },
	{ id: "a-little-story", text: "A Little Story", level: 2 },
	{ id: "3-2-1-rule", text: "3-2-1 Rule", level: 2 },
	{
		id: "i-interpret-it-a-little-bit",
		text: "I Interpret It a Little Bit",
		level: 3,
	},
	{ id: "my-old-setup", text: "My Old Setup", level: 2 },
	{ id: "my-new-setup", text: "My New Setup", level: 2 },
	{ id: "what-is-borgmatic", text: "What Is Borgmatic?", level: 3 },
	{
		id: "is-the-remote-backup-encrypted-though",
		text: "Is the Remote Backup Encrypted, Though?",
		level: 3,
	},
	{ id: "closing-words", text: "Closing Words", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="what-are-backups">
				What Are Backups
			</PostHeading>
			<BackupSorter />
			<p>
				Before we can understand what I'm doing and why, we must agree on what I
				mean by 'backup'.
			</p>
			<p>
				{"What backups are "}
				<strong>not</strong>:
			</p>
			<ul>
				<li>A copy of your files on the same disk</li>
				<li>A partial copy of your important files</li>
				<li>A "I-Do-It-Whenever-I-Think-About-It" copy of your files</li>
			</ul>
			<p>What are backups:</p>
			<ul>
				<li>
					{"A secure, "}
					<em>preferably</em> <strong>encrypted</strong>
					{" copy of all your files onto:"}
					<ul>
						<li>a separate disk</li>
						<li>a remote location</li>
					</ul>
				</li>
			</ul>
			<PostHeading level={2} id="a-little-story">
				A Little Story
			</PostHeading>
			<p>
				{
					"Now please for a second image yourself being a ~15 year old guy, newly getting into Linux and programming. Your knowledge is at the peak of the "
				}
				<strong>Mount Stupid</strong>
				{": "}
				<img
					src="/posts/backups_you_only_want_them_once_you_need_them/Dunning-Kruger%20Effect.svg"
					alt={""}
					loading="lazy"
				/>
				{
					' You think you know everything. You remember that you heard "keep backups!" somewhere. Of course, you also don\'t want to lose your entire system, which took a much longer time to configure than you anticipated (another form of procrastination I had).'
				}
			</p>
			<p>What do you do?</p>
			<p>
				That's right, keep backups on a local hard drive, since it costs no
				money and you had one collecting dust anyways. Oh, and as I mentioned
				above, keeping them encrypted is a good choice, you knew this back then.
				Of course you encrypted the backups and, as intelligent as you felt,
				saved the backup phrase into your local password manager.
			</p>
			<p>
				{
					"Since the backups are set up and everything appears to be working, you continue with your normal life. Then, the day you never want to encounter appears. You "
				}
				<strong>need</strong>
				{" your backups "}
				<strong>right now</strong>.
			</p>
			<p>Let's use the backups from the external disk, you thought.</p>
			<p>
				{
					"But what was the password of the disk again? ... Yeah, its saved in the password manager! And where is the password manager? That's right, "
				}
				<strong>in the backup</strong>...
			</p>
			<p>
				{"Yes, on this day I created my own "}
				<a
					href="https://en.wikipedia.org/wiki/Chicken_or_the_egg"
					target="_blank"
					rel="noreferrer"
				>
					chicken and egg
				</a>
				{" situation."}
			</p>
			<p>
				And yes, this resulted in me having to set up everything from scratch,
				resetting my password everywhere I possibly could, loosing some accounts
				and configurations in the process. I shed some tears, but I learnt a
				valuable lesson from it:
			</p>
			<p>
				<strong>
					Always keep one more backup than you think you will ever need
				</strong>
				.
			</p>
			<PostHeading level={2} id="3-2-1-rule">
				3-2-1 Rule
			</PostHeading>
			<ThreeTwoOne />
			<p>
				{
					'Possibly you have heard of this as well, if you heard of "keep backups" at any point. '
				}
				<a
					href="https://en.wikipedia.org/wiki/Glossary_of_backup_terms"
					target="_blank"
					rel="noreferrer"
				>
					3-2-1
				</a>
				.
			</p>
			<ul>
				<li>
					<strong>3</strong>
					{" backups in total."}
				</li>
				<li>
					<strong>2</strong>
					{" local copies."}
				</li>
				<li>
					<strong>1</strong>
					{" remote copy."}
				</li>
			</ul>
			<p>
				This rule is what some people call the least amount of backups you
				should have.
			</p>
			<p>
				{
					"Because everybody is different, it's important that you define your own "
				}
				<a
					href="https://en.wikipedia.org/wiki/Threat_model"
					target="_blank"
					rel="noreferrer"
				>
					threat model
				</a>
				{". For me, I define it as my "}
				<strong>entire house</strong>
				{" burning down, resulting in me "}
				<strong>losing everything I own</strong>.
			</p>
			<PostHeading level={3} id="i-interpret-it-a-little-bit">
				I Interpret It a Little Bit
			</PostHeading>
			<p>
				{"I interpret the "}
				<strong>2</strong>
				{
					" in the 3-2-1 rule a little bit. For me, a local backup, or a backup in general, consists of the files I don't want to lose. I do not care that much about losing my programming project X, since it's also secured remotely (both on my backup and on my git provider)."
				}
			</p>
			<PostHeading level={2} id="my-old-setup">
				My Old Setup
			</PostHeading>
			<p>
				{
					"In the past I did all my backups using a simple shell script I wrote. It consisted of "
				}
				<a
					href="https://en.wikipedia.org/wiki/Rsync"
					target="_blank"
					rel="noreferrer"
				>
					rsync
				</a>
				{" incrementally backing up my files to "}
				<strong>one</strong>
				{
					" external HDD (which is so old at this point that I am expecting it to die anytime). Once my drive got full, I nuked all my backups and started from scratch."
				}
			</p>
			<PostHeading level={2} id="my-new-setup">
				My New Setup
			</PostHeading>
			<RetentionBoard />
			<p>
				{
					"My new setup is way more advanced and objectively better. First of all, I sync my most important data to my phone and laptop, using "
				}
				<a href="https://syncthing.net/" target="_blank" rel="noreferrer">
					Syncthing
				</a>
				. This ensures that I have the most important files I need everywhere,
				all the time.
			</p>
			<p>
				I am also creating incremental, compressed and encrypted backups, onto:
			</p>
			<ul>
				<li>My still (somehow?) not dead external HDD</li>
				<li>A rented cloud storage box</li>
			</ul>
			<p>These encrypted backups get created with borgmatic.</p>
			<PostHeading level={3} id="what-is-borgmatic">
				{"What Is "}
				<a
					href="https://torsion.org/borgmatic/"
					target="_blank"
					rel="noreferrer"
				>
					Borgmatic
				</a>
				?
			</PostHeading>
			<p>
				{
					"You possibly never heard of this tool. At least I hadn't, before setting up my backups. To summarize it: "
				}
				<strong>Borgmatic is the tool of my dreams</strong>.
			</p>
			<p>It allows you to:</p>
			<ul>
				<li>Create incremental backups</li>
				<li>Encrypt them using a password</li>
				<li>Store them locally (decrypted, if you wish so)</li>
				<li>Store them remotely (via ssh, etc.)</li>
			</ul>
			<p>And, of course, it integrates with NixOS and home-manager.</p>
			<p>
				{"This, as an example is my current setup (found on "}
				<a
					href="https://codeberg.org/DontBlameMe/nix_dotfiles/src/commit/1713dff74db0c93c083a27e66677610c6901bb90/modules/home/backup.nix"
					target="_blank"
					rel="noreferrer"
				>
					my Codeberg
				</a>
				),
			</p>
			<p>I have annotated it so you can understand it:</p>
			<pre>
				<code data-lang="nix">{`
programs.borgmatic = { # Everything in here is for the borgmatic program
      enable = true; # Enable borgmatic, this is nix-specific syntax for "installing" a program

      backups = { # Configure the backups, this is what we're interested in
        local = lib.mkIf (config.backup.local.destination != "") { # Configure a local backup, if wanted
          location = { # Location of the backup
            repositories = [config.backup.local.destination]; # The destination where to backup to
            inherit (config.backup) patterns; # The "patterns". This consists of which files to include or exclude
          };

          retention = { # This section defines how long we want to keep the backups
            keepDaily = 60; # Keep one daily backup for the last 60 days
            keepWeekly = 52; # Keep one weekly backup from the last 52 weeks
            keepMonthly = 36; # Keep one monthly backup from the last 36 months
            keepYearly = 20; # Keep one yearly backup from the last 20 years
          };
        };

        remote = lib.mkIf (config.backup.remote.ssh_name != "") { # Configure a remote backup, if wanted
          location = { # Location of the backup
            repositories = ["ssh://\${config.backup.remote.ssh_name}/./Borg"]; # The destination where to backup to
            inherit (config.backup) patterns; # The "patterns". This consists of which files to include or exclude
          };

          storage.encryptionPasscommand = "cat \${config.backup.remote.password_path}"; # Set the repository password to use

          retention = { # This section defines how long we want to keep the backups
            keepDaily = 60; # Keep one daily backup for the last 60 days
            keepWeekly = 52; # Keep one weekly backup from the last 52 weeks
            keepMonthly = 36; # Keep one monthly backup from the last 36 months
            keepYearly = 20; # Keep one yearly backup from the last 20 years
          };
        };
      };
    };
				`}</code>
			</pre>
			<p>
				As you can see, there is no plaintext password inside of the nix code.
				The password gets supplied directly into borgmatic by using the
			</p>
			<p>
				<code>{"storage.encryptionPasscommand"}</code>.
			</p>
			<PostHeading level={3} id="is-the-remote-backup-encrypted-though">
				Is the Remote Backup Encrypted, Though?
			</PostHeading>
			<RecoveryChain />
			<p>
				Yes. But as I said, my threat model includes me losing everything. This
				also includes my local password manager, which includes my backup
				decryption password. But how would I still get access to this? Let me
				introduce you to the real-life. I know, it can be a scary place. But for
				this exact scenario it's perfect. Personally, I have created a small
				Database in KeePassXC, including the required information to access my
				backup server and decrypt the backups. This small Database is, of
				course, encrypted with a secure password I have remembered. Now, I gave
				this Database to trusted people and they store it inside of their secure
				backup process (inside of their own separate real-life location).
			</p>
			<p>
				This means for me actually losing everything, one of these cases needs
				to happen:
			</p>
			<ul>
				<li>
					Every person who has my backup Database needs to lose their entire
					backup stack at once, and at the same time my house needs to burn down
				</li>
				<li>
					My house burns down and at the same time my remote backup solution
					needs to get deleted (which is unlikely, due to them backing it up as
					well)
				</li>
				<li>
					I somehow forget a password I have been using and remembering for
					years (This is the one point I might change in the future - due to me
					sometimes being stupid, I would not rule this one out)
				</li>
			</ul>
			<p>
				But I consider these scenarios so unlikely, that I am fine with them.
			</p>
			<PostHeading level={2} id="closing-words">
				Closing Words
			</PostHeading>
			<p>
				Hopefully I can motivate you to take a look at your backup system. If
				so, please do these two steps:
			</p>
			<ul>
				<li>
					Image your worst threat model scenario. How would you go about
					recovering? Would these steps actually work out? (this includes trying
					them out and seeing that you would be able to access what you need)
				</li>
				<li>
					Try to restore from your backup(s). Are the files correct? Is your
					automated backup even working?
				</li>
			</ul>
			<p>
				Personally, I think backups are a topic that gets covered far less than
				it should be. Yes, it may be boring and you (hopefully) never find
				yourself in a situation where you need them, but you should be prepared
				for it.
			</p>
			<p>
				With that I hope that you find this story fun, entertaining and even
				learnt something. Let me know what you think on my linked methods below!
			</p>
		</Prose>
	);
}
