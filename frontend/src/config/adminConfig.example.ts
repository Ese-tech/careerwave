// frontend/src/config/adminConfig.example.ts

/**
 * BEISPIEL-DATEI FÜR ADMIN-KONFIGURATION
 * 
 * Kopieren Sie diese Datei zu 'adminConfig.ts' und fügen Sie Ihre Admin-E-Mails hinzu
 * Die adminConfig.ts Datei wird nicht in Git committed
 */

/**
 * Liste der E-Mail-Adressen mit Admin-Zugriff
 * Nur diese E-Mails können auf den Admin-Bereich zugreifen
 */
export const ADMIN_EMAILS = [
  'admin@example.com',
  // Weitere Admin-E-Mails hier hinzufügen
];

/**
 * Überprüft, ob eine E-Mail Admin-Rechte hat
 */
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
