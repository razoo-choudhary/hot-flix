import {Reviews} from "../../entities/Reviews";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {Request, Response} from "express";

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
        for (const review of reviews)  reviewAmount = reviewAmount + review.review_count
        if (reviewAmount > 0) return reviewAmount / reviews.length
        return reviewAmount
    }

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async CreateNewReview ( request : Request, response : Response ) {
        const { title, review, count, movie_id } = request.body
        const user = AuthMiddleware.LoggedInUser
        if( !title || !review || !count || !movie_id){
            return response.status(401).json({
                message : "Missing Credentials."
            })
        }

        if( title && review && count && movie_id ){

            const existingReview = await Reviews.findOneBy({movie_id , user_id : user.user_id})

            if(count < 1 || count > 10){
                return response.status(401).json({
                    message : "Review Must be in between 1 to 10"
                })
            }

            if(existingReview){
                return response.status(401).json({
                    message : "You have already reviewed this movie"
                })
            }

            if(count > 0 && count < 11 && !existingReview){
                await Reviews.save({
                    user_id  : user.user_id,
                    review_count : parseFloat(count),
                    review_description : review,
                    review_title : title,
                    movie_id
                }).then( ( SavedReview : any ) => { return response.status(200).json({ location : "/watch/" + movie_id}) })
            }
        }
    }

    /**
     *
     * @param user_id
     * @constructor
     */
    static async GetUserTotalReview ( user_id : number ) {
        const x = await Reviews.find({ where : { user_id }})
        return x.length
    }
}