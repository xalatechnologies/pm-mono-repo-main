"use client";

import { useEffect, useRef, useState } from "react";

interface StatsCardProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  variant?: "default" | "featured";
}

export default function StatsCard({ 
  value, 
  suffix = "", 
  label, 
  description,
  icon,
  delay = 0,
  variant = "default"
}: StatsCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  const isFeatured = variant === "featured";

  return (
    <div
      ref={ref}
      className={`
        relative overflow-hidden rounded-2xl
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        group cursor-default
        ${isFeatured 
          ? "bg-[var(--color-brand-primary)] text-white" 
          : "bg-white border border-[var(--color-neutral-200)]"
        }
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Decorative gradient orb */}
      <div 
        className={`
          absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl
          transition-opacity duration-500
          ${isFeatured 
            ? "bg-[var(--color-earth-copper)]/30 group-hover:bg-[var(--color-earth-copper)]/50" 
            : "bg-[var(--color-earth-copper)]/10 group-hover:bg-[var(--color-earth-copper)]/20"
          }
        `}
      />
      
      {/* Accent line on hover */}
      <div 
        className={`
          absolute top-0 left-0 right-0 h-1 
          bg-gradient-to-r from-[var(--color-earth-copper)] via-[var(--color-earth-gold)] to-[var(--color-earth-copper)]
          transform origin-left scale-x-0 group-hover:scale-x-100
          transition-transform duration-500 ease-out
        `}
      />
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-10">
        {/* Top row: Icon and label */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          {icon && (
            <div 
              className={`
                w-14 h-14 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${isFeatured 
                  ? "bg-white/10 text-[var(--color-earth-copper-light)] group-hover:bg-white/20" 
                  : "bg-[var(--color-earth-copper)]/10 text-[var(--color-earth-copper)] group-hover:bg-[var(--color-earth-copper)]/20"
                }
              `}
            >
              {icon}
            </div>
          )}
          
          {/* Decorative number badge */}
          <div 
            className={`
              text-6xl font-display font-bold opacity-[0.08]
              absolute top-4 right-6
              ${isFeatured ? "text-white" : "text-[var(--color-brand-primary)]"}
            `}
          >
            {String(value).padStart(2, '0')}
          </div>
        </div>
        
        {/* Value */}
        <div className="mb-3">
          <span 
            className={`
              font-display font-bold tracking-tight
              text-5xl md:text-6xl lg:text-7xl
              ${isFeatured ? "text-white" : "text-[var(--color-brand-primary)]"}
            `}
          >
            {count.toLocaleString()}
          </span>
          {suffix && (
            <span 
              className={`
                font-display font-semibold text-3xl md:text-4xl ml-1
                ${isFeatured ? "text-[var(--color-earth-copper-light)]" : "text-[var(--color-earth-copper)]"}
              `}
            >
              {suffix}
            </span>
          )}
        </div>
        
        {/* Label */}
        <h3 
          className={`
            text-lg md:text-xl font-semibold tracking-wide uppercase mb-2
            ${isFeatured ? "text-white/90" : "text-[var(--color-brand-primary)]"}
          `}
        >
          {label}
        </h3>
        
        {/* Description */}
        {description && (
          <p 
            className={`
              text-base leading-relaxed
              ${isFeatured ? "text-white/60" : "text-[var(--color-neutral-500)]"}
            `}
          >
            {description}
          </p>
        )}
      </div>
      
      {/* Bottom accent */}
      <div 
        className={`
          absolute bottom-0 left-8 right-8 h-px
          ${isFeatured 
            ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" 
            : "bg-gradient-to-r from-transparent via-[var(--color-neutral-200)] to-transparent"
          }
        `}
      />
    </div>
  );
}
