# Vishesh Tripathi - Portfolio Website

A modern, interactive portfolio website built with cutting-edge web technologies. Features smooth animations, 3D graphics, and a technical blog focused on design systems and frontend engineering.

## Features

- **Interactive 3D Graphics**: Built with Three.js, React Three Fiber, and GSAP for immersive visual experiences
- **Technical Blog**: MDX-powered blog system with posts on design systems, frontend architecture, and implementation details
- **Smooth Animations**: Leveraging Framer Motion, GSAP, and Lenis for fluid interactions and scroll effects
- **Responsive Design**: Fully mobile-responsive layout with Tailwind CSS
- **Email Integration**: Contact form powered by Resend for reliable email delivery
- **Performance Monitoring**: Integrated Vercel Analytics and Speed Insights
- **Modern UI Components**: Base UI and Radix UI with Shadcn components
- **Dark Mode Support**: Theme toggle for light/dark mode preference

## Pages

- **Home** (`/`): Landing page with intro, skills showcase, career journey, and contact section
- **Projects** (`/projects`): Showcase of projects and work with 3D interactions
- **Blog** (`/blog`): Technical articles on design systems, frontend craft, and architecture patterns
- **Dynamic Blog Posts** (`/blog/[slug]`): Individual blog post pages with reading time estimates and table of contents

## Tech Stack

A comprehensive modern tech stack combining cutting-edge libraries for superior performance, interactivity, and developer experience.

### Core Framework
- **Next.js 16**: React framework with App Router for file-based routing, server components, and optimized builds
- **React 19**: Latest React library with improved performance and new features
- **TypeScript**: Full type safety, better IDE support, and compile-time error checking

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework with JIT compilation for optimized bundle sizes
- **Shadcn/UI**: High-quality, copy-paste component library built on Radix UI and Tailwind
- **Base UI**: Headless, unstyled components for maximum customization and accessibility
- **Radix UI**: Low-level UI primitives with accessibility built-in, ARIA compliant
- **CVA (Class Variance Authority)**: Type-safe component variants with Tailwind integration
- **Tailwind Merge**: Utility function for merging Tailwind CSS classes without conflicts
- **clsx**: Conditional class name management
- **Tailwind Animate CSS**: Additional animation utilities for Tailwind CSS

### Animation & Motion Libraries
- **Framer Motion**: Premier motion library for React animations
  - Page transitions with `AnimatePresence`
  - Gesture animations (tap, hover, drag)
  - Scroll-triggered animations and viewport detection
  - Layout animations for responsive design
  - Exit animations and staggered effects
  
- **GSAP (GreenSock Animation Platform)**: Professional-grade animation framework
  - Complex timeline animations
  - Smooth scroll effects and parallax
  - SVG animations
  - Property animations with easing
  - `@gsap/react` plugin for React integration

- **Lenis**: Smooth scroll experience library
  - Browser-native smooth scrolling
  - Scroll velocity calculation for physics-based animations
  - Integration with GSAP for synchronized animations
  - Performance optimized scroll events

### 3D Graphics & WebGL
- **Three.js**: Comprehensive 3D graphics library
  - 3D scene rendering and camera control
  - Geometry, materials, and lighting
  - Custom shaders and effects
  
- **React Three Fiber**: React renderer for Three.js
  - Component-based 3D scene building
  - Declarative JSX syntax for 3D objects
  - Easy integration with React state and hooks
  - Automatic canvas setup and resize handling
  
- **React Three PostProcessing**: Post-processing effects for Three.js
  - Depth of field, bloom, and motion blur
  - Color grading and tone mapping
  - SSAO (Screen-Space Ambient Occlusion)
  - Custom effect chaining
  
- **React Three Drei**: Useful helpers and abstractions for React Three Fiber
  - Pre-built components (OrbitControls, PerspectiveCamera)
  - Helper geometries and utilities
  - Asset loaders and preloading
  
- **OGL**: Minimal WebGL library for lightweight 3D rendering
  - Alternative to Three.js for specific use cases
  - Lower-level WebGL control
  - Smaller bundle size

### Content Management & Blog
- **Velite**: Build-time content compilation system
  - Process MDX files at build time
  - Type-safe content schema definition
  - Perfect for static site generation
  
- **MDX**: Markdown with embedded JSX
  - Write interactive content in Markdown
  - Import and use React components within Markdown
  - Combine narrative content with executable code
  
- **Rehype Plugins**: Markdown post-processing
  - `rehype-slug`: Auto-generate heading IDs for deep linking
  - `rehype-autolink-headings`: Automatically link headings
  - `rehype-pretty-code`: Syntax highlighting with language-specific themes

### UI Components & Icons
- **React Icons**: Comprehensive icon library
  - Multiple icon sets (Font Awesome, Material Design, Feather, etc.)
  - SVG-based for crisp rendering
  - Tree-shakeable for smaller bundles
  
- **React Hot Toast**: Elegant toast notification library
  - Customizable toast messages
  - Auto-dismiss or manual close
  - Position flexibility
  - Success, error, and custom toast types
  
- **React Vertical Timeline Component**: Timeline UI component
  - Chronological event display
  - Responsive design for mobile
  - Customizable event content

### Utilities & Helpers
- **React Intersection Observer**: Wrapper for Intersection Observer API
  - Detect when elements enter viewport
  - Lazy loading optimization
  - Trigger animations on scroll
  - Performance monitoring
  
- **Reading Time**: Calculate article reading duration
  - Automatic reading time estimation
  - Customizable WPM (words per minute)
  - Used in blog post headers
  
- **Clsx & Tailwind Merge**: Class name utilities
  - Conditional class application
  - Prevent conflicting Tailwind utilities
  - Clean component styling logic

### Email & Communication
- **Resend**: Modern email API for transactional emails
  - Reliable email delivery
  - Email templating support
  - Analytics and tracking
  
- **React Email**: Component library for building emails
  - Build emails like React components
  - `@react-email/components`: Email UI primitives
  - `@react-email/tailwind`: Tailwind CSS support in emails
  - Type-safe email templates

### Analytics & Performance
- **Vercel Analytics**: Web analytics for user insights
  - Page view tracking
  - User interaction monitoring
  - Performance metrics
  - Geographic data
  
- **Vercel Speed Insights**: Core Web Vitals monitoring
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID) / Interaction to Next Paint (INP)
  - Cumulative Layout Shift (CLS)
  - Real user monitoring (RUM)

### Development Tools
- **ESLint**: Code quality and linting
  - JavaScript/TypeScript linting
  - Custom rules for code consistency
  - Pre-commit checks
  
- **PostCSS**: CSS transformation tool
  - Process CSS with JavaScript plugins
  - Autoprefixer for vendor prefixes
  - CSS-in-JS compilation
  
- **Next Config**: Next.js configuration
  - Image optimization settings
  - Custom webpack configuration
  - Build optimizations

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Build content (MDX)
npm run content

# Start development server
npm run dev
```

## Getting Started

### Development

```bash
# Start development server with hot reload
npm run dev

# Build and preview content
npm run content:dev
```

The site will be available at `http://localhost:3000`

### Production

```bash
# Build for production
npm build

# Build content first (automatically runs in prebuild)
npm run content
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   └── about/             # About page
├── components/            # React components
│   ├── 3d/               # Three.js components (Galaxy, Computer)
│   ├── blog/             # Blog-specific components
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   ├── sections/         # Page sections (Intro, Skills, MyJourney, Contact)
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── content/              # MDX content
│   └── blog/            # Blog posts
├── context/             # React context
├── actions/             # Server actions
├── lib/                 # Utilities and constants
│   ├── data.ts         # Skills, links, experience data
│   ├── types.ts        # TypeScript types
│   ├── utils.ts        # Utility functions
│   └── hooks.ts        # Custom React hooks
├── styles/             # Global styles
└── email/              # Email templates
```

## Styling

The project uses **Tailwind CSS** with a custom configuration:
- Custom animations and transitions
- Responsive breakpoints optimized for mobile-first design
- Dark mode support via `data-theme` attribute
- CSS modules for component-specific styles

## Blog System

Blog posts are written in **MDX** and managed by **Velite**:

1. Create a new `.mdx` file in `src/content/blog/`
2. Include front matter with metadata:
   ```yaml
   ---
   title: "Your Blog Title"
   date: "2024-01-15"
   published: true
   tags: ["tag1", "tag2"]
   description: "Brief description"
   ---
   ```
3. Run `npm run content` to build
4. Post automatically appears on `/blog`

Features:
- **MDX Support**: Write JSX components directly in Markdown
- **Syntax Highlighting**: Code blocks with language detection
- **Auto-generated Table of Contents**: Navigate blog posts easily
- **Reading Time**: Automatic reading time estimates
- **Tag-based Filtering**: Organize posts by tags

## Email Integration

Contact form uses **Resend** for email delivery:
- Located in `/contact` section on home page
- Server action in `src/actions/sendEmail.ts`
- Email template in `src/email/contact-form-email.tsx`
- React Email components for template building

## Analytics & Performance

- **Vercel Analytics**: Tracks page views, interactions, and user metrics
- **Vercel Speed Insights**: Monitors Core Web Vitals and performance
- Both integrated automatically on build

## Skills & Experience

The portfolio showcases:
- **Languages**: JavaScript, TypeScript, Python, Java, C++
- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, FastAPI
- **Databases**: MongoDB, PostgreSQL, MySQL, Redis, Supabase
- **DevOps**: Docker, Linux, Git

## Responsive Design

Optimized for all screen sizes:
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Sticky sidebar navigation on desktop
- Collapsible menu on mobile
- Touch-friendly interactive elements

## Animation & Interactions

A sophisticated animation stack combining multiple libraries for polished, performant interactions:

### Framer Motion Implementation
- **Page Transitions**: `AnimatePresence` for smooth component mount/unmount animations
- **Scroll-triggered Animations**: Reveal animations as sections come into view
- **Gesture Recognition**: Tap and hover effects on interactive elements
- **Staggered Lists**: Sequential animations for timeline and project items
- **Layout Animations**: Responsive animations that adapt to screen size changes

### GSAP & Lenis Smooth Scroll
- **Smooth Scrolling**: Lenis provides butter-smooth scroll velocity
- **GSAP Timeline Animations**: Complex, coordinated animations along scroll progress
- **Parallax Effects**: Background and foreground movement at different speeds
- **Scroll-synced Animations**: Gallery animations tied to scroll position
- **Performance**: Hardware-accelerated animations with GPU optimization

### 3D Graphics Integration
- **Galaxy Background**: Animated Three.js scene with particles
- **Computer 3D Model**: Interactive 3D model with mouse tracking
- **Post-Processing Effects**: Bloom, depth of field on 3D scenes
- **Responsive 3D**: Canvas scales with viewport, maintains performance

### Interactive Elements
- **Page Transitions**: Fade and slide animations between routes
- **Hover States**: Subtle scale and color transitions on buttons
- **Loading States**: Animated loaders during data fetching
- **Toast Notifications**: React Hot Toast with custom animations
- **Reveal Animations**: Intersection Observer-triggered content reveals

## Deployment

The site is optimized for **Vercel** deployment:

```bash
# Deploy to Vercel
vercel deploy
```

- Automatic builds on push
- Preview deployments for pull requests
- Integrated analytics and performance monitoring
- Serverless functions for API routes and server actions

## Key Libraries & Their Use Cases

### Framer Motion - Motion Library
Used throughout the portfolio for component animations and interactions:
- **Reveal Components**: Animations trigger when elements enter viewport
- **Page Transitions**: Smooth animations between routes
- **Hover Effects**: Interactive feedback on buttons, links, and cards
- **Staggered Animations**: Sequential animations for lists and timelines
- **Gesture Support**: Drag, tap, and hover detection

**Example**: Hero section title animates in on page load with staggered text animations.

### Lenis - Smooth Scroll
Provides the silk-smooth scrolling experience across the portfolio:
- **Native Browser Behavior**: Smooth scrolling that feels native
- **Performance**: Optimized for 60fps scrolling
- **Scroll Events**: Calculates scroll velocity for physics-based animations
- **Integration**: Works seamlessly with GSAP for scroll-synced animations

**Example**: Content reveals and parallax effects synchronized with scroll position.

### GSAP - Advanced Animations
Handles complex, coordinated animations and timeline sequences:
- **Timeline Sequences**: Multiple animations coordinated together
- **Scroll Animations**: Animations driven by scroll progress
- **Morphing**: SVG morphing effects for icons and graphics
- **Text Animations**: Character-by-character animations
- **Easing**: Professional easing curves for natural motion

**Example**: Gallery items scale and rotate as you scroll past them.

### Three.js & React Three Fiber - 3D Graphics
Creates immersive 3D experiences:
- **Galaxy Background**: Animated particle system in hero section
- **3D Computer Model**: Interactive 3D model in projects section
- **Lighting & Materials**: Realistic lighting and material effects
- **Post-Processing**: Bloom effects, color grading, tone mapping

**Example**: The "Galaxy" component renders an interactive particle field with mouse interaction.

### MDX & Velite - Content Management
Powers the blog system with type-safe, compiled content:
- **Blog Posts**: Written in MDX with embedded React components
- **Build-time Compilation**: Content compiled at build time, not runtime
- **Type Safety**: Content schema validation with TypeScript
- **Performance**: Static content generation for optimal performance

**Example**: Blog posts can include interactive code snippets and custom components.

### Shadcn/UI & Radix UI - Component Library
Provides the foundation for all UI components:
- **Accessibility**: ARIA-compliant components
- **Customizable**: Built on Radix UI primitives, styled with Tailwind
- **Type-Safe**: Full TypeScript support
- **Copy-Paste**: Drop-in components you can customize

**Example**: Form inputs, modals, dropdowns all use Shadcn/UI components.

### React Icons - Icon System
Comprehensive icon library for UI elements:
- **Multiple Icon Sets**: Font Awesome, Material Design, Feather, etc.
- **SVG-based**: Crisp, scalable icons
- **Tree-shakeable**: Only imported icons are bundled
- **Simple API**: Easy icon inclusion: `<FaReact />`

**Example**: Technology stack displays skill icons, navigation uses icon buttons.

### Resend - Email API
Handles transactional emails reliably:
- **Contact Form Emails**: User messages sent via email
- **Email Templates**: Built with React Email components
- **Reliable Delivery**: Enterprise-grade email infrastructure
- **Tracking**: Delivery and open rate tracking

**Example**: Contact form submissions trigger emails to your inbox.

### Vercel Analytics & Speed Insights
Performance monitoring and user analytics:
- **Core Web Vitals**: Monitor LCP, INP, CLS metrics
- **User Analytics**: Track page views, interactions, user geography
- **Performance Optimization**: Identify slow pages and optimize
- **Real User Monitoring**: Actual user data, not synthetic tests

**Example**: Dashboard shows which pages users visit most and performance metrics.

### React Intersection Observer - Viewport Detection
Efficiently detects when elements enter/exit viewport:
- **Lazy Loading**: Load content only when visible
- **Animation Triggers**: Trigger animations on scroll
- **Performance**: Uses native Intersection Observer API
- **Responsive**: Works with any viewport size

**Example**: Blog post images lazy load as you scroll down the page.

## Features Powered by Multiple Libraries

### Hero Section
- **Framer Motion**: Title and description animations
- **Three.js**: Galaxy particle background
- **Lenis**: Smooth scroll integration
- **GSAP**: Advanced timing and easing

### Blog Section
- **Velite**: Content compilation and type safety
- **MDX**: Interactive code examples in posts
- **Rehype Plugins**: Syntax highlighting and auto-linking
- **Reading Time**: Automatic reading time estimation
- **React Icons**: Category and tag icons

### 3D Projects Section
- **Three.js & React Three Fiber**: 3D model rendering
- **React Three PostProcessing**: Visual effects
- **Framer Motion**: Scroll-triggered animations
- **GSAP**: Timeline effects and interactions

### Contact Section
- **React Hot Toast**: Notifications on form submit
- **Resend**: Email delivery
- **React Email**: Email template formatting
- **Framer Motion**: Form validation animations

## Development Tools

- **ESLint**: Code quality with custom rules
- **TypeScript**: Full type safety
- **Tailwind Intellisense**: IDE support for Tailwind classes
- **PostCSS**: Advanced CSS features

## License

This portfolio is personal work. Feel free to take inspiration from the design and architecture!

## Contributing

This is a personal portfolio, but feedback is welcome! Feel free to open issues or suggestions.

---

**Portfolio of Vishesh Tripathi** - Building beautiful, interactive web experiences with modern technologies.
