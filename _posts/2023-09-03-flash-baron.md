---
layout: post
title: Flash Baron
excerpt-seperator: <!---->
tags: vocabulary, gre
---

I am preparing for going for a Masters, and need to take GRE Test for the same.

<!---->

While looking through the verbals section, I realised that vocabulary plays a key role in scoring. A quick google search will show that there exists lists of recommended words for GRE. Visiting [vocabulary.com](https://www.vocabulary.com/lists/182204) will show you a set of "Flash cards" that you may go through, but I found the way it's laid out inconvenient.

Anyways I was looking into building something with `tkinter`, a cross-platform Python package to build desktop applets. A few lines of code yields something like this:

<p style="text-align:center">
  <img src="{{site.baseurl}}/images/flash-baron/app_screenshot.png" />
</p>

A simple applet for sure, and much more convenient for me. Code [here](https://github.com/ba-13/Mystery_Box/tree/main/flash_baron).

I packaged the entire thing into an executable using `pyinstaller`:

```bash
pyinstaller --onefile --add-data "baron333.pickle;." flash_baron.py
```

`baron333.pickle` contains a python dictionary that's been pickled, dictionary contains word to definition pairs.

This would yield an executable, which you can now add to your app drawer, by following steps on the README in the repo above.
