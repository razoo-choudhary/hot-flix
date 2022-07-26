import {Response} from "express";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {GeneralFunction} from "../../helpers/functions/General";

export class BaseController {

    static render ( response : Response, view : string, options : any ) {
        Object.assign(options, {
            user                : AuthMiddleware.LoggedInUser,
            title               : GeneralFunction.config().app_name + " | " + GeneralFunction.capitalizeFirstLetter(options.title) ,
            keywords            : "",
            description         : "",
            config              : GeneralFunction.config(),
            helper              : require("../../helpers/helper")
        })
        return response.status(options.statusCode ?? 200).render(view, options)
    }
}