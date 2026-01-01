"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
    XMarkIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedProjectsStore } from "@/store/useSavedProjectsStore";

interface SavedProjectsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SavedProjectsPanel({
    isOpen,
    onClose,
}: SavedProjectsPanelProps) {
    const { savedProjects, clearAllSaved, removeProject, importAndValidate } =
        useSavedProjectsStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const handleExport = () => {
        const dataStr = JSON.stringify(savedProjects, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `saved-repos-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target?.result as string);
                const result = importAndValidate(imported);

                if (result.success) {
                    alert(result.error || "Projects imported successfully!");
                } else {
                    alert(result.error || "Failed to import projects.");
                }
            } catch (error) {
                console.error("Failed to import saved repos:", error);
                alert("Failed to import file. Please ensure it's a valid JSON file.");
            }
        };
        reader.readAsText(file);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClearAll = () => {
        if (showClearConfirm) {
            clearAllSaved();
            setShowClearConfirm(false);
        } else {
            setShowClearConfirm(true);
            setTimeout(() => setShowClearConfirm(false), 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-ox-content border-l border-dash-border z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-dash-border">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-text-primary">
                            Saved Projects
                        </h2>
                        <Badge variant="secondary" className="bg-brand-purple/20 text-brand-purple">
                            {savedProjects.length}
                        </Badge>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        aria-label="Close panel"
                    >
                        <XMarkIcon className="h-5 w-5 text-text-primary" />
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-b border-dash-border space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={handleExport}
                            disabled={savedProjects.length === 0}
                            className="bg-brand-purple hover:bg-brand-purple/80 text-text-primary text-sm h-9"
                        >
                            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                            Export
                        </Button>
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-brand-purple hover:bg-brand-purple/80 text-text-primary text-sm h-9"
                        >
                            <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                            Import
                        </Button>
                    </div>
                    <Button
                        onClick={handleClearAll}
                        disabled={savedProjects.length === 0}
                        variant="destructive"
                        className="w-full text-sm h-9"
                    >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        {showClearConfirm ? "Click again to confirm" : "Clear All"}
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                    />
                </div>

                {/* Saved Projects List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {savedProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-text-muted">
                            <p className="text-sm text-center">No saved projects yet</p>
                            <p className="text-xs text-center mt-2">
                                Click the star icon on any project to save it
                            </p>
                        </div>
                    ) : (
                        savedProjects.map((repo) => (
                            <div
                                key={repo.id}
                                className="p-3 bg-ox-gray/30 rounded-lg border border-dash-border hover:border-brand-purple/50 transition-colors group"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-text-primary hover:text-brand-purple transition-colors truncate block"
                                        >
                                            {repo.name}
                                        </a>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            {repo.language && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-info/15 text-info"
                                                >
                                                    {repo.language}
                                                </Badge>
                                            )}
                                            {repo.popularity && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-success/15 text-success"
                                                >
                                                    {repo.popularity}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-text-muted mt-1">
                                            Saved {new Date(repo.savedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeProject(repo.id)}
                                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-error/20 rounded transition-all"
                                        aria-label="Remove from saved"
                                    >
                                        <XMarkIcon className="h-4 w-4 text-error" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
