import {Request, Response} from "express";

export class SigninController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request : Request, response : Response ) {
        return response.status(200).render("auth/signin", {
            title       : "sign in",
            keywords    : "hello world",
            description : "description is description",
        })
    }
}