# Landing Page

## Layout

- Hero: two-column grid (`1fr auto`), text left + profile photo right. Stacks to single column below `700px`.
- Sections below hero (overview, projects, featured, footer) use `.region` with `--space-2xl` block padding.
- Sections alternate background: parchment (`--bg-page`) for hero and featured, ivory (`--bg-surface`) for overview and projects. Footer uses dark-surface (`--bg-dark`).
- Max page width: `120ch` via `.wrapper`. Prose width: `75ch`.
- No responsive breakpoints other than the hero's 700px collapse.

## Hero

- Name heading: `--text-display` (3rem), `weight-2` (500), `--leading-tight` (1.1)
- Subtitle: `--text-h1` (2rem), `weight-2` (500), `--leading-heading` (1.2)
- `<mark>` on "story.": `background: transparent`, `color: var(--brand)` — editorial mode, brand in text only
- Body copy: `--text-body` (1rem), `--leading-body` (1.55), max `75ch`
- CTAs: two buttons in a `.cluster`. Primary (email) = ink-blue bg, ivory text. Secondary (projects) = warm-sand bg, dark-warm text.
- Social links: inline icon + label row below text column, brand-colored hover

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
- Max image width: 320px.
- Loading: eager (above-the-fold).
