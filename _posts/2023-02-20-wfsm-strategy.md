---
layout: post
title: Logic Locking breakthrough
excerpt-seperator: <!---->
tags:
  - project
  - iitk
  - security
---

Did you know that even your chips have essentially anti-virus techniques on them? Even I didn't before this one.

<!---->

I approached Prof. Shubham Sahay for a project on Security, and he pointed me to look into `Logic Locking`. The idea is to build logic circuits with inherent security mechanism, usually in form of extra inputs to the circuit as the key. I liked the idea and went through a literature review. The Professor then showed me a custom logic architecture that his group had devised that used 3D NAND Flash **Memory** as a logic circuit, with impressive stats of what it's capable of computing. Being a bit skeptic, I pointed out some flaws in the architecture, but continued to thinking of ways to develop a defense/logic locking mechanism for that architecture that's resilient to `SAT attacks` asked by the Prof. specifically because of the attack's prominence. Inspired by State Machines, I devised a way that assumes no hardware overhead in the memory itself, with assumptions on the Memory Controller. I furthur implemented a brute force attacking mechanism and implemented them all in Python. The beauty of the defense, Wordline Finite State Machine is what I call it, that it can be extended to infinite key space!
