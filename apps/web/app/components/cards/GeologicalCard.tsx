"use client";

import Image from "next/image";
import { useState } from "react";
import { 
  ChevronDown, 
  Mountain, 
  Pickaxe, 
  Gem, 
  Calendar, 
  MapPin,
  Layers,
  Microscope
} from "lucide-react";

type GeologicalCardProps = {
  title: string;
  content: string;
  imageUrl: string;
  alt?: string;
  imagePosition?: "left" | "right";
  category?: "history" | "mineralization" | "geology" | "fieldwork" | "discovery";
  highlights?: string[];
  year?: string;
  location?: string;
  index?: number;
};

const categoryConfig = {
  history: {
    icon: Pickaxe,
    color: "var(--secondary)",
    bgColor: "rgba(184, 115, 51, 0.1)",
    label: "Mining History",
  },
  mineralization: {
    icon: Gem,
    color: "var(--accent)",
    bgColor: "rgba(74, 124, 111, 0.1)",
    label: "Mineralization",
  },
  geology: {
    icon: Layers,
    color: "var(--earth-brown)",
    bgColor: "rgba(139, 105, 20, 0.1)",
    label: "Geology",
  },
  fieldwork: {
    icon: Microscope,
    color: "var(--stone-grey)",
    bgColor: "rgba(107, 114, 128, 0.1)",
    label: "Fieldwork",
  },
  discovery: {
    icon: Mountain,
    color: "var(--secondary)",
    bgColor: "rgba(184, 115, 51, 0.1)",
    label: "Discovery",
  },
};

export default function GeologicalCard({
  title,
  content,
  imageUrl,
  alt = "",
  imagePosition = "right",
  category = "geology",
  highlights = [],
  year,
  location,
  index = 0,
}: GeologicalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = categoryConfig[category];
  const Icon = config.icon;
  const isImageRight = imagePosition === "right";
  const hasImage = imageUrl && imageUrl.length > 0;

  // Determine if content is long enough to need expansion
  const needsExpansion = content.length > 300;
  const displayContent = needsExpansion && !isExpanded 
    ? content.slice(0, 280) + "..." 
    : content;

  return (
    <article
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-[var(--obsidian)] to-[var(--primary)]
        border border-white/10 rounded-2xl
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        group
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} ${isImageRight ? '' : 'lg:flex-row-reverse'}`}>
        {/* Image Section */}
        {hasImage && (
          <div className="lg:w-2/5 relative">
            <div className="relative h-64 lg:h-full lg:min-h-[320px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Image overlay gradient */}
              <div className={`
                absolute inset-0
                ${isImageRight 
                  ? 'bg-gradient-to-l from-[var(--obsidian)] via-transparent to-transparent lg:bg-gradient-to-r' 
                  : 'bg-gradient-to-r from-[var(--obsidian)] via-transparent to-transparent lg:bg-gradient-to-l'
                }
              `} />
              
              {/* Floating category badge on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                <Icon size={14} style={{ color: config.color }} />
                <span className="text-xs font-medium text-white/90">{config.label}</span>
              </div>

              {/* Year badge */}
              {year && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                  <Calendar size={14} className="text-white/70" />
                  <span className="text-xs font-medium text-white/90">{year}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={`${hasImage ? 'lg:w-3/5' : 'w-full'} p-6 lg:p-8 flex flex-col justify-center`}>
          {/* Category badge (shown when no image) */}
          {!hasImage && (
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon size={20} style={{ color: config.color }} />
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: config.color }}>
                  {config.label}
                </span>
                {year && (
                  <span className="text-xs text-white/50 ml-2">• {year}</span>
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-serif font-bold text-white mb-4 group-hover:text-[var(--secondary)] transition-colors duration-300">
            {title}
          </h3>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 mb-3 text-white/60">
              <MapPin size={14} />
              <span className="text-sm">{location}</span>
            </div>
          )}

          {/* Content */}
          <p className="text-white/70 leading-relaxed mb-4">
            {displayContent}
          </p>

          {/* Expand button */}
          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm font-medium text-[var(--secondary)] hover:text-[var(--secondary)]/80 transition-colors mb-4"
            >
              <span>{isExpanded ? "Show less" : "Read more"}</span>
              <ChevronDown 
                size={16} 
                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* Highlights/Tags */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
              {highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/10 hover:border-[var(--secondary)]/50 hover:text-[var(--secondary)] transition-colors cursor-default"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100 0 L100 100 L0 100 Z"
            fill="currentColor"
            className="text-[var(--secondary)]"
          />
        </svg>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 60px rgba(184, 115, 51, 0.1)`,
        }}
      />
    </article>
  );
}

