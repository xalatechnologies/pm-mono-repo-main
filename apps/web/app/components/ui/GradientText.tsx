import { ReactNode } from "react";

type GradientType = "copper" | "earth" | "stone";

interface GradientTextProps {
  children: ReactNode;
  gradient?: GradientType;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

const gradientClasses: Record<GradientType, string> = {
  copper: "bg-gradient-to-r from-[var(--secondary)] via-[var(--earth-brown)] to-[var(--secondary)]",
  earth: "bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--accent)]",
  stone: "bg-gradient-to-r from-[var(--stone-grey)] via-[var(--primary)] to-[var(--stone-grey)]",
};

export default function GradientText({
  children,
  gradient = "copper",
  className = "",
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={`
        ${gradientClasses[gradient]}
        bg-clip-text text-transparent
        bg-[length:200%_auto]
        animate-[shimmer_3s_ease-in-out_infinite]
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

