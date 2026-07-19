"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getOverviewStatsApi, OverviewStats } from "@/lib/api/problems/problem"
import { BarChart3, MessageCircle, CheckCircle, FileText, Send, Bot } from "lucide-react"

export default function PlatformChart() {
  const [stats, setStats] = useState<OverviewStats | null>(null)

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getOverviewStatsApi()
      if (ok && data.stats) setStats(data.stats)
    })()
  }, [])

  if (!stats) return null

  const maxVal = Math.max(...stats.daily.map((d) => Math.max(d.posts, d.solved, d.comments, d.messages, d.aiChats)), 1)

  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Platform Activity</h2>
            <p className="mt-2 text-slate-400">Community engagement over the last 7 days</p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
            {[
              { icon: FileText, label: "Total Posts", value: stats.totalPosts, color: "from-teal-500 to-emerald-500" },
              { icon: CheckCircle, label: "Resolved", value: stats.solvedPosts, color: "from-emerald-500 to-teal-400" },
              { icon: MessageCircle, label: "Comments", value: stats.totalComments, color: "from-violet-500 to-purple-500" },
              { icon: Send, label: "Messages", value: stats.totalMessages, color: "from-amber-500 to-orange-500" },
              { icon: Bot, label: "AI Chats", value: stats.totalAiChats, color: "from-rose-500 to-pink-500" },
            ].map((s) => (
              <motion.div key={s.label} whileHover={{ y: -3 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <s.icon className={`h-5 w-5 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
                    <p className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-sm font-semibold text-slate-700">Daily Activity</h3>
            <div className="flex items-end gap-2 sm:gap-4" style={{ height: 160 }}>
              {stats.daily.map((d, i) => {
                const day = new Date(d.date).toLocaleDateString("en", { weekday: "short" })
                const dateStr = new Date(d.date).toLocaleDateString("en", { month: "short", day: "numeric" })
                const pH = Math.max((d.posts / maxVal) * 100, 1)
                const sH = Math.max((d.solved / maxVal) * 100, 1)
                const cH = Math.max((d.comments / maxVal) * 100, 1)
                const mH = Math.max((d.messages / maxVal) * 100, 1)
                const aH = Math.max((d.aiChats / maxVal) * 100, 1)
                return (
                  <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="relative flex w-full items-end justify-center gap-0.5 rounded-lg" style={{ height: 140 }}>
                      <div className="w-[18%] rounded-t-sm bg-teal-400 transition-all duration-500" style={{ height: `${pH}%` }} title={`${d.posts} posts`} />
                      <div className="w-[18%] rounded-t-sm bg-emerald-500 transition-all duration-500" style={{ height: `${sH}%` }} title={`${d.solved} solved`} />
                      <div className="w-[18%] rounded-t-sm bg-violet-400 transition-all duration-500" style={{ height: `${cH}%` }} title={`${d.comments} comments`} />
                      <div className="w-[18%] rounded-t-sm bg-amber-400 transition-all duration-500" style={{ height: `${mH}%` }} title={`${d.messages} messages`} />
                      <div className="w-[18%] rounded-t-sm bg-rose-400 transition-all duration-500" style={{ height: `${aH}%` }} title={`${d.aiChats} AI chats`} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{day}</span>
                    <span className="text-[9px] text-slate-300">{dateStr}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-teal-400" /> Posts</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Resolved</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-violet-400" /> Comments</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-400" /> Messages</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-rose-400" /> AI Chats</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
