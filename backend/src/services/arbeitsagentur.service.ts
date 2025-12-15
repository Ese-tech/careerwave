// backend/src/services/arbeitsagentur.service.ts
import { Elysia } from 'elysia';

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
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.BA_API_URL || 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service';
    this.apiKey = process.env.BA_API_KEY || 'jobboerse-jobsuche';
  }

  async searchJobs(params: ArbeitsagenturJobSearchParams): Promise<ArbeitsagenturApiResponse> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params.was) searchParams.set('was', params.was);
      if (params.wo) searchParams.set('wo', params.wo);
      if (params.page) searchParams.set('page', params.page.toString());
      if (params.size) searchParams.set('size', params.size.toString());
      if (params.zeitarbeit !== undefined) searchParams.set('zeitarbeit', params.zeitarbeit.toString());
      if (params.befristung) searchParams.set('befristung', params.befristung);

      const url = `${this.baseUrl}/pc/v4/jobs?${searchParams.toString()}`;
      
      console.log(`Fetching jobs from: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': this.apiKey,
          'Accept': 'application/json',
          'User-Agent': 'CareerWave/1.0.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Arbeitsagentur API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as ArbeitsagenturApiResponse;
    } catch (error) {
      console.error('Error fetching jobs from Arbeitsagentur:', error);
      throw error;
    }
  }

  async getJobDetails(hashId: string): Promise<ArbeitsagenturJob | null> {
    try {
      const response = await fetch(`${this.baseUrl}/pc/v1/jobdetails/${hashId}`, {
        method: 'GET',
        headers: {
          'X-API-Key': this.apiKey,
          'Accept': 'application/json',
          'User-Agent': 'CareerWave/1.0.0'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Arbeitsagentur API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as ArbeitsagenturJob;
    } catch (error) {
      console.error('Error fetching job details from Arbeitsagentur:', error);
      throw error;
    }
  }
}

export const arbeitsagenturService = new ArbeitsagenturService();
export type { ArbeitsagenturJob, ArbeitsagenturJobSearchParams, ArbeitsagenturApiResponse };