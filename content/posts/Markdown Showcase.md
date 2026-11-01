---
date: 2026-10-31
description: Every kind of formatting this blog supports.
tags:
  - meta
  - math
---

This post shows what the blog can render. Delete it once you've had a look.

## Math

Inline math like $e^{i\pi} + 1 = 0$ sits in the sentence, and display math gets its own line:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

Prices stay as text, so $5 and $10 are safe, and \$20 can be escaped by hand.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Long equations scroll inside the column instead of breaking the layout on a phone:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \frac{1}{25} + \frac{1}{36} + \frac{1}{49} + \frac{1}{64} + \frac{1}{81} + \frac{1}{100} + \cdots = \frac{\pi^2}{6}
$$

## Callouts

> [!note] A note with a title
> Obsidian callouts come through as simple boxes.

> [!warning]
> The title is optional.

> And a plain quote stays a plain quote.

## Code

Inline `$not_math$` is left alone.

```python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## Tables and lists

| Feature | Where it lives |
| ------- | -------------- |
| Feed    | `/feed.xml`    |
| Tags    | `/tags/`       |
| Search  | The header     |

- [x] Written
- [ ] Published
