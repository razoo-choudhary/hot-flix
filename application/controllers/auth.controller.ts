import {AuthMiddleware} from "../middlewares/auth.middleware";
import bcrypt from "bcryptjs"
import {Request, Response} from "express";
import passport from "passport";

export class AuthController {
    /**
     *
     * @param username
     * @param password
     * @param done
     * @constructor
     */
    static async AuthenticateUser ( username : string, password : string, done : any) {
        const user = await AuthMiddleware.getUserByUsername( username )

        if( !user ) return done( null, false, { message : "No user with such username" } )

        const match = await bcrypt.compare( password, user.password )

        if( user && match ) return done( null, user, null )

        return done( null, false, { message : "Incorrect Username or Password" } )
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     * @constructor
     */
    static PreAuthenticate ( request : Request, response : Response, next : () => void ) {
        passport.authenticate( "local", ( error , user, info ) => {
            if( error ) return response.status(500).json( error )
            if( info ) return response.json(info)
            if( user ){
                request.login( user, function ( error ){
                    if( error ) return response.status(500).json( error )
                    return response.status(200).json( { location : "/" } )
                })
            }
        }) ( request, response , next)
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async DeAuthenticateUser ( request : Request, response : Response) {
        if(request.isAuthenticated()){
            request.logout( async () => {
                response.status(200).redirect( "/" )
            })
        }
    }
}