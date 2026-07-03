# Headers & Footers

## Header

Minimal — skip-link only. No navigation, banner, or sheet on the landing page. Will update later.

```html
<header>
	<a href="#main" class="skip-link">Skip to content →</a>
</header>
```

The skip-link is positioned fixed, hidden off-screen via `translateY(-100%)`, and slides in on `:focus`. Uses `--bg-page` background and `--accent` text color.

## Footer

Footer not implemented or design spec'ed yet. Here is AI-generated suggestions:

Content (inline, no grid):

- colophon link
- source code link
- "handcrafted by me" credit line

No theme toggle, no search, no nav stack — those belong on inner pages.
