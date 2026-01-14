# Admin-Konfiguration

## Setup

1. Kopieren Sie `adminConfig.example.ts` zu `adminConfig.ts`:
   ```bash
   cp frontend/src/config/adminConfig.example.ts frontend/src/config/adminConfig.ts
   ```

2. Bearbeiten Sie `adminConfig.ts` und fügen Sie Ihre Admin-E-Mails hinzu:
   ```typescript
   export const ADMIN_EMAILS = [
     'ihre-admin-email@example.com',
     'weitere-admin@example.com',
   ];
   ```

3. Die `adminConfig.ts` Datei wird automatisch von Git ignoriert und nicht committed.

## Wichtig

- ⚠️ **Committen Sie NIEMALS die `adminConfig.ts` Datei**
- ✅ Nur die `adminConfig.example.ts` wird versioniert
- 🔒 Die echten Admin-E-Mails bleiben lokal und sicher
