"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SparklesIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  FolderOpenIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import FileBrowser from "./FileBrowser";

interface TutorialGeneratorProps {
  onTutorialGenerated: (tutorial: any) => void;
}

// Max total size for selected files (3.0MB)
const MAX_TOTAL_SIZE = 3.0 * 1024 * 1024;

type ViewMode = "form" | "file-browser" | "generating";

export default function TutorialGenerator({ onTutorialGenerated }: TutorialGeneratorProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [language, setLanguage] = useState("english");
  const [viewMode, setViewMode] = useState<ViewMode>("form");
  const [error, setError] = useState<string | null>(null);
  const [existingTutorials, setExistingTutorials] = useState<any[]>([]);
  const [showExistingModal, setShowExistingModal] = useState(false);
  const [repoFiles, setRepoFiles] = useState<Array<{ path: string; size: number; type: "file" | "dir" }>>([]);
  const [isFetchingFiles, setIsFetchingFiles] = useState(false);

  // Check for existing tutorials
  const checkExisting = trpc.tutorial.checkExisting.useQuery(
    { repoUrl },
    { enabled: false }
  );

  // List repo files query
  const listFilesQuery = trpc.tutorial.listRepoFiles.useQuery(
    { repoUrl },
    { enabled: false }
  );

  // Generate mutation
  const generateMutation = trpc.tutorial.generate.useMutation({
    onSuccess: (data: any) => {
      setViewMode("form");
      onTutorialGenerated(data);
    },
    onError: (err: any) => {
      setViewMode("form");
      setError(err.message);
    },
  });

  const handleFetchFiles = async () => {
    setError(null);

    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    // First check for existing tutorials
    const existingResult = await checkExisting.refetch();
    if (existingResult.data?.exists && existingResult.data.tutorials.length > 0) {
      setExistingTutorials(existingResult.data.tutorials);
      setShowExistingModal(true);
      return;
    }

    // Fetch file list
    setIsFetchingFiles(true);
    try {
      const result = await listFilesQuery.refetch();
      if (result.data?.files) {
        setRepoFiles(result.data.files);
        setViewMode("file-browser");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch repository files");
    } finally {
      setIsFetchingFiles(false);
    }
  };

  const handleConfirmFiles = (selectedPaths: string[]) => {
    startGeneration(selectedPaths);
  };

  const handleCancelFileBrowser = () => {
    setViewMode("form");
    setRepoFiles([]);
  };

  const startGeneration = (selectedFiles?: string[]) => {
    setViewMode("generating");
    setShowExistingModal(false);
    
    generateMutation.mutate({
      repoUrl,
      language,
      selectedFiles,
    });
  };

  const handleViewExisting = (tutorialId: string) => {
    setShowExistingModal(false);
    onTutorialGenerated({ id: tutorialId, fromHistory: true });
  };

  const handleGenerateNewFromModal = async () => {
    setShowExistingModal(false);
    
    // Fetch file list
    setIsFetchingFiles(true);
    try {
      const result = await listFilesQuery.refetch();
      if (result.data?.files) {
        setRepoFiles(result.data.files);
        setViewMode("file-browser");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch repository files");
    } finally {
      setIsFetchingFiles(false);
    }
  };

  // File Browser View
  if (viewMode === "file-browser") {
    return (
      <FileBrowser
        files={repoFiles}
        maxTotalSize={MAX_TOTAL_SIZE}
        onConfirm={handleConfirmFiles}
        onCancel={handleCancelFileBrowser}
        isLoading={generateMutation.isPending}
      />
    );
  }

  return (
    <div className="bg-dash-surface border border-dash-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <SparklesIcon className="w-5 h-5 text-brand-purple" />
        <h2 className="text-lg font-semibold text-text-primary">Generate Tutorial</h2>
      </div>

      {/* Existing Tutorial Modal */}
      {showExistingModal && (
        <div className="mb-6 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-lg">
          <div className="flex items-start gap-3">
            <FolderOpenIcon className="w-5 h-5 text-brand-purple mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-text-primary mb-2">
                {existingTutorials.some(t => t.isOwnTutorial) 
                  ? "Existing tutorials found (including yours)" 
                  : "Existing tutorials found from other users"}
              </h3>
              <div className="space-y-2 mb-4">
                {existingTutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="flex items-center justify-between p-2 bg-dash-base rounded-md"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-text-primary">{tutorial.projectName}</p>
                        {tutorial.isOwnTutorial && (
                          <span className="text-xs bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded">
                            Your tutorial
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-tertiary">
                        {new Date(tutorial.createdAt).toLocaleDateString()} • {tutorial.language}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewExisting(tutorial.id)}
                      className="text-brand-purple hover:text-brand-purple/80"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleGenerateNewFromModal}
                  className="bg-brand-purple hover:bg-brand-purple/90"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-1" />
                  Generate New
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowExistingModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleFetchFiles(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            GitHub Repository URL
          </label>
          <Input
            type="url"
            placeholder="https://github.com/owner/repository"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={viewMode === "generating" || isFetchingFiles}
            className="bg-dash-base border-dash-border text-text-primary placeholder:text-text-tertiary focus:border-brand-purple focus:ring-brand-purple"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Tutorial Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={viewMode === "generating" || isFetchingFiles}
            className="w-full h-9 rounded-md border border-dash-border bg-dash-base px-3 text-sm text-text-primary focus:border-brand-purple focus:ring-brand-purple"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={viewMode === "generating" || !repoUrl || isFetchingFiles}
          className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
        >
          {isFetchingFiles ? (
            <>
              <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
              Scanning Repository...
            </>
          ) : (
            <>
              <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
              Browse & Select Files
            </>
          )}
        </Button>
      </form>

      {/* Loading State */}
      {viewMode === "generating" && (
        <div className="mt-6 flex items-center justify-center gap-3 p-8">
          <ArrowPathIcon className="w-6 h-6 text-brand-purple animate-spin" />
          <span className="text-lg text-text-secondary">Loading...</span>
        </div>
      )}

      {/* Tips */}
      {viewMode === "form" && (
        <div className="mt-6 p-4 bg-dash-base rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-2">How it works</h4>
          <ul className="text-xs text-text-tertiary space-y-1">
            <li>1. Enter a GitHub repository URL</li>
            <li>2. Browse and select which files to analyze</li>
            <li>3. AI generates a beginner-friendly tutorial</li>
            <li>4. View chapters with code explanations & diagrams</li>
          </ul>
        </div>
      )}
    </div>
  );
}
