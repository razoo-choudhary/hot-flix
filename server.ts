import express from "express"
import * as core from "express-serve-static-core"
import * as dotenv from "dotenv"
import {DatabaseConfig} from "./config/database";
import {AuthMiddleware} from "./application/http/middlewares/auth.middleware";

export class Server {

    app : core.Application = express()

    initializeServer () {
        dotenv.config( { path : __dirname + "/.env"} )
        DatabaseConfig.Init().then( () => {
            AuthMiddleware.Init()
        })
    }
}