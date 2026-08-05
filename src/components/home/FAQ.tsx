"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react"

const faqs = [
  {
    q: "Is my identity protected when I share a problem?",
    a: "Absolutely. You can choose to share anonymously. Your personal information is never displayed publicly unless you choose to reveal it. We take privacy very seriously.",
  },
  {
    q: "How does the AI problem solver work?",
    a: "Our AI analyzes your problem description using advanced language models trained on psychological and counseling frameworks. It provides personalized insights, actionable steps, and relevant resources tailored to your situation.",
  },
  {
    q: "Is the AI chat confidential?",
    a: "Yes, all conversations with our AI are confidential. We don't store or share your personal chat history. Your trust and safety are our top priorities.",
  },
  {
    q: "Can I use LifeSolve AI in an emergency?",
    a: "LifeSolve AI provides general support and is not a substitute for professional emergency services. If you're in immediate danger, please call 911 or your local emergency number. We do provide quick access to emergency resources.",
  },
  {
    q: "Is LifeSolve AI free to use?",
    a: "Yes, LifeSolve AI is completely free. We believe support should be accessible to everyone who needs it. Core functionality will always remain free.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about LifeSolve AI"
              centered={false}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-violet-800 p-7 text-white shadow-xl shadow-teal-900/20"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">Still have questions?</h3>
                <p className="mt-1.5 text-sm text-teal-100">
                  Chat with our AI anytime or reach out to the community for answers.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href="/chat"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 shadow transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> Ask the AI Assistant
                  </Link>
                  <Link
                    href="/connect"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  >
                    <HelpCircle className="h-4 w-4" /> Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-teal-200 shadow-lg shadow-teal-500/10"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-teal-500 to-violet-600 text-white shadow-lg shadow-teal-500/30"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 text-sm font-semibold sm:text-base ${isOpen ? "text-teal-800" : "text-slate-900"}`}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pl-[4.5rem] sm:px-6 sm:pl-[4.5rem]">
                          <p className="text-sm leading-relaxed text-slate-500">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
