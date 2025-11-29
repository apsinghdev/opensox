import { cn } from "@/lib/utils";

interface ActiveTagProps {
  className?: string;
  text?: string;
}

export function ActiveTag({ className, text = "active" }: ActiveTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "px-2 py-0.5 rounded-lg",
        "bg-success-bg text-success-text",
        "text-xs font-sm",
        "border border-success-border",
        className
      )}
    >
      {text}
    </span>
  );
}
