import Link from "next/link";
import { cn } from "@/lib/utils";

interface OpensoxProBadgeProps {
  className?: string;
}

export function OpensoxProBadge({ className }: OpensoxProBadgeProps) {
  return (
    <Link href="/pricing">
      <div
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border border-dashed border-brand-purple bg-brand-purple/20 cursor-pointer hover:bg-brand-purple/30 transition-colors",
          className
        )}
      >
        <span
          className={cn(
            "text-[10px] sm:text-xs font-bold text-brand-purple-light",
            className?.includes("px-1.5") && "text-[8px]"
          )}
        >
          OX Pro
        </span>
      </div>
    </Link>
  );
}
