import express, { Application } from "express";
import { ErrorHandlerMiddleware } from "middlewares";
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import router from "routes";
import passport from "passport";
import "./config/passportConfig"
import { sessionFunc } from "utils";
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), "/public")))
app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "src", "views"))



app.use(sessionFunc())
app.use(passport.initialize());
app.use(passport.session());
app.use(router)



app.use("/*", ErrorHandlerMiddleware.errorHandlerMiddleware)
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server run:  http://localhost:${port}`)
})


