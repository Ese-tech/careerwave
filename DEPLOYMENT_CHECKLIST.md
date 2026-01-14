# 🚀 Deployment Checkliste für Vercel

## ✅ Vor dem Deployment

### 1. **Admin-Konfiguration lokal erstellen**
```bash
cp frontend/src/config/adminConfig.example.ts frontend/src/config/adminConfig.ts
```
Dann in `adminConfig.ts` Ihre Admin-E-Mails eintragen.

### 2. **Environment Variablen in Vercel setzen**

#### Frontend Environment Variables:
- `VITE_API_BASE_URL` - Ihre Vercel Backend URL (z.B. `https://ihr-projekt.vercel.app/api/v1`)
- `VITE_API_TIMEOUT` - `30000`
- `VITE_APP_NAME` - `CareerWave`
- `VITE_APP_VERSION` - `1.0.0`

#### Backend Environment Variables:
**Wichtig:** Diese müssen in Vercel Project Settings → Environment Variables eingetragen werden!

- `NODE_ENV` - `production`
- `PORT` - `3001`
- `JWT_SECRET` - Ihr sicherer JWT Secret (mindestens 32 Zeichen)
- `FIREBASE_PROJECT_ID` - Firebase Projekt ID
- `FIREBASE_PRIVATE_KEY_ID` - Firebase Private Key ID
- `FIREBASE_PRIVATE_KEY` - Firebase Private Key (mit \n für Zeilenumbrüche)
- `FIREBASE_CLIENT_EMAIL` - Firebase Client Email
- `FIREBASE_CLIENT_ID` - Firebase Client ID
- `FIREBASE_AUTH_URI` - `https://accounts.google.com/o/oauth2/auth`
- `FIREBASE_TOKEN_URI` - `https://oauth2.googleapis.com/token`
- `FIREBASE_AUTH_PROVIDER_X509_CERT_URL` - `https://www.googleapis.com/oauth2/v1/certs`
- `FIREBASE_CLIENT_X509_CERT_URL` - Firebase Client Cert URL
- `CORS_ORIGINS` - Ihre Vercel Frontend URL (z.B. `https://ihr-projekt.vercel.app`)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary Cloud Name
- `CLOUDINARY_API_KEY` - Cloudinary API Key
- `CLOUDINARY_API_SECRET` - Cloudinary API Secret
- `SENDGRID_API_KEY` - SendGrid API Key (optional, für E-Mails)
- `EMAIL_FROM` - Absender-E-Mail
- `FRONTEND_URL` - Ihre Vercel Frontend URL

### 3. **Build Scripts überprüfen** ✅
- ✅ Frontend: `tsc -b && vite build`
- ✅ Backend: `bun build src/index.ts --outdir dist --target bun`

### 4. **vercel.json überprüfen** ✅
Die Datei ist korrekt konfiguriert!

## 🚀 Deployment Schritte

### Option 1: Vercel CLI (empfohlen für erstes Deployment)

1. **Vercel CLI installieren** (falls nicht vorhanden):
```bash
npm i -g vercel
```

2. **Im Projektverzeichnis deployen**:
```bash
cd /home/ese/Projecte-2025/careerwave
vercel
```

3. **Fragen beantworten**:
   - Set up and deploy? → `Y`
   - Which scope? → Ihr Vercel Account
   - Link to existing project? → `N` (beim ersten Mal)
   - Project name? → `careerwave`
   - In which directory is your code located? → `./`

4. **Production Deployment**:
```bash
vercel --prod
```

### Option 2: GitHub Integration (empfohlen für automatisches Deployment)

1. **Code zu GitHub pushen**:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Vercel mit GitHub verbinden**:
   - Gehen Sie zu [vercel.com](https://vercel.com)
   - Klicken Sie auf "New Project"
   - Importieren Sie Ihr GitHub Repository
   - Vercel erkennt automatisch die `vercel.json`

3. **Environment Variables in Vercel Dashboard eintragen**

4. **Deploy!**

## ⚠️ WICHTIGE HINWEISE

### adminConfig.ts
Die Datei `frontend/src/config/adminConfig.ts` ist in `.gitignore`!

**Für Vercel Deployment:**
Sie haben 2 Optionen:
1. **Build Command anpassen** - erstellt automatisch eine Standard-adminConfig.ts beim Build
2. **Umgebungsvariable** - Admin-E-Mails als Environment Variable

### Empfohlene Lösung: Build Command erweitern

Erstellen Sie die adminConfig.ts automatisch beim Build:

```bash
# In frontend/package.json
"scripts": {
  "build": "cp src/config/adminConfig.example.ts src/config/adminConfig.ts 2>/dev/null || true && tsc -b && vite build"
}
```

Oder besser: Einen Pre-Build Hook in vercel.json:

## ❗ Noch zu erledigen

1. ⚠️ **adminConfig.ts Problem lösen** (siehe unten)
2. ✅ Environment Variables in Vercel eintragen
3. ✅ Firebase Service Account überprüfen

---

## 📝 adminConfig.ts für Production

Möchten Sie, dass ich eine Lösung implementiere, damit die adminConfig.ts automatisch beim Vercel Build erstellt wird?
