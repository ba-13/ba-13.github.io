---
layout: post
title: Going down to bytes
excerpt-separator: <!---->
---

Our Labs had us exposed to Intel 8085 Architecture. Realise how mutually understood conventions run the world.

<!---->

The 8085 architecture $$ \mu $$C is capable of running programs, being Turing complete.

Image Credits: [etechnog](https://www.etechnog.com/2021/11/8085-block-diagram-architecture.html)

![Architecture](/images/8085_architecture.png)

No I won't delve into the architecture, it's just for reference. That's good, and optimised, and amazingly thought out, but what practically excited me was storing instructions _and_ data, both as binary, in a main memory, and executing it sequentially.

Note that it's an 8-bit architecture, so the maximum number you can have is (127)<sub>10</sub> aka (0111 111)<sub>2</sub>. Also note that the corresponding negative integer is found using 2's complement, i.e. flip all bits and add `0'b1`.

So we were tasked to sort _n_ numbers, using however way we like.  
I chose an approach, the simplest sorting algorithm there is, iterate over each element, again iterate over each element, if the smaller index is larger, swap those numbers.

```c
swap:   int tmp = a;
        a = b;
        b = tmp;

sort:   for (int i=0; i<n; i++)
            for (int j=0; j<n; j++)
                if (arr[i] > arr[j])
                    swap(&arr[i], &arr[j]);
```

First check out it's assembly of 8085

```assembly
.ORG 8000
.EQU ADDRA 9000     ; ADDRA stores address to a
.EQU ADDRB 9002     ; ADDRB stores address to b

swap:   LXI H, ADDRA    ; assume 2 addresses stored consecutively,
        ; and the ptr to those addresses is stored in M
```
