"use client";

import Link from "next/link";
import Nav from "./Nav";
import Image from "next/image";

export default function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--primary-blue)] text-white transition-transform duration-300">
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
