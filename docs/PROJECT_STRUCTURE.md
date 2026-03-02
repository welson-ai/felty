# Project Structure

```
felty/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/           # User login
│   │   │   │   └── route.ts
│   │   │   ├── signup/          # User registration
│   │   │   │   └── route.ts
│   │   │   └── reset-password/  # Password reset
│   │   │       └── route.ts
│   │   ├── badges/              # Badge system
│   │   │   └── [userId]/
│   │   │       └── route.ts
│   │   └── stats/               # User statistics
│   │       └── [userId]/
│   │           └── route.ts
│   ├── actions/                  # Server actions
│   │   ├── check-ins.ts         # Emotion check-in logic
│   │   ├── journal.ts           # Journal entry operations
│   │   ├── mood-posts.ts        # Mood wall posts
│   │   ├── organizations.ts      # Organization management
│   │   └── profile.ts           # User profile operations
│   ├── dashboard/                # Dashboard pages
│   │   ├── layout.tsx           # Dashboard layout
│   │   └── page.tsx            # Main dashboard
│   ├── journal/                  # Journal pages
│   │   └── page.tsx
│   ├── mood-wall/               # Global mood wall
│   │   └── page.tsx
│   ├── organizations/            # Organizations page
│   │   └── page.tsx
│   ├── profile/                 # User profile
│   │   └── page.tsx
│   ├── therapists/              # Therapists page
│   │   └── page.tsx
│   ├── about/                   # About page
│   │   └── page.tsx
│   ├── login/                   # Login page
│   │   └── page.tsx
│   ├── signup/                  # Signup page
│   │   └── page.tsx
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button-group.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── empty.tsx
│   │   ├── field.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-group.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── item.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── spinner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── app-nav.tsx              # App navigation
│   ├── badges-display.tsx       # Badge display component
│   ├── check-in-modal.tsx       # Check-in modal
│   ├── mood-stats.tsx           # Mood statistics
│   └── theme-provider.tsx       # Theme provider
├── contracts/                    # Smart contracts
│   ├── stellar/                 # Stellar smart contracts
│   │   ├── rewards.ts           # Reward distribution contract
│   │   ├── achievements.ts      # Achievement tracking contract
│   │   ├── identity.ts          # Identity verification contract
│   │   └── deployment/          # Deployment scripts
│   │       ├── deploy.ts        # Deployment script
│   │       └── config.ts        # Configuration
│   ├── README.md                # Smart contracts documentation
│   └── package.json            # Contract dependencies
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md         # System architecture
│   ├── API.md                   # API documentation
│   └── DEPLOYMENT.md            # Deployment guide
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
├── lib/                         # Utility libraries
│   ├── db.ts                    # Database connection and queries
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   ├── icon.svg                 # App icon
│   ├── icon-dark-32x32.png      # Dark mode icon
│   ├── icon-light-32x32.png     # Light mode icon
│   ├── apple-icon.png           # Apple touch icon
│   ├── placeholder-logo.png     # Placeholder logo
│   ├── placeholder-logo.svg     # Placeholder logo SVG
│   ├── placeholder-user.jpg      # Placeholder user image
│   ├── placeholder.jpg          # General placeholder
│   └── placeholder.svg          # General placeholder SVG
├── scripts/                     # Database and utility scripts
│   ├── 01-init-schema.sql       # Database schema initialization
│   └── 02-seed-data.sql         # Seed data
├── styles/                      # Additional styles
│   └── globals.css              # Global CSS styles
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── components.json              # shadcn/ui component configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Node.js dependencies and scripts
├── pnpm-lock.yaml              # pnpm lock file
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Key Directories Explained

### `/app` - Next.js App Router
- Contains all pages and API routes using Next.js 13+ App Router
- API routes handle backend logic (auth, data operations)
- Pages are organized by feature (dashboard, journal, profile, etc.)

### `/components` - React Components
- `/ui` contains reusable UI components from shadcn/ui
- Root level contains feature-specific components
- All components use TypeScript and follow consistent patterns

### `/contracts` - Smart Contracts
- Stellar smart contracts for rewards and achievements
- Deployment scripts and configuration
- Integration with Stellar network for blockchain features

### `/lib` - Core Libraries
- Database connection and query functions
- Utility functions and helpers
- Shared business logic

### `/hooks` - Custom React Hooks
- Reusable stateful logic
- Authentication, mobile detection, notifications
- Follows React best practices

### `/docs` - Documentation
- System architecture diagrams
- API documentation
- Deployment and setup guides

### `/scripts` - Database Scripts
- SQL schema definitions
- Seed data for development
- Database migration scripts

## File Naming Conventions

- **Pages**: `page.tsx` (App Router convention)
- **API Routes**: `route.ts` (App Router convention)
- **Components**: `PascalCase.tsx`
- **Hooks**: `kebab-case.ts`
- **Utilities**: `kebab-case.ts`
- **Styles**: `kebab-case.css`

## Import Patterns

```typescript
// External libraries
import { useState } from 'react';
import { NextRequest } from 'next/server';

// Internal imports (absolute paths)
import { Button } from '@/components/ui/button';
import { query } from '@/lib/db';
import { CheckInModal } from '@/components/check-in-modal';

// Type imports
import type { User } from '@/types/user';
```

## Environment Configuration

- `.env.example` - Template with all required variables
- `.env` - Local development environment
- Production variables set in Vercel dashboard
- Database connection via Neon PostgreSQL
- JWT secrets for authentication
