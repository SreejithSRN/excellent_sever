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
exports.profileEdit = void 0;
const models_1 = require("../models");
const profileEdit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield models_1.User.findOneAndUpdate({ email: data.email }, {
            $set: {
                firstName: data.firstName,
                lastName: data.lastName,
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                profile: data.profile,
                contact: data.contact,
                profession: data.profession || "not working",
                cv: data.cv,
                isOtpVerified: true,
                isVerified: data.isVerified,
                isBlocked: data.isBlocked,
                isRequested: data.isRequested,
                isGAuth: data.isGAuth,
                isRejected: data.isRejected,
                lastLoginDate: data.lastLoginDate,
                loginStreak: data.loginStreak,
                weeklyLogins: data.weeklyLogins,
            },
        }, {
            upsert: true,
            runValidators: true,
            new: true,
        });
        if (updatedUser) {
            return updatedUser;
        }
        else {
            return null;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.profileEdit = profileEdit;
