// frontend/src/api/auth.ts

import type { User } from '../types/user';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

// Hilfsfunktion zur Verarbeitung der JSON-Antwort
function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // Versuche, Fehlerdetails aus der Antwort zu lesen
    return res.json().then(err => { throw new Error(err.error || `API error ${res.status}`); });
  }
  return res.json();
}

// Typdefinition für die erfolgreiche Login-Antwort
interface LoginResponse {
    uid: string;
    email: string;
    role: User['role'];
    token: string;
}

/**
 * Registriert einen neuen Benutzer.
 * @param email 
 * @param password 
 */
export async function registerUser(email: string, password: string): Promise<User> {
  const res = await fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  // Der Backend-Controller gibt { message: "User created", uid: userRecord.uid } zurück.
  // Wir müssten hier die komplette User-Info zurückgeben oder einen separaten Endpoint ansteuern.
  // Fürs Erste mappen wir die Antwort.
  const data = await json<{ uid: string, message: string }>(res);
  return { uid: data.uid, email, role: 'candidate' }; // Mock the rest for now
}

/**
 * Loggt einen Benutzer ein.
 * @param idToken Der Firebase Client ID Token
 */
export async function loginUser(idToken: string): Promise<LoginResponse> {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  return json<LoginResponse>(res);
}