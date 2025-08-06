import { z } from 'zod';

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
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: Note[];
}

export interface Bookmark {
  id: string;
  bookId: string;
  userId: string;
  location: string;
  page?: number;
  title: string;
  description?: string;
  createdAt: string;
}

export interface Highlight {
  id: string;
  bookId: string;
  userId: string;
  location: string;
  page?: number;
  text: string;
  color: string;
  note?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  bookId: string;
  userId: string;
  location: string;
  page?: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in seconds
  pagesRead: number;
  locationStart: string;
  locationEnd?: string;
}

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

export const BookmarkSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  location: z.string(),
  page: z.number().positive().optional(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
});

export const HighlightSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  location: z.string(),
  page: z.number().positive().optional(),
  text: z.string(),
  color: z.string(),
  note: z.string().optional(),
  createdAt: z.string(),
});

export const NoteSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  location: z.string(),
  page: z.number().positive().optional(),
  text: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReadingSessionSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  duration: z.number().min(0),
  pagesRead: z.number().min(0),
  locationStart: z.string(),
  locationEnd: z.string().optional(),
});

export type ReadingProgressInput = Omit<ReadingProgress, 'id' | 'createdAt' | 'updatedAt'>;
export type BookmarkInput = Omit<Bookmark, 'id' | 'createdAt'>;
export type HighlightInput = Omit<Highlight, 'id' | 'createdAt'>;
export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export type ReadingSessionInput = Omit<ReadingSession, 'id'>; 