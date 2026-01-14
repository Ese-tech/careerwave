# CareerWave - Deployment Guide

## 📦 Project Structure

```
Projecte-2025/
├── package.json              # Root package.json (monorepo)
├── vercel.json              # Vercel deployment config
└── careerwave/
    ├── frontend/            # React + Vite Frontend
    │   ├── package.json
    │   └── dist/           # Build output
    └── backend/             # Bun + Elysia Backend
        ├── package.json
        └── dist/           # Build output
```

## 🚀 Local Development

### Prerequisites
- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js 18+ (for compatibility)

### Setup

1. **Install all dependencies**
```bash
bun run install:all
```

2. **Start development servers** (Frontend + Backend)
```bash
bun run dev
```

Or start individually:
```bash
# Frontend only
bun run dev:frontend

# Backend only
bun run dev:backend
```

## 🌐 Vercel Deployment

### Option 1: Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import repository in Vercel Dashboard
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `bun run vercel-build`
   - **Output Directory**: `careerwave/frontend/dist`

### Environment Variables (Vercel)

Configure these in Vercel Dashboard → Project Settings → Environment Variables:

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api/v1
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=3001
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📝 Available Scripts

- `bun run install:all` - Install dependencies for frontend & backend
- `bun run dev` - Run both frontend & backend in dev mode
- `bun run build` - Build both frontend & backend
- `bun run build:frontend` - Build frontend only
- `bun run build:backend` - Build backend only
- `bun run start` - Start production backend server
- `bun run vercel-build` - Vercel build command

## 🔧 Build Process

### Frontend Build
```bash
cd careerwave/frontend
bun install
bun run build
```
Output: `careerwave/frontend/dist/`

### Backend Build
```bash
cd careerwave/backend
bun install
bun run build
```
Output: `careerwave/backend/dist/`

## 🌍 Production URLs

After deployment:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api/v1`

## 📌 Notes

- Frontend uses Vite for optimized production builds
- Backend runs on Bun runtime (Vercel supports Bun)
- API routes are proxied through `/api/v1/*`
- Static files are served from frontend dist folder
- Make sure to update CORS settings in backend for production domain

## 🔐 Security Checklist

- [ ] Set all environment variables in Vercel
- [ ] Update CORS origin to production domain
- [ ] Enable Firebase authentication
- [ ] Secure API endpoints with JWT
- [ ] Configure rate limiting
- [ ] Enable HTTPS only

## 🐛 Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel Dashboard
- Verify all environment variables are set
- Ensure package.json scripts are correct

### API calls fail
- Verify `VITE_API_BASE_URL` points to correct backend
- Check CORS configuration in backend
- Verify API routes are accessible

### Frontend not loading
- Check if build succeeded
- Verify output directory is correct
- Check browser console for errors
