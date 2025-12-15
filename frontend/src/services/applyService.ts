// frontend/src/services/applyService.ts
import { config } from '../config/env';

export interface ApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}

export async function submitApplication(payload: ApplicationPayload) {
  const res = await fetch(`${config.api.baseUrl}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Bewerbung konnte nicht gesendet werden');
  return await res.json();
}
