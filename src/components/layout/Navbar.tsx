"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Sparkles, MessageSquareText } from "lucide-react"

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
]

const protectedLinks = [
  { href: "/problems/create", label: "Create Post", icon: Sparkles },
  { href: "/problems/manage", label: "Manage Posts", icon: LayoutDashboard },
  { href: "/problems/solve", label: "AI Solver", icon: Sparkles },
  { href: "/chat", label: "AI Chat", icon: MessageSquareText },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const user = session?.user
  const isLoggedIn = !!user

  const links = isLoggedIn ? publicLinks : publicLinks

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/25 transition-transform duration-300 group-hover:scale-105">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a3 3 0 0 0-3 3v1.5c0 1-.5 1.8-1.3 2.3A5 5 0 0 0 5 14.5V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5a5 5 0 0 0-2.7-4.4c-.8-.5-1.3-1.4-1.3-2.3V6a3 3 0 0 0-3-3z" />
              <path d="M9 18v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2" />
              <path d="M8 9.5 6 10" />
              <path d="M16 9.5 18 10" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-slate-900">LifeSolve <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">AI</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-teal-700"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-teal-50 -z-10" />
                )}
              </Link>
            )
          })}
          {isLoggedIn && (
            <div className="mx-2 h-5 w-px bg-slate-200" />
          )}
          {isLoggedIn && protectedLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-violet-700"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <span className="flex items-center gap-1.5">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center rounded-full border-2 border-transparent bg-white p-0.5 shadow-sm transition-all duration-200 hover:border-teal-300 hover:shadow-md"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-violet-500">
                  {user.image ? (
                    <img src={user.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right animate-in rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
                    <div className="border-b border-slate-100 px-3 py-2.5">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <Link
                        href="/problems/manage"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/problems/manage"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        My Posts
                      </Link>
                    </div>
                    <div className="mt-1 border-t border-slate-100 pt-1">
                      <button
                        onClick={async () => {
                          setDropdownOpen(false)
                          await authClient.signOut()
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-white/80 hover:text-slate-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-600 to-violet-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-600 to-teal-600 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg md:hidden">
          <div className="space-y-0.5 px-3 py-3">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            {isLoggedIn && (
              <>
                <div className="my-2 h-px bg-slate-100" />
                {protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </div>
          <div className="border-t border-slate-100 px-3 py-3">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-violet-500">
                    {user.image ? (
                      <img src={user.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setMobileOpen(false)
                    await authClient.signOut()
                  }}
                  className="rounded-full p-2 text-rose-500 transition-colors hover:bg-rose-50"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full px-4 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-gradient-to-r from-teal-600 to-violet-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
