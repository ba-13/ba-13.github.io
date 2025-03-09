---
layout: post
title: Few Shot Learning
excerpt-seperator: <!---->
tags:
  - summers
  - project
  - iitk
---

Having just dealt with speech signals, I wanted to work more on it. This was fruitless.

<!---->

I opted for SURGE'22 for taking part in the DCASE Challenge 2022. The topic was bio-acoustic sound detection with a small dataset, so opting for few-shot learning was the way to go. I was paired up with a person, who I never saw after our first meet (had better expectations). This was taken up under Prof Vipul Arora, who hinted me to approach this through transfer learning instead of the baseline given. But the PhD alloted by him to me said to setup the baseline first, which I did. It consisted of Prototypical Networks, which I tested out on the Omniglot dataset with great accuracy. But when applied to the challenge's dataset, I faced a problem of interpreting episodes back to usual inference. I wasn't able to clear it until the end well enough, trying out saving the means during training, giving representative data in form of episodes along with the test sample, and scraping the idea of episodes altogether, but none of them worked. Then I tried out Meta-Learning, the concept of which was elegant, but I was unable to implement it on my own, so I tried running a prebuilt pipeline, but it had no testing phase. SURGE'22 was a failure for me. But I learnt a few things, which carried forward.
