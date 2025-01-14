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
exports.verifyToken = void 0;
const index_1 = require("./../errors/index");
const index_2 = require("../utils/index");
const client_1 = require("@prisma/client");
let prisma = new client_1.PrismaClient();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.access_token;
        if (!token) {
            return res.status(404).send({
                success: false,
                message: "🧐 Token not available 🤷‍♂️",
            });
        }
        let data = (0, index_2.verify_mtd)(token);
        let { id } = data;
        if (typeof id == "string") {
            let user = yield prisma.users_db.findFirst({
                where: {
                    userId: id
                }
            });
            if (user) {
                req.user = user;
                next();
            }
            else {
                return res.status(404).send({
                    success: false,
                    message: "Not found user"
                });
            }
        }
        else {
            let user = yield prisma.users_db.findUnique({
                where: {
                    id: id
                }
            });
            if (user) {
                req.user = user;
                next();
            }
            else {
                return res.status(404).send({
                    success: false,
                    message: "Not found user"
                });
            }
        }
    }
    catch (error) {
        next(new index_1.ErrorHandler(error.message, error.status));
    }
});
exports.verifyToken = verifyToken;
