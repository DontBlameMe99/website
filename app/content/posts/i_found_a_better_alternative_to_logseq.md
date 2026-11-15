---
title: I found a better alternative to Logseq
date: 2025-05-15
summary: Logseq was almost right. Here is what pushed me back to Obsidian, what the graph looks like now, and how it feeds this blog.
tags: notes, obsidian, pkm
accent: blue
---
## Logseq - a Brief Recap

So you might be unaware of what [Logseq](https://logseq.com/) is. Logseq is basically a [PKM](https://en.wikipedia.org/wiki/Personal_knowledge_management) application. This means that you can write everything you think of in there and know how to search for it. This allows your brain to **no longer have to think of it**. This basically increases your peace of mind, while also ensuring that you are never going to forget **anything**.

## Problems of Logseq

The problems of Logseq took awhile to surface for me, but when they did, they were really bothering me.

### 1: Slow Performance

Logseq got really slow, really fast for me. I had been using Logseq for somewhere around two months when it started to get really slow. What do I mean by that? Searching took ~3 seconds and opening notes took around a second as well. Starting Logseq maybe took around 5-10 seconds, depending on the day. This might not seem that bad, but when you quickly want to write something down, this becomes annoying really fast.

### 2: Bad [LaTeX](https://en.wikipedia.org/wiki/LaTeX) Support

I don't want Logseq to look bad. The support for LaTeX was fine, but compared to another alternative (which I will explain in a short time), it just seems like it misses a lot. You can write LaTeX, but there are no automatic completions and you have to write every character yourself.

### 3: Syncing Conflicts

Now, this is a "me personally" issue. I am syncing all my notes across multiple devices using [Syncthing](https://syncthing.net/). When Syncthing has a problem syncing files (because there might be two different files on each device), it creates a `sync-conflict` file. This happened **a lot** to me while using Logseq. Yes, I could just use another sync provider, but I want everything to remain fully local.

### 4: Bad Links

Logseq uses the [Markdown](https://en.wikipedia.org/wiki/Markdown) format for its files. But when using links between files, for whatever reason, Logseq starts using some kind of weird links. Normally, a Markdown link should look like this: `[[FileName]]` or, if it should have a custom name, it would look like this: `[[FileName|DisplayName]]` or `[DisplayName](FileName)`.

> Update I have noticed on a friend's PC that Logseq now apparently also uses "normal" links?
> So I am not sure if they: A) Changed this behavior or B) It just was a me-problem but anyways, this seems to no longer be an issue now.

But for whatever reason, Logseq uses a format along the lines of:

`[MyFile|1f02da65-77b8-6821-86b8-562aef941e89]`

> Disclaimer I am unaware of the exact format it used.
> This is what I think it looked like.

### 5: Plugins

Logseq does not have a large number of plugins (at the time of writing, Logseq has **374** plugins). But compared to the alternative I am going to tell you about, this is a small amount. Personally, I often had the problem that I wanted to achieve task X, but there was no plugin available to achieve this. This changed with the alternative (even though I had this problem there as well, [but I was able to create my own solution for the problem](https://github.com/DontBlameMe99/Tick-Tones) 🙂).

## The Solution

The solution is another PKM with the name ["Obsidian"](https://obsidian.md/). It is sadly not [OSS](https://en.wikipedia.org/wiki/Open-source_software), but it is local-first and privacy-respecting. Obsidian is basically available **for free** [everywhere](https://obsidian.md/download). The only paid thing there is, is their paid syncing service. But because I am using [Syncthing](https://syncthing.net), I did not care about this offer.

Addressing the problems:

### 1: Slow Performance

The performance of Obsidian is way better compared to Logseq. From my subjective experience, I can say that searching for files (thanks to [Omnisearch](https://github.com/scambier/obsidian-omnisearch)) is snappy, opening them doesn't take ages, and launching Obsidian is also pretty fast. The only **major disadvantage** I have found is that Obsidian is really slow on mobile. But this is a known issue, and I hope for it to be fixed in the future.

Just to be clear, Obsidian Mobile takes around 6-8 **seconds** for me to load.

Not closing it (and letting Android do the work) reduces it to split seconds, though. But compared to Logseq, it is not that bad; Logseq had around 5 **seconds** as well. And on Desktop, Logseq took ages, and Obsidian starts within two seconds.

### 2: Bad [LaTeX](https://en.wikipedia.org/wiki/LaTeX) Support

Obsidian natively has pretty okay LaTeX support (similar to Logseq). But when you install an awesome community plugin, it is simply the best. The plugin I am talking about is, of course, [LaTeX Suite](https://github.com/artisticat1/obsidian-latex-suite). Why is the plugin so awesome? Simple. Because it includes:

- A live rendered preview of what you are doing.
- Awesome autocompletes (e.g., typing `vec` would automatically become `\vec{}`).
- Customizable autocompletes. I, for example, made `/ml` automatically create a LaTeX block with the `align` enabled.

### 3: Syncing Conflicts

Obsidian is not the holy fix for all syncing conflicts ever, but it includes an awesome setting to mitigate a lot of them. Obsidian allows you to enable a separate profile folder for each device. This means that my desktop could save to a `.desktop` folder, while my smartphone saves to a `.smartphone` folder.

This eliminates a lot of syncing conflicts I previously had with Obsidian.

**Yes, there are still some syncing conflicts,** but they are pretty rare. I would say on one day of heavy mixed-device usage, I would get around one sync conflict. Compared to Logseq, where I had ~10 in the same time, this is a blessing.

### 4: Bad Links

This simply is not an issue in Obsidian. Obsidian uses this linking format:

`[[FileName]]` and that's it. You may define a custom display name using `[[FileName|DisplayName]]`, but that is not always needed. By the way, this defining of a display name was not possible in Logseq. This allows you to not have to create an alias for a page just because you want to write the plural of something, and so on. Basically, this feature has saved me a lot of headaches.

### 5: Plugins

Compared to Logseq, Obsidian has a ton of plugins. At the time of writing this, Obsidian has around **2,450** plugins. Compared to the "only" 374 plugins of Logseq, this feels amazing. You can basically search for whatever you want and (most of the time) you will find exactly what you were looking for. If you can't find what you were looking for, just create the plugin yourself ([like I did 😄](https://github.com/DontBlameMe99/Tick-Tones)).

## Moving Files from Logseq into Obsidian

This might seem like the easiest process, you think. But let me tell you, it was not. Because of all the differences in Logseq's interpretation of Markdown and the actual Markdown syntax (as Obsidian uses it), it was a pain.

There are some plugins in Obsidian to help with this process, but for me, they created more work than they solved. For me, the final solution was pretty simple: Manually copy over the notes I needed, and simply let the other stuff stay on my hard drive, but not in Obsidian.

This decision was made easier by me taking a look at the notes and links I had in Logseq and realizing that a lot of them were dumb and useless. As an example, I had a page named `I` which was automatically linked to every `I` I typed? Why would someone do that? Anyways, now after quite some time of usage, I think that I am no longer missing anything.

### How Many Files Do You Have Now?

Before my transformation, I had **493** custom files (and 618 pages with all the automatic pages) in Logseq. Now in Obsidian, I have **412** files. Yes, a few ones (I would guess around 100 files) are missing, but apparently I don't need them.

## How Does Your Graph Look?

This is the one and only (obviously useless) question you may ask a PKM-system user. Yes, I will answer it. Here is my old Logseq graph:

![](/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031703.webp)

And here is my new Obsidian graph:

![](/posts/i_found_a_better_alternative_to_logseq/Pasted%20image%2020251017031716.webp)

## But What Happened to Your Blog Pipeline?

If you read my (no longer available) blog post about redesigning my website, you might know that I was able to write my blog in Logseq, hit a button to export it, and then simply run a script. Thanks to [NetworkChuck's blog post](https://blog.networkchuck.com/posts/my-insane-blog-pipeline/) I randomly found, I now simply run one single script to compile and publish my blog (getting everything straight from Obsidian). I needed to tweak the script from NetworkChuck a lot, but in the end, it worked out perfectly. I might write another blog post about this topic (which explains it in more detail) in the future. 😀

## More General Advantages of Obsidian I Found

### Separating Tags and Links

Some generally positive things I found in Obsidian are the splitting of tags (`#something`) and links (`[[something]]`). At first, I thought that this was useless and/or weird behavior, but after actually using it separately, I must say that I actually love that behavior and I would never want it to change.

But why? Simple: Because I use `#something` to **organize** my files (like a directory, but using a tag allows a file to be in multiple "directories" at once), and I use the `[[page]]` to actually link two pages together.

### The Community

Obviously, Obsidian is bigger. This is why it is also no surprise that the community is way bigger. But the thing I was surprised about: The community is still completely nice and friendly. This is something I did not expect (I chatted with a lot of them via their [Discord server](https://obsidian.md/community)).

### The Themes

Obsidian also allows users to create their custom themes. Yes, Logseq did also allow that. But once again: Obsidian's community is bigger, therefore there are also way more (high-quality) themes. Another thing about themes which surprised me is that you can use a plugin ([Obsidian Style Settings](https://github.com/mgmeyers/obsidian-style-settings)) to customize how the theme behaves, its colors, and so much more. You can even create and use your own CSS snippets.
