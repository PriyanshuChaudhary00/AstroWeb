# Divine Astrology E-Commerce Platform

## Overview

Divine Astrology is a premium e-commerce platform for spiritual products and astrology services. The application offers authenticated gemstones, bracelets, rudraksha beads, yantras, rings, and spiritual remedies, along with personalized astrology consultations. The platform emphasizes authenticity, premium quality, and spiritual guidance through a modern, elegant user interface inspired by traditional astrology aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives for headless, accessible component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows premium astrology aesthetic with deep blue (#1a1a3e), gold accents (#d4af37), and warm beige tones
- Typography combines Playfair Display (serif) for headings and Inter (sans-serif) for body text
- Component structure uses Card-based layouts with elevation shadows and hover effects

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- No global client state management library - uses React hooks and local state
- Query client configured with infinite stale time and disabled refetching for stable data

**Form Handling**
- React Hook Form with Zod schema validation (@hookform/resolvers)
- Drizzle-Zod for database schema to validation schema conversion
- Form components integrate with Shadcn/ui form primitives

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- ESM module system (type: "module" in package.json)
- Custom middleware for request logging and JSON response capture
- Vite middleware integration for development server with HMR

**API Design**
- RESTful API structure under `/api` prefix
- Routes organized by resource type (products, blog, testimonials, appointments, orders)
- Query parameter filtering (e.g., category-based product filtering)
- Consistent error handling with appropriate HTTP status codes

**Development vs Production**
- Development: Vite dev server with middleware mode for SSR-like experience
- Production: Esbuild bundles server code, Vite builds client static assets
- Separate build outputs: `dist/public` for client, `dist/index.js` for server

### Data Storage

**Database Strategy**
- Drizzle ORM for type-safe database queries and schema management
- PostgreSQL dialect configuration (Neon serverless driver)
- Schema-first approach with shared TypeScript types between client and server
- Database schemas located in `shared/schema.ts` for reusability

**Data Models**
- Products: Categories (gemstones, bracelets, rudraksha, yantras, rings, remedies), pricing, certification status, images, benefits
- Blog Posts: Content, categories, metadata, slug-based routing
- Appointments: Booking system for astrology consultations
- Testimonials: Customer reviews and ratings
- Orders: E-commerce transaction records

**Current Implementation**
- In-memory storage implementation (MemStorage class) with seeded demo data
- Interface-based design (IStorage) allows seamless migration to database implementation
- UUIDs for entity identifiers using crypto.randomUUID()

### Authentication & Sessions

**Session Management**
- Express session middleware with connect-pg-simple for PostgreSQL session store
- Cookie-based authentication with secure session handling
- Session configuration in preparation for user authentication features

### External Dependencies

**UI & Component Libraries**
- @radix-ui/react-* (20+ component primitives): Accordion, Dialog, Dropdown, Navigation, Select, Toast, etc.
- class-variance-authority: Type-safe component variant styling
- cmdk: Command menu component
- embla-carousel-react: Touch-friendly carousel implementation
- lucide-react: Icon system
- react-icons: Additional icon sets (e.g., SiWhatsapp for social links)

**Database & ORM**
- @neondatabase/serverless: Serverless PostgreSQL driver
- drizzle-orm: Type-safe ORM
- drizzle-kit: Schema management and migrations
- drizzle-zod: Schema to validation conversion

**Utilities**
- date-fns: Date manipulation and formatting
- clsx & tailwind-merge: Conditional className utilities
- zod: Schema validation
- nanoid: Unique ID generation

**Build Tools**
- @vitejs/plugin-react: React Fast Refresh support
- esbuild: Server-side bundling for production
- tsx: TypeScript execution for development
- PostCSS with Tailwind CSS and Autoprefixer

**Development Tools (Replit-specific)**
- @replit/vite-plugin-runtime-error-modal: Error overlay
- @replit/vite-plugin-cartographer: Code navigation
- @replit/vite-plugin-dev-banner: Development banner

**APIs & Services**
- Google Fonts API: Playfair Display and Inter font families
- Payment processing integration anticipated (schema includes order management)
- Email service integration anticipated (contact forms, appointment confirmations)

**SEO & Metadata**
- Meta tags configured for Open Graph protocol
- Semantic HTML structure with proper heading hierarchy
- Favicon and mobile viewport configuration