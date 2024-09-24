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
exports.AuthController = void 0;
const errors_1 = require("../errors");
const client_1 = require("@prisma/client");
const config_1 = require("../config");
let prisma = new client_1.PrismaClient();
class AuthController {
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
                let name = user.profile.name;
                let emails = user.profile.emails;
                let photos = user.profile.photos;
                name = name.givenName;
                emails = emails[0].value;
                photos = photos[0].value;
                let existName = yield prisma.users_db.findFirst({
                    where: {
                        name
                    }
                });
                if (existName) {
                    res.render("dashboard");
                    return;
                }
                let userAddDb = yield prisma.users_db.create({
                    data: {
                        displayName,
                        name,
                        emails,
                        photos
                    }
                });
                yield config_1.redisClient.set(`users_db:${userAddDb.id}`, JSON.stringify(userAddDb));
                res.render("dashboard");
            }
            catch (error) {
                next(new errors_1.ErrorHandler(error.message, error.status));
            }
        });
    }
}
exports.AuthController = AuthController;
