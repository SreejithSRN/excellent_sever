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
exports.checkByName = void 0;
const models_1 = require("../models");
const checkByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userNameExist = yield models_1.User.findOne({ name });
        if (userNameExist) {
            return true;
        }
        return false;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.checkByName = checkByName;
