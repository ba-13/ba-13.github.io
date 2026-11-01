// Turns content/ + theme/ into a static site in dist/.
//   node build.js          build once
//   node build.js --serve  build, serve on :4000, rebuild on change (includes drafts)

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import katex from "katex";
import { Marked } from "marked";
import { parse as parseYaml } from "yaml";

const SERVE = process.argv.includes("--serve");
const PORT = process.env.PORT || 4000;
const FEED_LIMIT = 20;
const CONTENT = "content";
const THEME = "theme";
const DIST = "dist";
const SKIP_DIRS = new Set([".obsidian", ".trash", "templates"]);

// ---------- helpers ----------

const read = (file) => fs.readFileSync(file, "utf8");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

const isoDate = (d) => d.toISOString().slice(0, 10);

const fill = (template, vars) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");

function write(urlPath, data) {
  const file = path.join(DIST, urlPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (SKIP_DIRS.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

// ---------- reading content ----------

function splitFrontmatter(file) {
  const raw = read(file);
  const m = raw.match(/^---[ \t]*\r?\n([\s\S]*?\r?\n)?---[ \t]*(?:\r?\n|$)/);
  if (!m) return { meta: {}, body: raw };
  try {
    return { meta: parseYaml(m[1] ?? "") ?? {}, body: raw.slice(m[0].length) };
  } catch (err) {
    throw new Error(`${file}: invalid frontmatter: ${err.message}`);
  }
}

// Posts without a `date` use the commit that first added them, or today if uncommitted.
function firstCommitDate(file) {
  try {
    const out = execFileSync(
      "git",
      ["log", "--follow", "--diff-filter=A", "--format=%aI", "--", file],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    return out.trim().split("\n").pop();
  } catch {
    return "";
  }
}

function postDate(file, value) {
  const date = new Date(value || firstCommitDate(file) || Date.now());
  if (isNaN(date)) throw new Error(`${file}: invalid date "${value}"`);
  return date;
}

function parseTags(value) {
  const list = Array.isArray(value)
    ? value
    : String(value ?? "").split(/[,\s]+/);
  return [
    ...new Set(
      list
        .map((t) => String(t).replace(/^#/, "").trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
}

function loadDocument(file, urlPrefix) {
  const { meta, body } = splitFrontmatter(file);
  const name = path.basename(file, ".md");
  const slug = slugify(String(meta.slug || name));
  return {
    file,
    name,
    body,
    slug,
    url: `${urlPrefix}${slug}/`,
    title: String(meta.title || name),
    description: meta.description ? String(meta.description) : "",
    draft: meta.draft === true,
    date: urlPrefix === "/posts/" ? postDate(file, meta.date) : null,
    tags: parseTags(meta.tags),
  };
}

function markdownFiles(dir) {
  return fs.existsSync(dir) ? walk(dir).filter((f) => f.endsWith(".md")) : [];
}

function loadPosts() {
  const posts = markdownFiles(path.join(CONTENT, "posts")).map((file) =>
    loadDocument(file, "/posts/"),
  );
  const seen = new Map();
  for (const post of posts) {
    if (seen.has(post.url))
      throw new Error(
        `${post.file} and ${seen.get(post.url)} both publish to ${post.url}`,
      );
    seen.set(post.url, post.file);
  }
  return posts.filter((p) => SERVE || !p.draft).sort((a, b) => b.date - a.date);
}

function loadPages() {
  return markdownFiles(path.join(CONTENT, "pages"))
    .map((file) => loadDocument(file, "/"))
    .filter((p) => SERVE || !p.draft);
}

// ---------- markdown ----------

// `base` prefixes internal links: the site's path for pages, its full URL for the feed.
function createRenderer({ base, mathOutput, docs, attachments, source, warn }) {
  const math = (tex, displayMode) =>
    katex.renderToString(tex, {
      displayMode,
      output: mathOutput,
      throwOnError: false,
    });

  const attachmentUrl = (name) =>
    `${base}/attachments/${encodeURIComponent(path.basename(name))}`;

  const docUrl = (target) => {
    const name = path.basename(target, ".md").toLowerCase();
    const doc = docs.find((d) => d.name.toLowerCase() === name);
    return doc ? base + doc.url : null;
  };

  const resolveHref = (href) => {
    if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) return href;
    if (href.startsWith("/")) return base + href;
    const [target, hash = ""] = decodeURI(href).split("#");
    const anchor = hash && `#${slugify(hash)}`;
    if (target.endsWith(".md")) {
      const url = docUrl(target);
      if (url) return url + anchor;
      warn(`${source.file}: broken link "${href}"`);
      return href;
    }
    return attachments.has(path.basename(target))
      ? attachmentUrl(target)
      : href;
  };

  const wikilink = (target, label) => {
    const [name, hash = ""] = target.split("#");
    const anchor = hash && `#${slugify(hash)}`;
    const url = name ? docUrl(name) : "";
    if (url === null) warn(`${source.file}: broken link "[[${target}]]"`);
    const text = esc(label || name || hash);
    return url === null ? text : `<a href="${esc(url + anchor)}">${text}</a>`;
  };

  const embed = (target, label) => {
    if (!attachments.has(path.basename(target))) {
      warn(`${source.file}: missing attachment "${target}"`);
      return esc(target);
    }
    const url = esc(attachmentUrl(target));
    if (!/\.(png|jpe?g|gif|svg|webp|avif|bmp)$/i.test(target))
      return `<a href="${url}">${esc(label || target)}</a>`;
    // Obsidian uses ![[image.png|300]] to set a width
    const size = /^\d+$/.test(label ?? "") ? ` width="${label}"` : "";
    return `<img src="${url}" alt="${size ? "" : esc(label ?? "")}"${size} loading="lazy">`;
  };

  return new Marked({
    gfm: true,
    walkTokens(token) {
      if (token.type === "link" || token.type === "image")
        token.href = resolveHref(token.href);
    },
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text.replace(/<[^>]+>/g, ""));
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      // Obsidian callouts: > [!note] Optional title
      blockquote({ tokens }) {
        const body = this.parser.parse(tokens);
        const m = body.match(/^<p>\[!(\w+)\][+-]?[ \t]*(.*?)(\n|<\/p>)/);
        if (!m) return `<blockquote>\n${body}</blockquote>\n`;
        const title =
          m[2] || m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
        const rest = body.slice(m[0].length);
        return `<div class="callout"><p class="callout-title">${title}</p>${m[3] === "\n" ? `<p>${rest}` : rest}</div>\n`;
      },
    },
    extensions: [
      {
        name: "mathBlock",
        level: "block",
        start: (src) => src.match(/^\$\$/m)?.index,
        tokenizer(src) {
          const m = src.match(/^\$\$([\s\S]+?)\$\$[ \t]*(?:\n+|$)/);
          if (m) return { type: "mathBlock", raw: m[0], tex: m[1].trim() };
        },
        renderer: (token) => `${math(token.tex, true)}\n`,
      },
      {
        name: "mathInline",
        level: "inline",
        start: (src) => src.match(/(?<!\\)\$/)?.index,
        tokenizer(src) {
          const display = src.match(/^\$\$([^$]+?)\$\$/);
          if (display)
            return {
              type: "mathInline",
              raw: display[0],
              tex: display[1].trim(),
              display: true,
            };
          // Same rule as pandoc, so "$5 and $10" stays plain text
          const m = src.match(/^\$(?!\s)((?:\\.|[^$\\\n])+?)(?<!\s)\$(?!\d)/);
          if (m)
            return { type: "mathInline", raw: m[0], tex: m[1], display: false };
        },
        renderer: (token) => math(token.tex, token.display),
      },
      {
        name: "wikilink",
        level: "inline",
        start: (src) => src.match(/!?\[\[/)?.index,
        tokenizer(src) {
          const m = src.match(/^(!?)\[\[([^\]|\n]+)(?:\|([^\]\n]*))?\]\]/);
          if (m)
            return {
              type: "wikilink",
              raw: m[0],
              embed: !!m[1],
              target: m[2].trim(),
              label: m[3]?.trim(),
            };
        },
        renderer: (token) =>
          (token.embed ? embed : wikilink)(token.target, token.label),
      },
    ],
  });
}

function toPlainText(html) {
  const entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };
  return html
    .replace(/<math[\s\S]*?<\/math>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|lt|gt|quot|#39);/g, (e) => entities[e])
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text, length = 160) {
  return text.length <= length
    ? text
    : `${text.slice(0, length).replace(/\s+\S*$/, "")}…`;
}

// ---------- html fragments ----------

const dateTag = (date) =>
  `<time datetime="${isoDate(date)}">${isoDate(date)}</time>`;

const tagUrl = (base, tag) => `${base}/tags/${slugify(tag)}/`;

const tagLinks = (base, tags) =>
  tags
    .map((t) => `<a class="tag" href="${tagUrl(base, t)}">#${esc(t)}</a>`)
    .join(" ");

const postList = (base, posts) =>
  `<ul class="post-list">\n${posts
    .map(
      (p) =>
        `<li>${dateTag(p.date)} <a href="${base}${p.url}">${esc(p.title)}</a>${p.draft ? " <em>(draft)</em>" : ""}</li>`,
    )
    .join("\n")}\n</ul>`;

// ---------- feeds ----------

const cdata = (s) => `<![CDATA[${s.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;

function rss(site, posts) {
  const items = posts.slice(0, FEED_LIMIT).map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(site.url + p.url)}</link>
      <guid>${esc(site.url + p.url)}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${esc(p.description || excerpt(p.text))}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <content:encoded>${cdata(p.feedHtml)}</content:encoded>
    </item>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${esc(site.url)}/</link>
    <description>${esc(site.description)}</description>
    <language>${esc(site.language)}</language>
    <atom:link href="${esc(site.url)}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.length ? `    <lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;
}

function sitemap(site, urls) {
  const entries = urls
    .map((u) => `  <url><loc>${esc(site.url + u)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

// ---------- build ----------

function build() {
  const site = JSON.parse(read("site.json"));
  site.url = (
    SERVE ? `http://localhost:${PORT}` : process.env.SITE_URL || site.url
  ).replace(/\/+$/, "");
  const base = new URL(site.url).pathname.replace(/\/+$/, "");

  const layout = read(path.join(THEME, "layout.html"));
  const postTemplate = read(path.join(THEME, "post.html"));
  const nav = site.nav
    .map((n) => `<a href="${esc(base + n.href)}">${esc(n.label)}</a>`)
    .join("\n");

  // Voting and analytics stay off until site.json has their settings
  const { url: votesUrl, key: votesKey } = site.supabase ?? {};
  const votesEnabled = Boolean(votesUrl && votesKey);
  const analytics =
    site.goatcounter && !SERVE
      ? `<script data-goatcounter="https://${esc(site.goatcounter)}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`
      : "";
  const voteButton = (slug) =>
    votesEnabled
      ? `<button class="vote" type="button" aria-label="Upvote this post" aria-pressed="false" data-url="${esc(votesUrl)}" data-key="${esc(votesKey)}" data-slug="${esc(slug)}"><span aria-hidden="true">▲</span> <span class="vote-count">0</span></button>`
      : "";

  const page = (
    url,
    { title, description, content, math = false, votes = false },
  ) => {
    const pageTitle = title ? `${title} · ${site.title}` : site.title;
    return write(
      url.endsWith("/") ? `${url}index.html` : url,
      fill(layout, {
        lang: esc(site.language),
        base,
        title: esc(pageTitle),
        ogTitle: esc(title || site.title),
        description: esc(description || site.description),
        canonical: esc(site.url + url),
        siteTitle: esc(site.title),
        nav,
        math: math
          ? `<link rel="stylesheet" href="${base}/assets/katex/katex.min.css">`
          : "",
        scripts: [
          votes &&
            `<script type="module" src="${base}/assets/votes.js"></script>`,
          analytics,
        ]
          .filter(Boolean)
          .join("\n  "),
        content,
      }),
    );
  };

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const files = walk(CONTENT);
  const attachments = new Set(
    files.filter((f) => !f.endsWith(".md")).map((f) => path.basename(f)),
  );
  const posts = loadPosts();
  const pages = loadPages();
  const docs = [...posts, ...pages];

  for (const doc of docs) {
    const options = { docs, attachments, source: doc };
    doc.html = createRenderer({
      ...options,
      base,
      mathOutput: "htmlAndMathml",
      warn: console.warn,
    }).parse(doc.body);
    // Feed readers have no KaTeX stylesheet, so the feed gets MathML and absolute links
    doc.feedHtml = createRenderer({
      ...options,
      base: site.url,
      mathOutput: "mathml",
      warn: () => {},
    }).parse(doc.body);
    doc.text = toPlainText(doc.feedHtml);
    doc.hasMath = doc.html.includes('class="katex');
  }

  for (const post of posts) {
    page(post.url, {
      title: post.title,
      description: post.description || excerpt(post.text),
      math: post.hasMath,
      votes: votesEnabled,
      content: fill(postTemplate, {
        title: esc(post.title),
        date: dateTag(post.date),
        tags: tagLinks(base, post.tags),
        content: post.html,
        vote: voteButton(post.slug),
      }),
    });
  }

  // pages/home.md is the intro above the post list; every other page gets its own URL
  const home = pages.find((p) => p.name === "home");
  for (const doc of pages.filter((p) => p !== home)) {
    page(doc.url, {
      title: doc.title,
      description: doc.description || excerpt(doc.text),
      math: doc.hasMath,
      content: `<article>\n<h1>${esc(doc.title)}</h1>\n${doc.html}</article>`,
    });
  }

  page("/", {
    math: home?.hasMath,
    content: `${home ? `<div class="intro">\n${home.html}</div>\n` : ""}${postList(base, posts)}`,
  });

  const tags = new Map();
  for (const post of posts) {
    for (const tag of post.tags)
      tags.set(tag, [...(tags.get(tag) ?? []), post]);
  }
  const sortedTags = [...tags.keys()].sort();
  for (const tag of sortedTags) {
    page(`/tags/${slugify(tag)}/`, {
      title: `#${tag}`,
      content: `<h1>#${esc(tag)}</h1>\n${postList(base, tags.get(tag))}`,
    });
  }
  const tagItems = sortedTags.map(
    (t) =>
      `<li><a class="tag" href="${tagUrl(base, t)}">#${esc(t)}</a> <span class="count">${tags.get(t).length}</span></li>`,
  );
  page("/tags/", {
    title: "Tags",
    content: `<h1>Tags</h1>\n<ul class="tag-list">\n${tagItems.join("\n")}\n</ul>`,
  });

  page("/404.html", {
    title: "Not found",
    content: `<h1>Not found</h1>\n<p>That page doesn't exist. <a href="${base}/">Go home</a>.</p>`,
  });

  const published = docs.filter((d) => d !== home);
  write(
    "/search.json",
    JSON.stringify(
      published.map((d) => ({
        title: d.title,
        url: base + d.url,
        tags: d.tags,
        text: d.text,
      })),
    ),
  );
  write("/feed.xml", rss(site, posts));
  write(
    "/sitemap.xml",
    sitemap(site, [
      "/",
      "/tags/",
      ...published.map((d) => d.url),
      ...sortedTags.map((t) => `/tags/${slugify(t)}/`),
    ]),
  );
  write(
    "/robots.txt",
    `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
  );

  for (const file of files.filter((f) => !f.endsWith(".md"))) {
    write(`/attachments/${path.basename(file)}`, fs.readFileSync(file));
  }
  for (const asset of ["style.css", "site.js", "votes.js"]) {
    fs.cpSync(path.join(THEME, asset), path.join(DIST, "assets", asset));
  }
  if (docs.some((d) => d.hasMath)) {
    const katexDist = "node_modules/katex/dist";
    fs.cpSync(
      path.join(katexDist, "katex.min.css"),
      path.join(DIST, "assets/katex/katex.min.css"),
    );
    fs.cpSync(
      path.join(katexDist, "fonts"),
      path.join(DIST, "assets/katex/fonts"),
      {
        recursive: true,
        filter: (src) => !/\.(woff|ttf)$/.test(src),
      },
    );
  }

  console.log(
    `Built ${posts.length} posts, ${pages.length} pages, ${tags.size} tags`,
  );
}

// ---------- dev server ----------

function serve() {
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".xml": "application/xml",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
  };

  http
    .createServer((req, res) => {
      let file = path.join(
        DIST,
        path.normalize(decodeURIComponent(req.url.split("?")[0])),
      );
      if (file.endsWith(path.sep)) file = path.join(file, "index.html");
      const found = fs.existsSync(file) && fs.statSync(file).isFile();
      res.writeHead(found ? 200 : 404, {
        "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      });
      res.end(fs.readFileSync(found ? file : path.join(DIST, "404.html")));
    })
    .listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));

  let timer;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (err) {
        console.error(err.message);
      }
    }, 100);
  };
  for (const target of [CONTENT, THEME, "site.json"])
    fs.watch(target, { recursive: true }, rebuild);
}

build();
if (SERVE) serve();
