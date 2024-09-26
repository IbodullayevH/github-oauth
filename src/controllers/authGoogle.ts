import { ErrorHandler } from "errors";
import { NextFunction, Request, Response } from "express";
import { PrismaClient, users_db } from "@prisma/client"
import { redisClient } from "config";
import { sign_mtd } from "utils";
let prisma = new PrismaClient()

export class GoogleAuthController {

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
            let userId = user.profile.id
            let emails = user.profile.emails
            let photos = user.profile.photos

            emails = emails[0].value
            photos = photos[0].value

            let existEmail = await prisma.users_db.findFirst({
                where: {
                    emails
                }
            })

            if (existEmail) {

                let access_token = sign_mtd({ id: user.profile.id }, "200s")
                let refresh_token = sign_mtd({ id: user.profile.id }, "7d")

                return res.status(200).send({
                    success: true,
                    message: "Successfully login",
                    access_token: access_token,
                    refresh_token: refresh_token,
                    email: emails
                })

            } else {
                let userAddDb = await prisma.users_db.create({
                    data: {
                        displayName,
                        userId,
                        emails,
                        photos
                    }
                })
                await redisClient.set(`users_db:${userAddDb.id}`, JSON.stringify(userAddDb))
                let access_token = sign_mtd({ id: user.profile.id }, "200s")
                let refresh_token = sign_mtd({ id: user.profile.id }, "7d")

                res.status(200).send({
                    success: true,
                    message: "Successfully registred",
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            }

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}