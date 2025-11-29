import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SheetSkeleton() {
  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-6 overflow-hidden">
      <div className="w-[95vw] md:w-[90vw] lg:w-full flex items-start justify-between pb-6 flex-row lg:flex-shrink-0 lg:gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64 md:w-96" />
          <Skeleton className="h-4 w-48 md:w-72" />
        </div>
        <div className="flex items-center md:gap-3 flex-shrink-0">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
      <div className="w-[96vw] lg:w-full flex-1 flex flex-col overflow-hidden">
        {/* Progress Bar Skeleton */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>

        {/* Quote Skeleton */}
        <div className="mb-6 flex-shrink-0">
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Table Skeleton */}
        <div
          className="
          w-full bg-ox-content border border-dash-border rounded-lg
          flex-1 overflow-auto relative
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-brand-purple/30
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-brand-purple/50
        "
        >
          <Table className="w-full min-w-[600px] sm:min-w-[800px]">
            <TableHeader>
              <TableRow className="border-b border-dash-border bg-dash-surface">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TableHead key={i} className="px-3 py-3">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow
                  key={i}
                  className="border-y border-dash-border bg-ox-content"
                >
                  <TableCell className="p-3">
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="h-5 w-5 mx-auto rounded-full" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
