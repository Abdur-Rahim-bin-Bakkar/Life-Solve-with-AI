"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-violet-900 py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Heart className="h-8 w-8 text-amber-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-teal-100">
            Join thousands of others who&apos;ve found support, understanding, and real solutions. You don&apos;t have to face it alone.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 shadow-2xl transition-all duration-300 hover:shadow-teal-500/30 hover:-translate-y-0.5"
            >
              Join Free Today
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/problems"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              Explore Problems
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-teal-200">
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
        </motion.div>
      </div>
    </section>
  )
}
