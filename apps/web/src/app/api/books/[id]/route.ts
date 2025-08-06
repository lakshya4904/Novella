import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/books/[id] - Get a specific book
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // If Supabase is not configured, return sample book
    if (!supabase) {
      const sampleBook = {
        id: params.id,
        user_id: 'demo-user',
        title: 'Sample Book',
        author: 'Sample Author',
        file_url: 'https://drive.google.com/file/d/sample/view',
        file_type: 'epub',
        file_size: 1024000,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };
      return NextResponse.json({ book: sampleBook });
    }

    const { data: book, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
      console.error('Error fetching book:', error);
      return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    console.error('Error in GET /api/books/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/books/[id] - Update a book
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      title, 
      author, 
      description,
      coverUrl,
      isbn,
      publisher,
      publishedDate,
      pageCount,
      categories,
      tags
    } = body;

    // If Supabase is not configured, simulate success
    if (!supabase) {
      const updatedBook = {
        id: params.id,
        user_id: 'demo-user',
        title: title || 'Sample Book',
        author: author || 'Sample Author',
        description,
        cover_url: coverUrl,
        file_url: 'https://drive.google.com/file/d/sample/view',
        file_type: 'epub',
        file_size: 1024000,
        isbn,
        publisher,
        published_date: publishedDate,
        page_count: pageCount,
        categories: categories || [],
        tags: tags || [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString()
      };
      return NextResponse.json({ book: updatedBook });
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (title !== undefined) updateData.title = title;
    if (author !== undefined) updateData.author = author;
    if (description !== undefined) updateData.description = description;
    if (coverUrl !== undefined) updateData.cover_url = coverUrl;
    if (isbn !== undefined) updateData.isbn = isbn;
    if (publisher !== undefined) updateData.publisher = publisher;
    if (publishedDate !== undefined) updateData.published_date = publishedDate;
    if (pageCount !== undefined) updateData.page_count = pageCount;
    if (categories !== undefined) updateData.categories = categories;
    if (tags !== undefined) updateData.tags = tags;

    const { data: book, error } = await supabase
      .from('books')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    console.error('Error in PUT /api/books/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/books/[id] - Delete a book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // If Supabase is not configured, simulate success
    if (!supabase) {
      return NextResponse.json({ message: 'Book deleted successfully' });
    }

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting book:', error);
      return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/books/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 