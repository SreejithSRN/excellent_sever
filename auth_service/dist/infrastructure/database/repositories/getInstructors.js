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
exports.getInstructors = void 0;
const models_1 = require("../models");
const getInstructors = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validPage = page && page > 0 ? page : 1;
        const validLimit = limit && limit > 0 ? limit : 10;
        const skipNo = (validPage - 1) * validLimit;
        const [data, totalCount] = yield Promise.all([
            models_1.User.find({ role: "instructor" })
                .sort({ updatedAt: "descending" })
                .skip(skipNo)
                .limit(validLimit),
            models_1.User.countDocuments({ role: "instructor" }),
        ]);
        return { data, totalCount };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
});
exports.getInstructors = getInstructors;
