"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Shield, Bot, Users, Globe } from "lucide-react"
import Link from "next/link"

const values = [
  { icon: Heart, title: "Empathy First", desc: "Every interaction is built on understanding and compassion. We create a safe space where you can be truly heard." },
  { icon: Shield, title: "Privacy & Safety", desc: "Your identity and conversations are protected. Share anonymously or openly — the choice is always yours." },
  { icon: Bot, title: "AI-Powered Insights", desc: "Our AI provides personalized guidance based on proven psychological frameworks, available 24/7." },
  { icon: Users, title: "Community Support", desc: "Connect with people who understand what you're going through. You're not alone in this journey." },
  { icon: Globe, title: "Free & Accessible", desc: "Support should never have a price tag. LifeSolve AI is completely free for everyone who needs it." },
]

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white pt-16">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">About LifeSolve AI</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We believe no one should face life&apos;s challenges alone. LifeSolve AI is a community-powered platform
            where you can share your problems, get AI-powered insights, and connect with people who understand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                <v.icon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-50 to-violet-50 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            To make emotional and mental support accessible to everyone through the power of AI and community.
            We combine cutting-edge technology with genuine human connection to help people navigate life&apos;s toughest challenges.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Join Our Community
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
