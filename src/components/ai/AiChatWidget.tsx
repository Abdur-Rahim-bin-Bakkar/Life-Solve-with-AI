"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, MessageSquareText, Send, Sparkles, Trash2, X } from "lucide-react"
import { sendQuickChatMessage } from "@/lib/api/ai/ai"

interface QuickMessage {
  role: "user" | "assistant"
  content: string
}

const suggestedPrompts = [
  "How can I reduce stress at work?",
  "Give me a simple recipe for dinner",
  "Explain how databases work",
  "Help me write a polite follow-up email",
]

function renderMarkdown(text: string) {
  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let inList = false
  let listItems: string[] = []

  lines.forEach((line, i) => {
    const trimmed = line.trim()

    if (trimmed.startsWith("### ")) {
      if (inList) {
        elements.push(
          <ul key={`ul-${i}`} className="mb-2 list-disc space-y-1 pl-4">
            {listItems.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
      elements.push(
        <h3 key={i} className="mb-1 mt-2 text-sm font-bold text-violet-800">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true
      listItems.push(trimmed.slice(2))
    } else if (trimmed === "") {
      if (inList) {
        elements.push(
          <ul key={`ul-${i}`} className="mb-2 list-disc space-y-1 pl-4">
            {listItems.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
    } else {
      if (inList) {
        elements.push(
          <ul key={`ul-${i}`} className="mb-2 list-disc space-y-1 pl-4">
            {listItems.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
      const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-violet-900">$1</strong>')
      elements.push(
        <p key={i} className="mb-1.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: withBold }} />
      )
    }
  })

  if (inList) {
    elements.push(
      <ul key="ul-end" className="mb-2 list-disc space-y-1 pl-4">
        {listItems.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    )
  }

  return elements
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<QuickMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText, scrollToBottom])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [open])

  function clearChat() {
    setMessages([])
    setStreamingText("")
    setError("")
  }

  function toggleOpen() {
    setOpen((prev) => !prev)
    if (open) {
      setError("")
    }
  }

  async function handleSend(prompt?: string) {
    const text = (prompt ?? input).trim()
    if (!text || streaming) return

    setInput("")
    setStreaming(true)
    setStreamingText("")
    setError("")

    const nextMessages: QuickMessage[] = [...messages, { role: "user", content: text }]
    setMessages(nextMessages)

    try {
      const res = await sendQuickChatMessage(nextMessages)

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
            if (parsed.error) {
              setError(parsed.error)
            }
          } catch {}
        }
      }

      if (fullText) {
        setMessages((prev) => [...prev, { role: "assistant", content: fullText }])
      }
      setStreamingText("")
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

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="mb-4 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-violet-500 to-teal-500 px-4 py-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">LifeSolve AI Assistant</h3>
                <p className="truncate text-xs text-white/70">Ask me anything · Replies are private</p>
              </div>
              <button
                onClick={clearChat}
                aria-label="Clear conversation"
                className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={toggleOpen}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-4 py-4">
              {messages.length === 0 && !streaming ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-teal-500 shadow-lg shadow-violet-500/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-slate-900">Hi, how can I help?</h4>
                  <p className="mb-5 max-w-[240px] text-xs text-slate-400">
                    Ask any question — nothing you say here is stored or saved.
                  </p>
                  <div className="grid w-full gap-2">
                    {suggestedPrompts.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(p)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs text-slate-600 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-teal-500">
                          <Bot className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] px-3 py-2 text-sm shadow-sm ${
                          msg.role === "user"
                            ? "rounded-2xl rounded-tr-sm bg-gradient-to-r from-violet-500 to-violet-600 text-white"
                            : "rounded-2xl rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <p className="leading-relaxed">{msg.content}</p>
                        ) : (
                          <div>{renderMarkdown(msg.content)}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {streaming && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-start">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-teal-500">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                        {streamingText ? (
                          <div>{renderMarkdown(streamingText)}</div>
                        ) : (
                          <div className="flex items-center gap-1.5 py-1">
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
              <div className="border-t border-rose-100 bg-rose-50 px-4 py-2">
                <p className="text-xs text-rose-500">{error}</p>
              </div>
            )}

            <div className="border-t border-slate-200 bg-white px-3 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-1 focus:ring-violet-400"
                  onInput={(e) => {
                    const el = e.currentTarget
                    el.style.height = "auto"
                    el.style.height = Math.min(el.scrollHeight, 96) + "px"
                  }}
                  disabled={streaming}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || streaming}
                  aria-label="Send message"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-teal-500 text-white shadow-sm transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-slate-400">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-teal-500 text-white shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-xl hover:shadow-violet-500/40"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
