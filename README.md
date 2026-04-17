# Vishesh Tripathi Portfolio

Modern portfolio website for Vishesh Tripathi, a full-stack developer focused on polished web applications, API-driven systems, backend features, and user-friendly product experiences.

Live site: [vtcodecraft.in](https://vtcodecraft.in/)

## Overview

This project is a personal developer portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, MDX, Velite, Framer Motion, GSAP, and Three.js. It presents Vishesh's profile, skills, experience, selected projects, writing, and contact form in a responsive, animated interface.

The website is designed to be more than a static resume. It includes smooth scrolling, section-aware navigation, typed blog content, SEO metadata, structured article data, interactive project cards, a WebGL laptop scene, theme-aware visuals, and production analytics.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home page with introduction, social links, resume CTA, skills, education/work journey, and contact form. |
| `/projects` | Interactive project showcase with featured work, project navigation, live links, GitHub links, tech tags, and a 3D laptop scene. |
| `/blog` | Blog index with published MDX posts sorted by date. |
| `/blog/[slug]` | Static blog article pages with metadata, cover image support, tags, reading time, table of contents data, and JSON-LD article schema. |

## Key Features

- Responsive portfolio layout for desktop, tablet, and mobile.
- Dark visual theme with custom CSS variables, glass surfaces, gradients, and decorative background layers.
- App Router architecture with server components where appropriate.
- Typed content pipeline for MDX blog posts through Velite.
- Syntax-highlighted MDX articles using Rehype plugins.
- Reading time and table of contents generation for posts.
- Static generation for published blog posts.
- SEO metadata for the site, blog index, and individual posts.
- JSON-LD article schema for blog detail pages.
- Animated section reveals with Framer Motion.
- GSAP-powered project text transitions.
- Smooth scrolling through Lenis.
- Interactive 3D project scene using React Three Fiber, Drei, Three.js, and post-processing.
- Contact form powered by a Next.js server action, Resend, React Email, and toast feedback.
- Vercel Analytics and Vercel Speed Insights integration.
- Type-safe aliases for application imports and generated content.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4, custom CSS variables, tw-animate-css |
| UI primitives | Radix UI, Base UI, shadcn, class-variance-authority |
| Animation | Framer Motion, GSAP, Lenis |
| 3D/WebGL | Three.js, React Three Fiber, Drei, React Three PostProcessing, OGL |
| Content | MDX, Velite, reading-time, rehype-slug, rehype-autolink-headings, rehype-pretty-code |
| Email | Resend, React Email |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Quality | ESLint, TypeScript strict mode |

## Project Structure

```text
.
|-- public/
|   |-- images/              # Profile image, resume PDF, blog covers
|   `-- models/              # 3D assets such as the laptop model
|-- scripts/
|   `-- dev.mjs              # Local development helper script
|-- src/
|   |-- actions/             # Server actions, including contact form email
|   |-- app/                 # Next.js App Router routes and root layout
|   |-- components/
|   |   |-- 3d/              # Galaxy, laptop model, and deferred 3D components
|   |   |-- blog/            # Blog cards, shells, MDX renderer, tags, TOC
|   |   |-- layout/          # Header, footer, sidebar, profile sidebar
|   |   |-- providers/       # App-level providers such as Lenis
|   |   |-- sections/        # Home and project page sections
|   |   `-- ui/              # Shared UI components
|   |-- content/
|   |   `-- blog/            # MDX blog posts
|   |-- context/             # React context providers
|   |-- email/               # React Email templates
|   |-- lib/                 # Data, hooks, types, utilities
|   `-- styles/              # MDX-specific styles
|-- velite.config.ts         # Typed MDX content configuration
|-- next.config.ts           # Next.js configuration
|-- tsconfig.json            # TypeScript and path alias configuration
`-- package.json             # Scripts and dependencies
```

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16.
- npm.
- A Resend API key if you want the contact form to send real emails.

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://vtcodecraft.in
```

`RESEND_API_KEY` is required for the contact form server action. `NEXT_PUBLIC_SITE_URL` is used by the root metadata base and defaults to `https://vtcodecraft.in` when not provided.

### Development

```bash
npm run dev
```

The development server runs locally at [http://localhost:3000](http://localhost:3000).

### Content Build

```bash
npm run content
```

This compiles MDX files from `src/content` into the generated `.velite` output used by the app.

### Production Build

```bash
npm run build
npm start
```

The `prebuild` script automatically runs `velite build` before `next build`.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the local development server through `scripts/dev.mjs`. |
| `npm run content` | Builds typed MDX content with Velite. |
| `npm run content:dev` | Starts Velite in development/watch mode. |
| `npm run build` | Creates a production Next.js build. |
| `npm start` | Starts the production server after building. |
| `npm run lint` | Runs ESLint across the project. |

## Blog Workflow

Blog posts live in `src/content/blog` as `.mdx` files. Each post uses frontmatter that matches the Velite schema.

```mdx
---
title: "Post Title"
description: "Short description for SEO and cards."
date: "2026-04-17"
published: true
tags: ["nextjs", "react", "architecture"]
cover: "/images/blogs/example-cover.jpg"
---

Write the article body here.
```

Supported fields:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Maximum 120 characters. |
| `description` | Yes | Maximum 320 characters. |
| `date` | Yes | ISO date string. |
| `published` | No | Defaults to `false`; only published posts appear on the site. |
| `tags` | No | Defaults to an empty array. |
| `cover` | No | Path to an image in `public` or another supported public URL path. |

After adding or editing posts, run:

```bash
npm run content
```

Generated post data includes the slug, MDX body, raw content, table of contents, and reading time.

## Contact Form

The contact form is implemented with:

- `src/components/sections/contact.tsx` for the client-side form UI.
- `src/actions/sendEmail.ts` for the server action.
- `src/email/contact-form-email.tsx` for the React Email template.
- Resend for email delivery.
- `react-hot-toast` for user feedback.

The form validates sender email and message length on the server before sending the email.

## Projects Data

Project cards and skills are driven from `src/lib/data.ts`. Update this file to change:

- Navigation links.
- Home page section links.
- Education and experience timeline entries.
- Project titles, descriptions, live URLs, repository URLs, featured state, and tech tags.
- Skill names, icons, and brand colors.

## Assets

| Path | Purpose |
| --- | --- |
| `public/images/profile.jpg` | Profile image used on the home page and sidebar. |
| `public/images/Vishesh Tripathi Resume.pdf` | Local resume asset. |
| `public/images/blogs` | Blog cover images. |
| `public/models/asus_tuf_f15.glb` | 3D laptop model used in the projects scene. |

## Analytics

The root layout includes:

- `Analytics` from `@vercel/analytics/next`.
- `SpeedInsights` from `@vercel/speed-insights/next`.

These integrations collect page analytics and real-user performance data when deployed on Vercel.

## Deployment

The site is optimized for Vercel.

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the required environment variables.
4. Deploy.

Vercel will install dependencies, run the production build, and serve the site. Preview deployments are created automatically for pull requests when the repository is connected.

## Notes For Contributors

- This project uses Next.js 16. Before changing Next.js APIs, routing conventions, metadata behavior, or file structure, read the relevant local documentation in `node_modules/next/dist/docs`.
- Keep blog content in `src/content/blog` and rebuild Velite output after content changes.
- Keep shared data in `src/lib/data.ts` so the UI stays data-driven.
- Avoid committing generated build folders such as `.next`.
- Run `npm run lint` before publishing changes.

## Known Maintenance Items

At the time this README was updated, `npm run lint` reported existing issues unrelated to the README in:

- `src/components/3d/Galaxy.tsx`
- `src/components/TextType.tsx`
- `src/email/contact-form-email.tsx`

These should be fixed separately before treating lint as a clean project health check.

## License

This is a personal portfolio project for Vishesh Tripathi. The code and design can be used for learning and inspiration; please do not copy the personal branding, identity, written content, or private contact details as your own.
