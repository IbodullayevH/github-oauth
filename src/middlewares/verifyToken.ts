import { ErrorHandler } from './../errors/index';
import { NextFunction, Request, Response } from 'express';
import { verify_mtd } from "../utils/index"
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let token = req.headers.access_token as string


        if (!token) {
            return res.status(404).send({
                success: false,
                message: "🧐 Token not available 🤷‍♂️",
            });
        }

        let data: any = verify_mtd(token)
        
        let { id } = data
        if (typeof id == "string") {
            let user = await prisma.users_db.findFirst({
                where: {
                    userId: id
                }
            })
    
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(404).send({
                    success: false,
                    message: "Not found user"
                })
            }
        }else{
            let user = await prisma.users_db.findUnique({
                where: {
                    id: id
                }
            })
    
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(404).send({
                    success: false,
                    message: "Not found user"
                })
            }
        }
       

    } catch (error: any) {
        next(new ErrorHandler(error.message, error.status))
    }
}