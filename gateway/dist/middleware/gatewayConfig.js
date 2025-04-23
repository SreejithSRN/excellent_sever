"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayRoutes = void 0;
const UserEntity_1 = require("../entity/UserEntity");
exports.gatewayRoutes = [
    { path: "/api/course/addCategory", role: UserEntity_1.Role.admin, service: process.env.COURSE_SERVICE, },
    { path: "/api/course/getCategories", role: undefined, service: process.env.COURSE_SERVICE, },
];
