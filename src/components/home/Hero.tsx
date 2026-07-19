"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react"

const floatingWords = ["Anxiety", "Stress", "Financial", "Career", "Relationships", "Emergency"]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % floatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-violet-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')]" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-20 sm:px-6 lg:flex-row lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            AI-Powered Support Platform
          </motion.div>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            You don&apos;t have to
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              face it alone
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-teal-100 lg:mx-0"
          >
            Share what you&apos;re going through, get personalized AI-powered solutions, and connect with a community that truly understands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 shadow-2xl shadow-teal-900/30 transition-all duration-300 hover:shadow-teal-500/30"
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal-50 to-white transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
            <Link
              href="/problems"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              Browse Problems
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
          >
            {[
              { icon: Shield, text: "100% Anonymous" },
              { icon: Heart, text: "Supportive Community" },
              { icon: Sparkles, text: "AI-Powered Insights" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-teal-200">
                <item.icon className="h-4 w-4 text-teal-300" />
                {item.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex-1 lg:mt-0"
        >
          <div className="relative mx-auto h-80 w-80 sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-violet-500/30 blur-3xl" />
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative">
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-xl sm:h-72 sm:w-72">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-2xl"
                    >
                      <Heart className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.p
                      key={wordIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 text-lg font-semibold text-white/90"
                    >
                      Dealing with{" "}
                      <span className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">
                        {floatingWords[wordIndex]}
                      </span>
                      ?
                    </motion.p>
                    <p className="mt-2 text-sm text-teal-200">We&apos;re here to help</p>
                  </div>
                </div>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-3 w-3 rounded-full bg-amber-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.6,
                      repeat: Infinity,
                    }}
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 15}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
