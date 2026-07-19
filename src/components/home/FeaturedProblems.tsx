"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, MessageCircle } from "lucide-react"

const problems = [
  {
    id: 1,
    title: "Struggling with workplace anxiety",
    desc: "I feel overwhelmed every morning before work. My heart races and I can't concentrate. I need advice on managing this.",
    category: "Mental Health",
    urgency: "High",
    comments: 24,
    time: "2 hours ago",
    color: "violet",
  },
  {
    id: 2,
    title: "Can't seem to get out of debt",
    desc: "Credit card bills are piling up and I don't know where to start. Looking for practical advice on debt management.",
    category: "Financial",
    urgency: "Medium",
    comments: 18,
    time: "5 hours ago",
    color: "emerald",
  },
  {
    id: 3,
    title: "Feeling stuck in my career",
    desc: "Been at the same job for 5 years with no growth. I want to make a change but terrified of the unknown.",
    category: "Career",
    urgency: "Low",
    comments: 31,
    time: "1 day ago",
    color: "blue",
  },
  {
    id: 4,
    title: "Family conflict over inheritance",
    desc: "My siblings and I are fighting over our parents' estate. It's tearing our family apart. Need mediation advice.",
    category: "Relationships",
    urgency: "Medium",
    comments: 15,
    time: "3 days ago",
    color: "rose",
    // intentionally leaving as last card
  },
]

export default function FeaturedProblems() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recent Problems"
          subtitle="See what others are going through and offer your support"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Badge variant={problem.color as "violet" | "emerald" | "amber" | "rose"}>
                  {problem.category}
                </Badge>
                <Badge variant={problem.urgency === "High" ? "rose" : problem.urgency === "Medium" ? "amber" : "teal"}>
                  {problem.urgency}
                </Badge>
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-teal-700 transition-colors">
                {problem.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">
                {problem.desc}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {problem.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {problem.time}
                  </span>
                </div>
                <Link
                  href={`/problems/${problem.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-teal-600 transition-all hover:gap-2"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 hover:shadow-lg"
          >
            View All Problems
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
