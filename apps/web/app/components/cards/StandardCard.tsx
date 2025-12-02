import Link from "next/link";
import { ArrowRight } from "lucide-react";

type StandardCardProps = {
  title: string;
  content: string | string[] | React.ReactNode;
  readMoreLink?: string;
  halfWidth?: boolean;
  compressed?: boolean;
  variant?: "default" | "dark" | "bordered";
};

export default function StandardCard({
  title,
  content,
  readMoreLink,
  halfWidth = false,
  compressed = false,
  variant = "default",
}: StandardCardProps) {
  const isArray = Array.isArray(content);

  const variantClasses = {
    default: "bg-white border-[var(--stone-grey)]/10",
    dark: "bg-[var(--primary)] border-white/10 text-white",
    bordered: "bg-white border-[var(--secondary)]/20",
  };

  const titleClasses = {
    default: "text-[var(--primary)]",
    dark: "text-white",
    bordered: "text-[var(--primary)]",
  };

  const textClasses = {
    default: "text-[var(--stone-grey)]",
    dark: "text-white/70",
    bordered: "text-[var(--stone-grey)]",
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${compressed ? "mb-1" : "mb-6"}
        ${halfWidth ? "" : "sm:col-span-2"}
        ${variantClasses[variant]}
        border rounded-xl
        shadow-sm hover:shadow-lg
        transition-all duration-300 ease-out
        group
        card-hover
      `}
    >
      {/* Accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--secondary)] to-[var(--earth-brown)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className={`${compressed ? "p-4" : "p-6"}`}>
        <h2
          className={`
            text-xl font-serif font-bold mb-4
            ${titleClasses[variant]}
            group-hover:text-[var(--secondary)] transition-colors duration-300
          `}
        >
          {title}
        </h2>

        {isArray ? (
          (content as string[]).map((paragraph, i) => (
            <p key={i} className={`${textClasses[variant]} mb-4 last:mb-0 leading-relaxed`}>
              {paragraph}
            </p>
          ))
        ) : (
          <div className={`${textClasses[variant]} mb-4 leading-relaxed`}>{content}</div>
        )}

        {readMoreLink && (
          <Link
            href={readMoreLink}
            className={`
              inline-flex items-center gap-2
              text-sm font-semibold
              ${variant === "dark" ? "text-[var(--secondary)]" : "text-[var(--primary)]"}
              hover:text-[var(--secondary)]
              transition-colors duration-300
              group/link
            `}
          >
            <span>Read more</span>
            <ArrowRight
              size={16}
              className="transform group-hover/link:translate-x-1 transition-transform duration-300"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
