// backend/src/schemas/job.schema.ts
import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  description: z.string().min(50, 'Job description must be at least 50 characters'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']),
  level: z.enum(['entry', 'junior', 'mid', 'senior', 'lead', 'executive']),
  category: z.string().min(2, 'Category is required'),
  salary: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
    currency: z.string().default('EUR'),
  }).optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  remote: z.boolean().default(false),
  skills: z.array(z.string()).default([]),
  deadline: z.string().optional(),
});

export const updateJobSchema = createJobSchema.partial();

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']).optional(),
  level: z.enum(['entry', 'junior', 'mid', 'senior', 'lead', 'executive']).optional(),
  category: z.string().optional(),
  remote: z.boolean().optional(),
  page: z.string().transform(Number).default(1),
  limit: z.string().transform(Number).default(20),
});

export const applicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobFilterInput = z.infer<typeof jobFilterSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;