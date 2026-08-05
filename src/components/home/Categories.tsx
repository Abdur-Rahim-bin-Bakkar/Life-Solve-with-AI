"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { ArrowUpRight, Brain, Wallet, Briefcase, HeartHandshake, HeartPulse, Siren } from "lucide-react"

const categories = [
  {
    name: "Mental Health",
    desc: "Anxiety, depression, stress & more",
    icon: Brain,
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    tile: "from-violet-500 to-purple-600",
    water: "text-violet-100",
    border: "hover:border-violet-300",
    posts: "2.4k posts",
  },
  {
    name: "Financial",
    desc: "Debt, budgeting, investments",
    icon: Wallet,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    tile: "from-emerald-500 to-teal-600",
    water: "text-emerald-100",
    border: "hover:border-emerald-300",
    posts: "1.1k posts",
  },
  {
    name: "Career",
    desc: "Job search, work stress, growth",
    icon: Briefcase,
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    tile: "from-blue-500 to-indigo-600",
    water: "text-blue-100",
    border: "hover:border-blue-300",
    posts: "1.8k posts",
  },
  {
    name: "Relationships",
    desc: "Family, friends, partners",
    icon: HeartHandshake,
    bg: "bg-rose-50",
    iconColor: "text-rose-500",
    tile: "from-rose-500 to-pink-600",
    water: "text-rose-100",
    border: "hover:border-rose-300",
    posts: "3.2k posts",
  },
  {
    name: "Health & Wellness",
    desc: "Physical health, fitness, sleep",
    icon: HeartPulse,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    tile: "from-amber-500 to-orange-600",
    water: "text-amber-100",
    border: "hover:border-amber-300",
    posts: "1.5k posts",
  },
  {
    name: "Emergency",
    desc: "Crisis, urgent situations",
    icon: Siren,
    bg: "bg-red-50",
    iconColor: "text-red-500",
    tile: "from-red-500 to-rose-600",
    water: "text-red-100",
    border: "hover:border-red-300",
    posts: "720 posts",
  },
]

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Browse by Category"
          subtitle="Find others facing similar challenges"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 ${cat.border}`}
            >
              <div className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6 ${cat.water}`}>
                <cat.icon className="h-full w-full" />
              </div>

              <div className={`flex h-24 items-end justify-between bg-gradient-to-br ${cat.bg} p-5`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.tile} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <cat.icon className="h-7 w-7 text-white" />
                </div>
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm backdrop-blur">
                  {cat.posts}
                </span>
              </div>

              <div className="relative flex items-center justify-between gap-3 p-5 pt-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{cat.desc}</p>
                </div>
                <Link
                  href={`/problems?category=${encodeURIComponent(cat.name)}`}
                  aria-label={`Browse ${cat.name} problems`}
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${cat.bg} ${cat.iconColor} transition-all duration-300 group-hover:scale-110`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
