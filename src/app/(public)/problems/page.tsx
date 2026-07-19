"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Heart, Frown, ThumbsUp, AlertCircle, Sparkles,
  Brain, Wallet, Briefcase, HeartHandshake, HeartPulse, Siren,
  ArrowRight, Clock, Search, SlidersHorizontal, ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import { getProblems, ProblemData } from "@/lib/api/problems/problem"

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  "Mental Health": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50", border: "border-l-violet-500" },
  Financial: { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500" },
  Career: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", border: "border-l-blue-500" },
  Relationships: { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50", border: "border-l-rose-500" },
  "Health & Wellness": { icon: HeartPulse, color: "text-amber-600", bg: "bg-amber-50", border: "border-l-amber-500" },
  Emergency: { icon: Siren, color: "text-red-600", bg: "bg-red-50", border: "border-l-red-500" },
}

const priorityStyles: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

const categories = ["All", "Mental Health", "Financial", "Career", "Relationships", "Health & Wellness", "Emergency"]

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("new")

  const fetchProblems = useCallback(async () => {
    setLoading(true)
    setError("")
    const { ok, data } = await getProblems({
      category: selectedCategory,
      search: searchQuery || undefined,
      sort: sortOrder,
    })
    if (ok && data.problems) {
      setProblems(data.problems)
    } else {
      setError(data.error || "Failed to load problems")
    }
    setLoading(false)
  }, [selectedCategory, searchQuery, sortOrder])

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Community Problems</h1>
          <p className="mt-2 text-slate-400">Browse through shared experiences and offer your support</p>
        </motion.div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const meta = catMeta[cat]
            const active = selectedCategory === cat
            return (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                    : "bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                {meta && <meta.icon className="h-3.5 w-3.5" />}
                {cat}
              </button>
            )
          })}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          </div>
        )}

        {error && !loading && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur">
            <div className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4" />{error}</div>
          </div>
        )}

        {!loading && problems.length === 0 && !error && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <AlertCircle className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-500">No problems found</p>
            <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filters</p>
            <Link href="/problems/create" className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-700">
              Share Your Problem <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => {
            const meta = catMeta[problem.category] || catMeta["Mental Health"]
            const CatIcon = meta.icon

            return (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 ${meta.border}`}
              >
                {problem.images && problem.images[0] && (
                  <Link href={`/problems/${problem._id}`} className="block cursor-pointer overflow-hidden">
                    <img src={problem.images[0]} alt="" className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </Link>
                )}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
                      <CatIcon className="h-3 w-3" />
                      {problem.category}
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority] || priorityStyles.Low}`}>
                      {problem.priority}
                    </span>
                  </div>

                  <Link href={`/problems/${problem._id}`} className="cursor-pointer">
                    <h3 className="mb-1.5 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-600 line-clamp-2">
                      {problem.title}
                    </h3>
                  </Link>

                  <p className="mb-4 text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {problem.shortDescription}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {problem.userImage ? (
                        <img src={problem.userImage} alt="" className="h-7 w-7 rounded-full object-cover ring-2 ring-slate-100" />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-[10px] font-bold text-white">
                          {problem.userName?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-600 truncate max-w-[100px]">{problem.userName}</p>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(problem.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{problem.reactions?.likes?.length || 0}</span>
                      <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{problem.reactions?.loves?.length || 0}</span>
                      <span className="flex items-center gap-1"><Frown className="h-3.5 w-3.5" />{problem.reactions?.sads?.length || 0}</span>
                    </div>
                  </div>

                  <Link
                    href={`/problems/${problem._id}`}
                    className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
