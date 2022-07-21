import {Server} from "./server"
import * as path from "path"
import expressEjsLayouts from "express-ejs-layouts";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport";
import {CorsConfig} from "./config/cors";

const server    =   new Server()
const app       =   server.app

export const openServer = app.listen( 5000 , () => {

    const staticPath    =   path.join( __dirname , "/" )
    const viewPath      =   path.join( __dirname , "/resources/layouts" )

    app.set( "views" , viewPath )
    app.set( "view engine" , "ejs" )
    app.set( "layout" , "container" )

    app.use( express.static( staticPath ) )
    app.use( bodyParser.urlencoded( { extended : true } ) )
    app.use( bodyParser.json() )
    app.use( expressEjsLayouts )
    app.use( cookieParser() )
    app.use( cors(CorsConfig.Init()) )
    app.use( session({
        secret: "someKey",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge : 500 * 60 * 60 * 1000 }
    }))
    app.use( passport.initialize() )
    app.use( passport.session() )

    app.use( "/api", require("./routes/api") )
    app.use( require("./routes/web") )

    server.initializeServer()
})