// Arbeitsagentur JobDetails TypeScript Interface
// Generiert auf Basis der OpenAPI-Spezifikation und Python-Modelle

export interface ArbeitsagenturJobDetails {
  aktuelleVeroeffentlichungsdatum?: string;
  angebotsart?: string;
  arbeitgeber?: string;
  branchengruppe?: string;
  branche?: string;
  arbeitgeberHashId?: string;
  arbeitsorte?: Array<{
    land?: string;
    region?: string;
    plz?: string;
    ort?: string;
    strasse?: string;
    koordinaten?: {
      lat?: number;
      lon?: number;
    };
  }>;
  arbeitszeitmodelle?: string[];
  befristung?: string;
  uebernahme?: boolean;
  betriebsgroesse?: string;
  eintrittsdatum?: string;
  ersteVeroeffentlichungsdatum?: string;
  allianzpartner?: string;
  allianzpartnerUrl?: string;
  titel?: string;
  hashId?: string;
  beruf?: string;
  modifikationsTimestamp?: string;
  stellenbeschreibung?: string;
  refnr?: string;
  fuerFluechtlingeGeeignet?: boolean;
  nurFuerSchwerbehinderte?: boolean;
  anzahlOffeneStellen?: number;
  arbeitgeberAdresse?: {
    land?: string;
    region?: string;
    plz?: string;
    ort?: string;
    strasse?: string;
    strasseHausnummer?: string;
  };
  fertigkeiten?: Array<any>; // Optional: Details je nach API-Response
  mobilitaet?: any; // Optional: Details je nach API-Response
  fuehrungskompetenzen?: any; // Optional: Details je nach API-Response
  verguetung?: string;
  arbeitgeberdarstellungUrl?: string;
  arbeitgeberdarstellung?: string;
  hauptDkz?: string;
  istBetreut?: boolean;
  istGoogleJobsRelevant?: boolean;
  anzeigeAnonym?: boolean;
}
