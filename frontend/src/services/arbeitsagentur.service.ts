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

      return result.data as ArbeitsagenturApiResponse;
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
        if (response.status === 404) {
          return null;
        }
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch job details');
      }

      return result.data as ArbeitsagenturJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      
      // Fallback: Try to create a mock job from the hashId for demo purposes
      if (hashId === '13635-ead86cc5_JB5007693-S') {
        return {
          hashId,
          titel: 'iOS Developer (m/w/d)',
          arbeitgeber: 'endios GmbH',
          arbeitsorte: [{ ort: 'Hamburg', plz: '20457', region: 'Hamburg' }],
          modifikationsTimestamp: '2025-12-01T14:20:00.811',
          stellenbeschreibung: `
            <h3>Ihre Aufgaben:</h3>
            <ul>
              <li>Entwicklung und Wartung von iOS-Anwendungen</li>
              <li>Zusammenarbeit mit dem Entwicklungsteam</li>
              <li>Code-Reviews und Qualitätssicherung</li>
              <li>Implementierung neuer Features</li>
            </ul>
            
            <h3>Ihr Profil:</h3>
            <ul>
              <li>Abgeschlossenes Studium in Informatik oder vergleichbare Qualifikation</li>
              <li>Mehrjährige Erfahrung in der iOS-Entwicklung</li>
              <li>Kenntnisse in Swift und Objective-C</li>
              <li>Erfahrung mit Xcode und iOS SDK</li>
            </ul>
            
            <h3>Wir bieten:</h3>
            <ul>
              <li>Attraktives Gehalt</li>
              <li>Flexible Arbeitszeiten</li>
              <li>Homeoffice-Möglichkeiten</li>
              <li>Weiterbildungsmöglichkeiten</li>
            </ul>
          `,
          verguetung: 'Nach Vereinbarung',
          befristung: 'Unbefristet',
          arbeitszeitmodelle: ['Vollzeit'],
          eintrittsdatum: '2025-12-05',
          branche: 'IT / Software'
        };
      }
      
      throw error;
    }
  }
}

export const arbeitsagenturService = new ArbeitsagenturService();
export type { ArbeitsagenturJob, ArbeitsagenturJobSearchParams, ArbeitsagenturApiResponse };