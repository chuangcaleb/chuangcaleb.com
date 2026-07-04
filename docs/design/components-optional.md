# Design Specs — Components (Optional / Future Reference)

> Design specifications for components and patterns that are **not yet implemented** on the current landing page. Kept for reference.

## Table

Unified table component. Base class applies to bare `<table>` or `.table`.

```css
table,
.table {
 width: 100%;
 border-collapse: collapse;
 font-size: 0.875rem;
 margin: 12px 0;
}
table th,
.table th {
 text-align: left;
 font-weight: var(--weight-2);
 color: var(--dark-warm);
 padding: 6px 8px;
 border-bottom: 1px solid var(--border-primary);
}
table td,
.table td {
 padding: 5px 8px;
 border-bottom: 0.5px solid var(--border-secondary);
 vertical-align: top;
}
```

**Variants** (combine freely on the same element):

| Class        | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `.compact`   | Tighter padding for data-dense tables                       |
| `.financial` | Right-align all columns except first, enable `tabular-nums` |
| `.striped`   | Alternating `ivory` background on even rows                 |

**Total row**: add `.total` to the final `<tr>` for a bold summary row with a `1px` brand top border.

```html
<table class="table financial striped">
 <thead>
  <tr>
   <th>Category</th>
   <th>Q1</th>
   <th>Q2</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>Revenue</td>
   <td>$12.4M</td>
   <td>$14.1M</td>
  </tr>
  <tr class="total">
   <td>Total</td>
   <td>$12.4M</td>
   <td>$14.1M</td>
  </tr>
 </tbody>
</table>
```

## Metric

Key numbers side-by-side (page header, portfolio cover):

```css
.metrics {
 display: flex;
 gap: var(--space-l);
}
.metric {
 flex: 1;
 display: flex;
 align-items: baseline;
 gap: 6px;
}
.metric-value {
 font-family: var(--serif);
 font-size: 1.25rem;
 font-weight: var(--weight-2);
 color: var(--brand);
 font-variant-numeric: tabular-nums;
}
.metric-label {
 font-size: 0.75rem;
 color: var(--olive);
 white-space: nowrap;
}
```

Metric labels never wrap. Keep every label short enough for one line and set `white-space: nowrap`, so an over-long label is caught as overflow during QA instead of silently wrapping.

## Code Block

- `pre.code`: `ivory` background, 1px border, `radius-sm`, 18px 22px padding
- Font: `mono` 13.5px, tabular-nums, line-height 1.55; reduce to 11.5px at phone breakpoint
- Inline `code`: brand-tint background, `brand` text, 1px hairline, `0.9em`

Code blocks may use a dark surface (`shot-bg`) instead of `ivory`. Highlight at build time with zero runtime JS. Keep the token palette restrained on the dark surface:

| Token            | Hex       | Role         |
| ---------------- | --------- | ------------ |
| Comment          | `#79756a` | faint        |
| Keyword          | `#84aad6` | soft blue    |
| String           | `#8cbb91` | muted green  |
| Number           | `#cbab86` | sand         |
| Function/Class   | `#d6c78c` | sand-gold    |
| Builtin/Constant | `#b59ccd` | muted violet |

Code blocks with `class="language-*"` on the `<code>` element get syntax highlighting. The palette uses existing tokens only:

| Token          | Token var    |
| -------------- | ------------ |
| Keyword        | `brand`      |
| Comment        | `stone`      |
| String         | `olive`      |
| Number         | `dark-warm`  |
| Function/Class | `near-black` |

```html
<pre><code class="language-python">def analyze(data):
    """Transform raw data."""
    return transform(data)</code></pre>
```

Blocks without `class="language-*"` stay monochrome.

## Glance Grid

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

- `auto-fill, minmax(240px, 1fr)` grid, 18px gap
- Cards: `ivory` bg, 1px border, `radius-md`, `whisper-shadow` on hover
- Image fills top, title 15px weight `weight-2` + desc 12px `olive` below

## Features

- Two-column grid: 200px name + 1fr description, 36px gap, separated by `border-secondary` hairlines
- Feature name: 22px `brand`, weight `weight-2`
- Poetic subtitle: `<small>` below name, 13px `olive`, italic
- Description: 15px `dark-warm`, line-height 1.55
- Tables stay editorial: no framed box, no tinted header bar, no vertical rules

## FAQ

- Wrap each dt/dd pair in `<div class="faq-pair">` for spacing (`space-l` margin-bottom)
- `<dt>` question: 16px, weight `weight-2`
- `<dd>` answer: 14px `olive`
- Code spans: `mono` 12px on brand-tint background, `radius-sm`
- Tail paragraph: `.faq-tail` after `</dl>`, 13px `stone`
