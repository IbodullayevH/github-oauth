"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
let prisma = new client_1.PrismaClient();
class RefreshTokenController {
    static refreshAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { refresh_token } = req.body;
                let data = (0, utils_1.verify_mtd)(refresh_token);
                if (typeof data.id === "string") {
                    let CheckUser = yield prisma.users_db.findFirst({
                        where: {
                            userId: data.id
                        }
                    });
                    if (!CheckUser) {
                        return res.status(200).send({
                            success: true,
                            message: "Not available user"
                        });
                    }
                    let access_token = (0, utils_1.sign_mtd)({ id: CheckUser.id }, '200s');
                    let new_refresh_token = (0, utils_1.sign_mtd)({ id: CheckUser.id }, '7d');
                    return res.status(200).send({
                        success: true,
                        message: "Token updating",
                        access_token: access_token,
                        new_refresh_token: new_refresh_token,
                    });
                }
                else {
                    let CheckUser = yield prisma.users_db.findUnique({
                        where: {
                            id: data.id
                        }
                    });
                    if (!CheckUser) {
                        return res.status(200).send({
                            success: true,
                            message: "Not available user"
                        });
                    }
                    let access_token = (0, utils_1.sign_mtd)({ id: CheckUser.id }, '200s');
                    let new_refresh_token = (0, utils_1.sign_mtd)({ id: CheckUser.id }, '7d');
                    return res.status(200).send({
                        success: true,
                        message: "Token updating",
                        access_token: access_token,
                        new_refresh_token: new_refresh_token,
                    });
                }
            }
            catch (error) {
                next(new errors_1.ErrorHandler(error.message, error.status));
            }
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
