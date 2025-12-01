// backend/src/schemas/admin.schema.ts
import { z } from 'zod';

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(['candidate', 'employer', 'admin']),
});

export const verifyEmployerSchema = z.object({
  employerId: z.string(),
  verified: z.boolean(),
  notes: z.string().optional(),
});

export const adminStatsSchema = z.object({
  period: z.enum(['week', 'month', 'year']).default('month'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const moderateContentSchema = z.object({
  contentId: z.string(),
  contentType: z.enum(['job', 'application', 'user', 'employer']),
  action: z.enum(['approve', 'reject', 'flag']),
  reason: z.string().optional(),
});

export const systemConfigSchema = z.object({
  key: z.string(),
  value: z.any(),
  type: z.enum(['string', 'number', 'boolean', 'json']),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type VerifyEmployerInput = z.infer<typeof verifyEmployerSchema>;
export type AdminStatsInput = z.infer<typeof adminStatsSchema>;
export type ModerateContentInput = z.infer<typeof moderateContentSchema>;
export type SystemConfigInput = z.infer<typeof systemConfigSchema>;