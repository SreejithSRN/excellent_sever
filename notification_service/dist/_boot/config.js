"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_variables = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env_variables = {
    PORT: process.env.PORT,
    USERMAIL: String(process.env.USERMAIL),
    USERSECRET: String(process.env.USERSECRET)
};
