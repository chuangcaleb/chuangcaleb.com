# Prose

Prose block styling for long-form content. Defined in `src/styles/blocks/prose.css`.

## Core behavior

- `.prose` sets `--flow-space: var(--space-l)` as default vertical rhythm
- Paragraphs, list items, blockquotes constrained to `--max-prose` (70ch)
- Headings constrained to `--max-heading` (45ch)

## Headings

- Headings use `--weight-heading` (500), serif
- Heading flow: first element after heading gets `--flow-space: var(--space-l)`
- Heading before a previous block gets `--flow-space: var(--space-xl)`

## Body text

- Paragraphs use `--leading-body` (1.55)
- `strong`, `dt` use `--weight-bold` (600) — heavier than headings

## Lists

- Native list markers, brand-colored via `::marker`
- `ul`: native disc, `var(--accent)` color
- `ol`: native numbering, `var(--accent)` color + `var(--weight-heading)` (500) weight
- `ul.dash`: same native disc rendering (alias for backward compat)
- No `::before` en-dash fake bullets
- List item spacing: `--space-xs` between siblings via `.prose` flow
- `ol > li`: `--space-2xs` padding-inline-start

## Blockquotes

- Left border: `2px solid var(--accent)`
- `var(--text-muted)` text color
- Paragraphs inside: italic, `var(--weight-body)` (400)
- Left-aligned with small negative margin offset (`calc(var(--gutter) * -0.5)`)

## Code

- Inline `code`: scaled by `--font-mono-scale` (0.8)
- No special block styling applied here (delegated to Astro's Shiki/code components)

## Misc

- `kbd`: `--radius-sm` border-radius
- `hr`, images: `--flow-space: var(--space-2xl)`
- `figure`, `table`: `--flow-space: var(--space-xl)`
