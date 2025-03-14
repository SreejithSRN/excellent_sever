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
exports.profileImageEdit = void 0;
const userCreatedProducer_1 = __importDefault(require("../../kafka/producer/userCreatedProducer"));
const models_1 = require("../models");
const profileImageEdit = (image, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(image, email, "iam in the repository of profile image edit");
        const result = yield models_1.User.findOneAndUpdate({ email: email }, { $set: { "profile.avatar": image } }, { new: true });
        if (result) {
            yield (0, userCreatedProducer_1.default)(result);
            return result;
        }
        else {
            return false;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.profileImageEdit = profileImageEdit;
