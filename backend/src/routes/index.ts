// backend/src/routes/index.ts
import { Elysia } from "elysia";
import { authController } from "../controllers/auth.controller";
import userRoutes from "./user.routes";
import jobRoutes from "./job.routes";
import employerRoutes from "./employer.routes";
import adminRoutes from "./admin.routes";
import favoriteRoutes from "./favorite.routes";
import jobAlertRoutes from "./jobAlert.routes";
import uploadRoutes from './upload.routes';
import { aiRoutes } from './ai.routes';
import arbeitsagenturRoutes from './arbeitsagentur.routes';
import arbeitsagenturFacetsRoutes from './arbeitsagentur.facets.routes';
import arbeitsagenturLogoRoutes from './arbeitsagentur.logo.routes';
import arbeitsagenturSkillsRoutes from './arbeitsagentur.skills.routes';

export default new Elysia()
  .use(authController)
  .use(userRoutes)
  .use(jobRoutes)
  .use(employerRoutes)
  .use(adminRoutes)
  .use(favoriteRoutes)
  .use(jobAlertRoutes)
  .use(uploadRoutes)
  .use(aiRoutes)
  .use(arbeitsagenturRoutes)
  .use(arbeitsagenturFacetsRoutes)
  .use(arbeitsagenturLogoRoutes)
  .use(arbeitsagenturSkillsRoutes);
