"use client"

import { motion } from "framer-motion"
import { PhoneCall, Ambulance, Heart, Stethoscope, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const resources = [
  {
    icon: Ambulance,
    title: "Emergency Services",
    desc: "Immediate medical emergency",
    number: "911",
    color: "bg-rose-500",
    glow: "shadow-rose-500/30",
  },
  {
    icon: Stethoscope,
    title: "Hospitals Nearby",
    desc: "Find nearest hospital",
    number: "1-800-HOSPITAL",
    color: "bg-amber-500",
    glow: "shadow-amber-500/30",
  },
  {
    icon: PhoneCall,
    title: "Crisis Hotline",
    desc: "24/7 confidential support",
    number: "988",
    color: "bg-violet-500",
    glow: "shadow-violet-500/30",
  },
  {
    icon: Heart,
    title: "Mental Health Support",
    desc: "Talk to a counselor",
    number: "1-800-HELP",
    color: "bg-teal-500",
    glow: "shadow-teal-500/30",
  },
]

export default function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 py-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
      <motion.div
        className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="rose" className="mb-4 border border-rose-300/50 bg-rose-200/30 text-rose-100 backdrop-blur">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            24/7 Emergency Support
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need Immediate Help?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-rose-200">
            You&apos;re not alone. Our emergency resources are available around the clock.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {resources.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} ${item.glow} shadow-lg`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-rose-200">{item.desc}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold tracking-wider">{item.number}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-amber-300 transition-all group-hover:gap-2">
                  Call Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
