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
exports.createUser = void 0;
const models_1 = require("../models");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = Object.assign(Object.assign({}, data), { isRejected: data.role === "instructor", isRequested: data.role === "instructor", isVerified: data.role === "student" });
        console.log("Processed user data:", updatedData);
        const newUser = yield models_1.User.create(updatedData);
        console.log("New user data:", newUser);
        return newUser ? newUser : null;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log("Something went wrong in user creation");
        }
        return null;
    }
});
exports.createUser = createUser;
