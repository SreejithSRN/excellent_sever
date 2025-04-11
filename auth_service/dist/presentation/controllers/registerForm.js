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
exports.registerFormController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const registerFormController = (dependencies) => {
    const { useCases } = dependencies;
    const { registerFormUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data, "iam from registerForm Controller...............");
            // console.log(req.body,"iam from registerForm Controller")
            const result = yield registerFormUseCase(dependencies).execute(data);
            // if (result){
            //   res.status(httpStatusCode.OK).json({
            //           success: true,
            //           data: {},
            //           message: "Form registration successful",
            //         });
            // }
            if (result) {
                // ✅ Clear tokens after successful registration
                res.clearCookie("access_token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res.clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res.status(httpStatusCode_1.httpStatusCode.OK).json({
                    success: true,
                    data: {},
                    message: "Form registration successful",
                });
                return;
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
exports.registerFormController = registerFormController;
