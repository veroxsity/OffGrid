import { NextRequest, NextResponse } from 'next/server';
import { getAllGuides } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    // Get all guides
    const allGuides = await getAllGuides();
    
    let results = allGuides;
    
    // Filter by category if specified
    if (category) {
      results = results.filter(guide => 
        guide.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search query if specified
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.filter(guide => {
        const searchableText = [
          guide.title,
          guide.description,
          guide.category,
          ...guide.tags,
        ].join(' ').toLowerCase();
        
        return searchableText.includes(queryLower);
      });
    }
    
    // Sort results by relevance (simple scoring)
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.sort((a, b) => {
        // Higher score = better match
        let scoreA = 0;
        let scoreB = 0;
        
        // Title matches are most important
        if (a.title.toLowerCase().includes(queryLower)) scoreA += 10;
        if (b.title.toLowerCase().includes(queryLower)) scoreB += 10;
        
        // Description matches
        if (a.description.toLowerCase().includes(queryLower)) scoreA += 5;
        if (b.description.toLowerCase().includes(queryLower)) scoreB += 5;
        
        // Tag matches
        const aTagMatches = a.tags.filter(tag => tag.toLowerCase().includes(queryLower)).length;
        const bTagMatches = b.tags.filter(tag => tag.toLowerCase().includes(queryLower)).length;
        scoreA += aTagMatches * 3;
        scoreB += bTagMatches * 3;
        
        return scoreB - scoreA;
      });
    }
    
    return NextResponse.json({
      success: true,
      results: results.map(guide => ({
        title: guide.title,
        description: guide.description,
        category: guide.category,
        difficulty: guide.difficulty,
        time: guide.time,
        slug: guide.slug,
        ukSpecific: guide.ukSpecific,
        tags: guide.tags,
      })),
      total: results.length,
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        results: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
