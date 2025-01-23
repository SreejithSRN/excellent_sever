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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student",
    },
    profile: {
        avatar: {
            type: String,
            default: "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png",
        },
        dateOfBirth: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            enum: ["male", "female", "other", ""],
            default: ""
        },
    },
    contact: {
        address: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        social: {
            linkedin: {
                type: String,
                default: "",
            },
            github: {
                type: String,
                default: "",
            },
            instagram: {
                type: String,
                default: "",
            },
        },
    },
    profession: {
        enum: ["student", "working", "not working"],
        type: String,
    },
    qualification: {
        enum: ["sslc", "pre_degree", "bachelor_degree", "post_graduate", "mca", "bca", "other"],
        type: String,
    },
    cv: {
        type: String,
    },
    profit: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isRequested: {
        type: Boolean,
        default: false,
    },
    isGAuth: {
        type: Boolean,
        default: false,
    },
    isRejected: {
        type: Boolean,
        default: false,
    },
    lastLoginDate: {
        type: Date,
    },
    loginStreak: {
        type: Number,
        default: 0,
    },
    weeklyLogins: {
        type: [Boolean],
        default: [false, false, false, false, false, false, false],
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("User", userSchema);
