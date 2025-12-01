// backend/src/models/user.model.ts
// Definiert das Basis-Benutzer-Modell, das in der Datenbank gespeichert wird.

export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt: FirebaseFirestore.Timestamp | Date;
  verified?: boolean; // Für Arbeitgeber oder Admin-Verifizierung
  // Weitere user-spezifische Felder (z.B. Profil-URL, Resume-URL)
}

export interface AuthUser {
  uid: string;
  email: string;
  role: UserRole;
}