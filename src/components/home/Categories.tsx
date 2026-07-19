"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import {
  Brain,
  Wallet,
  Briefcase,
  HeartHandshake,
  HeartPulse,
  Siren,
} from "lucide-react"

const categories = [
  { name: "Mental Health", desc: "Anxiety, depression, stress & more", icon: Brain, color: "bg-violet-100 text-violet-600", hover: "hover:border-violet-200 hover:shadow-violet-200/50" },
  { name: "Financial", desc: "Debt, budgeting, investments", icon: Wallet, color: "bg-emerald-100 text-emerald-600", hover: "hover:border-emerald-200 hover:shadow-emerald-200/50" },
  { name: "Career", desc: "Job search, work stress, growth", icon: Briefcase, color: "bg-blue-100 text-blue-600", hover: "hover:border-blue-200 hover:shadow-blue-200/50" },
  { name: "Relationships", desc: "Family, friends, partners", icon: HeartHandshake, color: "bg-rose-100 text-rose-600", hover: "hover:border-rose-200 hover:shadow-rose-200/50" },
  { name: "Health & Wellness", desc: "Physical health, fitness, sleep", icon: HeartPulse, color: "bg-amber-100 text-amber-600", hover: "hover:border-amber-200 hover:shadow-amber-200/50" },
  { name: "Emergency", desc: "Crisis, urgent situations", icon: Siren, color: "bg-red-100 text-red-600", hover: "hover:border-red-200 hover:shadow-red-200/50" },
]

export default function Categories() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className={`group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl ${cat.hover}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color} transition-transform duration-300 group-hover:scale-110`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{cat.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
