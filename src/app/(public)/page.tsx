import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            AI-Powered Problem Solving
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            You don&apos;t have to
            <br />
            face it alone
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-200">
            Share your life problems, get AI-powered solutions, find community support,
            and take control of your mental well-being.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50"
            >
              Get Started Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Browse Problems
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[{ label: "Active Users", value: "10K+" }, { label: "Problems Solved", value: "5K+" }, { label: "AI Responses", value: "25K+" }, { label: "Community Rating", value: "4.8/5" }].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How It Works</h2>
            <p className="mt-2 text-sm text-slate-500">Three simple steps to get the support you need</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Share Your Problem", desc: "Write about what you're going through. Anonymous or public — your choice." },
              { step: "02", title: "Get AI Insights", desc: "Receive personalized AI-powered analysis and actionable solutions." },
              { step: "03", title: "Connect & Heal", desc: "Join discussions, get community support, and track your progress." },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Categories</h2>
            <p className="mt-2 text-sm text-slate-500">Browse problems by category</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Mental Health", desc: "Anxiety, depression, stress", color: "bg-violet-100 text-violet-700" },
              { name: "Financial", desc: "Debt, budgeting, investments", color: "bg-emerald-100 text-emerald-700" },
              { name: "Career", desc: "Job search, work stress, growth", color: "bg-blue-100 text-blue-700" },
              { name: "Relationships", desc: "Family, friends, partners", color: "bg-rose-100 text-rose-700" },
              { name: "Health & Wellness", desc: "Physical health, fitness, sleep", color: "bg-amber-100 text-amber-700" },
              { name: "Emergency", desc: "Crisis, urgent situations", color: "bg-red-100 text-red-700" },
            ].map((cat) => (
              <div key={cat.name} className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
                <div className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${cat.color}`}>
                  {cat.name}
                </div>
                <p className="mt-2 text-sm text-slate-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
