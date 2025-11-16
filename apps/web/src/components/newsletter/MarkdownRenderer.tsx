"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="newsletter-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold text-ox-white mt-8 mb-4"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-semibold text-ox-white mt-6 mb-3"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-xl font-semibold text-ox-white mt-4 mb-2"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="text-ox-gray leading-relaxed mb-4" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-ox-white" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-ox-gray" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-ox-purple hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-ox-gray" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-ox-gray" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="px-1.5 py-0.5 rounded bg-[#1a1a1d] text-ox-purple text-sm font-mono"
                {...props}
              />
            ) : (
              <code
                className="block p-4 rounded-lg bg-[#1a1a1d] text-ox-gray text-sm font-mono overflow-x-auto mb-4"
                {...props}
              />
            ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-ox-purple pl-4 italic text-ox-gray my-4"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

