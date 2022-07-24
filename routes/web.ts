import express from "express";
import {AuthMiddleware} from "../application/middlewares/auth.middleware";
import {SigninController} from "../application/controllers/auth/signin.controller";
import {AuthController} from "../application/controllers/auth.controller";
import {HomeController} from "../application/controllers/home.controller";
import {SignupController} from "../application/controllers/auth/signup.controller";
import {ForgotController} from "../application/controllers/auth/forgot.controller";
import {ResetController} from "../application/controllers/auth/reset.controller";
import {WatchController} from "../application/controllers/watch.controller";
import {PaymentController} from "../application/controllers/payment.controller";

const Router = express.Router()

/**
 *  NON AUTHENTICATED GET ROUTES
 */
Router.get( "/",                AuthMiddleware.AuthenticatedGuard,      HomeController.LoadView )
Router.get( "/signout",         AuthMiddleware.AuthenticatedGuard,      AuthController.DeAuthenticateUser )
Router.get( "/watch/:key",      AuthMiddleware.AuthenticatedGuard,      WatchController.LoadView )
Router.get( "/playback/:hash",  AuthMiddleware.AuthenticatedGuard,      WatchController.VideoPlayBack )

/**
 * AUTHENTICATED GET ROUTES
 */
Router.get( "/signin",          AuthMiddleware.NonAuthenticatedGuard,   SigninController.LoadView )
Router.get( "/signup",          AuthMiddleware.NonAuthenticatedGuard,   SignupController.LoadView )
Router.get( "/forgot",          AuthMiddleware.NonAuthenticatedGuard,   ForgotController.LoadView )
Router.get( "/reset/:token",    AuthMiddleware.NonAuthenticatedGuard,   ResetController.LoadView )


/**
 * POST ROUTES
 */
Router.post( "/signin", AuthMiddleware.NonAuthenticatedGuard,   AuthController.PreAuthenticate )
Router.post( "/signup", AuthMiddleware.NonAuthenticatedGuard,   SignupController.Signup )
Router.post( "/forgot", AuthMiddleware.NonAuthenticatedGuard,   ForgotController.RequestResetLink )
Router.post( "/reset",  AuthMiddleware.NonAuthenticatedGuard,   ResetController.ResetPassword )
Router.post( "/verify-payment", AuthMiddleware.AuthenticatedGuard, PaymentController.ValidateKhaltiPayment)

Router.get("*", (req, res) => res.send("404") )

module.exports = Router