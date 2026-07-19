# LifeSolve AI — Frontend

A modern, community-driven platform where people can share life challenges, get AI-powered insights, and connect with others. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Overview

LifeSolve AI Frontend is a full-featured web application that provides:

- **Problem Sharing** — Post anonymous or public stories about challenges you're facing
- **AI Assistant** — Chat with an AI powered by Groq for instant support and advice
- **AI Problem Solver** — Get structured, thoughtful solutions for specific problems
- **Direct Messaging** — Private one-on-one conversations with other community members
- **Community Engagement** — React, comment, and interact with others' posts
- **Notifications** — Real-time alerts for comments, reactions, messages, and post updates

## Key Features

| Feature | Description |
|---------|-------------|
| **Anonymous Posting** | Share problems with or without revealing identity |
| **Reaction System** | Like, Love, or Sad reactions with optimistic UI updates |
| **Comments** | Full CRUD comments on any problem post |
| **AI Chat Assistant** | Conversational AI available 24/7 for emotional support |
| **AI Problem Solver** | Structured AI guidance for specific life challenges |
| **Direct Messages** | Real-time messaging between community members |
| **Notifications** | Bell icon with dropdown for comments, reactions, messages |
| **Image Upload** | Support for multiple images per problem via ImgBB |
| **Authentication** | Email/password and Google OAuth via Better Auth |
| **Responsive Design** | Fully responsive mobile-first UI |
| **Animated UI** | Framer Motion animations throughout |
| **Dark/Light** | Clean light theme with gradient accents |
| **Platform Stats** | Live dashboard with platform-wide activity metrics |
| **Category System** | 6 problem categories with visual tagging |
| **Priority Levels** | Low, Medium, High, Emergency priority indicators |
| **Search & Filter** | Search problems by keyword, filter by category, sort by date |
| **Session Management** | Persistent AI chat sessions with history |
| **Activity Charts** | 7-day daily activity bar charts |

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16.2** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **Better Auth** | Authentication (email/password + Google OAuth) |
| **MongoDB** | Database (via Mongoose on backend) |
| **clsx + tailwind-merge** | Conditional class name utility |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, HTML shell)
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Error boundary
│   ├── globals.css               # Global styles + Tailwind
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth API handler
│   │   └── upload/               # Image upload API (ImgBB)
│   └── (public)/                 # Route group with Navbar/Footer
│       ├── layout.tsx            # Public layout wrapper
│       ├── page.tsx              # Home/Landing page
│       ├── about/                # About page
│       ├── connect/              # Contact page
│       ├── problems/
│       │   ├── page.tsx          # Browse problems
│       │   ├── [id]/             # Problem detail
│       │   ├── create/           # Create problem
│       │   ├── manage/           # Manage own problems
│       │   └── solve/            # AI Problem Solver
│       ├── messages/             # Direct messages
│       └── chat/                 # AI Chat Assistant
│
├── components/
│   ├── home/                     # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── PlatformChart.tsx
│   │   ├── FeaturedProblems.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Categories.tsx
│   │   ├── AIShowcase.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── EmergencyBanner.tsx
│   │   └── CTA.tsx
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── notifications/
│   │   └── NotificationBell.tsx   # Notification dropdown
│   └── ui/                       # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── section.tsx
│       ├── SectionDivider.tsx
│       └── skeleton.tsx
│
├── lib/
│   ├── auth.ts                   # Server-side Better Auth config
│   ├── auth-client.ts            # Client-side auth client
│   ├── utils.ts                  # cn() utility
│   └── api/
│       ├── problems/problem.ts   # Problems, comments, reactions, stats API
│       ├── ai/ai.ts              # AI solver + chat API (streaming)
│       ├── messages/messages.ts   # Direct messaging API
│       └── notifications/notifications.ts  # Notifications API
│
└── types/
    └── index.ts                  # Shared TypeScript types
```

## Page Routes

| Route | Auth | Description |
|-------|------|-------------|
| `/` | No | Landing page with hero, stats, features, FAQ |
| `/login` | No | Sign in with email or Google |
| `/register` | No | Create account with email or Google |
| `/about` | No | About the platform |
| `/connect` | No | Contact form and info |
| `/problems` | No | Browse all problems with search/filter |
| `/problems/[id]` | No | Problem detail with reactions/comments |
| `/problems/create` | Yes | Create a new problem post |
| `/problems/manage` | Yes | Edit/delete own problems |
| `/problems/solve` | Yes | AI problem solver |
| `/messages` | Yes | Direct messages with other users |
| `/chat` | Yes | AI chat assistant |

## API Clients

All API calls are organized in `src/lib/api/` by domain:

- **Problem API** — CRUD operations, search, reactions, comments, stats
- **AI API** — Streaming chat/solver endpoints, session management
- **Messages API** — User list, conversations, direct messages
- **Notifications API** — Fetch, mark read, unread count

## Authentication

- Uses **Better Auth** with MongoDB adapter
- **Email/password** registration and login
- **Google OAuth** social login
- Session tokens are used for authenticated API calls to the backend
- `authClient.useSession()` React hook provides session state

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see backend README)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# Required variables:
#   MONGODB_URI
#   BETTER_AUTH_SECRET
#   BETTER_AUTH_URL
#   NEXT_PUBLIC_AUTH_URL
#   NEXT_PUBLIC_BACKEND_URL
#   GOOGLE_CLIENT_ID (optional)
#   GOOGLE_CLIENT_SECRET (optional)
#   IMGBB_API_KEY (for image uploads)

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `next dev` | Start development server with HMR |
| `npm run build` | `next build` | Production build |
| `npm start` | `next start` | Start production server |
| `npm run lint` | `eslint` | Run ESLint |

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Yes | — | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Yes | — | Auth encryption secret (32+ chars) |
| `BETTER_AUTH_URL` | Yes | — | Auth URL (usually frontend URL) |
| `NEXT_PUBLIC_AUTH_URL` | Yes | `http://localhost:3000` | Public auth URL |
| `NEXT_PUBLIC_BACKEND_URL` | No | `http://localhost:5000` | Backend API URL |
| `GOOGLE_CLIENT_ID` | No | — | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | — | Google OAuth client secret |
| `IMGBB_API_KEY` | No | — | ImgBB API key for image uploads |

## Design System

The UI uses a **teal and violet** gradient color scheme with:

- **Primary gradient:** `from-teal-500 to-violet-500`
- **Background:** White and `slate-50`
- **Cards:** White with `border-slate-200` and subtle shadows
- **Typography:** Geist Sans (default) and Geist Mono (code)
- **Animations:** Framer Motion with spring/tween transitions
- **Icons:** Lucide React icon set

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and not licensed for public distribution.
