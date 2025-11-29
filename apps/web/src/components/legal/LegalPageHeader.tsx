import React from "react";

interface LegalPageHeaderProps {
  title: string;
  effectiveDate?: string;
  subtitle?: string;
}

export function LegalPageHeader({
  title,
  effectiveDate,
  subtitle,
}: LegalPageHeaderProps) {
  return (
    <>
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">{title}</h1>
      {(effectiveDate || subtitle) && (
        <p className="text-text-primary text-lg mb-12">
          {effectiveDate
            ? `Effective date: ${effectiveDate}`
            : subtitle}
        </p>
      )}
    </>
  );
}

