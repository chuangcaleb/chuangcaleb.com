# Notes Module — Design Spec

## Overview

Notes module for displaying blog/note content from the `obsidian-note` content collection. Two page types:

1. **Index** (`/notes`) — list of all notes with title + metadata tags
2. **Item** (`/notes/[slug]`) — individual note with full body, metadata, callout, up-links, and resources

## Data flow

- Content source: `astro:content` collection `obsidian-note` (`.md` files in `src/content/obsidian-note/`)
- Frontmatter: refer to `content.config.ts`
- Title: extracted from the first `#` heading in the raw markdown body (not stored in frontmatter)
- Route: `/notes/{data.slug}`
- `remarkStripH1` plugin strips `#` headings from rendered output, keeping page structure stable (one `<h1>` per page, set by the template)

## Components

### `note-card.astro`

Used on the index page inside `<li>` items.

**Props**:

- `note: SuperNote` (see `lib/utils/types`)

**Structure**:

```tsx
<article.note>
  <a.note-anchor href>
    <h3.note-title>{title}</h3>
  </a>
  <ul.note-tags>  ← Tag components
</article>
```

## Utility: `noteToTags(meta)` (note-metadata.ts)

Transforms note frontmatter into `NoteTag[]` array for the tag row:

| Frontmatter field | Label transformation |
|---|---|
| `published` | `formatDisplayDate()` → `03 Sep 2022` |
| `modified` | `getRelativeSince()` → `34d ago` or `0.3y ago` |
| `words` | `0` → nothing; `1-200` → `atom`; `201-500` → `page`; `501+` → `0.6kw` |
| `status` | Rendered as-is (e.g. `wip`, `mvp`) |

Each tag rendered inside `<Tag>` component (mono-styled pill).

## Time formatting

- `getRelativeSince(then: Date): string`
  - `0` days → `<1d`
  - `1-91` days → `{N}d`
  - `92+` days → `{(days/365).toFixed(1)}y` (e.g. `0.3y`, `1.2y`)

- `formatDisplayDate(datetime): string | null`
- use `src/utils/time.ts`

## Pages

### `/notes` (index)

- No header (footer contains nav)
- `<main>` contains `<h1>notes</h1>` + `<ul>` of `Note` components
- Ordered by `published` descending (newest first), falling back to `modified`, finally `id`
- Only notes with a defined `slug` are listed

### `/notes/[slug]` (individual)

**Structure**:

```tsx
<NoteHeader showHome />
<main>
  <article.wrapper.flow>
    <nav.note-up>
      <a href={parent.route}>{parent.name}</a>
    </nav>
    <h1>{title}</h1>
    <NoteCallout>          ← only if `fyi` exists
    <ul.note-tags>         ← Tag components
    <div.prose>            ← markdown body (content slot)
    <section.note-resources>  ← only if `resources` exists
      <h2>resources</h2>
      <ul>
        <li>
          <a>{resource.label}</a>
          <span> — {resource.domain}</span>
        </li>
      </ul>
    </section>
  </article>
</main>
<NoteFooter />
```

**Resources parsing**: frontmatter `resources` is `string[]` of markdown links `[label](url)`. Parsed to extract `{label, href, domain}` where domain is the hostname with `www.` stripped.

## Navigation config (`src/data/note-nav.ts`)

Reusable `NOTE_NAV_LINKS` object:

| Key | Label | Route | Enabled |
|---|---|---|---|
| `INDEX` | `chuangcaleb.com` | `/` | `['footer']` |
| `NOTES` | `/notes` | `/notes` | `['header', 'footer']` |
