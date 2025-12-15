import { t } from 'elysia';

export const CreateApplicationSchema = t.Object({
  jobId: t.String(),
  name: t.String(),
  email: t.String(),
  telefon: t.Optional(t.String()),
  nachricht: t.String(),
  // Optionally: fileUrl: t.Optional(t.String())
});

export const ApplicationResponseSchema = t.Object({
  id: t.String(),
  jobId: t.String(),
  name: t.String(),
  email: t.String(),
  telefon: t.Optional(t.String()),
  nachricht: t.String(),
  createdAt: t.Date(),
});
