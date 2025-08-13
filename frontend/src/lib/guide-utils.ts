import { getAllGuides, GuideMetadata } from '@/lib/mdx';

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function findRelatedGuides(currentGuide: GuideMetadata, allGuides: GuideMetadata[], limit: number = 3): GuideMetadata[] {
  const related = allGuides
    .filter(guide => guide.slug !== currentGuide.slug)
    .map(guide => {
      let score = 0;
      
      // Same category gets highest score
      if (guide.category === currentGuide.category) {
        score += 10;
      }
      
      // Same difficulty gets moderate score
      if (guide.difficulty === currentGuide.difficulty) {
        score += 5;
      }
      
      // UK specific matching
      if (guide.ukSpecific === currentGuide.ukSpecific) {
        score += 3;
      }
      
      // Tag matching
      const commonTags = guide.tags.filter(tag => 
        currentGuide.tags.some(currentTag => 
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      );
      score += commonTags.length * 2;
      
      return { guide, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.guide);
    
  return related;
}

export function getGuideStats(guides: GuideMetadata[]) {
  return {
    totalGuides: guides.length,
    categories: [...new Set(guides.map(g => g.category))].length,
    difficulties: {
      Beginner: guides.filter(g => g.difficulty === 'Beginner').length,
      Intermediate: guides.filter(g => g.difficulty === 'Intermediate').length,
      Advanced: guides.filter(g => g.difficulty === 'Advanced').length,
    },
    ukSpecific: guides.filter(g => g.ukSpecific).length,
    totalTags: [...new Set(guides.flatMap(g => g.tags))].length,
  };
}
