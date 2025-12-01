# Security Policy

## Unterstützte Versionen

Folgende Versionen von CareerWave werden derzeit mit Sicherheitsupdates unterstützt:

| Version | Unterstützt        |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Sicherheitslücken melden

Wir nehmen die Sicherheit von CareerWave sehr ernst. Wenn Sie eine Sicherheitslücke entdecken, melden Sie diese bitte verantwortungsvoll.

### Meldeprozess

1. **Nicht öffentlich melden** - Erstellen Sie kein öffentliches Issue
2. **Private Meldung** senden an: [security@careerwave.com]
3. **Details angeben**:
   - Beschreibung der Sicherheitslücke
   - Schritte zur Reproduktion
   - Potentielle Auswirkungen
   - Vorgeschlagene Lösung (falls vorhanden)

### Was Sie erwarten können

- **Bestätigung** innerhalb von 48 Stunden
- **Erste Bewertung** innerhalb von 5 Werktagen
- **Regelmäßige Updates** zum Fortschritt
- **Anerkennung** in den Release Notes (falls gewünscht)

## Sicherheitsrichtlinien

### Authentifizierung & Autorisierung

- JWT Tokens mit sicherer Signierung
- Rollenbasierte Zugriffskontrolle (RBAC)
- Multi-Factor Authentication Support
- Session Management
- Rate Limiting für Login-Versuche

### Datenschutz

- Datenverschlüsselung in Transit (HTTPS/TLS)
- Sichere Passwort-Hashing (bcrypt)
- PII (Personally Identifiable Information) Schutz
- GDPR/DSGVO Compliance
- Datenminimierung Prinzip

### Infrastructure Security

- Container Security (Docker)
- Secrets Management
- Environment Separation
- Database Security Rules (Firebase)
- API Rate Limiting

### Input Validation

- Zod Schema Validierung
- XSS Prevention
- SQL Injection Prevention
- File Upload Security
- Input Sanitization

## Bekannte Sicherheitsmaßnahmen

### Backend (Bun/Elysia)
- JWT mit sicheren Secrets
- CORS Konfiguration
- Request Rate Limiting
- Input Validierung mit Zod
- Firebase Admin SDK Sicherheit

### Frontend (React/Vite)
- Content Security Policy (CSP)
- XSS Protection Headers
- Secure Cookie Settings
- Environment Variables Schutz
- Bundle Security Scanning

### Firebase
- Firestore Security Rules
- Storage Security Rules
- Authentication Rules
- Network Security

## Sicherheits-Checkliste für Entwickler

### Code Review
- [ ] Sensible Daten nicht in Code committen
- [ ] Keine Hardcoded Secrets/API Keys
- [ ] Input Validierung implementiert
- [ ] Autorisierung geprüft
- [ ] Error Messages nicht zu detailliert

### Dependencies
- [ ] Regelmäßige Dependency Updates
- [ ] Security Audit mit `npm audit`
- [ ] Bekannte Vulnerabilities prüfen
- [ ] Lock Files committen

### Deployment
- [ ] Environment Variables sicher gesetzt
- [ ] HTTPS/TLS konfiguriert
- [ ] Sicherheits-Headers gesetzt
- [ ] Monitoring & Logging aktiviert

## Incident Response Plan

### Bei Sicherheitsvorfällen

1. **Sofortige Maßnahmen**
   - Vorfall dokumentieren
   - Betroffene Systeme isolieren
   - Security Team benachrichtigen

2. **Bewertung**
   - Umfang des Vorfalls ermitteln
   - Betroffene Daten identifizieren
   - Risikobewertung durchführen

3. **Eindämmung**
   - Sicherheitslücke schließen
   - Patch entwickeln und testen
   - Notfall-Update deployen

4. **Kommunikation**
   - Benutzer informieren (falls nötig)
   - Security Advisory veröffentlichen
   - Lessons Learned dokumentieren

## Security Best Practices

### Für Entwickler

```typescript
// ✅ Gut - Sichere JWT Verifikation
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// ❌ Schlecht - Keine Token Verifikation
const getUserFromToken = (token: string) => {
  const decoded = jwt.decode(token); // Unsicher!
  return decoded;
};
```

```typescript
// ✅ Gut - Input Validierung
const createJobSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  company: z.string().min(1).max(100),
});

// ❌ Schlecht - Keine Validierung
const createJob = (data: any) => {
  // Direkter Database Insert ohne Validierung
  return db.jobs.insert(data);
};
```

### Für Deployment

```yaml
# ✅ Gut - Sichere Container Konfiguration
FROM oven/bun:alpine
USER bun
COPY --chown=bun:bun . .
RUN bun install --frozen-lockfile
```

```bash
# ✅ Gut - Environment Variables
export JWT_SECRET=$(openssl rand -hex 32)
export DATABASE_URL="postgresql://..."
```

## Vulnerability Disclosure Timeline

- **Tag 0**: Sicherheitslücke gemeldet
- **Tag 1-2**: Bestätigung und erste Bewertung
- **Tag 3-7**: Detailanalyse und Patch-Entwicklung
- **Tag 8-14**: Testing und Quality Assurance
- **Tag 15**: Patch Release und Public Disclosure

## Kontakt

Für sicherheitsbezogene Fragen:

- **Security Email**: security@careerwave.com
- **GPG Key**: [Link zum GPG Public Key]
- **Response Time**: 48 Stunden für erste Antwort

## Anerkennung

Wir danken allen Security Researchers, die verantwortungsvoll Sicherheitslücken melden. Mit Ihrer Erlaubnis werden wir Sie in unseren Release Notes als Dank erwähnen.

---

**Letzte Aktualisierung**: Januar 2025