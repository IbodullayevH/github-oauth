import { AuthController } from "controllers";
import { Router } from "express";
import { passportMiddlewareFunc } from "middlewares";

let router: Router = Router()

router.get("/", AuthController.getLoginPage)
router.get("/auth/google/login", passportMiddlewareFunc())
router.get("/auth/google/callback/1", passportMiddlewareFunc(), AuthController.getDashboard)

export default router