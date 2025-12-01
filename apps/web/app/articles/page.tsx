import React from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "@/types/articles";

// Merk: ikke bruk betinget export her – det er ikke støttet av Next.js
// Siden blir behandlet som SSG (statisk) automatisk uten dynamic-export

export default async function ArticlesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_API_URL environment variable");
    return <div>Konfigurasjon mangler. Prøv igjen senere.</div>;
  }

  const articlesUrl = baseUrl + "/articles";

  try {
    
    const res = await fetch(articlesUrl, {
      // cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
      cache:  "no-store",
    });

    if (!res.ok) {
      console.error(`Feil ved henting av artikler: ${res.status}`);
      throw new Error(`Failed to fetch articles`);
    }

    const data = await res.json();
    const articles: Article[] = data || [];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Artikler:</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={String(article.id)} article={article} />
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Feil i ArticlesPage:", err);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Artikler</h1>
        <pre>{String(err)}</pre>
        <p className="text-red-600">Kunne ikke hente artikler. Prøv igjen senere. baseUrl: {baseUrl}, articlesUrl: {articlesUrl}</p>
      </div>
    );
  }
}
