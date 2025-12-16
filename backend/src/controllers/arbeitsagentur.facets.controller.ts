// backend/src/controllers/arbeitsagentur.facets.controller.ts
import { Elysia, t } from 'elysia';
import { arbeitsagenturService } from '../services/arbeitsagentur.service';

export const arbeitsagenturFacetsController = new Elysia({ prefix: '/arbeitsagentur' })
  .get('/jobs/facetten', async ({ query, set }) => {
    try {
      // Optional: Filter-Parameter an die API weitergeben
      const params = new URLSearchParams();
      if (query.was) params.set('was', query.was);
      if (query.wo) params.set('wo', query.wo);
      // ... weitere Filter nach Bedarf

      const url = `${arbeitsagenturService.baseUrl}/pc/v4/jobs/facetten?${params.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': arbeitsagenturService.apiKey,
          'Accept': 'application/json',
          'User-Agent': 'CareerWave/1.0.0'
        }
      });
      if (!response.ok) throw new Error('Fehler beim Abrufen der Facetten');
      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      set.status = 500;
      return { success: false, error: error.message };
    }
  }, {
    query: t.Object({
      was: t.Optional(t.String()),
      wo: t.Optional(t.String())
    }),
    detail: { summary: 'Filter-Facetten für Jobsuche', tags: ['arbeitsagentur'] }
  });
