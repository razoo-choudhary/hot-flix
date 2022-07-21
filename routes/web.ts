import express from "express";
import {AuthMiddleware} from "../application/http/middlewares/auth.middleware";
import {SigninController} from "../application/http/controllers/auth/signin.controller";
import {AuthController} from "../application/http/controllers/auth.controller";
import {HomeController} from "../application/http/controllers/home.controller";

const Router = express.Router()

Router.get("/",         AuthMiddleware.AuthenticatedGuard, HomeController.LoadView )
Router.get("/signin",   AuthMiddleware.NonAuthenticatedGuard, SigninController.LoadView )


Router.post( "/signin", AuthMiddleware.NonAuthenticatedGuard, AuthController.PreAuthenticate )
Router.post( "/signout",AuthMiddleware.AuthenticatedGuard, AuthController.DeAuthenticateUser )

module.exports = Router