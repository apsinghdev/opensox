import React from "react";

interface LegalContentProps {
  children: React.ReactNode;
}

export function LegalContent({ children }: LegalContentProps) {
  return (
    <div className="space-y-8 text-text-primary leading-relaxed">
      {children}
    </div>
  );
}
