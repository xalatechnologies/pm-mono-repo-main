"use client";

import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineCard = ({ 
  item, 
}: { 
  item: TimelineEntry; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <div
      ref={cardRef}
      className="flex justify-start pt-8 md:pt-16 gap-4 md:gap-6"
    >
      {/* Left side - Year indicator */}
      <div className="flex flex-col items-center z-40 flex-shrink-0 w-20 md:w-32">
        {/* Dot with animation */}
        <motion.div 
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[var(--color-earth-copper)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            type: "spring",
            stiffness: 200 
          }}
        >
          <motion.div 
            className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-br from-[var(--color-earth-copper)] to-[var(--color-earth-gold-bright)]"
            animate={isInView ? { 
              boxShadow: [
                "0 0 0 0 rgba(184, 115, 51, 0.4)",
                "0 0 0 12px rgba(184, 115, 51, 0)",
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.div>
        
        {/* Year title below dot */}
        <motion.h3 
          className="mt-3 text-lg md:text-2xl font-display font-bold text-[var(--color-earth-copper)] text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {item.title}
        </motion.h3>
      </div>

      {/* Right side - Content (wider) */}
      <motion.div 
        className="flex-1 min-w-0"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {item.content}
      </motion.div>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[var(--color-neutral-100)] font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-6xl mx-auto pb-20 px-4 md:px-8 lg:px-12">
        {data.map((item, index) => (
          <TimelineCard key={index} item={item} />
        ))}
        
        {/* Timeline track - positioned to align with dots */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[calc(1rem+38px)] md:left-[calc(2rem+48px)] lg:left-[calc(3rem+48px)] top-0 overflow-hidden w-[3px] bg-gradient-to-b from-[var(--color-neutral-300)] via-[var(--color-neutral-300)] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]"
        >
          {/* Animated progress line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-[var(--color-earth-copper)] via-[var(--color-earth-copper)] to-[var(--color-earth-gold-bright)] rounded-full shadow-[0_0_10px_var(--color-earth-copper)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
