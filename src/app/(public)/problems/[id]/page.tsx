"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import {
  ArrowLeft, ThumbsUp, Heart, Frown, Send, Edit3, Trash2, X, Check,
  AlertCircle, Sparkles, Clock, User, MessageCircle, Image as ImageIcon,
  Brain, Wallet, Briefcase, HeartHandshake, HeartPulse, Siren,
} from "lucide-react"
import Link from "next/link"
import {
  getProblemById, toggleReaction,
  getComments, createComment, updateComment, deleteComment,
  ProblemData, CommentData
} from "@/lib/api/problems/problem"

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  "Mental Health": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-500" },
  Financial: { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-500" },
  Career: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-500" },
  Relationships: { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-500" },
  "Health & Wellness": { icon: HeartPulse, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-500" },
  Emergency: { icon: Siren, color: "text-red-600", bg: "bg-red-50", border: "border-red-500" },
}

const priorityStyles: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-100 text-red-700",
}

const reactionsConfig = [
  { type: "like" as const, icon: ThumbsUp, label: "Like", activeClass: "text-blue-500 bg-blue-50 border-blue-200", hoverClass: "hover:text-blue-500 hover:bg-blue-50 hover:border-blue-200" },
  { type: "love" as const, icon: Heart, label: "Love", activeClass: "text-rose-500 bg-rose-50 border-rose-200", hoverClass: "hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200" },
  { type: "sad" as const, icon: Frown, label: "Sad", activeClass: "text-amber-500 bg-amber-50 border-amber-200", hoverClass: "hover:text-amber-500 hover:bg-amber-50 hover:border-amber-200" },
]

export default function ProblemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  const [problem, setProblem] = useState<ProblemData | null>(null)
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [reactions, setReactions] = useState({ likes: 0, loves: 0, sads: 0 })
  const [userReaction, setUserReaction] = useState<string | null>(null)

  const [newComment, setNewComment] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null)

  // image viewer
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  // comment error
  const [commentError, setCommentError] = useState("")

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const [pRes, cRes] = await Promise.all([getProblemById(id), getComments(id)])
      if (pRes.ok && pRes.data.problem) {
        setProblem(pRes.data.problem)
        const r = pRes.data.problem.reactions || { likes: [], loves: [], sads: [] }
        setReactions({
          likes: r.likes?.length || 0,
          loves: r.loves?.length || 0,
          sads: r.sads?.length || 0,
        })
        const uid = session?.user?.id
        if (uid) {
          if (r.likes?.includes(uid)) setUserReaction("like")
          else if (r.loves?.includes(uid)) setUserReaction("love")
          else if (r.sads?.includes(uid)) setUserReaction("sad")
        }
      } else {
        setError(pRes.data.error || "Problem not found")
      }
      if (cRes.ok && cRes.data.comments) {
        setComments(cRes.data.comments)
      }
      setLoading(false)
    })()
  }, [id, session?.user?.id])

  const handleReaction = async (type: "like" | "love" | "sad") => {
    if (!session?.session?.token) { router.push("/login"); return }
    const token = session.session.token
    const prevReaction = userReaction
    const prevCounts = { ...reactions }

    if (userReaction === type) {
      setUserReaction(null)
      setReactions((r) => ({ ...r, [`${type}s`]: r[`${type}s`] - 1 }))
    } else {
      const updates: Record<string, number> = {}
      if (userReaction) updates[`${userReaction}s`] = -1
      updates[`${type}s`] = 1
      setReactions((r) => ({ ...r, ...Object.fromEntries(Object.entries(updates).map(([k, v]) => [k, r[k as keyof typeof r] + v])) }))
      setUserReaction(type)
    }

    const { ok, data } = await toggleReaction(id, type, token)
    if (ok) {
      setReactions(data.reactions)
      setUserReaction(data.reactions.userReaction)
    } else {
      setReactions(prevCounts)
      setUserReaction(prevReaction)
    }
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    if (!session?.session?.token) { router.push("/login"); return }
    setSubmittingComment(true)
    setCommentError("")
    const { ok, data } = await createComment(id, newComment.trim(), session.session.token)
    if (ok && data.comment) {
      setComments((prev) => [data.comment!, ...prev])
      setNewComment("")
    } else {
      setCommentError(data.error || "Failed to post comment")
    }
    setSubmittingComment(false)
  }

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim() || !session?.session?.token) return
    const { ok, data } = await updateComment(id, commentId, editContent.trim(), session.session.token)
    if (ok && data.comment) {
      setComments((prev) => prev.map((c) => c._id === commentId ? data.comment! : c))
      setEditingCommentId(null)
      setEditContent("")
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!session?.session?.token) return
    setDeletingCommentId(commentId)
    const { ok } = await deleteComment(id, commentId, session.session.token)
    if (ok) {
      setComments((prev) => prev.filter((c) => c._id !== commentId))
    }
    setDeletingCommentId(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-16">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !problem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-16">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50"><AlertCircle className="h-8 w-8 text-red-500" /></div>
        <p className="text-lg font-semibold text-slate-700">{error || "Problem not found"}</p>
        <Link href="/problems" className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700">
          <ArrowLeft className="h-4 w-4" /> Back to problems
        </Link>
      </div>
    )
  }

  const meta = catMeta[problem.category] || catMeta["Mental Health"]
  const CatIcon = meta.icon
  const isOwner = session?.user?.id === problem.userId

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/problems" className="group mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-400 transition-all hover:text-teal-600">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Problems
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className={`h-2 ${meta.border.replace("border", "bg")}`} />

            <div className="p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-2.5">
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.color}`}>
                  <CatIcon className="h-3.5 w-3.5" />{problem.category}
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${priorityStyles[problem.priority]}`}>
                  {problem.priority}
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${problem.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                  {problem.status}
                </span>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">{problem.title}</h1>

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                {problem.userImage ? (
                  <img src={problem.userImage} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-sm font-bold text-white">
                    {problem.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-700">{problem.userName}</p>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />{new Date(problem.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              </div>

              <p className="mb-4 text-base font-medium text-slate-700 leading-relaxed">{problem.shortDescription}</p>
              <div className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-slate-500">{problem.fullDescription}</div>

              {problem.images && problem.images.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <ImageIcon className="h-3.5 w-3.5" /> Attachments ({problem.images.length})
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {problem.images.map((url, i) => (
                      <button key={i} onClick={() => setViewerIndex(i)}
                        className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition-all hover:shadow-md"
                      >
                        <img src={url} alt={`Attachment ${i + 1}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:px-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">React to this story</p>
              <div className="flex flex-wrap gap-3">
                {reactionsConfig.map(({ type, icon: Icon, label, activeClass, hoverClass }) => {
                  const active = userReaction === type
                  const countKey = `${type}s` as keyof typeof reactions
                  return (
                    <button key={type} onClick={() => handleReaction(type)}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                        active ? activeClass : `border-slate-200 bg-white text-slate-500 ${hoverClass}`
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
                      <span>{label}</span>
                      <span className={`ml-1 rounded-md px-1.5 py-0.5 text-xs font-bold ${active ? "bg-white/50" : "bg-slate-100 text-slate-500"}`}>
                        {reactions[countKey]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-6 sm:px-8">
              <div className="mb-5 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-bold text-slate-900">Comments</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{comments.length}</span>
              </div>

              {session?.user ? (
                <div className="mb-6">
                  <div className="flex gap-3">
                    {session.user.image ? (
                      <img src={session.user.image} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-slate-100" />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-xs font-bold text-white">
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="flex-1">
                      <textarea ref={commentInputRef} value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={2}
                        placeholder="Share your thoughts..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                      {commentError && <p className="mt-1 text-xs text-red-500">{commentError}</p>}
                      <div className="mt-2 flex justify-end">
                        <button onClick={handleCommentSubmit} disabled={submittingComment || !newComment.trim()}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-700 disabled:opacity-50"
                        >
                          {submittingComment ? "Posting..." : <><Send className="h-3.5 w-3.5" /> Post Comment</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
                  <Link href="/login" className="font-medium text-teal-600 hover:text-teal-700 cursor-pointer">Sign in</Link> to leave a comment
                </div>
              )}

              <div className="space-y-4">
                {comments.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-400">No comments yet. Be the first to share your thoughts.</div>
                )}
                {comments.map((comment) => {
                  const isCommentOwner = session?.user?.id === comment.userId
                  const isEditing = editingCommentId === comment._id
                  const isDeleting = deletingCommentId === comment._id
                  return (
                    <div key={comment._id} className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        {comment.userImage ? (
                          <img src={comment.userImage} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-slate-100" />
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 text-xs font-bold text-white">
                            {comment.userName?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-700">{comment.userName}</span>
                              <span className="text-[11px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                              {comment.updatedAt !== comment.createdAt && <span className="text-[11px] text-slate-300">(edited)</span>}
                            </div>
                            {isCommentOwner && !isEditing && (
                              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <button onClick={() => { setEditingCommentId(comment._id); setEditContent(comment.content) }}
                                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                                ><Edit3 className="h-3.5 w-3.5" /></button>
                                <button onClick={() => handleDeleteComment(comment._id)} disabled={isDeleting}
                                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                                >{isDeleting ? <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" /> : <Trash2 className="h-3.5 w-3.5" />}</button>
                              </div>
                            )}
                          </div>
                          {isEditing ? (
                            <div className="mt-2">
                              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={2}
                                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                              />
                              <div className="mt-2 flex justify-end gap-2">
                                <button onClick={() => { setEditingCommentId(null); setEditContent("") }}
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:bg-slate-50"
                                ><X className="h-3 w-3" /> Cancel</button>
                                <button onClick={() => handleEditComment(comment._id)} disabled={!editContent.trim()}
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-teal-700 disabled:opacity-50"
                                ><Check className="h-3 w-3" /> Save</button>
                              </div>
                            </div>
                          ) : (
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{comment.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* image viewer modal */}
      {viewerIndex !== null && problem.images && (
        <div onClick={() => setViewerIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <button onClick={() => setViewerIndex(null)}
            className="absolute right-6 top-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
          ><X className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            {viewerIndex > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setViewerIndex(viewerIndex - 1) }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              ><ArrowLeft className="h-5 w-5" /></button>
            )}
            <img onClick={(e) => e.stopPropagation()} src={problem.images[viewerIndex]}
              alt="Full view" className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            {viewerIndex < problem.images.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setViewerIndex(viewerIndex + 1) }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              ><ArrowLeft className="h-5 w-5 rotate-180" /></button>
            )}
          </div>
          <p className="absolute bottom-6 text-sm text-white/60">{viewerIndex + 1} / {problem.images.length}</p>
        </div>
      )}
    </div>
  )
}
