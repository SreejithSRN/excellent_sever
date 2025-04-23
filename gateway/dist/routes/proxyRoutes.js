"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const jwt_1 = require("../middleware/jwt");
const gatewayConfig_1 = require("../middleware/gatewayConfig");
const router = (0, express_1.Router)();
// Public Auth Routes (like login/signup)
const AUTH_SERVICE = process.env.AUTH_SERVICE;
router.use("/api/auth", (0, express_http_proxy_1.default)(AUTH_SERVICE));
// const COURSE_SERVICE = process.env.COURSE_SERVICE!;
// router.use("/api/course",roleAuthMiddleware(), proxy(COURSE_SERVICE));
// Role-restricted service routes
gatewayConfig_1.gatewayRoutes.forEach(({ path, role, service }) => {
    router.use(path, (0, jwt_1.roleAuthMiddleware)(role), (0, express_http_proxy_1.default)(service));
});
exports.default = router;
