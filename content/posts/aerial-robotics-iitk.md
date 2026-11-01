---
title: Learning to Fly at IIT Kanpur
date: 2023-02-20
description: Two years of aerial robotics, from a drone I couldn't get tracking to controlling a swarm from a single webcam.
tags: [robotics, memory-lane]
draft: false
---

I joined the Aerial Robotics team at IIT Kanpur in my first year, and most of what I now know about robots came from the projects that followed. Not all of them worked. This post is a record of what we built and what each one taught me.

## The first attempt

My first assignment was a simulated pipeline in which a drone tracks a region of interest and estimates its pose. I didn't manage to finish it. It did change how I saw computers, though. It introduced me to ROS and to simulation, and I began to read a machine as a set of algorithms rather than a black box.

## Phoenix

By the autumn of 2022 the team was losing momentum, and part of the reason was simple: we had no working drone. During the mid-term break I asked a PhD student to guide me through building one, hoping a real aircraft would bring people back.

Phoenix was finished by the end of the break, and it flew on the second day of term. The battery came loose in flight and the drone crashed. In the days that followed, the team worked hard to fix it. We repaired Phoenix, built a second drone along the way, worked through the remaining faults, and flew both at Pavilion'22.

The work was more about careful procedure and accumulated heuristics than clever ideas. It was still worth doing, because the team came back to life.

## A landing that never landed

For Cyber-Physical Systems, a course with Prof. Indranil Saha, two teammates and I [built a pipeline](https://github.com/rrustagi20/MPC_AutoLanding) that used model predictive control to land a drone on a moving platform. We compared three planning methods, each working from the platform's observed position history.

The simulated drone never actually landed. It followed the platform faithfully and stayed there. Even so, assembling the whole pipeline over two long nights taught me more about ROS than anything before it.

## Pick up and delivery

For Shaastra, the team took on an autonomous pick-and-drop task that we expected to finish in six days. It took a month and a half, including twenty straight days of working around the clock.

We began in simulation, then dropped that plan and went back to hardware. Building a drone reliable enough for regular flights, setting up the autopilot and mounting an Odroid XU4 for onboard autonomy took a full month. After that we wrote the sensor handling and position control modules, along with a flight planner built as a finite state machine. The planner would detect an object, align with it, pick it up with an electromagnet, fly to the drop zone, release it, repeat once more and land.

We didn't finish the task, because the barometer on our flight controller began to fail. The [pipeline](https://github.com/AerialRobotics-IITK/shastra23) itself was worth the time.

## A swarm and a single webcam

Inter IIT Tech Meet 11.0 brought the Drona Aviation swarm challenge, which I worked on as lead of a ten-person team. We had to talk to a small drone over the MultiWii Serial Protocol, hold its position using one monocular webcam fixed to the ceiling, and then do the same for two drones at once.

The brief asked for Python. We wrote a C++ backend for feedback processing and passed its output to the Python controller over sockets, which held the loop at about 54 Hz. Our controller was a geometric one, tuned with the Ziegler–Nichols method. We also had to deal with burnt-out motors and the limits of connecting several drones to one host. The [code is public](https://github.com/AerialRobotics-IITK/interiit_11.0), and the team came away with a bronze medal.

## What stayed with me

Looking back, the failures taught me as much as the results did. A drone that crashes on its second day is more useful than a perfect one in simulation, and most of the difficulty in robotics sits in the places between components: a loose battery, a glitching sensor, a motor that burns out.
