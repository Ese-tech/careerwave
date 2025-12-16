// backend/src/controllers/arbeitsagentur.skills.controller.ts
import { Elysia, t } from 'elysia';
import { arbeitsagenturService } from '../services/arbeitsagentur.service';

export const arbeitsagenturSkillsController = new Elysia({ prefix: '/arbeitsagentur' })
  .get('/skills', async ({ query, set }) => {
    try {
      // Optional: beruf oder skill als Query
      const params = new URLSearchParams();
      if (query.beruf) params.set('beruf', query.beruf);
      // ... weitere Filter nach Bedarf
      const url = `${arbeitsagenturService.baseUrl}/pc/v4/skills?${params.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': arbeitsagenturService.apiKey,
          'Accept': 'application/json',
          'User-Agent': 'CareerWave/1.0.0'
        }
      });
      if (!response.ok) throw new Error('Fehler beim Abrufen der Skills');
      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      set.status = 500;
      return { success: false, error: error.message };
    }
  }, {
    query: t.Object({ beruf: t.Optional(t.String()) }),
    detail: { summary: 'Skills/ESKO für Jobbeschreibung', tags: ['arbeitsagentur'] }
  });
