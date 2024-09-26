import jwt from "jsonwebtoken"
import "dotenv/config"
const secret_key = process.env.SECRET_KEY as string

const sign_mtd = (payload: object, expiresIn: string): string => {
    return jwt.sign(payload, secret_key, { expiresIn })
}

const verify_mtd = (token: string) => {
    return jwt.verify(token, secret_key)
}

export { verify_mtd, sign_mtd }