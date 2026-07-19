import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean
}

export function Section({ className, container = true, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {container ? <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div> : children}
    </section>
  )
}

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-slate-500">{subtitle}</p>}
    </div>
  )
}
