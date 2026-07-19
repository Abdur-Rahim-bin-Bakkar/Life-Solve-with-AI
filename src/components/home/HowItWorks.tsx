"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import { Share2, Bot, Users } from "lucide-react"

const steps = [
  {
    icon: Share2,
    title: "Share Your Problem",
    description: "Write about what you're going through. Choose to remain anonymous or share publicly — your privacy matters.",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    icon: Bot,
    title: "Get AI Insights",
    description: "Our AI analyzes your situation and provides personalized, actionable solutions and coping strategies.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: Users,
    title: "Connect & Heal",
    description: "Join supportive discussions, track your progress, and connect with others who understand.",
    gradient: "from-amber-500 to-rose-500",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps to find the support you need"
        />

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-teal-200 via-violet-200 to-amber-200 md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <span className="text-6xl font-black text-slate-100">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-slate-500 leading-relaxed">{step.description}</p>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
