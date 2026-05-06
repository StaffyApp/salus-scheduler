# Salus Scheduler — Staffy Health Design System

## 1. Visual Theme & Atmosphere

Replicated from staffy.com. Clean, professional healthcare aesthetic. Pure white canvas with dark navy headings and a one single bold accent: Staffy Orange (`#ff4d00`). Body text is dark charcoal (`#333333`) — highly readable, not washed-out gray. Alternating sections use a light blue-gray (`#e8eef3`) for visual rhythm. The footer is light (white) with an orange top stripe — not dark.

**Key Characteristics:**
- Pure white canvas (`#ffffff`)
- Dark navy (`#1a2b3d`) for headings and primary text
- Dark charcoal (`#333333`) for body text — readable, not gray
- Staffy Orange (`#ff4d00`) as the single accent
- Light blue-gray (`#e8eef3`) for alternating section backgrounds
- Mont as the universal font
- Extra-bold headings (800) with 1.15 line-height
- Body text at 18px, weight 400, line-height 1.70
- Buttons: filled orange/dark for primary, outlined with orange border for secondary
- Light footer with orange top stripe, dark text, link dividers
- Borders (`1px solid #d1d5db`) for cards — not shadows
- Stats/numbers displayed in orange

## 2. Color Palette & Roles

### Primary
- **Navy** (`#1a2b3d`): Headings, nav text, primary UI text
- **Charcoal** (`#333333`): Body text, descriptions — dark and readable
- **White** (`#ffffff`): Page background, card surfaces, footer background
- **Light Blue-Gray** (`#e8eef3`): Alternating section backgrounds (Solution, UseCase, PilotCTA)

### Brand Accent
- **Staffy Orange** (`#ff4d00`): CTA buttons, section labels, stat numbers, active states, focus rings, footer top stripe

### Neutral
- **Mid Gray** (`#6b7280`): Muted text, placeholders, footer copyright
- **Border Gray** (`#d1d5db`): Card borders, input borders, dividers, footer link underlines

## 3. Typography Rules

### Font Family
- **All roles**: `Mont`, Helvetica, Arial, sans-serif

### Hierarchy

| Role | Size | Weight | Line Height | Color |
|------|------|--------|-------------|-------|
| Hero Heading | 52px | 800 | 1.15 | `#1a2b3d` |
| Section Heading | 42px | 800 | 1.15 | `#1a2b3d` |
| Card Title | 22px | 700 | 1.30 | `#1a2b3d` |
| Step Title | 20px | 600 | 1.20 | `#1a2b3d` |
| Body / Subtitle | 18px | 400 | 1.70 | `#333333` |
| Body Small | 16px | 400 | 1.60 | `#333333` |
| Section Label | 16px | 500 | normal | `#ff4d00` (not uppercase) |
| Nav Link | 16px | 500 | normal | `#1a2b3d` |
| Button | 16px | 600 | normal | — |
| Button Large | 18px | 600 | normal | — |
| Stat Number | 48px | 800 | 1.10 | `#ff4d00` |
| Stat Label | 18px | 600 | normal | `#ff4d00` |
| Footer Heading | 16px | 700 | normal | `#1a2b3d` (not uppercase) |
| Footer Link | 16px | 400 | normal | `#333333` |
| Footer Copyright | 14px | 400 | normal | `#6b7280` |
| Feature List Item | 14px | 500 | normal | `#1a2b3d` |
| Card Number | 13px | 600 | normal | `#6b7280` (uppercase) |

### Principles
- **One font, weight hierarchy**: 800 (display), 700 (headings), 600 (buttons/labels), 500 (nav/section labels), 400 (body)
- **Readable body text**: 18px at 1.70 line-height in dark charcoal — not gray
- **Section labels in orange**: 16px, weight 500, normal case — not uppercase
- **Stats in orange**: Large numbers (48px, 800 weight) in `#ff4d00`

## 4. Component Stylings

### Buttons

**Primary Orange** (filled)
- Background: `#ff4d00`, Text: `#ffffff`
- Padding: 14px 32px, Radius: 8px
- Border: `2px solid #ff4d00`
- Hover: darken background
- Use: "Book a Demo", "Get started", "I'm a Facility"

**Primary Dark** (filled)
- Background: `#1a2b3d`, Text: `#ffffff`
- Padding: 14px 32px, Radius: 8px
- Border: `2px solid #1a2b3d`
- Use: "I'm a Professional", "Request Pilot Access"

**Outline** (border only)
- Background: transparent, Text: `#1a2b3d`
- Padding: 14px 32px, Radius: 8px
- Border: `2px solid #ff4d00`
- Hover: faint orange background
- Use: "Start Earning", "Find Talent", "Contact Us"

**Ghost** (neutral border)
- Background: `#ffffff`, Text: `#1a2b3d`
- Border: `2px solid #d1d5db`
- Hover: border darkens

### Cards & Containers
- Background: `#ffffff`
- Border: `1px solid #d1d5db`
- Radius: 8px (standard), 12px (large)
- No shadow by default — borders define containment
- Hover: border-color darkens to navy

### Inputs & Forms
- Background: `#ffffff`
- Text: `#1a2b3d`
- Border: `1px solid #d1d5db`
- Radius: 8px
- Focus: `border-color: #ff4d00`
- Placeholder: `#6b7280`

### Navigation
- Background: white, solid (not transparent/blur)
- Border-bottom: `1px solid #d1d5db`
- Links: 16px weight 500, navy, hover turns orange
- Two CTA buttons: orange filled + dark filled
- Scrolled: adds subtle shadow
- Mobile: hamburger collapse

### Footer
- Background: white (light, not dark)
- Top border: `4px solid #ff4d00` (orange stripe)
- Headings: 16px, weight 700, navy, normal case
- Links: 16px, weight 400, charcoal, with bottom border dividers between items
- Social icons: Twitter, Facebook, LinkedIn in navy, hover orange
- Bottom bar: copyright left, Privacy/Terms right, `#6b7280` text
- Bottom separator: `1px solid #d1d5db`

## 5. Layout Principles

### Spacing
- Section padding: 80px vertical (48px mobile)
- Container max-width: 1200px
- Container padding: 40px sides (24px mobile)
- Card gaps: 24px
- Button gaps: 16px

### Section Backgrounds (alternating)
- White (`#ffffff`): Hero, Problem, Features, Differentiation
- Light blue-gray (`#e8eef3`): Solution, UseCase, PilotCTA

### Grid Patterns
- Hero: left-aligned, max-width 900px
- Features: 3-column (collapses to 1)
- Differentiation: 2-column (content + list)
- Problem: 2-column cards (collapses to 1)
- Footer: 4-column (2fr 1fr 1fr 1fr)

### Border Radius
- 4px: Small elements
- 8px: Buttons, cards, inputs (default)
- 12px: Large cards, modals
- 16px: Featured containers

## 6. Do's and Don'ts

### Do
- Use `#ff4d00` for CTAs, section labels, stat numbers, active states
- Use `#1a2b3d` navy for all headings
- Use `#333333` for body text — dark and readable
- Use `1px solid #d1d5db` borders on cards — not shadows
- Use outlined buttons (orange border, no fill) for secondary CTAs
- Use light blue-gray (`#e8eef3`) for alternating section backgrounds
- Use light footer with orange top stripe
- Use 18px body text with 1.70 line-height
- Use normal case for section labels (not uppercase)
- Show stats/numbers in orange

### Don't
- Don't use gray (`#898989`) for body text — it's too washed out
- Don't use dark footer backgrounds — Staffy footer is light
- Don't use uppercase for section labels or footer headings
- Don't use shadow elevation on cards — use borders
- Don't use blur/transparent nav — use solid white with border-bottom
- Don't use any color besides `#ff4d00` for accents
