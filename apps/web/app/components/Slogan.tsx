// app/components/Slogan.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Slogan() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] overflow-hidden z-10">
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <Image src="/minerals.jpg" alt="Minerals background" fill className="object-cover object-center" priority />
      </div>
      <div className="absolute inset-0 bg-black opacity-40 z-10" />
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center">What Tomorrow Needs, We Find Today.</h1>
      </div>
    </section>
  );
}
