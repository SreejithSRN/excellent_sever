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
exports.getInstructorsController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const getInstructorsController = (dependencies) => {
    const { useCases } = dependencies;
    const { getInstructorsUseCase } = useCases;
    const isValidNumber = (value) => !isNaN(parseInt(value, 10));
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.query, "Incoming request to getInstructors...");
            const page = req.query.page ? parseInt(req.query.page, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            if (!isValidNumber(page)) {
                res.status(httpStatusCode_1.httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid page number",
                });
                return;
            }
            if (!isValidNumber(limit)) {
                res.status(httpStatusCode_1.httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid limit number",
                });
                return;
            }
            const result = yield getInstructorsUseCase(dependencies).execute(page, limit);
            if (!result) {
                res.status(404).json({ success: false, message: "No Instructors found" });
                return;
            }
            console.log(`Fetched result for page ${page} and limit ${limit}:`, result);
            const { data, totalCount } = result;
            res.status(httpStatusCode_1.httpStatusCode.OK).json({
                success: true,
                data, totalCount,
                message: "All Instructors fetched successfully",
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    });
};
exports.getInstructorsController = getInstructorsController;
