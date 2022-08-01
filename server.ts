import express from "express"
import * as core from "express-serve-static-core"
import * as dotenv from "dotenv"
import {DatabaseConfig} from "./config/database";
import {AuthMiddleware} from "./application/middlewares/auth.middleware";
import {Mailing} from "./config/mailing";
import {Scripts} from "./scripts/Scripts";
import {FfmpegConfig} from "./config/ffmpeg";

export class Server {

    app : core.Application = express()

    initializeServer () {
        dotenv.config( { path : __dirname + "/.env"} )
        AuthMiddleware.Init()
        DatabaseConfig.Init().then( () => {
            Mailing.Init()
            FfmpegConfig.Init()
            Scripts.Execute().catch( r => console.log("Script Error " + { r }))
        })
    }
}