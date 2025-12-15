// frontend/src/config/env.ts
// Sichere Frontend-Konfiguration - nur öffentlich sichtbare Informationen

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'CareerWave',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  }
} as const;

// Validierung der kritischen Konfigurationen
if (!config.api.baseUrl) {
  throw new Error('VITE_API_BASE_URL ist nicht definiert!');
}

console.log('✅ Frontend Config geladen:', {
  apiBaseUrl: config.api.baseUrl,
  appName: config.app.name,
  // Keine sensiblen Daten werden hier geloggt!
});