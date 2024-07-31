# chuangcaleb.com

Personal portfolio site to share (1) about myself + (2) content I've written. This v2 focuses on streamlining DX by leaning into CSS Variables.

## Getting Started

### Commands

All commands are run from the root of the project, from a terminal.

| Command               | Action                                             |
| :-------------------- | :------------------------------------------------- |
| `pnpm install`         | Installs dependencies                              |
| `pnpm cloudinary:cache`| Pre-cache Cloudinary images with its API            |
| `pnpm dev`         | Starts local dev server at `localhost:4321`        |
| `pnpm dev:nocache` | Runs dev without `cloudinary:cache`                 |
| `pnpm build`       | Build production site to `./dist/` (with `cloudinary:cache` + `git submodule update` from latest remote)           |
| `pnpm build:nocache`| Only build production site  |
| `pnpm preview`     | Build (cache + submodule) then preview locally, before deploying       |
| `pnpm preview:nocache`     | Same as `preview`, but don't `cloudinary:cache` when building       |
| `pnpm preview:nobuild`     | Same as `preview`, but without build step, so directly re-using existing local build      |
| `pnpm format:check`      | Print code-format results with Prettier                         |
| `pnpm format:fix`      | Format all code with Prettier (will write)                         |
| `pnpm astro ...`   | Run CLI commands like `astro add`, `astro preview` |

Check [package.json](./package.json) for specific implementation.

## Architecture / Tech Stack

As of latest:

- Web Framework: [Astro](https://astro.build/)
- UI Component(s) Library: [Radix Primitives](https://www.radix-ui.com/primitives)
  - UI Library: [React](https://react.dev/)
- CSS/Design
  - Methodology: [CUBE CSS](https://cube.fyi/)
  - CSS Tokens: [Open Props](https://open-props.style/)
  - CSS Extension: [Sass/Scss](https://sass-lang.com/)
  - Preprocessing: [PostCSS](https://postcss.org/)
  - Fluid Responsive Design: [utopia-core-scss](https://github.com/trys/utopia-core-scss) @ [Utopia](https://utopia.fyi/)
- Deployment + CD: [Cloudflare Pages](https://pages.cloudflare.com/)
- Image CDN: [Cloudinary](https://cloudinary.com/)
- CMS: [Obsidian](https://obsidian.md/) + [GitHub](https://github.com/) repo

### Project structure

```
.
├── lib
│   ├── *
│   └── utils // utilities scoped to /lib
├── patches // generated by `pnpm patch`
├── public
│   ├── assets
│   │   ├── favicon
│   │   └── fonts
│   └── _headers
└── src
    ├── assets // optimised local image asset(s)
    ├── components
    │   ├── block // has logic, or has many elements
    │   ├── layout
    │   └── styled // just visually styled, no logic
    │       ├── monom / mono-morphic, fixed final HTML tag
    │       └── polym // poly-morphic, dynamic final HTML tag
    ├── content
    │   ├── project
    │   ├── obsidian-note // git submodule → obsidian-caleb-public
    │   │   └── **.md
    │   └── config.ts
    ├── data // structured static data
    ├── pages
    │   └── **
    │       └── _components // scoped helper components
    ├── styles
    │   ├── config
    │   │   ├── dynamic-colors.scss // color calculations
    │   │   ├── fluid.scss // utopia-core-scss fluid type generators
    │   │   ├── fonts.css // font imports
    │   │   ├── misc.scss
    │   │   ├── theme.scss // theme config
    │   │   └── composer.scss // composes everything in style rules
    │   │   └── index.css // default export
    │   ├── normalize // reset default agent styles
    │   ├── overrides // custom site styles
    │   ├── utilities // does one job well
    │   └── global.css // main css entry point
    └── utils // /src-specific utilities
```

Astro looks for .astro or .md files in the `src/pages/` directory. Each page is exposed as a route based on its file name, except if a route segment starts with an `_` (like `_components`).

There's nothing special about `src/components/`, but that's where any Astro/React/Vue/Svelte/Preact/etc. components live.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

## Design

This repo is the second iteration of my personal site, after [chuangcaleb/v1.chuangcaleb.com](https://github.com/chuangcaleb/v1.chuangcaleb.com).

Back then, I was still super novice at this whole web thing. I picked up the new trending tech (Astro + Tailwind). I'm proud of it, but I think my skills have upgraded since then.

As described above, v2 focuses on improving two interrelated objectives:

1. Developer Experience (DX)
2. Component variants via native CSS Variables

### Astro

I came into v1 from old-school Jekyll and diluting with newfound React. Was also new to Astro.

One obvious difference is not enforcing `index.ts` exports for every `.astro` file. Unnecessary.

Stuff used to be littered everywhere. Big change was code **co-location**. For example, the index page has a few major sections, soj I extracted each section into individual files. They used to live all the way in `src/components/block` — but were only used by one page. In cases like these, just co-locate these helper components like `./_components/ProjectsSection.astro` (taking advantage of how [filepaths with `_` don't get their own route](https://docs.astro.build/en/guides/routing/#excluding-pages)). This has made maintainability so much more obvious.

And also just leaning into co-locating css `<styles>` in `.astro` files themselves, rather than atomic classnames.

### CSS Methodology

I've extracted my writings about my past experience with and moving away from atomic-utility CSS, as it's not specific to this project. You can read about it at [What’s Next After Atomic-Utility CSS | chuangcaleb.com](https://chuangcaleb.com/note/whats-next-after-atomic-utility-css).

#### Modern Syntax + CSS Variables

During this v2, implementing CSS Variables (aka CSS Properties) (and some modern CSS tricks!) ties the methodology together.

Here are some shoutouts:

- [argyleink/open-props: CSS custom properties to help accelerate adaptive and consistent design](https://github.com/argyleink/open-props) provides some zero-specificity standardised style tokens in CSS Variable form.
- [Axiomatic CSS and Lobotomized Owls – A List Apart](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) was REVOLUTIONARY for me for controlling (rather, letting go of control of!) flowing prose layout — see [flow.css](src/styles/utilities/flow.css)
- [CSS Grid full-bleed layout tutorial](https://www.joshwcomeau.com/css/full-bleed/) — I struggled with full-bleed alternate-background-color sections
- [Layout Breakouts with CSS Grid](https://ryanmulligan.dev/blog/layout-breakouts/) takes the above concept further with *named grid lines* for content layouts that breakout of the line-width. I may have gone overboard with **SIX** named breakpoints at [cgrid.css](src/styles/utilities/grid/cgrid.css)
- [utopia-core-scss](https://github.com/trys/utopia-core-scss) by [Utopia](https://utopia.fyi/) generates fluid-responsive CSS Variable tokens.

#### Color Scheme

A `color-[1-10]` color palette is neat, and it's easy to say "oh my button on hover needs to be one shade darker" — but then you've got some other elements which are slightly different shade on hover. We need **semantic** colors.

While tweaking my Obsidian, I found [obsidian-minimal's color scheme implementation](https://github.com/kepano/obsidian-minimal/blob/master/src/scss/variables/dynamic-color.scss) is great because it's (1) very extensible, (2) dynamically generated and (3) easy to use/great DX because of the semantic token names.

I'm still forming my adaptation of the color scheme system, the below is a WIP:

First, a particular theme defines `--base-[hsl]` and `--accent-[hsl]`.

```css
  --base-h: 234;
  --base-s: 21%;
  --base-l: 18%;

  --accent-h: 9;
  --accent-s: 80%;
  --accent-l: 65%;
```

Then we build four types/classes of tokens, with `n` number of color shades each:

- `--bg-[123]` - background (background)
- `--ui-[123]` - border (background)
- `--fg-[12349]` - text (foreground)
- `--ax-[1234]`- accent (foreground)

As `n` increases, *emphasis* decreases — except for:

1. the last color shade of `bg` and `ui` colors, which are shades for being "active".
2. the last color shade of `fg` (`fg-9`), which is the opposite-contrast foreground shade, for use like as text color on accent-background buttons, which is technically not least in "emphasis".

For each specific shade, it will take the `hsl` segments and recompute a `hsl` color by modifying the `saturation` and `lightness` segments. Some shades may opt to utilize `hsla` and the opacity parameter.

```css
--bg2: hsl(var(--base-h), calc(var(--base-s) - 2%), calc(var(--base-l) - 4%));
// tip: hue segment is always unmodified
```

Then we can map these to more semantic tokens, for example:

```css
--border-primary: var(--ui1);
--border-secondary: var(--ui2);
--border-active: var(--ui3);

--text-strong: var(--fg1);
--text-normal: var(--fg2);
--text-faded: var(--fg3);
--text-muted: var(--fg4);
--text-on-accent: var(--bg2); // allow reusing base color shades
```

Finally, implementations can use the semantic tokens:

```css
:where(a[href]) {
  --color: var(--text-normal);
  // can use base color shades directly instead of semantic tokens:
  --color-underline: var(--ax3);
  --color-hover: var(--text-strong);
  color: var(--color);
  text-decoration-color: var(--color-underline);
}
// psuedo-variant
:where(a[href]:is(:hover, :focus, :active)) {
  --color-underline: var(--ax1);
  color: var(--color-hover);
}
// variant just re-defines local CSS Variables/Properties
a.accent {
  --color: var(--ax2);
  --color-hover: var(--ax1)
}
```

Which is so much clearer, concise and expressive than atomic classnames. Very minimal CSS Variable calculations, negligible performance hits — in fact it's a smaller CSS bundle lol.

And, we can generate colors on the fly, even client-side! (Coming soon to stores near you!)

See [dynamic-colors.scss](src/styles/config/dynamic-colors.scss).

#### Color Scheme (Advanced)

Dynamic color generation is more complicated when handling light/dark modes. While obsidian-minimal implements unique base modifiers for each color shade for each theme/mode, I preferred automatically handle this.

##### Lightness Coefficient

Foreground elements with decreasing emphasis  gets dimmer in dark mode, but brighter in light mode. Reverse is true with background colors.

To put it simply: a shade's lightness modifier must be flipped/inverted between dark and light mode. We use `--m` as the light/dark Mode coefficient

- e.g. `--fg1: hsl( calc( var(--base-l) ${+/- n}% * var(--m) ) )`
- is used to flip the +/-ve direction of lightness modifiers
  - dark mode: 1 (fg emphasis gets lighter against dark bg)
  - light mode: -1 (fg emphasis gets darker against light bg)
- can use decimal numbers, greater magnitude increases lightness-contrast between shades

##### Accent Lightness Coefficient

After Lightness is flipped appropriately, there's another issue: accent colors are usually bright. Dark mode requires less contrast between accent shades than in light mode. One mode will always have the wrong degree of contrast between shades.

So just introduce a new variable lol, `--a-l` as the Accent Lightness coefficient to work together with the Lightness coefficient, only for accent shades

- e.g. `--ax1: hsl( calc( var(--base-l) ${+/- n}% * var(--m) * var(--a-l) ) )`
- is used to increase difference in Lightness between *accent* shades
- larger magnitudes for light mode with light bg, since accents also have high lightness

##### Handling exceptions

1. `--bg2` is always a darker shade than `--bg1`, so we just exclude passing `--m` into `--bg2`'s shade calculation.
2. `--fg1` should always automatically be the lightest/darkest black/white color available — so just set the Lightness component to a 95-100% and let the `--m` coefficient flip it according to light/dark mode.

<!-- I think the CSS Variables also just matured enough for people to iterate enough with it. -->

### Obsidian Notes

I write my content locally in Obsidian and want to display them in the Astro site. I already version control with git, so I didn't need to reach for another remote cloud sync option.

However, I don't want to expose all my personal journal notes lol. Just those files/notes in select folders/directories or passing some frontmatter condition.

One way would be to nest the obsidian vault repository within the Astro repository, and gitignore bad paths. But then that would load all Obsidian notes locally. A [previous implementation](chuangcaleb.github.io/wtsa) was to nest the Astro repository at a public directory of the Obsidian vault repository.

But in the end, both ways will source control the content files, so I had [a bunch of content-commits in between my source-code-commits](https://github.com/chuangcaleb/wtsa/commits/source/). I no likey. I reached for some CMS solutions but that was over-engineering for now.

Currently, I make use of the [kometenstaub/metadata-extractor](https://github.com/kometenstaub/metadata-extractor) plugin to dump the metadata cache of my Obsidian notes to a local file. A custom script to process that metadata cache (mainly to filter out private notes) and we commit this `.json` file to the Obsidian vault repo.

Then a custom GitHub Actions workflow (triggers on-push to select paths) runs another script to iterate through this `.json` file and copy those subset of files into a `dist` directory. [s0/git-publish-subdir-action: GitHub Action to push a subdirectory as a branch to any git repo (e.g. for GitHub Pages)](https://github.com/s0/git-publish-subdir-action/tree/develop/) then pushes this directory to [chuangcaleb/obsidian-caleb-public: Public subset of my Obsidian vault exposed to publish on my personal website](https://github.com/chuangcaleb/obsidian-caleb-public).

This `obsidian-caleb-public` repo is a [submodule](.gitmodules) that resides in this repo at [`src/content/obsidian-note`](src/content/obsidian-note). Then this frontend web layer has 0 concern for handling the content data — all that is handled on the Obsidian repo side.

The scripts are currently in my private repo, I can share it upon request.

### Cloudinary Images

Using Cloudinary, but just for project images. May change exactly how it works. See [lib/cloudinary](lib/cloudinary).

A cache step will use the Cloudinary API to get the results of all images in an asset folder and write to a local `.json` file. Then when picking an image, we just read from this cache. The alternative would be to call the API in the `.astro` frontmatter, but that would call the API on every refresh, and it would hit the limit.

## Roadmap

- [unpic.pics](https://unpic.pics/)
