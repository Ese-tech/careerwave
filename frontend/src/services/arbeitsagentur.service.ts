// frontend/src/services/arbeitsagentur.service.ts
import { config } from '../config/env';

interface ArbeitsagenturJobSearchParams {
  was?: string; // job title/keyword
  wo?: string; // location
  page?: number;
  size?: number;
  zeitarbeit?: boolean;
  befristung?: string;
}

interface ArbeitsagenturJob {
  hashId: string;
  titel: string;
  arbeitgeber?: string;
  arbeitsorte?: Array<{
    ort?: string;
    plz?: string;
    region?: string;
  }>;
  modifikationsTimestamp?: string;
  stellenbeschreibung?: string;
  verguetung?: string;
  befristung?: string;
  arbeitszeitmodelle?: string[];
  eintrittsdatum?: string;
  branche?: string;
}

interface ArbeitsagenturApiResponse {
  stellenangebote?: ArbeitsagenturJob[];
  maxErgebnisse?: string;
  page?: string;
  size?: string;
  facetten?: any[];
}

class ArbeitsagenturService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl; // Uses our backend API
  }

  async searchJobs(params: ArbeitsagenturJobSearchParams): Promise<ArbeitsagenturApiResponse> {
    try {
      const searchParams = new URLSearchParams();
      if (params.was) searchParams.set('was', params.was);
      if (params.wo) searchParams.set('wo', params.wo);
      if (params.page !== undefined) searchParams.set('page', params.page.toString());
      if (params.size !== undefined) searchParams.set('size', params.size.toString());
      if (params.zeitarbeit !== undefined) searchParams.set('zeitarbeit', params.zeitarbeit.toString());
      if (params.befristung) searchParams.set('befristung', params.befristung);

      const url = `${this.baseUrl}/arbeitsagentur/jobs?${searchParams.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch jobs');
      }

      // Mappe Backend-Response auf das erwartete Feld
      return { stellenangebote: result.jobs || [] } as ArbeitsagenturApiResponse;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async getJobDetails(hashId: string): Promise<ArbeitsagenturJob | null> {
    try {
      const url = `${this.baseUrl}/arbeitsagentur/jobs/${hashId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404 || response.status === 403) {
          // Job nicht gefunden oder nicht verfügbar
          return null;
        }
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        // Backend gibt success: false bei 404/403
        if (result.error && (result.error.includes('nicht gefunden') || result.error.includes('nicht verfügbar'))) {
          return null;
        }
        throw new Error(result.error || 'Failed to fetch job details');
      }
      return result.data as ArbeitsagenturJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  }
}

export const arbeitsagenturService = new ArbeitsagenturService();
export type { ArbeitsagenturJob, ArbeitsagenturJobSearchParams, ArbeitsagenturApiResponse };