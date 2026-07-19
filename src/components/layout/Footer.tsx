"use client"

import Link from "next/link"
import { Heart, Mail, MapPin, ArrowUp, Globe } from "lucide-react"

const LinkedInIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
      <button
        onClick={scrollToTop}
        className="group absolute -top-5 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-slate-800 text-white shadow-lg transition-all duration-300 hover:border-teal-400 hover:bg-teal-600 hover:shadow-teal-500/25"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 shadow-lg">
                <span className="text-sm font-bold text-white">LS</span>
              </div>
              <span className="text-lg font-semibold text-white">LifeSolve</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A community-powered platform where you can share life problems, get AI-powered insights, and connect with people who genuinely care. You don&apos;t have to face it alone.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/fswd-abdur-rahim-bin-bakkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/25"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/Abdur-Rahim-bin-Bakkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-slate-600 hover:text-white hover:shadow-lg hover:shadow-slate-600/25"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://portfolio-eight-pi-mc123cjc5o.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/problems", label: "Browse Problems" },
                { href: "/about", label: "About Us" },
                { href: "/connect", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Support</h3>
            <ul className="mt-4 space-y-3">
              {["Mental Health", "Financial", "Career", "Relationships", "Emergency"].map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-slate-400 transition-colors duration-200 hover:text-teal-400 cursor-pointer">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Get In Touch</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:webdesignrahim4061@gmail.com"
                  className="group flex items-center gap-2.5 text-sm text-slate-400 transition-colors duration-200 hover:text-teal-400"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-teal-500/20">
                    <Mail className="h-4 w-4" />
                  </span>
                  webdesignrahim4061@gmail.com
                </a>
              </li>
              <li>
                <span className="group flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium text-slate-300">24/7 Crisis Support</p>
              <p className="mt-1 text-lg font-bold text-teal-400">1-800-LIFESOLVE</p>
              <p className="mt-0.5 text-xs text-slate-500">Free & confidential</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} LifeSolve. Built with care for those who need it most.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-400">Privacy</a>
              <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-400">Terms</a>
              <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-400">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
