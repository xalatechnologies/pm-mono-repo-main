"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff, Mountain, Pickaxe } from "lucide-react";

interface ArticleImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  aspectRatio?: "video" | "square" | "card";
}

// Placeholder component with mining-themed design
function ImagePlaceholder({ aspectRatio = "video" }: { aspectRatio?: string }) {
  // Generate a subtle pattern based on the aspect ratio for variety
  const patterns = [
    { icon: Mountain, color: "from-[var(--color-earth-copper)]" },
    { icon: Pickaxe, color: "from-[var(--color-earth-patina)]" },
    { icon: ImageOff, color: "from-[var(--color-brand-primary)]" },
  ];
  
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const Icon = pattern.icon;

  return (
    <div
      className={`
        w-full h-full flex items-center justify-center
        bg-gradient-to-br ${pattern.color}/10 to-[var(--color-neutral-100)]
        relative overflow-hidden
      `}
    >
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Center icon */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center">
          <Icon size={32} className="text-[var(--color-neutral-400)]" />
        </div>
        <span className="text-xs text-[var(--color-neutral-400)] font-medium">
          {aspectRatio === "card" ? "No preview" : "Image unavailable"}
        </span>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[var(--color-earth-copper)]/5" />
      <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[var(--color-earth-patina)]/5" />
    </div>
  );
}

export default function ArticleImage({
  src,
  alt,
  fill = true,
  priority = false,
  className = "object-cover",
  aspectRatio = "video",
}: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no source or error loading, show placeholder
  if (!src || hasError) {
    return <ImagePlaceholder aspectRatio={aspectRatio} />;
  }

  return (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neutral-100)] via-[var(--color-neutral-200)] to-[var(--color-neutral-100)] animate-pulse" />
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={`${className} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        unoptimized
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </>
  );
}

// Simpler placeholder for inline use
export function ArticleImagePlaceholder() {
  return <ImagePlaceholder aspectRatio="card" />;
}

