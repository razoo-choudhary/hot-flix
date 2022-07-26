import {Request, Response} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware";
import {ReviewController} from "../review.controller";
import {HomeController} from "../home.controller";
import bcrypt from "bcryptjs";
import {User} from "../../../entities/User";
import {BaseController} from "../base.controller";

export class UserController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request : Request, response : Response ) {
        const user = AuthMiddleware.LoggedInUser
        return BaseController.render(response,"user/content", {
            title               : user.username,
            showHeaderFooter    : true,
            totalReviews        : await ReviewController.GetUserTotalReview( user.user_id ),
            recommended         : await HomeController.GetRecommendedMovie(),
            khalti_public_key   : process.env.KHALTI_PUBLIC_KEY ? process.env.KHALTI_PUBLIC_KEY : ""
        })
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async UpdateBasic ( request : Request, response : Response ) {
        const { username, email } = request.body
        const user = AuthMiddleware.LoggedInUser
        if( !username || !email ){
            return response.status(401).json({
                message : "Missing credentials."
            })
        }
        if( username && email ){
            const userWithUsername  = await AuthMiddleware.getUserByUsername( username )
            const userWithEmail     = await User.findOneBy({ email })
            if( userWithUsername && username !== user.username ){
                return response.status(401).json({
                    message : "Username has already been taken."
                })
            }

            if( userWithEmail && email !== user.email ){
                return response.status(401).json({
                    message : "Email has already been taken."
                })
            }

            if( !userWithUsername || !userWithEmail ){
                await User.update( { user_id : user.user_id }, { username, email } ).then( () => {
                    return response.status(200).json({
                        message : "User Profile Updated."
                    })
                })
            }

            if( user.username === username && user.email === email ){
                return response.status(200).json({
                    message : "Nothing to make change on"
                })
            }
        }
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async UpdatePassword ( request : Request, response : Response ) {
        const { old_password, new_password } = request.body
        const user = AuthMiddleware.LoggedInUser
        if( !old_password || !new_password ){
            return response.status(401).json({
                message : "Missing Credentials"
            })
        }

        if( old_password && new_password ){
            const verify = await bcrypt.compare( old_password, user.password )
            if( verify ){
                const newHashedPassword = await bcrypt.hash(new_password,10)
                await User.update({ user_id : user.user_id }, { password : newHashedPassword }).then( () => {
                    return response.status(200).json({
                        message : "Password has been changed successfully."
                    })
                })
            }
            if( !verify ) {
                return response.status(401).json({
                    message : "Current Password Is Incorrect."
                })
            }
        }
    }
}