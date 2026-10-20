# CSS cascade layers order the styling tiers

Shared CSS is split into cascade layers in [`src/styles/index.css`](../../src/styles/index.css): `global < compositions < blocks < utilities`. Astro component styles stay unlayered, so a Component always beats every shared tier, whatever the specificity. Before this, Prose selectors like `.prose :is(ul, ol):not(.not-prose) > li` (0,2,2) silently beat Component overrides, and ties between Utilities and Components fell to bundle chunk order.

## Considered Options

- **Lower Prose specificity with `:where()`**: fixes Prose only; the next Block repeats the bug. Still appropriate in certain situations.
- **Utilities unlayered**: Utility vs Component ties stay decided by chunk order (Astro scoped styles add zero specificity via `:where()`). Rejected for determinism.
- **Explicit `@layer components` so Utilities win**: every `<style>` block needs a wrapper; easy to forget.

## Consequences

- **`postcss-preset-env` `cascade-layers` polyfill is off.** It rewrites layers into `:not(#\#)` specificity boosts per file. Component CSS lives in other files, never gets boosted, and loses. Browsers without `@layer` (pre-2022) already lack `:has()` and container queries, which the site depends on, so no new users fall below the floor.
- **Components override Utilities and Compositions through custom properties** (`--region-space`, `--cluster-gap`), never by redeclaring the raw property. A Component setting `display` on a `.visually-hidden` element would win and leak it.
- **`!important` only for global a11y overrides** (`[hidden]`, reduced motion) in the `global` layer. Layered `!important` beats unlayered `!important`, so these keep winning.
