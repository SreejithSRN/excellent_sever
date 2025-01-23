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
exports.passwordChangeUseCase = void 0;
const comparePassword_1 = require("../../_lib/utility/bcrypt/comparePassword");
const passwordChangeUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const { passwordChange, findByEmail } = repositories;
    return {
        execute: (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield findByEmail(data.email);
                if (!user) {
                    return "User not found";
                }
                const isMatch = yield (0, comparePassword_1.comparePassword)(data.currentPassword, user.password);
                if (!isMatch) {
                    return "Current Password Mismatch, please try again";
                }
                const result = yield passwordChange(data);
                if (result) {
                    return result;
                }
                else {
                    throw new Error("something went wrong while updating");
                }
            }
            catch (error) {
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Error in checking with name");
            }
        }),
    };
};
exports.passwordChangeUseCase = passwordChangeUseCase;
