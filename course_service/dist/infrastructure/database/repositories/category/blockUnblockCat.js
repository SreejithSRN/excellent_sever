"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUnblockCat = void 0;
const models_1 = require("../../models");
const blockUnblockCat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, "iam in repository of blkunblkcat");
        const result = yield models_1.Category.findById(id);
        if (!result) {
            console.log("Category not found");
            return null;
        }
        result.isBlocked = !result.isBlocked;
        yield result.save();
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.blockUnblockCat = blockUnblockCat;
