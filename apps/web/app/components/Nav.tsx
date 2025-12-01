"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "PROJECTS",
    href: "",
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
  const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="text-white p-4 z-50 relative">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 uppercase">
            {navItems.map((item) => (
              <li key={item.href} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setProjectsDropdownOpen(!isProjectsDropdownOpen)}
                      className="flex items-center space-x-1"
                    >
                      <span>{item.label}</span>
                      {/* <ChevronDown size={16} className={isProjectsDropdownOpen ? "transform rotate-180" : ""} /> */}
                    </button>
                    {isProjectsDropdownOpen && (
                      <ul className="absolute top-full mt-2 bg-[var(--primary-blue)] text-white py-2 rounded shadow-lg">
                        {item.children.map((child) => (
                          <li
                            key={child.href}
                            className="px-4 py-1 hover:bg-[var(--background)] hover:text-[var(--primary-blue)]"
                          >
                            <Link onClick={() => setProjectsDropdownOpen(false)} href={child.href}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[var(--primary-blue)] bg-opacity-95 z-[9999] flex flex-col items-start p-6 space-y-4 text-xl text-white">
          <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>

          {navItems.map((item) => (
            <div key={item.href} className="w-full">
              {item.children ? (
                <div className="space-y-2">
                  <span className="block uppercase">{item.label}</span>
                  <ul className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setIsOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link href={item.href} onClick={() => setIsOpen(false)} className="block uppercase">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
