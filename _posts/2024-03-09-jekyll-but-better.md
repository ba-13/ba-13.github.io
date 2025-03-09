---
layout: post
title: Integrating Jekyll with Obsidian
excerpt-separator: <!---->
tags:
  - convenience
  - update
time: 2025-03-09
---

This site had not been updated for so long that the ruby gems had deprecated! A post was long time coming.

<!---->

The topic is to make it more convenient for me to write here. Hope is one day I'll be writing something tangible and useful. Until that day arrives, we will have to deal with this.

## Update on Jekyll

It seems `jekyll` has outdated sass support, and better alternatives have come up like `astro`, which themselves are getting old. I'll stick to this for now.

I'll go through [2021-10-08-my-approach-to-jekyll](/2021-10-08-my-approach-to-jekyll.md) again.

Firstly, install `gems` locally by declaring the environment variables in your own shell startup script (e.g. `.bashrc`)

```bash
export GEM_HOME=$HOME/gems
export PATH=$HOME/gems/bin:$PATH
```

Now this ensures you don't interfere with root installation of ruby and gems, install `jekyll`.

```bash
gem install jekyll bundler # bundler is for handling packages
```

Once done, create your Jekyll site base template with

```bash
jekyll new ./website
cd ./website
```

Great! Now you can start changing your new website and serve it locally using

```bash
bundle exec jekyll serve
```

It's live reload, so changes you make in this website folder will be reloaded everytime you save.

## Deploying on Github Pages

Once you're happy with how your website looks locally, push it to your github repository.

Then go to GitHub `Actions > New Workflow`, search for `jekyll`

![screenshot](/images/Pasted%20image%2020250309190744.png)

Choose `Configure` on `Jekyll by GitHub Actions`.

![screenshot](/images/Pasted%20image%2020250309191958.png)

Commit default changes and you are set!

## Using Obsidian

If you have used Obsidian before, you might find `_posts` folder to be nearly a perfect candidate of an Obsidian Vault.

Exactly.

Make it a vault, setup your configurations. Add the following configurations within your `.obsidian/app.json`

```json
{
  "vimMode": false,
  "alwaysUpdateLinks": true,
  "promptDelete": false,
  "newFileLocation": "current",
  "attachmentFolderPath": "images",
  "newLinkFormat": "absolute",
  "useMarkdownLinks": true
}
```

Notice that any images/attachments that I paste within Obsidian gets pasted within `images` folder. Also linking is done with absolute paths, evident later.

### Linking Attachments

I sym-linked this folder outside so it's visible to `jekyll`.

```bash
cd _posts
ln -s ../images ./images
```

Currently while pasting images within Obsidian from my Clipboard, I have to take care to add a `/` (slash) at the start of any image I paste in. For example:

```
![screenshot](images/Pasted%20image%2020250309191958.png) 
# is the default way when you paste something in Obsidian

becomes

![screenshot](/images/Pasted%20image%2020250309191958.png) 
# / in front means relative to base URL for Jekyll, pointing to the correct images folder
```

Here's where absolute paths to attachments come in handy, even though you have to take care about this extra slash which I couldn't get a workaround with such that both Obsidian and Jekyll agree upon.

### Linking Posts

You can also change `_config.yml` a bit:

```yml
permalink: /:year-:month-:day-:title.md
```

This helps in linking between files/posts and keeping it compatible for both Jekyll and Obsidian.

### Templates

Add this as your `.obsidian/templates.json`

```json
{
  "folder": "templates"
}
```

Add create a new file within a `_posts/templates` folder, say `_posts/templates/blog_template.md` and paste this:

```yaml
---
layout: post
title:
excerpt-separator: <!---->
tags:
time: "{{date}}"
---
```

Whenever you create a new post within Obsidian, use `Insert Template` and add this to add the default properties, so you don't have to manually.

# Conclusion

There you go, this is the workflow I am using currently to write these posts. I'll update this post as this gets modified, but the crux would remain.