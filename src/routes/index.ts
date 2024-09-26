import { UserController, GithubAuthController, GoogleAuthController, RefreshTokenController } from "../controllers"
import { Router } from "express";
import { githubMiddleware, googleMiddleware, verifyToken } from "middlewares";

let router: Router = Router()


// Google
router.get("/", GoogleAuthController.getLoginPage)
router.get("/auth/google/login", googleMiddleware)
router.get("/auth/google/callback/1", googleMiddleware, GoogleAuthController.getDashboard)


// Github
router.get("/auth/github/login", githubMiddleware)
router.get("/oauth/github/callback", githubMiddleware, GithubAuthController.getDashboard)


// getme
router.get("/user/me", verifyToken, UserController.getMe)


// token
router.post("/refresh/token", RefreshTokenController.refreshAccessToken)

export default router