import Image from "next/image";

type ImageCardProps = {
  title: string;
  content: string | string[];
  imageUrl: string;
  alt?: string;
  readMoreLink?: string;
  imagePosition?: "top" | "left" | "right";
  halfWidth?: boolean;
  scale?: number; // i prosent, f.eks. 90 for 90%
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
}: ImageCardProps) {
  const isSide = imagePosition === "left" || imagePosition === "right";
  const isImageRight = imagePosition === "right";
  const isArray = Array.isArray(content);

  // Hardkodet dimensjoner for å regne ut ratio om du ikke har det dynamisk:
  const baseWidth = 800;
  const baseHeight = 600;
  const ratio = baseHeight / baseWidth; // 0.75

  return (
    <div
      className={`bg-white shadow-md overflow-hidden mb-6 ${isSide ? "sm:flex" : ""} ${
        isImageRight ? "sm:flex-row-reverse" : ""
      } ${halfWidth ? "" : "sm:col-span-2"}`}
    >
      <div
        // Sørg for full bredde på mobil, og halv bredde på sm+ hvis side-by-side
        className={`${isSide ? "sm:w-1/2 w-full" : "w-full"} flex items-center justify-center`}
      >
        {typeof scale === "number" ? (
          <div
            className="relative"
            style={{
              width: `${scale}%`,
              // To alternativer for høydegrunnlag:
              // 1) paddingTop hack:
              paddingTop: `${ratio * 100}%`,
              // 2) eller (i moderne nettlesere) direkte:
              // aspectRatio: `${baseWidth} / ${baseHeight}`,
            }}
          >
            <Image src={imageUrl} alt={alt} fill style={{ objectFit: "contain" }} />
          </div>
        ) : (
          <div className="w-full">
            <Image src={imageUrl} alt={alt} width={baseWidth} height={baseHeight} layout="responsive" />
          </div>
        )}
      </div>

      <div className={`p-6 ${isSide ? "sm:w-1/2" : ""}`}>
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {isArray ? (
          (content as string[]).map((p, i) => (
            <p key={i} className="text-gray-700 mb-4 last:mb-0">
              {p}
            </p>
          ))
        ) : (
          <p className="text-gray-700 mb-4">{content}</p>
        )}

        {readMoreLink && (
          <a
            href={readMoreLink}
            className="inline-block text-sm text-white bg-[var(--primary-blue)] hover:bg-[var(--dark-grey)] px-4 py-2 rounded"
          >
            Read more
          </a>
        )}
      </div>
    </div>
  );
}
