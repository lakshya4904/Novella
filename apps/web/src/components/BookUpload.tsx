'use client';

import { useState, useRef } from 'react';
import { Upload, X, BookOpen, FileText, File } from 'lucide-react';

interface BookUploadProps {
  onUploadComplete: () => void;
  onClose: () => void;
}

interface BookMetadata {
  title: string;
  author: string;
  description?: string;
  language: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories: string[];
  tags: string[];
}

export default function BookUpload({ onUploadComplete, onClose }: BookUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<BookMetadata>({
    title: '',
    author: '',
    description: '',
    language: 'en',
    categories: [],
    tags: []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/epub+zip', 'application/pdf', 'application/x-mobipocket-ebook'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid EPUB, PDF, or MOBI file.');
        return;
      }

      // Validate file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB.');
        return;
      }

      setSelectedFile(file);
      
      // Try to extract title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      if (!metadata.title) {
        setMetadata(prev => ({ ...prev, title: fileName }));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !metadata.title || !metadata.author) {
      alert('Please fill in all required fields and select a file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log('📤 Starting book upload...');
      console.log('📁 File:', selectedFile.name, selectedFile.size, selectedFile.type);
      console.log('📝 Metadata:', metadata);
      
      // Simulate file upload to Google Drive (in real app, this would upload to Google Drive)
      const fileUrl = await simulateFileUpload(selectedFile);
      console.log('📎 Generated file URL:', fileUrl);
      
      const bookData = {
        userId: 'demo-user', // In real app, get from auth
        title: metadata.title,
        author: metadata.author,
        description: metadata.description,
        fileUrl,
        fileSize: selectedFile.size,
        fileType: getFileType(selectedFile.type),
        language: metadata.language,
        isbn: metadata.isbn,
        publisher: metadata.publisher,
        publishedDate: metadata.publishedDate,
        pageCount: metadata.pageCount,
        categories: metadata.categories,
        tags: metadata.tags
      };
      
      console.log('📤 Sending book data to API:', bookData);
      
      // Create book record in database
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`Failed to create book: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Book created successfully:', result);

      onUploadComplete();
      onClose();
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Failed to upload book. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const simulateFileUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve(`https://drive.google.com/file/d/${Math.random().toString(36).substring(7)}/view`);
        }
        setUploadProgress(progress);
      }, 200);
    });
  };

  const getFileType = (mimeType: string): 'epub' | 'pdf' | 'mobi' => {
    switch (mimeType) {
      case 'application/epub+zip':
        return 'epub';
      case 'application/pdf':
        return 'pdf';
      case 'application/x-mobipocket-ebook':
        return 'mobi';
      default:
        return 'epub';
    }
  };

  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case 'application/epub+zip':
        return <BookOpen className="h-8 w-8 text-blue-500" />;
      case 'application/pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'application/x-mobipocket-ebook':
        return <File className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book File *
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-3">
                  {getFileIcon(selectedFile.type)}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to select EPUB, PDF, or MOBI file
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum file size: 100MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".epub,.pdf,.mobi,application/epub+zip,application/pdf,application/x-mobipocket-ebook"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Book title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                value={metadata.author}
                onChange={(e) => setMetadata(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Author name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={metadata.description}
                onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Book description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={metadata.language}
                onChange={(e) => setMetadata(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                type="text"
                value={metadata.isbn}
                onChange={(e) => setMetadata(prev => ({ ...prev, isbn: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ISBN number"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || !metadata.title || !metadata.author}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Add Book'}
          </button>
        </div>
      </div>
    </div>
  );
} 