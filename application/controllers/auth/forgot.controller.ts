import {Request, Response} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware";
import {Mailing} from "../../../config/mailing";
import {ResetToken} from "../../../entities/ResetToken";
import {GeneralFunction} from "../../../helpers/functions/General";

export class ForgotController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request :Request, response : Response ) {
        return response.status(200).render("auth/forgot", {
            title       : "Forgot Password",
            keywords    : "",
            description : ""
        })
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */

    static async RequestResetLink ( request :Request, response : Response ) {
        if( !request.body.username ){
            return response.status(401).json({
                message :   "Missing Credentials"
            })
        }

        if( request.body.username ){
            await AuthMiddleware.getUserByUsername( request.body.username ).then( async ( user : any ) => {
                if (!user) {
                    return response.status(401).json({
                        message: "No user was found"
                    })
                }
                if (user) ForgotController.SendPasswordResetLink( response, user.email, user.user_id )
            })
        }
    }

    /**
     *
     * @param response
     * @param email
     * @param user_id
     * @constructor
     */
    static SendPasswordResetLink ( response : Response, email : string, user_id : number ) {
        const token = GeneralFunction.GenerateToken(25)
        Mailing.Service.sendMail({
            from        :   process.env.APP_MAIL,
            to          :   email,
            subject     :   "Password Reset Request",
            html        :   `${process.env.APP_URL}/reset/${token}`,
        }).then( async ( emailStatus : any ) => {
            if( emailStatus ){
                await ResetToken.save( { user_id, token } ).then( ( res  ) => {
                    if(res) return response.status(200).json( { message :   "An email with reset link has been sent." } )
                })
            }
        })
    }
}