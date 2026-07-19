"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  AlertCircle, Sparkles, ArrowLeft, Edit3, Trash2, CheckCircle, XCircle,
  Clock, Brain, Wallet, Briefcase, HeartHandshake, HeartPulse, Siren,
  BarChart3, Save, X, LogOut,
} from "lucide-react"
import Link from "next/link"
import {
  getProblems, ProblemData,
  updateProblemApi, getUserStatsApi, UserStats,
} from "@/lib/api/problems/problem"

const categories = [
  "Mental Health", "Financial", "Career", "Relationships", "Health & Wellness", "Emergency",
]
const priorities = ["Low", "Medium", "High", "Emergency"]

const catColors: Record<string, string> = {
  "Mental Health": "bg-violet-100 text-violet-700",
  Financial: "bg-emerald-100 text-emerald-700",
  Career: "bg-blue-100 text-blue-700",
  Relationships: "bg-rose-100 text-rose-700",
  "Health & Wellness": "bg-amber-100 text-amber-700",
  Emergency: "bg-red-100 text-red-700",
}
const priColors: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

interface EditForm {
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  priority: string
  status: string
}

export default function ManageProblemsPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const token = session?.session?.token

  const [problems, setProblems] = useState<ProblemData[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [editProblem, setEditProblem] = useState<ProblemData | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({ title: "", shortDescription: "", fullDescription: "", category: "", priority: "", status: "open" })
  const [saving, setSaving] = useState(false)
  const [statusLoading, setStatusLoading] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!session) return
    if (!session.user) { router.push("/login"); return }
    ;(async () => {
      const [pRes, sRes] = await Promise.all([
        getProblems(),
        token ? getUserStatsApi(token) : Promise.resolve(null),
      ])
      if (pRes.ok && pRes.data.problems) {
        setProblems(pRes.data.problems.filter((p) => p.userId === session.user?.id))
      } else {
        setError(pRes.data.error || "Failed to load")
      }
      if (sRes?.ok && sRes.data.stats) setStats(sRes.data.stats)
      setLoading(false)
    })()
  }, [session, token, router])

  const openEdit = (p: ProblemData) => {
    setEditProblem(p)
    setEditForm({
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      category: p.category,
      priority: p.priority,
      status: p.status,
    })
  }

  const handleSave = async () => {
    if (!editProblem || !token) return
    setSaving(true)
    const changed: Record<string, unknown> = {}
    if (editForm.title !== editProblem.title) changed.title = editForm.title
    if (editForm.shortDescription !== editProblem.shortDescription) changed.shortDescription = editForm.shortDescription
    if (editForm.fullDescription !== editProblem.fullDescription) changed.fullDescription = editForm.fullDescription
    if (editForm.category !== editProblem.category) changed.category = editForm.category
    if (editForm.priority !== editProblem.priority) changed.priority = editForm.priority
    if (editForm.status !== editProblem.status) changed.status = editForm.status

    if (Object.keys(changed).length === 0) { setSaving(false); setEditProblem(null); return }

    const { ok, data } = await updateProblemApi(editProblem._id, changed, token)
    if (ok && data.problem) {
      setProblems((prev) => prev.map((p) => p._id === data.problem!._id ? data.problem! : p))
    } else {
      setError(data.error || "Update failed")
    }
    setSaving(false)
    setEditProblem(null)
  }

  const toggleStatus = async (p: ProblemData) => {
    if (!token) return
    setStatusLoading(p._id)
    const newStatus = p.status === "resolved" ? "open" : "resolved"
    const { ok, data } = await updateProblemApi(p._id, { status: newStatus }, token)
    if (ok && data.problem) {
      setProblems((prev) => prev.map((x) => x._id === data.problem!._id ? data.problem! : x))
    }
    setStatusLoading(null)
  }

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Delete this problem permanently?")) return
    setDeleteLoading(id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/problems/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      setProblems((prev) => prev.filter((p) => p._id !== id))
    }
    setDeleteLoading(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
      </div>
    )
  }

  const maxDaily = stats?.daily ? Math.max(...stats.daily.map((d) => d.posts), 1) : 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/problems" className="group mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-400 transition-all hover:text-teal-600">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Problems
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Manage Problems</h1>
              <p className="mt-1 text-sm text-slate-400">View, edit, and manage your shared problems</p>
            </div>
          </div>

          {stats && (
            <div className="mb-8 grid grid-cols-3 gap-4">
              {[
                { label: "Total Posts", value: stats.postCount, color: "from-teal-500 to-emerald-500" },
                { label: "Resolved", value: stats.solvedCount, color: "from-emerald-500 to-teal-500" },
                { label: "Comments", value: stats.commentCount, color: "from-violet-500 to-purple-500" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
                  <p className={`mt-1 text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {stats && stats.daily.length > 0 && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Your Activity (Last 7 Days)</h3>
              <div className="flex items-end gap-2 sm:gap-3" style={{ height: 120 }}>
                {stats.daily.map((d) => {
                  const pct = (d.posts / maxDaily) * 100
                  const day = new Date(d.date).toLocaleDateString("en", { weekday: "short" })
                  return (
                    <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-[10px] font-medium text-slate-400">{d.posts}</span>
                      <div className="relative w-full rounded-md bg-teal-100 transition-all" style={{ height: 100 }}>
                        <div className="absolute bottom-0 w-full rounded-md bg-gradient-to-t from-teal-500 to-teal-400 transition-all duration-500"
                          style={{ height: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">{day}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur">
              <div className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4" />{error}</div>
            </div>
          )}

          {problems.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <AlertCircle className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-500">No problems yet</p>
              <Link href="/problems/create" className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-700">
                Share Your First Problem
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-4 py-3 font-semibold text-slate-600 sm:px-5">Title</th>
                      <th className="hidden px-4 py-3 font-semibold text-slate-600 sm:table-cell">Category</th>
                      <th className="hidden px-4 py-3 font-semibold text-slate-600 md:table-cell">Priority</th>
                      <th className="hidden px-4 py-3 font-semibold text-slate-600 lg:table-cell">Status</th>
                      <th className="hidden px-4 py-3 font-semibold text-slate-600 lg:table-cell">Date</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-600 sm:px-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map((p) => (
                      <tr key={p._id} className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
                        <td className="px-4 py-4 sm:px-5">
                          <Link href={`/problems/${p._id}`} className="font-medium text-slate-800 transition-colors hover:text-teal-600 cursor-pointer">
                            {p.title}
                          </Link>
                        </td>
                        <td className="hidden px-4 py-4 sm:table-cell">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${catColors[p.category] || "bg-slate-100 text-slate-600"}`}>{p.category}</span>
                        </td>
                        <td className="hidden px-4 py-4 md:table-cell">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${priColors[p.priority] || priColors.Low}`}>{p.priority}</span>
                        </td>
                        <td className="hidden px-4 py-4 lg:table-cell">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${p.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                            {p.status === "resolved" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {p.status}
                          </span>
                        </td>
                        <td className="hidden px-4 py-4 text-xs text-slate-400 lg:table-cell">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(p.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-4 py-4 sm:px-5">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => openEdit(p)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-teal-50 hover:text-teal-600"
                              title="Edit"><Edit3 className="h-4 w-4" /></button>
                            <button onClick={() => toggleStatus(p)} disabled={statusLoading === p._id}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-emerald-50 hover:text-emerald-600"
                              title={p.status === "resolved" ? "Reopen" : "Mark solved"}>
                              {statusLoading === p._id ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-600" /> : <CheckCircle className="h-4 w-4" />}
                            </button>
                            <button onClick={() => handleDelete(p._id)} disabled={deleteLoading === p._id}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                              title="Delete">
                              {deleteLoading === p._id ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" /> : <Trash2 className="h-4 w-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {editProblem && (
        <div onClick={() => setEditProblem(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Edit Problem</h2>
              <button onClick={() => setEditProblem(null)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Title</label>
                <input type="text" value={editForm.title} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Short Description</label>
                <textarea rows={2} value={editForm.shortDescription} onChange={(e) => setEditForm((f) => ({ ...f, shortDescription: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Full Description</label>
                <textarea rows={3} value={editForm.fullDescription} onChange={(e) => setEditForm((f) => ({ ...f, fullDescription: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">Category</label>
                  <select value={editForm.category} onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">Priority</label>
                  <select value={editForm.priority} onChange={(e) => setEditForm((f) => ({ ...f, priority: e.target.value }))}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setEditProblem(null)}
                className="cursor-pointer rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-slate-50"
              >Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-700 disabled:opacity-50"
              >{saving ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
