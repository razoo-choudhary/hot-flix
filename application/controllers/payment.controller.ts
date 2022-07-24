import {Request, Response} from "express";
import axios from "axios";
import {Payment} from "../../entities/Payment";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {User} from "../../entities/User";
export class PaymentController{

    /**
     *
     * @param request
     * @param res
     * @constructor
     */
    static ValidateKhaltiPayment ( request : Request, res : Response ) {
        const { token, amount } = request.body
        if(token && amount){
            axios.post(process.env.KHALTI_VERIFY_URL ?? "", { token , amount }, {
                headers: {
                    'Authorization': 'Key ' + process.env.KHALTI_SECRET_KEY
                }
            }).then( async (response : any) => {
                await PaymentController.SaveTransactionLog( response ).then( async (data) => {
                    await PaymentController.UpgradeUserPremiumPolicy( data )
                })
            })
        }
    }

    /**
     *
     * @param response
     * @constructor
     */
    static async SaveTransactionLog ( response : any ) {
       return await Payment.save({
            user_id         : AuthMiddleware.LoggedInUser.user_id,
            transaction_id  : response.data.idx,
            payment_amount  : response.data.amount,
            payment_cashback: response.data.cashback,
            payment_fee     : response.data.fee_amount,
            paid_by         : response.data.user.name,
            status          : response.data.state.name,
            refunded        : response.data.refunded
        })
    }

    /**
     *
     * @param data
     * @constructor
     */
    static async UpgradeUserPremiumPolicy ( data : any ) {
        if(data){
            let premium_type = 0;
            if(data.payment_amount === 5000) premium_type   = 1
            if(data.payment_amount === 10000) premium_type  = 2
            return await User.update({ user_id : AuthMiddleware.LoggedInUser.user_id }, { is_premium : 1, premium_type})
        }
    }
}