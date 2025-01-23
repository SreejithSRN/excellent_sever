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
exports.profileEditUseCase = void 0;
const profileEditUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const { profileEdit } = repositories;
    return {
        execute: (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(data, "iam fro profile edit use case ...........today");
                const result = yield profileEdit(data);
                if (result) {
                    return result;
                }
                else {
                    throw new Error("something went wrong while updating");
                }
            }
            catch (error) {
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Error in checking with name");
            }
        }),
    };
};
exports.profileEditUseCase = profileEditUseCase;
