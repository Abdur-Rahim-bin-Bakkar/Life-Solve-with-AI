"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart, Frown, ThumbsUp, AlertCircle, Sparkles,
  Brain, Wallet, Briefcase, HeartHandshake, HeartPulse, Siren,
  ArrowRight, Clock, Search, ChevronLeft, ChevronRight,
  SlidersHorizontal, FilterX, ListMusic, LayoutGrid,
} from "lucide-react"
import Link from "next/link"
import { getProblems, ProblemData, PaginatedResponse } from "@/lib/api/problems/problem"
import { CardSkeleton } from "@/components/ui/skeleton"

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string; border: string; glow: string }> = {
  "Mental Health": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50", border: "border-l-violet-500", glow: "shadow-violet-500/10" },
  Financial: { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500", glow: "shadow-emerald-500/10" },
  Career: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", border: "border-l-blue-500", glow: "shadow-blue-500/10" },
  Relationships: { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50", border: "border-l-rose-500", glow: "shadow-rose-500/10" },
  "Health & Wellness": { icon: HeartPulse, color: "text-amber-600", bg: "bg-amber-50", border: "border-l-amber-500", glow: "shadow-amber-500/10" },
  Emergency: { icon: Siren, color: "text-red-600", bg: "bg-red-50", border: "border-l-red-500", glow: "shadow-red-500/10" },
}

const priorityStyles: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

const categories = ["All", "Mental Health", "Financial", "Career", "Relationships", "Health & Wellness", "Emergency"]

function getCategoryIcon(cat: string) {
  const meta = catMeta[cat]
  return meta?.icon || Sparkles
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [total, setTotal] = useState(0)

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("new")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const fetchProblems = useCallback(async () => {
    setLoading(true)
    setError("")
    const { ok, data } = await getProblems({
      category: selectedCategory,
      search: searchQuery || undefined,
      sort: sortOrder,
      page,
    })
    if (ok && (data as PaginatedResponse).problems) {
      const pd = data as PaginatedResponse
      setProblems(pd.problems!)
      setTotalPages(pd.totalPages || 1)
      setTotal(pd.total || 0)
    } else {
      setError(data.error || "Failed to load problems")
    }
    setLoading(false)
  }, [selectedCategory, searchQuery, sortOrder, page])

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, searchQuery, sortOrder])

  const startItem = total === 0 ? 0 : (page - 1) * 6 + 1
  const endItem = Math.min(page * 6, total)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortOrder("new")
    searchRef.current?.focus()
  }

  const hasActiveFilters = selectedCategory !== "All" || searchQuery !== "" || sortOrder !== "new"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-60 w-60 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Community Problems</h1>
          <p className="mt-2 text-slate-400">Browse through shared experiences and offer your support</p>
        </motion.div>

        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-4 w-4 text-teal-500" />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems by title..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    <FilterX className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none cursor-pointer rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm font-medium text-slate-600 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 hover:bg-white"
                  >
                    <option value="new">Newest First</option>
                    <option value="old">Oldest First</option>
                  </select>
                  <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    showFilters || hasActiveFilters
                      ? "border-teal-200 bg-teal-50 text-teal-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Categories</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                    {categories.map((cat) => {
                      const active = selectedCategory === cat
                      const CatIcon = getCategoryIcon(cat)
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                            active
                              ? "bg-gradient-to-r from-teal-600 to-violet-600 text-white shadow-lg shadow-teal-500/20 scale-105"
                              : "bg-white text-slate-500 border border-slate-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 shadow-sm"
                          }`}
                        >
                          <CatIcon className={`h-4 w-4 ${active ? "text-white" : ""}`} />
                          {cat}
                        </button>
                      )
                    })}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 border border-rose-200 transition-all"
                      >
                        <FilterX className="h-4 w-4" /> Clear
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasActiveFilters && !showFilters && (
            <div className="flex flex-wrap items-center gap-2 px-4 pb-4 sm:px-6">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs font-medium text-teal-700">
                  <Sparkles className="h-3 w-3" />
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="ml-1 hover:text-teal-900"><FilterX className="h-3 w-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 border border-violet-200 px-3 py-1.5 text-xs font-medium text-violet-700">
                  <Search className="h-3 w-3" /> &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-violet-900"><FilterX className="h-3 w-3" /></button>
                </span>
              )}
              {sortOrder !== "new" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-700">
                  {sortOrder === "old" ? "Oldest" : "Newest"}
                  <button onClick={() => setSortOrder("new")} className="ml-1 hover:text-amber-900"><FilterX className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {!loading && !error && total > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing <span className="font-semibold text-slate-600">{startItem}&ndash;{endItem}</span> of <span className="font-semibold text-slate-600">{total}</span> problems
            </p>
          </div>
        )}

        {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && !loading && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur"
          >
            <div className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4" />{error}</div>
          </motion.div>
        )}

        {!loading && problems.length === 0 && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
              <ListMusic className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-500">No problems found</p>
            <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filters</p>
            <Link href="/problems/create"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Share Your Problem <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
                      <CatIcon className="h-3 w-3" />
                      {problem.category}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority] || priorityStyles.Low}`}>
                        {problem.priority}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${problem.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {problem.status === "resolved" ? "Solved" : "Open"}
                      </span>
                    </div>
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

        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = page === p
                const isNear = Math.abs(page - p) <= 2
                const isEdge = p === 1 || p === totalPages

                if (!isNear && !isEdge) {
                  if (p === 2 || p === totalPages - 1) {
                    return <span key={p} className="text-slate-300 text-sm px-1">...</span>
                  }
                  return null
                }

                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-teal-600 to-violet-600 text-white shadow-lg shadow-teal-500/20 scale-110"
                        : "border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
                    }`}
                  >
                    {p}
                  </button>
                )
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Page {page} of {totalPages}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
