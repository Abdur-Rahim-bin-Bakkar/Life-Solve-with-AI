"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Bot, Sparkles, Brain, MessageSquareText,
  Plus, Send, Clock, ChevronLeft, ChevronRight,
  Lightbulb, Target, Compass, PenLine, CheckCircle2,
  Loader2
} from "lucide-react"
import { sendSolverMessage, getSolverSessions, getSolverSession } from "@/lib/api/ai/ai"
import type { AISession, AIMessage } from "@/lib/api/ai/ai"

export default function AISolverPage() {
  const router = useRouter()
  const { data: session, isPending: authLoading } = authClient.useSession()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [sessions, setSessions] = useState<AISession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [error, setError] = useState("")

  const token = session?.session?.token

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText, scrollToBottom])

  useEffect(() => {
    if (!authLoading && !session?.user) {
      router.push("/login")
    }
  }, [session, authLoading, router])

  useEffect(() => {
    if (token) {
      loadSessions()
    }
  }, [token])

  async function loadSessions() {
    if (!token) return
    setLoadingSessions(true)
    try {
      const { sessions: s } = await getSolverSessions(token)
      setSessions(s)
    } catch {
      setError("Failed to load sessions")
    } finally {
      setLoadingSessions(false)
    }
  }

  async function loadSession(id: string) {
    if (!token) return
    try {
      const { session: s } = await getSolverSession(id, token)
      setMessages(s.messages)
      setActiveSessionId(s._id)
      setError("")
    } catch {
      setError("Failed to load session")
    }
  }

  function startNewSession() {
    setActiveSessionId(null)
    setMessages([])
    setStreamingText("")
    setError("")
    inputRef.current?.focus()
  }

  async function handleSend() {
    const msg = input.trim()
    if (!msg || streaming || !token) return

    setInput("")
    setStreaming(true)
    setStreamingText("")
    setError("")

    const userMessage: AIMessage = { role: "user", content: msg }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await sendSolverMessage(msg, activeSessionId, token)

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        setError(err.error || "Failed to get AI response")
        setStreaming(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setError("No response stream available")
        setStreaming(false)
        return
      }

      const decoder = new TextDecoder()
      let fullText = ""
      let newSessionId = activeSessionId

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6).trim()
          if (!data) continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              fullText += parsed.text
              setStreamingText(fullText)
            }
            if (parsed.done) {
              newSessionId = parsed.sessionId
            }
            if (parsed.error) {
              setError(parsed.error)
            }
          } catch { }
        }
      }

      const aiMessage: AIMessage = { role: "assistant", content: fullText }
      setMessages((prev) => [...prev, aiMessage])
      setStreamingText("")
      setActiveSessionId(newSessionId)
      await loadSessions()
    } catch {
      setError("Connection failed. Is the backend running?")
    } finally {
      setStreaming(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function formatTime(dateStr: string) {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days}d ago`
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  function renderMarkdown(text: string) {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let inList = false
    let listItems: string[] = []

    lines.forEach((line, i) => {
      const trimmed = line.trim()

      if (trimmed.startsWith("### ")) {
        if (inList) {
          elements.push(<ul key={`ul-${i}`} className="mb-3 list-disc space-y-1 pl-5">{listItems.map((item, j) => <li key={j}>{item}</li>)}</ul>)
          listItems = []
          inList = false
        }
        elements.push(<h3 key={i} className="mb-2 mt-4 text-base font-bold text-slate-900">{trimmed.slice(4)}</h3>)
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        if (inList) {
          elements.push(<ul key={`ul-${i}`} className="mb-3 list-disc space-y-1 pl-5">{listItems.map((item, j) => <li key={j}>{item}</li>)}</ul>)
          listItems = []
          inList = false
        }
        elements.push(<p key={i} className="mb-1 font-semibold text-slate-800">{trimmed.replace(/\*\*/g, "")}</p>)
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true
        listItems.push(trimmed.slice(2))
      } else if (trimmed === "") {
        if (inList) {
          elements.push(<ul key={`ul-${i}`} className="mb-3 list-disc space-y-1 pl-5">{listItems.map((item, j) => <li key={j}>{item}</li>)}</ul>)
          listItems = []
          inList = false
        }
      } else {
        if (inList) {
          elements.push(<ul key={`ul-${i}`} className="mb-3 list-disc space-y-1 pl-5">{listItems.map((item, j) => <li key={j}>{item}</li>)}</ul>)
          listItems = []
          inList = false
        }
        const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
        elements.push(<p key={i} className="mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: withBold }} />)
      }
    })

    if (inList) {
      elements.push(<ul key="ul-end" className="mb-3 list-disc space-y-1 pl-5">{listItems.map((item, j) => <li key={j}>{item}</li>)}</ul>)
    }

    return elements
  }

  function hasReadyToShare(content: string) {
    return content.includes("### Ready to Share")
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    )
  }

  if (!session?.user) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative flex flex-1">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed left-3 top-20 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 lg:hidden"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
        </button>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex-shrink-0 border-r border-slate-200 bg-white/80 backdrop-blur-sm lg:relative lg:block"
            >
              <div className="flex h-full w-[300px] flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-violet-500" />
                    <span className="text-sm font-semibold text-slate-700">Sessions</span>
                  </div>
                  <button
                    onClick={startNewSession}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-violet-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:shadow-md"
                  >
                    <Plus className="h-3.5 w-3.5" /> New
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  {loadingSessions ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="px-2 py-12 text-center">
                      <MessageSquareText className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                      <p className="text-sm text-slate-400">No sessions yet</p>
                      <p className="mt-1 text-xs text-slate-300">Start a new conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {sessions.map((s) => (
                        <button
                          key={s._id}
                          onClick={() => loadSession(s._id)}
                          className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                            activeSessionId === s._id
                              ? "bg-gradient-to-r from-teal-50 to-violet-50 shadow-sm"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <p className={`truncate text-sm font-medium ${
                            activeSessionId === s._id ? "text-slate-900" : "text-slate-700"
                          }`}>
                            {s.title}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="h-3 w-3" />
                            {formatTime(s.updatedAt)}
                            <span>·</span>
                            <span>{s.messageCount} msgs</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 p-3">
                  <Link
                    href="/problems"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Problems
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-white/50 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-slate-900">AI Problem Solver</h2>
              <p className="text-xs text-slate-400">Articulate your problem · Get insights · Share with community</p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                <Sparkles className="h-3 w-3" /> Powered by Groq
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {messages.length === 0 && !streaming ? (
              <WelcomeScreen onPromptClick={(p) => { setInput(p); setTimeout(() => inputRef.current?.focus(), 100) }} />
            ) : (
              <div className="mx-auto max-w-3xl space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] sm:max-w-[75%] ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-sm text-white shadow-sm"
                        : "rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                    }`}>
                      {msg.role === "user" ? (
                        <p className="leading-relaxed">{msg.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:text-slate-900">
                          {renderMarkdown(msg.content)}
                          {hasReadyToShare(msg.content) && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-4 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-teal-50/50 p-4"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                <span className="text-sm font-semibold text-teal-800">Ready to Share?</span>
                              </div>
                              <p className="mb-3 text-xs text-teal-700">Turn your insights into a community post and get support from others.</p>
                              <Link
                                href="/problems/create"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:shadow-md"
                              >
                                <PenLine className="h-3.5 w-3.5" /> Create Post
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 shadow-sm">
                        <span className="text-xs font-bold text-white">
                          {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {streaming && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      {streamingText ? (
                        <div className="prose prose-sm max-w-none">
                          {renderMarkdown(streamingText)}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-2">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {error && (
            <div className="mx-auto max-w-3xl px-4 pb-2">
              <p className="text-sm text-rose-500">{error}</p>
            </div>
          )}

          <div className="border-t border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-sm sm:px-6">
            <div className="mx-auto flex max-w-3xl items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your problem or question..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-teal-400 focus:bg-white focus:ring-1 focus:ring-teal-400"
                onInput={(e) => {
                  const el = e.currentTarget
                  el.style.height = "auto"
                  el.style.height = Math.min(el.scrollHeight, 120) + "px"
                }}
                disabled={streaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 text-white shadow-sm transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1.5 text-center text-xs text-slate-400">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const promptStyles: Record<string, { bg: string; text: string }> = {
  violet: { bg: "bg-violet-100", text: "text-violet-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
}

function WelcomeScreen({ onPromptClick }: { onPromptClick: (prompt: string) => void }) {
  const prompts = [
    { icon: Lightbulb, text: "I'm feeling stuck in my career and don't know what to do next", color: "violet" },
    { icon: HeartPulseIcon, text: "I'm struggling with anxiety and need coping strategies", color: "teal" },
    { icon: Target, text: "Help me set and achieve my personal goals", color: "emerald" },
    { icon: Compass, text: "I need help making a difficult life decision", color: "amber" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-2xl flex-col items-center justify-center py-12 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
        <Brain className="h-8 w-8 text-white" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">How can I help you today?</h2>
      <p className="mb-8 max-w-md text-sm text-slate-400">
        I&apos;ll help you articulate your problem, explore solutions, and prepare a post to share with the community.
      </p>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {prompts.map((p, i) => {
          const style = promptStyles[p.color] || promptStyles.violet
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onPromptClick(p.text)}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                <p.icon className={`h-4 w-4 ${style.text}`} />
              </div>
              <p className="text-sm text-slate-600 group-hover:text-slate-900">{p.text}</p>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-10 flex items-center gap-2 text-xs text-slate-300">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Powered by Groq AI · Your conversations are private</span>
      </div>
    </motion.div>
  )
}

function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <polyline points="3.5 12 7 12 9 8 12 14 14 10 16 12 20.5 12" />
    </svg>
  )
}
