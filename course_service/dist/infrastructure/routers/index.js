"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../presentation/controllers");
const routes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { addCategory, getCategories, blockUnblockCat, addCourse, getCourses, getCoursesById } = (0, controllers_1.controllers)(dependencies);
    router.route("/addCategory").post(addCategory);
    router.route("/getCategories").get(getCategories);
    router.route("/blockUnblockCat").post(blockUnblockCat);
    router.route("/addCourse").post(addCourse);
    router.route("/getCourses").get(getCourses);
    router.route("/getCoursesById/:id").get(getCoursesById);
    return router;
};
exports.routes = routes;
