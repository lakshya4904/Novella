// Local storage utilities
export const localStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Session storage utilities
export const sessionStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  },

  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },
};

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

// Reading progress storage
export const readingProgressStorage = {
  saveProgress: (bookId: string, progress: any): void => {
    const key = `${STORAGE_KEYS.READING_PROGRESS}_${bookId}`;
    localStorage.set(key, progress);
  },

  getProgress: (bookId: string): any => {
    const key = `${STORAGE_KEYS.READING_PROGRESS}_${bookId}`;
    return localStorage.get(key);
  },

  removeProgress: (bookId: string): void => {
    const key = `${STORAGE_KEYS.READING_PROGRESS}_${bookId}`;
    localStorage.remove(key);
  },
};

// User preferences storage
export const userPreferencesStorage = {
  savePreferences: (preferences: any): void => {
    localStorage.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
  },

  getPreferences: (): any => {
    return localStorage.get(STORAGE_KEYS.USER_PREFERENCES);
  },

  updatePreference: (key: string, value: any): void => {
    const preferences = userPreferencesStorage.getPreferences() || {};
    preferences[key] = value;
    userPreferencesStorage.savePreferences(preferences);
  },
};

// Offline storage for books
export const offlineStorage = {
  saveBook: (bookId: string, bookData: any): void => {
    const key = `${STORAGE_KEYS.OFFLINE_BOOKS}_${bookId}`;
    localStorage.set(key, bookData);
  },

  getBook: (bookId: string): any => {
    const key = `${STORAGE_KEYS.OFFLINE_BOOKS}_${bookId}`;
    return localStorage.get(key);
  },

  removeBook: (bookId: string): void => {
    const key = `${STORAGE_KEYS.OFFLINE_BOOKS}_${bookId}`;
    localStorage.remove(key);
  },

  getAllOfflineBooks: (): string[] => {
    const books: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(`${STORAGE_KEYS.OFFLINE_BOOKS}_`)) {
        const bookId = key.replace(`${STORAGE_KEYS.OFFLINE_BOOKS}_`, '');
        books.push(bookId);
      }
    }
    return books;
  },
}; 