---
layout: post
title: Corporate Internship Experience
excerpt-seperator: <!---->
tags:
  - summers
  - project
  - goldman-sachs
---

My first internship experience was no less than life-changing, in a more or less balanced manner. Not everything was smooth sailing, and I didn't expect any less.

<!---->

I had my summer internship at Goldman Sachs, Global Banking and Markets division (`GBM`). Two months spent on developing a data pipeline in Python and `Slang`, GS intra-language.

The task was to collect daily aggregate data on a set of stocks and a set of proxies, which could be futures and commodities, on exchanges throughout the world. The problem lay in timing mismatch, time-zones as well as close times/noon breaks, missing days, no ticks, etc. across all 56 exchanges.

Finally built a scheduler on Apache-Airflow, capable of sorting through all those inconsistencies through an elaborate control flow. All this dumped to an instance of database on Apache-Hive. The second pipeline picked up data from Hive and ran a rolling regression over a duration, to analyse RMSE and obtain correlations between every stock and it's correspoding set of proxies. This is now saved as correlation coefficients
$$\beta_{stock}^{proxy}$$

Furthur on used to estimate fair value of macro assets (`ETFs` in our case). The experience was quite comfortable for me in technical perspective, but quite new in social one. I met some people here including Marianne, Jiahui, Mehul, Anu, Derek who I won't ever forget.
