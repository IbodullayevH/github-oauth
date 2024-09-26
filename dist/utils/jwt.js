"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_mtd = exports.verify_mtd = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const secret_key = process.env.SECRET_KEY;
const sign_mtd = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret_key, { expiresIn });
};
exports.sign_mtd = sign_mtd;
const verify_mtd = (token) => {
    return jsonwebtoken_1.default.verify(token, secret_key);
};
exports.verify_mtd = verify_mtd;
