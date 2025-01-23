"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../_boot/config");
const generateAccessToken = (payload) => {
    const { _id, email, role } = payload;
    const newPayload = { _id, email, role };
    return jsonwebtoken_1.default.sign(newPayload, String(config_1.env_variables.ACCESS_TOKEN_SECRET), {
        expiresIn: "15m",
    });
};
exports.generateAccessToken = generateAccessToken;
