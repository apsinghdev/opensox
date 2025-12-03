"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SheetContentRendererProps {
  content: string;
  className?: string;
}

export function SheetContentRenderer({
  content,
  className,
}: SheetContentRendererProps) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
