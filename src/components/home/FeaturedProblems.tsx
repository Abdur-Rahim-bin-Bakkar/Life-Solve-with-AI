"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { getProblems, ProblemData } from "@/lib/api/problems/problem"
import {
  Heart, Frown, ThumbsUp, Clock, ArrowRight, Brain, Wallet,
  Briefcase, HeartHandshake, HeartPulse, Siren,
} from "lucide-react"

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Mental Health": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50" },
  Financial: { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
  Career: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
  Relationships: { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50" },
  "Health & Wellness": { icon: HeartPulse, color: "text-amber-600", bg: "bg-amber-50" },
  Emergency: { icon: Siren, color: "text-red-600", bg: "bg-red-50" },
}

const priorityStyles: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

export default function FeaturedProblems() {
  const [problems, setProblems] = useState<ProblemData[]>([])

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getProblems({ limit: 4, sort: "new" })
      if (ok && data.problems) setProblems(data.problems)
    })()
  }, [])

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recent Problems"
          subtitle="See what others are going through and offer your support"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => {
            const meta = catMeta[problem.category] || catMeta["Mental Health"]
            const CatIcon = meta.icon
            return (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
                    <CatIcon className="h-3 w-3" />{problem.category}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority] || priorityStyles.Low}`}>
                    {problem.priority}
                  </span>
                </div>

                <Link href={`/problems/${problem._id}`} className="cursor-pointer">
                  <h3 className="mt-4 text-base font-semibold text-slate-900 line-clamp-2 transition-colors group-hover:text-teal-700">
                    {problem.title}
                  </h3>
                </Link>

                <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">
                  {problem.shortDescription}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {problem.userImage ? (
                      <img src={problem.userImage} alt="" className="h-6 w-6 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-[9px] font-bold text-white">
                        {problem.userName?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="truncate max-w-[70px]">{problem.userName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{problem.reactions?.likes?.length || 0}</span>
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{problem.reactions?.loves?.length || 0}</span>
                    <span className="flex items-center gap-1"><Frown className="h-3 w-3" />{problem.reactions?.sads?.length || 0}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/problems"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 hover:shadow-lg"
          >
            View All Problems
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
