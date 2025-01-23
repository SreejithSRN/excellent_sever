"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const category_1 = require("./category");
const controllers = (dependencies) => {
    return {
        addCategory: (0, category_1.addCategoryController)(dependencies),
        getCategories: (0, category_1.getCategoriesController)(dependencies),
        blockUnblockCat: (0, category_1.blockUnblockCatController)(dependencies)
    };
};
exports.controllers = controllers;
