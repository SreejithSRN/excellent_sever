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
exports.findByEmailUseCase = void 0;
const findByEmailUseCase = (dependencies) => {
    const { repositories: { findByEmail }, } = dependencies;
    return {
        execute: (email) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield findByEmail(email);
            }
            catch (error) {
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Email search failed");
            }
        }),
    };
};
exports.findByEmailUseCase = findByEmailUseCase;
