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
exports.approveReject = void 0;
const messageServiceProducer_1 = __importDefault(require("../../kafka/producer/messageServiceProducer"));
const models_1 = require("../models");
const approveReject = (email, reason) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(email, reason, "iam in the reppoooooooooooo");
        const result = yield models_1.User.findOne({ email });
        if (!result) {
            console.log("User not found");
            return null;
        }
        result.isRejected = !result.isRejected;
        result.isVerified = !result.isVerified;
        if (reason != "") {
            result.messages = (_a = result.messages) !== null && _a !== void 0 ? _a : { rejection: "" };
            result.messages.rejection = reason;
        }
        else {
            result.messages = { rejection: "" };
            result.messages.rejection = reason;
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        console.log(">>>>>>>>>>>>iam here in repo approve reject>>>>>>>>>>>", result);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        yield result.save();
        const data = {
            senderId: "admin-Excellent",
            receiverId: result.email,
            content: result.isRejected
                ? `Your instructor request has been rejected. Reason: ${reason}`
                : `Your instructor request has been approved. Welcome aboard!`,
            timestamp: new Date().toISOString(), // optional
        };
        yield (0, messageServiceProducer_1.default)(data);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.approveReject = approveReject;
