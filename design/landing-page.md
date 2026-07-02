# Landing Page

## Layout

- `max-width: 1120px` centered, padding `88px 64px 120px`
- Sections numbered `00 · Label` through `04 · Label` with `section-num` / `section-title` / `section-lede` pattern
- Fluid spacing, no responsive breakpoints

## Eyebrow

- Flex row: `space-between`, left side = product category + version link, right side = hero-links (social icons)
- Version link: `brand`, weight `weight-3`
- `latin-ui` 12px, weight `weight-2`, letter-spacing 0.4px, uppercase, `stone` color

## Hero

- Title: 96px, weight `weight-2`, letter-spacing 0
- Entrance animation: `translateY(10px) + blur(6px` fading in over 900ms with 120ms delay
- Tagline: 21px, `olive`, max-width 820px
- Tokens row: a few small chips as `<span>quality</span>`, 13px `stone`, `latin-ui`
- CTA: pill buttons (`radius-full`), primary filled + ghost outlined, 15px, 13px 28px padding
- Line-widow discipline: eliminate 1-2 word last lines by trimming copy, not by adding a `max-width` cap. `text-wrap: balance` is a backstop, not a solution.

## Gallery

- Grid: `minmax(0, 1fr) auto`, frame spans full width, caption and tabs on row 2
- Frame: dark background `shot-bg`, `radius-md`, 1px border
- Transition: direction-aware slide + scale(0.985), 620–880ms cubic-bezier(0.22, 1, 0.36, 1)
- Sweep overlay: diagonal light gradient that slides across on switch (540–920ms)
- Auto-rotate: 4500ms interval, pauses on hover/focus, respects prefers-reduced-motion
- Empty gallery: script exits cleanly
- Tabs: pill buttons 12px `latin-ui`, active state uses brand-tint background
- Click navigation: left half = previous, right half = next
- Caption `.line`: italic serif, 14px `olive`

## Numerical Figures

- Amount: 112px serif, letter-spacing 0
- Comparison: 18px, use `<s>` for deemphasized figures (`stone`)
- Highlight: `.hl` class for `brand` emphasis
- Terms: 13.5px `olive`, centered, max-width 640px, line-height 1.5

## Manifesto

- Brand philosophy paragraph: 20px, weight `weight-1`, line-height 1.55, letter-spacing 0.05em
- `<em>` renders in `brand` with `font-style: normal` (brand emphasis, not italic)

## Metrics

- Flex row with 32px gap, each metric is value (36px serif `weight-2`) + label (13px `stone`, `latin-ui`)
- `font-variant-numeric: tabular-nums` on values

## Demo Card Grid

- `auto-fill, minmax(240px, 1fr` grid, 18px gap
- Cards: `ivory` bg, 1px border, `radius-md`, `whisper-shadow` on hover
- Image fills top, title 15px weight `weight-2` + desc 12px `olive` below

## Features

- Two-column grid: 200px name + 1fr description, 36px gap, separated by `border-secondary` hairlines
- Feature name: 22px `brand`, weight `weight-2`
- Poetic subtitle: `<small>` below name, 13px `olive`, italic
- Description: 15px `dark-warm`, line-height 1.55
- Tables stay editorial: no framed box, no tinted header bar, no vertical rules

## FAQ

- Wrap each dt/dd pair in `<div class="faq-pair">` for spacing (`spacing-lg` margin-bottom)
- `<dt>` question: 16px, weight `weight-2`
- `<dd>` answer: 14px `olive`
- Code spans: `mono` 12px on brand-tint background, `radius-sm`
- Tail paragraph: `.faq-tail` after `</dl>`, 13px `stone`

## Footer

- Two-column flex: brand mark (icon + name + tagline) left, colophon (links + ethos) right
- Mark icon: 56px `radius-md`
- Links: inline with middot (`&middot;`) separators, `dark-warm`
- Ethos: closing italic serif line, `olive`, max-width 40ch
- Tech credit once. Collapse to a single quiet footer line.
- Collapses to single column below 70ch
