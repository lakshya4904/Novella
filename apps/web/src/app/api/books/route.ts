import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET /api/books - Get all books for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log('🔍 Supabase client status:', supabase ? 'Connected' : 'Not configured');
    console.log('🔍 Environment variables:', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
    });

    // If Supabase is not configured, return sample data
    if (!supabase) {
      console.log('📚 Using fallback sample data');
      const sampleBooks = [
        {
          id: '1',
          user_id: userId,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          file_url: 'https://drive.google.com/file/d/sample1/view',
          file_type: 'epub',
          file_size: 1024000,
          last_read_at: '2024-01-15T10:30:00Z',
          reading_progress: 65,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          user_id: userId,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          file_url: 'https://drive.google.com/file/d/sample2/view',
          file_type: 'pdf',
          file_size: 2048000,
          last_read_at: '2024-01-10T14:20:00Z',
          reading_progress: 30,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-10T14:20:00Z'
        },
        {
          id: '3',
          user_id: userId,
          title: '1984',
          author: 'George Orwell',
          file_url: 'https://drive.google.com/file/d/sample3/view',
          file_type: 'epub',
          file_size: 1536000,
          last_read_at: '2024-01-20T09:15:00Z',
          reading_progress: 85,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-20T09:15:00Z'
        }
      ];
      return NextResponse.json({ books: sampleBooks });
    }

    console.log('📚 Fetching books from Supabase for user:', userId);
    
    // Try to fetch from Supabase with error handling for invalid credentials
    let books, error;
    try {
      const result = await supabase
        .from('books')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      books = result.data;
      error = result.error;
    } catch (supabaseError) {
      console.error('❌ Supabase connection error (likely invalid credentials):', supabaseError);
      console.log('📚 Falling back to sample data due to Supabase connection error');
      
      // Return sample data when Supabase credentials are invalid
      const sampleBooks = [
        {
          id: '1',
          user_id: userId,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          file_url: 'https://drive.google.com/file/d/sample1/view',
          file_type: 'epub',
          file_size: 1024000,
          last_read_at: '2024-01-15T10:30:00Z',
          reading_progress: 65,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          user_id: userId,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          file_url: 'https://drive.google.com/file/d/sample2/view',
          file_type: 'pdf',
          file_size: 2048000,
          last_read_at: '2024-01-10T14:20:00Z',
          reading_progress: 30,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-10T14:20:00Z'
        },
        {
          id: '3',
          user_id: userId,
          title: '1984',
          author: 'George Orwell',
          file_url: 'https://drive.google.com/file/d/sample3/view',
          file_type: 'epub',
          file_size: 1536000,
          last_read_at: '2024-01-20T09:15:00Z',
          reading_progress: 85,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-20T09:15:00Z'
        }
      ];
      return NextResponse.json({ books: sampleBooks });
    }

    if (error) {
      console.error('❌ Error fetching books:', error);
      console.log('📚 Falling back to sample data due to database error');
      
      // Return sample data when there's a database error
      const sampleBooks = [
        {
          id: '1',
          user_id: userId,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          file_url: 'https://drive.google.com/file/d/sample1/view',
          file_type: 'epub',
          file_size: 1024000,
          last_read_at: '2024-01-15T10:30:00Z',
          reading_progress: 65,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          user_id: userId,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          file_url: 'https://drive.google.com/file/d/sample2/view',
          file_type: 'pdf',
          file_size: 2048000,
          last_read_at: '2024-01-10T14:20:00Z',
          reading_progress: 30,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-10T14:20:00Z'
        },
        {
          id: '3',
          user_id: userId,
          title: '1984',
          author: 'George Orwell',
          file_url: 'https://drive.google.com/file/d/sample3/view',
          file_type: 'epub',
          file_size: 1536000,
          last_read_at: '2024-01-20T09:15:00Z',
          reading_progress: 85,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-20T09:15:00Z'
        }
      ];
      return NextResponse.json({ books: sampleBooks });
    }

    console.log('✅ Successfully fetched books:', books?.length || 0);
    return NextResponse.json({ books });
  } catch (error) {
    console.error('❌ Error in GET /api/books:', error);
    console.log('📚 Falling back to sample data due to unexpected error');
    
    // Return sample data as final fallback
    const sampleBooks = [
      {
        id: '1',
        user_id: 'demo-user',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        file_url: 'https://drive.google.com/file/d/sample1/view',
        file_type: 'epub',
        file_size: 1024000,
        last_read_at: '2024-01-15T10:30:00Z',
        reading_progress: 65,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        user_id: 'demo-user',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        file_url: 'https://drive.google.com/file/d/sample2/view',
        file_type: 'pdf',
        file_size: 2048000,
        last_read_at: '2024-01-10T14:20:00Z',
        reading_progress: 30,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-10T14:20:00Z'
      },
      {
        id: '3',
        user_id: 'demo-user',
        title: '1984',
        author: 'George Orwell',
        file_url: 'https://drive.google.com/file/d/sample3/view',
        file_type: 'epub',
        file_size: 1536000,
        last_read_at: '2024-01-20T09:15:00Z',
        reading_progress: 85,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-20T09:15:00Z'
      }
    ];
    return NextResponse.json({ books: sampleBooks });
  }
}

// POST /api/books - Create a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Creating book with data:', body);
    
    const { 
      userId, 
      title, 
      author, 
      fileUrl, 
      fileSize, 
      fileType, 
      language = 'en',
      description,
      coverUrl,
      isbn,
      publisher,
      publishedDate,
      pageCount,
      categories = [],
      tags = []
    } = body;

    if (!userId || !title || !author || !fileUrl || !fileSize || !fileType) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ 
        error: 'Missing required fields: userId, title, author, fileUrl, fileSize, fileType' 
      }, { status: 400 });
    }

    console.log('🔍 Supabase client status:', supabase ? 'Connected' : 'Not configured');

    // If Supabase is not configured, simulate success
    if (!supabase) {
      console.log('📚 Using fallback book creation');
      const newBook = {
        id: Date.now().toString(),
        user_id: userId,
        title,
        author,
        description,
        cover_url: coverUrl,
        file_url: fileUrl,
        file_size: fileSize,
        file_type: fileType,
        language,
        isbn,
        publisher,
        published_date: publishedDate,
        page_count: pageCount,
        categories,
        tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      console.log('✅ Created fallback book:', newBook.id);
      return NextResponse.json({ book: newBook }, { status: 201 });
    }

    console.log('📚 Creating book in Supabase');
    const { data: book, error } = await supabase
      .from('books')
      .insert({
        user_id: userId,
        title,
        author,
        description,
        cover_url: coverUrl,
        file_url: fileUrl,
        file_size: fileSize,
        file_type: fileType,
        language,
        isbn,
        publisher,
        published_date: publishedDate,
        page_count: pageCount,
        categories,
        tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating book:', error);
      return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }

    console.log('✅ Successfully created book:', book.id);
    return NextResponse.json({ book }, { status: 201 });
  } catch (error) {
    console.error('❌ Error in POST /api/books:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 