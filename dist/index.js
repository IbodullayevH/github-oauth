"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
require("./config/passportConfig");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "/public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(process.cwd(), "src", "views"));
app.use((0, utils_1.sessionFunc)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(routes_1.default);
app.use("/*", middlewares_1.ErrorHandlerMiddleware.errorHandlerMiddleware);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server run:  http://localhost:${port}`);
});
