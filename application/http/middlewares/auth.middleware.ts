import {PassportConfig} from "../../../config/passport";
import passport from "passport";
import {User} from "../../entities/User";
import {Request, Response} from "express";

export class AuthMiddleware {

    static LoggedInUser : any

    /**
     *
     * @constructor
     */
    static Init () {
        PassportConfig.Init( passport,
            async ( username : string ) => await this.getUserByUsername( username ),
            async ( user_id : number ) => await this.getUserById( user_id )
        )
    }

    /**
     *
     * @param user_id
     */
    static async getUserById ( user_id : number ) {
        return await User.findOneBy( { user_id } )
    }

    /**
     *
     * @param username
     */
    static async getUserByUsername ( username : string ) {
        return await User.findOneBy( { username } )
    }

    /**
     *
     * @param request
     * @param response
     * @param Next
     * @constructor
     */
    static async AuthenticatedGuard ( request : Request, response : Response, Next : any ) {
        if( request.isAuthenticated() ){
            AuthMiddleware.LoggedInUser = request.user
            return Next()
        }
        if( !request.xhr ){
            return response.redirect("/signin")
        }
        if( !request.isAuthenticated() ){
            return response.status(301).json({ message : "Not authenticated" } )
        }
    }

    /**
     *
     * @param request
     * @param response
     * @param Next
     * @constructor
     */
    static async NonAuthenticatedGuard ( request : Request, response : Response, Next : any ) {
        if( request.isAuthenticated() ){
            AuthMiddleware.LoggedInUser = request.user
            return response.status(200).redirect("/")
        }
        Next()
    }
}