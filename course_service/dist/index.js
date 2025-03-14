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
const consumer_1 = require("./_boot/consumer");
const database_1 = __importDefault(require("./_boot/database"));
const server_1 = __importDefault(require("./presentation/server"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server_1.default;
        yield Promise.all([(0, database_1.default)(), (0, consumer_1.startConsumer)()]);
        //  Handle shutdown
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Shutting down gracefully...");
            yield (0, consumer_1.stopConsumer)();
            process.exit(0);
        }));
        process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Shutting down gracefully...");
            yield (0, consumer_1.stopConsumer)();
            process.exit(0);
        }));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error((error === null || error === void 0 ? void 0 : error.message) || 'An error occurred');
        }
        else {
            console.error('An error occurred');
        }
        process.exit(1);
    }
}))();
// import database from "./_boot/database"
// import server from "./presentation/server"
// (async ()=>{
//     try {
//         server
//         await database()
//         console.log("Course Server and  Course database started successfully")
//     } catch (error:any) {
//         console.error(error?.message|| "An error occured")     
//         process.exit(1)   
//     }
// })();
