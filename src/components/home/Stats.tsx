"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { getOverviewStatsApi, OverviewStats } from "@/lib/api/problems/problem"
import { Bot, CheckCircle, Sparkles, Star, Users } from "lucide-react"

const ACCENTS = [
  { glow: "from-teal-400 to-emerald-400", ring: "group-hover:ring-teal-300/40", sparkle: "text-teal-300" },
  { glow: "from-emerald-400 to-teal-500", ring: "group-hover:ring-emerald-300/40", sparkle: "text-emerald-300" },
  { glow: "from-violet-400 to-purple-500", ring: "group-hover:ring-violet-300/40", sparkle: "text-violet-300" },
  { glow: "from-amber-400 to-orange-500", ring: "group-hover:ring-amber-300/40", sparkle: "text-amber-300" },
]

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
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
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
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

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const [stats, setStats] = useState<OverviewStats | null>(null)

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getOverviewStatsApi()
      if (ok && data.stats) setStats(data.stats)
    })()
  }, [])

  if (!stats) return null

  const items = [
    { icon: Users, value: stats.totalUsers, label: "Active Users", suffix: "+", decimals: 0, subtitle: "and growing every day" },
    { icon: CheckCircle, value: stats.solvedPosts, label: "Problems Solved", suffix: "+", decimals: 0, subtitle: "real lives, changed" },
    { icon: Bot, value: stats.totalAiResponses, label: "AI Responses", suffix: "+", decimals: 0, subtitle: "instant guidance 24/7" },
    { icon: Star, value: stats.communityRating, label: "Community Rating", suffix: "/5", decimals: 1, subtitle: "based on member feedback" },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-violet-700 py-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl"
          animate={{ x: [0, -40, 20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-teal-100/80">
            The numbers behind the support
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            A community that&apos;s <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">always here</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-5">
          {items.map((item, i) => {
            const accent = ACCENTS[i]
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 text-center shadow-xl shadow-teal-950/20 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
              >
                <span
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.glow} opacity-70`}
                />

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.glow} shadow-lg`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="mt-4 flex items-center justify-center gap-1"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${accent.sparkle} opacity-60`} />
                  <p className="bg-gradient-to-r from-white to-teal-100 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                    <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals} />
                  </p>
                </motion.div>

                <p className="mt-1.5 text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-0.5 text-[11px] text-white/60">{item.subtitle}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
