import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";

dotenv.config();

const GH_PAT = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

// File patterns to include by default
const DEFAULT_INCLUDE_PATTERNS = new Set([
  "*.py", "*.js", "*.jsx", "*.ts", "*.tsx", "*.go", "*.java",
  "*.c", "*.cpp", "*.h", "*.md", "*.rst", "*.yaml", "*.yml"
]);

// Patterns to exclude by default
const DEFAULT_EXCLUDE_PATTERNS = new Set([
  "node_modules/*", "*test*", "*tests/*", "*__tests__/*",
  "dist/*", "build/*", ".git/*", ".github/*", ".vscode/*",
  "*.min.js", "*.min.css", "package-lock.json", "pnpm-lock.yaml",
  "yarn.lock", "*.log", "coverage/*", ".next/*"
]);

interface CrawlOptions {
  includePatterns?: Set<string>;
  excludePatterns?: Set<string>;
  maxFileSize?: number;
  maxFiles?: number;
}

interface CrawlResult {
  files: Array<{ path: string; content: string }>;
  stats: {
    totalFiles: number;
    skippedFiles: number;
    repoName: string;
    owner: string;
  };
}

/**
 * Check if a filename matches a pattern (simple glob matching)
 */
function matchesPattern(filename: string, pattern: string): boolean {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\./g, "\\.")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${regexPattern}$`).test(filename);
}

/**
 * Check if file should be included based on patterns
 */
function shouldIncludeFile(
  filePath: string,
  fileName: string,
  includePatterns: Set<string>,
  excludePatterns: Set<string>
): boolean {
  // Check include patterns
  const includeFile = Array.from(includePatterns).some(pattern =>
    matchesPattern(fileName, pattern) || matchesPattern(filePath, pattern)
  );

  if (!includeFile) return false;

  // Check exclude patterns
  const excludeFile = Array.from(excludePatterns).some(pattern =>
    matchesPattern(filePath, pattern) || matchesPattern(fileName, pattern)
  );

  return !excludeFile;
}

/**
 * Parse GitHub URL to extract owner and repo
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string; branch?: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }

  const owner = match[1] || "";
  let repo = (match[2] || "").replace(/\.git$/, "");
  
  // Check for branch in URL
  const branchMatch = url.match(/\/tree\/([^\/]+)/);
  const branch = branchMatch ? branchMatch[1] : undefined;

  if (!owner || !repo) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }

  // Return with optional branch (only include if defined)
  const result: { owner: string; repo: string; branch?: string } = { owner, repo };
  if (branch) {
    result.branch = branch;
  }
  return result;
}

/**
 * Fetch file content from GitHub
 */
async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  ref?: string
): Promise<string | null> {
  const token = GH_PAT;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const refParam = ref ? `?ref=${ref}` : "";
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${refParam}`;

  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${path}: ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.warn(`Error fetching ${path}:`, error);
    return null;
  }
}

/**
 * Get all files in a repository using Git Trees API (single API call)
 * Much faster than recursive contents API
 */
export async function getRepoFiles(
  owner: string,
  repo: string,
  path: string = "",
  ref?: string
): Promise<Array<{ path: string; size: number; type: string }>> {
  const token = GH_PAT;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  // First, get the default branch if no ref specified
  let branch = ref;
  if (!branch) {
    try {
      const repoResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers }
      );
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        branch = repoData.default_branch || "main";
      } else {
        branch = "main";
      }
    } catch {
      branch = "main";
    }
  }

  // Use Git Trees API with recursive=1 to get entire tree in one call
  const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

  try {
    const response = await fetch(treeUrl, { headers });
    
    if (!response.ok) {
      console.warn(`Failed to get tree: ${response.status}`);
      // Fallback to contents API for the root
      return getRepoFilesLegacy(owner, repo, path, ref);
    }

    const data = await response.json();
    const files: Array<{ path: string; size: number; type: string }> = [];

    if (data.tree) {
      for (const item of data.tree) {
        if (item.type === "blob") {
          files.push({
            path: item.path,
            size: item.size || 0,
            type: "file",
          });
        }
      }
    }

    console.log(`Git Trees API returned ${files.length} files`);
    return files;
  } catch (error) {
    console.warn(`Error getting tree:`, error);
    return getRepoFilesLegacy(owner, repo, path, ref);
  }
}

/**
 * Legacy recursive method (fallback)
 */
async function getRepoFilesLegacy(
  owner: string,
  repo: string,
  path: string = "",
  ref?: string
): Promise<Array<{ path: string; size: number; type: string }>> {
  const token = GH_PAT;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const refParam = ref ? `?ref=${ref}` : "";
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${refParam}`;

  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.warn(`Failed to list ${path}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const files: Array<{ path: string; size: number; type: string }> = [];

    for (const item of data) {
      if (item.type === "file") {
        files.push({
          path: item.path,
          size: item.size,
          type: "file",
        });
      } else if (item.type === "dir") {
        // Recursively get files in subdirectory
        const subFiles = await getRepoFilesLegacy(owner, repo, item.path, ref);
        files.push(...subFiles);
      }
    }

    return files;
  } catch (error) {
    console.warn(`Error listing ${path}:`, error);
    return [];
  }
}

/**
 * Crawl GitHub repository files
 */
export async function crawlGitHubFiles(
  repoUrl: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const {
    includePatterns = DEFAULT_INCLUDE_PATTERNS,
    excludePatterns = DEFAULT_EXCLUDE_PATTERNS,
    maxFileSize = 100 * 1024, // 100KB default
    maxFiles = 50,
  } = options;

  const { owner, repo, branch } = parseGitHubUrl(repoUrl);
  
  console.log(`Crawling repository: ${owner}/${repo}`);

  // Get all files in the repository
  const allFiles = await getRepoFiles(owner, repo, "", branch);
  
  const files: Array<{ path: string; content: string }> = [];
  let skippedFiles = 0;

  for (const file of allFiles) {
    // Check file count limit
    if (files.length >= maxFiles) {
      console.log(`Reached max file limit: ${maxFiles}`);
      break;
    }

    // Check file size
    if (file.size > maxFileSize) {
      console.log(`Skipping ${file.path}: size ${file.size} exceeds limit ${maxFileSize}`);
      skippedFiles++;
      continue;
    }

    // Check patterns
    const fileName = file.path.split("/").pop() || "";
    if (!shouldIncludeFile(file.path, fileName, includePatterns, excludePatterns)) {
      continue;
    }

    // Fetch file content
    const content = await fetchFileContent(owner, repo, file.path, branch);
    if (content) {
      files.push({ path: file.path, content });
      console.log(`Added ${file.path} (${file.size} bytes)`);
    }
  }

  console.log(`Crawled ${files.length} files from ${owner}/${repo}`);

  return {
    files,
    stats: {
      totalFiles: files.length,
      skippedFiles,
      repoName: repo,
      owner,
    },
  };
}

/**
 * List all files in a repository without fetching content
 * Used for file browser UI
 */
export async function listRepoFiles(
  repoUrl: string,
  options: { maxFileSize?: number } = {}
): Promise<{
  files: Array<{ path: string; size: number; type: "file" | "dir" }>;
  repoName: string;
  owner: string;
}> {
  const { maxFileSize = 500 * 1024 } = options; // 500KB default limit for display
  
  const { owner, repo, branch } = parseGitHubUrl(repoUrl);
  
  console.log(`Listing files in repository: ${owner}/${repo}`);

  const allFiles = await getRepoFiles(owner, repo, "", branch);
  
  // Filter and map files
  const files = allFiles
    .filter(file => {
      const fileName = file.path.split("/").pop() || "";
      return shouldIncludeFile(file.path, fileName, DEFAULT_INCLUDE_PATTERNS, DEFAULT_EXCLUDE_PATTERNS);
    })
    .map(file => ({
      path: file.path,
      size: file.size,
      type: "file" as const,
    }));

  console.log(`Found ${files.length} matching files in ${owner}/${repo}`);

  return {
    files,
    repoName: repo,
    owner,
  };
}

/**
 * Crawl specific files from a GitHub repository
 * Used when user selects specific files from the file browser
 */
export async function crawlSelectedFiles(
  repoUrl: string,
  selectedPaths: string[],
  options: { maxFileSize?: number } = {}
): Promise<CrawlResult> {
  const { maxFileSize = 100 * 1024 } = options;
  
  const { owner, repo, branch } = parseGitHubUrl(repoUrl);
  
  console.log(`Crawling ${selectedPaths.length} selected files from ${owner}/${repo}`);

  const files: Array<{ path: string; content: string }> = [];
  let skippedFiles = 0;

  for (const filePath of selectedPaths) {
    // Fetch file content
    const content = await fetchFileContent(owner, repo, filePath, branch);
    if (content) {
      files.push({ path: filePath, content });
      console.log(`Added ${filePath}`);
    } else {
      skippedFiles++;
    }
  }

  console.log(`Crawled ${files.length} files from ${owner}/${repo}`);

  return {
    files,
    stats: {
      totalFiles: files.length,
      skippedFiles,
      repoName: repo,
      owner,
    },
  };
}

export const githubCrawlerService = {
  crawlGitHubFiles,
  crawlSelectedFiles,
  listRepoFiles,
  getRepoFiles,
  parseGitHubUrl,
  DEFAULT_INCLUDE_PATTERNS,
  DEFAULT_EXCLUDE_PATTERNS,
};
