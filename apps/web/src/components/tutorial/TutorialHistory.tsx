"use client";

import { ClockIcon, TrashIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import { trpc } from "@/lib/trpc";

interface Tutorial {
  id: string;
  projectName: string;
  repoUrl: string;
  language: string;
  createdAt: string | Date;
}

interface TutorialHistoryProps {
  tutorials: Tutorial[];
  onSelectTutorial: (id: string) => void;
}

export default function TutorialHistory({
  tutorials,
  onSelectTutorial,
}: TutorialHistoryProps) {
  const utils = trpc.useUtils();

  const deleteMutation = trpc.tutorial.delete.useMutation({
    onSuccess: () => {
      utils.tutorial.getUserTutorials.invalidate();
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this tutorial?")) {
      deleteMutation.mutate({ id });
    }
  };

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const extractRepoName = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2]}` : url;
  };

  return (
    <div className="bg-dash-surface border border-dash-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <ClockIcon className="w-5 h-5 text-brand-purple" />
        <h2 className="text-lg font-semibold text-text-primary">Recent Tutorials</h2>
      </div>

      {tutorials.length === 0 ? (
        <div className="text-center py-8">
          <FolderOpenIcon className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-text-tertiary">No tutorials generated yet</p>
          <p className="text-xs text-text-tertiary mt-1">
            Generate your first tutorial to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              onClick={() => onSelectTutorial(tutorial.id)}
              className="group p-4 bg-dash-base hover:bg-dash-hover border border-dash-border rounded-lg cursor-pointer transition-all hover:border-brand-purple/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-brand-purple transition-colors truncate">
                    {tutorial.projectName}
                  </h3>
                  <p className="text-xs text-text-tertiary truncate mt-1">
                    {extractRepoName(tutorial.repoUrl)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-text-tertiary">
                      {formatDate(tutorial.createdAt)}
                    </span>
                    <span className="text-text-tertiary">•</span>
                    <span className="text-xs text-text-tertiary capitalize">
                      {tutorial.language}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(e, tutorial.id)}
                  className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all"
                  title="Delete tutorial"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
