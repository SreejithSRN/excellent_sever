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
exports.resendOtpController = void 0;
const generateOtp_1 = require("../../_lib/utility/otp/generateOtp");
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const sendOtp_1 = require("../../_lib/utility/otp/sendOtp");
const resendOtpController = (dependencies) => {
    const { useCases } = dependencies;
    const { resendOtpUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const otp = yield (0, generateOtp_1.generateOTP)();
            const result = yield resendOtpUseCase(dependencies).execute(email, otp);
            console.log("your current otp =>", otp);
            if (!result) {
                res.status(httpStatusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    data: {},
                    message: "Resend otp Creation is failed!",
                });
            }
            else {
                yield (0, sendOtp_1.sendOTP)(email, otp);
                res.status(httpStatusCode_1.httpStatusCode.OK).json({
                    success: true,
                    data: {},
                    message: "Resent OTP send  successfully",
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    });
};
exports.resendOtpController = resendOtpController;
