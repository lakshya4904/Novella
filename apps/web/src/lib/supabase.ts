import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types (interfaces for users, books, reading_progress tables)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          author: string;
          description?: string;
          cover_url?: string;
          file_url: string;
          file_size: number;
          file_type: 'epub' | 'pdf' | 'mobi';
          language: string;
          isbn?: string;
          publisher?: string;
          published_date?: string;
          page_count?: number;
          categories: string[];
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          author: string;
          description?: string;
          cover_url?: string;
          file_url: string;
          file_size: number;
          file_type: 'epub' | 'pdf' | 'mobi';
          language?: string;
          isbn?: string;
          publisher?: string;
          published_date?: string;
          page_count?: number;
          categories?: string[];
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          author?: string;
          description?: string;
          cover_url?: string;
          file_url?: string;
          file_size?: number;
          file_type?: 'epub' | 'pdf' | 'mobi';
          language?: string;
          isbn?: string;
          publisher?: string;
          published_date?: string;
          page_count?: number;
          categories?: string[];
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      reading_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          current_page: number;
          total_pages: number;
          progress_percentage: number;
          last_read_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          current_page: number;
          total_pages: number;
          progress_percentage: number;
          last_read_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          current_page?: number;
          total_pages?: number;
          progress_percentage?: number;
          last_read_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 