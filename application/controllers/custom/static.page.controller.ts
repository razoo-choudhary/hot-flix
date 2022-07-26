import {Request, Response} from "express";
import {BaseController} from "../base.controller";

export class StaticPageController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadViewAbout ( request : Request, response: Response ) {
        return BaseController.render(response,"custom/about", {
            title               : "About",
            showHeaderFooter    : true
        })
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadViewPrivacy ( request : Request, response: Response ) {
        return BaseController.render(response,"custom/privacy", {
            title               : "Privacy",
            showHeaderFooter    : true
        })
    }
}