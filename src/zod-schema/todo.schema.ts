import { z } from 'zod';

const ISO8601Date = z.string().datetime();

const title = z.string().min(1).max(100);
const description = z.string().max(500).optional();
const completed = z.boolean();
const tags = z.array(z.string());

export const params = z.object({
  id: z.string().min(1),
});

export const query = z.object({
  search: z.string().optional(),
  completed: z.preprocess(val => val === 'true', z.boolean()).optional(),
  tags: z
    .preprocess(val => (typeof val === 'string' ? val.split(',') : []), z.array(z.string()))
    .optional(),
  startDate: ISO8601Date.optional(),
  endDate: ISO8601Date.optional(),
  sortBy: z.enum(['createdAt', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.preprocess(val => Number(val), z.number().min(1).default(1)),
  limit: z.preprocess(val => Number(val), z.number().min(10).max(50).default(10)),
});

export const create = z.object({
  title,
  description: description.optional(),
  tags: tags.default([]),
});

export const update = z.object({
  title: title.optional(),
  description: description.optional(),
  completed: completed.optional(),
  tags: tags.default([]),
});
