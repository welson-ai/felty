# Felty Project Structure - Visual Diagram

## Complete Project Structure

```
felty/
├── 📁 app/                          # Next.js App Router (Frontend Pages)
│   ├── 📁 api/                      # 🔌 API Routes (Backend)
│   │   ├── 📁 auth/                 # 🔐 Authentication
│   │   │   ├── 📄 login/route.ts    # 🚪 User login
│   │   │   ├── 📄 signup/route.ts   # 📝 User registration
│   │   │   └── 📄 reset-password/   # 🔑 Password reset
│   │   ├── 📁 badges/               # 🏆 Achievement system
│   │   │   └── 📄 [userId]/route.ts # 👤 User badges
│   │   └── 📁 stats/                # 📊 Statistics
│   │       └── 📄 [userId]/route.ts # 📈 User stats
│   ├── 📁 actions/                 # ⚡ Server Actions
│   │   ├── 📄 check-ins.ts        # 😊 Emotion tracking
│   │   ├── 📄 journal.ts           # 📔 Journal operations
│   │   ├── 📄 mood-posts.ts        # 💬 Mood wall posts
│   │   ├── 📄 organizations.ts    # 🏢 Org management
│   │   └── 📄 profile.ts          # 👤 Profile operations
│   ├── 📁 dashboard/               # 📋 Dashboard pages
│   │   ├── 📄 layout.tsx          # 🎨 Dashboard layout
│   │   └── 📄 page.tsx            # 🏠 Main dashboard
│   ├── 📁 journal/                 # 📔 Journal section
│   │   └── 📄 page.tsx            # 📝 Journal page
│   ├── 📁 mood-wall/               # 💬 Global mood wall
│   │   └── 📄 page.tsx            # 🌍 Mood wall page
│   ├── 📁 organizations/           # 🏢 Organizations
│   │   └── 📄 page.tsx            # 🏢 Org page
│   ├── 📁 profile/                 # 👤 User profile
│   │   └── 📄 page.tsx            # ⚙️ Profile settings
│   ├── 📁 therapists/              # 👨‍⚕️ Therapists
│   │   └── 📄 page.tsx            # 🩺 Therapist page
│   ├── 📁 about/                   # ℹ️ About page
│   │   └── 📄 page.tsx            # 📖 About info
│   ├── 📁 login/                   # 🔐 Login page
│   │   └── 📄 page.tsx            # 🚪 Login form
│   ├── 📁 signup/                  # 📝 Signup page
│   │   └── 📄 page.tsx            # 📋 Registration
│   ├── 📄 globals.css             # 🎨 Global styles
│   ├── 📄 layout.tsx              # 🏗️ Root layout
│   └── 📄 page.tsx                # 🏠 Home page
│
├── 📁 components/                  # 🧩 React Components
│   ├── 📁 ui/                     # 🎨 Base UI (shadcn/ui)
│   │   ├── 📄 accordion.tsx        # 📁 Accordion
│   │   ├── 📄 alert-dialog.tsx     # ⚠️ Alert dialogs
│   │   ├── 📄 button.tsx           # 🔘 Buttons
│   │   ├── 📄 card.tsx             # 🃏 Cards
│   │   ├── 📄 input.tsx            # 📝 Input fields
│   │   ├── 📄 modal.tsx            # 🪟 Modals
│   │   ├── 📄 form.tsx             # 📋 Forms
│   │   ├── 📄 table.tsx            # 📊 Tables
│   │   ├── 📄 chart.tsx            # 📈 Charts
│   │   └── 📄 [40+ more...]       # 🧩 More UI components
│   ├── 📄 app-nav.tsx              # 🧭 App navigation
│   ├── 📄 check-in-modal.tsx       # 😊 Check-in modal
│   ├── 📄 mood-stats.tsx           # 📊 Mood statistics
│   ├── 📄 badges-display.tsx       # 🏆 Badge display
│   └── 📄 theme-provider.tsx       # 🌓 Theme provider
│
├── 📁 contracts/                  # ⛓️ Smart Contracts
│   ├── 📁 stellar/                 # 🌟 Stellar contracts
│   │   ├── 📄 rewards.ts           # 💰 XLM rewards
│   │   ├── 📄 achievements.ts      # 🏆 Achievements
│   │   ├── 📄 identity.ts          # 🔐 Identity/ZK
│   │   └── 📁 deployment/          # 🚀 Deployment
│   │       ├── 📄 deploy.ts        # 📦 Deploy script
│   │       └── 📄 config.ts        # ⚙️ Configuration
│   ├── 📄 README.md               # 📖 Contract docs
│   └── 📄 package.json            # 📦 Dependencies
│
├── 📁 docs/                       # 📚 Documentation
│   ├── 📄 ARCHITECTURE.md          # 🏗️ System architecture
│   ├── 📄 PROJECT_STRUCTURE.md     # 📁 Project structure
│   └── 📄 SYSTEM_DIAGRAMS.md      # 🎨 Visual diagrams
│
├── 📁 hooks/                      # 🎣 Custom Hooks
│   ├── 📄 use-auth.ts             # 🔐 Authentication
│   ├── 📄 use-mobile.ts           # 📱 Mobile detection
│   └── 📄 use-toast.ts            # 🍞 Toast notifications
│
├── 📁 lib/                        # 🔧 Utility Libraries
│   ├── 📄 db.ts                  # 🗄️ Database connection
│   └── 📄 utils.ts               # 🛠️ Utility functions
│
├── 📁 public/                     # 🌐 Static Assets
│   ├── 🖼️ icon.svg               # 🎨 App icon
│   ├── 🖼️ placeholder-logo.png     # 🏢 Logo placeholder
│   ├── 🖼️ placeholder-user.jpg     # 👤 User placeholder
│   └── 🖼️ [other assets...]      # 📁 More assets
│
├── 📁 scripts/                    # 📜 Database Scripts
│   ├── 📄 01-init-schema.sql      # 🗄️ Database schema
│   └── 📄 02-seed-data.sql        # 🌱 Seed data
│
├── 📁 styles/                     # 🎨 Styles
│   └── 📄 globals.css            # 🌈 Global CSS
│
├── 🔧 .env                        # 🔑 Environment variables
├── 🔧 .env.example               # 📋 Environment template
├── 🔧 .gitignore                 # 🚫 Git ignore
├── 🔧 components.json            # ⚙️ shadcn/ui config
├── 🔧 next.config.mjs            # ⚙️ Next.js config
├── 📦 package.json               # 📦 Dependencies
├── 🔒 pnpm-lock.yaml            # 🔒 Lock file
├── ⚙️ postcss.config.mjs         # ⚙️ PostCSS config
├── ⚙️ tsconfig.json             # ⚙️ TypeScript config
└── 📖 README.md                  # 📖 Project documentation
```

## Data Flow Diagram

```
🌐 USER INTERACTION
        │
        ▼
┌─────────────────┐
│   WEB APP      │
│   (React)      │
│                 │
│ 📱 User Forms  │
│ 🎨 UI Updates  │
│ 🔄 State Mgmt  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   NEXT.JS      │
│   SERVER       │
│                 │
│ 🍪 Cookies     │
│ 🔐 JWT Auth     │
│ 🛡️ Middleware  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   API ROUTES    │
│                 │
│ ✅ Validation   │
│ 💼 Business    │
│    Logic       │
│ 📝 CRUD Ops     │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   DATABASE      │
│   (Neon PG)    │
│                 │
│ 🗄️ Users        │
│ 😊 Emotions     │
│ 📔 Journals     │
│ 🏢 Organizations│
│ 🏆 Achievements │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   STELLAR       │
│   BLOCKCHAIN    │
│                 │
│ 💰 XLM Rewards  │
│ 🔐 ZK Proofs    │
│ ⛓️ Smart        │
│    Contracts    │
│ 🏅 NFTs         │
└─────────────────┘
```

## Component Hierarchy

```
🏗️ APP STRUCTURE
├── 📱 Layout
│   ├── 🧭 AppNav
│   ├── 🌓 ThemeProvider
│   └── 🍞 Toaster
├── 🔐 Auth
│   ├── 🚪 LoginPage
│   ├── 📝 SignupPage
│   └── 🛡️ AuthGuard
├── 📋 Dashboard
│   ├── 📊 MoodStats
│   ├── 😊 CheckInModal
│   └── 🏆 BadgesDisplay
├── 📔 Journal
│   ├── ✍️ JournalEditor
│   ├── 📝 EntryList
│   └── 🏷️ TagManager
├── 💬 MoodWall
│   ├── 📱 PostCard
│   ├── 💭 CommentSection
│   └── ❤️ LikeButton
├── 👤 Profile
│   ├── ⚙️ SettingsForm
│   ├── 📊 ProfileStats
│   └── 🏆 AchievementList
└── 🏢 Organizations
    ├── 🏢 OrgCard
    ├── 👥 MemberList
    └── 📊 OrgAnalytics
```

## Technology Stack

```
🎨 FRONTEND
├── ⚛️ React 19
├── 🚀 Next.js 14 (App Router)
├── 📘 TypeScript
├── 🎨 Tailwind CSS
├── 🧩 shadcn/ui
├── 🎯 Zustand (State)
├── 🍞 Sonner (Toasts)
└── 📊 Recharts (Charts)

🔧 BACKEND
├── 🚀 Next.js API Routes
├── 🔐 JWT Authentication
├── 🗄️ Neon PostgreSQL
├── ✅ Zod Validation
├── 🍪 HTTP-Only Cookies
└── 🛡️ Security Middleware

⛓️ BLOCKCHAIN
├── 🌟 Stellar Network
├── 💰 XLM Rewards
├── 🔐 Zero-Knowledge Proofs
├── ⛓️ Smart Contracts
├── 🏅 NFT Badges
└── 🔑 Soroban SDK

🚀 DEPLOYMENT
├── ⚡ Vercel
├── 🌐 Edge Network
├── 📦 Serverless Functions
├── 🗄️ Neon Database
├── 📊 Analytics
└── 🔔 Monitoring
```
