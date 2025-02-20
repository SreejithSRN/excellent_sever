"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const category_1 = require("./category");
const index_1 = require("./courses/index");
const controllers = (dependencies) => {
    return {
        addCategory: (0, category_1.addCategoryController)(dependencies),
        getCategories: (0, category_1.getCategoriesController)(dependencies),
        blockUnblockCat: (0, category_1.blockUnblockCatController)(dependencies),
        addCourse: (0, index_1.addCourseController)(dependencies),
        getCourses: (0, index_1.getCoursesController)(dependencies),
        getCoursesById: (0, index_1.getCoursesByIdController)(dependencies)
    };
};
exports.controllers = controllers;
