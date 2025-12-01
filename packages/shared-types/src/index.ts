// Article Types
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

// Category Types
export interface Category {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Common Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Environment Types
export type Environment = "development" | "test" | "production";

