"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = 
  | "fade-in" 
  | "fade-in-up" 
  | "fade-in-down" 
  | "slide-in-left" 
  | "slide-in-right" 
  | "scale-in";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animationClasses: Record<AnimationType, string> = {
  "fade-in": "animate-fade-in",
  "fade-in-up": "animate-fade-in-up",
  "fade-in-down": "animate-fade-in-down",
  "slide-in-left": "animate-slide-in-left",
  "slide-in-right": "animate-slide-in-right",
  "scale-in": "animate-scale-in",
};

export default function AnimatedSection({
  children,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
  className = "",
  once = true,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[animation] : "opacity-0"}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}

