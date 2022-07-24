import {Request, Response} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware";

export class StaticPageController{

    static LoadViewAbout ( request : Request, response: Response ) {
        return response.status(200).render("custom/about", {
            user                : AuthMiddleware.LoggedInUser,
            title               : "About",
            keywords            : "",
            description         : "",
            showHeaderFooter    : true
        })
    }

    static LoadViewPrivacy ( request : Request, response: Response ) {
        return response.status(200).render("custom/privacy", {
            user                : AuthMiddleware.LoggedInUser,
            title               : "Privacy",
            keywords            : "",
            description         : "",
            showHeaderFooter    : true
        })
    }
}