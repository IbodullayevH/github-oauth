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
exports.GoogleAuthController = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
let prisma = new client_1.PrismaClient();
class GoogleAuthController {
    static getLoginPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("auth");
            }
            catch (error) {
                next(new errors_1.ErrorHandler(error.message, error.status));
            }
        });
    }
    static getDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.user;
                let displayName = user.profile.displayName;
                let userId = user.profile.id;
                let emails = user.profile.emails;
                let photos = user.profile.photos;
                emails = emails[0].value;
                photos = photos[0].value;
                let existEmail = yield prisma.users_db.findFirst({
                    where: {
                        emails
                    }
                });
                if (existEmail) {
                    let access_token = (0, utils_1.sign_mtd)({ id: user.profile.id }, "200s");
                    let refresh_token = (0, utils_1.sign_mtd)({ id: user.profile.id }, "7d");
                    return res.status(200).send({
                        success: true,
                        message: "Successfully login",
                        access_token: access_token,
                        refresh_token: refresh_token,
                        email: emails
                    });
                }
                else {
                    let userAddDb = yield prisma.users_db.create({
                        data: {
                            displayName,
                            userId,
                            emails,
                            photos
                        }
                    });
                    yield config_1.redisClient.set(`users_db:${userAddDb.id}`, JSON.stringify(userAddDb));
                    let access_token = (0, utils_1.sign_mtd)({ id: user.profile.id }, "200s");
                    let refresh_token = (0, utils_1.sign_mtd)({ id: user.profile.id }, "7d");
                    res.status(200).send({
                        success: true,
                        message: "Successfully registred",
                        access_token: access_token,
                        refresh_token: refresh_token
                    });
                }
            }
            catch (error) {
                next(new errors_1.ErrorHandler(error.message, error.status));
            }
        });
    }
}
exports.GoogleAuthController = GoogleAuthController;
