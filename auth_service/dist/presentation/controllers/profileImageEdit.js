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
exports.profileImageEditController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const profileImageEditController = (dependencies) => {
    const { useCases: { profileImageEditUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { image, email } = req.body;
            // console.log(image,email,"iam in the controller of profile image edit")
            const result = yield profileImageEditUseCase(dependencies).execute(image, email);
            if (result) {
                res.status(httpStatusCode_1.httpStatusCode.OK).json({
                    success: true,
                    data: result,
                    message: "Profile image updated successfully",
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
exports.profileImageEditController = profileImageEditController;
