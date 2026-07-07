# Layout Primitives

Every Layout-inspired compositional classes from `src/styles/compositions/`. Each CSS file is the single source of truth — read it for full custom-property configuration and defaults. Prefer implicit responsive layout, rather than fixed media queries.

## Flow

`.flow` — vertical rhythm between stacked children. Use for articles, card bodies, form fields — any list of blocks that need consistent spacing between them. Prefer `flow-[size]` utilities.

## Cluster

`.cluster` — distribute items with consistent spacing, regardless of their size. Use for tag groups, nav links, button bars.

## Auto Grid

`.grid-auto` — auto-fill grid with configurable grid item sizes. Use for card grids, gallery thumbnails — any repeat-pattern layout where items share a minimum width.

## Wrapper

`.wrapper` — centered content container with max-width and gutter. Use once per page section to constrain content width.

## Sidebar

`.sidebar` (with `:has(> .sidebar)` parent) - sidebar + main-content split that collapses to stack. Use for page layouts with a fixed or variable-width sidebar.

## Switcher

`.switcher` — **2** items side-by-side that switch to stacked when the container shrinks and not enough horizontal space. Use for label+input pairs, headers with bylines, any two-element responsive row.

## Repel

`.repel` — pushes items away from each other where there is space in the viewport, and stacks on small viewports. Use for nav bars (logo one side, links the other) or any layout pushing items to opposite edges.

## Dos

- Set custom properties (`--flow-space`, `--cluster-gap`, `--grid-item-min`, etc.) on the element or its parent to tune the primitive — defaults exist for most cases.
- Nest primitives: a `.grid-auto` inside `.wrapper` inside `.flow` is the expected pattern.
- Use `.flow` as the default spacing mechanism for any vertical sequence; it replaces manual `margin-bottom` on components.

## Don'ts

- Don't add `margin-bottom` to items inside `.flow` — the `margin-block-start` on sibling selectors handles it.
- Don't use `.sidebar` without the `:has(> .sidebar)` parent wrapper — the collapse mechanic depends on the parent flex container.
- Don't put more than 2 direct children in `.switcher` — beyond the second, items are forced to full width.
- Don't set fixed heights on `.grid-auto` items unless you know the content — `--grid-align-items` is the right control.
- Don't apply `.wrapper` to the `<body>` or `<html>` — wrap content sections, not the document root.
