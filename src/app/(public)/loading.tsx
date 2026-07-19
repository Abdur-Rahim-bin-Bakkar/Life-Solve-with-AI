import { Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/90 via-white/90 to-slate-50/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-2xl shadow-teal-500/20">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -inset-4 rounded-3xl border-2 border-teal-200/50 animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-violet-200/30 animate-ping" style={{ animationDuration: "2s" }} />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-700">Loading</h2>
          <p className="mt-1 text-sm text-slate-400">Please wait a moment...</p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-500" style={{ animationDelay: "0ms" }} />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-500" style={{ animationDelay: "150ms" }} />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-amber-500" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
