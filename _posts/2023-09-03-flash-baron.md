---
layout: post
title: Flash Baron
excerpt-seperator: <!---->
tags: vocabulary gre software
---

I am preparing for going for a Masters, and need to take GRE Test for the same.

<!---->

While looking through the verbals section, I realised that vocabulary plays a key role in scoring. A quick google search will show that there exists lists of recommended words for GRE. Visiting [vocabulary.com](https://www.vocabulary.com/lists/182204) will show you a set of "Flash cards" that you may go through, but I found the way it's laid out inconvenient.

Anyways I was looking into building something with `tkinter`, a cross-platform Python package to build desktop applets. A few lines of code yields something like this:

<p style="text-align:center">
  <img src="/images/flash-baron/app_screenshot.png" />
</p>

A simple applet for sure, and much more convenient for me. Code [here](https://github.com/ba-13/Mystery_Box/tree/main/flash_baron).

I packaged the entire thing into an executable using `pyinstaller`:

```bash
pyinstaller --onefile --add-data "baron333.pickle;." flash_baron.py
```

`baron333.pickle` contains a python dictionary that's been pickled, dictionary contains word to definition pairs.

This would yield an executable, which you can now add to your app drawer, by following steps on the README in the repo above.

### Update (15-07-23)

Fixed my GRE on 20th October, TOEFL on 28th October. Wish me luck!

### Update (02-11-23)

Got GRE score of 330, TOEFL of 115. What worked for me in GRE was going through the Magoosh Vocab Flash Cards App the day of test, I went through the entire thing.  
The other thing that made a difference was the Vocab Mountain which unfortunately I found just one day before the test, but would highly recommend you to give a try. Here's the [link](https://docs.google.com/spreadsheets/d/1ouJlyvRxSPsEbKjlRk_jzPzHG6q71SAKkpHDrVoBH9Y/edit?usp=sharing). Copy it, and solve it by first going through each word in the day list and writing the meaning you know in the blank beside, then writing the actual meaning on the right to right blank.  
Also "revise" by going through previous days words as well.  
For TOEFL, watch the GregMat video on TOEFL speaking template, pick up a site having a tonne of speaking topics (or ask ChatGPT for a topic), and practice with a timer for at least 40-50 topics. It would take 3 hours at max.  
At each step you can mostly convert what you wrote (essays) or what you said (speaking part) to text, and allow ChatGPT to grade you over the same. Give it context that it's for ETS exams.
