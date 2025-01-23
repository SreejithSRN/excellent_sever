"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        requiredL: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});
exports.Category = (0, mongoose_1.model)("categories", categorySchema);
