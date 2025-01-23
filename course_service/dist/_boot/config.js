"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_variables = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env_variables = {
    PORT: process.env.PORT,
    // FRONTEND_URL:process.env.FRONTEND_URL,
    MONGODB_URL: process.env.MONGODB_URL,
};
