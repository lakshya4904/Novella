# Novella - Cross-Platform E-Book Reader

A modern, cross-platform e-book reading application that works on web, Windows, and Android. Built with React Native, Next.js, and Electron for maximum code sharing across platforms.

## 🚀 Features

- **Cross-Platform**: Web, Windows desktop, and Android mobile
- **Cloud Storage**: Google Drive integration for large e-book files
- **Database**: Supabase for metadata and user data
- **Offline Support**: Local caching for offline reading
- **Multiple Formats**: EPUB, PDF, and MOBI support
- **Reading Progress**: Sync reading progress across devices
- **Bookmarks & Highlights**: Annotate and highlight text
- **Customizable**: Font size, theme, and reading preferences
- **Search**: Full-text search within books
- **Library Management**: Organize and categorize your books

## 🏗️ Tech Stack

### Frontend
- **React Native + Expo**: Mobile and web development
- **Next.js**: Web application with SSR
- **Electron**: Desktop application
- **TypeScript**: Type safety across all platforms

### State Management & Data
- **Zustand**: Lightweight state management
- **React Query**: Server state management
- **Supabase**: Database and authentication
- **Google Drive API**: File storage

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variants

### E-Book Processing
- **Epub.js**: EPUB rendering and parsing
- **React Native PDF**: PDF support for mobile
- **Custom EPUB Reader**: Cross-platform e-book component

## 📁 Project Structure

```
novella/
├── apps/
│   ├── web/                 # Next.js web application
│   ├── mobile/              # React Native mobile app
│   └── desktop/             # Electron desktop app
├── packages/
│   ├── shared/              # Shared types and utilities
│   ├── epub-reader/         # E-book reading components
│   └── ui/                  # Design system components
└── tools/                   # Build and development tools
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/novella.git
   cd novella
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env files for each app
   cp apps/web/.env.example apps/web/.env.local
   cp apps/mobile/.env.example apps/mobile/.env
   cp apps/desktop/.env.example apps/desktop/.env
   ```

4. **Configure Supabase**
   - Create a Supabase project
   - Add your Supabase URL and anon key to environment files
   - Set up database tables (see database schema below)

5. **Configure Google Drive API**
   - Create a Google Cloud project
   - Enable Google Drive API
   - Add your Google API credentials to environment files

### Running the Applications

#### Web Application
```bash
npm run dev --workspace=@novella/web
# or
cd apps/web && npm run dev
```

#### Mobile Application
```bash
npm run start --workspace=@novella/mobile
# or
cd apps/mobile && npm start
```

#### Desktop Application
```bash
npm run dev --workspace=@novella/desktop
# or
cd apps/desktop && npm run dev
```

### Building for Production

```bash
# Build all applications
npm run build

# Build specific application
npm run build --workspace=@novella/web
npm run build --workspace=@novella/mobile
npm run build --workspace=@novella/desktop
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);
```

### Books Table
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('epub', 'pdf', 'mobi')),
  language TEXT NOT NULL,
  isbn TEXT,
  publisher TEXT,
  published_date DATE,
  page_count INTEGER,
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_read_at TIMESTAMP WITH TIME ZONE
);
```

### Reading Progress Table
```sql
CREATE TABLE reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_location TEXT NOT NULL,
  current_page INTEGER,
  total_pages INTEGER,
  percentage DECIMAL(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  time_spent INTEGER NOT NULL DEFAULT 0,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(book_id, user_id)
);
```

## 🔧 Configuration

### Environment Variables

#### Web Application (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Mobile Application (.env)
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Desktop Application (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📱 Platform-Specific Features

### Web
- Progressive Web App (PWA) support
- Service worker for offline functionality
- Responsive design for all screen sizes

### Mobile
- Native performance with React Native
- Offline book storage
- Touch-optimized reading interface
- Background sync

### Desktop
- Native desktop application
- File system integration
- Keyboard shortcuts
- Multi-window support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Epub.js](https://github.com/futurepress/epub.js/) for EPUB processing
- [Supabase](https://supabase.com/) for backend services
- [Expo](https://expo.dev/) for React Native development
- [Next.js](https://nextjs.org/) for web development
- [Electron](https://www.electronjs.org/) for desktop development

## 📞 Support

For support, email support@novella.app or join our Discord community.

---

Built with ❤️ for book lovers everywhere. 