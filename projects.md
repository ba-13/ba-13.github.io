---
permalink: /projects/
layout: entry
title: "Projects"
---

<hr style="border:2px solid gray">

## 2022

<hr style="border:2px solid gray">

### Inter IIT Techmeet 10.0

The problem statement was tackled by a group of 6 sophomores, four of us making the actual algorithm, two making an interface. We finally built JuX, a python package to filter and extract flare data from light curves data provided by Indian Space Research Organisation. The time spent in this was enormous, and led to my habit of waking up till 4. But the outcome was awesome despite a bit of messup on UI interface. You can find the whole structure [here](https://github.com/Jadit19/Inter-IIT-Tech-Meet-2022).

---

### Direction of Arrival Estimation

This was a course project of EE627, done under Prof Rajest Hegde. I was first involved with first hand training-testing deep neural models, and this was inteded to be a group project of 6, finally boiling down only to me, others dropped the course itself. I had to implement a CRNN model that would take in 4-way ambisonics microphone Sound as vector. First to create a dataset, I used an Image method, to create localised sounds of french statements, with reverb and noise to give a perception of having a particular direction. Then I converted the obtained sound to Ambisonics Vector-A by simulation. Converting this to B type and then setting up an architecture of the CRNN, followed by a model training pipeline, with no prior experience, always led me with incorrect size and out of memory errors. Finally I was able to complete it just before the day of presenting. You can find the whole structure [here](https://github.com/ba-13/Courses/tree/main/EE627/foa-doa).

---

### Few shot learning

I opted for SURGE'22 for taking part in the DCASE Challenge 2022. The topic was bio-acoustic sound detection with a small dataset, so opting for few-shot learning was the way to go. I was paired up with a person, who I never saw after our first meet (had better expectations). This was taken up under Prof Vipul Arora, who hinted me to approach this through transfer learning instead of the baseline given. But the PhD alloted by him to me said to setup the baseline first, which I did. It consisted of Prototypical Networks, which I tested out on the Omniglot dataset with great accuracy. But when applied to the challenge's dataset, I faced a problem of interpreting episodes back to usual inference. I wasn't able to clear it until the end well enough, trying out saving the means during training, giving representative data in form of episodes along with the test sample, and scraping the idea of episodes altogether, but none of them worked. Then I tried out Meta-Learning, the concept of which was elegant, but I was unable to implement it on my own, so I tried running a prebuilt pipeline, but it had no testing phase. SURGE'22 was a failure for me. But I learnt a few things, which carried forward.

---

### HackIT'22

I offered a cybersecurity based project during summers to Y21s. I had huge plans, and myself was trying them out if they seemed to work. To be honest, I don't have the gift or the skill of bugging out a running application yet, but I was getting decent at playing virtual CTFs. ~25 freshers were registered in this project through SnT Council, and ~8 lasted till the end. I tried to be consistent with them, but internship load along with a course had the better of me. Still they should have learnt a few things throughout. You can find the [Leaderboard](https://ba-13.github.io/HackIT_22/) and the [assignments](https://github.com/ba-13/HackIT_22) I gave.

---

### CSES

Intern drive of our college lasted from 20th July to 7th August. It was one of the most hectic days here, giving tests all day long, uptill saturating and feeling weird without tests afterwards. I was practicing since 20th June, did ~200 questions on Interviewbit. I don't know, am not able to practice like others do, still, it was fun. I learnt a lot about DSA, about programming and problem solving in general. Probability was also to be kept in touch with, and had to go through Puzzles and Statistics as well. I had been trying out CSES Problemset for a while before, and I tried continuing. I'm still not done with this.

---

### IPL Prediction Nomura

A friend asked me to help out at a problem statement on prediction. I don't know why people had the perception that people who dunno about DSA would be good at ML. Anyways, I did try it out, and submitted [this](https://github.com/ba-13/DS_Exploration/tree/main/IPL_Prediction). It was a short, but long 2 day problem statement.

---

### MPC Autonomous Landing

This was a course project of CS637, which I did with 2 teammates, this time did everything on the last 2 days of submission, but with an active team. We implemented a pipeline with a model predictive control and a few different naive methods to land on a moving platform. The simulation wasn't finally able to land, it kept on following the landing platform, but the whole pipeline creation cleared ROS for me. We learnt a tonne that night.

---

### bDCCA for Bird Vocalization Detection

The PhD I mentioned before, remember? He asked me to join his problem statement of improving binary classification on a noisy dataset. Why do I keep getting such basic problems? I wanted a bit ingenuity, which was upcoming. Actually this was a multi (dual for us) modal dataset, where we had a microphone recording, and an accelerometer recording (consider as a better microphone) of 2 finch birds. 3 hours of the dataset was hand labelled, and using that we had to make better predictions on the remaining 11 hours of data. The accelerometer data gave an accuracy of 92%, but we only had to use the microphone for testing the rest 11 hours. So in some manner we had to make a model that improved the microphone dataset so it's output can be seen as a better representation for our detection task. In total, we were creating a better embedding of microphone data using accelerometer data only while training. I managed to code things out, and we submitted a paper with me being the second author, it's in review now, but it should qualify. We managed to get from 76% to 83% accuracy finally, just using microphone dataset.

---

### Phoenix's Resurrection

Aerial was dying, and I had to do something. So in the mid-term vacation, I approached a PhD for guiding me to construct a drone, which I thought would motivate my other teammates to start working again. So by the end of the vacation, I built the Phoenix, with the constant guidance of that PhD, and he flew it the second day after vacation ended. I wasn't present that time, and the battery flew off, leading to a crash. The following days, we started working hard on completely fixing the drone, and made another one during the process. To be honest, it wasn't much of a mind-work compared to following procedures properly and knowing some heuristics. We were finally able to debug all problems and showcase 2 drones in the Pavillion'22, flying them in process. It's actually thrilling to fly a drone. You should try it out some day, so approach me for that. Again, it wasn't much of a brain-tingling task, so I'm not much satisfied with how much time it took, but it was worth it. The team seems to have a future, let's see.

---
<hr style="border:2px solid gray">

## 2021

<hr style="border:2px solid gray">

### Numbers made Dumber

This was the first project I was ever a part of in IITK. It was being provided by Stamatics, as a pre-summer project, and I chose this because it involved cryptographical applications of number theory, both of which I wanted to see. The actual project involved proving questions alike to RMO and AoPS level questions, finally culminating with me implementing RSA [here](https://github.com/ba-13/Random_Stuff/tree/main/RSA)

---

### Python Bootcamp

I had bought a few Udemy courses, and this was the first of them. Programming seemed easy in concept, and applying it somewhere seemed tough, so I followed this throughout, and maybe it was worth it. I'm a good scraper now.

---

### ML with Julia

Introduced to a new language, showing the vast languages actually available. Julia seemed fast, but not as furnished as python. Maybe it needed familarity, but I'm not talking about the syntax. I practiced Bash, checked out Exercism and realised a bit of how data types are implemented in memory. This was finally followed by implementing custom data-types and basic regressions in Julia.

---

### Game of Blocks

Kind of a reading project, I went through Blockchains articles, Game Theory playlist, then implemented nounce mining, basic smart contracts, and followed by team based possibly useful smart contracts based on unique style of Voting and Admission management, all on Solidity. Check out the structure [here](https://github.com/ba-13/GameOfBlocks2021).

---

### Computational Astrophysics

I wanted to check out what professional Astronomy looks like to amateur enthusiasts, so it's like an amateur's perspective was professional to me! I learnt about data-handling in python here, worked on implmenting formulae on code to get results that matched actual events. You can check out what I did [here](https://github.com/ba-13/ComputationalAstrophysics)

---

### IITK Coin

I actually first delved in Designing at IITK. This was the first thing that stood apart from acads to me. So I was a bit decent at start, so got involved in UI Design of IITK Coin. Actually wanted to work on the codebase, but that team always seemed a bit too elite, and not approachable that way. I made a few changes with the UI team, with the then best friend of mine. It was short and fun enough. This never got deployed though.

---

### DevFest

A short hackathon of 2 days, where we had to build a dashboard, and I had nil idea about Web-Development. I learnt a few things these two days, including handling teammates xD. Someone else was handling the front end which never got completed so we didn't win anything. A failed event, but that avoke interest in Web-Dev.

---

### Tracking

I joined the team Aerial Robotics IITK. Always wanted to work in a group. Start went well enough. Discovered a bit about Computers, started seeing them algorithmically instead of a black box view. Got introduced to ROS and simulations. Then we were made to implement a pipeline where a drone tracks a region of interest and estimates its pose. I wasn't able to do it. Lost enthusiasm, cause there was no team interaction and there seemed better things to try. Bit by bit, managed to spawn a drone and integrate a camera. Every step forward was followed by a series of cryptic errors. It wasn't that fun. The final Problem statement was completed by one of my teammates who I didn't even know.

---

### DS for Js

Javascript was in hype. I had to learn it. What better way than to try out DSA with Js? I learnt a lot in this project. Regex, Scripting, Algorithms, OOPs, Functional, went through these. It lasted long, but was worth it. [Here](https://www.freecodecamp.org/certification/ba-13/javascript-algorithms-and-data-structures) is one of the only certificates I'm proud of.

---

### Machine Learning by NG

Machine Learning was hyped as well. I had promised myself to try it out once I enter the fourth semester. So I did try the most popular ML course on earth, on Octave. The content was intuitive, and great. The assignments could have been better. But it started making ML look like intuition only subject, which was a mistake.

---
