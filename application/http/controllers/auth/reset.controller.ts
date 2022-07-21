import {Request, Response} from "express";
import {ResetToken} from "../../../entities/ResetToken";
import {User} from "../../../entities/User";
import bcrypt from "bcryptjs";

export class ResetController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request :Request, response : Response ) {
        if( !request.params.token ) return response.redirect( "/")
        if( request.params.token ){
            await ResetToken.findOneBy( { token : request.params.token } ).then( async ( tokenData : any ) => {
                if( !tokenData ) return response.redirect("/")
                if( tokenData ){
                    return response.status(200).render("auth/reset", {
                        title       : "Reset Password",
                        keywords    : "",
                        description : "",
                        tokenData
                    })
                }
            })
        }
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async ResetPassword ( request :Request, response : Response ) {
        if( !request.body.token || !request.body.password ){
            return response.status(401).json( {
                message :   "Missing Credentials"
            })
        }

        if( request.body.token && request.body.password ){
            await ResetToken.findOneBy({ token : request.body.token } ).then( async ( tokenData : any  ) => {
                if(tokenData){
                    const password = await bcrypt.hash(request.body.password,10)
                    await User.update({user_id : tokenData.user_id}, { password }).then( async ( updateResponse ) => {
                        if( updateResponse ){
                            await ResetToken.delete({ user_id : tokenData.user_id })
                            return response.status(200).json( { location : "/" } )
                        }
                    })
                }
            })
        }
    }
}