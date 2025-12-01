// components/ArticleCard.tsx
import { Article } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/articles/${article.id}`}>
      {/* <a className="block border p-4 rounded hover:shadow-lg transition-shadow duration-200"> */}
      <h2 className="text-xl font-semibold">{article.title}</h2>
      <p className="text-gray-600">{article.headline}</p>
      {article.featuredImage && (
        <div className="relative h-64 w-full mb-4">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="mt-2 max-h-48 w-full object-cover rounded"
          />
        </div>
      )}
      <p className="mt-2 text-sm text-gray-400">Publisert {new Date(article.createdAt).toLocaleDateString()}</p>
      {/* </a> */}
    </Link>
  );
};

export default ArticleCard;
