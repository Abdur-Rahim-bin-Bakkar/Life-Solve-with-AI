import { cn } from "@/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200", className)} />
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-5 w-full" />
        <Skeleton className="mt-1 h-5 w-3/4" />
        <Skeleton className="mt-2 h-12 w-full" />
        <Skeleton className="mt-3 h-9 w-full rounded-xl" />
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProblemDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-4 w-32" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <Skeleton className="h-2 w-full rounded-none" />
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex gap-2.5">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="mb-6 h-64 w-full rounded-xl" />
          <div className="mb-6 flex items-center gap-3 pb-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-1 h-3 w-24" />
            </div>
          </div>
          <Skeleton className="mb-4 h-8 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-6 h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-slate-50">
      <td className="px-4 py-4 sm:px-5"><Skeleton className="h-4 w-48" /></td>
      <td className="hidden px-4 py-4 sm:table-cell"><Skeleton className="h-5 w-20 rounded-full" /></td>
      <td className="hidden px-4 py-4 md:table-cell"><Skeleton className="h-5 w-16 rounded-full" /></td>
      <td className="hidden px-4 py-4 lg:table-cell"><Skeleton className="h-5 w-14 rounded-full" /></td>
      <td className="hidden px-4 py-4 lg:table-cell"><Skeleton className="h-4 w-24" /></td>
      <td className="px-4 py-4 sm:px-5">
        <div className="flex justify-end gap-1.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </td>
    </tr>
  )
}
