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
exports.approveRejectController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const approveRejectController = (dependencies) => {
    const { useCases } = dependencies;
    const { approveRejectUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, reason } = req.body;
            const result = yield approveRejectUseCase(dependencies).execute(email, reason);
            console.log(result, "iam in approveReject controller..........");
            res.status(httpStatusCode_1.httpStatusCode.OK).json({
                success: true,
                data: {},
                message: "Approved/reject successful",
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
exports.approveRejectController = approveRejectController;
