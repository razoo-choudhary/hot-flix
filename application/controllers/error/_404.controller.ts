import {Request, Response} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware";

export class _404Controller{

    static LoadView ( request : Request, response : Response ) {
        return response.status(200).render("error/404", {
            user                : AuthMiddleware.LoggedInUser,
            title               : "Error 404",
            keywords            : "",
            description         : "",
            showHeaderFooter    : false,
        })
    }
}