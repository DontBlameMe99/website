---
title: Is NixOS the Perfect Linux Distribution for You
date: 2025-09-13
summary: NixOS does not ask whether you are ready. It asks whether you want your system described as code, rebuilt from a single file.
tags: nixos, linux, ricing
accent: sapphire
---
## What Even Is NixOS?

Maybe this is the first time you're hearing about NixOS, so let's start with a definition.

[NixOS](https://nixos.org) is a Linux distribution based on [Nix](https://nixos.org/nix), a purely functional package manager.

It is **not based on any other Linux distribution**, but rather a completely new way of using and managing Linux.

## Why Should I Care?

Okay, another distribution with another package manager, but why should I bother at all?

Well, NixOS is a Linux distribution that is built on top of Nix (the package manager). This might not tell you that much, but it has some major advantages, which you will learn about in the following sections.

### Reproducible

Let's start with the most important one: reproducible.

Reproducible is the ability to reproduce the same environment on another machine.

If you have some experience developing software, you may know this quote:

> I can't tell you why it isn't working, but it works perfectly on my machine.

This is a problem which occurs when a piece of software is not perfectly reproducible.

The same issue can also happen at the system level, which is a main reason NixOS is so popular.

With NixOS, you can **reproduce an entire setup on another machine in a matter of minutes**. When you also use [Nix Flakes](https://nixos.wiki/wiki/Flakes) (to version lock your packages) and maybe even [Home Manager](https://nixos.wiki/wiki/Home_Manager) (to also manage your home dotfiles, e.g. configure your window manager). You are also able to reproduce your complete system configuration setup (such as your desktop configuration, app configurations etc.).

In an example use case you simply:

- Copy your dotfiles to another machine
- Run one command to install your dotfiles
- Wait until it is done
- Boom, your **exact system** has been installed on another machine

#### My Use Case

Okay, amazing. You are able to reproduce your entire setup on another machine.

But how exactly does it benefit you?

Great question, here is my setup and use case:

- I own a desktop computer which has my [configuration](https://codeberg.org/DontBlameMe/nix_dotfiles) (what a shameless plug, I am sorry)
- I also own a laptop which I would love to have the same setup, but with different keybinds [since I use a split keyboard on my desktop](https://dontblameme.codeberg.page/posts/learning-to-use-a-split-keyboard/)

Now here is the problem: How do I keep those two setups in sync, whilst not having to:

- Keep two separate configurations
- Manually sync them
- Keep the separate keybinds

This is where NixOS comes in, saves the day, and even treats me to a snapshot system I have not even dreamed of.

##### My Current Workflow

If I want to install something, I add it to my correct config file and then simply enable a toggle on **either desktop or laptop**, wherever I actually want it.

If I wish to update my system, which by the way is also done automatically, I simply run `update-system SETUP_NAME`, where `SETUP_NAME` is either `laptop` or `pc`.

This process updates all packages, my flake (which is version controlling all my packages), and also syncs it to my Git repository.

That is it.

### Package Availability and Stability

But wait, NixOS is not based on Arch Linux (which I have used for years), so how is the package availability and stability?

#### Package Availability

Well, NixOS uses the Nix package manager, which actually has **the biggest number of fresh packages available of any Linux distribution**. At the time of writing, NixOS/the nix package manager has **127,132 packages available**.

#### Package Stability

The package stability is, from what I have experienced personally, really good.

There are several separate channels:

- `nixos-unstable`: This is the channel which I use. It includes really new packages, but they are still really stable.
- `nixos-XX.XX`: These are the stable channels, which are released every six months. For me personally (coming from Arch Linux), they're too outdated. Also, I would hate having to change the channel in my config every six months.
- `nixpkgs-unstable`: This is the most unstable channel you can get. This is basically every new package ~1-2 days after its merge into nixpkgs.

Have I ever experienced issues with the package stability?

Actually, yes. I once had a problem with one package building, but after ~4 days it was fixed (and I could have just switched to another channel in the meantime).

### Configuration

This is the main part of NixOS.

You configure **your entire system** in one or more configuration files.

Let me repeat that: **You never ever configure anything in any other file than your centrally managed configuration files**.

> Yes, this is a new configuration syntax (which actually is a fully fledged programming language), but this is **the last configuration syntax you will ever have to learn**.

This is also a main selling point for me, since I always forgot where I configured XY, or if I actually configured it at all. Also, you may forget that you installed a package, slowly leading to your system becoming bloated. With

NixOS this basically **cannot happen**, since all your installed packages are located in central configuration files, which you can simply clean.

#### Toggles, Toggles, and Toggles

My configuration is split into multiple files and directories, since I am a sucker for modularity and organization.

I have also set it up so that I basically have toggles for everything I want to enable, leading to me simply setting `obs-studio.enable = true;` in my configuration if I wish to use OBS right now.

#### Danger of Seeking Perfection

But be warned, there might come a time where you are (similar to my [perfect productivity post](https://dontblameme.codeberg.page/posts/the-perfect-productivity-system/)) seeking perfection in your configuration. Maybe you can make X and Y modular to keep Z cleaner?

Yeah, don't fall for that. **There is always a better way, and the grass is always greener on the other side**. Get your system to be working as you want it to and don't waste all your time creating the (non existing) "perfect system".

> Important Note: It is also totally possible and fine to first install NixOS inside of a virtual machine, adjust your configuration to your liking, and then install it on your main system.
> This is the approach I took as well.

### Multi-Versioning

Another thing which I never did before, but which helped me a lot with the Arduino IDE, is the multi-versioning.

What I mean by this is that my main system uses the `nixos-unstable` channel, but one specific package I use, the arduino IDE, uses the `nixos-24.05` channel.

Why? Because the IDE crashes on a newer version, so I simply installed an older version of the package.

Yes, this is also possible on other distributions, but on NixOS it is really easy to do:

```nix
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
```

This is all that is needed, and it is completely clear to everyone what is going on, this clarity is why I love the declarative nature of NixOS.

Just for good measure, here is the same snippet but using the default channel (which sadly is broken at the moment of writing):

```nix
{
  pkgs,
  ...
}: {
  home.packages = with pkgs; [
    arduino-ide
  ];
}
```

### Dev Environment

NixOS is also great for setting up (different) development environments. You may know the hassle of installing a specific version of your programming language, or a specific version of your IDE, but NixOS makes this a lot easier.

For me as an example, I love to work with [Rust](https://rust-lang.org) and therefore I have a setup in my Rust project like this:

- A `.envrc` file which contains `use flake` -> which enables the flake
- A `flake.nix` which defines what I need in this development environment
- A `flake.lock` which is version controlling the flake's packages

> Note: I don't install e.g.
> rust up globally, since I only need it in the development environment.
> Each environment says and gets what it needs by itself (once I navigate into the directory).

The `flake.nix` file looks like this (this is from my [RInt project](https://codeberg.org/DontBlameMe/RInt), basically my own assembly-like language):

```nix
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
      pkgs = nixpkgs.legacyPackages.${system};
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

      defaultPackage = self.packages.${system}.bin;

      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [cargo rustc rustfmt clippy rust-analyzer];
        nativeBuildInputs = [pkgs.pkg-config];
        env.RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
      };
    });
}
```

And yes, this is a rather complex setup, but it is also a very powerful one.

What and why does the flake contain what?

- `naersk`: This is a wrapper around `cargo`, which allows nix to build the rust code and store its libraries in the nix store.
- `packages`: This is the part which defines what I want to be able to run with `nix run .#OPTION`. I can e.g. run `nix run .#test` to run all my unit tests.
- `devShell`: This is the part which defines the development environment. It contains the buildInputs, which are the tools which are required whilst building, and it also contains the `env.RUST_SRC_PATH`, which is needed by some things.

For a simpler setup, e.g. my [TickTones Obsidian plugin](https://Github.com/DontBlameMe99/Tick-Tones), it looks like this:

```nix
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
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [pnpm typescript nodejs];
        nativeBuildInputs = [pkgs.pkg-config];
      };
    });
}
```

Basically only installing pnpm, nodejs and TypeScript.

### Ability To Restore

NixOS is also amazing for general system stability.

Every rebuild of your system, for me with `update-system`, creates a new entry in the systemd-boot menu. If I boot into an old entry, every installation of a package, update, or whatever, gets reverted.

This is different to btrfs, since it is not restoring any files itself, but only removing the links, therefore "disabling" the new things.

#### What Is the Difference Between Btrfs Snapshots, NixOS Rollbacks and Git?

Btrfs snapshots are basically a snapshot of your root or home filesystem. This is basically a snapshot of your entire system, which you can take files out of, or boot into at any point in time. You can't boot into a previous state from the boot menu (by default), though.

NixOS rollbacks are a state of packages, and their versions, which you had installed at a certain point in time. You can boot into a previous state, simply from the boot menu.

Git is a version control system, which allows you to version your configuration on a remote host.

#### Btrfs

But of course it can be combined with btrfs, which results in a basically indestructible system.

For me I have setup automatic snapshots with snapper, so I can:

- Roll back my system upgrades to a previous state
- Roll back my root filesystem to a previous state
- Roll back my home filesystem to a previous state

So yeah, this it the stablest and safe I have ever felt whilst using Linux.

### Git

Git is also a first class citizen of NixOS.

With every `update-system` I automatically commit and push my changes to [my Git repository](https://codeberg.org/DontBlameMe/nix_dotfiles).

This is another form of backup/security, since I can also easily rollback my entire configuration to a previous state.

### Secure Boot

Of course, NixOS is also great for secure boot, but not as great as e.g. Fedora since in Fedora you can just enable it in the UEFI and it works. On NixOS you will have to [follow the Lanzaboote guide](https://Github.com/nix-community/lanzaboote), but then it works flawlessly (I have enabled it on my PC and Laptop).

## Conclusion

Overall I am in love with NixOS.

For me

- The amazing community
- The documentation
- The support
- The stability

Have all treated me to a setup which I won't change in any way for the foreseeable future.

I have not mentioned a lot of things which I have set up, but I think that otherwise this post would be way too long. Here is a quick list of things I set up, which you might want to get into (found in my [dotfiles](https://codeberg.org/DontBlameMe/nix_dotfiles)):

- Theming everything using [Catppuccin](https://catppuccin.com)
- Custom scripts which are available system-wide, but defined in the Nix syntax
- Partitioning using [Disko](https://Github.com/nix-community/disko)
- A (hopefully) easy to follow installation guide on how to install my exact setup
- Easily swappable wallpapers
- Backups using my own script
- And so much more...

If you wish to learn more about NixOS I could also recommend the [YouTube video from No Boilerplate](https://www.youtube.com/watch?v=CwfKlX3rA6E), since this is what initially reminded me to get into NixOS (Thank you!).
