---
layout: post
title: Direction of Arrival Estimation
excerpt-seperator: <!---->
tags:
  - project
  - iitk
  - machine-learning
---
A course which was a bit disappointing in content; from which I learned that courses meant for Master students were too easy, rote and essentially hard-coded. I matched up with bad team-mates, and was left to implement a problem statement which was hard to understand.

<!---->

This was a course project of EE627, done under Prof Rajesh Hegde. I was first involved with first hand training-testing deep neural models, and this was inteded to be a group project of 6, finally boiling down only to me, others dropped the course itself. I had to implement a CRNN model that would take in 4-way ambisonics microphone Sound as vector. First to create a dataset, I used an Image method, to create localised sounds of french statements, with reverb and noise to give a perception of having a particular direction. Then I converted the obtained sound to Ambisonics Vector-A by simulation. Converting this to B type and then setting up an architecture of the CRNN, followed by a model training pipeline, with no prior experience, always led me with incorrect size and out of memory errors. Finally I was able to complete it just before the day of presenting. You can find the whole structure [here](https://github.com/ba-13/Courses/tree/main/EE627/foa-doa).
