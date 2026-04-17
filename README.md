# Vishesh Tripathi — Portfolio

A modern, interactive portfolio built with a carefully chosen set of web technologies. It features a technical blog, smooth animations, 3D graphics, and a clean, responsive layout.

**Live at:** `https://vtcodecraft.in/` (development) · Deployed on Vercel

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — intro, skills, career timeline, and contact |
| `/projects` | Project showcase with 3D interactions |
| `/blog` | Technical articles on frontend craft and design systems |
| `/blog/[slug]` | Individual posts with reading time and table of contents |

---

## Tech Stack

### Core
- **Next.js 16** · App Router, server components, optimized builds
- **React 19** · Latest features and performance improvements
- **TypeScript** · Full type safety across the codebase

### Styling & UI
- **Tailwind CSS** · Utility-first, JIT compilation
- **Shadcn/UI + Radix UI** · Accessible, customizable component primitives
- **CVA** · Type-safe component variants

### Animation
- **Framer Motion** · Page transitions, scroll-triggered reveals, gesture support
- **GSAP** · Complex timeline sequences, scroll-synced effects, text animations
- **Lenis** · Smooth, physics-based scrolling integrated with GSAP

### 3D & WebGL
- **Three.js + React Three Fiber** · Declarative 3D scene building
- **React Three Drei** · Helpers, loaders, and pre-built controls
- **React Three PostProcessing** · Bloom, depth of field, color grading

### Blog & Content
- **MDX** · Markdown with embedded React components
- **Velite** · Build-time content compilation with typed schemas
- **Rehype plugins** · Syntax highlighting, auto-linked headings, slug generation

### Email
- **Resend** · Transactional email API
- **React Email** · Build email templates as React components

### Analytics
- **Vercel Analytics** · Page views, interactions, geographic data
- **Vercel Speed Insights** · Real-user Core Web Vitals (LCP, INP, CLS)

---

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   └── projects/
├── components/
│   ├── 3d/              # Three.js scenes (Galaxy, Computer model)
│   ├── blog/
│   ├── layout/          # Header, Footer, Sidebar
│   ├── sections/        # Intro, Skills, MyJourney, Contact
│   └── ui/
├── content/
│   └── blog/            # MDX blog posts
├── lib/
│   ├── data.ts          # Skills, links, experience
│   ├── types.ts
│   ├── utils.ts
│   └── hooks.ts
├── actions/             # Server actions
├── context/             # React context providers
├── styles/
└── email/               # React Email templates
```

---

## Getting Started

```bash
# Clone and install
git clone <repository-url>
cd portfolio
npm install

# Build MDX content
npm run content

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build   # Runs content compilation automatically via prebuild
npm start
```

---

## Blog System

Posts live in `src/content/blog/` as `.mdx` files.

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
published: true
tags: ["design-systems", "react"]
description: "A brief summary."
---
```

After adding a post, run `npm run content`. It will appear automatically at `/blog`.

Features: syntax highlighting · auto-generated table of contents · reading time · tag filtering

---

## Contact Form

The contact section sends email via **Resend**:

- Server action: `src/actions/sendEmail.ts`
- Email template: `src/email/contact-form-email.tsx`

---

## Skills Showcased

| Category | Technologies |
|---|---|
| Languages | TypeScript, JavaScript, Python, Java, C++ |
| Frontend | React, Next.js, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, FastAPI |
| Databases | PostgreSQL, MongoDB, MySQL, Redis, Supabase |
| DevOps | Docker, Linux, Git |

---

## Deployment

Optimized for **Vercel** — push to main and it builds automatically. Preview deployments are created for all pull requests.

```bash
vercel deploy
```

---

*Personal portfolio of Vishesh Tripathi. Feel free to draw inspiration from the architecture and design.*
