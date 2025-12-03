"use client";

import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  variant?: "default" | "thin" | "thick";
}

export default function GoldDivider({ className, variant = "default" }: GoldDividerProps) {
  const heightClass = {
    thin: "h-[1px]",
    default: "h-[2px]",
    thick: "h-1",
  }[variant];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={cn(
          "w-full bg-gradient-to-r from-transparent via-[var(--color-earth-copper)] to-transparent",
          heightClass
        )}
      />
      {/* Optional glow effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-earth-gold-bright)] to-transparent opacity-50 blur-sm",
          heightClass
        )}
      />
    </div>
  );
}

