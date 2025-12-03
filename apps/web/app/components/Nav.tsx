"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Overview", href: "/projects" },
      { label: "Skrattåsen", href: "/projects/skrattaasen" },
      { label: "Gaulstad/Mokk", href: "/projects/mokk" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block" ref={dropdownRef}>
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label} className="relative">
              {item.children ? (
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`
                      flex items-center gap-1 px-4 py-2
                      text-on-dark-muted hover:text-white
                      nav-link
                      transition-colors duration-300
                      relative group
                    `}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--secondary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`
                      absolute top-full left-0 mt-2
                      min-w-[200px]
                      bg-[var(--primary)] border border-white/10
                      rounded-lg shadow-xl
                      overflow-hidden
                      transition-all duration-300 origin-top
                      ${
                        activeDropdown === item.label
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                      }
                    `}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveDropdown(null)}
                        className="
                          block px-4 py-3
                          text-on-dark-muted hover:text-white
                          hover:bg-white/10
                          body-small weight-medium transition-colors duration-200
                          border-b border-white/5 last:border-0
                        "
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="
                    block px-4 py-2
                    text-on-dark-muted hover:text-white
                    nav-link
                    transition-colors duration-300
                    relative group
                  "
                >
                  <span>{item.label}</span>
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--secondary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-white hover:text-[var(--secondary)] transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-[100]
          transition-all duration-500
          md:hidden
          ${isOpen ? "visible" : "invisible"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm
            transition-opacity duration-500
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-[300px] max-w-[80vw]
            bg-[var(--primary)]
            shadow-2xl
            transition-transform duration-500 ease-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-[var(--secondary)] transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Menu Items */}
          <nav className="pt-20 px-6">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="border-b border-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="
                        w-full flex items-center justify-between
                        py-4 text-on-dark overline
                        transition-colors hover:text-copper
                      "
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`
                        overflow-hidden transition-all duration-300
                        ${activeDropdown === item.label ? "max-h-[200px] pb-4" : "max-h-0"}
                      `}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="
                            block py-2 pl-4
                            text-on-dark-muted hover:text-copper
                            body-large transition-colors
                          "
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      block py-4
                      text-on-dark overline
                      transition-colors hover:text-copper
                    "
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="caption text-on-dark-subtle">
              © {new Date().getFullYear()} Pure Minerals AS
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
