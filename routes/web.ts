import express from "express";
import {AuthMiddleware} from "../application/http/middlewares/auth.middleware";
import {SigninController} from "../application/http/controllers/auth/signin.controller";
import {AuthController} from "../application/http/controllers/auth.controller";
import {HomeController} from "../application/http/controllers/home.controller";
import {SignupController} from "../application/http/controllers/auth/signup.controller";
import {ForgotController} from "../application/http/controllers/auth/forgot.controller";
import {ResetController} from "../application/http/controllers/auth/reset.controller";

const Router = express.Router()

Router.get( "/",        AuthMiddleware.AuthenticatedGuard,      HomeController.LoadView )
Router.get( "/signin",  AuthMiddleware.NonAuthenticatedGuard,   SigninController.LoadView )
Router.get( "/signup",  AuthMiddleware.NonAuthenticatedGuard,   SignupController.LoadView )
Router.get( "/signout", AuthMiddleware.AuthenticatedGuard,      AuthController.DeAuthenticateUser )
Router.get( "/forgot",  AuthMiddleware.NonAuthenticatedGuard,   ForgotController.LoadView)
Router.get( "/reset/:token",   AuthMiddleware.NonAuthenticatedGuard,   ResetController.LoadView)


Router.post( "/signin", AuthMiddleware.NonAuthenticatedGuard,   AuthController.PreAuthenticate )
Router.post( "/signup", AuthMiddleware.NonAuthenticatedGuard,   SignupController.Signup )
Router.post( "/forgot", AuthMiddleware.NonAuthenticatedGuard,   ForgotController.RequestResetLink)
Router.post( "/reset",  AuthMiddleware.NonAuthenticatedGuard,   ResetController.ResetPassword)

Router.get("*", (req, res) => res.send("404") )

module.exports = Router