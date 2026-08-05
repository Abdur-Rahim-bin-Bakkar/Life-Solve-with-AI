"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { Bot, User, Sparkles, ArrowRight, Brain, ShieldCheck, Timer, Cpu } from "lucide-react"

const demos = [
  {
    user: "I've been feeling really anxious about my job interview tomorrow. Any advice?",
    ai: "I understand interview anxiety can be overwhelming. Try the **STAR method** for stories, 2 minutes of **power poses**, and **box breathing** (4-4-4-4) right before the call. Want me to run a mock interview with you?",
  },
  {
    user: "I can't stop thinking about my breakup. How do I move forward?",
    ai: "Healing isn't linear, and that's okay. Start by **naming your feelings** in a journal, keep a tiny daily routine, and let friends support you. Each week, reflect on one small win — you're rebuilding, one day at a time.",
  },
  {
    user: "Money stress is keeping me up at night. What can I do?",
    ai: "You're not alone. Try the **50/30/20 rule** to get a simple overview, pause non-essential subscriptions for 30 days, and list your top 3 debts to tackle smallest-first for quick wins.",
  },
]

const features = [
  { icon: Brain, title: "Context-aware", desc: "Understands your unique situation" },
  { icon: ShieldCheck, title: "Private", desc: "Conversations stay confidential" },
  { icon: Timer, title: "Instant", desc: "Personalized answers in seconds" },
  { icon: Cpu, title: "24/7", desc: "Always available, day or night" },
]

export default function AIShowcase() {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<"user" | "typing" | "ai" | "done">("user")

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase("typing"), 1400))
    timers.push(setTimeout(() => setPhase("ai"), 2000))
    timers.push(setTimeout(() => setPhase("done"), 5200))
    timers.push(
      setTimeout(() => {
        setStep((p) => (p + 1) % demos.length)
        setPhase("user")
      }, 6400),
    )
    return () => timers.forEach(clearTimeout)
  }, [step])

  const current = demos[step]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="AI-Powered Problem Solving"
          subtitle="Watch our AI understand your situation and deliver personalized solutions"
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900">
              A companion that <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">truly listens</span>
            </h3>
            <p className="mt-3 text-slate-500">
              Describe what&apos;s on your mind and get structured, empathetic, actionable help — in
              your own words, on your own time.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 text-white shadow-lg shadow-teal-500/20 transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{f.title}</p>
                    <p className="text-sm text-slate-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/problems/solve"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Try AI Solver <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" /> Free · No sign-up needed
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-400/20 via-violet-400/20 to-amber-400/20 blur-2xl"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Bot className="h-3.5 w-3.5 text-violet-500" />
                  LifeSolve AI Assistant
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Online
                </span>
              </div>

              <div className="flex min-h-[300px] flex-col justify-end space-y-4 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-end gap-2.5">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-800">
                        {current.user}
                      </div>
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                        <User className="h-4 w-4 text-teal-600" />
                      </div>
                    </div>

                    {phase !== "user" && (
                      <div className="flex justify-start gap-2.5">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        {phase === "typing" ? (
                          <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-gradient-to-br from-violet-50 to-violet-100/50 px-4 py-3">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "300ms" }} />
                          </div>
                        ) : (
                          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-violet-50 to-violet-100/50 px-4 py-2.5 text-sm leading-relaxed text-slate-700">
                            {current.ai}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 bg-slate-50 py-2.5">
                {demos.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-violet-500" : "w-1.5 bg-slate-300"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
