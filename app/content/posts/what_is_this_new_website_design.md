---
title: What is this new website design?
date: 2025-10-18
summary: Why the site changed shape, why the graph exists, and what the new directory structure is actually for.
tags: meta, design, typst
accent: mauve
---
You may have noticed that the website's design has changed a lot.

In this post I want to highlight **what** and **why** has changed.

## TLDR

If you wish a quick summary on what has changed, and how it may affect you, this section is for you.

Instead, if you want to read in more detail, everything I am saying right here is explained in more detail below.

### Why Has It Changed?

I have changed the website's design because it better fits my style and requirements (**for my workflow**).

#### What Is Different Now?

The overall design is different, and you can also find a nice graph on the side which visualizes connections between notes, just like in my note taking system of choice: Obsidian!

### How Does It Affect Me?

#### RSS

If you were previously using the RSS-Feed I provided, you may need to update your URLs to the ones talked about on the main page.

**The old ones no longer function**.

#### Old Blogposts

I have deleted some of the old blogposts because they simply didn't match my quality criteria.

#### Old Blog Links

The links to the old blogposts (**even if they are still present**) no longer function. You need to replace them with the new links.

#### Usability

I hope that the new website is really usable (even with the new directory-like structure) and that I can provide you with amazing blogposts, and maybe even some unrelated files, on this site!

## Why the Change?

The change mainly occurred because of one reason: **my Obsidian workflow**.

### Obsidian Workflow

Basically, as I explained in this post, I am now using Obsidian to write all of my notes.

But my blog always required me to start up my text editor of choice, [Neovim](https://github.com/neovim/neovim) (by the way), and write my blog in [Markdown](https://en.wikipedia.org/wiki/Markdown) format in the editor.

Yes, I love Markdown, but what I don't love is that I write Markdown in Neovim for my blog, and completely separated, Markdown in Obsidian to create my personal notes.

For me it just feels like those two things should be connected, since I do basically all my writing in Obsidian anyways, and I wish to form connections between things related and unrelated to my blog.

> Important to remember Connecting both your blog and your personal **P**ersonal**K**nowledge**M**anagement is not always a good choice.
> Depending on your workflow, it may even be a really bad idea.
> But for me, due to my specific requirements, it totally was worth it.

### Visuals

Yes, I need to mention the visuals as well.

For me personally, I just love the [Catppuccin](https://catppuccin.com) theme (Maybe a little bit too much, I have been using it **everywhere**).

Using this theme on my website as well, just feels amazing.

Also, I love the "Obsidian-Aesthetic". I don't know why, but having a graph in my blog on my website is really cool.

## What Has Changed?

Now to what exactly has changed.

As you are able to see, the entire website has changed a lot design-wise.

It also has changed structurally, now including directories on the left-hand side, and clickable tags (every `#something` is a tag).

Also, the performance overall should have improved. The entire site should now be stabler and faster, due to it now being a [single page application](https://en.wikipedia.org/wiki/Single-page_application).

### How Does It Affect Me?

There are several things which changed **a lot**, and (hopefully none, or only a few of them) affect you.

#### RSS

Due to me now using a completely new site generator and site-layout, if you have been subscribing to the RSS-Feed of this page, **you need to update your links**.

- If you wish to subscribe to the `index.xml`, you may use [this URL](https://dontblameme.codeberg.page/index.xml).
- And if you wish to subscribe to the `sitemap.xml` you may use [this URL](https://dontblameme.codeberg.page/sitemap.xml).

#### Old Blogposts

A lot of old blogposts have been **removed**.

The simple reason is that those were posts which I either

- Created because I simply wanted "to post something".
- Created with **massive use of AI**, basically not writing anything myself (**since about a year ago I have a strict no-AI rule**).
- Created with no love to the detail, no real insight, or no real reason at all.
- Simply no longer agreed with, or just didn't find worthy to include.

If you still wish to take a look at them, you can find them [in my archived repo](https://codeberg.org/DontBlameMe/pages-old/src/branch/master/posts) (although I can highly recommend against it).

#### Old Links

**Every old link**, be it to a blogpost or maybe a sub-site, **will likeliest no longer work**.

If you have included any page links from my site anywhere, I would love if you could please update them to their new format.

For posts, previously it was something like this: `https://dontblameme.codeberg.page/posts/my-blog-post`,

Whereas now it's like this: `https://dontblameme.codeberg.page/Blog/my-blog-post`.

**But please double-check if those links actually work.**

## What Is the New Workflow?

### What Am I Using Now

I am now using a new static-site-generator (which can also be found at the bottom of the page): [Quartz](https://github.com/jackyzha0/quartz).

#### But Why Quartz?

Yeah the answer is pretty simple. It works in perfect harmony with Obsidian.

When creating a new Quartz website, you can specify which Vault-path to use (I am using a subdirectory of my actual Obsidian Vault), and then it **just works**.

#### No Downsides at All?

> Disclaimer These issues only affects **my personal** use-case, because I am using a **subdirectory** of my actual Vault.
> If I would be publishing my entire Vault, this wouldn't be an issue.

##### Attachment? Move It

If I wish to include an attachment into a blogpost, I actually have to **move the attachment** into the **Blogs** directory I am using to write this.

Yes, it makes total sense, since **Quartz doesn't have access to any other files** in my Vault, but I still wished that it would still be able to include those files without me having to **click two buttons**.

**For the interested people:** This happens because **my attachments directory is in a separate directory than Quartz**, **not** inside of **a subdirectory in Quartz**. I did this because I still wish to keep those things separate (and I have a lot of personal notes).

##### Not in the Directory? Too Bad

This issue I have directly connects with the attachment issue I just mentioned.

If I mention a page which exists in my **personal** Vault section, but not in the Blog section, the link shows up as perfectly valid in Obsidian (because in Obsidian it actually is valid).

But if I take a look at the blog site, it is linking to a 404 page.

Yes, this is also because the mentioned page **does not exist in Quartz**, but it is still annoying, because I maybe want to link somewhere to make a **personal Vault connection**.

I simply wished for the blog to simply **not include those links**.

> Important update I managed to fix this exact issue with the links, by [implementing my own transformer](https://quartz.jzhao.xyz/advanced/making-plugins)!
> Now every link to a page which exists in Obsidian but not in Quartz will simply be "normal text".
> This is **exactly** what I wished for!

### How Exactly Does the New Workflow Work

Now what did I gain from switching to Quartz?

Thanks to the [QuickAdd](https://github.com/chhoumann/quickadd) Obsidian plugin I have gained my (almost) dream workflow:

I create and write **everything** in Obsidian.

To create a blogpost I simply press one key combination, type in "Blog", create and name it, and start writing.

If I wish to live-test how it would be looking on my website, I go into the **Quartz** directory and simply run `nix run .#dev` (Thanks, NixOS).

Once I am ready to publish (or update) to my website, I go into the **Quartz** directory and simply run `nix run .#prod` (Thanks, NixOS), which sends it off to [Codeberg](https://codeberg.org/DontBlameMe).

**And that is it.**

The entire building part of the website is handled by a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline hosted on my [Codeberg repository](https://codeberg.org/DontBlameMe/pages).

If you wish to see the CI/CD file, you can find it [here](https://codeberg.org/DontBlameMe/pages/src/branch/v4/.forgejo/workflows/deploy.yml).

### But What Is This Theme?

Now you may be wondering: **Okay, but this is not how Quartz looks out-of-the-box?**

And you are right. I am using a separate project named [Quartz-Themes](https://github.com/saberzero1/quartz-themes) to allow for those amazing themes.

#### Why Is It So Amazing?

It simply is so amazing because **I can just use my Obsidian theme**.

And yes, It also is just **one command** to adapt my entire website's style to my theme of choice.

#### Which Theme Are You Using?

I am currently using the **AnuPpuccin** theme. This is the theme I previously used in Obsidian as well.

### Did You Modify Anything?

**Yes!**

I modified quite some CSS (Variables) and configs.

First of all, I modified how links and **highlights like this** look. Before modifying them, I didn't enjoy the padding of them.

I also did the same to call out blocks, since previously they had close to no padding on the left side.

Also, I modified the 404 page to be more my style. You can take a look at it e.g. [here](https://dontblameme)

Finally, as mentioned here, I added my own transformer to not show non-existing links.

I am pretty sure that this is just the starting point though, since adding custom functionality and custom themes is so easy with [Quartz](https://github.com/jackyzha0/quartz)!

## Closing Words

I just want to say thank you for reading my post.

I love tinkering around, and I especially enjoy it if I can help somebody else in the process.

If you wish you could let me know what you think about this new design on any way of contacting me (linked below)!
