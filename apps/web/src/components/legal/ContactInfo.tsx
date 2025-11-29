import React from "react";
import Link from "next/link";

interface ContactInfoProps {
  showTitle?: boolean;
  titleText?: string;
  description?: string;
  showContactPage?: boolean;
}

export function ContactInfo({
  showTitle = true,
  titleText = "Have Questions?",
  description = "If you have any questions, concerns, or need clarification, please don't hesitate to reach out:",
  showContactPage = true,
}: ContactInfoProps) {
  return (
    <>
      {showTitle && (
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          {titleText}
        </h2>
      )}
      {description && <p className="mb-4">{description}</p>}
      <div className="space-y-2">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:hi@opensox.ai"
            className="text-link hover:text-link-hover transition-colors"
          >
            hi@opensox.ai
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href="tel:+918447500346"
            className="text-link hover:text-link-hover transition-colors"
          >
            +91 844-7500-346
          </a>
        </p>
        {showContactPage && (
          <p>
            <strong>Contact Page:</strong>{" "}
            <Link
              href="/contact"
              className="text-link hover:text-link-hover transition-colors"
            >
              opensox.ai/contact
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

