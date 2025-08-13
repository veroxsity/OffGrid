import { z } from 'zod';

export const guideSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(10).max(500),
  category: z.string().min(2).max(60),
  difficulty: z.enum(['Beginner','Intermediate','Advanced']),
  time: z.string().min(1).max(40),
  tags: z.array(z.string().min(1).max(30)).max(25),
  ukSpecific: z.boolean().default(false),
  testedOn: z.array(z.string().min(1).max(60)).max(20).default([]),
  content: z.string().min(20),
  status: z.enum(['draft','published']).optional().default('published')
});

export type GuideInput = z.infer<typeof guideSchema>;
