# Development Plan
## Aurore Jewellery — Landing Page + Catalogue Page
**Scope:** Two pages only — `index.html` (Landing) + `catalogue.html` (Product Catalogue)
**Stack:** Pure HTML + CSS + Vanilla JS → GitHub → Shopify (Liquid conversion last)
**Approach:** Build in plain HTML/CSS/JS first. Get it pixel-perfect. Then port to Shopify Liquid.

---

## The Golden Rule

> Build it in HTML first. Ship it to Shopify second.

Never touch Liquid syntax until the HTML prototype is done and looks exactly right in a browser.
This saves you from debugging design AND Shopify simultaneously — a nightmare.
VS Code + Live Server is your friend during the HTML phase.

---

## Folder Structure (Create This Before Writing Any Code)

```
aurore/
│
├── assets/
│   ├── css/
│   │   ├── base.css            ← tokens, reset, typography, utilities (write first)
│   │   ├── navbar.css          ← shared nav (both pages use this)
│   │   ├── footer.css          ← shared footer (both pages use this)
│   │   ├── landing.css         ← homepage-only styles
│   │   ├── catalogue.css       ← catalogue-only styles
│   │   └── animations.css      ← all @keyframes + .reveal scroll classes
│   │
│   ├── js/
│   │   ├── navbar.js           ← scroll-aware nav background + mobile menu
│   │   ├── parallax.js         ← hero image stack fan/spread effect
│   │   ├── cursor.js           ← custom gold cursor (desktop only)
│   │   ├── scroll-reveal.js    ← IntersectionObserver fade-ins (shared)
│   │   ├── catalogue.js        ← filter, sort, search, view-toggle logic
│   │   └── marquee.js          ← pause-on-hover for auto-scroll tracks
│   │
│   └── images/
│       ├── logo.svg
│       ├── hero/               ← 5 stacked hero images
│       ├── products/           ← primary + secondary image per product
│       └── editorial/          ← lifestyle shots, collection feature images
│
├── index.html                  ← Landing Page
├── catalogue.html              ← Product Catalogue Page
└── README.md
```

---

## Phase 0 — Environment Setup
**Time:** ~2 hours | **Day:** 1

### 0.1 VS Code Extensions to Install
- **Live Server** — right-click `index.html` → "Open with Live Server" (auto-reloads on save)
- **Prettier** — auto-formats code on save. Set `"editor.formatOnSave": true` in VS Code settings
- **CSS Peek** — Cmd/Ctrl+click a class name in HTML to jump straight to its CSS definition
- **GitLens** — see who changed what, useful for your own commit history review

### 0.2 Create the Folder Tree
Create every folder and every file in the structure above right now — even if they're blank.
Knowing where everything lives before you write a single line stops you from creating spaghetti later.

### 0.3 Add Google Fonts to Both HTML Files
Paste this into `<head>` of `index.html` AND `catalogue.html`, before any `<link>` to your CSS:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

### 0.4 GitHub Repository
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/aurore.git
git add .
git commit -m "chore: initial scaffold — empty file structure"
git push -u origin main
```

**Branch strategy — keep it simple for two pages:**
```
main    ← only complete, working code lives here
dev     ← your active working branch
```
Always code on `dev`. Merge to `main` only when a full page is finished and visually correct.
Never push broken code to `main`.

**✓ Checkpoint:** Open `index.html` with Live Server. You see a blank dark page — background `#0E0C0A`. Zero console errors.

---

## Phase 1 — Design Tokens + Base CSS
**Time:** ~3 hours | **Day:** 1–2

This is the single most important file you'll write. Everything inherits from it. Do not skip or rush it.

### Write `assets/css/base.css` in this exact order:

**Step 1 — CSS Custom Properties (Design Tokens)**

All colours, fonts, sizes, and timing come from here. Nothing hardcoded anywhere else.

```css
:root {
  /* Colors */
  --color-bg:           #0E0C0A;
  --color-surface:      #161310;
  --color-surface-2:    #1E1A16;
  --color-gold:         #C9A96E;
  --color-gold-light:   #E2C99A;
  --color-cream:        #F5EFE4;
  --color-muted:        #8A7D6E;
  --color-border:       #2A2420;

  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Jost', system-ui, sans-serif;

  /* Type Scale */
  --text-xs:    11px;
  --text-sm:    13px;
  --text-base:  15px;
  --text-lg:    18px;
  --text-xl:    24px;
  --text-2xl:   36px;
  --text-3xl:   clamp(36px, 5vw, 56px);
  --text-hero:  clamp(52px, 8vw, 96px);

  /* Spacing */
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  24px;
  --space-lg:  48px;
  --space-xl:  80px;
  --space-2xl: 120px;

  /* Layout */
  --max-width:    1400px;
  --page-padding: clamp(20px, 5vw, 80px);

  /* Transitions */
  --t-fast: 0.2s ease;
  --t-base: 0.35s ease;
  --t-slow: 0.65s ease;
}
```

**Step 2 — Reset**
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { background: var(--color-bg); color: var(--color-cream); font-family: var(--font-body); line-height: 1.6; }
img, video { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
input, select { font-family: inherit; }
```

**Step 3 — Typography Utility Classes**

Write one reusable class per text style. Use these as HTML classes instead of repeating style declarations.

```css
.font-display  { font-family: var(--font-display); }
.text-hero     { font-size: var(--text-hero); line-height: 1.05; font-weight: 300; font-style: italic; }
.text-3xl      { font-size: var(--text-3xl); line-height: 1.15; font-weight: 300; }
.text-2xl      { font-size: var(--text-2xl); font-weight: 300; }
.label         { font-size: var(--text-xs); letter-spacing: 0.15em; text-transform: uppercase; font-weight: 400; }
.body-lg       { font-size: var(--text-lg); font-weight: 300; line-height: 1.8; }
.body-base     { font-size: var(--text-base); font-weight: 300; line-height: 1.75; }
.body-sm       { font-size: var(--text-sm); font-weight: 300; line-height: 1.7; }
.text-gold     { color: var(--color-gold); }
.text-muted    { color: var(--color-muted); }
.text-cream    { color: var(--color-cream); }
```

**Step 4 — Layout Utilities**
```css
.container { max-width: var(--max-width); margin-inline: auto; padding-inline: var(--page-padding); }
.section   { padding-block: var(--space-2xl); }
.flex      { display: flex; }
.grid      { display: grid; }
```

**✓ Checkpoint:** Add `<div class="container" style="height:200px; border: 1px solid var(--color-gold)">` to `index.html`. Open in Live Server. Confirm it's centered with correct padding. Delete the test div.

---

## Phase 2 — Shared Components
**Time:** ~4 hours | **Day:** 2–3

Built once, used in both pages. Get these right before touching page layouts.

### 2.1 Navbar

**HTML structure** (paste into both `index.html` and `catalogue.html` at the very top of `<body>`):

```html
<nav class="navbar" id="navbar">
  <div class="navbar__left">
    <a href="#" class="navbar__link label">Rings</a>
    <a href="#" class="navbar__link label">Necklaces</a>
    <a href="#" class="navbar__link label">Earrings</a>
    <a href="catalogue.html" class="navbar__link label">Lumière</a>
  </div>
  <a href="index.html" class="navbar__logo font-display">AURORE</a>
  <div class="navbar__right">
    <button class="navbar__icon" aria-label="Search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    </button>
    <button class="navbar__icon" aria-label="Bag">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span class="navbar__count">0</span>
    </button>
    <button class="navbar__burger" id="navBurger" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
</nav>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-menu__close" id="menuClose">✕</button>
  <a href="#" class="font-display">Rings</a>
  <a href="#" class="font-display">Necklaces</a>
  <a href="#" class="font-display">Earrings</a>
  <a href="catalogue.html" class="font-display">Lumière</a>
</div>
```

**Key CSS rules in `navbar.css`:**
- `.navbar` → `position: fixed; top: 0; width: 100%; height: 72px; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding-inline: var(--page-padding); transition: background var(--t-slow), backdrop-filter var(--t-slow);`
- `.navbar--scrolled` → `background: rgba(14, 12, 10, 0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`
- Mobile: hide `.navbar__left` and show `.navbar__burger` below `1024px`

**JS in `navbar.js`:**
```javascript
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll-aware background
window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
});

// Mobile menu
document.getElementById('navBurger').addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('menuClose').addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
});
```

---

### 2.2 Footer

Write the footer HTML once. Copy it into both pages. Style in `footer.css`.

**Structure:**
- Three columns: Brand + newsletter subscribe | Collections links | Support links
- Below the 3 columns: massive ghost-text marquee spelling `AURORE — AURORE — AURORE —` in oversized near-invisible type
- Bottom bar: copyright line

The giant footer marquee is CSS-only (same `animation: marquee` as the hero strip but slow — 20s). Text colour is `var(--color-surface-2)` — barely visible, purely decorative.

---

### 2.3 Custom Cursor

**`cursor.js`** — only activates on devices with a precise pointer (mouse), not touch:

```javascript
if (window.matchMedia('(pointer: fine)').matches) {
  document.body.style.cursor = 'none';
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let cx = 0, cy = 0, mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  ;(function tick() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - 8}px, ${cy - 8}px)`;
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovered'));
  });
}
```

---

### 2.4 Scroll Reveal

**`scroll-reveal.js`** — add class `reveal` to any element you want to animate in on scroll. Use modifier classes for direction and delay:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**CSS in `animations.css`:**
```css
.reveal              { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.from-left    { transform: translateX(-40px); }
.reveal.from-right   { transform: translateX(40px); }
.reveal.delay-1      { transition-delay: 0.1s; }
.reveal.delay-2      { transition-delay: 0.2s; }
.reveal.delay-3      { transition-delay: 0.3s; }
.reveal.delay-4      { transition-delay: 0.4s; }
.reveal.delay-5      { transition-delay: 0.5s; }
.reveal.is-visible   { opacity: 1; transform: none; }
```

Usage in HTML: `<h2 class="reveal">` or `<div class="product-card reveal delay-2">`

**✓ Checkpoint:** Navbar scrolls correctly. Mobile menu opens/closes. Custom cursor follows mouse, expands on hover. A `.reveal` element animates in when you scroll past it.

---

## Phase 3 — Landing Page (`index.html`)
**Time:** ~2–3 days | **Day:** 3–6

Build sections strictly top-to-bottom. Complete each one before moving to the next.

---

### 3.1 Hero Section

Most complex section. Break into micro-steps:

**Step A — Two-column layout skeleton:**
```html
<section class="hero">
  <div class="hero__content">
    <span class="label text-gold reveal">The Collection</span>
    <h1 class="text-hero font-display reveal delay-1">
      Designed to be desired,<br>worn to be remembered.
    </h1>
    <p class="label text-muted reveal delay-2">Where dawn meets desire</p>
    <a href="catalogue.html" class="hero__cta label text-gold reveal delay-3">
      Browse Collections <span class="hero__arrow">↓</span>
    </a>
  </div>
  <div class="hero__stack" id="heroStack">
    <img src="assets/images/hero/hero-1.jpg" alt="" class="stack-img" data-rotate="-6deg" data-factor="-0.35">
    <img src="assets/images/hero/hero-2.jpg" alt="" class="stack-img" data-rotate="-3deg" data-factor="-0.2">
    <img src="assets/images/hero/hero-3.jpg" alt="" class="stack-img" data-rotate="0deg"  data-factor="0">
    <img src="assets/images/hero/hero-4.jpg" alt="" class="stack-img" data-rotate="3deg"  data-factor="0.2">
    <img src="assets/images/hero/hero-5.jpg" alt="" class="stack-img" data-rotate="6deg"  data-factor="0.35">
  </div>
  <div class="hero__glow"></div>
</section>
```

**Step B — CSS for the image stack** in `landing.css`:
- `.hero` → `min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; position: relative; overflow: hidden;`
- `.hero__stack` → `position: relative; height: 520px; width: 420px;`
- `.stack-img` → `position: absolute; width: 360px; height: 480px; object-fit: cover; border-radius: 12px; box-shadow: 0 24px 60px rgba(0,0,0,0.5); transition: transform 0.1s linear;`
- Each `.stack-img:nth-child(N)` gets its own `translateX()` offset from the `data-rotate` to pre-position

**Step C — Parallax JS** in `parallax.js`:
```javascript
const stackImgs = document.querySelectorAll('.stack-img');

function updateParallax() {
  const y = window.scrollY;
  stackImgs.forEach(img => {
    const factor = parseFloat(img.dataset.factor);
    const rotate = img.dataset.rotate;
    img.style.transform = `rotate(${rotate}) translateY(${y * factor}px)`;
  });
}

window.addEventListener('scroll', updateParallax, { passive: true });
```

**Step D — Hero arrow bounce:**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
.hero__arrow { display: inline-block; animation: bounce 1.5s ease-in-out infinite; }
```

**Step E — Background glow** via `::after` on `.hero`:
```css
.hero::after {
  content: '';
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(ellipse 800px 600px at 65% 50%, rgba(201, 169, 110, 0.07) 0%, transparent 70%);
}
```

---

### 3.2 Marquee Strip

Pure CSS. No JS.

```html
<div class="marquee">
  <div class="marquee__track" data-marquee>
    <span>AURORE JEWELLERY ✦ HANDCRAFTED LUXURY ✦ SINCE 2019 ✦ FREE WORLDWIDE SHIPPING ✦ &nbsp;&nbsp;</span>
    <span>AURORE JEWELLERY ✦ HANDCRAFTED LUXURY ✦ SINCE 2019 ✦ FREE WORLDWIDE SHIPPING ✦ &nbsp;&nbsp;</span>
  </div>
</div>
```

```css
.marquee { height: 48px; background: var(--color-gold); overflow: hidden; display: flex; align-items: center; }
.marquee__track { display: flex; white-space: nowrap; animation: marquee-scroll 30s linear infinite; }
.marquee__track span { color: #0E0C0A; font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: 0.15em; text-transform: uppercase; }

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

Pause-on-hover logic lives in `marquee.js` and applies to `[data-marquee]` elements.

---

### 3.3 Product Spotlight Grid

Three product cards. This is also the base card component used everywhere.

**Card HTML template:**
```html
<a href="#" class="product-card reveal delay-1" data-category="rings" data-price="3800" data-name="Golden Leaf Diamond Ring">
  <div class="product-card__img-wrap">
    <img src="assets/images/products/ring-1-a.jpg" alt="Golden Leaf Diamond Ring" class="img-primary" loading="lazy">
    <img src="assets/images/products/ring-1-b.jpg" alt="Golden Leaf Diamond Ring" class="img-secondary" loading="lazy">
    <span class="product-card__badge">Exclusive</span>
    <button class="product-card__add">Add to Bag</button>
  </div>
  <div class="product-card__info">
    <p class="product-card__name font-display">Golden Leaf Diamond Ring</p>
    <p class="product-card__price">$3,800.00</p>
  </div>
</a>
```

**CSS in `cards.css` (or inside `landing.css`):**
```css
.product-card { display: block; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden; transition: transform var(--t-base), border-color var(--t-base); }
.product-card:hover { transform: translateY(-6px); border-color: rgba(201, 169, 110, 0.25); }

/* Image swap */
.product-card__img-wrap { position: relative; aspect-ratio: 3 / 4; overflow: hidden; }
.product-card__img-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity var(--t-slow); }
.img-secondary { opacity: 0; }
.product-card:hover .img-primary  { opacity: 0; }
.product-card:hover .img-secondary { opacity: 1; }

/* Badge */
.product-card__badge { position: absolute; top: 16px; left: 16px; padding: 4px 12px; border-radius: 20px; font-size: var(--text-xs); letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-gold); background: rgba(201, 169, 110, 0.12); border: 1px solid rgba(201, 169, 110, 0.3); z-index: 2; }

/* Add to bag slide-up */
.product-card__add { position: absolute; bottom: 0; left: 0; width: 100%; height: 44px; background: var(--color-gold); color: #0E0C0A; font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: 0.15em; text-transform: uppercase; transform: translateY(100%); transition: transform var(--t-base); z-index: 3; }
.product-card:hover .product-card__add { transform: translateY(0); }

/* Info area */
.product-card__info { padding: 16px 20px 20px; }
.product-card__name { font-family: var(--font-display); font-size: 19px; font-weight: 400; color: var(--color-cream); margin-bottom: 6px; }
.product-card__price { font-size: var(--text-sm); color: var(--color-muted); font-weight: 300; }
```

---

### 3.4 Lumière Collection Feature

Two-column editorial layout. Left: text + CTA. Right: image with slight rotation.

```html
<section class="lumiere section">
  <div class="container">
    <div class="lumiere__inner">
      <div class="lumiere__text reveal from-left">
        <span class="label text-muted">2025</span>
        <span class="label text-gold" style="margin-top: 8px;">Lumière Collection</span>
        <h2 class="font-display text-3xl" style="margin-top: 20px;">A Symphony of<br><em>Golden Light</em></h2>
        <p class="body-base text-muted" style="margin-top: 24px; max-width: 440px;">Every piece in the Lumière Collection is a celebration of timeless artistry, blending exquisite materials with modern sophistication.</p>
        <a href="catalogue.html" class="lumiere__cta label text-gold" style="margin-top: 32px; display: inline-flex; align-items: center; gap: 8px;">Browse collection <span>→</span></a>
      </div>
      <div class="lumiere__image reveal from-right">
        <img src="assets/images/editorial/lumiere-cover.jpg" alt="Lumière Collection" loading="lazy">
      </div>
    </div>
  </div>
</section>
```

Key CSS: `.lumiere__image img` gets `transform: rotate(-1.5deg); border-radius: 8px; box-shadow: 0 40px 80px rgba(0,0,0,0.5);`

---

### 3.5 Membership Block (Aurore Circle)

Full-bleed photo with left gradient overlay. Text overlaid via absolute/flex positioning inside a `position: relative` container. No JS — pure CSS positioning.

---

### 3.6 Category Cards (2 cards: Rings, Necklaces)

Side by side, each 50% width. Each is an `<a>` tag:

```html
<div class="categories">
  <a href="catalogue.html?filter=rings" class="category-card">
    <img src="assets/images/editorial/rings-cover.jpg" alt="Rings Collection" loading="lazy">
    <div class="category-card__overlay"></div>
    <div class="category-card__text">
      <h3 class="font-display">Rings</h3>
      <p class="body-sm text-muted">Crafted to add sophistication to any look.</p>
      <span class="label text-gold" style="margin-top: 12px;">Browse collection →</span>
    </div>
  </a>
  <a href="catalogue.html?filter=necklaces" class="category-card">
    <!-- same structure -->
  </a>
</div>
```

Image zoom on hover: `.category-card { overflow: hidden; }` + `.category-card img { transition: transform 0.65s ease; }` + `.category-card:hover img { transform: scale(1.04); }`

---

### 3.7 Trending Auto-Scroll Track

Auto-scrolling horizontal strip of product cards. Duplicate the card list for seamless looping:

```html
<div class="trending-track" data-marquee>
  <!-- Card list repeated twice -->
  <div class="trending-track__inner">
    [6 product-card elements]
    [same 6 product-card elements again — exact copies]
  </div>
</div>
```

`.trending-track__inner` gets `animation: scroll-x 40s linear infinite`. On hover, `marquee.js` pauses it.

---

### 3.8 Benefits Grid (6 cards)

Static grid. No JS. 3×2 on desktop, 2×3 on tablet, 1 column on mobile.

Each benefit card: SVG icon (thin, 32px) + title + copy. Hover: border shifts to gold, card lifts 3px.

Benefits: Lifetime Warranty, Insured Shipping, Aurore Circle, Easy Returns, Sustainable Luxury, Free Gift Wrapping.

---

### 3.9 How to Purchase — 4 Steps

Flex row with large ghost step numbers behind each step title. Pure HTML + CSS, no JS.

Ghost number: `font-family: var(--font-display); font-size: 80px; color: var(--color-gold); opacity: 0.12; position: absolute; top: -20px; left: 0;`

---

### 3.10 Footer

Paste in the footer HTML written in Phase 2.

**✓ Checkpoint:** Full landing page renders. All sections visible. Hero parallax fans on scroll. Marquee loops. Cards hover correctly (image swap, button slides up). Scroll reveals fire. Mobile layout correct at 375px.

---

## Phase 4 — Catalogue Page (`catalogue.html`)
**Time:** ~2 days | **Day:** 6–8

Full design spec in PRD Section 6 (Catalogue Page). The page shares all Phase 2 components.

Link the same CSS files from Phase 2 (`base.css`, `navbar.css`, `footer.css`, `animations.css`) plus add `catalogue.css`. Link `navbar.js`, `cursor.js`, `scroll-reveal.js`, and `catalogue.js`.

---

### 4.1 Page HTML Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Collections — Aurore</title>
  <!-- Google Fonts -->
  <!-- CSS: base, navbar, footer, animations, catalogue -->
</head>
<body>
  <!-- Cursor div injected by cursor.js -->
  <!-- Navbar (copy from index.html) -->
  <!-- ─── CATALOGUE PAGE CONTENT ─── -->
  <!-- Footer (copy from index.html) -->
  <!-- JS files -->
</body>
</html>
```

---

### 4.2 Page Hero Banner

```html
<section class="cat-hero">
  <img src="assets/images/editorial/catalogue-hero.jpg" alt="" class="cat-hero__img">
  <div class="cat-hero__overlay"></div>
  <div class="cat-hero__content">
    <span class="label text-gold">Aurore</span>
    <h1 class="font-display">The Collection</h1>
    <p class="body-sm text-muted">Discover every piece, crafted to be remembered.</p>
  </div>
</section>
```

CSS: `.cat-hero` → `position: relative; height: 50vh; overflow: hidden;` | img → `object-fit: cover; width: 100%; height: 100%;` | overlay → `position: absolute; inset: 0; background: rgba(14,12,10,0.6);` | content → `position: absolute; bottom: 60px; left: var(--page-padding); text-align: left;`

---

### 4.3 Filter + Sort + Search Controls Bar

```html
<div class="cat-controls container" id="catControls">

  <!-- Filters -->
  <div class="cat-filters" role="group" aria-label="Filter by category">
    <button class="filter-btn is-active label" data-filter="all">All</button>
    <button class="filter-btn label" data-filter="rings">Rings</button>
    <button class="filter-btn label" data-filter="necklaces">Necklaces</button>
    <button class="filter-btn label" data-filter="earrings">Earrings</button>
    <button class="filter-btn label" data-filter="lumiere">Lumière</button>
  </div>

  <!-- Right side: search + sort + view toggle -->
  <div class="cat-controls__right">
    <div class="cat-search">
      <svg class="cat-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" id="catalogueSearch" placeholder="Search pieces…" autocomplete="off">
    </div>
    <select class="cat-sort label" id="catalogueSort">
      <option value="featured">Featured</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="newest">Newest</option>
    </select>
    <div class="cat-view-toggle">
      <button class="view-btn is-active" data-view="3" aria-label="3 column grid">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <rect x="0" y="0" width="5" height="5"/><rect x="6.5" y="0" width="5" height="5"/><rect x="13" y="0" width="5" height="5"/>
          <rect x="0" y="6.5" width="5" height="5"/><rect x="6.5" y="6.5" width="5" height="5"/><rect x="13" y="6.5" width="5" height="5"/>
          <rect x="0" y="13" width="5" height="5"/><rect x="6.5" y="13" width="5" height="5"/><rect x="13" y="13" width="5" height="5"/>
        </svg>
      </button>
      <button class="view-btn" data-view="2" aria-label="2 column grid">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <rect x="0" y="0" width="8" height="8"/><rect x="10" y="0" width="8" height="8"/>
          <rect x="0" y="10" width="8" height="8"/><rect x="10" y="10" width="8" height="8"/>
        </svg>
      </button>
    </div>
  </div>

</div>
```

**Controls CSS key rules in `catalogue.css`:**
```css
.cat-controls {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 16px; padding-block: 32px;
  border-bottom: 1px solid var(--color-border);
  position: sticky; top: 72px; /* stick below navbar */
  background: var(--color-bg); z-index: 100;
}
.cat-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 20px; border-radius: 2px;
  border: 1px solid var(--color-border);
  color: var(--color-muted); background: transparent;
  transition: border-color var(--t-fast), color var(--t-fast), background var(--t-fast);
}
.filter-btn:hover  { color: var(--color-cream); border-color: var(--color-muted); }
.filter-btn.is-active { color: #0E0C0A; background: var(--color-gold); border-color: var(--color-gold); }

.cat-controls__right { display: flex; align-items: center; gap: 20px; }

.cat-search { position: relative; }
.cat-search__icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--color-muted); pointer-events: none; }
.cat-search input {
  background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: 2px; height: 40px; padding: 0 16px 0 40px;
  font-size: var(--text-sm); color: var(--color-cream); width: 220px;
  transition: border-color var(--t-fast);
}
.cat-search input:focus { outline: none; border-color: var(--color-gold); }
.cat-search input::placeholder { color: var(--color-muted); }

.cat-sort {
  background: var(--color-surface); border: 1px solid var(--color-border);
  color: var(--color-muted); height: 40px; padding: 0 16px;
  border-radius: 2px; font-size: var(--text-xs); letter-spacing: 0.1em; text-transform: uppercase;
  transition: border-color var(--t-fast);
}
.cat-sort:focus { outline: none; border-color: var(--color-gold); }

.cat-view-toggle { display: flex; gap: 6px; }
.view-btn { padding: 8px; color: var(--color-muted); border-radius: 2px; transition: color var(--t-fast); }
.view-btn.is-active { color: var(--color-gold); }
```

---

### 4.4 Results Count + Active Filter Tags

```html
<div class="cat-meta container">
  <p class="cat-meta__count body-sm text-muted"><span id="productCount">24</span> pieces</p>
  <div class="cat-meta__tags" id="activeTags">
    <!-- JS injects active filter tags here -->
  </div>
</div>
```

---

### 4.5 Product Grid

```html
<div class="cat-grid container" id="catalogueGrid">
  <!-- Repeat for each product (12–24 total) -->
  <a href="#" class="product-card reveal"
     data-category="rings"
     data-price="3800"
     data-name="Golden Leaf Diamond Ring"
     data-date="2025-01-15">
    <div class="product-card__img-wrap">
      <img src="assets/images/products/ring-1-a.jpg" alt="Golden Leaf Diamond Ring" loading="lazy" class="img-primary">
      <img src="assets/images/products/ring-1-b.jpg" alt="Golden Leaf Diamond Ring" loading="lazy" class="img-secondary">
      <span class="product-card__badge">Exclusive</span>
      <button class="product-card__add">Add to Bag</button>
    </div>
    <div class="product-card__info">
      <p class="product-card__name font-display">Golden Leaf Diamond Ring</p>
      <p class="product-card__price">$3,800.00</p>
    </div>
  </a>
  <!-- ... more cards -->
</div>
```

**Grid CSS:**
```css
.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  padding-block: var(--space-xl);
}
.cat-grid.view-2col { grid-template-columns: repeat(2, 1fr); }

@media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .cat-grid { grid-template-columns: 1fr; } }
```

---

### 4.6 Empty State

When no products match the search/filter:

```html
<div class="cat-empty" id="catEmpty" style="display:none;">
  <p class="font-display" style="font-size: 48px; opacity: 0.15;">✦</p>
  <p class="body-base text-muted" style="margin-top: 16px;">No pieces found. Try adjusting your filters.</p>
  <button class="label text-gold" id="resetFilters" style="margin-top: 20px;">Clear all filters</button>
</div>
```

---

### 4.7 Load More Button

Initially show 9 cards, rest have `class="is-hidden"` via JS on init. On click: reveal next 9.

```html
<div class="cat-load-more container" id="loadMoreWrap">
  <button class="btn-outline label" id="loadMoreBtn">Load More Pieces</button>
  <p class="body-sm text-muted" style="margin-top: 12px;"><span id="shownCount">9</span> of <span id="totalCount">24</span> pieces</p>
</div>
```

---

### 4.8 Full JS Logic — `catalogue.js`

```javascript
// ─── State ───────────────────────────────────
let activeFilter = 'all';
let activeSort   = 'featured';
let searchQuery  = '';
let shownCount   = 9;
const PAGE_SIZE  = 9;

// ─── DOM refs ────────────────────────────────
const grid        = document.getElementById('catalogueGrid');
const allCards    = Array.from(grid.querySelectorAll('.product-card'));
const countEl     = document.getElementById('productCount');
const shownEl     = document.getElementById('shownCount');
const totalEl     = document.getElementById('totalCount');
const emptyState  = document.getElementById('catEmpty');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreWrap = document.getElementById('loadMoreWrap');

// ─── Filter + Search ─────────────────────────
function getVisible() {
  return allCards.filter(card => {
    const matchCat    = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchSearch = card.dataset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
}

// ─── Sort ────────────────────────────────────
function sortCards(cards) {
  const sorted = [...cards];
  if (activeSort === 'price-asc')  sorted.sort((a, b) => +a.dataset.price - +b.dataset.price);
  if (activeSort === 'price-desc') sorted.sort((a, b) => +b.dataset.price - +a.dataset.price);
  if (activeSort === 'newest')     sorted.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
  return sorted;
}

// ─── Render ───────────────────────────────────
function render() {
  const visible = sortCards(getVisible());
  const total   = visible.length;

  // Hide all first
  allCards.forEach(c => {
    c.style.display = 'none';
    c.classList.remove('is-visible'); // reset scroll reveal
  });

  // Show up to shownCount
  const toShow = visible.slice(0, shownCount);
  toShow.forEach((card, i) => {
    card.style.display = 'block';
    // Stagger scroll reveal re-trigger
    setTimeout(() => card.classList.add('is-visible'), i * 60);
  });

  // Update counts
  countEl.textContent  = total;
  shownEl.textContent  = Math.min(shownCount, total);
  totalEl.textContent  = total;

  // Empty state
  emptyState.style.display = total === 0 ? 'flex' : 'none';

  // Load more visibility
  loadMoreWrap.style.display = shownCount >= total ? 'none' : 'flex';
}

// ─── Event Listeners ─────────────────────────
// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.is-active').classList.remove('is-active');
    btn.classList.add('is-active');
    activeFilter = btn.dataset.filter;
    shownCount = PAGE_SIZE;
    render();
  });
});

// Sort dropdown
document.getElementById('catalogueSort').addEventListener('change', e => {
  activeSort = e.target.value;
  render();
});

// Search input
document.getElementById('catalogueSearch').addEventListener('input', e => {
  searchQuery = e.target.value;
  shownCount = PAGE_SIZE;
  render();
});

// Load more
loadMoreBtn.addEventListener('click', () => {
  shownCount += PAGE_SIZE;
  render();
});

// View toggle (2-col vs 3-col)
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.view-btn.is-active').classList.remove('is-active');
    btn.classList.add('is-active');
    grid.classList.toggle('view-2col', btn.dataset.view === '2');
  });
});

// Reset filters (from empty state)
document.getElementById('resetFilters').addEventListener('click', () => {
  activeFilter = 'all';
  searchQuery  = '';
  shownCount   = PAGE_SIZE;
  document.querySelector('.filter-btn.is-active').classList.remove('is-active');
  document.querySelector('[data-filter="all"]').classList.add('is-active');
  document.getElementById('catalogueSearch').value = '';
  render();
});

// Handle ?filter=rings URL param (from category card links on landing page)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('filter')) {
  const f = urlParams.get('filter');
  activeFilter = f;
  const btn = document.querySelector(`[data-filter="${f}"]`);
  if (btn) {
    document.querySelector('.filter-btn.is-active').classList.remove('is-active');
    btn.classList.add('is-active');
  }
}

// ─── Init ────────────────────────────────────
render();
```

**✓ Checkpoint:** Catalogue page renders with all 12+ products. Filter buttons show/hide cards. Search filters in real time. Sort reorders cards. View toggle switches between 2-col and 3-col. Empty state appears when nothing matches. "Load More" appears when there are more than 9 results. Category card links from landing page (e.g. `catalogue.html?filter=rings`) pre-filter the grid correctly.

---

## Phase 5 — Polish + Mobile Pass
**Time:** ~2 days | **Day:** 8–10

Do this ONLY after both pages are functionally complete. Resist the temptation to polish while building.

### 5.1 Responsive Check — `animations.css` media queries

Test every section at these widths in Chrome DevTools Device Mode:
- `375px` — iPhone SE (the tightest constraint)
- `768px` — iPad
- `1024px` — laptop/small desktop
- `1440px` — standard desktop

**Specific things to verify:**
- Hero: text readable, image stack doesn't bleed off-screen, parallax disabled on mobile
- Catalogue controls bar: wraps gracefully, search input doesn't overflow
- Product grid: correct column count at every breakpoint
- Marquee: still scrolls on small screens, text not cut off
- Mobile nav: overlay opens/closes, links tappable, no horizontal scroll
- Footer: collapses to single column with correct spacing
- Trending scroll track: swipeable horizontally on touch

### 5.2 Performance Essentials
- `loading="lazy"` on every `<img>` except the very first hero image
- Add `width` and `height` attributes to all `<img>` tags to prevent layout shift (CLS)
- `<link rel="preload" as="image" href="assets/images/hero/hero-3.jpg">` in `<head>` for the center hero image (most prominent one)

### 5.3 Cross-Browser Check
Open in Firefox and Safari. Common issues:
- `backdrop-filter` on navbar: add `-webkit-backdrop-filter` alongside
- `aspect-ratio` on cards: supported in all modern browsers, fine
- CSS `gap` in flexbox: fine in all modern browsers
- Custom cursor: test and confirm it doesn't break anything in Safari

### 5.4 Accessibility Baseline
- Every `<img>` has meaningful `alt` text (or `alt=""` for decorative images)
- Every icon-only `<button>` has `aria-label`
- Keyboard focus visible: add in `base.css`:
  ```css
  :focus-visible { outline: 1.5px solid var(--color-gold); outline-offset: 3px; }
  ```
- Filter buttons have `role="group"` on parent
- Search input has `aria-label` or visible `<label>`

**✓ Checkpoint:** Both pages look correct on all screen sizes. Zero console errors. All hover effects, animations, and interactions working. Loaded in Firefox and Safari — no broken layouts.

---

## Phase 6 — GitHub → Shopify
**Time:** ~3 days | **Day:** 10–13

Only start when Phase 5 checkpoint is fully met.

### 6.1 Install Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
shopify auth login
```

### 6.2 Scaffold from Dawn
```bash
shopify theme init aurore-shopify --clone-url https://github.com/Shopify/dawn
cd aurore-shopify
```
Delete Dawn's CSS entirely. Copy all your CSS files into `assets/`. Copy all your JS into `assets/`.

### 6.3 Convert HTML → Liquid

**`layout/theme.liquid`** — Your HTML shell. Replace hardcoded content:
- `{{ page_title }}` in `<title>`
- `{{ content_for_header }}` inside `<head>` (required by Shopify)
- `{{ content_for_layout }}` where page body goes

**Sections** — Each section of the homepage becomes a `.liquid` file in `/sections/`.
At the bottom of each section file, add a `{% schema %}` block defining editable settings.

**Snippets** — The product card becomes `/snippets/product-card.liquid`, called with `{% render 'product-card', product: product %}`.

**Key Liquid for product cards:**
```liquid
<img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title }}">
{% if product.images.size > 1 %}
  <img src="{{ product.images[1] | image_url: width: 600 }}" alt="{{ product.title }}" class="img-secondary">
{% endif %}
{{ product.price | money }}
```

### 6.4 Add Products in Shopify Admin
- Products → Add product for each jewellery item
- Upload 2 images per product (1st = main display, 2nd = hover swap)
- Tags: `badge-new`, `badge-exclusive`, `badge-trending`
- Product type: `Rings` / `Necklaces` / `Earrings` (used by filter `data-category`)
- Create Collections in Shopify: Rings, Necklaces, Earrings, Lumière

### 6.5 Dev Preview + Push
```bash
# Live preview (watch mode)
shopify theme dev --store YOUR_STORE.myshopify.com

# Push final to Shopify
shopify theme push --store YOUR_STORE.myshopify.com
```
Then in Shopify Admin → Online Store → Themes → Publish.

---

## At-a-Glance Timeline

| Phase | What | Days |
|---|---|---|
| 0 | Setup — VS Code, folders, fonts, GitHub | 1 |
| 1 | base.css — tokens, reset, typography | 1 |
| 2 | Shared — navbar, footer, cursor, scroll-reveal | 1–2 |
| 3 | Landing page — all sections | 3 |
| 4 | Catalogue page — grid, filters, sort, search, load more | 2 |
| 5 | Polish — mobile, perf, cross-browser, a11y | 2 |
| 6 | Shopify — Liquid, products, push, publish | 3 |
| **Total** | | **~13 days** |

---

## Rules to Live By

**One file per concern.** Don't mix catalogue styles into `base.css`. Don't put landing-only JS in `navbar.js`. If you keep concerns separated now, debugging later is easy.

**Never hardcode a colour.** Always `var(--color-gold)`. Change one line, change everything.

**Finish before polishing.** Get the whole page built before going back to tweak spacing and shadows. Polish on an incomplete page is wasted time.

**Commit often, commit small.** `git commit -m "feat: product card hover image swap"` after every working feature. If you break something, you can always roll back.

**Don't touch Liquid until HTML is done.** Shopify adds complexity. Your HTML prototype must look perfect first.

---

*End of Plan — Aurore Jewellery v1.0*
