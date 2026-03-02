# Felty System Architecture - Visual Diagrams

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           FELTY EMOTIONAL WELLNESS PLATFORM                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │             │    │             │    │             │    │             │   │
│  │   WEB APP   │◄──►│  NEXT.JS    │◄──►│   API       │◄──►│  NEON DB    │   │
│  │             │    │   SERVER    │    │  ROUTES     │    │  POSTGRESQL  │   │
│  │             │    │             │    │             │    │             │   │
│  │ - React     │    │ - Auth      │    │ - JWT       │    │ - Users      │   │
│  │ - TypeScript│    │ - Sessions  │    │ - Validation│    │ - Emotions  │   │
│  │ - Tailwind  │    │ - Cookies   │    │ - Business  │    │ - Journals  │   │
│  │ - State Mgmt│    │ - Middleware│    │   Logic     │    │ - Orgs      │   │
│  │             │    │             │    │             │    │ - Analytics  │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│         │                   │                   │                   │           │
│         │                   │                   │                   │           │
│         ▼                   ▼                   ▼                   ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │             │    │             │    │             │    │             │   │
│  │   BROWSER   │    │   VERCEL    │    │   STELLAR   │    │   ANALYTICS │   │
│  │   CLIENT    │    │  DEPLOYMENT │    │  BLOCKCHAIN │    │  MONITORING │   │
│  │             │    │             │    │             │    │             │   │
│  │ - Cookies   │    │ - Edge Net  │    │ - XLM       │    │ - Metrics   │   │
│  │ - Local     │    │ - CDN       │    │ - ZK Proofs │    │ - Logs      │   │
│  │   Storage   │    │ - Serverless│    │ - Smart     │    │ - Alerts    │   │
│  │ - Session   │    │ - Global    │    │   Contracts │    │ - Health    │   │
│  │   Mgmt      │    │   Reach     │    │ - Rewards   │    │   Checks    │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow Diagram

```
┌─────────────┐     1. Login Request      ┌─────────────┐     2. Validate      ┌─────────────┐
│             │─────────────────────────►│             │─────────────────────►│             │
│   USER      │                        │   API AUTH  │                     │  DATABASE   │
│   BROWSER   │                        │   ROUTE     │                     │             │
│             │                        │             │                     │  - Users    │
│ - Email     │                        │ - JWT Gen   │                     │  - Sessions│
│ - Password  │                        │ - Validation│                     │  - Profiles │
│ - Form      │                        │ - Cookies   │                     │             │
└─────────────┘                        └─────────────┘                     └─────────────┘
       │                                       │                                   │
       │          5. JWT Token + Cookie          │                                   │
       │◄───────────────────────────────────────│                                   │
       │                                       │                                   │
       │                                       │          3. User Data              │
       │                                       │◄──────────────────────────────────│
       │                                       │                                   │
       │                                       │                                   │
       ▼                                       ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        SECURE SESSION MANAGEMENT                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                     HTTP-ONLY SECURE COOKIE                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   JWT       │  │   USER ID   │  │   EXPIRY   │  │   SAME     │  │ │
│  │  │   TOKEN     │  │   CLAIM     │  │   TIME      │  │   SITE     │  │ │
│  │  │             │  │             │  │             │  │   LAX      │  │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │    │             │
│   USER      │    │  FRONTEND   │    │  BACKEND    │    │  DATABASE   │    │  STELLAR    │
│   ACTION    │───►│   CLIENT    │───►│   API       │───►│   LAYER     │───►│  BLOCKCHAIN │
│             │    │             │    │   ROUTES    │    │             │    │             │
│             │    │             │    │             │    │             │    │             │
│ - Emotion   │    │ - Form      │    │ - Input     │    │ - SQL       │    │ - XLM       │
│   Log       │    │   Submit    │    │   Validation│    │   Queries   │    │   Rewards   │
│ - Journal   │    │ - API Call  │    │ - Auth      │    │ - Inserts   │    │ - ZK Proofs │
│   Entry     │    │ - State     │    │   Check     │    │ - Updates   │    │ - NFTs      │
│ - Profile   │    │   Mgmt      │    │ - Business  │    │ - Joins     │    │ - Tokens    │
│   Update    │    │ - UI Update │    │   Logic     │    │ - Indexes   │    │ - Contracts │
│             │    │             │    │ - Response  │    │ - Transact   │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
         │                   │                   │                   │                   │
         │                   │                   │                   │                   │
         ▼                   ▼                   ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           DATA INTEGRITY LAYER                                │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   INPUT     │  │   BUSINESS  │  │   PERSIST   │  │   BLOCKCHAIN│     │
│  │ VALIDATION │  │   LOGIC     │  │   LAYER     │  │   VERIFICATION│   │
│  │             │  │             │  │             │  │             │     │
│  │ - Zod Schemas│  │ - Rules     │  │ - ACID      │  │ - Consensus │     │
│  │ - Type Check │  │ - Workflows │  │ - Transactions│  │ - Immutability│   │
│  │ - Sanitization│  │ - Calculations│  │ - Rollbacks │  │ - Audit Trail│   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           MULTI-LAYER SECURITY                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        FRONTEND SECURITY                                 │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   INPUT     │  │     XSS     │  │     CSRF    │  │   CONTENT   │  │ │
│  │  │ VALIDATION │  │ PROTECTION  │  │ PROTECTION  │  │ SECURITY   │  │ │
│  │  │             │  │             │  │             │  │   POLICY    │  │ │
│  │  │ - Client    │  │ - Sanitize  │  │ - Tokens    │  │ - CSP       │  │ │
│  │   Validation │  │ - Escape    │  │ - SameSite  │  │ - Headers   │  │ │
│  │ - Type Check │  │ - DOM Purify│  │ - Secure    │  │ - Frame     │  │ │
│  │ - Length     │  │ - Reflected │  │   Cookies   │  │   Options   │  │ │
│  │   Limits     │  │   XSS       │  │ - Origin    │  │             │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        BACKEND SECURITY                                  │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │     JWT     │  │   RATE      │  │     SQL     │  │   API       │  │ │
│  │  AUTHENTICATION│  │ LIMITING    │  │ INJECTION   │  │ SECURITY    │  │ │
│  │  │             │  │             │  │ PROTECTION  │  │             │  │ │
│  │  │ - Tokens    │  │ - Requests  │  │ - Prepared  │  │ - CORS      │  │ │
│  │  │ - Signatures│  │   per IP    │  │   Statements│  │ - Headers   │  │ │
│  │  │ - Expiry    │  │ - Time      │  │ - ORM       │  │ - Auth      │  │ │
│  │  │ - Refresh   │  │   Windows   │  │ - Parameter │  │   Guards    │  │ │
│  │  │ - Rotation  │  │ - Burst     │  │   Binding   │  │ - RBAC      │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                      BLOCKCHAIN SECURITY                                  │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   ZERO      │  │   STELLAR   │  │   SMART     │  │   CRYPTO   │  │ │
│  │  KNOWLEDGE    │  │  NETWORK    │  │ CONTRACTS   │  │ SECURITY   │  │ │
│  │  PROOFS       │  │             │  │             │  │             │  │ │
│  │  │             │  │ - Consensus │  │ - Audited   │  │ - Hashing   │  │ │
│  │  - Anonymity │  │ - Finality  │  │ - Verified  │  │ - Encryption│  │ │
│  │  - Privacy   │  │ - Immutability│  │ - Upgradable│  │ - Signatures│  │ │
│  │  - Verifiable │  │ - Decentralized│  │ - Multi-sig │  │ - Key Mgmt  │  │ │
│  │  - Proofs    │  │ - Security  │  │ - Time-locks│  │ - HSM       │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND COMPONENTS                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        LAYER COMPONENTS                                  │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   APP NAV   │  │   THEME     │  │   LAYOUT    │  │   AUTH      │  │ │
│  │  │   BAR       │  │ PROVIDER   │  │ WRAPPER     │  │ GUARD      │  │ │
│  │  │             │  │             │  │             │  │             │  │ │
│  │  │ - Menu      │  │ - Dark/Light│  │ - Header    │  │ - Protected │  │ │
│  │  │ - Profile   │  │ - Themes    │  │ - Sidebar   │  │   Routes   │  │ │
│  │  │ - Settings  │  │ - Context   │  │ - Footer    │  │ - Redirects │  │ │
│  │  │ - Logout    │  │ - Global    │  │ - Container │  │ - Session   │  │ │
│  │  │ - Mobile    │  │   State     │  │ - Grid      │  │   Check    │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                      FEATURE COMPONENTS                                   │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │  CHECK-IN   │  │   JOURNAL   │  │   MOOD      │  │   PROFILE   │  │ │
│  │  │   MODAL     │  │   EDITOR    │  │   WALL      │  │ SETTINGS   │  │ │
│  │  │             │  │             │  │             │  │             │  │ │
│  │  │ - Emotion   │  │ - Rich Text │  │ - Feed      │  │ - User Info │  │ │
│  │  │   Selector  │  │ - Markdown  │  │ - Posts     │  │ - Preferences│  │ │
│  │  │ - Intensity  │  │ - Media     │  │ - Comments  │  │ - Privacy   │  │ │
│  │  │ - Notes     │  │ - Tags      │  │ - Likes     │  │ - Security  │  │ │
│  │  │ - Submit    │  │ - Save      │  │ - Anonymous │  │ - Export   │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        UI COMPONENTS                                     │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   FORMS     │  │   CARDS     │  │   CHARTS    │  │   BADGES    │  │ │
│  │  │             │  │             │  │             │  │             │  │ │
│  │  │ - Input     │  │ - Mood Card │  │ - Line      │  │ - Achievement│  │ │
│  │  │ - Textarea  │  │ - User Card │  │ - Bar       │  │ - Progress  │  │ │
│  │  │ - Select    │  │ - Stat Card │  │ - Pie       │  │ - Rewards   │  │ │
│  │  │ - Checkbox  │  │ - Org Card  │  │ - Area      │  │ - Levels    │  │ │
│  │  │ - Radio     │  │ - Post Card │  │ - Scatter   │  │ - Milestones│  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        PRODUCTION DEPLOYMENT                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        VERCEL PLATFORM                                    │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   EDGE      │  │ SERVERLESS  │  │     CDN     │  │   EDGE      │  │ │
│  │  FUNCTIONS    │  │ FUNCTIONS  │  │             │  │ MIDDLEWARE  │  │ │
│  │  │             │  │             │  │             │  │             │  │ │
│  │  │ - Auth      │  │ - API Routes│  │ - Static    │  │ - Rate      │  │ │
│  │  │ - Redirects │  │ - SSR      │  │   Assets   │  │   Limiting  │  │ │
│  │  │ - Headers   │  │ - ISR       │  │ - Caching   │  │ - Geo       │  │ │
│  │  │ - Rewrites  │  │ - Image     │  │ - Compression│  │   Blocking  │  │ │
│  │  │ - Security  │  │   Optimize  │  │ - Global    │  │ - A/B       │  │ │
│  │   Headers    │  │ - Webhooks  │  │   Reach     │  │   Testing   │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                      EXTERNAL SERVICES                                   │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │    NEON     │  │   STELLAR   │  │   ANALYTICS │  │ MONITORING  │  │ │
│  │  DATABASE     │  │  NETWORK    │  │             │  │             │  │ │
│  │  │             │  │             │  │             │  │             │  │ │
│  │  │ - PostgreSQL│  │ - XLM       │  │ - User      │  │ - Uptime    │  │ │
│  │  │ - Pools     │  │ - ZK Proofs │  │   Behavior  │  │ - Errors    │  │ │
│  │  │ - Backups   │  │ - Smart     │  │ - Events    │  │ - Logs      │  │ │
│  │  │ - SSL       │  │   Contracts │  │ - Funnels   │  │ - Metrics   │  │ │
│  │  │ - Scaling   │  │ - Rewards   │  │ - Retention │  │ - Alerts    │  │ │
│  │  │ - Monitoring│  │ - Identity  │  │ - A/B Tests │  │ - Health    │  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```
