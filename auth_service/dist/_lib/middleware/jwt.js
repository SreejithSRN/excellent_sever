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
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const jwt_1 = require("../utility/jwt");
const config_1 = require("../../_boot/config");
const httpStatusCode_1 = require("../common/httpStatusCode");
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
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refresh_token } = req.cookies;
        let user = null;
        if (access_token) {
            console.log("iam here");
            user = verifyToken(access_token, config_1.env_variables.ACCESS_TOKEN_SECRET);
        }
        if (!user && refresh_token) {
            user = verifyToken(refresh_token, config_1.env_variables.REFRESH_TOKEN_SECRET);
            if (user) {
                const newAccessToken = (0, jwt_1.generateAccessToken)({
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                });
                res.cookie("acces_token", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
            }
        }
        if (!user) {
            return res
                .status(httpStatusCode_1.httpStatusCode.UNAUTHORIZED)
                .json({ message: "Unauthorized, please login again" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in JWT middleware:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.jwtMiddleware = jwtMiddleware;
