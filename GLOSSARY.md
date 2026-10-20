# chuangcaleb.com

Personal site and digital garden. Styling follows CUBE CSS; these terms name its tiers.

## Styling tiers

**Composition**:
A layout primitive that arranges its children without giving them any visual skin.
_Avoid_: layout, wrapper (as a general term), container

**Block**:
A styled context with its own look that applies to everything inside it, e.g. Prose.
_Avoid_: composition (for prose), theme, skin

**Utility**:
A single-purpose class that does one job anywhere it is applied.
_Avoid_: helper, modifier

**Component**:
A self-contained UI piece that owns its own markup and styles.
_Avoid_: block, widget, partial

**Prose**:
The Block for long-form reading content such as note bodies and prose-variant lists.
_Avoid_: typography, rich text, markdown styles

## Notes

**Dated List**:
A Prose list of notes where every entry leads with the same kind of date, published or modified.
_Avoid_: timeline, log, has-date list
