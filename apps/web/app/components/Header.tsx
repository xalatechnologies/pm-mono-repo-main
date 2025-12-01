"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Image from "next/image";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const isMobile = window.innerWidth < 768;

  //     if (!isMobile) {
  //       setShow(true); // alltid vis header på desktop
  //       return;
  //     }

  //     if (currentScrollY < lastScrollY || currentScrollY < 80) {
  //       setShow(true);
  //     } else {
  //       setShow(false);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-[var(--primary-blue)] text-white transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-nowrap justify-between items-center px-4 py-2 sm:py-4">
          <div className="flex items-center font-extrabold font-mono text-xl sm:text-2xl">
            <Link href="/" className="flex items-center font-extrabold font-mono text-xl sm:text-2xl h-8 sm:h-10">
              <Image src="/logo.png" alt="PM" width={44} height={10} className="invert " />
              <span className="ml-2">PURE MINERALS</span>
            </Link>
          </div>
          <Nav />
        </div>
      </header>
    </>
  );
}
