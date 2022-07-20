import express from "express"
import * as core from "express-serve-static-core"
import * as dotenv from "dotenv"

export class Server {

    app : core.Application = express()

    initializeServer () {
        dotenv.config( { path : __dirname + "/.env"} )
    }
}