// packages/db/models/Article.ts
import pkg from 'mongoose';
import type { Model, Document } from 'mongoose';
const { Schema, model, models } = pkg;

export interface IParagraph {
  subtitle?: string;
  text: string;
  image?: string;
}

export interface IArticle extends Document {
  title: string;
  headline: string;
  featuredImage?: string;
  paragraphs: IParagraph[];
}

const ParagraphSchema = new Schema<IParagraph>(
  {
    subtitle: { type: String },
    text: { type: String, required: true },
    image: { type: String },
  },
  { _id: false },
);

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    headline: { type: String, required: true },
    featuredImage: { type: String },
    paragraphs: { type: [ParagraphSchema], default: [] },
  },
  { timestamps: true },
);

const Article: Model<IArticle> = models.Article || model<IArticle>('Article', ArticleSchema);

export default Article;
