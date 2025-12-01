// backend/src/routes/index.ts
import { Elysia } from "elysia";
import { authController } from "../controllers/auth.controller";
import userRoutes from "./user.routes";
import jobRoutes from "./job.routes";
import employerRoutes from "./employer.routes";
import adminRoutes from "./admin.routes";

export default new Elysia()
  .use(authController)
  .use(userRoutes)
  .use(jobRoutes)
  .use(employerRoutes)
  .use(adminRoutes);
