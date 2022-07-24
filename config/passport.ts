import passportLocal from "passport-local";
import {AuthController} from "../application/controllers/auth.controller";

export class PassportConfig{
    static Init ( passport : any, getUserByUsername : any, getUserByUserId : any ) {
        passport.use( new passportLocal.Strategy( { usernameField : "username" } , AuthController.AuthenticateUser ))
        passport.serializeUser( ( user : any, done : any ) => done( null, user.user_id ) )
        passport.deserializeUser( async ( user_id : number, done : any) => done( null, await getUserByUserId( user_id ) ) )
    }
}