// frontend/src/config/adminConfig.ts

/**
 * Liste der E-Mail-Adressen mit Admin-Zugriff
 * Nur diese E-Mails können auf den Admin-Bereich zugreifen
 * 
 * PRODUCTION: Diese Werte können über Environment Variables überschrieben werden
 */

// Admins aus Environment Variable (für Production) oder Default-Liste
const envAdmins = import.meta.env.VITE_ADMIN_EMAILS 
  ? import.meta.env.VITE_ADMIN_EMAILS.split(',').map((email: string) => email.trim())
  : [];

export const ADMIN_EMAILS = envAdmins.length > 0 ? envAdmins : [
  'ese.osagie@dci-student.org',
  'admin@careerwave.com',
  // Weitere Admin-E-Mails hier hinzufügen
];

/**
 * Überprüft, ob eine E-Mail Admin-Rechte hat
 */
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
