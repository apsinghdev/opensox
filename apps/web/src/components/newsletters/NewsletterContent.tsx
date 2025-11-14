/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    const text = String(children).replace(/\n$/, '');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 group">
      <pre className="bg-[#15161a] border border-[#252525] rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
      
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`
          absolute top-3 right-3 p-2 rounded-md transition-all duration-200
          ${copied 
            ? 'text-green-400 bg-green-400/10 border border-green-400/20' 
            : 'text-[#666] bg-[#252525] opacity-0 group-hover:opacity-100 hover:text-white hover:bg-[#333]'
          }
        `}
        title="Copy code"
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <DocumentDuplicateIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default function NewsletterContent({ body }: { body: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }: any) => (
          <h2 className="text-xl lg:text-2xl font-semibold text-white mt-10 mb-4 leading-tight">
            {children}
          </h2>
        ),
        h3: ({ children }: any) => (
          <h3 className="text-lg lg:text-xl font-semibold text-white mt-8 mb-3 leading-tight">
            {children}
          </h3>
        ),
        
        // Paragraphs
        p: ({ children }: any) => (
          <p className="text-[#d1d1d1] text-base leading-relaxed mb-6">
            {children}
          </p>
        ),
        
        // Lists
        ul: ({ children }: any) => (
          <ul className="text-[#d1d1d1] text-base leading-relaxed mb-6 list-disc list-inside space-y-2">
            {children}
          </ul>
        ),
        ol: ({ children }: any) => (
          <ol className="text-[#d1d1d1] text-base leading-relaxed mb-6 list-decimal list-inside space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }: any) => (
          <li className="pl-2">{children}</li>
        ),
        
        // Code blocks - using our custom CodeBlock component
        code: ({ node, inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code className="px-1.5 py-0.5 bg-[#252525] text-ox-purple rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        
        // Blockquotes
        blockquote: ({ children }: any) => (
          <blockquote className="border-l-3 border-ox-purple bg-[#15161a] pl-4 py-3 my-6 italic text-[#d1d1d1] leading-relaxed">
            {children}
          </blockquote>
        ),
        
        // Links
        a: ({ children, href }: any) => (
          <a 
            href={href} 
            className="text-ox-purple hover:text-ox-purple/80 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        
        // Images
        img: ({ src, alt }: any) => (
          <div className="my-8">
            <div className="relative w-full h-64 lg:h-80 bg-[#15161a] rounded-lg overflow-hidden">
              <Image 
                src={src} 
                alt={alt} 
                className="w-full h-full object-cover"
                loading="lazy"
                width={560}
                height={560}
              />
            </div>
            {alt && alt !== "undefined" && (
              <p className="text-center text-[#666] text-sm mt-3 italic">
                {alt}
              </p>
            )}
          </div>
        ),
        
        // Strong/bold
        strong: ({ children }: any) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        
        // Emphasis/italic
        em: ({ children }: any) => (
          <em className="italic text-[#d1d1d1]">{children}</em>
        ),
        
        // Horizontal rule
        hr: () => (
          <hr className="my-8 border-[#252525]" />
        ),
        
        // Table
        table: ({ children }: any) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-[#252525]">
              {children}
            </table>
          </div>
        ),
        th: ({ children }: any) => (
          <th className="border border-[#252525] px-4 py-2 bg-[#15161a] text-white font-semibold text-left text-sm">
            {children}
          </th>
        ),
        td: ({ children }: any) => (
          <td className="border border-[#252525] px-4 py-2 text-[#d1d1d1] text-sm">
            {children}
          </td>
        ),
      }}
    >
      {body}
    </ReactMarkdown>
  );
}