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
exports.loginUserController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const jwt_1 = require("../../_lib/utility/jwt");
const loginUserController = (dependencies) => {
    const { useCases } = dependencies;
    const { loginUserUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const result = yield loginUserUseCase(dependencies).execute(email, password);
            if (typeof result === "string") {
                res
                    .status(httpStatusCode_1.httpStatusCode.BAD_REQUEST)
                    .json({ success: false, message: result });
                return;
            }
            if (result === null || result === void 0 ? void 0 : result.isBlocked) {
                res.status(httpStatusCode_1.httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Your account is disabled by Excellent Team, please send mail for further information",
                });
                return;
            }
            ////neeed to check the condition after the form
            if ((result === null || result === void 0 ? void 0 : result.isOtpVerified) && (result === null || result === void 0 ? void 0 : result.isRequested) && (result === null || result === void 0 ? void 0 : result.isRejected)) {
                res.status(httpStatusCode_1.httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Account verification under processing. Please try later",
                });
                return;
            }
            const accessToken = (0, jwt_1.generateAccessToken)({
                _id: String(result === null || result === void 0 ? void 0 : result._id),
                email: result === null || result === void 0 ? void 0 : result.email,
                role: result === null || result === void 0 ? void 0 : result.role,
            });
            const refreshToken = (0, jwt_1.generateRefreshToken)({
                _id: String(result === null || result === void 0 ? void 0 : result._id),
                email: result === null || result === void 0 ? void 0 : result.email,
                role: result === null || result === void 0 ? void 0 : result.role,
            });
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(httpStatusCode_1.httpStatusCode.OK).json({
                success: true,
                data: result,
                message: "User logged in successfully",
            });
            console.log(result, "iam from login controller ...........");
            return;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    });
};
exports.loginUserController = loginUserController;
