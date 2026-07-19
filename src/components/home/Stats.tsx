"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Users, CheckCircle, Bot, Star } from "lucide-react"

const stats = [
  { icon: Users, value: 12840, label: "Active Users", suffix: "+" },
  { icon: CheckCircle, value: 5720, label: "Problems Solved", suffix: "+" },
  { icon: Bot, value: 25380, label: "AI Responses", suffix: "+" },
  { icon: Star, value: 48, label: "Community Rating", suffix: "/5", prefix: "" },
]

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
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
    const increment = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += increment
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
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
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
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                <stat.icon className="h-6 w-6 text-teal-600" />
              </div>
              <div className="mt-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
