// frontend/src/types/arbeitsagentur.ts
export interface ArbeitsagenturJobSearchResponse {
  stellenangebote: JobDetails[];
  maxErgebnisse: string;
  page: string;
  size: string;
  facetten: Facette[];
}

export interface JobDetails {
  aktuelleVeroeffentlichungsdatum: string;
  angebotsart: string;
  arbeitgeber: string;
  branchengruppe: string;
  branche: string;
  arbeitgeberHashId: string;
  arbeitsorte: Arbeitsort[];
  arbeitszeitmodelle: string[];
  befristung: string;
  uebernahme: boolean;
  betriebsgroesse: string;
  eintrittsdatum: string;
  ersteVeroeffentlichungsdatum: string;
  allianzpartner: string;
  allianzpartnerUrl: string;
  titel: string;
  hashId: string;
  beruf: string;
  modifikationsTimestamp: string;
  stellenbeschreibung: string;
  refnr: string;
  fuerFluechtlingeGeeignet: boolean;
  nurFuerSchwerbehinderte: boolean;
  anzahlOffeneStellen: number;
  arbeitgeberAdresse: ArbeitgeberAdresse;
  fertigkeiten: Fertigkeit[];
  mobilitaet: Mobilitaet;
  fuehrungskompetenzen: Fuehrungskompetenzen;
  verguetung: string;
  arbeitgeberdarstellungUrl: string;
  arbeitgeberdarstellung: string;
  hauptDkz: string;
  istBetreut: boolean;
  istGoogleJobsRelevant: boolean;
  anzeigeAnonym: boolean;
}

export interface Arbeitsort {
  ort: string;
  plz: string;
  region: string;
  land: string;
  koordinaten?: {
    lat: number;
    lon: number;
  };
}

export interface ArbeitgeberAdresse {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  land: string;
}

export interface Fertigkeit {
  fertigkeitRoh: string;
  auspraegung: string;
}

export interface Mobilitaet {
  reisebereitschaft: string;
  fuehrerscheinKlassen: string[];
}

export interface Fuehrungskompetenzen {
  fuehrungserfahrung: boolean;
  personalverantwortung: number;
}

export interface Facette {
  name: string;
  werte: FacetteWert[];
}

export interface FacetteWert {
  wert: string;
  anzahl: number;
}

export interface JobSearchParams {
  was?: string;          // Job title or keywords
  wo?: string;           // Location
  page?: number;         // Page number (default: 1)
  size?: number;         // Results per page (default: 25, max: 100)
  befristung?: 'UNBEFRISTET' | 'BEFRISTET';
  vollzeit?: boolean;
  teilzeit?: boolean;
  ausbildung?: boolean;
  praktikum?: boolean;
  zeitarbeit?: boolean;
  mindesverguetung?: number;
  nurKammerberufe?: boolean;
  nurFuerSchwerbehinderte?: boolean;
  fuerFluechtlingeGeeignet?: boolean;
}