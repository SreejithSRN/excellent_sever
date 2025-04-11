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
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../_boot/config");
const sendOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        port: 465,
        service: "Gmail",
        auth: {
            user: config_1.env_variables.USERMAIL,
            pass: config_1.env_variables.USERSECRET,
        },
        secure: true,
    });
    const message = "Enter this OTP to continue ";
    const mailData = {
        from: "excellent@gmail.com",
        to: email,
        subject: "OTP from Excellent",
        html: `<p>${message}</p> <p style='color: red; font-size: 25px; letter-spacing: 2px'><b>${otp}</b></p>`,
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (error) => {
            if (error) {
                console.log("Error occurred while sending the OTP", error);
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    });
});
exports.sendOTP = sendOTP;
