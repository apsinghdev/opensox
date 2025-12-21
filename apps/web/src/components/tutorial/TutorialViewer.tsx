"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import mermaid from "mermaid";
import hljs from "highlight.js";

// @ts-ignore - highlight.js CSS import
import "highlight.js/styles/github-dark.css";

// Helper function to extract text from React children
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren((children as React.ReactElement).props.children);
  }
  return '';
}

interface Chapter {
  filename: string;
  content: string;
}

interface TutorialData {
  id: string;
  projectName: string;
  repoUrl?: string;
  indexContent: string;
  chapters: Chapter[] | unknown;
  mermaidDiagram: string;
  createdAt?: string | Date;
  fromHistory?: boolean;
}

interface TutorialViewerProps {
  tutorialId: string;
  generatedTutorial?: TutorialData | null;
  onBack: () => void;
}

// Mermaid component for rendering diagrams
function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart.trim()) return;
      
      try {
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setError("Failed to render diagram");
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto bg-dash-base/50 rounded-lg p-4 border border-dash-border"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Code block component with copy functionality
function CodeBlock({ 
  children, 
  className, 
  language 
}: { 
  children: string; 
  className?: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Apply syntax highlighting
  useEffect(() => {
    if (codeRef.current && language && children) {
      try {
        if (hljs.getLanguage(language)) {
          const highlighted = hljs.highlight(children, { language }).value;
          codeRef.current.innerHTML = highlighted;
        }
      } catch (e) {
        // Fallback: just show plain text
        console.error("Highlight error:", e);
      }
    }
  }, [children, language]);

  return (
    <div className="relative group my-4">
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 text-xs text-text-tertiary bg-dash-hover rounded-tl-lg rounded-br-lg font-mono z-10">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-dash-hover/80 hover:bg-dash-hover text-text-tertiary hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all z-10"
        title="Copy code"
      >
        {copied ? (
          <CheckIcon className="w-4 h-4 text-green-400" />
        ) : (
          <ClipboardIcon className="w-4 h-4" />
        )}
      </button>
      <pre className={`overflow-x-auto rounded-lg bg-[#0d1117] border border-dash-border p-4 ${language ? 'pt-8' : ''}`}>
        <code 
          ref={codeRef}
          className={`${className || ''} text-sm leading-relaxed hljs`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}

interface TutorialViewerProps {
  tutorialId: string;
  generatedTutorial?: TutorialData | null;
  onBack: () => void;
}

export default function TutorialViewer({
  tutorialId,
  generatedTutorial,
  onBack,
}: TutorialViewerProps) {
  const [selectedChapter, setSelectedChapter] = useState<number>(-1); // -1 = index

  // Fetch tutorial if not provided or if viewing from history
  const shouldFetchFromDb = !generatedTutorial || generatedTutorial.fromHistory;
  const { data: fetchedTutorial, isLoading } = trpc.tutorial.getById.useQuery(
    { id: tutorialId },
    { enabled: shouldFetchFromDb }
  );

  const tutorial: TutorialData | null = generatedTutorial?.fromHistory
    ? (fetchedTutorial as unknown as TutorialData | null)
    : generatedTutorial || (fetchedTutorial as unknown as TutorialData | null);

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#7c3aed",
        primaryTextColor: "#fff",
        primaryBorderColor: "#6d28d9",
        lineColor: "#6b7280",
        secondaryColor: "#1f2937",
        tertiaryColor: "#111827",
        background: "#0d1117",
        mainBkg: "#161b22",
        nodeBorder: "#6d28d9",
        clusterBkg: "#1f2937",
        titleColor: "#fff",
        edgeLabelBackground: "#1f2937",
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 15,
      },
      sequence: {
        actorMargin: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
      },
    });
  }, []);

  const chapters: Chapter[] = tutorial?.chapters
    ? (typeof tutorial.chapters === "string"
        ? JSON.parse(tutorial.chapters)
        : Array.isArray(tutorial.chapters) 
          ? tutorial.chapters as Chapter[]
          : [])
    : [];

  const currentContent =
    selectedChapter === -1
      ? tutorial?.indexContent || ""
      : chapters[selectedChapter]?.content || "";

  const handleDownload = () => {
    if (!tutorial) return;

    // Create a zip-like structure as a single markdown file
    let fullContent = `# ${tutorial.projectName} Tutorial\n\n`;
    fullContent += tutorial.indexContent + "\n\n---\n\n";
    
    chapters.forEach((chapter, index) => {
      fullContent += `\n\n---\n\n${chapter.content}`;
    });

    const blob = new Blob([fullContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tutorial.projectName}-tutorial.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    if (tutorial?.repoUrl) {
      navigator.clipboard.writeText(tutorial.repoUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="text-center py-12">
        <p className="text-text-tertiary">Tutorial not found</p>
        <Button onClick={onBack} variant="ghost" className="mt-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Chapter Navigation */}
      <div className="lg:w-64 shrink-0">
        <div className="bg-dash-surface border border-dash-border rounded-xl p-4 sticky top-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="mb-4 text-text-secondary hover:text-text-primary"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h2 className="text-lg font-semibold text-text-primary mb-2 truncate">
            {tutorial.projectName}
          </h2>

          {tutorial.repoUrl && (
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-xs text-text-tertiary hover:text-brand-purple mb-4"
            >
              <LinkIcon className="w-3 h-3" />
              <span className="truncate">{tutorial.repoUrl.replace("https://github.com/", "")}</span>
            </button>
          )}

          <div className="space-y-1">
            <button
              onClick={() => setSelectedChapter(-1)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedChapter === -1
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-text-secondary hover:bg-dash-hover hover:text-text-primary"
              }`}
            >
              📚 Overview
            </button>
            {chapters.map((chapter, index) => (
              <button
                key={chapter.filename}
                onClick={() => setSelectedChapter(index)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedChapter === index
                    ? "bg-brand-purple/10 text-brand-purple"
                    : "text-text-secondary hover:bg-dash-hover hover:text-text-primary"
                }`}
              >
                {index + 1}. {chapter.filename.replace(/^\d+_/, "").replace(/_/g, " ").replace(".md", "")}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-dash-border">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Download Tutorial
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-dash-surface border border-dash-border rounded-xl p-6 lg:p-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-dash-border">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-brand-purple" />
              <span className="text-sm text-text-secondary">
                {selectedChapter === -1
                  ? "Overview"
                  : `Chapter ${selectedChapter + 1} of ${chapters.length}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChapter(Math.max(-1, selectedChapter - 1))}
                disabled={selectedChapter === -1}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChapter(Math.min(chapters.length - 1, selectedChapter + 1))}
                disabled={selectedChapter === chapters.length - 1}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Markdown Content */}
          <article className="tutorial-content prose prose-invert prose-purple max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                // Headings with proper styling
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4 pb-2 border-b border-dash-border">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-text-primary mt-5 mb-2">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-medium text-text-primary mt-4 mb-2">
                    {children}
                  </h4>
                ),
                
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                
                // Strong/Bold text
                strong: ({ children }) => (
                  <strong className="font-semibold text-text-primary">
                    {children}
                  </strong>
                ),
                
                // Emphasis/Italic
                em: ({ children }) => (
                  <em className="italic text-text-secondary">
                    {children}
                  </em>
                ),
                
                // Links
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-purple hover:text-brand-purple/80 underline decoration-brand-purple/30 hover:decoration-brand-purple transition-colors"
                  >
                    {children}
                  </a>
                ),
                
                // Lists
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-text-secondary">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-text-secondary">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-text-secondary leading-relaxed">
                    {children}
                  </li>
                ),
                
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brand-purple pl-4 my-4 text-text-tertiary italic bg-dash-base/30 py-2 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                
                // Horizontal rule
                hr: () => (
                  <hr className="my-8 border-dash-border" />
                ),
                
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-dash-border rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-dash-hover">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left text-text-primary font-semibold border-b border-dash-border">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-text-secondary border-b border-dash-border">
                    {children}
                  </td>
                ),
                
                // Code blocks
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const codeString = extractTextFromChildren(children).replace(/\n$/, "");
                  
                  // Handle mermaid diagrams
                  if (language === "mermaid") {
                    return <MermaidDiagram chart={codeString} />;
                  }

                  // Inline code
                  if (inline) {
                    return (
                      <code 
                        className="px-1.5 py-0.5 bg-dash-base border border-dash-border rounded text-brand-purple text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  // Code blocks with syntax highlighting
                  return (
                    <CodeBlock language={language} className={className}>
                      {codeString}
                    </CodeBlock>
                  );
                },
                
                // Pre (code block wrapper)
                pre: ({ children }) => <>{children}</>,
                
                // Images
                img: ({ src, alt }) => (
                  <img 
                    src={src} 
                    alt={alt || ""} 
                    className="rounded-lg border border-dash-border my-4 max-w-full"
                  />
                ),
              }}
            >
              {currentContent}
            </ReactMarkdown>
          </article>

          {/* Chapter Navigation Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-dash-border">
            <Button
              variant="outline"
              onClick={() => setSelectedChapter(Math.max(-1, selectedChapter - 1))}
              disabled={selectedChapter === -1}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedChapter(Math.min(chapters.length - 1, selectedChapter + 1))}
              disabled={selectedChapter === chapters.length - 1}
            >
              Next
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
