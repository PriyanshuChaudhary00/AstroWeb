# Design Guidelines: Premium Astrology E-Commerce Website

## Design Direction
**Reference-Based Approach**: Replicate the exact visual design, typography, spacing, and layout style from the provided reference image showing a premium spiritual/astrology aesthetic with deep blue background and golden accents.

## Core Design Principles
- **Ultra-Premium Minimalism**: Clean, uncluttered layouts with generous whitespace
- **Spiritual-Modern Fusion**: Balance traditional astrology imagery with contemporary web design
- **Perfect Alignment**: Every element precisely positioned with strong visual rhythm
- **High Readability**: Clear typography hierarchy throughout all sections

## Color Palette
- **Primary Deep Blue**: #1a1a3e (backgrounds, headers)
- **Gold Accent**: #d4af37 (CTAs, highlights, borders)
- **Warm Beige**: #f5f1e8 (secondary backgrounds, cards)
- **Soft Warm Tones**: Supporting palette for spiritual feel

## Typography System
- **Elegant Serif**: Headings and emphasis (Playfair Display or Cormorant Garamond via Google Fonts)
- **Clean Sans-Serif**: Body text and UI elements (Poppins or Inter via Google Fonts)
- **Strong Hierarchy**: Clear differentiation between H1 (48-64px), H2 (36-48px), H3 (24-32px), body (16-18px)
- **Golden Ratio Scaling**: Harmonious size relationships across text elements

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 24, and 32 (e.g., p-4, m-8, gap-12, py-24)
- Consistent section padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Card padding: p-6 to p-8
- Grid gaps: gap-6 to gap-8 for product grids

## Component Library

### Navigation
- Premium header with logo, mega menu for product categories, account/cart icons
- Mobile: Elegant hamburger menu with smooth slide-in drawer
- Sticky navigation with subtle shadow on scroll

### Hero Section
- Full-width, 85vh height with spiritual background image (celestial/cosmic theme)
- Centered headline with gold accent underline
- Subheadline and primary CTA with blurred background button
- Subtle floating animation on decorative elements

### Product Grids
- 4-column desktop (lg:grid-cols-4), 2-column tablet (md:grid-cols-2), 1-column mobile
- Product cards: white background, soft shadow (shadow-lg), rounded corners (rounded-xl)
- Hover effect: Subtle lift (translate-y-1) and shadow expansion
- Clean product image, title, price in gold, certification badge icon

### Product Detail Pages
- 2-column layout: Image gallery left (with thumbnail navigation), details right
- Multiple product images with smooth transition
- Certification badges with icons (Heroicons)
- Benefits list with checkmark icons
- Prominent "Add to Cart" (gold) and "Buy Now" (deep blue) buttons
- Clean specifications table

### Shopping Cart & Checkout
- Slide-in cart drawer from right
- Item cards with quantity controls, remove button
- Clear subtotal display with gold accent
- Checkout page: 2-column (form + order summary)
- Razorpay integration styling matches brand

### Blog System
- Masonry or 3-column grid for article listing (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Featured image, category tag (gold), title, excerpt, read time
- Individual blog: Max-width prose (max-w-3xl), generous line height (leading-relaxed)
- Category filters with pill-style buttons

### Appointment Booking
- Calendar interface with available dates highlighted in gold
- Time slot selection grid
- Astrologer profile card with image, credentials, specialty
- Booking summary with Razorpay payment

### Testimonials
- Slider/carousel with 1-3 testimonials visible
- Star ratings in gold, customer photo, quote with elegant quote marks
- Navigation arrows with subtle hover states

### Trust Section
- 3-4 column grid with icons (certifications, authenticity, quality)
- Icon, headline, short description per column
- Soft background contrast

### Forms (Contact, Newsletter)
- Clean input fields with subtle borders, focus state with gold accent
- Floating labels or top-aligned labels
- WhatsApp button with brand green, phone/email with icons
- Embedded Google Maps with branded pin

### Footer
- 4-column layout: About, Quick Links, Policies, Social & Newsletter
- Deep blue background with lighter text
- Social icons with gold hover state
- Newsletter input with gold submit button

## Icons & Assets
**Icon Library**: Heroicons (outline style via CDN)
- Use sparingly and purposefully
- Golden color for accent icons
- Consistent 24px size standard

## Images
- **Hero Background**: Cosmic/celestial spiritual imagery with mystical feel (stars, galaxies, mandala patterns)
- **Product Photos**: High-quality white background images, multiple angles per product
- **About Page**: Professional astrologer portrait, certification images
- **Blog Headers**: Spiritual/astrology themed featured images
- **Trust Badges**: Certification logos, authenticity seals

## Visual Effects
- **Soft Shadows**: shadow-md for cards, shadow-lg on hover
- **Smooth Transitions**: transition-all duration-300 on interactive elements
- **Minimal Animations**: Subtle fade-ins on scroll, gentle hover lifts
- **Micro-interactions**: Button scale on click (scale-95), input focus glow

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack columns on mobile, expand to multi-column on larger screens
- Touch-friendly hit areas (min 44px) on mobile

## Brand Consistency
Every page maintains the spiritual-modern aesthetic: deep blue foundations, gold accents, elegant serif headlines, generous whitespace, premium polish with soft shadows, and balanced composition creating a cohesive, trustworthy, luxurious astrology shopping experience.