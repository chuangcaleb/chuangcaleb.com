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

Footer implemented with nav links, social icons, and rebuild date line. See `src/components/layout/footer.astro`.

Content:
- Site title (h2)
- Navigation links from `NOTE_NAV_LINKS`
- Social icon links separated by middots
- Rebuild date line

No theme toggle, no search — those belong on inner pages.
