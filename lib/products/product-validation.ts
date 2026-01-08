import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters' })
    .max(140, { message: 'Slug must be less than 140 characters' }),
  tagline: z
    .string()
    .min(1, { message: 'Tagline is required' })
    .max(200, { message: 'Tagline must be less than 200 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .optional(),
  websiteUrl: z
    .string()
    .min(1, { message: 'Website URL is required' })
    .min(10, { message: 'Website URL must be at least 10 characters' })
    .max(2000, { message: 'Website URL must be less than 2000 characters' }),
  tags: z
    .string()
    .min(1, { message: 'Tags are required' })
    .transform((val) => val.split(',').map((tag) => tag.trim().toLowerCase())),
});
