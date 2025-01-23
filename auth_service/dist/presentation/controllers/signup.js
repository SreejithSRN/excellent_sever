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
exports.signupController = void 0;
const hashpassword_1 = require("../../_lib/utility/bcrypt/hashpassword");
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const generateOtp_1 = require("../../_lib/utility/otp/generateOtp");
const sendOtp_1 = require("../../_lib/utility/otp/sendOtp");
const signupController = (dependencies) => {
    const { useCases } = dependencies;
    const { createOtpUseCase, findByEmailUseCase, checkByNameUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            req.body.password = yield (0, hashpassword_1.hashPassword)(req.body.password);
            const { email, name, password, role } = req.body;
            const emailResult = yield findByEmailUseCase(dependencies).execute(email);
            if (emailResult) {
                res.status(httpStatusCode_1.httpStatusCode.CONFLICT).json({
                    success: false,
                    message: "Email already registered. Try alternative",
                });
                return;
            }
            const nameResult = yield checkByNameUseCase(dependencies).execute(name);
            if (nameResult) {
                res.status(httpStatusCode_1.httpStatusCode.CONFLICT).json({
                    success: false,
                    message: "UserName already taken. Try alternative",
                });
                return;
            }
            const otp = yield (0, generateOtp_1.generateOTP)();
            console.log("Your Current OTP =>", otp);
            const otpCreate = yield createOtpUseCase(dependencies).execute(email, otp);
            delete req.body.confirmPassword;
            console.log(req.body);
            if (!otpCreate) {
                res
                    .status(httpStatusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Otp creation failed" });
            }
            else {
                yield (0, sendOtp_1.sendOTP)(email, otp);
                res
                    .status(httpStatusCode_1.httpStatusCode.OK)
                    .json({ success: true, message: "Otp Created", data: req.body });
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
exports.signupController = signupController;
