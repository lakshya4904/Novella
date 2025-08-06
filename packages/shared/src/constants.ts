// File types
export const SUPPORTED_FILE_TYPES = {
  EPUB: 'application/epub+zip',
  PDF: 'application/pdf',
  MOBI: 'application/x-mobipocket-ebook',
} as const;

export const FILE_EXTENSIONS = {
  EPUB: '.epub',
  PDF: '.pdf',
  MOBI: '.mobi',
} as const;

// Reading themes
export const READING_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SEPIA: 'sepia',
} as const;

// Font families
export const FONT_FAMILIES = {
  SERIF: 'Georgia, serif',
  SANS_SERIF: 'Arial, sans-serif',
  MONOSPACE: 'Courier New, monospace',
  OPEN_DYSLEXIC: 'OpenDyslexic, sans-serif',
} as const;

// Reading modes
export const READING_MODES = {
  SCROLL: 'scroll',
  PAGINATION: 'pagination',
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  FONT_SIZE: 16,
  LINE_HEIGHT: 1.6,
  MARGIN: 20,
  THEME: READING_THEMES.LIGHT,
  FONT_FAMILY: FONT_FAMILIES.SERIF,
  READING_MODE: READING_MODES.SCROLL,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  BOOKS: '/api/books',
  USERS: '/api/users',
  READING_PROGRESS: '/api/reading-progress',
  BOOKMARKS: '/api/bookmarks',
  HIGHLIGHTS: '/api/highlights',
  NOTES: '/api/notes',
  UPLOAD: '/api/upload',
  GOOGLE_DRIVE: '/api/google-drive',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'novella_user_preferences',
  READING_PROGRESS: 'novella_reading_progress',
  BOOKMARKS: 'novella_bookmarks',
  HIGHLIGHTS: 'novella_highlights',
  NOTES: 'novella_notes',
  THEME: 'novella_theme',
  FONT_SETTINGS: 'novella_font_settings',
  RECENT_BOOKS: 'novella_recent_books',
  OFFLINE_BOOKS: 'novella_offline_books',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size must be less than 100MB',
  UNSUPPORTED_FILE_TYPE: 'Only EPUB, PDF, and MOBI files are supported',
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please log in again.',
  BOOK_NOT_FOUND: 'Book not found.',
  INVALID_PROGRESS: 'Invalid reading progress data.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  BOOK_UPLOADED: 'Book uploaded successfully!',
  PROGRESS_SAVED: 'Reading progress saved.',
  BOOKMARK_ADDED: 'Bookmark added successfully.',
  HIGHLIGHT_SAVED: 'Highlight saved successfully.',
  NOTE_SAVED: 'Note saved successfully.',
  SETTINGS_UPDATED: 'Settings updated successfully.',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// File size limits
export const FILE_LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_COVER_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// Reading progress intervals (in seconds)
export const PROGRESS_INTERVALS = {
  AUTO_SAVE: 30, // Save progress every 30 seconds
  SYNC_INTERVAL: 60, // Sync with server every 60 seconds
} as const;

// Cache settings
export const CACHE_SETTINGS = {
  BOOK_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  METADATA_CACHE_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const; 