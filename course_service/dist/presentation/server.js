"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("../_boot/config");
const logger_1 = require("../_lib/middleware/logger");
const dependencies_1 = require("../_boot/dependencies");
const httpStatusCode_1 = require("../_lib/common/httpStatusCode");
const routers_1 = require("../infrastructure/routers");
const app = (0, express_1.default)();
const PORT = Number(config_1.env_variables.PORT || 4002);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const morganStream = {
    write: (message) => logger_1.logger.info(message.trim())
};
app.use((0, morgan_1.default)('combined', { stream: morganStream }));
app.use("/", (0, routers_1.routes)(dependencies_1.dependencies));
app.all("*", (req, res) => {
    res.status(httpStatusCode_1.httpStatusCode.NOT_FOUND).json({ sussess: false, status: httpStatusCode_1.httpStatusCode.NOT_FOUND, message: "Course_API not found" });
});
app.listen(PORT, () => {
    console.log(`Course service is running on port ${config_1.env_variables.PORT}`);
});
exports.default = app;
