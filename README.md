# SCS USJ-R Website

School of Computer Studies — University of San Jose Recoletos  
Built with plain HTML, CSS, and JavaScript. No frameworks, no build tools.

---

## File Structure

```
scs-usjr/
│
├── index.html              ← Home / Landing page
│
├── css/
│   ├── tokens.css          ← ALL colors, fonts, spacing — edit to retheme the whole site
│   ├── base.css            ← Reset, shared utilities, buttons, animations
│   ├── components.css      ← Nav and footer (shared across every page)
│   └── home.css            ← Styles only used on index.html
│
├── js/
│   ├── nav.js              ← Injects <nav> and <footer> into every page automatically
│   └── stars.js            ← Star field particle effect for hero sections
│
├── pages/
│   ├── programs.html       ← Programs overview (placeholder)
│   ├── about.html          ← About / Faculty (placeholder)
│   ├── news.html           ← News & Events index (placeholder)
│   ├── contact.html        ← Contact page (placeholder)
│   └── posts/              ← (future) Individual blog/news posts go here
│
└── assets/
    ├── images/             ← Photos, banners, faculty headshots
    └── fonts/              ← Self-hosted fonts (optional, currently using Google Fonts)
```

---

## How to Run

No build tools needed. Just open `index.html` in a browser.

For nav.js to resolve relative paths correctly across pages, run a local server:

```bash
# Python (built-in)
python -m http.server 8080

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8080`.

---

## How to Scale Up

### Adding a new page
1. Copy any placeholder from `pages/` as your starting point.
2. Set `data-page="yourpage"` on `<body>`.
3. Add a `<li>` in `nav.js` pointing to your new page.
4. Create `css/yourpage.css` and link it in the `<head>`.

### Changing colors / branding
Edit **`css/tokens.css`** only. Every color is a CSS variable — one file change retheems everything.

### Adding blog posts
1. Create `pages/posts/your-post-title.html`.
2. Link to it from `pages/news.html`.
3. No CMS needed at this stage — just plain HTML files.

### Upgrade paths (when the time comes)
- **Static site generator**: Migrate to [Astro](https://astro.build) — zero redesign needed, same HTML/CSS.
- **CMS**: Point Astro at a headless CMS (Sanity, Contentful) for instructor-editable news posts.
- **Framework**: The CSS token system is React-ready — just import the CSS files into a Vite/React project.

---

## Design System Notes

- **Display font**: Cinzel (headings, nav, badges)
- **Body font**: Rajdhani (all UI text)
- **Italic accent**: Crimson Pro (hero subtitle)
- **Primary palette**: USJ-R Green `#1A5C2A` + SCS Gold `#F5C518` + Amber `#E8712A`
- **All colors** are in `css/tokens.css` as CSS custom properties.
