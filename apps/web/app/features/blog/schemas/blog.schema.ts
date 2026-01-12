import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
