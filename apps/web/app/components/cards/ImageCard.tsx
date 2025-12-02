import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ImageCardProps = {
  title: string;
  content: string | string[];
  imageUrl: string;
  alt?: string;
  readMoreLink?: string;
  imagePosition?: "top" | "left" | "right";
  halfWidth?: boolean;
  scale?: number;
  variant?: "default" | "dark" | "overlay";
};

export default function ImageCard({
  title,
  content,
  imageUrl,
  alt = "",
  readMoreLink,
  imagePosition = "top",
  halfWidth = false,
  scale,
  variant = "default",
}: ImageCardProps) {
  const isSide = imagePosition === "left" || imagePosition === "right";
  const isImageRight = imagePosition === "right";
  const isArray = Array.isArray(content);

  const baseWidth = 800;
  const baseHeight = 600;
  const ratio = baseHeight / baseWidth;

  const variantClasses = {
    default: "bg-white border-[var(--stone-grey)]/10",
    dark: "bg-[var(--primary)] border-white/10",
    overlay: "bg-white border-[var(--stone-grey)]/10",
  };

  const titleClasses = {
    default: "text-[var(--primary)]",
    dark: "text-white",
    overlay: "text-[var(--primary)]",
  };

  const textClasses = {
    default: "text-[var(--stone-grey)]",
    dark: "text-white/70",
    overlay: "text-[var(--stone-grey)]",
  };

  return (
    <div
      className={`
        relative overflow-hidden mb-6
        ${isSide ? "sm:flex" : ""}
        ${isImageRight ? "sm:flex-row-reverse" : ""}
        ${halfWidth ? "" : "sm:col-span-2"}
        ${variantClasses[variant]}
        border rounded-xl
        shadow-sm hover:shadow-xl
        transition-all duration-500 ease-out
        group
      `}
    >
      {/* Image Container */}
      <div
        className={`
          ${isSide ? "sm:w-1/2 w-full" : "w-full"}
          relative overflow-hidden
          image-hover-zoom
        `}
      >
        {typeof scale === "number" ? (
          <div
            className="relative flex items-center justify-center p-4"
            style={{
              width: "100%",
              paddingTop: `${ratio * scale}%`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div
                className="relative h-full"
                style={{ width: `${scale}%` }}
              >
                <Image
                  src={imageUrl}
                  alt={alt}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={`relative ${isSide ? "h-full min-h-[250px]" : "aspect-video"}`}>
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div
              className={`
                absolute inset-0
                ${variant === "overlay"
                  ? "bg-gradient-to-t from-[var(--primary)]/60 via-transparent to-transparent"
                  : "bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
                }
                transition-opacity duration-500
              `}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${isSide ? "sm:w-1/2 flex flex-col justify-center" : ""}`}>
        <h2
          className={`
            text-xl sm:text-2xl font-serif font-bold mb-3
            ${titleClasses[variant]}
            group-hover:text-[var(--secondary)] transition-colors duration-300
          `}
        >
          {title}
        </h2>

        {isArray ? (
          (content as string[]).map((p, i) => (
            <p
              key={i}
              className={`${textClasses[variant]} mb-4 last:mb-0 leading-relaxed`}
            >
              {p}
            </p>
          ))
        ) : (
          <p className={`${textClasses[variant]} mb-4 leading-relaxed`}>{content}</p>
        )}

        {readMoreLink && (
          <Link
            href={readMoreLink}
            className={`
              inline-flex items-center gap-2 mt-2
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

      {/* Corner accent */}
      <div
        className={`
          absolute top-0 right-0 w-20 h-20
          bg-gradient-to-bl from-[var(--secondary)]/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        `}
      />
    </div>
  );
}
