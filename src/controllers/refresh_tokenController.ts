import { ErrorHandler } from "../errors"
import { NextFunction, Request, Response } from "express"
import { sign_mtd, verify_mtd } from "../utils"
import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient()

export class RefreshTokenController {
    static async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            let { refresh_token } = req.body

            let data: any = verify_mtd(refresh_token)

            if (typeof data.id === "string") {
                let CheckUser = await prisma.users_db.findFirst({
                    where: {
                        userId: data.id
                    }
                })

                if (!CheckUser) {
                    return res.status(200).send({
                        success: true,
                        message: "Not available user"
                    })
                }
                let access_token = sign_mtd({ id: CheckUser.id }, '200s')
                let new_refresh_token = sign_mtd({ id: CheckUser.id }, '7d')

                return res.status(200).send({
                    success: true,
                    message: "Token updating",
                    access_token: access_token,
                    new_refresh_token: new_refresh_token,
                })
            } else {
                let CheckUser = await prisma.users_db.findUnique({
                    where: {
                        id: data.id
                    }
                })

                if (!CheckUser) {
                    return res.status(200).send({
                        success: true,
                        message: "Not available user"
                    })
                }
                let access_token = sign_mtd({ id: CheckUser.id }, '200s')
                let new_refresh_token = sign_mtd({ id: CheckUser.id }, '7d')

                return res.status(200).send({
                    success: true,
                    message: "Token updating",
                    access_token: access_token,
                    new_refresh_token: new_refresh_token,
                })
            }




        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

}
