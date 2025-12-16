"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackCTAClick, trackExternalLinkClick } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[var(--secondary)] to-[var(--earth-brown)]
    text-white font-semibold
    hover:shadow-[var(--shadow-copper)]
    hover:translate-y-[-2px]
    active:translate-y-0
  `,
  secondary: `
    bg-[var(--primary)]
    text-[var(--foreground-light)] font-semibold
    hover:bg-[var(--obsidian)]
    hover:translate-y-[-2px]
    active:translate-y-0
  `,
  outline: `
    bg-transparent
    text-[var(--primary)] font-semibold
    border-2 border-[var(--primary)]
    hover:bg-[var(--primary)]
    hover:text-[var(--foreground-light)]
    hover:translate-y-[-2px]
    active:translate-y-0
  `,
  ghost: `
    bg-transparent
    text-[var(--primary)] font-medium
    hover:bg-[var(--primary)]/10
    active:bg-[var(--primary)]/20
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  external = false,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
  `;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  const handleClick = () => {
    if (href && external) {
      trackExternalLinkClick(href, String(children));
    } else if (href) {
      trackCTAClick(String(children), window.location.pathname);
    }
    onClick?.();
  };

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={handleClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

