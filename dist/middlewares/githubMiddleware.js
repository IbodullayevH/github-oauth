"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const githubMiddleware = passport_1.default.authenticate("github", {
    scope: ["user:email"],
});
exports.githubMiddleware = githubMiddleware;
