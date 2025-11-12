# VINA WPC

A modern, responsive landing page for a Vietnamese wood-plastic composite (WPC) company. Built with Next.js 15 and featuring an integrated CMS for easy content management.

## Tech Stack

- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest React features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **DaisyUI** - Semantic component library
- **Decap CMS** - Git-based headless CMS for content management
- **Netlify Identity** - Authentication for admin access
- **Inter Font** - Vietnamese-optimized typography

## Getting Started

### Development

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

**Note:** Development server runs on [http://localhost:3000](http://localhost:3000)

### Production Build & Preview

```bash
npm run preview      # Build and serve static site (port 3002)
npm run serve        # Serve pre-built static site
npm run clean        # Clean build directories
```

## Content Management (CMS)

This project uses **Decap CMS** (formerly Netlify CMS) for easy content management without touching code.

### Accessing the Admin Panel

1. **Local Development**: Navigate to `http://localhost:3000/admin`
2. **Production**: Navigate to `https://your-domain.com/admin`
3. **Authentication**: Login via Netlify Identity

### What You Can Manage

#### Blog Posts (`Bài viết Blog`)
- Title, date, and category
- Featured image
- Short excerpt
- Full markdown content
- Publish/draft status

#### Products (`Sản phẩm`)
- Product name and description
- Collection categories (Sàn WPC, Ốp Tường, Hàng Rào, etc.)
- Technical specifications
- Image gallery
- Price (VND/m²)
- Suitable rooms
- Available colors with hex codes
- Dimensions

### Content Storage

- **Blog content**: `content/blog/`
- **Product content**: `content/products/`
- **Images**: `public/images/`

All content is stored as markdown files with frontmatter, committed to Git, and version-controlled.

### CMS Configuration

The CMS is configured in `public/admin/config.yml` with:
- Vietnamese interface (`locale: 'vi'`)
- Git Gateway backend
- Custom content models for blog and products
- Image upload handling
- SEO-friendly slugs with Vietnamese diacritics

## Project Structure

```
├── content/                # CMS-managed content
│   ├── blog/               # Blog posts (markdown)
│   └── products/           # Product data (markdown)
├── public/
│   ├── admin/              # Decap CMS admin interface
│   │   ├── index.html      # CMS entry point
│   │   └── config.yml      # CMS configuration
│   └── images/             # Uploaded media files
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global styles and design tokens
│   │   ├── layout.tsx      # Root layout (Vietnamese)
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── sections/       # Hero, Features, CTA sections
│   │   └── marketing/      # Testimonials, Pricing, Social proof
│   └── lib/                # Utilities and helpers
│       ├── utils.ts        # Common utilities (cn helper)
│       └── design-tokens.ts # Design system tokens
└── scripts/
    └── generate-static-data.js # Pre-build data generation
```

## Key Features

### Git-Based CMS
- Content versioning through Git
- Editorial workflow with Netlify Identity
- Vietnamese-friendly content editor
- Image asset management
- No database required

### Vietnamese Localization
- Full Vietnamese language support
- Inter font with Vietnamese diacritics
- Vietnamese currency formatting (đ)
- Optimized for Vietnamese SEO

### Responsive Design
- Mobile-first approach
- Flexible layouts using Tailwind utilities
- Support for mobile (320px+), tablet (768px+), desktop (1024px+)
- Single responsive codebase

### Design System
- Token-based design system in `src/lib/design-tokens.ts`
- Primary colors: Green (#3C5F3E), Orange (#F57F41)
- Semantic components via DaisyUI
- Consistent spacing and typography scales

### Performance
- Static site generation for fast loading
- Optimized images with Next.js Image component
- Turbopack for fast development builds
- Production-ready code splitting

## Development Guidelines

### Content Management Workflow

1. **Access Admin**: Go to `/admin` and login
2. **Create/Edit Content**: Use the visual editor for blog posts or products
3. **Save**: Content is committed to Git automatically
4. **Build**: Changes appear after next build/deployment

### Component Organization
- **UI Components**: Reusable base components in `src/components/ui/`
- **Layout Components**: Headers, footers, navigation in `src/components/layout/`
- **Section Components**: Landing page sections in `src/components/sections/`

### Styling Approach
1. **DaisyUI First**: Use semantic classes (`btn`, `card`, `hero`, `navbar`)
2. **Design Tokens**: Leverage CSS custom properties from `globals.css`
3. **Responsive Utilities**: Use Tailwind breakpoints (`lg:`, `md:`, `sm:`)
4. **CSS Layers**: Organize custom styles in `@layer base`, `@layer components`, `@layer utilities`

### Path Aliases
- `@/*` → `./src/*`
- `@/components` → UI components
- `@/lib` → Utilities and helpers
- `@/app` → Pages and layouts

## Code Quality

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for code formatting with Tailwind plugin
- Semantic HTML with accessibility support

## Deployment

### Netlify (Recommended)
1. Connect repository to Netlify
2. Enable Netlify Identity for CMS authentication
3. Enable Git Gateway in Netlify Identity settings
4. Build command: `npm run build`
5. Publish directory: `out`

### Environment Variables
```bash
# Netlify site URL (automatically set by Netlify)
SITE_URL=https://your-site.netlify.app
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)

## Additional Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines and best practices.
