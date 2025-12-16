"use client";

import { useState, useMemo } from "react";
import { Article } from "@/types/articles";
import ArticleCard from "./ArticleCard";
import { X, Pickaxe, Mountain, Gem, Zap, Search, Compass, Grid3X3 } from "lucide-react";

interface ArticleFiltersProps {
  articles: Article[];
}

// Define filter categories with colors
const FILTER_CATEGORIES = [
  { 
    id: "all", 
    label: "All News", 
    icon: <Grid3X3 size={16} />,
    keywords: [],
    color: "var(--color-brand-primary)"
  },
  { 
    id: "mining", 
    label: "Mining", 
    icon: <Pickaxe size={16} />,
    keywords: ["mining", "mine", "miner", "underground", "open-pit", "ore"],
    color: "var(--color-earth-copper)"
  },
  { 
    id: "exploration", 
    label: "Exploration", 
    icon: <Compass size={16} />,
    keywords: ["exploration", "drill", "drilling", "prospect", "survey", "discovery"],
    color: "#2563eb"
  },
  { 
    id: "geology", 
    label: "Geology", 
    icon: <Mountain size={16} />,
    keywords: ["geology", "geological", "earth", "rock", "formation", "deposit"],
    color: "#059669"
  },
  { 
    id: "copper-zinc", 
    label: "Base Metals", 
    icon: <Pickaxe size={16} />,
    keywords: ["copper", "zinc", "lead", "base-metal", "base metal", "nickel"],
    color: "#ea580c"
  },
  { 
    id: "precious", 
    label: "Precious Metals", 
    icon: <Gem size={16} />,
    keywords: ["gold", "silver", "platinum", "palladium", "precious"],
    color: "#ca8a04"
  },
  { 
    id: "critical", 
    label: "Critical Minerals", 
    icon: <Zap size={16} />,
    keywords: ["rare earth", "ree", "lithium", "cobalt", "battery", "critical mineral", "graphite"],
    color: "#7c3aed"
  },
];

export default function ArticleFilters({ articles }: ArticleFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on selected category and search
  const filteredArticles = useMemo(() => {
    let result = articles;

    // Apply category filter
    if (activeFilter !== "all") {
      const category = FILTER_CATEGORIES.find(c => c.id === activeFilter);
      if (category && category.keywords.length > 0) {
        result = result.filter(article => {
          const searchText = `${article.title} ${article.headline} ${article.tags?.join(' ') || ''}`.toLowerCase();
          return category.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
        });
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => {
        const searchText = `${article.title} ${article.headline} ${article.tags?.join(' ') || ''}`.toLowerCase();
        return searchText.includes(query);
      });
    }

    return result;
  }, [articles, activeFilter, searchQuery]);

  // Count articles per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    
    FILTER_CATEGORIES.forEach(category => {
      if (category.id === "all") return;
      
      counts[category.id] = articles.filter(article => {
        const searchText = `${article.title} ${article.headline} ${article.tags?.join(' ') || ''}`.toLowerCase();
        return category.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
      }).length;
    });
    
    return counts;
  }, [articles]);

  return (
    <div className="space-y-8">
      {/* Filter Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-neutral-200)] p-6">
        {/* Search and Filter Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)]" size={20} />
            <input
              type="text"
              placeholder="Search articles by title, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] focus:bg-white focus:border-[var(--color-earth-copper)] outline-none transition-all text-[var(--color-brand-primary)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-[var(--color-neutral-200)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-300)] transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[var(--color-neutral-500)]">
              Showing <span className="font-semibold text-[var(--color-brand-primary)]">{filteredArticles.length}</span> of {articles.length} articles
            </span>
            {(activeFilter !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)] transition-colors font-medium"
              >
                <X size={14} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories - Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {FILTER_CATEGORIES.map((category) => {
            const count = categoryCounts[category.id] || 0;
            const isActive = activeFilter === category.id;
            
            // Hide categories with no articles (except "all")
            if (category.id !== "all" && count === 0) return null;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`
                  relative flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-[var(--color-brand-primary)] text-white shadow-lg scale-[1.02]" 
                    : "bg-[var(--color-neutral-50)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)]"
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${isActive 
                    ? "bg-white/20" 
                    : "bg-white shadow-sm"
                  }
                `}
                style={{ color: isActive ? 'white' : category.color }}
                >
                  {category.icon}
                </div>
                
                {/* Label */}
                <span className="text-xs font-semibold text-center leading-tight">
                  {category.label}
                </span>
                
                {/* Count Badge */}
                <span className={`
                  absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center
                  ${isActive 
                    ? "bg-[var(--color-earth-copper)] text-white" 
                    : "bg-[var(--color-neutral-200)] text-[var(--color-neutral-600)]"
                  }
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-neutral-100)] flex items-center justify-center">
            <Search size={32} className="text-[var(--color-neutral-400)]" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-2">
            No articles found
          </h3>
          <p className="text-[var(--color-neutral-600)] mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-earth-copper)] text-white hover:bg-[var(--color-earth-copper)]/90 transition-colors"
          >
            <X size={16} />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

