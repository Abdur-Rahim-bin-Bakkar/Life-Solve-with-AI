"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  Bell, CheckCheck, MessageCircle, ThumbsUp, Send,
  FileText, CheckCircle, X, Loader2, Clock,
} from "lucide-react"
import {
  getNotifications, getUnreadCount, markAsRead, markAllAsRead,
  type NotificationData,
} from "@/lib/api/notifications/notifications"

const typeMeta: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  problem_created: { icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
  problem_resolved: { icon: CheckCircle, color: "text-teal-600", bg: "bg-teal-50" },
  new_comment: { icon: MessageCircle, color: "text-blue-600", bg: "bg-blue-50" },
  new_reaction: { icon: ThumbsUp, color: "text-rose-600", bg: "bg-rose-50" },
  new_message: { icon: Send, color: "text-violet-600", bg: "bg-violet-50" },
}

function timeAgo(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function NotificationBell() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const token = session?.session?.token
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoaded, setInitialLoaded] = useState(false)

  const fetchUnread = useCallback(async () => {
    if (!token) return
    const { ok, data } = await getUnreadCount(token)
    if (ok) setUnreadCount(data.count)
  }, [token])

  useEffect(() => {
    fetchUnread()
    const interval = setInterval(fetchUnread, 15000)
    return () => clearInterval(interval)
  }, [fetchUnread])

  useEffect(() => {
    if (!open || !token || initialLoaded) return
    setLoading(true)
    getNotifications(token)
      .then(({ ok, data }) => {
        if (ok) {
          setNotifications(data.notifications || [])
          setInitialLoaded(true)
        }
      })
      .finally(() => setLoading(false))
  }, [open, token, initialLoaded])

  useEffect(() => {
    if (!open) setInitialLoaded(false)
  }, [open])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  async function handleMarkAllRead() {
    if (!token) return
    await markAllAsRead(token)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  async function handleNotificationClick(n: NotificationData) {
    if (!token) return
    if (!n.read) {
      await markAsRead(token, n._id)
      setNotifications((prev) => prev.map((p) => p._id === n._id ? { ...p, read: true } : p))
      setUnreadCount((c) => Math.max(0, c - 1))
    }
    setOpen(false)

    if (n.type === "new_message") {
      router.push("/messages")
    } else {
      router.push(`/problems/${n.referenceId}`)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white leading-none shadow-sm">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "tween", duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-[380px] origin-top-right rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-600">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-teal-600 transition-colors hover:bg-teal-50"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {loading && notifications.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                    <Bell className="h-6 w-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">No notifications yet</p>
                  <p className="mt-1 text-xs text-slate-400">We&apos;ll notify you when something happens</p>
                </div>
              ) : (
                <div className="py-1">
                  {notifications.map((n) => {
                    const meta = typeMeta[n.type] || typeMeta.problem_created
                    const Icon = meta.icon
                    return (
                      <button
                        key={n._id}
                        onClick={() => handleNotificationClick(n)}
                        className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 ${
                          !n.read ? "bg-teal-50/40" : ""
                        }`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}>
                          <Icon className={`h-4.5 w-4.5 ${meta.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm leading-snug ${!n.read ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                              {n.title}
                            </p>
                            {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" />}
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 line-clamp-2">{n.message}</p>
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock className="h-3 w-3" />
                            {timeAgo(n.createdAt)}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
