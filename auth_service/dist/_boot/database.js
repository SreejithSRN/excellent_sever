"use strict";
// import mongoose from "mongoose";
// import { env_variables } from "./config";
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
// export default async () => {
//   try {
//     const mongoUrl = env_variables.MONGODB_URL;
//     if (!mongoUrl) {
//       throw new Error(" MongoDB Connection String not available");
//     }
//     let Connection = await mongoose.connect(mongoUrl.trim());
//     if (Connection) {
//       console.log("MongoDB_Auth_Service connected Successfully");
//     }
//   } catch (error: any) {
//     console.error("MongoDB_Auth_Service connection failed");
//     console.error(error.message);
//     process.exit(1);
//   }
// };
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUrl = config_1.env_variables.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error("MongoDB Connection String not available");
        }
        const connection = yield mongoose_1.default.connect(mongoUrl.trim());
        console.log("MongoDB_Auth_Service connected Successfully");
    }
    catch (error) {
        console.error("MongoDB_Auth_Service connection failed");
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        process.exit(1);
    }
});
