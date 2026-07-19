"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import { ChevronDown } from "lucide-react"

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
    a: "Yes, all conversations with our AI are encrypted and confidential. We don't store or share your personal chat history. Your trust and safety are our top priorities.",
  },
  {
    q: "Can I use LifeSolve AI in an emergency?",
    a: "LifeSolve AI provides general support and is not a substitute for professional emergency services. If you're in immediate danger, please call 911 or your local emergency number. We do provide quick access to emergency resources.",
  },
  {
    q: "Is LifeSolve AI free to use?",
    a: "Yes, LifeSolve AI is completely free. We believe support should be accessible to everyone who needs it. Premium features may be added in the future but core functionality will always remain free.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about LifeSolve AI"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-medium text-slate-900 sm:text-base">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="text-sm leading-relaxed text-slate-500">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
