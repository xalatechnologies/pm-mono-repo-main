export interface Paragraph {
  subtitle?: string;
  text: string;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  headline: string;
  featuredImage?: string;
  paragraphs: Paragraph[];
  createdAt: string;
  updatedAt: string;
}
