import { CodeBlock } from "~/components/post/code_block";
import { PostHeading, Prose } from "~/components/post/prose";
import {
	ConfigDiff,
	FitScoreboard,
	GenerationHero,
	RiceSpiral,
} from "~/content/experiences/is_nixos_the_perfect_linux_distribution_for_you";
import type { PostMeta, Section } from "~/lib/post_types";

export const meta = {
	title: "Is NixOS the Perfect Linux Distribution for You",
	date: "2025-09-13",
	summary:
		"NixOS does not ask whether you are ready. It asks whether you want your system described as code, rebuilt from a single file.",
	tags: ["nixos", "linux", "ricing"],
	accent: "sapphire",
	words: 1881,
	minutes: 9,
} satisfies PostMeta;

export const sections: Section[] = [
	{ id: "what-even-is-nixos", text: "What Even Is NixOS?", level: 2 },
	{ id: "why-should-i-care", text: "Why Should I Care?", level: 2 },
	{ id: "reproducible", text: "Reproducible", level: 3 },
	{ id: "my-use-case", text: "My Use Case", level: 4 },
	{
		id: "package-availability-and-stability",
		text: "Package Availability and Stability",
		level: 3,
	},
	{ id: "package-availability", text: "Package Availability", level: 4 },
	{ id: "package-stability", text: "Package Stability", level: 4 },
	{ id: "configuration", text: "Configuration", level: 3 },
	{
		id: "toggles-toggles-and-toggles",
		text: "Toggles, Toggles, and Toggles",
		level: 4,
	},
	{
		id: "danger-of-seeking-perfection",
		text: "Danger of Seeking Perfection",
		level: 4,
	},
	{ id: "multi-versioning", text: "Multi-Versioning", level: 3 },
	{ id: "dev-environment", text: "Dev Environment", level: 3 },
	{ id: "ability-to-restore", text: "Ability To Restore", level: 3 },
	{
		id: "what-is-the-difference-between-btrfs-snapshots-nixos-rollbacks-and-git",
		text: "What Is the Difference Between Btrfs Snapshots, NixOS Rollbacks and Git?",
		level: 4,
	},
	{ id: "btrfs", text: "Btrfs", level: 4 },
	{ id: "git", text: "Git", level: 3 },
	{ id: "secure-boot", text: "Secure Boot", level: 3 },
	{ id: "conclusion", text: "Conclusion", level: 2 },
];

export default function Post() {
	return (
		<Prose>
			<PostHeading level={2} id="what-even-is-nixos">
				What Even Is NixOS?
			</PostHeading>
			<p>
				Maybe this is the first time you're hearing about NixOS, so let's start
				with a definition.
			</p>
			<p>
				<a href="https://nixos.org" target="_blank" rel="noreferrer">
					NixOS
				</a>
				{" is a Linux distribution based on "}
				<a href="https://nixos.org/nix" target="_blank" rel="noreferrer">
					Nix
				</a>
				, a purely functional package manager.
			</p>
			<p>
				{"It is "}
				<strong>not based on any other Linux distribution</strong>, but rather a
				completely new way of using and managing Linux.
			</p>
			<PostHeading level={2} id="why-should-i-care">
				Why Should I Care?
			</PostHeading>
			<p>
				Okay, another distribution with another package manager, but why should
				I bother at all?
			</p>
			<p>
				Well, NixOS is a Linux distribution that is built on top of Nix (the
				package manager). This might not tell you that much, but it has some
				major advantages, which you will learn about in the following sections.
			</p>
			<PostHeading level={3} id="reproducible">
				Reproducible
			</PostHeading>
			<p>Let's start with the most important one: reproducible.</p>
			<p>
				Reproducible is the ability to reproduce the same environment on another
				machine.
			</p>
			<p>
				If you have some experience developing software, you may know this
				quote:
			</p>
			<blockquote>
				I can't tell you why it isn't working, but it works perfectly on my
				machine.
			</blockquote>
			<p>
				This is a problem which occurs when a piece of software is not perfectly
				reproducible.
			</p>
			<p>
				The same issue can also happen at the system level, which is a main
				reason NixOS is so popular.
			</p>
			<p>
				{"With NixOS, you can "}
				<strong>
					reproduce an entire setup on another machine in a matter of minutes
				</strong>
				{". When you also use "}
				<a
					href="https://nixos.wiki/wiki/Flakes"
					target="_blank"
					rel="noreferrer"
				>
					Nix Flakes
				</a>
				{" (to version lock your packages) and maybe even "}
				<a
					href="https://nixos.wiki/wiki/Home_Manager"
					target="_blank"
					rel="noreferrer"
				>
					Home Manager
				</a>
				{
					" (to also manage your home dotfiles, e.g. configure your window manager). You are also able to reproduce your complete system configuration setup (such as your desktop configuration, app configurations etc.)."
				}
			</p>
			<p>In an example use case you simply:</p>
			<ul>
				<li>Copy your dotfiles to another machine</li>
				<li>Run one command to install your dotfiles</li>
				<li>Wait until it is done</li>
				<li>
					{"Boom, your "}
					<strong>exact system</strong>
					{" has been installed on another machine"}
				</li>
			</ul>
			<PostHeading level={4} id="my-use-case">
				My Use Case
			</PostHeading>
			<p>
				Okay, amazing. You are able to reproduce your entire setup on another
				machine.
			</p>
			<p>But how exactly does it benefit you?</p>
			<p>Great question, here is my setup and use case:</p>
			<ul>
				<li>
					{"I own a desktop computer which has my "}
					<a
						href="https://codeberg.org/DontBlameMe/nix_dotfiles"
						target="_blank"
						rel="noreferrer"
					>
						configuration
					</a>
					{" (what a shameless plug, I am sorry)"}
				</li>
				<li>
					{
						"I also own a laptop which I would love to have the same setup, but with different keybinds "
					}
					<a
						href="https://dontblameme.codeberg.page/posts/learning-to-use-a-split-keyboard/"
						target="_blank"
						rel="noreferrer"
					>
						since I use a split keyboard on my desktop
					</a>
				</li>
			</ul>
			<p>
				Now here is the problem: How do I keep those two setups in sync, whilst
				not having to:
			</p>
			<ul>
				<li>Keep two separate configurations</li>
				<li>Manually sync them</li>
				<li>Keep the separate keybinds</li>
			</ul>
			<p>
				This is where NixOS comes in, saves the day, and even treats me to a
				snapshot system I have not even dreamed of.
			</p>
			<p>##### My Current Workflow</p>
			<p>
				{
					"If I want to install something, I add it to my correct config file and then simply enable a toggle on "
				}
				<strong>either desktop or laptop</strong>, wherever I actually want it.
			</p>
			<p>
				{
					"If I wish to update my system, which by the way is also done automatically, I simply run "
				}
				<code>{"update-system SETUP_NAME"}</code>
				{", where "}
				<code>{"SETUP_NAME"}</code>
				{" is either "}
				<code>{"laptop"}</code>
				{" or "}
				<code>{"pc"}</code>.
			</p>
			<p>
				This process updates all packages, my flake (which is version
				controlling all my packages), and also syncs it to my Git repository.
			</p>
			<p>That is it.</p>
			<PostHeading level={3} id="package-availability-and-stability">
				Package Availability and Stability
			</PostHeading>
			<p>
				But wait, NixOS is not based on Arch Linux (which I have used for
				years), so how is the package availability and stability?
			</p>
			<PostHeading level={4} id="package-availability">
				Package Availability
			</PostHeading>
			<p>
				{"Well, NixOS uses the Nix package manager, which actually has "}
				<strong>
					the biggest number of fresh packages available of any Linux
					distribution
				</strong>
				{". At the time of writing, NixOS/the nix package manager has "}
				<strong>127,132 packages available</strong>.
			</p>
			<PostHeading level={4} id="package-stability">
				Package Stability
			</PostHeading>
			<p>
				The package stability is, from what I have experienced personally,
				really good.
			</p>
			<p>There are several separate channels:</p>
			<ul>
				<li>
					<code>{"nixos-unstable"}</code>: This is the channel which I use. It
					includes really new packages, but they are still really stable.
				</li>
				<li>
					<code>{"nixos-XX.XX"}</code>: These are the stable channels, which are
					released every six months. For me personally (coming from Arch Linux),
					they're too outdated. Also, I would hate having to change the channel
					in my config every six months.
				</li>
				<li>
					<code>{"nixpkgs-unstable"}</code>: This is the most unstable channel
					you can get. This is basically every new package ~1-2 days after its
					merge into nixpkgs.
				</li>
			</ul>
			<p>Have I ever experienced issues with the package stability?</p>
			<p>
				Actually, yes. I once had a problem with one package building, but after
				~4 days it was fixed (and I could have just switched to another channel
				in the meantime).
			</p>
			<PostHeading level={3} id="configuration">
				Configuration
			</PostHeading>
			<p>This is the main part of NixOS.</p>
			<p>
				{"You configure "}
				<strong>your entire system</strong>
				{" in one or more configuration files."}
			</p>
			<p>
				{"Let me repeat that: "}
				<strong>
					You never ever configure anything in any other file than your
					centrally managed configuration files
				</strong>
				.
			</p>
			<blockquote>
				{
					"Yes, this is a new configuration syntax (which actually is a fully fledged programming language), but this is "
				}
				<strong>
					the last configuration syntax you will ever have to learn
				</strong>
				.
			</blockquote>
			<p>
				This is also a main selling point for me, since I always forgot where I
				configured XY, or if I actually configured it at all. Also, you may
				forget that you installed a package, slowly leading to your system
				becoming bloated. With
			</p>
			<p>
				{"NixOS this basically "}
				<strong>cannot happen</strong>, since all your installed packages are
				located in central configuration files, which you can simply clean.
			</p>
			<PostHeading level={4} id="toggles-toggles-and-toggles">
				Toggles, Toggles, and Toggles
			</PostHeading>
			<p>
				My configuration is split into multiple files and directories, since I
				am a sucker for modularity and organization.
			</p>
			<p>
				{
					"I have also set it up so that I basically have toggles for everything I want to enable, leading to me simply setting "
				}
				<code>{"obs-studio.enable = true;"}</code>
				{" in my configuration if I wish to use OBS right now."}
			</p>
			<ConfigDiff />
			<PostHeading level={4} id="danger-of-seeking-perfection">
				Danger of Seeking Perfection
			</PostHeading>
			<p>
				{"But be warned, there might come a time where you are (similar to my "}
				<a
					href="https://dontblameme.codeberg.page/posts/the-perfect-productivity-system/"
					target="_blank"
					rel="noreferrer"
				>
					perfect productivity post
				</a>
				) seeking perfection in your configuration. Maybe you can make X and Y
				modular to keep Z cleaner?
			</p>
			<RiceSpiral />
			<p>
				{"Yeah, don't fall for that. "}
				<strong>
					There is always a better way, and the grass is always greener on the
					other side
				</strong>
				. Get your system to be working as you want it to and don't waste all
				your time creating the (non existing) "perfect system".
			</p>
			<blockquote>
				Important Note: It is also totally possible and fine to first install
				NixOS inside of a virtual machine, adjust your configuration to your
				liking, and then install it on your main system. This is the approach I
				took as well.
			</blockquote>
			<PostHeading level={3} id="multi-versioning">
				Multi-Versioning
			</PostHeading>
			<p>
				Another thing which I never did before, but which helped me a lot with
				the Arduino IDE, is the multi-versioning.
			</p>
			<p>
				{"What I mean by this is that my main system uses the "}
				<code>{"nixos-unstable"}</code>
				{" channel, but one specific package I use, the arduino IDE, uses the "}
				<code>{"nixos-24.05"}</code>
				{" channel."}
			</p>
			<p>
				Why? Because the IDE crashes on a newer version, so I simply installed
				an older version of the package.
			</p>
			<p>
				Yes, this is also possible on other distributions, but on NixOS it is
				really easy to do:
			</p>
			<CodeBlock
				lang="nix"
				code={`
{
  pkgs,
  ...
}:
let
  pkgs24 = import (builtins.fetchTarball {
    url = "https://Github.com/NixOS/nixpkgs/archive/nixos-24.05.tar.gz";
    sha256 = "0zydsqiaz8qi4zd63zsb2gij2p614cgkcaisnk11wjy3nmiq0x1s";
  }) {
    system = pkgs.system;
  };
in {
  home.packages = with pkgs24; [
    arduino-ide
  ];
}
				`}
			/>
			<p>
				This is all that is needed, and it is completely clear to everyone what
				is going on, this clarity is why I love the declarative nature of NixOS.
			</p>
			<p>
				Just for good measure, here is the same snippet but using the default
				channel (which sadly is broken at the moment of writing):
			</p>
			<CodeBlock
				lang="nix"
				code={`
{
  pkgs,
  ...
}: {
  home.packages = with pkgs; [
    arduino-ide
  ];
}
				`}
			/>
			<PostHeading level={3} id="dev-environment">
				Dev Environment
			</PostHeading>
			<p>
				NixOS is also great for setting up (different) development environments.
				You may know the hassle of installing a specific version of your
				programming language, or a specific version of your IDE, but NixOS makes
				this a lot easier.
			</p>
			<p>
				{"For me as an example, I love to work with "}
				<a href="https://rust-lang.org" target="_blank" rel="noreferrer">
					Rust
				</a>
				{" and therefore I have a setup in my Rust project like this:"}
			</p>
			<ul>
				<li>
					{"A "}
					<code>{".envrc"}</code>
					{" file which contains "}
					<code>{"use flake"}</code>
					{" -> which enables the flake"}
				</li>
				<li>
					{"A "}
					<code>{"flake.nix"}</code>
					{" which defines what I need in this development environment"}
				</li>
				<li>
					{"A "}
					<code>{"flake.lock"}</code>
					{" which is version controlling the flake's packages"}
				</li>
			</ul>
			<blockquote>
				Note: I don't install e.g. rust up globally, since I only need it in the
				development environment. Each environment says and gets what it needs by
				itself (once I navigate into the directory).
			</blockquote>
			<p>
				{"The "}
				<code>{"flake.nix"}</code>
				{" file looks like this (this is from my "}
				<a
					href="https://codeberg.org/DontBlameMe/RInt"
					target="_blank"
					rel="noreferrer"
				>
					RInt project
				</a>
				, basically my own assembly-like language):
			</p>
			<CodeBlock
				lang="nix"
				code={`
{
  inputs = {
    nixpkgs.url = "Github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "Github:numtide/flake-utils";
    naersk.url = "Github:nix-community/naersk";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    naersk,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.\${system};
      naersk-lib = pkgs.callPackage naersk {};
      build = {
        pname,
        mode ? "build",
      }:
        naersk-lib.buildPackage {
          inherit pname mode;
          src = ./.;
          nativeBuildInputs = [pkgs.pkg-config];
        };
    in {
      packages = {
        bin = build {pname = "rint";};
        lib = build {pname = "rint_lib";};
        release = build {
          pname = "rint";
        };
        test = pkgs.writeShellScriptBin "test" ''
          cargo test --workspace
'';
      };

      defaultPackage = self.packages.\${system}.bin;

      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [cargo rustc rustfmt clippy rust-analyzer];
        nativeBuildInputs = [pkgs.pkg-config];
        env.RUST_SRC_PATH = "\${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
      };
    });
}
				`}
			/>
			<p>
				And yes, this is a rather complex setup, but it is also a very powerful
				one.
			</p>
			<p>What and why does the flake contain what?</p>
			<ul>
				<li>
					<code>{"naersk"}</code>
					{": This is a wrapper around "}
					<code>{"cargo"}</code>, which allows nix to build the rust code and
					store its libraries in the nix store.
				</li>
				<li>
					<code>{"packages"}</code>
					{
						": This is the part which defines what I want to be able to run with "
					}
					<code>{"nix run .#OPTION"}</code>
					{". I can e.g. run "}
					<code>{"nix run .#test"}</code>
					{" to run all my unit tests."}
				</li>
				<li>
					<code>{"devShell"}</code>
					{
						": This is the part which defines the development environment. It contains the buildInputs, which are the tools which are required whilst building, and it also contains the "
					}
					<code>{"env.RUST_SRC_PATH"}</code>, which is needed by some things.
				</li>
			</ul>
			<p>
				{"For a simpler setup, e.g. my "}
				<a
					href="https://Github.com/DontBlameMe99/Tick-Tones"
					target="_blank"
					rel="noreferrer"
				>
					TickTones Obsidian plugin
				</a>
				, it looks like this:
			</p>
			<CodeBlock
				lang="nix"
				code={`
{
  inputs = {
    nixpkgs.url = "Github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "Github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.\${system};
    in {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [pnpm typescript nodejs];
        nativeBuildInputs = [pkgs.pkg-config];
      };
    });
}
				`}
			/>
			<p>Basically only installing pnpm, nodejs and TypeScript.</p>
			<PostHeading level={3} id="ability-to-restore">
				Ability To Restore
			</PostHeading>
			<p>NixOS is also amazing for general system stability.</p>
			<p>
				{"Every rebuild of your system, for me with "}
				<code>{"update-system"}</code>, creates a new entry in the systemd-boot
				menu. If I boot into an old entry, every installation of a package,
				update, or whatever, gets reverted.
			</p>
			<GenerationHero />
			<p>
				This is different to btrfs, since it is not restoring any files itself,
				but only removing the links, therefore "disabling" the new things.
			</p>
			<PostHeading
				level={4}
				id="what-is-the-difference-between-btrfs-snapshots-nixos-rollbacks-and-git"
			>
				What Is the Difference Between Btrfs Snapshots, NixOS Rollbacks and Git?
			</PostHeading>
			<p>
				Btrfs snapshots are basically a snapshot of your root or home
				filesystem. This is basically a snapshot of your entire system, which
				you can take files out of, or boot into at any point in time. You can't
				boot into a previous state from the boot menu (by default), though.
			</p>
			<p>
				NixOS rollbacks are a state of packages, and their versions, which you
				had installed at a certain point in time. You can boot into a previous
				state, simply from the boot menu.
			</p>
			<p>
				Git is a version control system, which allows you to version your
				configuration on a remote host.
			</p>
			<PostHeading level={4} id="btrfs">
				Btrfs
			</PostHeading>
			<p>
				But of course it can be combined with btrfs, which results in a
				basically indestructible system.
			</p>
			<p>For me I have setup automatic snapshots with snapper, so I can:</p>
			<ul>
				<li>Roll back my system upgrades to a previous state</li>
				<li>Roll back my root filesystem to a previous state</li>
				<li>Roll back my home filesystem to a previous state</li>
			</ul>
			<p>
				So yeah, this it the stablest and safe I have ever felt whilst using
				Linux.
			</p>
			<PostHeading level={3} id="git">
				Git
			</PostHeading>
			<p>Git is also a first class citizen of NixOS.</p>
			<p>
				{"With every "}
				<code>{"update-system"}</code>
				{" I automatically commit and push my changes to "}
				<a
					href="https://codeberg.org/DontBlameMe/nix_dotfiles"
					target="_blank"
					rel="noreferrer"
				>
					my Git repository
				</a>
				.
			</p>
			<p>
				This is another form of backup/security, since I can also easily
				rollback my entire configuration to a previous state.
			</p>
			<PostHeading level={3} id="secure-boot">
				Secure Boot
			</PostHeading>
			<p>
				{
					"Of course, NixOS is also great for secure boot, but not as great as e.g. Fedora since in Fedora you can just enable it in the UEFI and it works. On NixOS you will have to "
				}
				<a
					href="https://Github.com/nix-community/lanzaboote"
					target="_blank"
					rel="noreferrer"
				>
					follow the Lanzaboote guide
				</a>
				, but then it works flawlessly (I have enabled it on my PC and Laptop).
			</p>
			<PostHeading level={2} id="conclusion">
				Conclusion
			</PostHeading>
			<p>Overall I am in love with NixOS.</p>
			<p>For me</p>
			<ul>
				<li>The amazing community</li>
				<li>The documentation</li>
				<li>The support</li>
				<li>The stability</li>
			</ul>
			<p>
				Have all treated me to a setup which I won't change in any way for the
				foreseeable future.
			</p>
			<p>
				{
					"I have not mentioned a lot of things which I have set up, but I think that otherwise this post would be way too long. Here is a quick list of things I set up, which you might want to get into (found in my "
				}
				<a
					href="https://codeberg.org/DontBlameMe/nix_dotfiles"
					target="_blank"
					rel="noreferrer"
				>
					dotfiles
				</a>
				):
			</p>
			<ul>
				<li>
					{"Theming everything using "}
					<a href="https://catppuccin.com" target="_blank" rel="noreferrer">
						Catppuccin
					</a>
				</li>
				<li>
					Custom scripts which are available system-wide, but defined in the Nix
					syntax
				</li>
				<li>
					{"Partitioning using "}
					<a
						href="https://Github.com/nix-community/disko"
						target="_blank"
						rel="noreferrer"
					>
						Disko
					</a>
				</li>
				<li>
					A (hopefully) easy to follow installation guide on how to install my
					exact setup
				</li>
				<li>Easily swappable wallpapers</li>
				<li>Backups using my own script</li>
				<li>And so much more...</li>
			</ul>
			<FitScoreboard />
			<p>
				{"If you wish to learn more about NixOS I could also recommend the "}
				<a
					href={"https://www.youtube.com/watch?v=CwfKlX3rA6E"}
					target="_blank"
					rel="noreferrer"
				>
					YouTube video from No Boilerplate
				</a>
				, since this is what initially reminded me to get into NixOS (Thank
				you!).
			</p>
		</Prose>
	);
}
