import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors";

export class UserController {
    static async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            
            let user = req.user

            res.status(200).send({
                success:true,
                message:'Success!',
                data:user
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}