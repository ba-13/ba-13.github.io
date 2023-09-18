---
layout: post
title: "How to approach Jekyll"
excerpt-separator: <!---->
tags: basics static-site
---

This is my introduction to the world of static sites, and how intuitive you can make them.  
Jekyll is especially quite configurable. Try it out with this blog.

<!---->

## Jekyll it is

A static file-system generator, that is incredibly convenient.  
Install `ruby` with

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf
gem update
gem install jekyll bundler # installing jekyll and bundler
```

Now to initiate your site:

```bash
jekyll new mysite
cd mysite
bundle add webrick
```

Try running the site with:

```bash
bundle exec jekyll serve
```

---

## Some basics of Jekyll subsystem

### \_config.yml

The location to customize the site's configuration. The following are defaults:

<details>

<summary>_config.yml</summary>

<pre>
# Where things are
source: .
destination: ./_site
collections_dir: .
plugins_dir:_plugins # takes an array of strings and loads plugins in that order
layouts_dir: _layouts
data_dir:_data
includes_dir: _includes
sass:
sass_dir:_sass
collections:
  posts:
    output: true

# Handling Reading

safe: false
include: [".htaccess"]
exclude:
  [
    "Gemfile",
    "Gemfile.lock",
    "node_modules",
    "vendor/bundle/",
    "vendor/cache/",
    "vendor/gems/",
    "vendor/ruby/",
  ]
keep_files: [".git", ".svn"]
encoding: "utf-8"
markdown_ext: "markdown,mkdown,mkdn,mkd,md"
strict_front_matter: false

# Filtering Content

show_drafts: null
limit_posts: 0
future: false
unpublished: false

# Plugins

whitelist: []
plugins: []

# Conversion

markdown: kramdown
highlighter: rouge
lsi: false
excerpt_separator: "\n\n"
incremental: false

# Serving

detach: false
port: 4000
host: 127.0.0.1
baseurl: "" # does not include hostname
show_dir_listing: false

# Outputting

permalink: date
paginate_path: /page:num
timezone: null

quiet: false
verbose: false
defaults: []

liquid:
  error_mode: warn
  strict_filters: false
  strict_variables: false

# Markdown Processors

kramdown:
  auto_ids: true
  entity_output: as_char
  toc_levels: [1, 2, 3, 4, 5, 6]
  smart_quotes: lsquo,rsquo,ldquo,rdquo
  input: GFM
  hard_wrap: false
  footnote_nr: 1
  show_warnings: false
</pre>

</details>

### Front Matter defaults

To avoid repetition of same configurations, `defaults` key in `_config.yml` is the way to go.
You can define your custom configs, ex. Let's say you want to add a default layout to all pages and posts in your site, do the following:

```yml
defaults:
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "my-site"
  - scope:
      path: "projects"
      type: "pages" # previously `page` in Jekyll 2.2.
    values:
      layout: "project" # overrides previous default layout
      author: "yourusername"
```

### Environments

Specified by adding `JEKYLL_ENV=production` or something while `jekyll build`.  
Default is `JEKYLL_ENV=development`.
The value can be anything we want.

### Pages

The simplest way to add a page is to add an HTML(or .md) file in root, with a suitable name.  
We can organize them to sub-folders in the root directory itself, and the url will be accordingly.
To generate page_excerpts, change the same to `true` in `_config.yml`.  
Do remember to add front matter to your page. example:

```md
---
layout: post
title: "Example Title"
---

Rest of your content here
```

---

## Posts

Initiate a blog with the naming convention of `YEAR-MONTH-DAY-title.MARKUP`, example: `2021-09-04-how-to-write-a-blog.md`
All `.md` must have a `front matter` which is a meta-data collection for the post.  
Adding assets is easy, by adding `/assets` in the root directory, and referencing from there itself.

### Tags and Category/Categories

Declare the same as space-separated list of tags, in the front matter.
This can be accessed by `site.tags`. The same goes for categories. But category can be used to modify the [URL](http://jekyllrb.com/docs/posts/) itself.

### Excerpts

`excerpt_separator` is declared in the front matter.  
Example, here is a code outputting a list of blog posts excerpts:

```md
<ul>
  {% raw %}{% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}{% endraw %}
</ul>
```

### Permalinks, Layouts and published default and custom options

Front-matter contains the above default options as `permalink` (the baseURL of page), `layout` (all layouts should be in `/_layouts`), and `published` which won't let the page show up if set to false.
You can declare your own variables that can be used in that page just like:

```md
---
The not-mentioned ones are default options available to you
food: Pizza
---

<h1>{{ page.food }}</h1>
<h1>{{ page.date }}</h1>
<h1>{{ page.category }}</h1>
<h1>{{ page.categories }}</h1>
<h1>{{ page.tags }}</h1>
```

---

### Drafts

Declared in `/_drafts`, these aren't displayed in production build. You have to explicitly specify by `jekyll build --drafts`.  
This is a location for all blogs you're working on right now.

### Liquid

Smart site-generation is performed by Liquid, which can be used to create flow-control in `.md` itself.

### Data Folder

`/_data` folder is where you should store all additional data for Jekyll to use when rendering the site.  
Allowed data files are `.yml`,`.json`,`.csv`,`.tsv`,`.yaml` and are accessed by `site.data.filename`
This is freaking useful, and check it out [here](http://jekyllrb.com/docs/datafiles/)

### Static Files

A file that won't have any front matter, and to be displayed on its own.  
It can be accessed by `site.static_files`.

### Configuration

Instead of following along with some video tutorials or docs, the best approach I found to configure this site was by `bundle info yourthemename`.  
This will give your theme's template location on your system.  
All that's left to do is to explore it!

### Deployment

#### Recommended

Create a `.github` directory that contains workflows directing GitHub on how to build your site! Therefore you only need to push the entire source code to your repo, which will then be built and deployed automatically by GitHub Workflows.

Checkout configuration file [here](https://github.com/ba-13/ba-13.github.io/tree/master/.github/workflows) and modify according to your preferences.

#### Old Manner (NOT RECOMMENDED)

Enter the `_site` folder, `git init`, and set origin of this folder as the GitHub repo you want to host the site.  
Do the same through:

```bash
git init
git remote add origin https://github.com/yourusername/yourreponame.git
git branch -M main
git add *
git commit -m "your commit details"
git push origin main
```

This will directly push the built site from jekyll to your repo.  
Now activate GitHub pages on that Repository.
