"use client";

import Link from "next/link";
import Nav from "./Nav";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-[var(--primary)]/95 backdrop-blur-md shadow-lg py-2"
            : "bg-[var(--primary)] py-4"
        }
      `}
    >
      <div className="site-container flex flex-nowrap justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="Pure Minerals"
              width={44}
              height={44}
              className="invert transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="brand-name text-white text-xl sm:text-2xl">
              PURE MINERALS
            </span>
            <span className="tagline hidden sm:block">
              Geological Exploration
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <Nav />
      </div>

      {/* Animated accent line */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-[2px]
          bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent
          transition-opacity duration-500
          ${isScrolled ? "opacity-100" : "opacity-0"}
        `}
      />
    </header>
  );
}
