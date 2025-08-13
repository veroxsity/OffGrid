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
      if (guide.category && currentGuide.category && guide.category === currentGuide.category) {
        score += 10;
      }

      // Same difficulty gets moderate score
      if (guide.difficulty && currentGuide.difficulty && guide.difficulty === currentGuide.difficulty) {
        score += 5;
      }

      // UK specific matching
      const guideUk = typeof guide.ukSpecific === 'boolean' ? guide.ukSpecific : false;
      const currentUk = typeof currentGuide.ukSpecific === 'boolean' ? currentGuide.ukSpecific : false;
      if (guideUk === currentUk) {
        score += 3;
      }

      // Tag matching (defensive)
      const guideTags = Array.isArray(guide.tags) ? guide.tags : [];
      const currentTags = Array.isArray(currentGuide.tags) ? currentGuide.tags : [];
      const commonTags = guideTags.filter(tag =>
        currentTags.some(currentTag => (currentTag || '').toLowerCase() === (tag || '').toLowerCase())
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
    totalTags: [...new Set(guides.flatMap(g => Array.isArray(g.tags) ? g.tags : []))].length,
  };
}
