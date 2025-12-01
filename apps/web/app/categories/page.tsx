import { Category } from "@/types/category";

export default async function CategoriesPage() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  // if (!res.ok) {
  //   // Du kan kaste en error her for å vise en Next.js error page, eller håndtere den på en annen måte
  //   throw new Error("Failed to fetch articles");
  // }
  // const data = await res.json();
  // const categories: Category[] = data.articles || [];
  const categories: Category[] = [];

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kategorier3</h1>
      <ul>
        {categories.map((cat) => (
          <li key={String(cat.id)}>{cat.title}</li>
        ))}
      </ul>
    </main>
  );
}
