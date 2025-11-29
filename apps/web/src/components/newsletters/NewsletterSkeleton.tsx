import { Skeleton } from "@/components/ui/skeleton";

export function NewsletterSkeleton() {
  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-lg p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4 bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-5/6 bg-zinc-800" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-24 bg-zinc-800" />
          <Skeleton className="h-4 w-20 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
