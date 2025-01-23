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
exports.getUserDataController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const getUserDataController = (dependencies) => {
    const { useCases } = dependencies;
    const { findByEmailUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                throw new Error("Authentication required:please provide user details");
            }
            const response = yield findByEmailUseCase(dependencies).execute(req.user.email);
            console.log("hai iam here in getuserdata controller", response);
            if (!response) {
                throw new Error("User not found");
            }
            res
                .status(httpStatusCode_1.httpStatusCode.OK)
                .json({ success: true, data: response, message: "User exist" });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    });
};
exports.getUserDataController = getUserDataController;
