import {Request, Response} from "express";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {Movie} from "../../entities/Movie";
import {Like} from "typeorm";
import {ReviewController} from "./review.controller";

export class SearchController{

    static async LoadView ( request : Request, response : Response ) {
        const data = await SearchController.getSearchItem(request.params.query,Number(request.query.page) || 1)
        return response.render("search/content", {
            showHeaderFooter : true,
            title       :   "",
            keywords    :   "",
            description :   "",
            user        :   AuthMiddleware.LoggedInUser,
            movieLists  :   data

        })
    }

    /**
     *
     * @param query
     * @param page
     * @param perPage
     */
    static async getSearchItem ( query : string, page = 1, perPage = 18 ) {
        let result      = await Movie.find({ skip : ((page - 1) * perPage), take : perPage, where : { movie_name : Like("%"+query+"%")}})
        const total     = result.length
        const LastPage  = Math.ceil(result.length / perPage)
        return { total, LastPage, page, perPage,
            result  : await Promise.all(result.map( async (e: any) => ({...e , review : await ReviewController.GetReviewCount(e.movie_id)})))
        }
    }
}