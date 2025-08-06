import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  margin: number;
  readingMode: 'scroll' | 'pagination';
  autoSaveProgress: boolean;
  syncAcrossDevices: boolean;
  notifications: {
    readingReminders: boolean;
    newBooks: boolean;
    progressUpdates: boolean;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  totalBooks: number;
  totalReadingTime: number; // in seconds
  averageReadingTime: number; // in seconds per day
  favoriteGenres: string[];
  readingStreak: number;
  lastActiveAt: string;
}

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  avatar: z.string().url().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']),
    fontSize: z.number().min(12).max(32),
    fontFamily: z.string(),
    lineHeight: z.number().min(1.2).max(2.5),
    margin: z.number().min(0).max(100),
    readingMode: z.enum(['scroll', 'pagination']),
    autoSaveProgress: z.boolean(),
    syncAcrossDevices: z.boolean(),
    notifications: z.object({
      readingReminders: z.boolean(),
      newBooks: z.boolean(),
      progressUpdates: z.boolean(),
    }),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().optional(),
});

export const UserPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']),
  fontSize: z.number().min(12).max(32),
  fontFamily: z.string(),
  lineHeight: z.number().min(1.2).max(2.5),
  margin: z.number().min(0).max(100),
  readingMode: z.enum(['scroll', 'pagination']),
  autoSaveProgress: z.boolean(),
  syncAcrossDevices: z.boolean(),
  notifications: z.object({
    readingReminders: z.boolean(),
    newBooks: z.boolean(),
    progressUpdates: z.boolean(),
  }),
});

export type UserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserPreferencesInput = UserPreferences; 