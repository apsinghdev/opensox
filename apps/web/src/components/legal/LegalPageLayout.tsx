import React from "react";

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">{children}</div>
    </div>
  );
}

