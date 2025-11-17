"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import { sheetModules } from "@/data/sheet";
import type { SheetModule } from "@/data/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FileText, Download, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Youtube } from "@/components/icons/icons";
import { OpensoxProBadge } from "@/components/sheet/OpensoxProBadge";
import { ProgressBar } from "@/components/sheet/ProgressBar";
import { ActiveTag } from "@/components/ui/ActiveTag";
import { useSubscription } from "@/hooks/useSubscription";

const tableColumns = [
  "S.No",
  "Module Name",
  "Doc",
  "Watch",
  "Live Sessions",
  "Done?",
] as const;

const SheetTableRow = memo(function SheetTableRow({
  module,
  index,
  isCompleted,
  onCheckboxChange,
  isPaidUser,
}: {
  module: SheetModule;
  index: number;
  isCompleted: boolean;
  onCheckboxChange: (moduleId: string, checked: boolean) => void;
  isPaidUser: boolean;
}) {
  const isComingSoon = module.comingSoon === true;

  return (
    <TableRow
      className={`border-y border-ox-sidebar bg-ox-content hover:bg-ox-sidebar transition-colors ${
        isComingSoon ? "opacity-50" : ""
      }`}
    >
      <TableCell className="text-white text-[12px] sm:text-sm p-3 text-left">
        {index}
      </TableCell>

      <TableCell className="text-white text-[12px] sm:text-sm p-3">
        <div className="flex items-center gap-2">
          <span className="max-w-[80px] md:max-w-none break-words">
            {module.name}
          </span>
          {isComingSoon && (
            <Badge className="bg-ox-purple/20 text-ox-purple border-ox-purple/30 text-[10px] px-2 py-0.5">
              Soon
            </Badge>
          )}
        </div>
      </TableCell>

      <TableCell className="text-center p-3">
        {isComingSoon ? (
          <span className="inline-flex items-center gap-1 text-gray-500 cursor-not-allowed pointer-events-none">
            <FileText className="h-4 w-4" />
            <span className="text-[12px] sm:text-sm font-medium">read</span>
          </span>
        ) : (
          <Link
            href={`/sheet/${module.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white hover:text-ox-purple transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span className="text-[12px] sm:text-sm font-medium">read</span>
          </Link>
        )}
      </TableCell>

      <TableCell className="text-center p-3">
        {isComingSoon ? (
          <span className="inline-flex items-center justify-center opacity-50 cursor-not-allowed pointer-events-none">
            <span className="w-5 h-5 inline-flex items-center justify-center [&_svg_path]:fill-gray-500">
              <Youtube />
            </span>
          </span>
        ) : (
          <Link
            href={module.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center [&_svg_path]:fill-red-500">
              <Youtube />
            </span>
          </Link>
        )}
      </TableCell>

      <TableCell className="text-center p-3">
        {isPaidUser ? <ActiveTag /> : <OpensoxProBadge />}
      </TableCell>

      <TableCell className="text-center p-3">
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={(checked) =>
              onCheckboxChange(module.id, checked === true)
            }
            disabled={isComingSoon}
            className="border-ox-purple/50 data-[state=checked]:bg-ox-purple data-[state=checked]:border-ox-purple data-[state=checked]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </TableCell>
    </TableRow>
  );
});

export default function SheetPage() {
  const { data: session, status } = useSession();
  const { isPaidUser } = useSubscription();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const utils = trpc.useUtils();

  // TypeScript has difficulty narrowing TRPC procedure union types.
  // These procedures are correctly typed at runtime (query vs mutation).
  const getCompletedStepsProcedure = trpc.user
    .getCompletedSteps as typeof trpc.user.getCompletedSteps & {
    useQuery: (input: undefined, opts?: any) => any;
  };
  const updateCompletedStepsProcedure = trpc.user
    .updateCompletedSteps as typeof trpc.user.updateCompletedSteps & {
    useMutation: (opts?: any) => any;
  };
  const getCompletedStepsUtilsProcedure = utils.user
    .getCompletedSteps as typeof utils.user.getCompletedSteps & {
    cancel: () => Promise<void>;
    invalidate: () => Promise<void>;
  };

  const { data: fetchedSteps, isLoading: isLoadingSteps } =
    getCompletedStepsProcedure.useQuery(undefined, {
      enabled: !!session?.user && status === "authenticated",
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

  const updateStepsMutation = updateCompletedStepsProcedure.useMutation({
    onMutate: async (newData: { completedSteps: string[] }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await getCompletedStepsUtilsProcedure.cancel();

      // Snapshot the previous value
      const previousSteps = completedSteps;

      // Optimistically update to the new value
      setCompletedSteps(newData.completedSteps);

      // Return context with the previous value
      return { previousSteps };
    },
    onSuccess: (data: string[]) => {
      setCompletedSteps(data);
    },
    onError: (
      error: unknown,
      _newData: { completedSteps: string[] },
      context: { previousSteps: string[] } | undefined
    ) => {
      console.error("Failed to update completed steps:", error);
      if (context?.previousSteps) {
        setCompletedSteps(context.previousSteps);
      } else if (fetchedSteps) {
        setCompletedSteps(fetchedSteps);
      }
    },
    onSettled: () => {
      getCompletedStepsUtilsProcedure.invalidate();
    },
  });

  useEffect(() => {
    if (fetchedSteps) {
      setCompletedSteps(fetchedSteps);
    }
  }, [fetchedSteps]);

  const handleCheckboxChange = useCallback(
    (moduleId: string, checked: boolean) => {
      let newCompletedSteps: string[];
      if (checked) {
        newCompletedSteps = [...completedSteps, moduleId];
      } else {
        newCompletedSteps = completedSteps.filter((id) => id !== moduleId);
      }
      setCompletedSteps(newCompletedSteps);
      updateStepsMutation.mutate({ completedSteps: newCompletedSteps });
    },
    [completedSteps, updateStepsMutation]
  );

  // Memoize computed values
  const totalModules = useMemo(() => sheetModules.length, []);
  const completedCount = useMemo(() => completedSteps.length, [completedSteps]);

  // Memoize download handler
  const handleDownloadPDF = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const percentage =
      totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>30 days of Open Source sheet</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              background: white;
              color: black;
            }
            h1 { font-size: 24px; margin-bottom: 10px; }
            .progress { margin-bottom: 20px; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #363636;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            .completed { color: #9455f4; }
          </style>
        </head>
        <body>
          <h1>30 days of Open Source sheet</h1>
          <div class="progress">
            <p><strong>Total Progress:</strong> ${completedCount} / ${totalModules} (${percentage}%)</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Module Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${sheetModules
                .map(
                  (module, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${module.name}</td>
                  <td class="${completedSteps.includes(module.id) ? "completed" : ""}">
                    ${completedSteps.includes(module.id) ? "✓ Completed" : "Pending"}
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }, [completedCount, totalModules, completedSteps]);

  // Memoize share handler
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (clipboardErr) {
      console.error("Failed to copy:", clipboardErr);
    }
  }, []);

  // Show loading only if we're actually loading session OR steps
  const isLoading =
    (status === "loading" || isLoadingSteps) && !completedSteps.length;

  if (isLoading) {
    return (
      <div className="w-full p-6 flex items-center justify-center h-[80vh]">
        <p className="text-ox-gray">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-6 overflow-hidden">
      <div className="w-[95vw] md:w-[90vw] lg:w-full flex items-start justify-between pb-6 flex-row lg:flex-shrink-0 lg:gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight">
            30 days of Open Source sheet
          </h2>
          <span className="text-xs text-ox-white">
            (i don&apos;t have a marketing budget,
            <br className="sm:hidden" /> please share this sheet with others 🙏
            :)
          </span>
        </div>
        <div className="flex items-center md:gap-3 flex-shrink-0">
          {copied && (
            <Badge className="bg-ox-purple text-white border-0 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Copied
            </Badge>
          )}
          <button
            onClick={handleDownloadPDF}
            className="p-2 text-white hover:text-ox-purple transition-colors rounded-md hover:bg-ox-header/50"
            title="Download as PDF"
            aria-label="Download as PDF"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-white hover:text-ox-purple transition-colors rounded-md hover:bg-ox-header/50"
            title="Share sheet"
            aria-label="Share sheet"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="w-[96vw] lg:w-full flex-1 flex flex-col overflow-hidden">
        {/* Progress Bar */}
        <div className="mb-6 flex-shrink-0">
          <ProgressBar completed={completedCount} total={totalModules} />
        </div>

        <div className="mb-6 flex-shrink-0">
          <p className="text-white text-sm italic">
            &quot;sometimes, these modules may feel boring and hard af but
            that&apos;s the cost of learning something worthy. you go through
            it. you win. simple.&quot; — ajeet
          </p>
        </div>

        <div
          className="
          w-full bg-ox-content border border-ox-header rounded-lg
          flex-1 overflow-auto relative
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-ox-purple/30
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-ox-purple/50
        "
        >
          <Table className="w-full min-w-[600px] sm:min-w-[800px]">
            <TableHeader>
              <TableRow className="border-b border-ox-header bg-ox-header">
                {tableColumns.map((name, i) => (
                  <TableHead
                    key={name}
                    className={[
                      "px-3 py-3 font-semibold text-white text-[12px] sm:text-sm whitespace-nowrap",
                      "sticky top-0 z-30 bg-ox-header",
                      i === 0 ? "text-left" : "text-center",
                    ].join(" ")}
                  >
                    {name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {sheetModules.map((module, index) => (
                <SheetTableRow
                  key={module.id}
                  module={module}
                  index={index}
                  isCompleted={completedSteps.includes(module.id)}
                  onCheckboxChange={handleCheckboxChange}
                  isPaidUser={isPaidUser}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
