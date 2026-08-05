"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { PhoneCall, Ambulance, Heart, Stethoscope, Siren, MessageCircle } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/8801873135444"

const resources = [
  {
    icon: Ambulance,
    title: "Emergency Services",
    desc: "Immediate medical emergency",
    number: "01873135444",
    color: "from-rose-500 to-red-600",
    ring: "hover:ring-rose-400/50",
  },
  {
    icon: Stethoscope,
    title: "Hospitals Nearby",
    desc: "Find nearest hospital",
    number: "01873135444",
    color: "from-amber-500 to-orange-600",
    ring: "hover:ring-amber-400/50",
  },
  {
    icon: PhoneCall,
    title: "Crisis Hotline",
    desc: "24/7 confidential support",
    number: "01873135444",
    color: "from-violet-500 to-purple-600",
    ring: "hover:ring-violet-400/50",
  },
  {
    icon: Heart,
    title: "Mental Health Support",
    desc: "Talk to a counselor",
    number: "01873135444",
    color: "from-teal-500 to-emerald-600",
    ring: "hover:ring-teal-400/50",
  },
]

export default function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-700 to-red-900 py-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-400/25 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNiI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
        <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 text-center lg:text-left"
          >
            <motion.div
              animate={{ rotate: [-12, 12, -12], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 shadow-2xl shadow-rose-950/40 backdrop-blur"
            >
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-rose-300/40" />
              <Siren className="h-10 w-10 text-white" />
            </motion.div>
            <div>
              <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 lg:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                </span>
                24/7 Emergency Support
              </p>
              <h2 className="mt-1 text-3xl font-black text-white sm:text-4xl">Need Immediate Help?</h2>
              <p className="mt-2 max-w-xl text-rose-100">
                You&apos;re not alone. Tap a number below to reach help around the clock.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur"
          >
            <div className="text-rose-100">
              <p className="text-xs uppercase tracking-wider text-rose-200/80">Need help right now?</p>
              <p className="text-lg font-black text-white">Chat with us on WhatsApp</p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-xl shadow-emerald-500/40 transition-transform duration-200 hover:scale-110"
              aria-label="Open WhatsApp chat"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((item, i) => (
            <motion.a
              key={item.title}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur transition-all duration-300 ring-2 ring-transparent hover:bg-white/20 hover:shadow-2xl ${item.ring}`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative flex items-center gap-3">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs text-rose-100/80">{item.desc}</p>
                </div>
              </div>
              <div className="relative mt-4 flex items-center justify-between rounded-xl bg-black/20 px-4 py-2.5">
                <span className="text-sm font-black tracking-wider">{item.number}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-2.5">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-xs text-rose-200/70"
        >
          LifeSolve AI provides general support and is not a substitute for professional emergency services.{" "}
          <Link href="/about" className="font-semibold text-amber-300 underline-offset-2 hover:underline">
            Learn more
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
