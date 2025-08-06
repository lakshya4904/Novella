'use client';

import { Book, Clock, User } from 'lucide-react';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    fileType: 'epub' | 'pdf' | 'mobi';
    fileSize: number;
    lastReadAt?: string;
    readingProgress?: number;
  };
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatLastRead = (dateString?: string) => {
    if (!dateString) return 'Never read';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-gray-100 rounded-t-lg flex items-center justify-center">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <Book className="h-12 w-12 text-gray-400" />
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <User className="h-3 w-3 mr-1" />
          {book.author}
        </p>
        
        {/* Progress Bar */}
        {book.readingProgress !== undefined && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{Math.round(book.readingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary-600 h-1 rounded-full transition-all"
                style={{ width: `${book.readingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* File Info */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="uppercase font-medium">{book.fileType}</span>
          <span>{formatFileSize(book.fileSize)}</span>
        </div>

        {/* Last Read */}
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Clock className="h-3 w-3 mr-1" />
          {formatLastRead(book.lastReadAt)}
        </div>
      </div>
    </div>
  );
} 