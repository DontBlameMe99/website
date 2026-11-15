---
title: Backups - You only want them once you need them
date: 2025-11-12
summary: A backup you have never restored is a hope, not a backup. The 3-2-1 rule, the threat model behind it, and the day my password manager lived inside the thing it was meant to save.
tags: backups, privacy, linux
accent: teal
---
## What Are Backups

Before we can understand what I'm doing and why, we must agree on what I mean by 'backup'.

What backups are **not**:

- A copy of your files on the same disk
- A partial copy of your important files
- A "I-Do-It-Whenever-I-Think-About-It" copy of your files

What are backups:

- A secure, *preferably* **encrypted** copy of all your files onto:
  - a separate disk
  - a remote location

## A Little Story

Now please for a second image yourself being a ~15 year old guy, newly getting into Linux and programming. Your knowledge is at the peak of the **Mount Stupid**: ![](/posts/backups_you_only_want_them_once_you_need_them/Dunning-Kruger%20Effect.svg) You think you know everything. You remember that you heard "keep backups!" somewhere. Of course, you also don't want to lose your entire system, which took a much longer time to configure than you anticipated (another form of procrastination I had).

What do you do?

That's right, keep backups on a local hard drive, since it costs no money and you had one collecting dust anyways. Oh, and as I mentioned above, keeping them encrypted is a good choice, you knew this back then. Of course you encrypted the backups and, as intelligent as you felt, saved the backup phrase into your local password manager.

Since the backups are set up and everything appears to be working, you continue with your normal life. Then, the day you never want to encounter appears. You **need** your backups **right now**.

Let's use the backups from the external disk, you thought.

But what was the password of the disk again? ... Yeah, its saved in the password manager! And where is the password manager? That's right, **in the backup**...

Yes, on this day I created my own [chicken and egg](https://en.wikipedia.org/wiki/Chicken_or_the_egg) situation.

And yes, this resulted in me having to set up everything from scratch, resetting my password everywhere I possibly could, loosing some accounts and configurations in the process. I shed some tears, but I learnt a valuable lesson from it:

**Always keep one more backup than you think you will ever need**.

## 3-2-1 Rule

Possibly you have heard of this as well, if you heard of "keep backups" at any point. [3-2-1](https://en.wikipedia.org/wiki/Glossary_of_backup_terms).

- **3** backups in total.
- **2** local copies.
- **1** remote copy.

This rule is what some people call the least amount of backups you should have.

Because everybody is different, it's important that you define your own [threat model](https://en.wikipedia.org/wiki/Threat_model). For me, I define it as my **entire house** burning down, resulting in me **losing everything I own**.

### I Interpret It a Little Bit

I interpret the **2** in the 3-2-1 rule a little bit. For me, a local backup, or a backup in general, consists of the files I don't want to lose. I do not care that much about losing my programming project X, since it's also secured remotely (both on my backup and on my git provider).

## My Old Setup

In the past I did all my backups using a simple shell script I wrote. It consisted of [rsync](https://en.wikipedia.org/wiki/Rsync) incrementally backing up my files to **one** external HDD (which is so old at this point that I am expecting it to die anytime). Once my drive got full, I nuked all my backups and started from scratch.

## My New Setup

My new setup is way more advanced and objectively better. First of all, I sync my most important data to my phone and laptop, using [Syncthing](https://syncthing.net/). This ensures that I have the most important files I need everywhere, all the time.

I am also creating incremental, compressed and encrypted backups, onto:

- My still (somehow?) not dead external HDD
- A rented cloud storage box

These encrypted backups get created with borgmatic.

### What Is [Borgmatic](https://torsion.org/borgmatic/)?

You possibly never heard of this tool. At least I hadn't, before setting up my backups. To summarize it: **Borgmatic is the tool of my dreams**.

It allows you to:

- Create incremental backups
- Encrypt them using a password
- Store them locally (decrypted, if you wish so)
- Store them remotely (via ssh, etc.)

And, of course, it integrates with NixOS and home-manager.

This, as an example is my current setup (found on [my Codeberg](https://codeberg.org/DontBlameMe/nix_dotfiles/src/commit/1713dff74db0c93c083a27e66677610c6901bb90/modules/home/backup.nix)),

I have annotated it so you can understand it:

```nix
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
            repositories = ["ssh://${config.backup.remote.ssh_name}/./Borg"]; # The destination where to backup to
            inherit (config.backup) patterns; # The "patterns". This consists of which files to include or exclude
          };

          storage.encryptionPasscommand = "cat ${config.backup.remote.password_path}"; # Set the repository password to use

          retention = { # This section defines how long we want to keep the backups
            keepDaily = 60; # Keep one daily backup for the last 60 days
            keepWeekly = 52; # Keep one weekly backup from the last 52 weeks
            keepMonthly = 36; # Keep one monthly backup from the last 36 months
            keepYearly = 20; # Keep one yearly backup from the last 20 years
          };
        };
      };
    };
```

As you can see, there is no plaintext password inside of the nix code. The password gets supplied directly into borgmatic by using the

`storage.encryptionPasscommand`.

### Is the Remote Backup Encrypted, Though?

Yes. But as I said, my threat model includes me losing everything. This also includes my local password manager, which includes my backup decryption password. But how would I still get access to this? Let me introduce you to the real-life. I know, it can be a scary place. But for this exact scenario it's perfect. Personally, I have created a small Database in KeePassXC, including the required information to access my backup server and decrypt the backups. This small Database is, of course, encrypted with a secure password I have remembered. Now, I gave this Database to trusted people and they store it inside of their secure backup process (inside of their own separate real-life location).

This means for me actually losing everything, one of these cases needs to happen:

- Every person who has my backup Database needs to lose their entire backup stack at once, and at the same time my house needs to burn down
- My house burns down and at the same time my remote backup solution needs to get deleted (which is unlikely, due to them backing it up as well)
- I somehow forget a password I have been using and remembering for years (This is the one point I might change in the future - due to me sometimes being stupid, I would not rule this one out)

But I consider these scenarios so unlikely, that I am fine with them.

## Closing Words

Hopefully I can motivate you to take a look at your backup system. If so, please do these two steps:

- Image your worst threat model scenario. How would you go about recovering? Would these steps actually work out? (this includes trying them out and seeing that you would be able to access what you need)
- Try to restore from your backup(s). Are the files correct? Is your automated backup even working?

Personally, I think backups are a topic that gets covered far less than it should be. Yes, it may be boring and you (hopefully) never find yourself in a situation where you need them, but you should be prepared for it.

With that I hope that you find this story fun, entertaining and even learnt something. Let me know what you think on my linked methods below!
