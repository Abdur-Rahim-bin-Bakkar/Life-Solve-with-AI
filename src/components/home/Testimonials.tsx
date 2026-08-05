"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import { Star, Quote, BadgeCheck } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Community Member",
    quote:
      "LifeSolve AI helped me through one of the darkest periods of my life. The AI suggestions were surprisingly accurate, and the community was incredibly supportive. I'm now in a much better place.",
    rating: 5,
    accent: "from-teal-500 to-emerald-500",
    ring: "ring-teal-200",
    bg: "bg-gradient-to-br from-teal-50 via-white to-emerald-50",
    watermark: "text-teal-100",
    chip: "bg-teal-100 text-teal-700",
    quoteMark: "text-teal-300",
    featured: true,
  },
  {
    name: "James K.",
    role: "Regular User",
    quote:
      "I was skeptical about an AI helping with personal problems, but the insights I got were genuinely helpful. I finally feel like I'm making progress.",
    rating: 5,
    accent: "from-violet-500 to-purple-500",
    ring: "ring-violet-200",
    bg: "bg-gradient-to-br from-violet-50 via-white to-purple-50",
    watermark: "text-violet-100",
    chip: "bg-violet-100 text-violet-700",
    quoteMark: "text-violet-300",
    featured: false,
  },
  {
    name: "Maria G.",
    role: "Premium Member",
    quote:
      "The career advice I received changed my perspective completely. I switched industries and couldn't be happier. The personalized action plan was exactly what I needed.",
    rating: 5,
    accent: "from-amber-500 to-rose-500",
    ring: "ring-amber-200",
    bg: "bg-gradient-to-br from-amber-50 via-white to-rose-50",
    watermark: "text-amber-100",
    chip: "bg-amber-100 text-amber-700",
    quoteMark: "text-amber-300",
    featured: false,
  },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-rose-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Community Says"
          subtitle="Real stories from people who found support"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 p-6 shadow-sm ring-4 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-7 ${t.bg} ${t.ring} ${
                t.featured ? "md:-mt-4 md:pb-9" : ""
              }`}
            >
              <Quote className={`absolute -right-3 -top-3 h-24 w-24 ${t.watermark}`} />

              <div className="relative flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${t.chip}`}>
                  {t.featured ? "★ Featured story" : "Verified member"}
                </span>
                <Stars />
              </div>

              <p className="relative mt-5 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="relative mt-6 flex items-center gap-3 border-t border-slate-100/80 pt-5">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.accent} shadow-lg`}>
                  <span className="text-lg font-black text-white">{t.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 truncate font-semibold text-slate-900">
                    {t.name}
                    <BadgeCheck className={`h-4 w-4 ${t.featured ? "text-teal-500" : "text-slate-300"}`} />
                  </p>
                  <p className="truncate text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm text-slate-500">
            <span className="flex -space-x-2">
              {["from-teal-400 to-emerald-400", "from-violet-400 to-purple-400", "from-amber-400 to-rose-400", "from-blue-400 to-indigo-400"].map((g) => (
                <span key={g} className={`h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br ${g}`} />
              ))}
            </span>
            Loved by <span className="font-bold text-slate-800">1,200+</span> community members
          </div>
        </motion.div>
      </div>
    </section>
  )
}
