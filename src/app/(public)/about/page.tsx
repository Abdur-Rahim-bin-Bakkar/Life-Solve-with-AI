"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles, Heart, Shield, Bot, Users, Globe, Target, Lightbulb,
  MessageSquare, ArrowRight, Quote, Zap, Brain,
  Server, Lock, Gem, Star,
} from "lucide-react"
import { getOverviewStatsApi, OverviewStats } from "@/lib/api/problems/problem"

const values = [
  { icon: Heart, title: "Empathy First", desc: "Every interaction is built on understanding and compassion. We create a safe space where you can be truly heard without judgment." },
  { icon: Shield, title: "Privacy & Safety", desc: "Your identity and conversations are protected. Share anonymously or openly — the choice is always yours. We never sell or share your data." },
  { icon: Bot, title: "AI-Powered Insights", desc: "Our AI provides personalized guidance based on proven psychological frameworks, available 24/7 whenever you need support." },
  { icon: Users, title: "Community Support", desc: "Connect with people who understand what you're going through. You're not alone in this journey — our community is here for you." },
  { icon: Globe, title: "Free & Accessible", desc: "Support should never have a price tag. LifeSolve AI is completely free for everyone who needs it, no subscriptions, no hidden fees." },
  { icon: Lightbulb, title: "Continuous Growth", desc: "We constantly improve our platform based on user feedback and the latest research in mental health and AI technology." },
]

const features = [
  { icon: MessageSquare, title: "Share Your Story", desc: "Post anonymously about any challenge you're facing. Our community and AI are here to listen and help.", color: "from-teal-500 to-emerald-500" },
  { icon: Bot, title: "AI Chat Assistant", desc: "Get instant, thoughtful responses from our AI. Available 24/7 for conversations, advice, and coping strategies.", color: "from-violet-500 to-purple-500" },
  { icon: Users, title: "Direct Messaging", desc: "Connect one-on-one with other community members. Build meaningful relationships through private conversations.", color: "from-amber-500 to-orange-500" },
  { icon: Heart, title: "Community Support", desc: "React, comment, and engage with others' stories. Show support and let people know they're not alone.", color: "from-rose-500 to-pink-500" },
]

const techStack = [
  { icon: Brain, name: "AI & Machine Learning", tech: "Groq / OpenAI" },
  { icon: Server, name: "Backend", tech: "Node.js / Express / MongoDB" },
  { icon: Zap, name: "Frontend", tech: "Next.js / React / TypeScript" },
  { icon: Lock, name: "Authentication", tech: "Better Auth / OAuth" },
  { icon: Gem, name: "Styling", tech: "Tailwind CSS / Framer Motion" },
]

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useIntersectionObserver()

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, value])

  return (
    <span ref={ref} className="text-3xl font-bold text-slate-900 sm:text-4xl">
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

function useIntersectionObserver(): [React.RefObject<HTMLSpanElement | null>, boolean] {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

export default function AboutPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null)

  useEffect(() => {
    ;(async () => {
      const { ok, data } = await getOverviewStatsApi()
      if (ok && data.stats) setStats(data.stats)
    })()
  }, [])

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              About <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">LifeSolve AI</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
              We believe no one should face life&apos;s challenges alone. LifeSolve AI is a community-powered platform
              where you can share your problems, get AI-powered insights, and connect with people who understand.
            </p>
          </motion.div>

          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                { value: stats.totalUsers, label: "Active Users", suffix: "+" },
                { value: stats.solvedPosts, label: "Resolved", suffix: "+" },
                { value: stats.totalAiResponses, label: "AI Responses", suffix: "+" },
                { value: stats.totalPosts + stats.totalComments + stats.totalMessages, label: "Interactions", suffix: "+" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                  <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Story */}
      <section className="border-b border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/20">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Our Story</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                LifeSolve AI was born from a simple realization — too many people struggle in silence because they
                don&apos;t have access to affordable, immediate support. We combined the power of modern AI with
                the warmth of human connection to create a platform where anyone can find help, anytime.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                What started as a small project has grown into a thriving community of thousands of people supporting
                each other through life&apos;s ups and downs. Our AI assistant provides instant, thoughtful responses
                while our community offers the genuine human connection we all need.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-teal-600">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Making support accessible to everyone</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-50 to-violet-50 p-8 shadow-sm">
                <Quote className="h-8 w-8 text-teal-500/30" />
                <p className="mt-2 text-lg font-medium leading-relaxed text-slate-700 italic">
                  &ldquo;The greatest glory in living lies not in never falling, but in rising every time we fall.&rdquo;
                </p>
                <p className="mt-4 text-sm text-slate-500">— Our community&apos;s guiding belief</p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 text-lg font-bold text-white">
                    LS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">LifeSolve AI Team</p>
                    <p className="text-xs text-slate-400">Founded with empathy, built with care</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <Star className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
            <p className="mt-2 text-slate-500">The principles that guide everything we build</p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                  <v.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="border-b border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20">
              <Gem className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">What We Offer</h2>
            <p className="mt-2 text-slate-500">Everything you need to find support and build connections</p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br ${f.color} opacity-10 blur-2xl transition-all group-hover:opacity-20`} />
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-sm`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Powered By</h2>
            <p className="mt-2 text-slate-500">Modern technology stack built for reliability and scale</p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <t.icon className="h-5 w-5 text-slate-600" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800">{t.name}</p>
                <p className="mt-1 text-xs text-slate-400">{t.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-600 to-violet-600 p-10 text-center shadow-xl sm:p-16"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative">
              <Sparkles className="mx-auto h-10 w-10 text-white/80" />
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Ready to Be Part of Something?</h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-white/80 leading-relaxed">
                Join thousands of people who are finding support, sharing their stories, and building connections.
                Your journey matters here.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/problems"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Browse Problems
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
