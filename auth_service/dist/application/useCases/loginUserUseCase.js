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
exports.loginUserUseCase = void 0;
const comparePassword_1 = require("../../_lib/utility/bcrypt/comparePassword");
const loginUserUseCase = (dependencies) => {
    const { repositories: { findByEmail }, } = dependencies;
    return {
        execute: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield findByEmail(email);
                if (!user) {
                    return "Email not found, please signup or try with registered email ";
                }
                const isMatch = yield (0, comparePassword_1.comparePassword)(password, user.password);
                if (!isMatch) {
                    return "Incorrect Password, please try again";
                }
                return user;
            }
            catch (error) {
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Login user failed");
            }
        }),
    };
};
exports.loginUserUseCase = loginUserUseCase;
