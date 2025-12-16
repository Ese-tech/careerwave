// backend/src/controllers/arbeitsagentur.logo.controller.ts
import { Elysia, t } from 'elysia';
import { arbeitsagenturService } from '../services/arbeitsagentur.service';

export const arbeitsagenturLogoController = new Elysia({ prefix: '/arbeitsagentur' })
  .get('/arbeitgeberlogo/:hashId', async ({ params, set }) => {
    try {
      const { hashId } = params;
      const url = `${arbeitsagenturService.baseUrl}/ed/v1/arbeitgeberlogo/${hashId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': arbeitsagenturService.apiKey,
          'Accept': 'image/png',
          'User-Agent': 'CareerWave/1.0.0'
        }
      });
      if (!response.ok) throw new Error('Logo nicht gefunden');
      const buffer = await response.arrayBuffer();
      set.headers['Content-Type'] = 'image/png';
      return new Uint8Array(buffer);
    } catch (error: any) {
      set.status = 404;
      return { success: false, error: error.message };
    }
  }, {
    params: t.Object({ hashId: t.String() }),
    detail: { summary: 'Arbeitgeber-Logo von Arbeitsagentur', tags: ['arbeitsagentur'] }
  });
