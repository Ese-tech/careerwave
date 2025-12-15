// backend/src/controllers/arbeitsagentur.controller.ts
import { Elysia, t } from 'elysia';
import { arbeitsagenturService, type ArbeitsagenturJobSearchParams } from '../services/arbeitsagentur.service';

export const arbeitsagenturController = new Elysia({ prefix: '/arbeitsagentur' })
  .get('/jobs', async ({ query, set }) => {
    try {
      const searchParams: ArbeitsagenturJobSearchParams = {
        was: query.was as string,
        wo: query.wo as string,
        page: query.page ? parseInt(query.page as string) : undefined,
        size: query.size ? parseInt(query.size as string) : undefined,
        zeitarbeit: query.zeitarbeit === 'true',
        befristung: query.befristung as string
      };

      // Remove undefined values
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key as keyof ArbeitsagenturJobSearchParams] === undefined) {
          delete searchParams[key as keyof ArbeitsagenturJobSearchParams];
        }
      });

      const result = await arbeitsagenturService.searchJobs(searchParams);
      
      return {
        success: true,
        data: result,
        message: 'Jobs erfolgreich abgerufen'
      };
    } catch (error: any) {
      console.error('Error in arbeitsagentur jobs endpoint:', error);
      set.status = 500;
      return {
        success: false,
        error: error.message || 'Fehler beim Abrufen der Jobs',
        data: null
      };
    }
  }, {
    query: t.Object({
      was: t.Optional(t.String({ description: 'Suchbegriff für Job-Titel' })),
      wo: t.Optional(t.String({ description: 'Arbeitsort' })),
      page: t.Optional(t.String({ description: 'Seitenzahl (Standard: 0)' })),
      size: t.Optional(t.String({ description: 'Anzahl Ergebnisse pro Seite (Standard: 25)' })),
      zeitarbeit: t.Optional(t.String({ description: 'Zeitarbeit einschließen (true/false)' })),
      befristung: t.Optional(t.String({ description: 'Befristung (UNBEFRISTET, BEFRISTET)' }))
    }),
    detail: {
      summary: 'Jobsuche über Arbeitsagentur API',
      description: 'Durchsucht die Arbeitsagentur Jobdatenbank nach verfügbaren Stellen',
      tags: ['arbeitsagentur']
    }
  })
  .get('/jobs/:hashId', async ({ params, set }) => {
    try {
      const { hashId } = params;
      const jobDetails = await arbeitsagenturService.getJobDetails(hashId);
      
      if (!jobDetails) {
        set.status = 404;
        return {
          success: false,
          error: 'Job nicht gefunden',
          data: null
        };
      }

      return {
        success: true,
        data: jobDetails,
        message: 'Job-Details erfolgreich abgerufen'
      };
    } catch (error: any) {
      console.error('Error in arbeitsagentur job details endpoint:', error);
      set.status = 500;
      return {
        success: false,
        error: error.message || 'Fehler beim Abrufen der Job-Details',
        data: null
      };
    }
  }, {
    params: t.Object({
      hashId: t.String({ description: 'Eindeutige Job-ID von der Arbeitsagentur' })
    }),
    detail: {
      summary: 'Job-Details von Arbeitsagentur abrufen',
      description: 'Ruft detaillierte Informationen zu einem spezifischen Job ab',
      tags: ['arbeitsagentur']
    }
  });