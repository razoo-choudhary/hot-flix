import {Request, Response} from "express";
import {BaseController} from "../base.controller";

export class SigninController extends BaseController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request : Request, response : Response ) {
        return BaseController.render(response, "auth/signin", {
             title       : "Sign in",
        })
    }
}