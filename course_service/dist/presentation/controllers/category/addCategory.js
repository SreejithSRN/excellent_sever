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
exports.addCategoryController = void 0;
const httpStatusCode_1 = require("../../../_lib/common/httpStatusCode");
const addCategoryController = (dependencies) => {
    const { useCases: { addCategoryUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "iam here in addcategory controller");
            const response = yield addCategoryUseCase(dependencies).execute(req.body);
            console.log(response, "response from addcategory controller");
            res.status(httpStatusCode_1.httpStatusCode.OK).json({
                success: true,
                data: response,
                message: "Category created succesfully!",
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in add Category");
        }
    });
};
exports.addCategoryController = addCategoryController;
