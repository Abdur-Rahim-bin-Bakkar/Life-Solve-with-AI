"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  MessageSquare, Send, Search, ChevronLeft, ChevronRight,
  Loader2, Inbox, Clock, User, Users,
} from "lucide-react"
import {
  getAllUsers, getConversations, getOrCreateConversation,
  getMessages, sendMessage,
  type UserData, type ConversationData, type MessageData,
} from "@/lib/api/messages/messages"

export default function MessagesPage() {
  const router = useRouter()
  const { data: session, isPending: authLoading } = authClient.useSession()
  const token = session?.session?.token
  const currentUserId = session?.user?.id
  const currentUserName = session?.user?.name

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [users, setUsers] = useState<UserData[]>([])
  const [conversations, setConversations] = useState<ConversationData[]>([])
  const [activeConv, setActiveConv] = useState<ConversationData | null>(null)
  const [messages, setMessages] = useState<MessageData[]>([])
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [convLoading, setConvLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  useEffect(() => {
    if (!authLoading && !session?.user) { router.push("/login") }
  }, [session, authLoading, router])

  useEffect(() => {
    if (token) {
      Promise.all([getAllUsers(token), getConversations(token)])
        .then(([uRes, cRes]) => {
          if (uRes.ok) setUsers(uRes.data.users || [])
          if (cRes.ok) setConversations(cRes.data.conversations || [])
        })
        .catch(() => setError("Failed to load"))
        .finally(() => setLoading(false))
    }
  }, [token])

  const convUserIds = new Set(conversations.map((c) => c.otherUserId))
  const conversationUsers = conversations.map((c) => ({
    ...c,
    user: users.find((u) => u._id === c.otherUserId),
  }))
  const otherUsers = users.filter((u) => !convUserIds.has(u._id))

  const filteredConversations = conversationUsers.filter((c) =>
    c.otherUserName.toLowerCase().includes(search.toLowerCase())
  )
  const filteredOther = otherUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  async function handleSelectUser(participantId: string) {
    if (!token) return
    setConvLoading(true)
    setError("")
    try {
      const { ok, data } = await getOrCreateConversation(token, participantId)
      if (!ok) { setError(data.error || "Failed to start conversation"); return }
      setActiveConv(data.conversation)
      const existing = conversations.find((c) => c.otherUserId === participantId)
      if (!existing) {
        setConversations((prev) => [data.conversation, ...prev])
      }
      const mRes = await getMessages(token, data.conversation._id)
      if (mRes.ok) {
        setMessages(mRes.data.messages || [])
      }
    } catch {
      setError("Failed to load conversation")
    } finally {
      setConvLoading(false)
    }
  }

  async function handleSend(msg?: string) {
    const text = msg || input.trim()
    if (!text || sending || !token || !activeConv) return
    setSending(true)
    setInput("")

    const optMsg: MessageData = {
      _id: `opt-${Date.now()}`,
      conversationId: activeConv._id,
      senderId: currentUserId || "",
      senderName: currentUserName || "",
      senderImage: session?.user?.image || null,
      receiverId: activeConv.otherUserId,
      content: text,
      read: false,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optMsg])
    scrollToBottom()

    try {
      const { ok, data } = await sendMessage(token, activeConv._id, text)
      if (ok && data.message) {
        setMessages((prev) => prev.map((m) => m._id === optMsg._id ? data.message : m))
        setConversations((prev) =>
          prev.map((c) =>
            c._id === activeConv._id
              ? { ...c, lastMessage: text.slice(0, 100), lastMessageBy: currentUserId || "", lastMessageAt: new Date().toISOString() }
              : c
          )
        )
      } else {
        setMessages((prev) => prev.filter((m) => m._id !== optMsg._id))
        setError("Failed to send")
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== optMsg._id))
      setError("Failed to send")
    } finally {
      setSending(false)
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
    if (days === 0) return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    if (days === 1) return "Yesterday"
    if (days < 7) return d.toLocaleDateString("en-US", { weekday: "short" })
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  function formatMsgTime(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  function isOwnMessage(msg: MessageData) {
    return msg.senderId === currentUserId
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
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
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
              initial={{ x: -360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -360, opacity: 0 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-[340px] border-r border-slate-200 bg-white/95 backdrop-blur-xl lg:relative lg:top-0 lg:h-auto lg:bg-white/80"
            >
              <div className="flex h-full w-full flex-col">
                <div className="bg-gradient-to-r from-teal-500 to-violet-500 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">Messages</h2>
                      <p className="text-[11px] text-white/70">{conversations.length} active conversations</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 px-4 py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search people..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
                    </div>
                  ) : (
                    <div className="p-3">
                      {filteredConversations.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 px-2 py-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              Conversations
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                              {filteredConversations.length}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            {filteredConversations.map((c) => (
                              <button
                                key={c._id}
                                onClick={() => {
                                  handleSelectUser(c.otherUserId)
                                  if (window.innerWidth < 1024) setSidebarOpen(false)
                                }}
                                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                                  activeConv?._id === c._id
                                    ? "bg-gradient-to-r from-teal-50 to-violet-50 shadow-sm"
                                    : "hover:bg-slate-50"
                                }`}
                              >
                                <div className="relative shrink-0">
                                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 text-sm font-bold text-white shadow-sm ring-2 ring-white">
                                    {c.otherUserImage ? (
                                      <img src={c.otherUserImage} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                      c.otherUserName.charAt(0).toUpperCase()
                                    )}
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`truncate text-sm font-semibold ${
                                      activeConv?._id === c._id ? "text-slate-900" : "text-slate-700"
                                    }`}>
                                      {c.otherUserName}
                                    </span>
                                    {c.lastMessageAt && (
                                      <span className="shrink-0 text-[10px] font-medium text-slate-400">
                                        {formatTime(c.lastMessageAt)}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {c.lastMessage ? (
                                      <p className="truncate text-xs text-slate-400">
                                        {c.lastMessageBy === currentUserId && <span className="text-teal-500">You: </span>}
                                        {c.lastMessage}
                                      </p>
                                    ) : (
                                      <p className="text-xs text-teal-500 font-medium">Start chatting</p>
                                    )}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredOther.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-2">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              All Members
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                              {filteredOther.length}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            {filteredOther.map((u) => (
                              <button
                                key={u._id}
                                onClick={() => {
                                  handleSelectUser(u._id)
                                  if (window.innerWidth < 1024) setSidebarOpen(false)
                                }}
                                className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-slate-50"
                              >
                                <div className="relative shrink-0">
                                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 text-sm font-bold text-white shadow-sm ring-2 ring-white">
                                    {u.image ? (
                                      <img src={u.image} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                      u.name.charAt(0).toUpperCase()
                                    )}
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="truncate text-sm font-medium text-slate-700 group-hover:text-slate-900">
                                    {u.name}
                                  </span>
                                  <p className="text-xs text-slate-400">Send a message</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredConversations.length === 0 && filteredOther.length === 0 && (
                        <div className="flex flex-col items-center py-16 px-4 text-center">
                          <Search className="mb-3 h-8 w-8 text-slate-300" />
                          <p className="text-sm text-slate-400">No users found</p>
                          <button onClick={() => setSearch("")} className="mt-2 text-xs text-teal-600 hover:text-teal-700">
                            Clear search
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-violet-500">
                      <MessageSquare className="h-3 w-3 text-white" />
                    </div>
                    <span>{users.length} people available</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex flex-1 flex-col min-w-0">
          {!activeConv ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-100 to-violet-100 shadow-lg shadow-teal-500/10">
                  <Inbox className="h-10 w-10 text-teal-600" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-900">Your Messages</h2>
                <p className="mx-auto mb-6 max-w-sm text-sm text-slate-400 leading-relaxed">
                  Select a person from the sidebar to start a private conversation. Messages are only visible to you and the recipient.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { label: "Browse members", icon: Users },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSearch("")
                        setSidebarOpen(true)
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-teal-200 hover:text-teal-600 hover:shadow-md"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : convLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-slate-200 bg-white/50 px-4 py-3 backdrop-blur-sm lg:px-6">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 lg:hidden"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 text-sm font-bold text-white shadow-sm ring-2 ring-white">
                    {activeConv.otherUserImage ? (
                      <img src={activeConv.otherUserImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      activeConv.otherUserName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-slate-900">{activeConv.otherUserName}</h2>
                  <p className="flex items-center gap-1 text-xs text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-6">
                <div className="mx-auto max-w-3xl space-y-3">
                  {messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center py-16 text-center"
                    >
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                        <MessageSquare className="h-7 w-7 text-teal-500" />
                      </div>
                      <p className="font-semibold text-slate-900">No messages yet</p>
                      <p className="mt-1 text-sm text-slate-400">Send a message to start the conversation</p>
                    </motion.div>
                  ) : (
                    messages.map((msg, i) => {
                      const own = isOwnMessage(msg)
                      const showAvatar = !own && (i === 0 || messages[i - 1]?.senderId !== msg.senderId)
                      const isFirstOfGroup = !own && showAvatar
                      const isFirstSentOfGroup = own && (i === 0 || messages[i - 1]?.senderId !== msg.senderId)

                      return (
                        <motion.div
                          key={msg._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${own ? "justify-end" : "justify-start"}`}
                        >
                          {!own && (
                            <div className={`flex flex-col justify-end ${showAvatar ? "" : "invisible"}`}>
                              <div className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 text-xs font-bold text-white shadow-sm ring-2 ring-white`}>
                                {activeConv.otherUserImage ? (
                                  <img src={activeConv.otherUserImage} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  activeConv.otherUserName.charAt(0).toUpperCase()
                                )}
                              </div>
                            </div>
                          )}
                          <div className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${own ? "items-end" : "items-start"}`}>
                            <div
                              className={`w-fit px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                                own
                                  ? "bg-gradient-to-r from-teal-500 to-violet-500 text-white rounded-2xl rounded-br-md"
                                  : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md"
                              }`}
                            >
                              {msg.content}
                            </div>
                            <div className="flex items-center gap-1.5 px-1 pt-1">
                              <span className={`text-[10px] font-medium ${
                                own ? "text-slate-400" : "text-slate-400"
                              }`}>
                                {formatMsgTime(msg.createdAt)}
                              </span>
                            </div>
                          </div>
                          {own && (
                            <div className="flex flex-col justify-end">
                              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 text-xs font-bold text-white shadow-sm ring-2 ring-white">
                                {session?.user?.image ? (
                                  <img src={session.user.image} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  session?.user?.name?.charAt(0).toUpperCase() || "U"
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })
                  )}

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-rose-500">
                      {error}
                    </motion.p>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-sm lg:px-6">
                <div className="mx-auto flex max-w-3xl items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-teal-400 focus:bg-white focus:ring-1 focus:ring-teal-400"
                    onInput={(e) => {
                      const el = e.currentTarget
                      el.style.height = "auto"
                      el.style.height = Math.min(el.scrollHeight, 120) + "px"
                    }}
                    disabled={sending}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || sending}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 text-white shadow-sm transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-slate-400">
                  Press Enter to send &middot; Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
