---
version: alpha
name: chuangcaleb
description: >-
  Warm parchment, ink-blue accent, single serif-led hierarchy.
  Intimate, editorial, intellectual. A notebook for narrative
  storywriting and software notes.
colors:
  primary: "{colors.near-black}"
  ivory: "#faf9f5"
  warm-sand: "#e8e6dc"
  ink-blue: "#1B365D"
  ink-light: "#2D5A8A"
  shot-bg: "#141318"
  dark-surface: "#30302E"
  near-black: "#141413"
  deep-dark: "#141413"
  dark-warm: "#3d3d3a"
  olive: "#504e49"
  stone: "#6b6a64"
  warm-gray: "#B5B2A7"
  border-primary: "#e8e6dc"
  border-secondary: "#e5e3d8"
  error: "#B53333"
typography:
  display:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 3rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
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
  body-md:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  body-dense:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  label-caps:
    fontFamily: Charter, Georgia, Palatino, "Times New Roman", serif
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.04em"
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button:
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.ivory}"
  button-primary-hover:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.ivory}"
  button-secondary:
    backgroundColor: "{colors.warm-sand}"
    textColor: "{colors.dark-warm}"
  card:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.near-black}"
    padding: 16px 20px
  card-featured:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.lg}"
    padding: 20px 24px
  nav-link:
    textColor: "{colors.dark-warm}"
  nav-link-active:
    textColor: "{colors.ink-blue}"
  prose-link:
    textColor: "{colors.ink-blue}"
  prose-link-hover:
    textColor: "{colors.ink-light}"
  tag:
    backgroundColor: "{colors.warm-sand}"
    textColor: "{colors.ink-blue}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  quote-block:
    textColor: "{colors.olive}"
    padding: 4px 0 4px 14px
  code-block:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.sm}"
    padding: 10px 14px
  error-text:
    textColor: "{colors.error}"
---

## Overview

This design is a customised extension of kami.

kami's aesthetic compresses into one sentence: **warm parchment canvas, ink-blue accent, serif carries hierarchy, avoid cool grays and hard shadows**.

This is not a UI framework. It is designed to keep pages stable, clear, and readable.

**The invariants** (each has a real cost, think before overriding):

1. Page background `parchment`, never pure white
2. Single accent: `brand`, no second chromatic color
3. All grays warm-toned (yellow-brown undertone), no cool blue-grays
4. Serif for everything (headlines and body). Sans only for UI elements (labels, eyebrows, meta)
5. Serif weight locked at `weight-2`, no synthetic bold
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
--brand:       #1B365D;   /* Ink Blue — the only chromatic color. CTAs, accents, section-title left bar. */
--brand-light: #2D5A8A;   /* Ink Light — brighter variant, for links on dark surfaces. */
--error: #B53333;   /* Error state, deep warm red, rarely used */
```

**Rule**: ink-blue covers ≤ **5% of page surface area**. More than that is ornament, not restraint.

### Surface

```css
--parchment:    #f5f4ed;   /* Page background — warm cream, the emotional foundation */
--ivory:        #faf9f5;   /* Card / lifted container — brighter than parchment */
--warm-sand:    #e8e6dc;   /* Button default / interactive surface */
--dark-surface: #30302e;   /* Dark-theme container — warm charcoal */
--deep-dark:    #141413;   /* Dark theme page base, not pure black */
```

### Text

```css
--near-black:  #141413;   /* Primary text — warm olive undertone */
--dark-warm:   #3d3d3a;   /* Secondary text, table headers, links */
--olive:       #504e49;   /* Subtext — descriptions, captions */
--stone:       #6b6a64;   /* Tertiary — dates, metadata */
```

Four levels: `near-black` (primary) > `dark-warm` (secondary) > `olive` (subtext) > `stone` (tertiary). No fifth level needed.

**Mnemonic**: every gray has a **yellow-brown undertone**. In `rgb()`, warm gray is R ≈ G > B (or R > G > B with small gaps). Cool gray is R < G < B or R = G = B (neutral).

### Border

```css
--border-primary:      #e8e6dc;   /* Primary border — section dividers, table headers, card borders */
--border-secondary: #e5e3d8;   /* Secondary border — row separators, subtle dividers */
```

---

## Typography

### Stacks

```css
/* Single serif per page. --sans always equals var(--serif). */
--serif: Charter, Georgia, Palatino, "Times New Roman", serif;

/* Mono stack */
--mono: "JetBrains Mono", "SF Mono", "Fira Code",
        Consolas, Monaco, monospace;

```

### Size scale

| Role | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | 3rem | `weight-2` | 1.10 | Page hero, cover title |
| H1 | 2rem | `weight-2` | 1.20 | Section titles |
| H2 | 1.5rem | `weight-2` | 1.25 | Subsection headings |
| H3 | 1.25rem | `weight-2` | 1.30 | Item titles |
| Body | 1rem | `weight-1` | 1.55 | Reading body |
| Body Dense | 0.875rem | `weight-1` | 1.42 | Dense body, metadata |
| Caption | 0.8125rem | `weight-1` | 1.45 | Notes, figure captions |
| Label | 0.75rem | `weight-3` | 1.35 | Small labels, corner tags |

**WARN**: The font sizes here are an estimation, the actual scale's values should be manually tunedfrom a fluid type scale calculator.

**Minimum floor**: web text ≥ 12px (0.75rem).

### Weight

```css
--weight-1: 400;   /* Body / serif body weight */
--weight-2: 500;   /* Headings / serif heading weight */
--weight-3: 600;   /* Labels / caps weight */
```

- **Serif body**: `weight-1`
- **Serif headings**: `weight-2` (real bold, not synthetic)
- **Sans body**: `weight-1` default
- **Sans labels / small titles**: `weight-2` or `weight-3`

**Design principle**: Serif uses only two weights (`weight-1` / `weight-2`), no synthetic bold.

### Line-height

| Tier | Value | Use |
|---|---|---|
| Tight headline | 1.10–1.30 | Display, H1, H2 |
| Dense body | 1.40–1.45 | Compact text |
| Reading body | 1.50–1.55 | Body copy, articles |
| Label / caption | 1.30–1.40 | Small labels |

**Forbidden**:

- 1.60+ — loose feel, not editorial
- 1.00–1.05 — lines collide except at extreme display sizes

### Letter-spacing

- Body text: **0**
- Headings may use subtle optical tightening when needed; keep it localized, never inherited by body copy
- Small labels: +0.02 to +0.05em for readability
- All-caps overlines: +0.04 to +0.08em mandatory

---

## Layout & Spacing

Pages have a max-width of `120ch`, but prose should have a comfortable reading width of max `70ch`.

### Base unit: 4px

| Tier | Value | Use |
|---|---|---|
| xs | 2–3px | Inline adjacent elements |
| sm | 4–5px | Tag padding, dense layout |
| md | 8–10px | Component interior |
| lg | 16–20px | Between components / card padding |
| xl | 24–32px | Section-title margins |
| 2xl | 40–60px | Between major sections |
| 3xl | 80–120px | Between chapters |

**WARN**: The font sizes here are an estimation, the actual scale's values should be manually tuned from a fluid space calculator.

### Prefer layout primitives

CSS layouts should reuse primitives at `design/layout-primitives.md`.

---

## Elevation & Depth

**Core rule**: do not use traditional hard shadows. Depth comes from three sources:

### 1. Ring shadow (border-like)

For **button** hover/focus states.

```css
--ring-warm: rgba(0, 0, 0, 0.12);   /* Warm ring for hover/focus borders */

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
  background: var(--ivory);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  padding: var(--card-padding);
}

.card-featured {
  border-radius: var(--radius-lg);
  box-shadow: var(--whisper-shadow);
}
```

Radius scale: `radius-sm` → 6px → `radius-md` (default) → 12px → `radius-lg` → 24px → 32px (hero containers).

### Buttons

```css
.btn {
  padding: var(--button-padding);
  border-radius: var(--button-rounded);
}

.btn.primary {
  background: var(--brand);
  color: var(--ivory);
}

.btn.secondary {
  background: var(--warm-sand);
  color: var(--dark-warm);
}

.btn.ghost {
  background: transparent;
  color: var(--brand);
  box-shadow: 0 0 0 1px var(--brand);
}
```

All buttons have `button-rounded` and `button-padding`, and hover with `translateY(-1px)`.

### Tags

```css
.tag {
  background: var(--warm-sand)
  color: var(--dark-warm);
  padding: var(--tag-padding);
  border-radius: var(--radius-sm);
}
```

### Lists

Use native list markers, brand-colored: ordered lists carry numbers, unordered lists carry a disc. Do not fake a bullet with a `::before` en-dash; a dash marker reads like AI default output, not editorial typesetting.

```css
ul, ol {
  padding-left: var(--spacing-md);
  line-height: 1.55;
}
ul li::marker { color: var(--brand); font-weight: var(--weight-2); }
ol li::marker { color: var(--brand); font-weight: var(--weight-2); }
```

### Quote

```css
.quote {
  border-left: 2px solid var(--brand);
  padding: var(--quote-padding);
  color: var(--olive);
  line-height: 1.55;
}
```

### Code

```css
.code-block {
  background: var(--ivory);
  border: 1px solid var(--border-secondary);
  border-radius: var(--code-block-rounded);
  padding: var(--code-block-padding);
  font-family: var(--mono);
  font-size: 0.8125rem;
  line-height: 1.5;
}
```

### Section Title

```css
.section-title {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: var(--weight-2);
  color: var(--near-black);
  margin: var(--spacing-lg) 0 10px 0;
  border-left: 2.5px solid var(--brand);
  border-radius: 1.5px;
  padding-left: var(--spacing-sm);
}
```

### Table

Unified table component. Base class applies to bare `<table>` or `.table`.

```css
table, .table {
  width: 100%; border-collapse: collapse;
  font-size: 0.875rem; margin: 12px 0;
}
table th, .table th {
  text-align: left; font-weight: var(--weight-2); color: var(--dark-warm);
  padding: 6px 8px; border-bottom: 1px solid var(--border-primary);
}
table td, .table td {
  padding: 5px 8px; border-bottom: 0.5px solid var(--border-secondary);
  vertical-align: top;
}
```

**Variants** (combine freely on the same element):

| Class | Purpose |
|---|---|
| `.compact` | Tighter padding for data-dense tables |
| `.financial` | Right-align all columns except first, enable `tabular-nums` |
| `.striped` | Alternating `ivory` background on even rows |

**Total row**: add `.total` to the final `<tr>` for a bold summary row with a `1px` brand top border.

```html
<table class="table financial striped">
  <thead><tr><th>Category</th><th>Q1</th><th>Q2</th></tr></thead>
  <tbody>
    <tr><td>Revenue</td><td>$12.4M</td><td>$14.1M</td></tr>
    <tr class="total"><td>Total</td><td>$12.4M</td><td>$14.1M</td></tr>
  </tbody>
</table>
```

### Metric

Key numbers side-by-side (page header, portfolio cover):

```css
.metrics { display: flex; gap: var(--spacing-lg); }
.metric  { flex: 1; display: flex; align-items: baseline; gap: 6px; }
.metric-value {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: var(--weight-2);
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.metric-label { font-size: 0.75rem; color: var(--olive); white-space: nowrap; }
```

Metric labels never wrap. Keep every label short enough for one line and set `white-space: nowrap`, so an over-long label is caught as overflow during QA instead of silently wrapping.

### Code Block

- `pre.code`: `ivory` background, 1px border, `radius-sm`, 18px 22px padding
- Font: `mono` 13.5px, tabular-nums, line-height 1.55; reduce to 11.5px at phone breakpoint
- Inline `code`: brand-tint background, `brand` text, 1px hairline, `0.9em`

Code blocks may use a dark surface (`shot-bg`) instead of `ivory`. Highlight at build time with zero runtime JS. Keep the token palette restrained on the dark surface:

| Token | Hex | Role |
|---|---|---|
| Comment | `#79756a` | faint |
| Keyword | `#84aad6` | soft blue |
| String | `#8cbb91` | muted green |
| Number | `#cbab86` | sand |
| Function/Class | `#d6c78c` | sand-gold |
| Builtin/Constant | `#b59ccd` | muted violet |

Code blocks with `class="language-*"` on the `<code>` element get syntax highlighting. The palette uses existing tokens only:

| Token | Token var |
|---|---|
| Keyword | `brand` |
| Comment | `stone` |
| String | `olive` |
| Number | `dark-warm` |
| Function/Class | `near-black` |

```html
<pre><code class="language-python">def analyze(data):
    """Transform raw data."""
    return transform(data)</code></pre>
```

Blocks without `class="language-*"` stay monochrome.

### Glance Grid

Four key-number cells, placed after the hero or on a chapter-opening page.

```html
<div class="glance-grid">
  <div class="glance-cell">
    <div class="glance-label">REPORTING PERIOD</div>
    <div class="glance-value">Q1 2026</div>
    <div class="glance-note">Three core themes</div>
  </div>
  <!-- 4 cells total -->
</div>
```

```css
.glance-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 18px 0;
}
.glance-cell {
  padding: 12px 0 10px 14px;
  border-left: 2px solid var(--brand);
  border-radius: 1.5px;
}
.glance-label {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--brand);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: var(--weight-2);
}
.glance-value {
  font-size: 1.5rem;
  font-weight: var(--weight-2);
  color: var(--near-black);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}
.glance-note {
  font-size: 0.75rem;
  color: var(--olive);
  line-height: 1.4;
}
```

### Decoration density: editorial vs structured

Long-form layouts have two acceptable decoration densities. Pick one and stay consistent.

| Context | Mode | Pattern |
|---|---|---|
| Data report, technical brief | **Structured** | Top hairlines on callouts, glance cells. Roughly 5-8 brand lines per page. |
| Editorial, narrative, personal site | **Editorial** (default) | No decorative lines. Brand color appears only in text. Containers use ivory fill + radius. |

The editorial mode reads as "content speaks"; the structured mode reads as "structure helps". When unsure, default to editorial.

---

## Do's and Don'ts

Exceptions are allowed, but the reason should be explicit.

Don't: Write custom CSS variables. Almost always prefer layout primitives and existing utility classes and variables.

Don't: Set headlines to `weight-3` or heavier synthetic bold. Synthetic bold blurs strokes and degrades typographic quality.

Do: Body `weight-1`, headings `weight-2` (real W05). For more presence, use size or a brand left bar, never synthetic bold.

Don't: Use hard drop shadow. Visually heavy.

Do: Ring shadow `0 0 0 1pt var(--ring-warm)` or `whisper-shadow`, or simply alternate light and dark sections.

When you're not sure "what should I use":

| Need | Use |
|---|---|
| Big headline | serif `weight-2`, size by level, line-height 1.10–1.30 |
| Reading body | serif `weight-1`, 1rem, line-height 1.55 |
| Emphasize a number | `color: var(--brand`, no bold |
| Divide two sections | 2.5px brand left bar, or 0.5px warm-gray dotted |
| Quote someone | 2px brand left border + `olive` |
| Show code | `ivory` background + 1px border + `radius-sm` + `mono` |
| Primary vs secondary button | Primary = `brand` fill + `ivory` text; Secondary = `warm-sand` + `dark-warm` |
| Highlight one card in a list | `border: 1px solid var(--brand)` or `border-left: 3px solid var(--brand)` |
| Start a section | serif heading + 2.5px brand left bar |
| Data card | `ivory` background + `radius-md` + serif big number + sans small label |

Not on this table → return to first principles: **serif carries authority, sans carries utility, warm gray carries rhythm, ink-blue carries focus**.
