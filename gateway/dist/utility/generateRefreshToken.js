"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const config_1 = require("../boot/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, String(config_1.env_variables.REFRESH_TOKEN_SECRET), {
        expiresIn: "15d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
