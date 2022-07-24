import {Request, Response} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware";
import {User} from "../../../entities/User";
import bcrypt from "bcryptjs";
import {GeneralFunction} from "../../../helpers/functions/General";

export class SignupController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request : Request, response : Response ) : any {
        return response.status(200).render("auth/signup", {
            title       : "sign up",
            keywords    : "hello world",
            description : "description is description",
        })
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async Signup ( request : Request, response : Response ) : Promise<any>{
        let isErrored = false;
        if(!request.body.username ||!request.body.email || !request.body.password ){
            isErrored = true;
            return response.status(401).json({
                message : "Missing credentials"
            })
        }
        const { username, email, password } = request.body

        await User.findOneBy({ email }).then( ( user : any ) => {
            if(user){
                isErrored = true
                return response.status(401).json({
                    message : "Email already in user"
                })
            }
        })

        await AuthMiddleware.getUserByUsername( username ).then( ( user : any) => {
            if(user){
                isErrored = true
                return response.status(401).json({
                    message : "Username has already been taken"
                })
            }
        })

        if( !isErrored ){
            await bcrypt.hash(password,10, async ( err: Error, password : string) => {
                const avatar = GeneralFunction.CreateUserAvatar()
                await User.save( { username, email, password, avatar } ).then( ( ) => {
                    return response.status(200).json( { location : "/" } )
                })
            })
        }
    }
}