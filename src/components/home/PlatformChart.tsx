"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { getOverviewStatsApi, OverviewStats } from "@/lib/api/problems/problem"
import { Activity, BarChart3, Bot, CheckCircle, FileText, MessageCircle, Send } from "lucide-react"

const METRICS = [
  { key: "posts", label: "Posts", color: "#2dd4bf", gradient: "from-teal-400 to-emerald-400" },
  { key: "solved", label: "Resolved", color: "#34d399", gradient: "from-emerald-400 to-teal-500" },
  { key: "comments", label: "Comments", color: "#a78bfa", gradient: "from-violet-400 to-purple-400" },
  { key: "messages", label: "Messages", color: "#fbbf24", gradient: "from-amber-400 to-orange-400" },
  { key: "aiChats", label: "AI Chats", color: "#fb7185", gradient: "from-rose-400 to-pink-400" },
]

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1800
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [visible, value])

  return <span ref={ref}>{Math.floor(count).toLocaleString()}</span>
}

export default function PlatformChart() {
  const [stats, setStats] = useState<OverviewStats | null>(null)

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getOverviewStatsApi()
      if (ok && data.stats) setStats(data.stats)
    })()
  }, [])

  if (!stats) return null

  const kpis = [
    { icon: FileText, label: "Total Posts", value: stats.totalPosts },
    { icon: CheckCircle, label: "Resolved", value: stats.solvedPosts },
    { icon: MessageCircle, label: "Comments", value: stats.totalComments },
    { icon: Send, label: "Messages", value: stats.totalMessages },
    { icon: Bot, label: "AI Chats", value: stats.totalAiChats },
  ]

  const maxVal = Math.max(...stats.daily.map((d) => Math.max(d.posts, d.solved, d.comments, d.messages, d.aiChats)), 1)

  const weekTotal = stats.daily.reduce(
    (sum, d) => sum + d.posts + d.solved + d.comments + d.messages + d.aiChats,
    0,
  )

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Platform Activity</h2>
          <p className="mt-2 text-slate-400">A live look at how the community is growing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 shadow-2xl shadow-slate-900/30"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')]" />
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-violet-500/30">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Activity Dashboard</h3>
                  <p className="text-xs text-white/50">Community engagement · last 7 days</p>
                </div>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
              {kpis.map((kpi, i) => {
                const metric = METRICS[i]
                return (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-white/25"
                  >
                    <div
                      className="absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                      style={{ background: metric.color }}
                    />
                    <div className="relative flex items-center gap-3">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                        <kpi.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">{kpi.label}</p>
                        <p className="text-xl font-bold text-white">
                          <AnimatedNumber value={kpi.value} />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="mb-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
                <h4 className="text-sm font-semibold text-white">Daily Activity</h4>
                <p className="text-xs text-white/50">
                  <span className="font-bold text-white">
                    {weekTotal.toLocaleString()}
                  </span>{" "}
                  total actions this week
                </p>
              </div>

              <div className="flex items-end gap-2 sm:gap-4">
                {stats.daily.map((d, i) => {
                  const day = new Date(d.date).toLocaleDateString("en", { weekday: "short" })
                  const dateStr = new Date(d.date).toLocaleDateString("en", { month: "short", day: "numeric" })
                  const heights = [
                    Math.max((d.posts / maxVal) * 100, 2),
                    Math.max((d.solved / maxVal) * 100, 2),
                    Math.max((d.comments / maxVal) * 100, 2),
                    Math.max((d.messages / maxVal) * 100, 2),
                    Math.max((d.aiChats / maxVal) * 100, 2),
                  ]
                  const values = [d.posts, d.solved, d.comments, d.messages, d.aiChats]

                  return (
                    <div key={d.date} className="group relative flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full items-end justify-center gap-[3px]" style={{ height: 170 }}>
                        {heights.map((h, j) => (
                          <motion.div
                            key={j}
                            className={`w-[16%] rounded-t-md ${METRICS[j].gradient}`}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.09 + j * 0.05, ease: "easeOut" }}
                            style={{ boxShadow: `0 0 12px ${METRICS[j].color}55` }}
                          />
                        ))}
                      </div>

                      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 w-40 -translate-x-1/2 translate-y-2 rounded-xl border border-white/10 bg-slate-800/95 p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {day} · {dateStr}
                        </p>
                        {values.map((v, j) => (
                          <p key={j} className="flex items-center justify-between text-[11px] text-white/80">
                            <span className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-sm" style={{ background: METRICS[j].color }} />
                              {METRICS[j].label}
                            </span>
                            <span className="font-bold">{v}</span>
                          </p>
                        ))}
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-medium text-white/70">{day}</span>
                        <span className="text-[9px] text-white/35">{dateStr}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {METRICS.map((m) => (
                  <span key={m.key} className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
