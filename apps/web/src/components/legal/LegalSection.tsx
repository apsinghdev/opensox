import React from "react";

interface LegalSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({
  title,
  children,
  className = "",
}: LegalSectionProps) {
  return (
    <section className={className}>
      {title && (
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">{title}</h2>
      )}
      {children}
    </section>
  );
}
