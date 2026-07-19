"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Bot, Sparkles, Brain, MessageSquareText,
} from "lucide-react"

export default function AISolverPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login")
    }
  }, [session, isPending, router])

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="group mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-400 transition-all hover:text-teal-600">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">AI Problem Solver</h1>
              <p className="mt-1 text-sm text-slate-400">Get personalized AI-powered solutions for your problems</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/chat"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-teal-50 transition-all duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <MessageSquareText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Chat</h3>
                <p className="mt-1 text-sm text-slate-500">Chat with our AI assistant about anything. Get instant advice, emotional support, or just someone to talk to.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-all group-hover:gap-2">
                  Start Chatting <ArrowLeft className="h-4 w-4 rotate-180" />
                </span>
              </div>
            </Link>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-violet-50 transition-all duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                  <Bot className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Problem Solver</h3>
                <p className="mt-1 text-sm text-slate-500">Describe your problem in detail and get structured, actionable solutions tailored to your situation.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition-all group-hover:gap-2">
                  Solve Now <ArrowLeft className="h-4 w-4 rotate-180" />
                </span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-teal-50 p-6 text-center sm:p-8"
          >
            <Sparkles className="mx-auto h-8 w-8 text-violet-500" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">Coming Soon: Full AI Integration</h3>
            <p className="mt-1 text-sm text-slate-500">
              Our AI solver is being trained on thousands of real-life scenarios to provide you with the most relevant and compassionate solutions. Stay tuned!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
