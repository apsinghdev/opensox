"use client";

import { useState, useMemo } from "react";
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface FileItem {
  path: string;
  size: number;
  type: "file" | "dir";
}

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  children: TreeNode[];
}

interface FileBrowserProps {
  files: FileItem[];
  maxTotalSize: number; // in bytes
  onConfirm: (selectedPaths: string[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Build tree structure from flat file list
function buildFileTree(files: FileItem[]): TreeNode[] {
  const root: TreeNode[] = [];
  
  for (const file of files) {
    const parts = file.path.split("/");
    let currentLevel = root;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join("/");
      
      let existing = currentLevel.find(n => n.name === part);
      
      if (!existing) {
        existing = {
          name: part,
          path: currentPath,
          type: isLast ? file.type : "dir",
          size: isLast ? file.size : undefined,
          children: [],
        };
        currentLevel.push(existing);
      }
      
      if (!isLast) {
        currentLevel = existing.children;
      }
    }
  }
  
  // Sort: folders first, then files, alphabetically
  const sortTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .map(node => ({
        ...node,
        children: sortTree(node.children),
      }))
      .sort((a, b) => {
        if (a.type === "dir" && b.type === "file") return -1;
        if (a.type === "file" && b.type === "dir") return 1;
        return a.name.localeCompare(b.name);
      });
  };
  
  return sortTree(root);
}

// Format file size
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Get file extension for icon coloring
function getFileColor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const colors: Record<string, string> = {
    ts: "text-blue-400",
    tsx: "text-blue-400",
    js: "text-yellow-400",
    jsx: "text-yellow-400",
    py: "text-green-400",
    go: "text-cyan-400",
    rs: "text-orange-400",
    java: "text-red-400",
    md: "text-gray-400",
    json: "text-yellow-300",
    yaml: "text-pink-400",
    yml: "text-pink-400",
    css: "text-purple-400",
    html: "text-orange-300",
  };
  return colors[ext || ""] || "text-text-tertiary";
}

// Tree node component
function TreeNodeItem({
  node,
  selectedPaths,
  onToggle,
  expandedPaths,
  onToggleExpand,
  level = 0,
}: {
  node: TreeNode;
  selectedPaths: Set<string>;
  onToggle: (path: string, type: "file" | "dir", children?: TreeNode[]) => void;
  expandedPaths: Set<string>;
  onToggleExpand: (path: string) => void;
  level?: number;
}) {
  const isExpanded = expandedPaths.has(node.path);
  const isSelected = selectedPaths.has(node.path);
  const isFolder = node.type === "dir";
  
  // Check if folder is partially selected
  const getSelectionState = (): "none" | "partial" | "full" => {
    if (node.type === "file") {
      return isSelected ? "full" : "none";
    }
    
    const allFiles = getAllFilePaths(node);
    const selectedCount = allFiles.filter(p => selectedPaths.has(p)).length;
    
    if (selectedCount === 0) return "none";
    if (selectedCount === allFiles.length) return "full";
    return "partial";
  };
  
  const selectionState = getSelectionState();
  
  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-dash-hover transition-colors group ${
          level > 0 ? "ml-4" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/Collapse for folders */}
        {isFolder ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.path);
            }}
            className="p-0.5 hover:bg-dash-base rounded"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-text-tertiary" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-text-tertiary" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        
        {/* Checkbox */}
        <button
          onClick={() => onToggle(node.path, node.type, node.children)}
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
            selectionState === "full"
              ? "bg-brand-purple border-brand-purple"
              : selectionState === "partial"
              ? "bg-brand-purple/50 border-brand-purple"
              : "border-dash-border hover:border-brand-purple/50"
          }`}
        >
          {selectionState === "full" && (
            <CheckIcon className="w-3 h-3 text-white" />
          )}
          {selectionState === "partial" && (
            <div className="w-2 h-0.5 bg-white rounded" />
          )}
        </button>
        
        {/* Icon */}
        {isFolder ? (
          isExpanded ? (
            <FolderOpenIcon className="w-4 h-4 text-yellow-400" />
          ) : (
            <FolderIcon className="w-4 h-4 text-yellow-400" />
          )
        ) : (
          <DocumentIcon className={`w-4 h-4 ${getFileColor(node.name)}`} />
        )}
        
        {/* Name */}
        <span
          className={`flex-1 text-sm truncate ${
            isSelected || selectionState !== "none"
              ? "text-text-primary"
              : "text-text-secondary"
          }`}
          onClick={() => onToggle(node.path, node.type, node.children)}
        >
          {node.name}
        </span>
        
        {/* Size for files */}
        {node.size !== undefined && (
          <span className="text-xs text-text-tertiary">
            {formatSize(node.size)}
          </span>
        )}
      </div>
      
      {/* Children */}
      {isFolder && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.path}
              node={child}
              selectedPaths={selectedPaths}
              onToggle={onToggle}
              expandedPaths={expandedPaths}
              onToggleExpand={onToggleExpand}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Get all file paths under a node
function getAllFilePaths(node: TreeNode): string[] {
  if (node.type === "file") {
    return [node.path];
  }
  return node.children.flatMap(getAllFilePaths);
}

// Get all file nodes under a node
function getAllFileNodes(node: TreeNode): TreeNode[] {
  if (node.type === "file") {
    return [node];
  }
  return node.children.flatMap(getAllFileNodes);
}

export default function FileBrowser({
  files,
  maxTotalSize,
  onConfirm,
  onCancel,
  isLoading = false,
}: FileBrowserProps) {
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(() => {
    // Pre-select files up to limit
    const paths = new Set<string>();
    let totalSize = 0;
    
    for (const file of files) {
      if (file.type === "file" && totalSize + file.size <= maxTotalSize) {
        paths.add(file.path);
        totalSize += file.size;
      }
    }
    
    return paths;
  });
  
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    // Expand first level by default
    const expanded = new Set<string>();
    const tree = buildFileTree(files);
    tree.forEach(node => {
      if (node.type === "dir") {
        expanded.add(node.path);
      }
    });
    return expanded;
  });
  
  const tree = useMemo(() => buildFileTree(files), [files]);
  
  // Calculate total selected size
  const selectedSize = useMemo(() => {
    return files
      .filter(f => f.type === "file" && selectedPaths.has(f.path))
      .reduce((sum, f) => sum + f.size, 0);
  }, [files, selectedPaths]);
  
  const selectedCount = useMemo(() => {
    return files.filter(f => f.type === "file" && selectedPaths.has(f.path)).length;
  }, [files, selectedPaths]);
  
  const totalFiles = files.filter(f => f.type === "file").length;
  const isOverLimit = selectedSize > maxTotalSize;
  
  const handleToggle = (path: string, type: "file" | "dir", children?: TreeNode[]) => {
    setSelectedPaths(prev => {
      const next = new Set(prev);
      
      if (type === "file") {
        if (next.has(path)) {
          next.delete(path);
        } else {
          next.add(path);
        }
      } else if (children) {
        // For folders, toggle all children
        const allFiles = children.flatMap(c => getAllFilePaths({
          ...{ name: "", path, type: "dir", children },
          children,
        } as TreeNode));
        
        // Get actual file paths from the folder
        const folderNode: TreeNode = { name: "", path, type: "dir", children };
        const filePaths = getAllFilePaths(folderNode);
        
        const allSelected = filePaths.every(p => next.has(p));
        
        if (allSelected) {
          filePaths.forEach(p => next.delete(p));
        } else {
          filePaths.forEach(p => next.add(p));
        }
      }
      
      return next;
    });
  };
  
  const handleToggleExpand = (path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };
  
  const handleSelectAll = () => {
    const allPaths = files.filter(f => f.type === "file").map(f => f.path);
    setSelectedPaths(new Set(allPaths));
  };
  
  const handleDeselectAll = () => {
    setSelectedPaths(new Set());
  };
  
  const handleExpandAll = () => {
    const allDirs = files.filter(f => f.type === "dir").map(f => f.path);
    // Also add parent paths
    const allPaths = new Set<string>();
    files.forEach(f => {
      const parts = f.path.split("/");
      for (let i = 1; i < parts.length; i++) {
        allPaths.add(parts.slice(0, i).join("/"));
      }
    });
    setExpandedPaths(allPaths);
  };
  
  const handleCollapseAll = () => {
    setExpandedPaths(new Set());
  };

  return (
    <div className="bg-dash-surface border border-dash-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dash-border bg-dash-base">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Select Files to Analyze
            </h3>
            <p className="text-sm text-text-tertiary mt-0.5">
              Choose which files to include in the tutorial generation
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-dash-hover rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-text-tertiary" />
          </button>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-dash-border flex items-center gap-4 bg-dash-base/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs"
          >
            Select All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeselectAll}
            className="text-xs"
          >
            Deselect All
          </Button>
        </div>
        <div className="h-4 w-px bg-dash-border" />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExpandAll}
            className="text-xs"
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCollapseAll}
            className="text-xs"
          >
            Collapse All
          </Button>
        </div>
      </div>
      
      {/* File Tree */}
      <div className="max-h-96 overflow-y-auto p-2">
        {tree.map((node) => (
          <TreeNodeItem
            key={node.path}
            node={node}
            selectedPaths={selectedPaths}
            onToggle={handleToggle}
            expandedPaths={expandedPaths}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-dash-border bg-dash-base">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-text-secondary">
              {selectedCount} of {totalFiles} files selected
            </span>
            <span className="mx-2 text-text-tertiary">•</span>
            <span className={isOverLimit ? "text-red-400" : "text-text-secondary"}>
              {formatSize(selectedSize)} / {formatSize(maxTotalSize)}
            </span>
            {isOverLimit && (
              <span className="ml-2 text-red-400 text-xs">
                (exceeds limit)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => onConfirm(Array.from(selectedPaths))}
              disabled={selectedCount === 0 || isOverLimit || isLoading}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                `Generate Tutorial (${selectedCount} files)`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
