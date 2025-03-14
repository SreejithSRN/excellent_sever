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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpController = void 0;
const httpStatusCode_1 = require("../../_lib/common/httpStatusCode");
const userCreatedProducer_1 = __importDefault(require("../../infrastructure/kafka/producer/userCreatedProducer"));
const verifyOtpController = (dependencies) => {
    const { useCases } = dependencies;
    const { verifyOtpUseCase, createUserUseCase } = useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, data } = req.body;
            const result = yield verifyOtpUseCase(dependencies).execute(otp, data.email);
            if (!result) {
                res
                    .status(httpStatusCode_1.httpStatusCode.BAD_REQUEST)
                    .json({ success: false, message: "Otp mismatch please try again!" });
                return;
            }
            const newUser = yield createUserUseCase(dependencies).execute(data);
            if (!newUser) {
                res
                    .status(httpStatusCode_1.httpStatusCode.BAD_REQUEST)
                    .json({ success: false, message: "User Creation failed" });
                return;
            }
            yield (0, userCreatedProducer_1.default)(newUser);
            console.log("I reached here after kafka produce");
            res.status(httpStatusCode_1.httpStatusCode.OK).json({
                success: true,
                message: "User Creation Successfully",
                data: newUser,
            });
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
exports.verifyOtpController = verifyOtpController;
