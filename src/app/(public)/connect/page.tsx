"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle, Sparkles } from "lucide-react"

export default function ConnectPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSent(true)
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white pt-16">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Get In Touch</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 lg:col-span-2"
          >
            {[
              { icon: Mail, title: "Email Us", desc: "webdesignrahim4061@gmail.com", sub: "We reply within 24 hours" },
              { icon: MapPin, title: "Our Location", desc: "Dhaka, Bangladesh", sub: "Remote-first team" },
              { icon: Clock, title: "Response Time", desc: "Mon-Fri, 9AM-6PM", sub: "Weekend support available" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <item.icon className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Message Sent!</h3>
                <p className="mt-2 text-sm text-slate-500 text-center">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setName(""); setEmail(""); setMessage(""); setSent(false) }}
                  className="mt-6 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Your Name</label>
                  <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Your Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">Your Message</label>
                  <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <button type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
