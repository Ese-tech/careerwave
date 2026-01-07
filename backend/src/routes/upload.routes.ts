// backend/src/routes/upload.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import { 
  uploadCVController, 
  uploadAvatarController, 
  uploadCompanyLogoController 
} from '../controllers/upload.controller';

export default new Elysia({ prefix: '/upload' })
  .use(authGuard())
  
  // Upload CV/Resume (PDF only)
  .post('/cv', uploadCVController, {
    detail: {
      tags: ['Upload'],
      summary: 'Upload CV/Resume (PDF)',
      description: 'Upload user CV/Resume in PDF format to Cloudinary'
    }
  })
  
  // Upload Avatar/Profile Image
  .post('/avatar', uploadAvatarController, {
    detail: {
      tags: ['Upload'],
      summary: 'Upload Avatar Image',
      description: 'Upload user profile image (JPEG, PNG, WebP) to Cloudinary'
    }
  })
  
  // Upload Company Logo (Employers only)
  .post('/logo', uploadCompanyLogoController, {
    body: t.Object({ 
      companyId: t.Optional(t.String()) 
    }),
    detail: {
      tags: ['Upload'],
      summary: 'Upload Company Logo',
      description: 'Upload company logo (JPEG, PNG, WebP) to Cloudinary (Employers only)'
    }
  });
