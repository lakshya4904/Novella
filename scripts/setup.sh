#!/bin/bash

# Novella E-Book Reader Setup Script
echo "🚀 Setting up Novella E-Book Reader..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment files
echo "🔧 Creating environment files..."

# Web app
if [ ! -f "apps/web/.env.local" ]; then
    cat > apps/web/.env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Drive API
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "✅ Created apps/web/.env.local"
fi

# Mobile app
if [ ! -f "apps/mobile/.env" ]; then
    cat > apps/mobile/.env << EOF
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Drive API
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# App Configuration
EXPO_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "✅ Created apps/mobile/.env"
fi

# Desktop app
if [ ! -f "apps/desktop/.env" ]; then
    cat > apps/desktop/.env << EOF
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Drive API
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# App Configuration
APP_URL=http://localhost:3000
EOF
    echo "✅ Created apps/desktop/.env"
fi

# Build shared packages
echo "🔨 Building shared packages..."
npm run build --workspace=@novella/shared
npm run build --workspace=@novella/ui
npm run build --workspace=@novella/epub-reader

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your Supabase project and add credentials to .env files"
echo "2. Set up Google Drive API and add credentials to .env files"
echo "3. Run the development servers:"
echo "   - Web: npm run dev --workspace=@novella/web"
echo "   - Mobile: npm run start --workspace=@novella/mobile"
echo "   - Desktop: npm run dev --workspace=@novella/desktop"
echo ""
echo "📚 Check the README.md for detailed setup instructions." 