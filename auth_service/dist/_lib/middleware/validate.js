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
exports.validatefirstNameMiddleware = exports.validateConfirmPasswordMiddleware = exports.validatePasswordMiddleware = exports.validateUserNameMiddleware = exports.validateEmailMiddleware = void 0;
const yup = __importStar(require("yup"));
const httpStatusCode_1 = require("../common/httpStatusCode");
//Email Validation Schema
const emailSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email("Invalid email format")
        .required("Email is mandatory")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
});
//Password validation schema
const passwordSchema = yup.object({
    password: yup
        .string()
        .trim()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password cannot be longer than 40 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
});
//Username validation schema
const userNameSchema = yup.object({
    name: yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(20, "Username must not exceed 20 characters")
        .matches(/^[a-zA-Z0-9_ ]+$/, "Name can only contain alphanumeric characters, underscores, and spaces")
        .matches(/^[^\s].*[^\s]$/, "Name cannot start or end with spaces"),
});
//First name validation schema
const firstNameSchema = yup.object({
    firstName: yup.string()
        .trim()
        .required("Name is required")
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name must not exceed 20 characters")
        .matches(/^[a-zA-Z0-9_ ]+$/, "Name can only contain alphanumeric characters, underscores, and spaces")
});
//Confirm Password validation schema
const confirmPasswordSchema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Passwords do not match")
        .required("Confirm password is required"),
});
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res
                .status(httpStatusCode_1.httpStatusCode.BAD_REQUEST)
                .json({ success: false, message: error.errors });
        }
        else {
            res
                .status(httpStatusCode_1.httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: "Unexpected error occurred" });
        }
    }
});
exports.validateEmailMiddleware = validate(emailSchema);
exports.validateUserNameMiddleware = validate(userNameSchema);
exports.validatePasswordMiddleware = validate(passwordSchema);
exports.validateConfirmPasswordMiddleware = validate(confirmPasswordSchema);
exports.validatefirstNameMiddleware = validate(firstNameSchema);
