import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
          <span className="text-4xl font-bold text-white">?</span>
        </div>
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-xl text-slate-500">Page not found</p>
        <p className="mt-2 text-sm text-slate-400">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Go Home
          </Link>
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            Browse Problems
          </Link>
        </div>
      </div>
    </div>
  )
}
