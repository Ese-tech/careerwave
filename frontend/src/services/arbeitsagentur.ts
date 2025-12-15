// frontend/src/services/arbeitsagentur.ts
import type { ArbeitsagenturJobSearchResponse, JobDetails, JobSearchParams } from '../types/arbeitsagentur';

const API_BASE_URL = import.meta.env.VITE_BA_API_URL;
const API_KEY = import.meta.env.VITE_BA_API_KEY;

class ArbeitsagenturService {
  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, API_BASE_URL);
    
    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Arbeitsagentur API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Search for jobs using the Arbeitsagentur API
   */
  async searchJobs(params: JobSearchParams = {}): Promise<ArbeitsagenturJobSearchResponse> {
    const searchParams = {
      page: params.page || 1,
      size: params.size || 25,
      was: params.was,
      wo: params.wo,
      befristung: params.befristung,
      vollzeit: params.vollzeit,
      teilzeit: params.teilzeit,
      ausbildung: params.ausbildung,
      praktikum: params.praktikum,
      zeitarbeit: params.zeitarbeit,
      mindesverguetung: params.mindesverguetung,
      nurKammerberufe: params.nurKammerberufe,
      nurFuerSchwerbehinderte: params.nurFuerSchwerbehinderte,
      fuerFluechtlingeGeeignet: params.fuerFluechtlingeGeeignet,
    };

    return this.request<ArbeitsagenturJobSearchResponse>('/pc/v4/jobs', searchParams);
  }

  /**
   * Search for jobs via app endpoint (mobile optimized)
   */
  async searchJobsViaApp(params: JobSearchParams = {}): Promise<ArbeitsagenturJobSearchResponse> {
    const searchParams = {
      page: params.page || 1,
      size: params.size || 25,
      was: params.was,
      wo: params.wo,
    };

    return this.request<ArbeitsagenturJobSearchResponse>('/pc/v4/app/jobs', searchParams);
  }

  /**
   * Get employer logo by hash ID
   */
  async getEmployerLogo(hashId: string): Promise<Blob> {
    const url = `${API_BASE_URL}/ed/v1/arbeitgeberlogo/${hashId}`;
    
    const response = await fetch(url, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch employer logo: ${response.status}`);
    }

    return response.blob();
  }

  /**
   * Convert ArbeitsagenturJob to our internal Job format
   */
  convertToInternalJob(baJob: JobDetails): any {
    return {
      id: baJob.hashId,
      title: baJob.titel,
      company: baJob.arbeitgeber,
      location: Array.isArray(baJob.arbeitsorte)
        ? baJob.arbeitsorte.map(ort => `${ort.ort ?? ''}, ${ort.plz ?? ''}`).join('; ')
        : '',
      description: baJob.stellenbeschreibung || '',
      type: this.mapJobType(Array.isArray(baJob.arbeitszeitmodelle) ? baJob.arbeitszeitmodelle : []),
      salary: baJob.verguetung || 'Not specified',
      requirements: Array.isArray(baJob.fertigkeiten)
        ? baJob.fertigkeiten.map(f => f.fertigkeitRoh)
        : [],
      benefits: [],
      remote: false, // Arbeitsagentur doesn't specify remote work explicitly
      publishedAt: baJob.aktuelleVeroeffentlichungsdatum || '',
      expiresAt: null,
      isExternal: true,
      externalSource: 'Arbeitsagentur',
      externalUrl: `https://www.arbeitsagentur.de/jobsuche/jobdetail/${baJob.hashId}`,
      refNumber: baJob.refnr,
      industry: baJob.branche,
      branchengruppe: baJob.branchengruppe,
      companySize: baJob.betriebsgroesse,
      isUnlimited: baJob.befristung === 'UNBEFRISTET',
      entryDate: baJob.eintrittsdatum,
      arbeitgeberHashId: baJob.arbeitgeberHashId,
    };
  }

  private mapJobType(arbeitszeitmodelle: string[]): string {
    if (!arbeitszeitmodelle || arbeitszeitmodelle.length === 0) return 'full-time';
    
    const models = arbeitszeitmodelle.join(' ').toLowerCase();
    
    if (models.includes('vollzeit')) return 'full-time';
    if (models.includes('teilzeit')) return 'part-time';
    if (models.includes('praktikum')) return 'internship';
    if (models.includes('ausbildung')) return 'apprenticeship';
    if (models.includes('befristet')) return 'contract';
    
    return 'full-time';
  }
}

export const arbeitsagenturService = new ArbeitsagenturService();
export default arbeitsagenturService;