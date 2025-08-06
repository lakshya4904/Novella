'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Settings, BookOpen, Bookmark, Share, X } from 'lucide-react';

interface BookReaderProps {
  book: {
    id: string;
    title: string;
    author: string;
    fileUrl: string;
    fileType: 'epub' | 'pdf' | 'mobi';
  };
  onClose: () => void;
}

interface ReadingSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  margin: number;
  theme: 'light' | 'dark' | 'sepia';
}

export default function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    fontFamily: 'Georgia, serif',
    lineHeight: 1.6,
    margin: 20,
    theme: 'light'
  });
  
  const readerRef = useRef<HTMLDivElement>(null);
  const [epubInstance, setEpubInstance] = useState<any>(null);

  useEffect(() => {
    loadBook();
  }, [book]);

  const loadBook = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you would load the EPUB using epub.js
      // For now, we'll simulate the loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate EPUB loading
      setTotalPages(250);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading book:', error);
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        handlePreviousPage();
        break;
      case 'ArrowRight':
        handleNextPage();
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  const getThemeStyles = () => {
    switch (settings.theme) {
      case 'dark':
        return {
          backgroundColor: '#1a1a1a',
          color: '#e5e5e5'
        };
      case 'sepia':
        return {
          backgroundColor: '#f4ecd8',
          color: '#5c4b37'
        };
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#1a1a1a'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {book.title}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{book.title}</h1>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Share className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{settings.fontSize}px</span>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => setSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="w-full text-xs border border-gray-300 rounded px-2 py-1"
              >
                <option value="Georgia, serif">Serif</option>
                <option value="Arial, sans-serif">Sans-serif</option>
                <option value="Courier New, monospace">Monospace</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Line Height</label>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => setSettings(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{settings.lineHeight}</span>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Margin</label>
              <input
                type="range"
                min="10"
                max="50"
                value={settings.margin}
                onChange={(e) => setSettings(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{settings.margin}px</span>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                className="w-full text-xs border border-gray-300 rounded px-2 py-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="sepia">Sepia</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div className="flex-1 flex">
        {/* Navigation */}
        <div className="flex items-center justify-center w-16 bg-gray-50">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* Book Content */}
        <div 
          ref={readerRef}
          className="flex-1 overflow-auto p-8"
          style={{
            ...getThemeStyles(),
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
            padding: `${settings.margin}px`
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Simulated book content */}
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold mb-6">Chapter {Math.ceil(currentPage / 10)}</h1>
              
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <p className="mb-4">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
              
              <p className="mb-4">
                Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center w-16 bg-gray-50">
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {Math.round((currentPage / totalPages) * 100)}% complete
          </span>
        </div>
      </div>
    </div>
  );
} 