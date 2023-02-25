---
layout: post
title: Usual Collection for DSA
excerpt-separator: <!---->
---

This is my set of resources and shortcuts for going through Data Structures and Algorithms. You'll find them well-compiled, and maybe not that expected.

<!---->

Higher one are of higher priority. This will keep getting updated for sure, but do complete these. Please do go over STL first of all before moving on, cause doing everything from scratch, might be a great learning experience, but it's stupidity, as you'll take more time to grasp the same thing.

My approach of these are,

- for video tutorials, I follow along with the tutor, pausing if a question is revealed.
- for written tutorials, ideally you should first go through the entire article in one-go with a bird eye view. Then delve into those parts which would seem more relevant to you for now. As you can always come back to them later for more advanced concepts. Just try not getting stuck for long.

## Some standard Resources I think are great and still left to follow

- STL

  - [Topcoder-I](https://www.topcoder.com/thrive/articles/Power%20up%20C++%20with%20the%20Standard%20Template%20Library%20Part%20One)
  - [Topcoder-II](https://www.topcoder.com/thrive/articles/Power%20up%20C++%20with%20the%20Standard%20Template%20Library%20Part%20Two:%20Advanced%20Uses)

- Structures

  - [William Fiset](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu) : Collection of all data structures you need to know till an intermediate level. Explanation is extremely well done.
  - [MyCodeSchool](https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P) : Not as exhaustive as above, but may suit your style. Emphasis given on particular topics.

- Pointers

  - [Freecodecamp by Harsha and Animesh](https://www.youtube.com/watch?v=zuegQmMdy8M) : Can watch for a quick review of it's concepts.

- Linked List

  - [Interview Questions](https://www.geeksforgeeks.org/top-20-linked-list-interview-question/) : You know LL, you should know how to do these.

- Matrix

  - [Matrix Questions](https://www.geeksforgeeks.org/matrix/) : Never hurts to know how matrices are manipulated in programming. This will make you better in handling limits in iterations.

- Trees

  - [William Fiset](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDfGc8rbQ0_58oEZQVtvoIc) : Extremely useful, intuitively explained, in pseudo-cum-python code.

- Backtracking

  - [Freecodecamp by Lynn](https://www.youtube.com/watch?v=A80YzvNwqXA) : It's a video tutorial, with a "base format" explained by the author, a boilerplate for backtracking.
  - [University of Pennsylvania](https://www.cis.upenn.edu/~matuszek/cit594-2012/Pages/backtracking.html) : It's an extensive article.

- Recursion

  - [Freecodecamp by the Simple Engineer](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=2637s) : You will be slowly demystified about Recursion here.

- Dynamic Programming

  - [Freecodecamp by Zablan](https://www.youtube.com/watch?v=oBt53YbR9Kk&t=223s) : Claimed to be one of the best resources for DP on YT.
  - [William Fiset](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsAsbafOroUBnNV8fhZa7P4u) : Slides, suit my style.

- Hash Tables

  - [William Fiset](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDH5Wq-Vk5tDb8gH03cULZS)

- Graph Theory

  - [William Fiset](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P)
  - [RestingR](https://codeforces.com/blog/entry/60717)
  - [Practice at Hackerrank](https://www.hackerearth.com/practice/algorithms/graphs/graph-representation/tutorial/)
  - [Prince Of Persia](https://codeforces.com/blog/entry/16221)

- Number Theory

  - [Hackerrank](https://www.hackerearth.com/practice/notes/number-theory-1/)
  - [AOPS](https://artofproblemsolving.com/community/c90633h1291397)
  - [CodeChef](https://www.codechef.com/wiki/tutorial-number-theory)
  - [Compilation Summary](https://docs.google.com/document/d/1z3NtURVMyCkD1Ed4HuzkycpzKyc6kBaD9OYTbKJiDlU/edit)

- Perfect Reference

  - [CSLR](https://web.ist.utl.pt/~fabio.ferreira/material/asa/clrs.pdf) : Bible
  - [CSES Perfect Problem-set](https://cses.fi/problemset/) : the Problem Set I have been following for a while.
  - [CP-Algo](https://cp-algorithms.com)

A few points I would like to mention:

- Debugging:
  Throwing Exceptions can be useful, or using debuggers.  
  A good ol' print statement is always the master weapon in debugging. If you do write a lot of print statements for cleaning up your code, these constitute of code too, so instead of removing them when you're done or commenting them out, use conditionals. Example:

```cpp
const int debugging = true;
#define deb(x)                        \
  if(debugging)                       \
    std::cout << #x << " : " << x;    \
```

- Keep your env clean. Use Zen Mode if you have dual monitors, else hide out all bars in your text editor. This will keep you focussed more than you would be, and you'll appreciate the look too.

- First and foremost, go through the STL Blog, or my GitHub repo summarizing and enhancing that. I learnt a lot there.
  Macros will save you huge time. Build your own macro for showing one variable, two variable, and any STL container's contents. Use debugging bool. Keep a .hpp file saved somewhere, containing all your macros. I have uploaded mine, check that out. If you plan to use that in CP, I recommend making a initiator template, containing all these macros.

- Do install Kite. It's extremely useful if you hate googling for every small stuff you don't remember. I know your pain.

- Go through all Data Structures and DP next. Then graph specific algorithms. This covers upto Level C in a SRM in CP contests.
