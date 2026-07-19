"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Community Member",
    image: null,
    quote: "LifeSolve AI helped me through one of the darkest periods of my life. The AI suggestions were surprisingly accurate, and the community was incredibly supportive. I'm now in a much better place.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Regular User",
    image: null,
    quote: "I was skeptical about an AI helping with personal problems, but the insights I got were genuinely helpful. Combined with the community support, I finally feel like I'm making progress.",
    rating: 5,
  },
  {
    name: "Maria G.",
    role: "Premium Member",
    image: null,
    quote: "The career advice I received changed my perspective completely. I switched industries and couldn't be happier. The personalized action plan was exactly what I needed.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Community Says"
          subtitle="Real stories from people who found support"
        />

        <div className="relative mx-auto mt-12 max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-teal-50 via-white to-violet-50 p-8 shadow-lg sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-xl font-bold text-white shadow-lg">
                  {testimonials[current].name.charAt(0)}
                </div>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[current].rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-slate-600">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">{testimonials[current].name}</p>
                  <p className="text-sm text-slate-400">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-teal-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
