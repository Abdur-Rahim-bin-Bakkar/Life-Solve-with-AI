"use client"

import Link from "next/link"
import { Heart, Mail, MapPin, ArrowUp, Globe, MessageCircle } from "lucide-react"

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
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-all duration-200 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25"
              >
                <Heart className="h-4 w-4" />
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
                  href="mailto:support@lifesolve.app"
                  className="group flex items-center gap-2.5 text-sm text-slate-400 transition-colors duration-200 hover:text-teal-400"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-teal-500/20">
                    <Mail className="h-4 w-4" />
                  </span>
                  support@lifesolve.app
                </a>
              </li>
              <li>
                <span className="group flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <MapPin className="h-4 w-4" />
                  </span>
                  San Francisco, CA
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
