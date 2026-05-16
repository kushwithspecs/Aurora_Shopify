# Product Requirements Document
## Aurore Jewellery — Shopify Storefront
**Version:** 2.0 — Source-accurate rewrite  
**Reference:** Elara (elara.framer.website) — HTML source verified  
**Stack:** HTML / CSS / Vanilla JS → GitHub → Shopify Theme  
**Pages in scope:** Landing page (`index.html`) + Catalogue page (`catalogue.html`)

---

> **Critical correction from v1.0:** The original PRD described a dark-mode site with gold-on-black colours and Cormorant Garamond typography. The actual Elara source is a **light/white site** using **Switzer** as the primary typeface, with an enormous `200px` hero headline and a `position: sticky` scroll-layering technique for the hero — not a simple parallax. Everything below is verified directly from the HTML/CSS source.

---

## 1. Brand Identity

### Brand Name
**Aurore** *(French for "dawn" — the first light, the golden hour)*

### Tagline
*"Where dawn meets desire."*

### Brand Personality
Aurore is a luxury jewellery house for the modern woman who collects beauty intentionally. Clean, airy, editorial. The site feels like a high-fashion magazine spread — generous white space, oversized type, restrained colour. Confidence without ornamentation.

### Tone of Voice
- Poetic but never overwrought
- Confident, not arrogant
- Sparse copy — silence carries as much weight as words
- Every sentence earns its place

---

## 2. Visual Identity

### 2.1 Colour Palette (source-verified tokens)

```
/* Primary background — pure white */
--color-white:        #FFFFFF   /* page background, navbar bg, card bg */
--color-off-white:    #F5F5F5   /* card/benefit tile background */

/* Primary text — near-black */
--color-text-primary: #1C1C1C   /* rgb(28, 28, 28) — headlines, body, nav */
--color-text-secondary:#3B3B3B  /* rgb(59, 59, 59) — subheadings, body copy */
--color-text-muted:   #919191   /* rgb(145, 145, 145) — captions, metadata */
--color-text-dark:    #262626   /* rgb(38, 38, 38) — link underlines, dark accents */

/* Borders and dividers */
--color-border:       #CCCCCC   /* rgb(204, 204, 204) — nav underline, dividers */
--color-border-light: #E8E8E8   /* rgb(232, 232, 232) — subtle separators */
--color-border-faint: rgba(232, 232, 232, 0.5)

/* Dark sections (Eclipse/collection feature, video overlays) */
--color-black:        #000000
--color-black-overlay: rgba(0, 0, 0, 0.85) /* gradient end on dark feature sections */

/* Accent — no gold in the original. Black is the accent. */
```

**Design Rule:** The site is predominantly white (`#FFFFFF`). Product photography sits on white or near-white backgrounds and does all the visual work. The only "colour" is black text and dark section backgrounds. There is no gold colour system — black is the accent.

### 2.2 Typography (source-verified)

#### Primary Typeface — Switzer
**All text on the site uses Switzer.** This is a geometric sans-serif from Fontshare. It is NOT Cormorant Garamond, not Inter, not Jost.

Available from: `https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,900&display=swap`  
Or self-host via Fontshare embed.

**Weights used (confirmed from source):**
- `400` — body copy, nav links, captions
- `500` — logo, nav links, subheadings, UI labels (most common weight)
- `600` — section headings, card titles
- `700` — bold emphasis
- `900` — footer brand marquee, display accents

**Letter spacing:** `-0.02em` on headings, `-0.01em` on body — tight, editorial.

#### Type Scale (source-verified)

```
/* H1 — Hero headline */
desktop:   200px, weight 500, letter-spacing -0.04em, line-height 1.2em
tablet:    180px
mobile:    100px

/* H2 — Section headings */
desktop:   52px, weight 500, letter-spacing -0.02em, line-height 0.9em
tablet:    44px
mobile:    32px

/* H3 — Sub-section headings / dark section headings */
desktop:   42px, weight 500, letter-spacing -0.02em, line-height 1.2em
tablet:    32px
mobile:    20px

/* H5 — Collection card headings */
24px, weight 500, letter-spacing -0.02em, line-height 1.2em

/* Body — standard paragraph */
16px, weight 500, letter-spacing -0.02em, line-height 1.5em

/* Body small — captions, breadcrumbs */
14px, weight 500, letter-spacing -0.01em, line-height 1.5em

/* Body XS — metadata, labels, badges */
13px, weight 400, letter-spacing -0.01em, line-height 1.5em

/* Nav links */
16px, weight 500, letter-spacing -0.02em, NOT uppercase
```

**Critical detail:** Nav links are NOT uppercase. They are sentence-case at `16px` weight `500`. This is a common mistake — Elara's nav says "Rings", "Necklaces", "Bags", "Eclipse" in mixed case, not all-caps.

### 2.3 Spacing & Layout

```
Max content width:         1200px (from source: max-width 1200px on all containers)
Desktop page padding:      64px inline (padding: 16px 64px on nav; 64px on sections)
Tablet page padding:       28px inline
Mobile page padding:       28px inline
Section vertical spacing:  100vh for hero, then standard section rhythm ~64–100px
Grid gap:                  24px standard
```

### 2.4 Border Radius

```
Cards (collection/benefit): border-radius: 6px
Images in stack:            border-radius: 12px
Buttons (CTA):              border-radius: 0 (square) — see source, no border-radius on CTAs
```

### 2.5 Iconography
- Search icon: magnifying glass SVG (Phosphor style, filled path, NOT line icon)
  - Source uses: `<path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" fill="currentColor">`
- Hamburger: 3 lines
- Arrow for CTA links: thin diagonal arrow `↗` or inline animated underline (no filled arrow icons)

---

## 3. Site Architecture

```
Home (/)
├── /collections/rings
├── /collections/necklaces
├── /collections/earrings       ← adapted from "Bags" in Elara
└── /collections/lumiere        ← flagship (equiv. of "Eclipse")
├── /lumiere                    ← editorial standalone
├── /aurore-circle              ← membership (equiv. "Elara Club")
├── /stories
├── /contact
├── /privacy-policy
└── /terms-and-conditions
```

---

## 4. Navigation

### 4.1 Desktop Navbar (source-verified)

```
Layout:  [ Logo + wordmark LEFT ] ......... [ Links RIGHT ] [ Search icon ]
```

- **Position:** Fixed, top of viewport, `z-index: 10`
- **Height:** Approx `63px` (padding `16px 64px` on content row, logo is `31px` tall)
- **Background:** `rgb(255, 255, 255)` — always white, no scroll-based transparency
- **Bottom border:** `1px solid rgb(204, 204, 204)` — thin grey line always visible
- **Logo:** SVG icon (small geometric mark) + wordmark `"Aurore"` — `Switzer` weight `600`, `16px`, color `#1C1C1C`
- **Nav links RIGHT side:** `Rings` | `Necklaces` | `Earrings` | `Lumière` — `Switzer` `16px` weight `500`, color `#1C1C1C`
- **Search icon:** Magnifying glass SVG, `24×24px`, `color: #1C1C1C`, rightmost
- **Link hover:** No colour change — the source uses an underline animation. On hover, a `1px` underline bar at the bottom of the text animates from `width: 0%` to `width: 100%`, `transition: 0.3s`
- **No bag icon in navbar** — Elara has no cart icon in the nav. Aurore should add one, styled to match.

### 4.2 Mobile Navbar

- Logo left, search icon + hamburger icon right
- Hamburger opens a full-screen white overlay (`position: fixed`, `background: #FFFFFF`, `z-index: 10`)
- Links stacked vertically in the overlay, `Switzer` `24px` weight `500`, left-aligned with `28px` padding
- Close button top-right corner
- Below links in overlay: dividers (`1px solid #CCCCCC`)

---

## 5. Homepage — Section Breakdown

### Section 1 — Hero (The Signature)

This is the most complex and important section. The mechanism is a **scroll-pinned sticky layering system**, NOT a simple parallax.

#### How It Actually Works (source-verified):

The hero section (`framer-118tpo1`) is a normal flow container. Inside it are multiple children, each `height: 100vh`, stacked vertically. As you scroll, the **first child** (`.framer-1ck0n50`) is `position: sticky; top: 0` — it pins to the top while the subsequent scroll sections (`framer-1u7kvdf`, `framer-1pp1dcy`, `framer-pjjapr`, `framer-11b09oa`) pass over it at `z-index: 2`. The hero headline (`framer-112t6mi`) is inside the sticky element but `position: absolute; top: 50%; left: 1260px` (off-screen right on desktop) and uses `mix-blend-mode: difference` so it appears white-on-dark when overlaid on dark scroll sections.

```html
<!-- Simplified structure -->
<section class="hero-main">

  <!-- This element pins while you scroll through the others -->
  <div class="hero-sticky" style="position: sticky; top: 0; height: 100vh; z-index: 1;">
    <!-- Image stack — 5 images, stacked via absolute positioning + z-index layers -->
    <!-- Headline — position: absolute, mix-blend-mode: difference -->
    <!-- "Where Luxury Finds Its True Form" subheading — also mix-blend-mode: difference -->
  </div>

  <!-- These 4 sections scroll OVER the sticky hero, each 100vh -->
  <!-- They contain the product scroll images, section headings, etc. -->
  <!-- z-index: 2 so they cover the pinned layer -->
  <div class="scroll-section-1" style="height: 100vh; position: relative; z-index: 2;">...</div>
  <div class="scroll-section-2" style="height: 100vh; position: relative; z-index: 2; opacity: 0.4;">...</div>
  <div class="scroll-section-3" style="height: 200vh; position: relative; z-index: 2; opacity: 0.4;">...</div>
  <div class="scroll-section-4" style="height: 100vh; position: relative; z-index: 2;">...</div>

</section>
```

#### The Image Stack (source-verified dimensions + transforms):

The image stack container (`framer-91klx7-container`): `width: 300px; height: 400px`, centered in the hero.

On desktop the stack starts as `transform: perspective(1200px) scale(0.5)` — it begins small and scales up as you scroll (Framer animates this). For our vanilla JS implementation, we animate `scale` from `0.5` to `1` as the user scrolls.

5 images inside, each `width: 100%; height: 100%` of the container (so `300×400px`), positioned absolutely, each at a different `z-index` layer (z 1–5):

```
Image 1 (bottom, z-index: 1):  position: absolute; left: 0; top: 0
Image 2           (z-index: 2):  position: absolute; left: 0; top: 0
Image 3 (center,  z-index: 5):  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%)
Image 4           (z-index: 2):  position: absolute; left: 0; top: 0
Image 5 (top,     z-index: 4):  position: absolute; left: 0; top: 0
```

All image wrappers have: `border-radius: 12px; overflow: hidden; transform: perspective(1200px)`

Framer animates each layer's `opacity` from `0` to `1` sequentially on scroll (they fade in one by one as the user scrolls). Our implementation: use `IntersectionObserver` + staggered CSS transitions to replicate this.

#### The Hero Headline (source-verified):

```css
position: absolute;
top: 50%;
left: 1260px;  /* off-screen right on desktop — it scrolls INTO view */
transform: translateY(-50%);
mix-blend-mode: difference;
white-space: pre;
```

Text: `"Designed to be admired, crafted to be remembered."` (single line, white due to mix-blend-mode)

For Aurore: `"Designed to be desired, worn to be remembered."`

Font: `Switzer` `200px` weight `500`, letter-spacing `-0.04em`, color `#FFFFFF` (appears white via mix-blend-mode against white bg = invisible, appears white against dark sections = visible — this is the trick). Line-height `1.2em`.

**Simplified implementation for Aurore** (since we can't replicate Framer's exact animation engine):
- Hero H1 is centered in the viewport, `clamp(80px, 15vw, 200px)` font size
- Color: `#1C1C1C` (visible on white bg)
- No mix-blend-mode (use a simpler but equally dramatic approach)
- The headline animates in on page load: each letter has `opacity: 0; filter: blur(10px); transform: translateY(10px)` — they animate in character by character with staggered delays (this IS in the Elara source code — the HTML shows individual `<span>` per letter with `display:inline-block` and blur/transform values)

#### Letter-by-Letter Headline Animation (source-verified):

The Elara source splits the headline into individual characters, each wrapped in a `<span>`:
```css
span {
  display: inline-block;
  opacity: 0.001;
  filter: blur(10px);
  transform: translateX(0px) translateY(10px) scale(1) rotate(0deg);
}
```
Each character animates to `opacity: 1; filter: blur(0); transform: translateY(0)` with a small stagger delay per character. Implement this in JS by splitting the headline text, wrapping each character, then triggering the animation on page load.

#### Floating Background Product Images (source-verified):

4 small product images scattered around the hero background (positioned absolutely within the full-viewport hero area):

```
Image A: 76×76px, left: 75%, top: 41%, transform: translate(-50%,-50%) rotate(19deg), filter: blur(2px)
Image B: 107×85px, left: 22%, top: 82%, filter: blur(2px)
Image C: 180×159px, left: 59%, top: 97%, transform: translate(-50%,-50%) rotate(-18deg)
Image D: 180×159px, left: 34%, top: 14%, transform: translate(-50%,-50%) rotate(-18deg)
```

These are blurred product shots (blur: `2px` on A and B, `0px` on C and D). They sit in the very first layer of the hero (the `framer-evfo14` absolute container).

---

### Section 2 — Eclipse/Lumière Collection Feature

This is the first scroll section that passes over the sticky hero (`z-index: 2`). It is a full-`100vh` section.

#### Layout:
```
[ LEFT column — 50% ]          [ RIGHT column — 50% ]
  Text content:                  Vertical image stack:
  - Small label "2025"           - 3 stacked product images
  - H2: "Eclipse Collection"       at 350×500px each
  - Subheading                     (Framer animates entry)
  - Body copy
  - "Browse collection →" link
```

The right column contains 3 vertical product cards (`framer-2lfcs8-container`): `width: 350px; height: 500px`. Each shows a product image with `overflow: hidden`.

The left text column (`framer-1evcxlc`): `height: 500px`, content aligned to `flex-end` (bottom).

Padding around the whole section: `64px` on desktop.

**For Aurore:** Replace "Eclipse Collection 2025" with "Lumière Collection 2025", same layout.

#### Text styles:
- Small label: `Switzer` `13px` weight `400`, `rgb(59,59,59)`, `letter-spacing: -0.01em` — just the year "2025"
- H2: `Switzer` `52px` weight `500` (or `400` — two variants in source), `letter-spacing: -0.02em`, `line-height: 0.9em`, `rgb(28,28,28)`
- Body: `Switzer` `14px` weight `400`, `rgb(59,59,59)`, `line-height: 1.5em`, `max-width: 500px`
- CTA link: `Switzer` `14px` weight `400`, underline on hover (animated width from `0%` to `100%`)

---

### Section 3 — Elara/Aurore Club Membership

Full `100vh` section with a large lifestyle photo, dark gradient overlay, and text bottom-left.

#### Layout:
The section is `height: 100vh; overflow: hidden; position: relative`. Inside:
- Full-bleed background image (`object-fit: cover; width: 100%; height: 100%`)
- Gradient overlay: `background: linear-gradient(180deg, transparent 22%, #000000)` — `position: absolute; inset: 0`
- Text block sits at the bottom-left (`padding: 64px`):
  - H3: `"Aurore Circle: The Pinnacle of Luxury"` — `Switzer` `42px` weight `500`, `letter-spacing: -0.02em`, `line-height: 1.2em`, `color: #FFFFFF`
  - Body: `Switzer` `14px` weight `400`, `rgb(255,255,255)` at `opacity: 0.8`, `max-width: 500px`, `line-height: 1.5em`
  - CTA link: `"Discover →"` — `Switzer` `14px` weight `400`, `color: white`, underline animation on hover

---

### Section 4 — Collection Category Cards (Rings + Necklaces)

Two full-height image cards side by side, each `50%` width, `height: 650px`.

Each card:
- Background: full-bleed product editorial image
- Dark gradient overlay: `linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.85))` covering bottom 45%
- Text at bottom-left inside card (`padding: 64px`):
  - H2: `"Rings"` / `"Necklaces"` — `Switzer` `52px` weight `400` or `500`, `color: #FFFFFF`, `letter-spacing: -0.02em`
  - Descriptor: `Switzer` `14px`, `white`, `opacity: 0.8`, `max-width: 280px`
  - CTA: `"Browse collection →"` — `Switzer` `14px`, `white`, underline animation

**Hover effect:** Image scales `scale(1.03)` inside `overflow: hidden` card, `transition: 0.5s ease`.

---

### Section 5 — Trending Products — Horizontal Auto-Scroll

Section with heading block then a horizontal scrolling product track.

#### Section header:
```
[ Left: H2 "Trending" + subtext ]     [ Right: "Browse collection →" link ]
```
All within `max-width: 1200px; padding: 48px 48px 0`.

H2: `Switzer` `52px` weight `500`, `letter-spacing: -0.02em`, `line-height: 0.9em`.  
Subtext: `Switzer` `14px`, `rgb(59,59,59)`.

#### Scroll track:
- Container: `overflow: hidden` with inner track `display: flex; gap: 8px`
- CSS `animation: scroll-x` — `linear infinite`, direction left
- Content duplicated (2× list) for seamless loop
- **On hover:** `animation-play-state: paused`
- Each card: `width: 250px`

#### Product Card (source-verified from `framer-eCnR7`):

```
Card container:   width: 250px; overflow: hidden; cursor: pointer
Image area:       height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #F5F5F5
  Primary image:  150×150px (square) — centred in the card image area
  Secondary img:  150×150px — position: absolute; left: 50%; top: 50%; z-index: 1
                  (second image overlaps the first — hover swaps between them)
Info area below:  padding: 0 (flush under the image)
  Product name:   Switzer 14px weight 400, rgb(59,59,59), line-height 1.5em
  (no price shown in the trending track in source)
```

**Critical:** The product card image area uses a `150×150px` square product shot on a `#F5F5F5` background — NOT a full bleed image. The product floats centred against the light grey card. The card background is the grey, not the image. This is distinctive.

**Badge:** If the product has a badge (e.g. "Exclusive"), it appears as a small text label above or beside the product name, `Switzer` `13px` weight `400`, `rgb(59,59,59)`.

**Image swap on hover:** Primary image `opacity` goes to `0`, secondary comes to `opacity: 1`. Both `transition: opacity 0.4s ease`.

**No "Add to Bag" button on the trending track cards.** That button only appears on the full grid cards in the collection pages.

---

### Section 6 — What's New (Video Feature)

Full-width video section, `height: 100vh`, `overflow: hidden`.

```
[ Video — autoplay, muted, loop, playsinline — object-fit: cover, full bleed ]
[ Gradient overlay: linear-gradient(180deg, transparent 22%, #000000) ]
[ Text overlay — bottom-left, padding: 64px ]
  Section label: small text — "WHAT'S NEW" or year
  H2: "Aurore Prestige 2025"
  Body: event description
  [ Discover → ] link
```

Text colors: all `#FFFFFF` on dark overlay.

---

### Section 7 — Benefits Grid

Section heading block, then a row of 6 benefit items.

#### Heading:
`Switzer` `52px` weight `500`, `letter-spacing: -0.02em` — `"Your benefits"`

#### Benefits row — 3 items on desktop (or 6 in two rows):

Source layout (`framer-tznxco`): `display: flex; flex-direction: row; gap: 8px; padding: 8px 0`. Items separated by `1px` vertical dividers (`background: #CCCCCC; width: 1px`).

Each benefit item (`framer-GpuiT` pattern):
- Icon: SVG `32×32px` — circular icon badge  
- Benefit title: `Switzer` weight varies, `rgb(28,28,28)`
- Benefit copy: `Switzer` `14px`, `rgb(59,59,59)`

**Benefits (from source):**
1. Lifetime Warranty
2. Insured Shipping
3. VIP Loyalty Program
4. Easy Return or Exchange
5. Sustainable Luxury
6. Free Gift Wrapping

The 6 items are split across **two rows** with the row layout: first row has 4 items separated by `|` dividers, second row has 4 items (some overlap in the source — verify on live site). On mobile they stack vertically.

---

### Section 8 — How to Purchase (4 Steps)

Horizontal 4-step process. Each step is a column in a `display: flex` row.

Desktop: steps in a row `width: 861px`, each step takes `flex: 1`.  
Mobile: columns → rows, stacked vertically with `gap: 6px` between each.

Each step:
- Icon circle: `32×32px` (`background: #1C1C1C` circle), centered above text
- Step label: `Switzer` `14px`, `rgb(59,59,59)`
- Step description: `Switzer` `14px`, `rgb(59,59,59)`

Steps: 1 Get in Touch → 2 Consultation → 3 Confirmation → 4 Delivery

---

### Section 9 — Footer

```
┌─────────────────────────────────────────────────────────────────┐
│  [ Logo + tagline ]    [ Company links ]    [ Collection links ]  │
│  [ Support links ]                                               │
│                                                                   │
│  Newsletter:  [ Email input _____________ ] [ Subscribe button ]  │
│                                                                   │
│  © Copyright line                                                 │
│                                                                   │
│  ══════════════════════════════════════════════════════════════   │
│  AURORE — AURORE — AURORE — (giant scrolling text, barely visible)│
└─────────────────────────────────────────────────────────────────┘
```

**Footer details (source-verified from `framer-OZ3H5`):**
- Outer padding: `64px 64px 200px` desktop (the `200px` bottom pad is what creates space for the big footer marquee)
- Logo section: same SVG + wordmark as navbar
- Tagline: `"Where Luxury Finds Its True Form"` — `Switzer` `14px`, `rgb(59,59,59)`
- 3 link columns: Company / Collections / Support — `Switzer` `14px` weight `400`
- Newsletter: Email input (`Switzer` `14px` weight `400`, height `38px`, no border visible in default state) + "Subscribe" button
- Subscribe button: styled pill button — `Switzer`, `#1C1C1C` background, `#FFFFFF` text

**Footer Brand Marquee** (source-verified from `framer-qpSW1`):
- `position: absolute; bottom: -60px` on desktop (pulls below content)
- `mix-blend-mode: difference` — appears very faintly on white bg
- Text: `"AURORE — AURORE — AURORE —"` repeated continuously
- Font: `Switzer` `200px` weight `500`, `letter-spacing: -0.04em`, `color: #FFFFFF` (invisible on white, ghost effect)
- CSS `animation: marquee-scroll 20s linear infinite`
- On mobile: `bottom: -30px`

---

## 6. Catalogue Page (`catalogue.html`)

Full design detailed below. Shares navbar and footer from the landing page.

### 6.1 Page Hero Banner

Full-width editorial image, `height: 50vh`, `object-fit: cover`.

Dark gradient overlay: `linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.85))`

Text at bottom-left (`padding: 28px 64px`):
- Category tag: `Switzer` `13px` weight `400`, `#FFFFFF`, opacity `0.8`
- H2 headline: `Switzer` `clamp(32px, 5vw, 52px)` weight `500`, `#FFFFFF`, `letter-spacing: -0.02em`
- Short descriptor: `Switzer` `14px`, `#FFFFFF`, opacity `0.8`, `max-width: 500px`

### 6.2 Controls Bar (Sticky below navbar)

`position: sticky; top: 63px` (navbar height); `background: #FFFFFF; border-bottom: 1px solid #CCCCCC; z-index: 100`

```
[ All ] [ Rings ] [ Necklaces ] [ Earrings ] [ Lumière ]    [ 🔍 Search… ] [ Sort ▾ ] [ ⊞ ] [ ⊟ ]
```

**Filter buttons:**
- `Switzer` `16px` weight `500`, NOT uppercase
- Default: `color: #3B3B3B`, no border, no bg
- Active: underline bar `1px` solid `#1C1C1C` below the text (same underline hover pattern as nav)
- Hover: underline animates in

**Search input:**
- `background: transparent` or very light, `border-bottom: 1px solid #CCCCCC` (bottom only, open style)
- `Switzer` `14px` weight `400`, placeholder `color: #919191`
- Focus: border-bottom becomes `#1C1C1C`

**Sort dropdown:**
- Open/minimal style — `Switzer` `14px`, `color: #3B3B3B`

**View toggle:**
- Two icon buttons (3-col grid / 2-col grid)
- Active: `color: #1C1C1C`; Inactive: `color: #919191`

### 6.3 Results Meta

`Switzer` `13px` weight `400`, `color: #919191` — e.g. `"24 pieces"`

### 6.4 Product Grid

Desktop: `grid-template-columns: repeat(3, 1fr)`; Tablet: `repeat(2, 1fr)`; Mobile: `1fr`  
Gap: `8px` (source uses tighter `8px` gap, not `24px`)

**Individual Product Card (source-verified from `framer-eCnR7`):**

```
┌───────────────────────────────┐
│                               │
│   [ Grey area — #F5F5F5 ]     │ ← height: 300px, bg: #F5F5F5
│                               │
│      [ Product image ]        │ ← 150×150px, centred, floating
│      [ 150×150px square ]     │
│                               │
│   [ Optional badge overlay ]  │ ← top-left corner text label
│                               │
└───────────────────────────────┘
│  Product Name                 │ ← Switzer 13px weight 400, #3B3B3B
│  $3,800.00                    │ ← Switzer 13px weight 400, #3B3B3B (same style)
└───────────────────────────────┘
```

**Card behaviour:**
- Container: `width: 250px` (fixed in scroll track) or `100%` (in grid)
- No border, no box-shadow on card — just the `#F5F5F5` background creates separation from the white page
- `cursor: pointer`, `text-decoration: none` (entire card is an anchor)
- **Hover:** The secondary image (150×150px, `position: absolute; left: 50%; top: 50%; z-index: 1`) fades in via `opacity: 0 → 1`. Primary image fades out. `transition: opacity 0.4s ease`
- **No "Add to Bag" button** on grid cards in the original Elara — the site uses a consultation model. For Aurore/Shopify: add a subtle "Add to Bag" button that slides up on hover (our addition, not in original)
- **Badge:** If product has a badge (`"Exclusive"`, `"Trending"`, `"New"`), it appears as plain text `Switzer` `13px` `#919191` above the product name in the info section — NOT a pill or badge component (the original is minimal text labels)

### 6.5 Complete Product Catalogue

**Rings (8 pieces)**

| Name | Price | Badge |
|---|---|---|
| Golden Leaf Diamond Ring | $3,800 | Exclusive |
| Modern Geometric Diamond Eternity Ring | $3,900 | — |
| Golden Panther Statement Ring | $3,200 | — |
| Crackle Diamond Ring | $2,500 | Trending |
| Crimson Circle Ruby Eternity Band | $1,250 | — |
| Purple Pearl Engraving | $1,520 | New |
| Radiant Ruby Baguette Eternity Ring | $2,200 | — |
| Two-Tone Diamond Eternity Band | $1,850 | — |

**Necklaces (6 pieces)**

| Name | Price | Badge |
|---|---|---|
| Fiorever Ruby Diamond Necklace | $4,200 | Exclusive |
| Gemstone Fan Statement Necklace | $2,800 | Trending |
| Golden Cascade Layered Necklace | $1,900 | New |
| Pearl & Diamond Choker | $3,100 | — |
| Serpent Chain Pendant | $2,400 | — |
| Lunar Arc Gold Necklace | $1,650 | — |

**Earrings (6 pieces)**

| Name | Price | Badge |
|---|---|---|
| Diamond Stud Pavé Earrings | $2,200 | Exclusive |
| Ruby Drop Chandelier Earrings | $3,500 | — |
| Gold Leaf Hoop Earrings | $1,400 | New |
| Twisted Cable Stud Earrings | $980 | — |
| Pearl Teardrop Earrings | $1,750 | Trending |
| Geometric Moissanite Drops | $1,600 | — |

**Lumière Collection (4 pieces)**

| Name | Price | Badge |
|---|---|---|
| Lumière Solitaire Diamond Ring | $6,800 | Exclusive |
| Lumière Constellation Necklace | $5,400 | Exclusive |
| Lumière Eclipse Bangle | $4,900 | Exclusive |
| Lumière Crescent Earrings | $3,800 | Exclusive |

### 6.6 Empty State

Centred in grid area:
- Symbol: `✦` in `Switzer` `52px`, `color: #CCCCCC`
- Copy: `"No pieces found."` — `Switzer` `24px` weight `500`, `#1C1C1C`
- Sub-copy: `Switzer` `14px`, `#919191`
- `"Clear all filters"` link: underline style

### 6.7 Load More Button

Initially show 9 cards. Remaining hidden.

Button: square (no border-radius), `border: 1px solid #1C1C1C`, `background: transparent`, `color: #1C1C1C`, `Switzer` `16px` weight `500`, `padding: 14px 48px`

Hover: `background: #1C1C1C; color: #FFFFFF`, `transition: 0.2s`

Progress text: `"9 of 24 pieces"` — `Switzer` `13px`, `#919191`

### 6.8 URL Filter Handoff

Category card links from landing: `catalogue.html?filter=rings`  
On page load, JS reads `URLSearchParams` and pre-activates the matching filter.

---

## 7. Scroll Animations — Global Rules

### 7.1 Headline Letter Animation (source-verified)

The Elara source splits headlines into individual letter `<span>` elements. Starting state:
```css
span {
  display: inline-block;
  opacity: 0.001;
  filter: blur(10px);
  transform: translateX(0px) translateY(10px) scale(1);
}
```
Animate to: `opacity: 1; filter: blur(0); transform: translateY(0)` — staggered by `30–50ms` per character.

Apply to: hero H1 (on page load), section H2 headings (on scroll into view via IntersectionObserver).

### 7.2 Section Animations (IntersectionObserver, `threshold: 0.12`)

| Element | Animation |
|---|---|
| Section headings | Letter-by-letter blur + translateY, stagger 40ms/char |
| Body copy | `translateY(20px) → 0` + `opacity 0→1`, duration `0.6s`, delay `0.2s` |
| Product cards (grid) | Staggered `translateY(30px) → 0` + `opacity 0→1`, each card `index × 80ms` |
| Editorial images | `translateX(40px) → 0` + `opacity 0→1`, duration `0.7s` |
| Benefit items | Staggered fade-up, `index × 60ms` |
| Process steps | Staggered fade-up |

**Rule:** Nothing animates on page load except the hero headline.

### 7.3 Hero Load Sequence

1. `t=0ms` — Page loads, navbar fades in
2. `t=100ms` — Floating background images appear, `opacity 0→1` staggered
3. `t=200ms` — Image stack fades in (`opacity 0→1`, `0.6s`), scale animates `0.5→1`
4. `t=400ms` — Headline character animation triggers (letter by letter, `40ms` stagger)
5. `t=800ms` — Subheading fades in

---

## 8. Micro-interactions

| Trigger | Effect |
|---|---|
| Nav link hover | Underline bar animates from `width: 0` to `width: 100%`, `0.3s ease` |
| Card hover | Image cross-fade (primary out, secondary in), `0.4s ease` |
| Category card hover | Image `scale(1.03)`, `0.5s ease`, `overflow: hidden` on card |
| CTA "Browse collection →" hover | Same underline animation as nav |
| Subscribe input focus | Bottom border becomes `#1C1C1C`, `0.2s` |
| Filter button active | Underline appears beneath text |
| Load More hover | Fill: `background: #1C1C1C; color: #FFFFFF`, `0.2s` |
| Trending scroll track hover | `animation-play-state: paused` |
| Footer brand marquee | Continuous, no pause |

---

## 9. Responsive Breakpoints (source-verified)

```
Desktop:  min-width: 1200px   (Framer hash: 72rtr7)
Tablet:   810px – 1199px      (Framer hash: 16yi8t4)
Mobile:   max-width: 809px    (Framer hash: 8hcghn)
```

| Section | Tablet | Mobile |
|---|---|---|
| Hero H1 | 180px | 100px |
| H2 sections | 44px | 32px |
| H3 dark sections | 32px | 20px |
| Page padding | 28px | 28px |
| Image stack | 300×350px | 250×350px |
| Floating hero images | Scaled down | Further scaled |
| Lumière/Club layout | 2-col maintained | Stack vertical |
| Category cards | 2-col maintained | Stack vertical |
| Trending track | Horizontal scroll maintained | Horizontal scroll |
| Benefits | Row maintained | Stack vertical, each item row |
| Process steps | Row maintained | Stack vertical |
| Footer | 3-col → 1-col | 1-col |
| Footer brand marquee | bottom: -60px | bottom: -30px |
| Catalogue grid | 2-col | 1-col |
| Controls bar | Wrap gracefully | Filters scroll-x |

---

## 10. Performance

- All images: `loading="lazy"` except first hero image (above fold)
- First hero image: `<link rel="preload" as="image">` in `<head>`
- Video: `autoplay muted loop playsinline`, `preload="metadata"` desktop, `preload="none"` mobile
- Font: `font-display: swap` on all Switzer weights
- Image hover swap: preload secondary image on card mount via `new Image().src = url`
- Hero image stack: `will-change: transform` on the scale-animating container only
- CSS animations: `will-change: transform` ONLY on actively animated elements

---

## 11. Shopify Integration Notes

- Product cards pull from `product.title`, `product.price | money`, `product.featured_image | image_url: width: 600`, `product.images[1] | image_url: width: 600`
- Badges driven by Shopify product tags: `badge-exclusive`, `badge-new`, `badge-trending`
- AJAX cart: `POST /cart/add.js` — no page reload on Add to Bag
- Collection pages use Liquid `for product in collection.products`
- Filter category = Shopify `product.type` (set as "Rings", "Necklaces", "Earrings")
- Marquee copy editable via `settings_schema.json`
- Newsletter: Shopify built-in Customer API or Klaviyo

---

## 12. File Structure

```
aurore-theme/
├── assets/
│   ├── css/
│   │   ├── base.css            ← tokens, reset, typography
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── landing.css
│   │   ├── catalogue.css
│   │   └── animations.css
│   ├── js/
│   │   ├── navbar.js
│   │   ├── hero.js             ← sticky layering + image stack scale + letter animation
│   │   ├── scroll-reveal.js    ← IntersectionObserver + letter-by-letter triggers
│   │   ├── marquee.js          ← pause-on-hover
│   │   ├── catalogue.js        ← filter / sort / search / load-more / url params
│   │   └── cart.js             ← AJAX cart (Shopify)
│   └── images/
│       ├── logo.svg
│       ├── hero/               ← 5 stack images + 4 floating bg images
│       ├── products/           ← primary + secondary per product
│       └── editorial/          ← lifestyle, collection feature, membership
├── index.html
├── catalogue.html
└── README.md
```

---

## 13. Key Differences from PRD v1.0

| Topic | v1.0 (WRONG) | v2.0 (SOURCE-ACCURATE) |
|---|---|---|
| Site mode | Dark mode, black background | Light mode, white background |
| Primary font | Cormorant Garamond + Jost | Switzer (all text) |
| Hero H1 size | clamp 56–100px | 200px desktop, 180px tablet, 100px mobile |
| Hero mechanism | Parallax translateY per image | Sticky-pinned first layer + scroll sections pass over |
| Hero headline position | Left-center of viewport | Absolute right (off-screen), mix-blend-mode: difference |
| Hero text animation | Fade-up slide | Letter-by-letter blur + translateY per character |
| Nav link style | Uppercase, small caps | Mixed case, 16px, underline hover |
| Colour accent | Gold (#C9A96E) | None — black is the accent |
| Card background | Dark surface #161310 | Off-white #F5F5F5 |
| Card image | Full-bleed 3:4 | 150×150px centred on grey background |
| "Add to bag" on card | Slides up on hover | Not in original; our addition for Shopify |
| Badge style | Gold pill with border | Plain text label, grey, below product name |
| Grid gap | 24px | 8px |

---

*End of PRD v2.0 — Aurore Jewellery — Source-Verified*
