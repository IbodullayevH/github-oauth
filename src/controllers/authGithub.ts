import { PrismaClient } from "@prisma/client"
import { redisClient } from "config"
import { ErrorHandler } from "errors"
import { NextFunction, Request, Response } from "express"
import { sign_mtd } from "utils"
let prisma = new PrismaClient()


export class GithubAuthController {
    static async getLoginPage(req: Request, res: Response, next: NextFunction) {
        try {

            res.render("auth")
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async getDashboard(req: Request, res: Response, next: NextFunction) {

        try {
            const user = req.user as any
            let userId = user.id
            let displayName = user.displayName
            let username = user.username
            let profileUrl = user.profileUrl
            let emails = user.emails
            let photos = user.photos

            emails = emails[0].value
            photos = photos[0].value

            let existEmail = await prisma.users_db.findFirst({
                where: {
                    emails
                }
            })

            if (existEmail) {
                let access_token = sign_mtd({ id: user.id }, '200s')
                let refresh_token = sign_mtd({ id: user.id }, '7d')

                return res.status(200).send({
                    success: true,
                    message: "Successfully login",
                    access_token: access_token,
                    refresh_token: refresh_token,
                    email: emails
                })

            }


            let userAddDb = await prisma.users_db.create({
                data: {
                    userId,
                    displayName,
                    username,
                    profileUrl,
                    emails,
                    photos
                }
            })
            await redisClient.set(`users_db:${userAddDb.id}`, JSON.stringify(userAddDb))
            let access_token = sign_mtd({ id: userId }, "200s")
            let refresh_token = sign_mtd({ id: userId }, "7d")

            res.status(200).send({
                success: true,
                message: "Successfully registred",
                access_token: access_token,
                refresh_token: refresh_token
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))

        }
    }
}


