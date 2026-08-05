"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getProblems, ProblemData } from "@/lib/api/problems/problem"
import {
  ArrowRight,
  Brain,
  Briefcase,
  Frown,
  Heart,
  HeartHandshake,
  HeartPulse,
  Siren,
  ThumbsUp,
  Wallet,
} from "lucide-react"

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string; soft: string }> = {
  "Mental Health": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50", soft: "text-violet-200" },
  Financial: { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", soft: "text-emerald-200" },
  Career: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", soft: "text-blue-200" },
  Relationships: { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50", soft: "text-rose-200" },
  "Health & Wellness": { icon: HeartPulse, color: "text-amber-600", bg: "bg-amber-50", soft: "text-amber-200" },
  Emergency: { icon: Siren, color: "text-red-600", bg: "bg-red-50", soft: "text-red-200" },
}

const priorityStyles: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

function Avatar({ name, image }: { name?: string; image?: string }) {
  if (image) {
    return <img src={image} alt="" className="h-7 w-7 rounded-full object-cover" />
  }
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-[10px] font-bold text-white">
      {name?.charAt(0).toUpperCase() || "U"}
    </div>
  )
}

function Reactions({ problem }: { problem: ProblemData }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-slate-400">
      <span className="flex items-center gap-0.5">
        <ThumbsUp className="h-3 w-3" />
        {problem.reactions?.likes?.length || 0}
      </span>
      <span className="flex items-center gap-0.5">
        <Heart className="h-3 w-3" />
        {problem.reactions?.loves?.length || 0}
      </span>
      <span className="flex items-center gap-0.5">
        <Frown className="h-3 w-3" />
        {problem.reactions?.sads?.length || 0}
      </span>
    </div>
  )
}

export default function FeaturedProblems() {
  const [problems, setProblems] = useState<ProblemData[]>([])

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getProblems({ limit: 4, sort: "new" })
      if (ok && data.problems) setProblems(data.problems)
    })()
  }, [])

  if (problems.length === 0) return null

  const [featured, ...rest] = problems

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-teal-600">
              <span className="h-px w-8 bg-gradient-to-r from-teal-500 to-violet-500" />
              Latest from the community
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Recent Problems
            </h2>
            <p className="mt-2 text-slate-400">See what others are going through and offer your support</p>
          </div>
          <Link
            href="/problems"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg"
          >
            View All Problems
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-6">
          <FeaturedCard problem={featured} index={0} />
          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((problem, i) => (
              <ProblemCard key={problem._id} problem={problem} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ problem, index }: { problem: ProblemData; index: number }) {
  const meta = catMeta[problem.category] || catMeta["Mental Health"]
  const CatIcon = meta.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 md:flex-row"
    >
      <Link href={`/problems/${problem._id}`} className="relative block h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
        {problem.images && problem.images[0] ? (
          <img
            src={problem.images[0]}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${meta.bg}`}>
            <CatIcon className={`h-20 w-20 ${meta.color} opacity-40`} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:bg-gradient-to-r" />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-teal-700 shadow backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
          </span>
          Latest
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
            <CatIcon className="h-3.5 w-3.5" />
            {problem.category}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority] || priorityStyles.Low}`}>
            {problem.priority}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${problem.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {problem.status === "resolved" ? "Solved" : "Open"}
          </span>
        </div>

        <Link href={`/problems/${problem._id}`}>
          <h3 className="mt-4 text-xl font-bold text-slate-900 transition-colors group-hover:text-teal-700 sm:text-2xl">
            {problem.title}
          </h3>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 sm:text-base">
          {problem.shortDescription}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Avatar name={problem.userName} image={problem.userImage} />
            <span className="truncate font-medium text-slate-500">{problem.userName}</span>
          </div>
          <Reactions problem={problem} />
        </div>

        <Link
          href={`/problems/${problem._id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/30"
        >
          Read & Support
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}

function ProblemCard({ problem, index }: { problem: ProblemData; index: number }) {
  const meta = catMeta[problem.category] || catMeta["Mental Health"]
  const CatIcon = meta.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl hover:shadow-slate-900/10"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-slate-50 transition-colors duration-300 group-hover:bg-teal-50/60" />

      <div className="relative flex items-center justify-between gap-2">
        <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
          <CatIcon className="h-3 w-3" />
          {problem.category}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority] || priorityStyles.Low}`}>
          {problem.priority}
        </span>
      </div>

      <Link href={`/problems/${problem._id}`}>
        <h3 className="relative mt-4 line-clamp-2 text-base font-semibold text-slate-900 transition-colors group-hover:text-teal-700">
          {problem.title}
        </h3>
      </Link>
      <p className="relative mt-2 flex-1 line-clamp-3 text-sm text-slate-500">
        {problem.shortDescription}
      </p>

      <div className="relative mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Avatar name={problem.userName} image={problem.userImage} />
          <span className="truncate max-w-[80px]">{problem.userName}</span>
        </div>
        <Reactions problem={problem} />
      </div>

      <Link
        href={`/problems/${problem._id}`}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-all duration-300 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 hover:shadow-md"
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  )
}
