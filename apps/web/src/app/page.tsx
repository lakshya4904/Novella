'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BookGrid from '../components/BookGrid';
import BookUpload from '../components/BookUpload';
import BookReader from '../components/BookReader';
import { Plus } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  fileUrl: string;
  fileType: 'epub' | 'pdf' | 'mobi';
  fileSize: number;
  lastReadAt?: string;
  readingProgress?: number;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showReader, setShowReader] = useState(false);

  // Load books from API
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/books?userId=demo-user');
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books || []);
      } else {
        console.error('Failed to load books');
        // Fallback to sample data
        setBooks(sampleBooks);
      }
    } catch (error) {
      console.error('Error loading books:', error);
      // Fallback to sample data
      setBooks(sampleBooks);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setShowReader(true);
  };

  const handleUploadComplete = () => {
    loadBooks(); // Reload books after upload
  };

  const handleCloseReader = () => {
    setShowReader(false);
    setSelectedBook(null);
  };

  // Sample data for demonstration
  const sampleBooks: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      fileUrl: 'https://drive.google.com/file/d/sample1/view',
      fileType: 'epub',
      fileSize: 1024000,
      lastReadAt: '2024-01-15T10:30:00Z',
      readingProgress: 65,
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      fileUrl: 'https://drive.google.com/file/d/sample2/view',
      fileType: 'pdf',
      fileSize: 2048000,
      lastReadAt: '2024-01-10T14:20:00Z',
      readingProgress: 30,
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      fileUrl: 'https://drive.google.com/file/d/sample3/view',
      fileType: 'epub',
      fileSize: 1536000,
      lastReadAt: '2024-01-20T09:15:00Z',
      readingProgress: 85,
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      fileUrl: 'https://drive.google.com/file/d/sample4/view',
      fileType: 'epub',
      fileSize: 1280000,
      lastReadAt: undefined,
      readingProgress: 0,
    },
    {
      id: '5',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      fileUrl: 'https://drive.google.com/file/d/sample5/view',
      fileType: 'pdf',
      fileSize: 3072000,
      lastReadAt: '2024-01-18T16:45:00Z',
      readingProgress: 45,
    },
    {
      id: '6',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      fileUrl: 'https://drive.google.com/file/d/sample6/view',
      fileType: 'epub',
      fileSize: 1792000,
      lastReadAt: '2024-01-12T11:30:00Z',
      readingProgress: 20,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Library
            </h1>
            <p className="text-gray-600">
              {books.length} books in your collection
            </p>
          </div>
          
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </button>
        </div>

        {/* Book Grid */}
        <BookGrid 
          books={books} 
          onBookClick={handleBookClick}
          loading={loading}
        />
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <BookUpload
          onUploadComplete={handleUploadComplete}
          onClose={() => setShowUpload(false)}
        />
      )}

      {/* Book Reader */}
      {showReader && selectedBook && (
        <BookReader
          book={selectedBook}
          onClose={handleCloseReader}
        />
      )}
    </div>
  );
} 