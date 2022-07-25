import {Request, Response} from "express";
import {Movie} from "../../entities/Movie";
import {MoreThan} from "typeorm";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {ReviewController} from "./review.controller";

export class HomeController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request: Request, response : Response ) {
        return response.status(200).render("home/content", {
            user                : AuthMiddleware.LoggedInUser,
            title               : "Home",
            keywords            : "",
            allMovies           : await HomeController.AllMovies(),
            description         : "",
            expectedMovie       : await HomeController.expectedMovie(),
            showHeaderFooter    : true,
            newItemOfThisSeason : await HomeController.newItemsOfThisSeason(),
            khalti_public_key   : process.env.KHALTI_PUBLIC_KEY ? process.env.KHALTI_PUBLIC_KEY : ""
        })
    }


    static async newItemsOfThisSeason () {
        let x : any = await Movie.find({
            order   :   { created_at : "ASC" },
            take    :   18
        })

        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }

    static async AllMovies () {
        const x = await Movie.find( { take : 18 })
        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }

    static async expectedMovie () {
        const x = await Movie.find({
            where   :   { expected_date : MoreThan(new Date)},
            take    :   18
        })
        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }

    static async GetRecommendedMovie () {
        const x =  await Movie.find({
            take    :   6
        })
        return await Promise.all(x.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
    }
}