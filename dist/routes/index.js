"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
let router = (0, express_1.Router)();
// Google
router.get("/", controllers_1.GoogleAuthController.getLoginPage);
router.get("/auth/google/login", middlewares_1.googleMiddleware);
router.get("/auth/google/callback/1", middlewares_1.googleMiddleware, controllers_1.GoogleAuthController.getDashboard);
// Github
router.get("/auth/github/login", middlewares_1.githubMiddleware);
router.get("/oauth/github/callback", middlewares_1.githubMiddleware, controllers_1.GithubAuthController.getDashboard);
// getme
router.get("/user/me", middlewares_1.verifyToken, controllers_1.UserController.getMe);
// token
router.post("/refresh/token", controllers_1.RefreshTokenController.refreshAccessToken);
exports.default = router;
