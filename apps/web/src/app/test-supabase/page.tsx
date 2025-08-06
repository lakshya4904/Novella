'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function TestSupabasePage() {
  const [status, setStatus] = useState<string>('Ready to test');
  const [books, setBooks] = useState<any[]>([]);

  const testSupabaseConnection = async () => {
    setStatus('Testing Supabase connection...');
    
    try {
      console.log('🔍 Environment variables:');
      console.log('env:', process.env.NODE_ENV);
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing');
      console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
      
      if (!supabase) {
        setStatus('❌ Supabase client not initialized - check environment variables');
        return;
      }

      setStatus('✅ Supabase client initialized');
      
      // Test fetching books
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .limit(5);

      if (error) {
        setStatus(`❌ Database error: ${error.message}`);
        console.error('Database error:', error);
        return;
      }

      setBooks(data || []);
      setStatus(`✅ Connected successfully! Found ${data?.length || 0} books`);
      
    } catch (error) {
      setStatus(`❌ Connection failed: ${error}`);
      console.error('Connection error:', error);
    }
  };

  const testCreateBook = async () => {
    setStatus('Creating test book...');
    
    try {
      if (!supabase) {
        setStatus('❌ Supabase client not initialized - check environment variables');
        return;
      }
      const { data, error } = await supabase
        .from('books')
        .insert({
          user_id: 'test-user',
          title: 'Test Book',
          author: 'Test Author',
          file_url: 'https://example.com/test.epub',
          file_size: 1024000,
          file_type: 'epub',
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        setStatus(`❌ Create error: ${error.message}`);
        console.error('Create error:', error);
        return;
      }

      setStatus(`✅ Test book created with ID: ${data.id}`);
      testSupabaseConnection(); // Refresh the list
      
    } catch (error) {
      setStatus(`❌ Create failed: ${error}`);
      console.error('Create error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Supabase Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
          <p className="text-gray-600 mb-4">{status}</p>
          
          <div className="space-x-4">
            <button
              onClick={testSupabaseConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Connection
            </button>
            
            <button
              onClick={testCreateBook}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Test Book
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Books in Database</h2>
          {books.length === 0 ? (
            <p className="text-gray-500">No books found</p>
          ) : (
            <div className="space-y-2">
              {books.map((book) => (
                <div key={book.id} className="border p-3 rounded">
                  <p><strong>{book.title}</strong> by {book.author}</p>
                  <p className="text-sm text-gray-500">ID: {book.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2">
            <p><strong>env:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Supabase Client:</strong> {supabase ? '✅ Initialized' : '❌ Not initialized'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 