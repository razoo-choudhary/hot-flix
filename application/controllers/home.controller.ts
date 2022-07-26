import {Request, Response} from "express";
import {Movie} from "../../entities/Movie";
import {ReviewController} from "./review.controller";
import {BaseController} from "./base.controller";

export class HomeController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request: Request, response : Response ) {
        return BaseController.render(response,"home/content", {
            title               : "home",
            allMovies           : await HomeController.AllMovies(),
            recommended         : await HomeController.GetRecommendedMovie( 20 ),
            showHeaderFooter    : true,
            newItemOfThisSeason : await HomeController.newItemsOfThisSeason(),
            khalti_public_key   : process.env.KHALTI_PUBLIC_KEY ? process.env.KHALTI_PUBLIC_KEY : ""
        })
    }

    static async newItemsOfThisSeason () {
        const x : any = await Movie.find({
            order   :   { created_at : "DESC" },
            take    :   18
        })

        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }

    static async AllMovies () {
        const x = await Movie.find( { take : 18 })
        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }

    static async GetRecommendedMovie ( take = 6 ) {
        const x =  await Movie.find({ take })
        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }
}