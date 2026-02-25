# Denis Letian Sekento Memorial

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000?logo=shadcnui)](https://ui.shadcn.com)
[![Fly.io](https://img.shields.io/badge/Deployed-Fly.io-8b5cf6?logo=fly.io)](https://denis-sekento-memorial.fly.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold)](LICENSE)

> *"I have fought the good fight, I have finished the race, I have kept the faith."* — 2 Timothy 4:7

---

## In Loving Memory

**Denis Letian Sekento** (1 January 1985 — 21 February 2026)

A two-tier memorial website honoring the life, legacy, and faith of Denis Letian Sekento. Born in the heart of Maasai land, Denis was a man of quiet strength, deep faith, and unwavering love for his family. This site serves as both a living tribute during the burial preparations and a permanent digital memorial.

**Burial:** Friday 28 February 2026 — Naserian, Kajiado, Kenya

---

## A Personal Tribute

*From Eric Gitangu — Author*

Dennis was a brother from another mother. The kind of person who didn't need to say much to make you feel seen, valued, and understood. His quiet confidence, his warm smile, his steady presence — these are the things that stay with you long after someone is gone.

We shared laughter, we shared life, and now we share the ache of loss. But more than anything, we share the certainty that Dennis lived well. He fought the good fight. He kept the faith. And he left this world better than he found it.

Rest well, brother. Until we meet again.

---

## Project Description

This memorial website is built as a **two-tier application**:

### Public Tier (Open Access)
- **Biography** — Five chapters tracing Denis's life from birth through his legacy
- **Tributes** — Heartfelt words from his wife Christine, siblings, children, and mother Janet
- **Programme** — Full burial service timeline with 16 scheduled events
- **Hymns** — Four hymns in English, Kiswahili, and Maa (Maasai)
- **Gallery** — Photo gallery (opens post-burial)
- **Countdown** — Live countdown to the burial service

### Committee Tier (Phone + OTP Gated)
- **Dashboard** — Section status overview and committee member directory
- **Gallery Upload** — Planning photos for committee coordination
- **Contributions** — M-Pesa STK push integration for funeral contributions with real-time tracking
- **Logistics** — Transport, catering, venue, and funeral home coordination

### Admin Tier (Google OAuth)
- **Content Editor** — Live content management across all sections
- **Audit Log** — Full transparency on who changed what and when
- **Whitelist Manager** — Committee phone number access control

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack, React 19) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + CSS custom properties |
| **Components** | shadcn/ui (17 components) |
| **Theme** | next-themes (dark-first celestial design with warm gold accents) |
| **Fonts** | Cormorant Garamond, Crimson Pro, DM Mono (Google Fonts) |
| **Auth** | Phone + OTP (Africa's Talking) + Google OAuth (NextAuth v5) |
| **Payments** | M-Pesa Daraja API (STK Push) |
| **Database** | Supabase (Postgres + Realtime + Storage) |
| **Deployment** | Fly.io (JNB region, Docker multi-stage) |
| **Quality** | Husky pre-commit (gitleaks, tsc, ESLint, Prettier), commitlint |
| **SEO** | Dynamic favicons, OG images, comprehensive metadata |

---

## Getting Started

```bash
# Clone
git clone https://github.com/ericgitangu/dennis_memorial.git
cd dennis_memorial

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in your keys (see .env.example for required vars)

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

See [`.env.example`](.env.example) for all required environment variables:

- **Supabase** — Database, auth, storage
- **M-Pesa** — Daraja API for STK Push payments
- **Africa's Talking** — SMS OTP delivery
- **Google OAuth** — Admin authentication
- **Google Maps** — Burial location map

---

## Deployment

```bash
# Build locally
pnpm build

# Deploy to Fly.io
fly deploy
```

The site is live at: **[denis-sekento-memorial.fly.dev](https://denis-sekento-memorial.fly.dev)**

---

## Author

**Eric Gitangu** — [developer.ericgitangu.com](https://developer.ericgitangu.com)

---

*Crafted with love in memory of Denis Letian Sekento. May his soul rest in eternal peace.*
