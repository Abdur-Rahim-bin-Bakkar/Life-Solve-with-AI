# 🧡 LifeSolve AI — Frontend

> **A safe space to share life's problems and find real solutions.**

LifeSolve AI is a community-driven platform where people share life challenges, receive instant
AI-powered guidance, and connect with others who genuinely understand. This repository contains the
**Next.js frontend** that brings that experience to life.

---

## 📖 Description

LifeSolve AI helps people who are going through tough times — stress, anxiety, career doubts,
relationship issues, money worries, loneliness, and more. Instead of carrying a problem alone, users can:

1. **Share** what they're going through (anonymously if they prefer)
2. **Get AI-powered solutions** in seconds
3. **Connect** with a supportive community

The frontend is a modern, animated single-page experience with a fixed animated navbar, an interactive
hero carousel, a floating AI chat widget, and full-featured pages for problems, messaging, AI tools,
and notifications.

---

## 🎯 Overview

The LifeSolve AI Frontend is a complete web application built with **Next.js App Router**. It provides:

| Area | What it does |
|------|--------------|
| **🏠 Landing Page** | Animated hero carousel (auto-rotates + manual controls), stats, features, FAQ |
| **📝 Problems** | Browse, search, filter, create, manage community problem posts |
| **🤖 AI Problem Solver** | Structured AI guidance for specific life challenges (streaming) |
| **💬 AI Chat Assistant** | Conversational AI support with saved session history |
| **⚡ AI Quick Chat Widget** | Floating bottom-right chat box — ask anything, nothing is saved |
| **✉️ Direct Messages** | Private one-on-one conversations with community members |
| **🔔 Notifications** | Real-time alerts for comments, reactions, messages |
| **🔐 Authentication** | Email/password + Google OAuth via Better Auth |

---

## 🎯 Purpose

The purpose of LifeSolve AI is to make emotional and practical support **accessible, anonymous, and
immediate**. Anyone facing a life challenge can:

- **Ask anything** through the always-available AI quick chat widget and get an answer instantly.
- **Post anonymously** without fear of judgement.
- **Receive actionable AI insights** to break problems down and cope.
- **Find community** among people who have faced similar situations.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Animated Navbar** | Fixed navbar with slide-in animation and a flowing gradient border |
| **Hero Carousel** | 4-slide animated banner — auto-changes and user can change it manually |
| **AI Quick Chat Widget** | Floating bottom-right chat box; **messages are never stored in the database** |
| **AI Chat Assistant** | Full-page conversational AI with persistent session history |
| **AI Problem Solver** | Structured AI guidance for specific life challenges |
| **Anonymous Posting** | Share problems with or without revealing identity |
| **Reaction System** | Like, Love, or Sad reactions with optimistic UI updates |
| **Comments** | Full CRUD comments on any problem post |
| **Direct Messages** | Real-time messaging between community members |
| **Notifications** | Bell icon with dropdown for comments, reactions, messages |
| **Image Upload** | Multiple images per problem via ImgBB |
| **Authentication** | Email/password and Google OAuth via Better Auth |
| **Search & Filter** | Search by keyword, filter by category, sort by date |
| **Platform Stats** | Live dashboard with platform-wide activity metrics |
| **Activity Charts** | 7-day daily activity bar charts |
| **Responsive Design** | Fully responsive mobile-first UI |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16.2** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **Better Auth** | Authentication (email/password + Google OAuth) |
| **MongoDB** | Database (via backend API) |
| **Groq AI** | AI chat & solver responses (via backend API) |
| **clsx + tailwind-merge** | Conditional class name utility |

---

## 📁 Project Structure

```
Frontend/
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root layout (fonts, HTML shell, AI chat widget)
│   │   ├── not-found.tsx           # 404 page
│   │   ├── error.tsx               # Error boundary
│   │   ├── globals.css             # Global styles + Tailwind
│   │   ├── login/                  # Login page
│   │   ├── register/               # Registration page
│   │   ├── api/
│   │   │   ├── auth/[...all]/      # Better Auth API handler
│   │   │   └── upload/             # Image upload API (ImgBB)
│   │   └── (public)/               # Route group with Navbar/Footer
│   │       ├── layout.tsx          # Public layout wrapper
│   │       ├── page.tsx            # Home/Landing page
│   │       ├── about/              # About page
│   │       ├── connect/            # Contact page
│   │       ├── problems/
│   │       │   ├── page.tsx        # Browse problems
│   │       │   ├── [id]/           # Problem detail
│   │       │   ├── create/         # Create problem
│   │       │   ├── manage/         # Manage own problems
│   │       │   └── solve/          # AI Problem Solver
│   │       ├── messages/           # Direct messages
│   │       └── chat/               # AI Chat Assistant
│   │
│   ├── components/
│   │   ├── ai/
│   │   │   └── AiChatWidget.tsx    # Floating AI quick-chat widget (no DB storage)
│   │   ├── home/                   # Landing page sections
│   │   │   ├── Hero.tsx            # Animated carousel banner
│   │   │   ├── Stats.tsx
│   │   │   ├── PlatformChart.tsx
│   │   │   ├── FeaturedProblems.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── AIShowcase.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── EmergencyBanner.tsx
│   │   │   └── CTA.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── Navbar.tsx          # Fixed animated navbar
│   │   │   └── Footer.tsx
│   │   ├── notifications/
│   │   │   └── NotificationBell.tsx # Notification dropdown
│   │   └── ui/                     # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── badge.tsx
│   │       ├── section.tsx
│   │       ├── SectionDivider.tsx
│   │       └── skeleton.tsx
│   │
│   ├── lib/
│   │   ├── auth.ts                 # Server-side Better Auth config
│   │   ├── auth-client.ts          # Client-side auth client
│   │   ├── utils.ts                # cn() utility
│   │   ├── dns-setup.ts            # DNS setup for deployments
│   │   └── api/
│   │       ├── problems/problem.ts # Problems, comments, reactions, stats API
│   │       ├── ai/ai.ts            # AI solver, chat + quick-chat API (streaming)
│   │       ├── messages/messages.ts # Direct messaging API
│   │       └── notifications/notifications.ts # Notifications API
│   │
│   └── types/
│       └── index.ts                # Shared TypeScript types
│
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

---

## 🚀 Page Routes

| Route | Auth | Description |
|-------|------|-------------|
| `/` | No | Landing page — animated hero carousel, stats, features, FAQ |
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

> The **AI Quick Chat Widget** floats in the bottom-right corner of **every page** — no login required.

---

## 💻 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see [backend README](../backend/README.md))

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

---

## 🎨 Design System

The UI uses a **teal and violet** gradient color scheme with:

- **Primary gradient:** `from-teal-500 to-violet-500`
- **Background:** White and `slate-50`
- **Cards:** White with `border-slate-200` and subtle shadows
- **Typography:** Geist Sans (default) and Geist Mono (code)
- **Animations:** Framer Motion with spring/tween transitions
- **Icons:** Lucide React icon set

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and not licensed for public distribution.
