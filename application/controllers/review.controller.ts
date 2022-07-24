import {Reviews} from "../../entities/Reviews";
import {AuthMiddleware} from "../middlewares/auth.middleware";

export class ReviewController{

    /**
     *
     * @param movie_id
     * @constructor
     */
    static async GetAllReview ( movie_id : number) {
        const x : any = []
        const reviews : any = await Reviews.find( { where : { movie_id },  order : { created_at : "ASC"} })
        for(const review of reviews){
            review.user = await AuthMiddleware.getUserById(review.user_id)
            x.push(review)
        }
        return x
    }

    /**
     *
     * @param movie_id
     * @constructor
     */
    static async GetReviewCount ( movie_id : number ) {
        let reviewAmount = 0;
        const reviews = await Reviews.find({ where: { movie_id } } )
        for (const review of reviews) {
            reviewAmount = reviewAmount + review.review_count
        }
        if (reviewAmount > 0) return reviewAmount / reviews.length
        return reviewAmount
    }
}