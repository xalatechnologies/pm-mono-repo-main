"use client";

import { useEffect, useRef, useState } from "react";

interface StatsCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function StatsCard({ 
  value, 
  suffix = "", 
  label, 
  icon,
  delay = 0 
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

  return (
    <div
      ref={ref}
      className={`
        relative p-6 rounded-xl bg-white/80 backdrop-blur-sm
        border border-[var(--stone-grey)]/10
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        hover:shadow-lg hover:border-[var(--secondary)]/30
        group
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--secondary)] to-[var(--earth-brown)] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon */}
      {icon && (
        <div className="mb-3 text-[var(--secondary)] opacity-80">
          {icon}
        </div>
      )}
      
      {/* Value */}
      <div className="text-4xl md:text-5xl font-bold text-[var(--primary)] font-serif mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      
      {/* Label */}
      <div className="text-[var(--stone-grey)] text-sm uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}

