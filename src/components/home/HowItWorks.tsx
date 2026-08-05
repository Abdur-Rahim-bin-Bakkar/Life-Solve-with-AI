"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import { Share2, Bot, Users, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Share2,
    title: "Share Your Problem",
    description: "Write about what you're going through. Choose to remain anonymous or share publicly — your privacy matters.",
    gradient: "from-teal-500 to-emerald-500",
    shadow: "shadow-teal-500/30",
    chip: "bg-teal-50 text-teal-700",
  },
  {
    icon: Bot,
    title: "Get AI Insights",
    description: "Our AI analyzes your situation and provides personalized, actionable solutions and coping strategies.",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/30",
    chip: "bg-violet-50 text-violet-700",
  },
  {
    icon: Users,
    title: "Connect & Heal",
    description: "Join supportive discussions, track your progress, and connect with others who understand.",
    gradient: "from-amber-500 to-rose-500",
    shadow: "shadow-amber-500/30",
    chip: "bg-amber-50 text-amber-700",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps to find the support you need"
        />

        <div className="relative mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 origin-left bg-gradient-to-r from-teal-300 via-violet-300 to-amber-300 lg:block"
          />

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} shadow-xl ${step.shadow}`}
                  >
                    <step.icon className="h-9 w-9 text-white" />
                  </motion.div>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-black text-white">
                    {i + 1}
                  </span>
                  <motion.span
                    className="absolute -inset-3 -z-10 rounded-[2rem] bg-white"
                    animate={{ boxShadow: ["0 0 0 0 rgba(124,58,237,0)", "0 0 0 8px rgba(124,58,237,0.06)", "0 0 0 0 rgba(124,58,237,0)"] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.6 }}
                  />
                </div>

                <span className={`mt-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${step.chip}`}>
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">{step.description}</p>

                {i < steps.length - 1 && (
                  <motion.span
                    className="mt-6 hidden items-center gap-1 text-sm font-semibold text-slate-300 lg:flex"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center justify-center gap-2 text-sm text-slate-400"
        >
          <Sparkles className="h-4 w-4 text-violet-400" />
          It takes less than a minute to get started — free forever.
        </motion.div>
      </div>
    </section>
  )
}
