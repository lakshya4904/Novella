import { z } from 'zod';

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
  fileUrl: string;
  fileSize: number;
  fileType: 'epub' | 'pdf' | 'mobi';
  language: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastReadAt?: string;
  readingProgress?: ReadingProgress;
}

export interface ReadingProgress {
  id: string;
  bookId: string;
  userId: string;
  currentLocation: string;
  currentPage?: number;
  totalPages?: number;
  percentage: number;
  timeSpent: number; // in seconds
  lastReadAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookMetadata {
  title: string;
  author: string;
  description?: string;
  language: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories: string[];
}

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  coverUrl: z.string().url().optional(),
  fileUrl: z.string().url(),
  fileSize: z.number().positive(),
  fileType: z.enum(['epub', 'pdf', 'mobi']),
  language: z.string(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  pageCount: z.number().positive().optional(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastReadAt: z.string().optional(),
});

export const ReadingProgressSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  currentLocation: z.string(),
  currentPage: z.number().positive().optional(),
  totalPages: z.number().positive().optional(),
  percentage: z.number().min(0).max(100),
  timeSpent: z.number().min(0),
  lastReadAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BookInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type ReadingProgressInput = Omit<ReadingProgress, 'id' | 'createdAt' | 'updatedAt'>; 