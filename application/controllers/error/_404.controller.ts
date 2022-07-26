import {Request, Response} from "express";
import {BaseController} from "../base.controller";

export class _404Controller{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request : Request, response : Response ) {
        return BaseController.render(response,"error/404", {
            title               : "Error 404",
            showHeaderFooter    : false,
            statusCode          : 404
        })
    }
}