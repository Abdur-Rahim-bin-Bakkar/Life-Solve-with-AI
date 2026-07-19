"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/20">
          <span className="text-4xl font-bold text-white">!</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-4 text-slate-500 max-w-md mx-auto">
          An unexpected error occurred. Our team has been notified.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
