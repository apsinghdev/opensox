"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SheetModuleHeaderProps {
  moduleName: string;
  docContent: string;
}

export function SheetModuleHeader({
  moduleName,
  docContent,
}: SheetModuleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${moduleName} - Open Source Sheet</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 40px;
              background: white;
              color: black;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { 
              font-size: 28px; 
              margin-bottom: 20px; 
              border-bottom: 2px solid #363636;
              padding-bottom: 10px;
            }
            h2 { font-size: 24px; margin-top: 30px; margin-bottom: 15px; }
            h3 { font-size: 20px; margin-top: 25px; margin-bottom: 10px; }
            p { margin-bottom: 15px; }
            a { color: #9455f4; text-decoration: underline; }
            ul, ol { padding-left: 20px; margin-bottom: 15px; }
            li { margin-bottom: 5px; }
            code { 
              background-color: #f5f5f5; 
              padding: 2px 5px; 
              border-radius: 3px; 
              font-family: 'Courier New', monospace;
            }
            pre {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 5px;
              overflow-x: auto;
              margin: 20px 0;
            }
            blockquote {
              border-left: 4px solid #9455f4;
              padding-left: 15px;
              color: #555;
              font-style: italic;
              margin: 20px 0;
            }
            img { max-width: 100%; height: auto; margin: 20px 0; }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              text-align: center;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h1>${moduleName}</h1>
          <div class="content">
            ${docContent}
          </div>
          <div class="footer">
            <p>Generated from Open Source Sheet • opensox.ai</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <Link
        href="/dashboard/sheet"
        className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sheet
      </Link>

      <div className="flex items-center gap-2">
        {copied && (
          <Badge className="bg-brand-purple text-text-primary border-0 flex items-center gap-1">
            <Check className="h-3 w-3" />
            Copied
          </Badge>
        )}
        <button
          onClick={handleDownloadPDF}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-md transition-colors"
          title="Download PDF"
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          onClick={handleShare}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-md transition-colors"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
