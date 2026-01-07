import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { authController } from './controllers/auth.controller';
import { jobController } from './controllers/job.controller';
import { arbeitsagenturController } from './controllers/arbeitsagentur.controller';
import applicationRoutes from './routes/application.routes';
import userRoutes from './routes/user.routes';
import uploadRoutes from './routes/upload.routes';

const app = new Elysia()
  .use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'https://careerwave-frontend.vercel.app'
    ],
    credentials: true
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'CareerWave API',
        description: 'Eine moderne Job-Platform API mit Bun und Elysia',
        version: '1.0.0'
      },
      servers: [
        { url: 'http://localhost:3001', description: 'Development' },
        { url: 'https://careerwave-api.fly.dev', description: 'Production' }
      ],
      tags: [
        { name: 'auth', description: 'Authentifizierung' },
        { name: 'jobs', description: 'Job-Management' },
        { name: 'arbeitsagentur', description: 'Arbeitsagentur Job-Suche' }
      ]
    }
  }))
  .get('/', () => ({
    message: 'CareerWave API',
    version: '1.0.0',
    documentation: '/swagger',
    status: 'online',
    timestamp: new Date().toISOString()
  }))
  .get('/health', () => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  }))
  .group('/api/v1', app => app
    .use(authController)
    .use(jobController)
    .use(arbeitsagenturController)
    .use(applicationRoutes)
    .use(userRoutes)
    .use(uploadRoutes)
  )
  .onError(({ error, set }) => {
    console.error('API Error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('validation failed')) {
      set.status = 400;
      return {
        success: false,
        message: 'Ungültige Eingabedaten',
        error: errorMessage
      };
    }
    
    if (errorMessage.includes('unauthorized') || errorMessage.includes('Token')) {
      set.status = 401;
      return {
        success: false,
        message: 'Nicht autorisiert'
      };
    }
    
    if (errorMessage.includes('forbidden')) {
      set.status = 403;
      return {
        success: false,
        message: 'Zugriff verweigert'
      };
    }
    
    if (errorMessage.includes('not found')) {
      set.status = 404;
      return {
        success: false,
        message: 'Ressource nicht gefunden'
      };
    }
    
    set.status = 500;
    return {
      success: false,
      message: 'Interner Server-Fehler'
    };
  })
  .listen(3001);

console.log('🚀 CareerWave API läuft auf http://localhost:3001');
console.log('📖 API-Dokumentation: http://localhost:3001/swagger');
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');