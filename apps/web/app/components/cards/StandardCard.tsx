type StandardCardProps = {
  title: string;
  content: string | string[] | React.ReactNode;
  readMoreLink?: string;
  halfWidth?: boolean;
  compressed?: boolean;
};

export default function StandardCard({
  title,
  content,
  readMoreLink,
  halfWidth = false,
  compressed = false,
}: StandardCardProps) {
  const isArray = Array.isArray(content);

  return (
    <div
      className={`bg-white ${compressed ? "mb-1" : "mb-6"} shadow-md p-6 min-h-[100px] ${
        halfWidth ? "" : "sm:col-span-2"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {isArray ? (
        (content as string[]).map((paragraph, i) => (
          <p key={i} className="text-gray-700 mb-4 last:mb-0">
            {paragraph}
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
  );
}
