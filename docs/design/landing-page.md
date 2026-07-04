# Landing Page

## Layout

- Hero: two-column grid (`1fr auto`), text left + profile photo right. Stacks to single column below `700px`.
- Sections below hero (overview, projects, featured, footer) use `.region` with `--space-2xl` block padding.
- Sections alternate background: parchment (`--bg-page`) for hero and featured, ivory (`--bg-surface`) for overview and projects. Footer uses dark-surface (`--bg-dark`).
- Max page width: `120ch` via `.wrapper`. Prose width: `65ch` via `.prose-max` utility class.
- No responsive breakpoints other than the hero's 700px collapse.
- `<main>` no longer uses `padding-inline` — sections handle their own inline padding via `.wrapper`.

## Hero

- Name heading: `--text-display` (4rem), `--weight-heading` (500), `--leading-tight` (1.1), `--text-strong` color
- Subtitle: `--text-h1` (2rem), `--weight-heading` (500), `--leading-heading` (1.2)
- `<mark>` on "story.": animated highlight sweep from left (`linear-gradient` with accent color), not editorial-mode brand-only
- Tagline/MDX body: wrapped in `.prose` class (see below), `--text-normal` color
- CTAs: two buttons in a `.cluster`. Primary (email) = ink-blue bg, ivory text. Secondary (projects) = warm-sand bg, `--text-normal` text.
- Social links: inline icon + label row separated by `⋅` middot spans, brand-colored hover
- Wrapped in `.wrapper` for content width constraint

### Profile Photo

The hero photo receives editorial warmth treatment to align with the parchment palette:

```css
.hero-image img {
  filter: sepia(0.15) saturate(0.9); /* warm shift */
  border-radius: var(--radius-md);
}
.hero-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg-page);
  opacity: 0.12;
  border-radius: inherit;
  pointer-events: none;
}
```

- No other photos on the landing page receive this treatment.
- Max image width: 41ch.
- Loading: eager (above-the-fold).

## Caps

The `caps` component (in `src/components/emphasis/caps.astro`) is used as pre-section label.

Styles: uppercase, `--tracking-caps` letter-spacing, `--text-body-dense` size, `--color-stone` muted color, inline `.cluster` layout with `--cluster-gap: var(--space-sm)`.

## Section Headings

Both heading components live in `src/components/emphasis/`.

### Tagline

`<Tagline>` — decorative mono-style tag for hero subtitles. Wraps the MDX hero body content in the hero.

### SectionHeading

`<SectionHeading>` — used for section titles throughout the page. New design (replaced old border-left variant):

```html
<SectionHeading as='h2' prelabel='00 ⋅ About'>Title text</SectionHeading>
```

- `prelabel` prop — rendered as a `.section-num` paragraph above the heading in accent color, caption size, with letter-spacing tracking.
- Heading tag (h2/h3) — serif heading font, `--weight-heading` (500), `--text-strong` color.
- No left brand border bar (replaced the old `section-heading.astro` which had 2.5px accent left border).
- Heading font size inherits from the tag level (h2/h3 default browser sizes — not explicitly set).
- Optional `href` on h2/h3 renders a linked heading.

## Overview Section

`src/pages/_components/overview/index.astro` — restyled overview section using `overview.mdx` content with rich MDX:

```
<section class='overview region wrapper flow' style={{'--flow-space': 'var(--space-xl)'}}>
  <SectionHeading as='h2' prelabel='00 ⋅ About'>TL;DR of Caleb, in less than 140 words</SectionHeading>
  <div class='prose-max'>
    <article class='prose flow'>
      <Content components={{h2: Eyebrow}} />
    </article>
  </div>
</section>
```
