---
version: alpha
name: chuangcaleb
description: >-
  Warm parchment, ink-blue accent, single serif-led hierarchy.
  Intimate, editorial, intellectual. A notebook for narrative
  storywriting and software notes.
colors:
  parchment: '#f5f4ed'
  ivory: '#faf9f5'
  warm-sand: '#e8e6dc'
  ink-blue: '#1B365D'
  ink-light: '#2D5A8A'
  dark-surface: '#30302E'
  near-black: '#141413'
  deep-dark: '#141413'
  dark-warm: '#3d3d3a'
  olive: '#504e49'
  stone: '#6b6a64'
  border-default: '#e8e6dc'
  border-subtle: '#e5e3d8'
  error: '#B53333'
typography:
  display:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.01em'
  h1:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.2
  h2:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.25
  h3:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: '0.04em'
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  2xs: 4px
  xs: 6px
  s: 8px
  m: 16px
  l: 24px
  xl: 48px
  2xl: 64px
  3xl: 96px
components:
  button:
    rounded: '{rounded.md}'
    padding: 8px 16px
  button-primary:
    backgroundColor: '{colors.ink-blue}'
    textColor: '{colors.ivory}'
  button-primary-hover:
    backgroundColor: '{colors.ink-light}'
    textColor: '{colors.ivory}'
  button-secondary:
    backgroundColor: '{colors.warm-sand}'
    textColor: '{colors.dark-warm}'
  card:
    backgroundColor: '{colors.ivory}'
    textColor: '{colors.near-black}'
    padding: 16px 20px
  card-featured:
    backgroundColor: '{colors.ivory}'
    textColor: '{colors.near-black}'
    rounded: '{rounded.lg}'
    padding: 20px 24px
  nav-link:
    textColor: '{colors.dark-warm}'
  nav-link-active:
    textColor: '{colors.ink-blue}'
  prose-link:
    textColor: '{colors.ink-blue}'
  prose-link-hover:
    textColor: '{colors.ink-light}'
  tag:
    backgroundColor: '{colors.warm-sand}'
    textColor: '{colors.ink-blue}'
    rounded: '{rounded.sm}'
    padding: 2px 8px
  quote-block:
    textColor: '{colors.olive}'
    padding: 4px 0 4px 14px
  code-block:
    backgroundColor: '{colors.ivory}'
    textColor: '{colors.near-black}'
    rounded: '{rounded.sm}'
    padding: 10px 14px
---

## Overview

This design is a customised extension of kami.

kami's aesthetic compresses into one sentence: **warm parchment canvas, ink-blue accent, serif carries hierarchy, avoid cool grays and hard shadows**.

This is not a UI framework. It is designed to keep pages stable, clear, and readable.

**The invariants** (each has a real cost, think before overriding):

1. Page background `parchment`, never pure white
2. Single accent: `accent`, no second chromatic color
3. All grays warm-toned (yellow-brown undertone), no cool blue-grays
4. Serif for everything (headlines and body). Sans only for UI elements (labels, eyebrows, meta)
5. Serif weight locked at `weight-heading`, no synthetic bold
6. Line-heights: tight headlines 1.1-1.3, dense body 1.4-1.45, reading body 1.5-1.55
7. Letter-spacing: body text 0; tracking only for short labels and overlines
8. Tag backgrounds must be solid hex, never rgba
9. Depth via ring shadow or whisper shadow, never hard drop shadows
10. No italic in page templates except for poetic lines (gallery captions, feature subtitles, footer ethos)

---

## Colors

**Single accent, warm neutrals only, zero cool tones** — this is the core.

### Brand

```css
--accent: #1b365d; /* Ink Blue — the only chromatic color. CTAs, accents, section-title left bar. */
--accent-light: #2d5a8a; /* Ink Light — brighter variant, for links on dark surfaces. */
--color-error: #b53333; /* Error state, deep warm red, rarely used */
```

**Rule**: ink-blue covers ≤ **5% of page surface area**. More than that is ornament, not restraint.

### Surface

```css
--color-parchment: #f5f4ed; /* Page background — warm cream, the emotional foundation */
--color-ivory: #faf9f5; /* Card / lifted container — brighter than parchment */
--color-warm-sand: #e8e6dc; /* Button default / interactive surface */
--color-dark-surface: #30302e; /* Dark-theme container — warm charcoal */
--color-deep-dark: #141413; /* Dark theme page base, not pure black */
```

### Text

```css
--color-near-black: #141413; /* Primary text — warm olive undertone */
--color-dark-warm: #3d3d3a; /* Secondary text, table headers, links */
--color-olive: #504e49; /* Subtext — descriptions, captions */
--color-stone: #6b6a64; /* Tertiary — dates, metadata */
```

Four levels: `near-black` (primary) > `dark-warm` (secondary) > `olive` (subtext) > `stone` (tertiary). No fifth level needed.

**Mnemonic**: every gray has a **yellow-brown undertone**. In `rgb()`, warm gray is R ≈ G > B (or R > G > B with small gaps). Cool gray is R < G < B or R = G = B (neutral).

### Border

```css
--border-default: #e8e6dc; /* Primary border — section dividers, table headers, card borders */
--border-subtle: #e5e3d8; /* Secondary border — row separators, subtle dividers */
```

---

## Typography

### Stacks

```css
/* Single serif per page. */
--font-serif: Charter, Georgia, Palatino, 'Times New Roman', serif;
--font-body: var(--font-serif);
--font-heading: var(--font-serif);

/* Mono stack */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, Monaco, monospace;
```

### Size scale

Size values are fluid via Utopia type scale. Static values below are approximate midpoints.

| Role    | Size (midpoint) | CSS token         | Weight                               | Line-height | Use                       |
| ------- | --------------- | ----------------- | ------------------------------------ | ----------- | ------------------------- |
| Display | 3rem            | `--text-display`  | `weight-heading`         | 1.10        | Page hero, cover title    |
| H1      | 2rem            | `--text-h1`       | `weight-heading`         | 1.20        | Section titles            |
| H2      | 1.5rem          | `--text-h2`       | `weight-heading`         | 1.25        | Subsection headings       |
| H3      | 1.25rem         | `--text-h3`       | `weight-heading`         | 1.30        | Item titles               |
| Body    | 1rem            | `--text-body`     | `weight-body`       | 1.55        | Reading body              |
| Caption | 0.8125rem       | `--text-caption`  | `weight-body`    | 1.45        | Notes, figure captions    |
| Label   | 0.75rem         | `--text-label`    | `weight-body`      | 1.35        | Small labels, corner tags |

**Minimum floor**: web text ≥ 12px (0.75rem).

### Weight

```css
--weight-body: 400;    /* Body / serif body weight */
--weight-heading: 500; /* Headings weight */
--weight-bold: 600;    /* strong / bold weight */
```

- **Serif body**: `weight-body`
- **Serif headings**: `weight-heading` (real bold, not synthetic)
- **Sans body**: `weight-body` default
- **Sans labels / small titles**: `weight-heading` or `weight-bold`

**Design principle**: Serif uses only two weights (`weight-body` / `weight-heading`), no synthetic bold.

### Line-height

| Tier            | Value     | CSS token           | Use                 |
| --------------- | --------- | ------------------- | ------------------- |
| Tight headline  | 1.10–1.30 | `--leading-tight`   | Display, H1, H2     |
| Dense body      | 1.40–1.45 | `--leading-dense`   | Compact text        |
| Reading body    | 1.50–1.55 | `--leading-body`    | Body copy, articles |
| Label / caption | 1.30–1.40 | `--leading-label`   | Small labels        |

**Forbidden**:

- 1.60+ — loose feel, not editorial
- 1.00–1.05 — lines collide except at extreme display sizes

### Letter-spacing

- Body text: **0**
- Headings may use subtle optical tightening when needed; keep it localized, never inherited by body copy
- Small labels: `--tracking-label` (0.04em) for readability
- All-caps eyebrow: `--tracking-caps` (0.06em) mandatory

---

## Layout & Spacing

Spacing values are fluid via Utopia space calculator. Static values below are approximate midpoints.

### Space scale

| Tier | CSS token        | Use                               |
| ---- | ---------------- | --------------------------------- |
| 2xs  | `--space-2xs`    | Tightest inline spacing           |
| xs   | `--space-xs`     | Inline adjacent elements          |
| s    | `--space-s`      | Tag padding, dense layout         |
| m    | `--space-m`      | Component internals               |
| l    | `--space-l`      | Between components / card padding |
| xl   | `--space-xl`     | Section-title margins             |
| 2xl  | `--space-2xl`    | Between major sections            |
| 3xl  | `--space-3xl`    | Between chapters / page padding   |

### Max widths

Enforced limits for sensible and readable content/line lengths.

- `max-page`: 115ch
- `max-prose`: 70ch
- `max-heading`: 35ch

### Prefer layout primitives

Instead of media queries and custom layouts, reuse primitives at `docs/design/layout-primitives.md`.

---

## Elevation & Depth

**Core rule**: do not use traditional hard shadows. Depth comes from three sources:

### 1. Ring shadow (border-like)

For **button** hover/focus states.

```css
--ring-warm: rgba(0, 0, 0, 0.12); /* Warm ring for hover/focus borders */

box-shadow: 0 0 0 1px var(--ring-warm);
```

**Do not use for card hover**: ring shadow is a border replacement. Layering it over an existing border creates three-layer visual stacking (border + ring + offset), which feels digital, not paper-like.

### 2. Whisper shadow (barely visible lift)

For **card hover** and **featured card** elevation.

```css
--whisper-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);

/* Card hover - mimics paper lifting slightly */
.card {
 transition: box-shadow 0.2s;
}
.card:hover {
 box-shadow: var(--whisper-shadow);
}
.featured-card {
 box-shadow: var(--whisper-shadow);
}
```

**Why whisper, not ring**: paper elevation is depth change, not outline change. Whisper shadow is singular, soft, outline-free, matching the paper-like tone.

### 3. Section-level light/dark alternation

Sections alternate `parchment` and `deep-dark` backgrounds. This section-level change creates the strongest contrast.

**Forbidden**: `box-shadow: 0 2px 8px rgba(0,0,0,0.3)` and relatives.

---

## Components

### Cards / Containers

```css
.card {
 background: var(--bg-surface);
 border: var(--border-thin) solid var(--border-subtle);
 border-radius: var(--radius-md);
 padding: var(--space-m) var(--space-l);
}

.card-featured {
 border-radius: var(--radius-lg);
 box-shadow: var(--whisper-shadow);
}
.card-featured:hover {
 box-shadow: var(--whisper-shadow);
}
```

Radius scale: `rounded.sm` → 4px → `rounded.md` (default) → 8px → `rounded.lg` → 16px → `rounded.full` → 9999px.

### Buttons

```css
.btn {
 padding: var(--space-s) var(--space-m);
 border-radius: var(--radius-md);
 font-family: var(--font-body);
 font-weight: var(--weight-body);
 line-height: var(--leading-body);
 font-size: var(--text-body);
}

.btn.primary {
 background: var(--accent);
 color: var(--color-ivory);
}

.btn.secondary {
 background: var(--bg-interactive);
 color: var(--text-normal);
}

.btn.ghost {
 background: transparent;
 color: var(--accent);
 box-shadow: 0 0 0 1px var(--accent);
}
```

All buttons hover with `translateY(-1px)`.

### Tags

```css
.tag {
 background: var(--bg-interactive);
 color: var(--text-normal);
 padding: 2px 8px;
 border-radius: var(--radius-sm);
 font-family: var(--font-body);
 font-size: var(--text-caption);
 font-weight: var(--weight-heading);
 line-height: var(--leading-caption);
}
```

### Lists

Use native list markers, brand-colored: ordered lists carry numbers, unordered lists carry a disc. Do not fake a bullet with a `::before` en-dash; a dash marker reads like AI default output, not editorial typesetting.

```css
ul,
ol {
 padding-inline-start: var(--space-m);
 line-height: var(--leading-body);
}
ul li::marker {
 color: var(--accent);
 font-weight: var(--weight-heading);
}
ol li::marker {
 color: var(--accent);
 font-weight: var(--weight-heading);
}
```

### Quote

```css
.quote {
 border-inline-start: 2px solid var(--accent);
 padding: 4px 0 4px 14px;
 color: var(--text-muted);
 line-height: var(--leading-body);
}
```

### Code

```css
.code-block {
 background: var(--bg-surface);
 border: var(--border-thin) solid var(--border-subtle);
 border-radius: var(--radius-sm);
 padding: var(--code-block-padding);
 font-family: var(--font-mono);
 font-size: 0.8125rem;
 line-height: 1.5;
}
```

### Section Title

```css
.section-heading {
 font-family: var(--font-heading);
 font-weight: var(--weight-heading);
 color: var(--text-strong);
 margin: 0;
}
```

The `emphasis/section-heading.astro` component accepts a `prelabel` prop (rendered as `.section-num` above the heading in accent color, caption size) and separates into:

```html
<div class="flow">
  <p class="section-num">00 ⋅ About</p>
  <h2 class="section-heading">Title text</h2>
</div>
```

- `.section-num` uses accent color, `--text-caption` size, `--tracking-label` letter-spacing.
- The heading itself uses serif heading font, `--weight-heading`, `--text-strong` color, no border/padding/margin.
- Optional `href` renders a linked heading (link inherits text color, accent on hover).

### Decoration density for long-form layouts

No decorative lines. Brand color appears only in text. Containers use `ivory` fill + radius.

## Do's and Don'ts

Exceptions are allowed, but the reason should be explicit.

Do: Avoid media queries where possible. Almost always prefer layout primitives.

Don't: Write custom CSS variables and styles. Prefer existing utility classes and variables.

Don't: Set headlines to `weight-bold` or heavier synthetic bold. Synthetic bold blurs strokes and degrades typographic quality.

Do: Body `weight-body`, headings `weight-heading` (real W05). For more presence, use size or a brand left bar, never synthetic bold.

Don't: Use hard drop shadow. Visually heavy.

Do: Ring shadow `0 0 0 1px var(--ring-warm)` or `whisper-shadow`, or simply alternate light and dark sections.

When you're not sure "what should I use":

| Need                         | Use                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Big headline                 | serif `weight-heading`, size by level, line-height 1.10–1.30                 |
| Reading body                 | serif `weight-body`, `--text-body`, line-height 1.55                         |
| Emphasize a number           | `color: var(--accent)`, no bold                                              |
| Divide two sections          | 2.5px brand left bar, or 0.5px warm-gray dotted                              |
| Quote someone                | 2px brand left border + `--text-muted`                                       |
| Show code                    | `--bg-surface` background + `var(--border-thin)` border + `rounded-sm` + `--font-mono` |
| Primary vs secondary button  | Primary = `accent` fill + `--color-ivory` text; Secondary = `--bg-interactive` + `text-normal` |
| Highlight one card in a list | `border: var(--border-thin) solid var(--accent)` or `border-left: 3px solid var(--accent)` |
| Data card                    | `--bg-surface` background + `rounded-md` + serif big number + sans small label       |

Not on this table → return to first principles: **serif carries authority, sans carries utility, warm gray carries rhythm, ink-blue carries focus**.

---
