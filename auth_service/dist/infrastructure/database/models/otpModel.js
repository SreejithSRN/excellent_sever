"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: String || Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30,
    },
}, {
    timestamps: true,
});
exports.OTP = (0, mongoose_1.model)("Otp", otpSchema);
