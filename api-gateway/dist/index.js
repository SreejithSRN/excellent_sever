"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./middleware/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 4000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const morganStream = {
    write: (message) => logger_1.logger.info(message.trim())
};
app.use((0, morgan_1.default)('combined', { stream: morganStream }));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
const routes = [
    // {path:"/api/user", serviceUrl:process.env.USER_SERVICE},
    { path: "/api/auth", serviceUrl: process.env.AUTH_SERVICE },
    { path: "/api/course", serviceUrl: process.env.COURSE_SERVICE },
    { path: "/api/notification", serviceUrl: process.env.NOTIFICATION_SERVICE },
    { path: "/api/payment", serviceUrl: process.env.PAYMENT_SERVICE },
    { path: "/api/chat", serviceUrl: process.env.CHAT_SERVICE },
];
routes.forEach((route) => {
    if (route.serviceUrl) {
        app.use(route.path, (0, express_http_proxy_1.default)(route.serviceUrl));
    }
});
app.listen(PORT, () => {
    console.log(`api-gateway sever is running on port : ${PORT}`);
});
