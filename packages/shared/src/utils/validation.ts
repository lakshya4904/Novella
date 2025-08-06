import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
export const nameSchema = z.string().min(1, 'Name is required').max(100, 'Name too long');

// File validation
export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(100 * 1024 * 1024, 'File size must be less than 100MB'),
  type: z.string().refine(
    (type) => ['application/epub+zip', 'application/pdf', 'application/x-mobipocket-ebook'].includes(type),
    'Only EPUB, PDF, and MOBI files are supported'
  ),
});

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  filters: z.object({
    categories: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    fileTypes: z.array(z.enum(['epub', 'pdf', 'mobi'])).optional(),
    dateRange: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
  }).optional(),
  sortBy: z.enum(['title', 'author', 'date', 'size']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Reading settings validation
export const readingSettingsSchema = z.object({
  fontSize: z.number().min(12).max(32),
  fontFamily: z.string(),
  lineHeight: z.number().min(1.2).max(2.5),
  margin: z.number().min(0).max(100),
  theme: z.enum(['light', 'dark', 'sepia']),
  readingMode: z.enum(['scroll', 'pagination']),
});

// Utility functions
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

export const validateFile = (file: File): boolean => {
  try {
    fileSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    return true;
  } catch {
    return false;
  }
};

export const getValidationError = (error: z.ZodError): string => {
  return error.errors.map((e) => e.message).join(', ');
}; 