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
import {_404Controller} from "../application/controllers/error/_404.controller";
import {StaticPageController} from "../application/controllers/custom/static.page.controller";
import {UserController} from "../application/controllers/user/user.controller";
import {ReviewController} from "../application/controllers/review.controller";
import {SearchController} from "../application/controllers/search.controller";

const Router = express.Router()

/**
 *  AUTHENTICATED GET ROUTES
 */
Router.get( "/",                AuthMiddleware.AuthenticatedGuard,      HomeController.LoadView )
Router.get( "/signout",         AuthMiddleware.AuthenticatedGuard,      AuthController.DeAuthenticateUser )
Router.get( "/watch/:key",      AuthMiddleware.AuthenticatedGuard,      WatchController.LoadView )
Router.get( "/playback/:hash",  AuthMiddleware.AuthenticatedGuard,      WatchController.VideoPlayBack )
Router.get( "/dashboard",       AuthMiddleware.AuthenticatedGuard,      UserController.LoadView )
Router.get( "/search/:query",   AuthMiddleware.AuthenticatedGuard,      SearchController.LoadView )

/**
 * NON AUTHENTICATED GET ROUTES
 */
Router.get( "/signin",          AuthMiddleware.NonAuthenticatedGuard,   SigninController.LoadView )
Router.get( "/signup",          AuthMiddleware.NonAuthenticatedGuard,   SignupController.LoadView )
Router.get( "/forgot",          AuthMiddleware.NonAuthenticatedGuard,   ForgotController.LoadView )
Router.get( "/reset/:token",    AuthMiddleware.NonAuthenticatedGuard,   ResetController.LoadView )

/**
 * GLOBAL GET ROUTES
 */
Router.get( "/about",    StaticPageController.LoadViewAbout )
Router.get( "/privacy",  StaticPageController.LoadViewPrivacy )

/**
 * NON AUTHENTICATED POST ROUTES
 */
Router.post( "/signin", AuthMiddleware.NonAuthenticatedGuard,   AuthController.PreAuthenticate )
Router.post( "/signup", AuthMiddleware.NonAuthenticatedGuard,   SignupController.Signup )
Router.post( "/forgot", AuthMiddleware.NonAuthenticatedGuard,   ForgotController.RequestResetLink )
Router.post( "/reset",  AuthMiddleware.NonAuthenticatedGuard,   ResetController.ResetPassword )


/**
 * AUTHENTICATED POST ROUTES
 */
Router.post( "/verify-payment", AuthMiddleware.AuthenticatedGuard, PaymentController.ValidateKhaltiPayment)
Router.post( "/user-basics",    AuthMiddleware.AuthenticatedGuard, UserController.UpdateBasic)
Router.post( "/user-password",  AuthMiddleware.AuthenticatedGuard, UserController.UpdatePassword)
Router.post( "/create-review",  AuthMiddleware.AuthenticatedGuard, ReviewController.CreateNewReview)


Router.get("*", _404Controller.LoadView )

module.exports = Router