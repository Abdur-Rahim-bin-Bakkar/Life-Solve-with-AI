export default function SectionDivider({ variant = 1 }: { variant?: number }) {
  const patterns = [
    // gradient bar with dot
    <div key="1" className="relative flex items-center justify-center py-8">
      <div className="absolute h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 shadow-sm shadow-teal-500/20">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
    </div>,

    // thin gradient line with glow
    <div key="2" className="py-8">
      <div className="mx-auto h-[2px] w-48 rounded-full bg-gradient-to-r from-teal-400/0 via-teal-400/60 to-teal-400/0" />
    </div>,

    // diamond pattern
    <div key="3" className="flex items-center justify-center gap-2 py-8">
      <span className="h-px w-12 bg-gradient-to-l from-slate-200 to-transparent" />
      <span className="flex h-4 w-4 rotate-45 items-center justify-center border border-slate-300 bg-white" />
      <span className="h-px w-12 bg-gradient-to-r from-slate-200 to-transparent" />
    </div>,

    // teal dot pattern
    <div key="4" className="flex items-center justify-center gap-2 py-8">
      <span className="h-px w-16 bg-gradient-to-l from-slate-200 to-transparent" />
      <span className="h-2 w-2 rounded-full bg-teal-400" />
      <span className="h-2 w-2 rounded-full bg-violet-400" />
      <span className="h-px w-16 bg-gradient-to-r from-slate-200 to-transparent" />
    </div>,

    // subtle wave
    <div key="5" className="overflow-hidden py-6">
      <svg className="mx-auto h-4 w-32 text-slate-200" viewBox="0 0 120 16" fill="none">
        <path d="M0 8 Q15 0 30 8 T60 8 T90 8 T120 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="8" r="2.5" fill="url(#gd)" />
        <defs>
          <linearGradient id="gd" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#14b8a6" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>,
  ]

  return patterns[(variant - 1) % patterns.length]
}
