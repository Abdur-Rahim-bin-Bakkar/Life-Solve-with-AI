"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Lock,
  MessageSquareText,
  Shield,
  Sparkles,
  Users,
} from "lucide-react"

const rotatingWords = ["Stress", "Anxiety", "Career Doubt", "Relationship Issues", "Money Worries", "Loneliness"]

const steps = [
  {
    icon: MessageSquareText,
    title: "Share anonymously",
    description: "Write about what you're going through — no judgement, full privacy.",
    gradient: "from-teal-400 to-teal-500",
  },
  {
    icon: Bot,
    title: "Get AI guidance",
    description: "Instant, personalized solutions and coping strategies from our AI.",
    gradient: "from-violet-400 to-violet-500",
  },
  {
    icon: Users,
    title: "Connect with people",
    description: "Join a caring community that has been there too and truly understands.",
    gradient: "from-amber-400 to-rose-500",
  },
]

const features = [
  { icon: Lock, title: "100% Anonymous", description: "Post without revealing who you are." },
  { icon: Bot, title: "AI-Powered Insights", description: "Personalized help available 24/7." },
  { icon: Heart, title: "Supportive Community", description: "People who genuinely care." },
  { icon: Sparkles, title: "Free Forever", description: "No hidden costs, ever." },
]

const stats = [
  { value: "1,200+", label: "people online now" },
  { value: "5,000+", label: "problems shared" },
  { value: "98%", label: "feel heard & supported" },
]

const showcaseCards = [
  {
    problem: "I feel overwhelmed with work and family",
    insight: "Try time-blocking your day into 3 priorities and book 10 quiet minutes for yourself each morning.",
    accent: "from-teal-400 to-teal-500",
  },
  {
    problem: "My anxiety spikes before meetings",
    insight: "Box breathing (4s in, 4s hold, 4s out) right before the call can calm your nervous system fast.",
    accent: "from-violet-400 to-violet-500",
  },
  {
    problem: "I don't know how to handle rejection",
    insight: "Reframe it as redirection — every 'no' removes one wrong path and reveals a better one.",
    accent: "from-amber-400 to-rose-500",
  },
]

const topics = ["Mental Health", "Career", "Relationships", "Finances", "Education", "Family", "Wellness", "Self-Improvement"]

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: (i * 37 + 13) % 100,
  size: 3 + (i % 3) * 2,
  duration: 9 + (i % 5) * 2,
  delay: (i % 7) * 1.3,
}))

const slideTitles = ["What is LifeSolve AI?", "How it works", "Why you can trust us", "You are not alone"]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const wordTimer = setInterval(() => setWordIndex((p) => (p + 1) % rotatingWords.length), 2200)
    const cardTimer = setInterval(() => setCardIndex((p) => (p + 1) % showcaseCards.length), 4200)
    return () => {
      clearInterval(wordTimer)
      clearInterval(cardTimer)
    }
  }, [])

  const slideCount = 4

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection(1)
      setSlideIndex((p) => (p + 1) % slideCount)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, slideIndex])

  function goToSlide(i: number) {
    setDirection(i > slideIndex ? 1 : -1)
    setSlideIndex(i)
  }

  function nextSlide() {
    setDirection(1)
    setSlideIndex((p) => (p + 1) % slideCount)
  }

  function prevSlide() {
    setDirection(-1)
    setSlideIndex((p) => (p - 1 + slideCount) % slideCount)
  }

  const marqueeItems = useMemo(() => [...topics, ...topics], [])

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-violet-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-400/25 blur-3xl"
          animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] rounded-full bg-violet-500/25 blur-3xl"
          animate={{ x: [0, -50, 30, 0], y: [0, -30, 40, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')]" />

        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute bottom-[-10px] rounded-full bg-white/30"
            style={{ left: `${p.left}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -620], opacity: [0, 0.9, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div
        className="relative mx-auto flex min-h-[40vh] max-w-7xl flex-col px-4 pb-10 pt-20 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            </span>
            <Sparkles className="h-4 w-4 text-amber-300" />
            LifeSolve AI · Free forever
          </motion.div>

          <div className="hidden items-center gap-2 sm:flex">
            {slideTitles.map((title, i) => (
              <button
                key={title}
                onClick={() => goToSlide(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  slideIndex === i
                    ? "bg-white text-teal-800 shadow-lg"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 items-center overflow-hidden">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute -left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="w-full px-4 sm:px-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slideIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div className="text-center lg:text-left">
                  {slideIndex === 0 && <IntroSlide wordIndex={wordIndex} />}
                  {slideIndex === 1 && <HowItWorksSlide activeStep={wordIndex % 3} />}
                  {slideIndex === 2 && <TrustSlide />}
                  {slideIndex === 3 && <CommunitySlide />}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mx-auto hidden w-full max-w-md lg:block"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-violet-500/30 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="absolute -inset-10 rounded-full border-2 border-dashed border-white/15"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative aspect-square">
                    <motion.div
                      className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 12, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-2xl shadow-rose-500/40"
                      >
                        <Heart className="h-9 w-9 text-white" />
                      </motion.div>
                    </motion.div>

                    {steps.map((step, i) => {
                      const angle = (i / steps.length) * Math.PI * 2
                      return (
                        <motion.div
                          key={step.title}
                          className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur"
                          style={{
                            left: `calc(50% + ${Math.cos(angle) * 46}%)`,
                            top: `calc(50% + ${Math.sin(angle) * 46}%)`,
                            transform: "translate(-50%, -50%)",
                          }}
                          animate={{
                            x: [0, Math.cos(angle) * 10, 0],
                            y: [0, Math.sin(angle) * 10, 0],
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <step.icon className="h-6 w-6 text-white/80" />
                        </motion.div>
                      )
                    })}

                    <div className="absolute bottom-0 left-1/2 w-[92%] -translate-x-1/2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={cardIndex}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -24 }}
                          transition={{ duration: 0.4 }}
                          className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl shadow-teal-950/40 backdrop-blur"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600">
                              <Bot className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">LifeSolve AI Assistant</span>
                            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                              Online
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-600">{showcaseCards[cardIndex].problem}</p>
                          <div className={`mt-2 rounded-xl bg-gradient-to-br ${showcaseCards[cardIndex].accent} p-3`}>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-white/80">
                              <Lightbulb className="h-3 w-3" /> AI Insight
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-white">{showcaseCards[cardIndex].insight}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <motion.div
                      className="absolute right-2 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="flex -space-x-2">
                        {["bg-rose-400", "bg-teal-400", "bg-amber-400"].map((c) => (
                          <span key={c} className={`h-5 w-5 rounded-full border-2 border-white/30 ${c}`} />
                        ))}
                      </span>
                      <span className="text-[10px] font-medium text-white/90">1.2k people here now</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute -right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                slideIndex === i ? "w-8 bg-amber-400" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-white/5 py-4 backdrop-blur">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-10 px-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {marqueeItems.map((topic, i) => (
              <span key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
                {topic}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function IntroSlide({ wordIndex }: { wordIndex: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl lg:text-4xl xl:text-6xl">
        Facing{" "}
        <span className="relative inline-block">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="inline-block bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 bg-clip-text text-transparent"
            >
              {rotatingWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400" />
        </span>
        ?
        <br />
        <span className="mt-2 block text-white">You don&apos;t have to face it alone.</span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-teal-50/90 sm:text-lg lg:mx-0"
      >
        LifeSolve AI is a safe space where you can share life&apos;s challenges anonymously, receive instant
        personalized solutions from our AI, and connect with a community that genuinely understands.
      </motion.p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
        <Link
          href="/register"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-800 shadow-2xl shadow-teal-950/40 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/40"
        >
          <span className="relative z-10">Get Started — It&apos;s Free</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-teal-50 to-amber-50"
            initial={{ x: "-100%" }}
            animate={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.35 }}
          />
        </Link>
        <Link
          href="/problems"
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/10"
        >
          Explore the Community
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
        {[
          { icon: Shield, text: "100% Anonymous" },
          { icon: Heart, text: "Supportive Community" },
          { icon: Sparkles, text: "AI-Powered Insights" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm text-teal-100">
            <item.icon className="h-4 w-4 text-teal-300" />
            {item.text}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function HowItWorksSlide({ activeStep }: { activeStep: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-black text-white sm:text-4xl">
        How <span className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">LifeSolve AI</span> works
      </h2>
      <p className="mt-3 max-w-lg text-base text-teal-50/90 sm:text-lg">
        Three simple steps to find the support you need — in just minutes.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.15 }}
            className={`relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur transition-all duration-300 ${
              activeStep === i
                ? "border-white/40 bg-white/15 shadow-xl shadow-teal-950/30"
                : "border-white/10 bg-white/5"
            }`}
          >
            <motion.span
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.gradient}`}
              animate={{ width: activeStep === i ? "100%" : "0%" }}
              transition={{ duration: activeStep === i ? 2.2 : 0.3, ease: "linear" }}
            />
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
              <step.icon className="h-5 w-5 text-white" />
            </div>
            <p className="mt-3 text-sm font-bold text-white">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <Link
        href="/register"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-xl transition-all duration-300 hover:scale-105"
      >
        Start your first step <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

function TrustSlide() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-black text-white sm:text-4xl">
        Built on <span className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">trust</span>,
        driven by <span className="bg-gradient-to-r from-teal-300 to-violet-400 bg-clip-text text-transparent">care</span>
      </h2>
      <p className="mt-3 max-w-lg text-base text-teal-50/90 sm:text-lg">
        Everything about LifeSolve AI is designed to make you feel safe, heard, and supported.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl border border-white/15 bg-white/10 p-5 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <f.icon className="h-5 w-5 text-amber-300" />
            </div>
            <p className="mt-3 text-sm font-bold text-white">{f.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function CommunitySlide() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-black text-white sm:text-4xl">
        You are <span className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">never alone</span>
      </h2>
      <p className="mt-3 max-w-lg text-base text-teal-50/90 sm:text-lg">
        Thousands of people share their journeys here every day — and find the support they deserve.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur"
          >
            <p className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-white/70">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/register"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-xl transition-all duration-300 hover:scale-105"
        >
          Join the community <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/connect"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
        >
          <Users className="h-4 w-4" /> See who&apos;s here
        </Link>
      </div>
    </motion.div>
  )
}
