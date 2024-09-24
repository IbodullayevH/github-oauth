import { ErrorHandler } from "errors";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { redisClient } from "config";
let prisma = new PrismaClient()

export class AuthController {

    static async getLoginPage(req: Request, res: Response, next: NextFunction) {
        try {

            res.render("auth")
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
    static async getDashboard(req: Request, res: Response, next: NextFunction) {
        try {

            let user = req.user as any

            let displayName = user.profile.displayName
            let name = user.profile.name
            let emails = user.profile.emails
            let photos = user.profile.photos
            name = name.givenName
            emails = emails[0].value
            photos = photos[0].value

            let existName = await prisma.users_db.findFirst({
                where: {
                    name
                }
            })

            if (existName) {
                res.render("dashboard")
                return
            }
            let userAddDb = await prisma.users_db.create({
                data: {
                    displayName,
                    name,
                    emails,
                    photos
                }
            })
            await redisClient.set(`users_db:${userAddDb.id}`, JSON.stringify(userAddDb))
            res.render("dashboard")

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}