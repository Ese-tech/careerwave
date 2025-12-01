# Contributing to CareerWave

Vielen Dank für Ihr Interesse, zu CareerWave beizutragen! Dieses Dokument beschreibt den Prozess für die Zusammenarbeit an diesem Projekt.

## 🚀 Schnellstart für Entwickler

### Voraussetzungen
- Node.js 18+
- Bun 1.0+
- Git
- Firebase Account

### Lokale Entwicklung einrichten

1. **Repository forken und klonen**
```bash
git clone https://github.com/your-username/careerwave.git
cd careerwave
```

2. **Backend Setup**
```bash
cd backend
bun install
cp .env.example .env
# Firebase Konfiguration in .env hinzufügen
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Frontend Konfiguration in .env hinzufügen
```

4. **Entwicklungsserver starten**
```bash
# Terminal 1 - Backend
cd backend
bun run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🏗️ Projektarchitektur

### Backend (Bun/Elysia)
```
backend/src/
├── controllers/     # API Controller Logik
├── middleware/      # Authentifizierung & Validierung
├── routes/          # API Routen Definition
├── schemas/         # Zod Validierungsschemas
├── services/        # Firebase & Business Logik
└── utils/           # Hilfsfunktionen
```

### Frontend (React/Vite)
```
frontend/src/
├── components/      # Wiederverwendbare UI Komponenten
├── pages/           # Seitenkomponenten
├── stores/          # Zustand Management (Zustand)
├── i18n/            # Internationalization
├── context/         # React Context Providers
├── hooks/           # Custom React Hooks
└── utils/           # Hilfsfunktionen
```

## 📝 Code Standards

### TypeScript
- Verwende strenge TypeScript Konfiguration
- Alle Funktionen und Variablen typisieren
- Keine `any` verwenden (außer in Ausnahmefällen)

### Code Style
- ESLint für Code Qualität
- Prettier für Code Formatierung
- 2 Spaces für Einrückung
- Semikolons verwenden

### Naming Conventions
- **Variablen/Funktionen**: camelCase (`userName`, `getUserData`)
- **Komponenten**: PascalCase (`UserProfile`, `JobCard`)
- **Dateien**: kebab-case (`user-profile.tsx`, `job-controller.ts`)
- **Konstanten**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🌍 Internationalization

### Neue Übersetzungen hinzufügen
1. Übersetzungsschlüssel in allen Sprachen hinzufügen:
   - `frontend/src/i18n/locales/de.json`
   - `frontend/src/i18n/locales/en.json`
   - `frontend/src/i18n/locales/es.json`
   - `frontend/src/i18n/locales/fr.json`

2. Verwende aussagekräftige Schlüssel:
```json
{
  "jobs": {
    "create": {
      "title": "Job erstellen",
      "description": "Erstellen Sie eine neue Stellenausschreibung"
    }
  }
}
```

### Neue Sprache hinzufügen
1. Neue Lokalisierungsdatei erstellen
2. In `frontend/src/i18n/i18n.ts` registrieren
3. Language Switcher updaten

## 🎨 UI/UX Guidelines

### Farbsystem
Verwende die definierten CSS-Variablen:
```css
--color-primary: #06b6d4;      /* Teal */
--color-secondary: #f59e0b;    /* Amber */
--color-accent: #a855f7;       /* Purple */
```

### Komponenten Design
- Mobile-first Design
- Accessibility (ARIA Labels, keyboard navigation)
- Loading States für alle async Operationen
- Error Handling mit benutzerfreundlichen Nachrichten

### TailwindCSS Nutzung
- Verwende Utility Classes
- Custom Components in `@layer components`
- Responsive Design mit Breakpoints

## 🔧 API Development

### Controller Pattern
```typescript
export const createJobController = async (
  { body, jwt }: { body: CreateJobRequest; jwt: string }
): Promise<{ success: boolean; data?: Job; error?: string }> => {
  try {
    // Validierung
    const validation = createJobSchema.parse(body);
    
    // Business Logik
    const result = await jobService.createJob(validation, jwt);
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Error Handling
- Verwende strukturierte Error Responses
- Logging für alle Fehler
- Benutzerfreundliche Fehlermeldungen

### Validierung
- Zod Schemas für alle API Inputs
- Client-side und Server-side Validierung
- Sanitization für Benutzereingaben

## 🧪 Testing

### Backend Tests
```bash
cd backend
bun test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Coverage
- Mindestens 80% Code Coverage
- Unit Tests für alle Services
- Integration Tests für API Endpoints
- E2E Tests für kritische User Flows

## 🚦 Git Workflow

### Branch Naming
- `feature/job-search-filters`
- `bugfix/authentication-error`
- `hotfix/security-vulnerability`
- `docs/api-documentation`

### Commit Messages
Verwende Conventional Commits:
```
feat: add job search filters
fix: resolve authentication token expiry
docs: update API documentation
style: improve mobile responsive design
refactor: optimize database queries
test: add unit tests for job service
```

### Pull Request Prozess
1. **Branch erstellen** von `main`
2. **Änderungen implementieren**
3. **Tests schreiben/updaten**
4. **Self-Review** durchführen
5. **Pull Request erstellen**
6. **Code Review** abwarten
7. **Merge** nach Approval

### Pull Request Template
```markdown
## Änderungen
- [ ] Kurze Beschreibung der Änderungen

## Testing
- [ ] Unit Tests hinzugefügt/updated
- [ ] Manual Testing durchgeführt

## Screenshots (falls UI Änderungen)

## Checklist
- [ ] Code folgt Style Guidelines
- [ ] Keine Merge Conflicts
- [ ] Tests laufen durch
```

## 🔒 Sicherheit

### Authentifizierung
- JWT Tokens mit angemessener Laufzeit
- Refresh Token Mechanismus
- Rate Limiting für Login Versuche

### Autorisierung
- Rollenbasierte Zugriffskontrolle
- Route Guards im Frontend
- API Endpoint Protection

### Data Protection
- Input Sanitization
- SQL Injection Prevention (Firestore)
- XSS Protection
- CORS Konfiguration

## 📊 Performance

### Backend Optimierung
- Database Query Optimierung
- Caching Strategien
- Pagination für große Datenmengen

### Frontend Optimierung
- Code Splitting
- Lazy Loading
- Image Optimierung
- Bundle Size Monitoring

## 🐛 Bug Reports

### Issue Template
```markdown
**Bug Beschreibung**
Kurze, klare Beschreibung des Problems

**Schritte zur Reproduktion**
1. Gehe zu '...'
2. Klicke auf '...'
3. Siehe Fehler

**Erwartetes Verhalten**
Was sollte passieren

**Screenshots**
Falls zutreffend

**Environment**
- OS: [e.g. macOS 12]
- Browser: [e.g. Chrome 96]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Feature Template
```markdown
**Feature Beschreibung**
Klare Beschreibung des gewünschten Features

**Motivation**
Warum ist dieses Feature wichtig?

**Lösungsvorschlag**
Wie könnte das Feature implementiert werden?

**Alternativen**
Andere mögliche Ansätze
```

## 📞 Kontakt

- **Maintainer**: [Ihr Name]
- **Email**: [ihre.email@domain.com]
- **Discord**: [Discord Server Link]
- **Issues**: GitHub Issues für Bugs und Feature Requests

## 📜 Lizenz

Durch die Mitarbeit an diesem Projekt stimmen Sie zu, dass Ihre Beiträge unter derselben MIT-Lizenz lizenziert werden.

---

Vielen Dank für Ihren Beitrag zu CareerWave! 🌊