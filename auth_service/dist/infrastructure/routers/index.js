"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../presentation/controllers");
const validate_1 = require("../../_lib/middleware/validate");
const jwt_1 = require("../../_lib/middleware/jwt");
const entities_1 = require("../../domain/entities");
const routes = (dependencies) => {
    const { signup, verifyOtp, resentOtp, login, getUserData, logout, getStudents, getInstructors, blockUnblock, approveReject, registerForm, profileEdit, passwordChange, profileImageEdit, } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router
        .route("/signup")
        .post(validate_1.validateEmailMiddleware, validate_1.validateUserNameMiddleware, validate_1.validatePasswordMiddleware, validate_1.validateConfirmPasswordMiddleware, signup);
    router.route("/verifyOtp").post(verifyOtp);
    router.route("/resentOtp").post(resentOtp);
    router
        .route("/login")
        .post(validate_1.validateEmailMiddleware, validate_1.validatePasswordMiddleware, login);
    router.route("/getUserData").get((0, jwt_1.roleAuthMiddleware)(), getUserData);
    router.route("/logout").delete(logout);
    router.route("/getStudents").get((0, jwt_1.roleAuthMiddleware)(entities_1.Role.admin), getStudents);
    router.route("/getInstructors").get((0, jwt_1.roleAuthMiddleware)(entities_1.Role.admin), getInstructors);
    router.route("/blockUnblock").post((0, jwt_1.roleAuthMiddleware)(entities_1.Role.admin), blockUnblock);
    router.route("/approveReject").post((0, jwt_1.roleAuthMiddleware)(entities_1.Role.admin), approveReject);
    router.route("/registerForm").post(validate_1.validatefirstNameMiddleware, registerForm);
    router.route("/profileEdit").post((0, jwt_1.roleAuthMiddleware)(), profileEdit);
    router.route("/passwordChange").post((0, jwt_1.roleAuthMiddleware)(), passwordChange);
    router.route("/profileImageEdit").put((0, jwt_1.roleAuthMiddleware)(), profileImageEdit);
    return router;
};
exports.routes = routes;
