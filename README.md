# Blog

A static blog written in Obsidian and published to GitHub Pages. One build script, plain HTML, CSS and JS, and three dependencies: `marked`, `katex` and `yaml`.

## Setup

1. Set `title` and `description` in `site.json`.
2. Push this folder to a GitHub repo, on the `main` branch.
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. In Obsidian, choose **Open folder as vault** and pick `content/`.

The site URL comes from GitHub at deploy time, so project sites, user sites and custom domains all work without changes. The `url` in `site.json` is only a fallback.

## Writing

Create a note in `content/posts/`, then commit and push. The note's filename becomes its title, and everything in the frontmatter is optional:

```yaml
---
title: Overrides the filename
date: 2026-11-01        # defaults to the date the file was first committed
description: Used for the RSS summary and search engines
tags: [one, two]
slug: custom-url
draft: true             # stays off the site, but shows up in `npm run dev`
---
```

If the Templates core plugin is on, **Insert template** adds this frontmatter from `content/templates/post.md`.

Supported Obsidian syntax:

- Links: `[[Note]]`, `[[Note|text]]`, `[[Note#Heading]]`
- Embeds: `![[image.png]]`, `![[image.png|300]]` for a width
- Callouts: `> [!note] Title`
- Math: `$inline$` and `$$display$$`

Links to notes that don't exist become plain text, and the build logs a warning.

## Layout

```
content/          The Obsidian vault
  posts/          Blog posts, at /posts/<slug>/
  pages/          Standalone pages, at /<slug>/
  pages/home.md   Intro text above the post list
  attachments/    Pasted images, at /attachments/<name>
  templates/      Obsidian templates, not published
theme/
  layout.html     The frame around every page
  post.html       A single post
  style.css       All styling; colors and line length are at the top
  site.js         Search and the dark mode toggle
  votes.js        The upvote button
build.js          Turns all of the above into dist/
site.json         Site title, description, header links and service settings
supabase/         Database schema for votes
```

Attachments are published by filename alone, so two files with the same name in different folders will overwrite each other.

## Preview locally

```bash
npm install
```

```bash
npm run dev
```

This serves the site at http://localhost:4000 with drafts included, and rebuilds when you save. Refresh the page to see changes.

## Voting and analytics

Both stay off until `site.json` has their settings, and the site builds fine without them.

**Upvotes (Supabase)**

1. Create a free project at [supabase.com](https://supabase.com), in an EU region.
2. Under **Authentication → Sign In / Providers**, turn on **Allow anonymous sign-ins** and save.
3. Open the **SQL Editor** and run `supabase/schema.sql`.
4. Under the project's API settings, copy the project URL and the publishable (anon) key into `site.json`:

```json
"supabase": { "url": "https://xxxx.supabase.co", "key": "your-publishable-key" }
```

The key is meant to be public. Row-level security in `schema.sql` is what protects the data, so never put the `service_role` or secret key here.

A vote is stored against a post's slug, which comes from its filename. To rename a published post without losing its votes, keep the old URL by adding the old `slug:` to its frontmatter. `npm run dev` uses the same project, so votes you cast there are real.

`.github/workflows/keepalive.yml` reads the database twice a week so the free project doesn't pause. GitHub turns scheduled workflows off after 60 days without repo activity. If that happens, switch it back on in the **Actions** tab. A failed run means Supabase is paused or unreachable. Until it's back, the vote button just stays hidden.

**Analytics (GoatCounter)**

Sign up at [goatcounter.com](https://www.goatcounter.com) and put your site code in `site.json`, for example `"goatcounter": "nocontrol"` for `nocontrol.goatcounter.com`. It only loads on the deployed site, so `npm run dev` isn't counted.

## Customizing

- **Colors:** the variables at the top of `theme/style.css`. `light-dark(a, b)` holds the light and dark values side by side.
- **Reading width:** `--measure` in `theme/style.css`.
- **Page structure:** `theme/layout.html` and `theme/post.html`. `{{name}}` placeholders are filled in by `build.js`.
- **New output:** add a `page(...)` or `write(...)` call in `build()` in `build.js`.
