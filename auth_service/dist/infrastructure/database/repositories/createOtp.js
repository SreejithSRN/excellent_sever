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
exports.createOtp = void 0;
const models_1 = require("../models");
const createOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpExist = yield models_1.OTP.findOne({ email });
        let res;
        if (otpExist) {
            res = yield models_1.OTP.updateOne({ email }, { $set: { otp, createdAt: Date.now() } });
        }
        else {
            res = yield models_1.OTP.create({ email, otp });
        }
        if (!res) {
            throw new Error("Otp creation?update failed");
        }
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
});
exports.createOtp = createOtp;
