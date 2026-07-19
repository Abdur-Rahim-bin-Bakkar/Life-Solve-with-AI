"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Sparkles, ArrowRight } from "lucide-react"

const messages = [
  { role: "user", content: "I've been feeling really anxious about my job interview tomorrow. Any advice?" },
  { role: "ai", content: "I understand interview anxiety can be overwhelming. Here's a personalized plan to help you prepare:\n\n1. **Prepare your stories** — Use the STAR method for common questions\n2. **Practice power poses** — 2 minutes before the interview boosts confidence\n3. **Box breathing** — Inhale 4s, hold 4s, exhale 4s, hold 4s\n4. **Prepare 3 questions** — Shows genuine interest in the role\n\nWould you like me to help you practice with mock interview questions?" },
]

export default function AIShowcase() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="AI-Powered Problem Solving"
          subtitle="Our AI understands your situation and delivers personalized solutions"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                <Bot className="h-3.5 w-3.5 text-violet-500" />
                LifeSolve AI AI Assistant
              </div>
            </div>

            <div className="space-y-4 p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user"
                        ? "bg-teal-100 text-teal-600"
                        : "bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg"
                    }`}
                  >
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-slate-100 text-slate-800"
                        : "rounded-tl-sm bg-gradient-to-br from-violet-50 to-violet-100/50 text-slate-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-2 pl-11 text-xs text-slate-400"
              >
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "300ms" }} />
                </span>
                AI is typing...
              </motion.div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Badge variant="teal" className="gap-1.5">
              <Sparkles className="h-3 w-3" />
              Context-Aware
            </Badge>
            <Badge variant="violet" className="gap-1.5">
              <Sparkles className="h-3 w-3" />
              Always Learning
            </Badge>
            <Badge variant="amber" className="gap-1.5">
              <Sparkles className="h-3 w-3" />
              24/7 Available
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="mb-4 text-sm text-slate-500">Let&apos;s start problem-solving with AI Chat & Solver</p>
            <Link
              href="/problems/solve"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105"
            >
              Try AI Solver <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
