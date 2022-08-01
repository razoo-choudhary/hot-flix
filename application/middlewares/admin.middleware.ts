import {Request, Response} from "express";

export class AdminMiddleware {

    /**
     *
     * @param request
     * @param response
     * @param Next
     * @constructor
     */
    static AdminAuthentication ( request : Request, response : Response, Next : any ) {
        if( request.isAuthenticated() ){
            const user : any  = request.user
            if( user.is_admin > 0 ){
                return Next()
            }
            if( user.is_admin < 1 ){
                return response.status(200).redirect("/")
            }
        }
        if( !request.isAuthenticated() ){
            return response.status(200).redirect("/")
        }
    }
}