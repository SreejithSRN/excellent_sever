import { Router } from "express";
import proxy from "express-http-proxy";
import { roleAuthMiddleware } from "../middleware/jwt";
import { gatewayRoutes } from "../middleware/gatewayConfig";


const router = Router();

// Public Auth Routes (like login/signup)
const AUTH_SERVICE = process.env.AUTH_SERVICE!;
router.use("/api/auth", proxy(AUTH_SERVICE));
// const COURSE_SERVICE = process.env.COURSE_SERVICE!;
// router.use("/api/course",roleAuthMiddleware(), proxy(COURSE_SERVICE));

// Role-restricted service routes
gatewayRoutes.forEach(({ path, role, service }) => {
  router.use(path, roleAuthMiddleware(role), proxy(service));
});

  
  

export default router;






