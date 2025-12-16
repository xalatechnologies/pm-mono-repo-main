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
  // Aggregation fields for news articles
  sourceUrl?: string;
  sourceName?: string;
  isAggregated?: boolean;
  originalPublishedAt?: Date;
  aiGenerated?: boolean;
  tags?: string[];
  // Timestamps (added by mongoose timestamps: true)
  createdAt: Date;
  updatedAt: Date;
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
    // Aggregation fields
    sourceUrl: { type: String, index: true },
    sourceName: { type: String },
    isAggregated: { type: Boolean, default: false },
    originalPublishedAt: { type: Date },
    aiGenerated: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

// Index for efficient duplicate checking
ArticleSchema.index({ sourceUrl: 1 }, { unique: true, sparse: true });

const Article: Model<IArticle> = models.Article || model<IArticle>('Article', ArticleSchema);

export default Article;
