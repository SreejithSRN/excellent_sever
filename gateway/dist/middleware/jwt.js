"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.roleAuthMiddleware = void 0;
const utility_1 = require("../utility");
const httpStatusCode_1 = require("../utility/httpStatusCode");
const config_1 = require("../boot/config");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError || err instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.error(`Error verifying token: ${err.message}`);
            return null;
        }
        throw err;
    }
};
const roleAuthMiddleware = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refresh_token } = req.cookies;
        // Check if no tokens are present
        if (!access_token && !refresh_token) {
            return res.status(httpStatusCode_1.httpStatusCode.UNAUTHORIZED).json({
                message: "Unauthorized, please login again",
            });
        }
        let user = null;
        // Verify access token
        if (access_token) {
            user = verifyToken(access_token, config_1.env_variables.ACCESS_TOKEN_SECRET);
        }
        // Verify refresh token if access token is invalid
        if (!user && refresh_token) {
            user = verifyToken(refresh_token, config_1.env_variables.REFRESH_TOKEN_SECRET);
            if (user) {
                const newAccessToken = (0, utility_1.generateAccessToken)({
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                });
                res.cookie("access_token", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                });
                // Assign new token to user
                user = verifyToken(newAccessToken, config_1.env_variables.ACCESS_TOKEN_SECRET);
            }
        }
        // If still no user, reject
        if (!user) {
            return res.status(httpStatusCode_1.httpStatusCode.UNAUTHORIZED).json({
                message: "Unauthorized, please login again",
            });
        }
        //  Role-based authentication
        if (role && user.role !== role) {
            return res.status(httpStatusCode_1.httpStatusCode.FORBIDDEN).json({
                message: "Unauthorized, insufficient permissions.",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in JWT middleware:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.roleAuthMiddleware = roleAuthMiddleware;
