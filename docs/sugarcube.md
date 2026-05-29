# Sugarcube.sh

- <https://sugarcube.sh/>
- [Astro | sugarcube](https://sugarcube.sh/docs/astro/#with-the-vite-plugin)

## Notes

Using the `fluid` starter kit with `cubecss`, and extending from there, this will list changes and observations made.

- typography
- `colors` and `dark`
  - surface(unused): raised, lowered, and lowest
  - text(unused): quiet, quieter, placeholder
  - `fill` almost never used
- cubecss
  - wrapper
    - renamed gutter
- remove all fallbacks, that exist in design-tokens
- removed --fw-6
- pruned colors

## TODO

- gutter
- typography
- use --s instead of --space

## Comments

- Units restricted to px and rem. Have to manually declare e.g. `--measure: 60ch`
