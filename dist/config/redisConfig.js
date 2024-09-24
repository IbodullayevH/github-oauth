"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_1 = require("redis");
let redisClient = (0, redis_1.createClient)();
exports.redisClient = redisClient;
redisClient.on("error", () => {
    console.log("err");
});
redisClient.connect().catch((err) => {
    console.log(`redis connected: ${err}`);
});
