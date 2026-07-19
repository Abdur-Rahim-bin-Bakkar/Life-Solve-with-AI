"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { getOverviewStatsApi, OverviewStats } from "@/lib/api/problems/problem"
import { Users, CheckCircle, Bot, Star } from "lucide-react"

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
    <span ref={ref} className="text-3xl font-bold text-teal-600 sm:text-4xl">
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
    { icon: Users, value: stats.totalUsers, label: "Active Users", suffix: "+", decimals: 0 },
    { icon: CheckCircle, value: stats.solvedPosts, label: "Problems Solved", suffix: "+", decimals: 0 },
    { icon: Bot, value: stats.totalAiResponses, label: "AI Responses", suffix: "+", decimals: 0 },
    { icon: Star, value: stats.communityRating, label: "Community Rating", suffix: "/5", decimals: 1 },
  ]

  return (
    <section className="border-b border-slate-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                <item.icon className="h-6 w-6 text-teal-600" />
              </div>
              <div className="mt-3">
                <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
