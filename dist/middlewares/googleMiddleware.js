"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const googleMiddleware = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent"
});
exports.googleMiddleware = googleMiddleware;
