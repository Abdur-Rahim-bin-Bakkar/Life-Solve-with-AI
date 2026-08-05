"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Sparkles, Star } from "lucide-react"

const floaters = [
  { icon: Heart, className: "text-rose-300/60", top: "12%", left: "8%", size: "h-7 w-7" },
  { icon: Sparkles, className: "text-amber-300/70", top: "22%", right: "10%", size: "h-8 w-8" },
  { icon: Star, className: "text-violet-300/60", bottom: "18%", left: "14%", size: "h-6 w-6" },
  { icon: Heart, className: "text-teal-300/60", bottom: "24%", right: "8%", size: "h-7 w-7" },
]

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-violet-900 py-24">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl"
          animate={{ x: [0, 50, -20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"
          animate={{ x: [0, -40, 20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 px-6 py-14 text-center shadow-2xl shadow-teal-950/40 backdrop-blur-md sm:px-12"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {floaters.map((f, i) => (
            <motion.span
              key={i}
              className={`absolute ${f.size} ${f.className}`}
              style={{ top: f.top, bottom: f.bottom, left: f.left, right: f.right }}
              animate={{ y: [0, -12, 0], rotate: [0, 12, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              <f.icon className="h-full w-full" />
            </motion.span>
          ))}

          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 shadow-2xl shadow-rose-500/40"
            >
              <Heart className="h-8 w-8 text-white" />
            </motion.div>

            <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent">Healing Journey</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-teal-100">
              Join thousands of others who&apos;ve found support, understanding, and real solutions.
              You don&apos;t have to face it alone.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-800 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-teal-300/40"
              >
                Join Free Today
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/problems"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                Explore Problems
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["from-teal-400 to-emerald-400", "from-violet-400 to-purple-400", "from-amber-400 to-rose-400", "from-blue-400 to-indigo-400"].map((g) => (
                    <span key={g} className={`h-9 w-9 rounded-full border-2 border-white/40 bg-gradient-to-br ${g}`} />
                  ))}
                </div>
                <p className="text-left text-sm text-teal-100">
                  <span className="font-bold text-white">2,000+</span> members
                  <br />
                  <span className="text-xs text-teal-200/80">already found support</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-teal-200">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-teal-300" /> 100% Anonymous
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-300" /> AI-Powered
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-teal-300" /> Free Forever
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
