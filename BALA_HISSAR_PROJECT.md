# Bala Hissar — Project Context Document

> **This document provides the complete technical and business context for the Bala Hissar restaurant website.**  
> Give this to both **Claude** (Planner) and **Deepseek** (Coder) when continuing work on this project in Cursor.

---

## 1. Project Overview

**Bala Hissar** is a premium Pakistani & Peshawari buffet restaurant located in **Bradford, UK**. This is the restaurant's production website — a fully functional, SEO-optimised, responsive web application with integrated booking and enquiry systems.

| Field | Value |
|---|---|
| **Live URL** | https://mybalahissar.co.uk |
| **Repository** | https://github.com/taseenali/BalaHissar-ClonedRepo |
| **Branch** | `main` |
| **Hosting** | Vercel |
| **Domain Registrar** | External (pointed to Vercel) |
| **Project Path** | `d:\AG Dev\Bala Hissar\bala-hissar-restaurant---production-ready-system` |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 15.3.4+ |
| **Language** | TypeScript | ~5.8 |
| **UI Library** | React | 19.2+ |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | 4.1+ |
| **Animations** | Framer Motion | 12.29+ |
| **Icons** | Lucide React | 1.7+ |
| **Email** | Nodemailer (Microsoft 365 SMTP) | 8.0+ |
| **Forms** | React Hook Form + Zod | 7.71+ / 4.3+ |
| **Build** | `next build` → Vercel | — |
| **Package Manager** | npm | — |

### Key Configuration Files

- `next.config.ts` — React strict mode, image optimization (AVIF/WebP), redirects
- `tsconfig.json` — Strict TypeScript with `@/` path alias
- `postcss.config.mjs` — Tailwind CSS v4 PostCSS plugin
- `.eslintrc.json` — `next/core-web-vitals` ruleset
- `.env.local` — Email credentials (never committed)

---

## 3. Project Architecture

```
bala-hissar-restaurant---production-ready-system/
├── app/                          # Next.js App Router (pages + API)
│   ├── layout.tsx                # Root layout (fonts, metadata, Header/Footer)
│   ├── page.tsx                  # Home page (hero, menu preview, events, reviews)
│   ├── globals.css               # Design system (Tailwind v4 @theme, utilities)
│   ├── icon.png                  # Favicon (auto-handled by Next.js)
│   ├── robots.ts                 # SEO robots.txt generator
│   ├── sitemap.ts                # SEO sitemap generator
│   ├── api/
│   │   ├── reservation/route.ts  # Table booking API (POST)
│   │   └── enquiry/route.ts      # Contact enquiry API (POST)
│   ├── book-table/page.tsx       # Booking page
│   ├── contact/page.tsx          # Contact page
│   ├── menu/page.tsx             # Full menu page
│   ├── catering/page.tsx         # Catering services page
│   ├── event-hall/page.tsx       # Event hall page
│   ├── order-online/page.tsx     # External ordering redirect
│   ├── privacy-policy/page.tsx   # Legal — Privacy Policy
│   └── terms-of-service/page.tsx # Legal — Terms of Service
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky navigation with scroll-spy
│   │   ├── Footer.tsx            # Footer with contact info, links, map
│   │   └── MobileMenu.tsx        # Full-screen mobile navigation overlay
│   ├── home/
│   │   ├── HeroSlider.tsx        # Auto-rotating hero image carousel
│   │   └── Reviews.tsx           # Infinite marquee review carousel
│   ├── booking/
│   │   └── BookingFlow.tsx       # Multi-step booking wizard (Date → Time → Guests → Details → Confirm)
│   ├── contact/
│   │   └── ContactForm.tsx       # Enquiry form with email field
│   ├── event-hall/
│   │   └── QawaliSection.tsx     # Qawali night events section
│   ├── menu/
│   │   └── MenuSection.tsx       # Menu category renderer
│   ├── HashRedirectHandler.tsx   # Client-side hash-to-route redirector
│   └── PrivacyMap.tsx            # Cookie-consent Google Maps embed
│
├── data/
│   ├── content.ts                # Restaurant metadata (address, phone, hours)
│   ├── menu.ts                   # Full dine-in menu data
│   └── reviewsData.ts           # Customer reviews
│
├── hooks/
│   └── useScrollSpy.ts          # Active section detection for nav
│
├── utils/
│   └── scroll.ts                # Smooth scroll utility
│
└── public/
    ├── images/
    │   ├── logo.png             # Full logo (used in components)
    │   ├── logo_meta.png        # Social sharing image (OG/Twitter)
    │   ├── hero/                # Hero slider images
    │   ├── gallery/             # Food and ambience gallery
    │   └── event-hall/          # Event hall images
    └── videos/                  # Video assets
```

---

## 4. Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#C5A059` | Gold — buttons, accents, headings |
| `--color-secondary` | `#12263A` | Deep blue — glass panels, inputs |
| `--color-accent` | `#F5F5F5` | Off-white — body text |
| `--color-dark` | `#0B1C2C` | Navy — background |
| `--color-muted` | `#CFCFCF` | Grey — secondary text |

### Typography

| Font | Variable | Usage |
|---|---|---|
| Playfair Display | `--font-family-serif` | Headings, decorative text |
| Plus Jakarta Sans | `--font-family-sans` | Body text, UI elements |

### Custom Utilities (defined in `globals.css`)

- `.glass-panel` — Frosted glass effect (backdrop blur + semi-transparent bg)
- `.shimmer` — Gold shimmer hover effect for CTAs
- `.text-gradient-gold` — Gold-to-white gradient text
- `.animate-marquee` — Infinite smooth horizontal scroll (reviews)

### Design Principles

- **Premium aesthetic** — Deep navy and gold, glassmorphism, subtle animations
- **Mobile-first responsive** — All layouts adapt to mobile, tablet, desktop
- **Micro-animations** — Framer Motion for scroll-triggered reveals and hover states
- **No placeholders** — All images are real restaurant photos

---

## 5. Email System

### SMTP Configuration

| Setting | Value |
|---|---|
| **Provider** | Microsoft 365 |
| **Host** | `smtp.office365.com` |
| **Port** | 587 (TLS) |
| **Sender** | `"Bala Hissar" <contact@mybalahissar.co.uk>` |
| **Auth** | `EMAIL_USER` + `EMAIL_PASS` environment variables |

### Email Flows

#### 1. Table Booking (`/api/reservation`)

When a customer books a table:
- **Email #1** → Restaurant (internal notification with all booking details)
- **Email #2** → Customer (branded confirmation with date, time, guests)
- **Subject (both):** `"Table Booking Details"`
- **Sender (both):** `"Bala Hissar" <contact@mybalahissar.co.uk>`

#### 2. Enquiry Form (`/api/enquiry`)

When a customer submits the contact form:
- **Email #1** → Restaurant (internal notification with enquiry details)
- **Email #2** → Customer (branded confirmation with enquiry summary)
- **Subject (internal):** `"Website Enquiry: {type}"`
- **Subject (customer):** `"Enquiry form details"`
- **Sender (both):** `"Bala Hissar" <contact@mybalahissar.co.uk>`

### Email Styling

All emails use inline HTML/CSS with the restaurant's brand colours:
- Background: `#0B1C2C` (navy)
- Accent: `#C5A059` (gold)
- Text: `#F5F5F5` (white) / `#CFCFCF` (muted)
- Border radius: 20px
- Font: Segoe UI fallback stack

---

## 6. Booking System — Business Rules

All booking logic is timezone-locked to **Europe/London (Bradford, UK)**.

### Buffet Schedule

| Meal | Days | Hours |
|---|---|---|
| **Dinner Buffet** | Monday – Sunday | 5:30 PM – 10:00 PM |
| **Breakfast Buffet** | Saturday – Sunday | 10:00 AM – 3:00 PM |

### Booking Rules (Server-Side Enforced)

1. **Breakfast Buffet** — Cannot be booked for the same day. Must be at least 1 day in advance.
2. **Dinner Buffet** — Same-day bookings are only available before **4:00 PM** (Bradford time).
3. **Past dates** — Rejected.
4. **All times** — Must fall within the buffet schedule for the selected day.

### Booking Flow (UI)

The booking wizard in `BookingFlow.tsx` is a 5-step process:

```
Step 0: Terms & Conditions (must accept to proceed)
Step 1: Select Date (calendar picker, min = today)
Step 2: Select Time (dynamic slots based on date + day of week)
Step 3: Enter Details (name, phone, email, guests, notes)
Step 4: Review & Confirm (summary card + submit button)
Step 5: Success (branded confirmation message)
```

### Date Format

**All dates** across the website, emails, and forms use **dd/mm/yyyy** (British standard).

---

## 7. SEO Configuration

### JSON-LD Schema Markup

| Page | Schema Type | Purpose |
|---|---|---|
| Home (`/`) | `Restaurant` | Local business discovery, opening hours, address |
| Contact (`/contact`) | `ContactPage` + `Restaurant` | Contact information visibility |
| Book a Table (`/book-table`) | `FoodEstablishment` + `ReserveAction` | Reservation action in search results |

### Page Metadata

| Page | Title |
|---|---|
| Home | `Bala Hissar \| Pakistani & Peshawari Buffet Restaurant in Bradford` |
| Menu | `Menu \| Bala Hissar` |
| Book a Table | `Book a Table \| Bala Hissar` |
| Contact | `Contact Us \| Bala Hissar` |
| Event Hall | `Event Hall \| Bala Hissar` |
| Catering | `Catering \| Bala Hissar` |

### Social Sharing (Open Graph + Twitter)

- **Image:** `/images/logo_meta.png` (1200x630, Bala Hissar circular logo on black bg)
- **Fallback configured globally** in `layout.tsx` — all pages inherit this unless overridden
- **Twitter card:** `summary_large_image`
- **Locale:** `en_GB`

### Other SEO

- `robots.ts` — Dynamic robots.txt generation
- `sitemap.ts` — Dynamic XML sitemap generation
- Canonical URLs set per page
- `HashRedirectHandler.tsx` — Redirects old `/#section` URLs to clean routes

---

## 8. Restaurant Contact Information

| Field | Value |
|---|---|
| **Name** | Bala Hissar |
| **Address** | 46-50 Highgate, Heaton, Bradford, BD9 4BE |
| **Phone** | 01274 780951 |
| **Email** | contact@mybalahissar.co.uk |
| **Website** | https://mybalahissar.co.uk |
| **Google Maps** | Embedded in footer and contact page |

> **Important:** All references to the restaurant email must use `contact@mybalahissar.co.uk`. The old `info@mybalahissar.co.uk` has been fully deprecated.

---

## 9. Environment Variables

Set these in **Vercel Dashboard → Settings → Environment Variables** for production:

```env
EMAIL_USER=contact@mybalahissar.co.uk
EMAIL_PASS=[Microsoft 365 account password]
```

For local development, these are in `.env.local` (gitignored).

---

## 10. Build & Deployment

### Local Development

```bash
npm install
npm run dev          # Starts at http://localhost:3000
```

### Production Build

```bash
npm run build        # Must exit with code 0 before deploying
```

### Deployment

- **Platform:** Vercel
- **Trigger:** Automatic on `git push` to `main` branch
- **Build command:** `next build` (configured in Vercel)
- **Output:** Static pages + serverless API routes

### Current Build Status

✅ **Passes** — Last verified build was clean with zero errors.

---

## 11. Established Conventions & Rules

These are non-negotiable patterns that must be followed:

1. **All dates → dd/mm/yyyy** (British format)
2. **All emails → from `"Bala Hissar" <contact@mybalahissar.co.uk>`**
3. **All times → Europe/London timezone** (server-side enforcement)
4. **Tailwind v4** — Uses `@theme` block in `globals.css`, NOT `tailwind.config.js`
5. **Server Components by default** — Only use `'use client'` when genuinely needed
6. **Framer Motion** — Used for all animations (import from `framer-motion/client` in server components)
7. **ESLint `prefer-const`** — Always use `const` unless reassignment is genuinely required
8. **Image optimization** — Use `next/image` with proper `alt`, `fill`, and `sizes` props
9. **No inline credentials** — All secrets via `process.env`
10. **Comments preserved** — Never remove existing comments/docstrings when editing files

---

## 12. Known Files of Interest

These are the files most frequently modified during development:

| File | What It Does | Notes |
|---|---|---|
| `app/page.tsx` | Home page | ~420 lines, hero + menu preview + events + reviews |
| `components/booking/BookingFlow.tsx` | Booking wizard | ~694 lines, multi-step form with validation |
| `components/contact/ContactForm.tsx` | Enquiry form | ~254 lines, sends to `/api/enquiry` |
| `app/api/reservation/route.ts` | Booking API | ~194 lines, timezone validation + dual emails |
| `app/api/enquiry/route.ts` | Enquiry API | ~148 lines, validation + dual emails |
| `data/content.ts` | Restaurant data | Address, phone, hours — source of truth |
| `data/menu.ts` | Menu items | Full dine-in menu data structure |
| `app/globals.css` | Design system | Tailwind v4 theme + custom utilities |
| `app/layout.tsx` | Root layout | Fonts, global metadata, Header/Footer |
| `components/layout/Header.tsx` | Navigation | Sticky header with scroll-spy |
| `components/layout/MobileMenu.tsx` | Mobile nav | Full-screen overlay menu |
| `components/layout/Footer.tsx` | Footer | Contact info, links, map embed |

---

## 13. What's NOT in This Project

- ❌ No database — all data is static or sent via email
- ❌ No authentication / user accounts
- ❌ No payment processing — bookings are request-based (staff confirms by phone)
- ❌ No CMS — content is hardcoded in `data/` files
- ❌ No `tailwind.config.js` — Tailwind v4 uses CSS-based config
- ❌ No state management library (Redux, Zustand, etc.) — local React state only

---

## 14. Maintenance Notes

1. **Opening hours changes** → Update both `data/content.ts` AND the server-side validation logic in `app/api/reservation/route.ts`
2. **Menu changes** → Update `data/menu.ts`
3. **Review changes** → Update `data/reviewsData.ts`
4. **Email branding changes** → Update HTML templates in both `reservation/route.ts` and `enquiry/route.ts`
5. **New pages** → Create folder in `app/`, add to `sitemap.ts`, add navigation link in `Header.tsx` and `MobileMenu.tsx`
