import {Request, Response} from "express";
import {Movie} from "../../entities/Movie";
import {Between, Like} from "typeorm";
import {ReviewController} from "./review.controller";
import {Video} from "../../entities/Video";
import moment from "moment";
import {BaseController} from "./base.controller";

export class SearchController{

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request : Request, response : Response ) {
        const data = await SearchController.getSearchItem(request.params.query,Number(request.query.page) || 1, request.query)
        return BaseController.render(response,"search/content", {
            showHeaderFooter : true,
            title       :   "",
            movieLists  :   data,
            queryString :   request.params.query,
            filters     :   await SearchController.GetFilters( request.params.query )
        })
    }

    /**
     *
     * @param movie_id
     */
    static async x ( movie_id : number) {
        const x = await Video.findBy({movie_id})
        return x.map( e => e.quality )
    }

    /**
     *
     * @param query
     * @param page
     * @param params
     * @param perPage
     */
    static async getSearchItem ( query : string, page = 1, params : any ,perPage = 18 ) {
        let result : any;
        const where : any = { movie_name : Like("%"+query+"%")}

        if( params.genre && typeof params.genre !== "undefined") where.genre = params.genre
        if( params.releaseStart && params.releaseEnd ) {
            where.release_date = Between(
                moment(params.releaseStart).subtract(1,"y").format(),
                moment(params.releaseEnd).add(1,"y").format()
            )
        }

        const resultUnFiltered  = await Movie.find( { where })
        const LastPage          = Math.ceil( resultUnFiltered.length / perPage)

        result      = await Movie.find({ skip : ((page - 1) * perPage), take : perPage, where })
        result      = await Promise.all(result.map( async (e: any) => ({...e , review   : await ReviewController.GetReviewCount(e.movie_id)})))
        result      = await Promise.all(result.map( async (e: any) => ({...e , quality  : await SearchController.x(e.movie_id) })))

        if( params.ratingStart && params.ratingEnd ){
            result = result.filter(function (currentElement : any) {
                if (currentElement.review >= params.ratingStart && currentElement.review <= params.ratingEnd) return true;
            });
        }

        if( params.quality && typeof params.quality !== "undefined"){
            result = result.filter(function (currentElement : any) {
                if (currentElement.quality.includes(params.quality))  return true;
            });
        }

        return { LastPage, page, perPage, totalPages : LastPage, result }
    }

    /**
     *
     * @param result
     */
    static async calculateHighestAndLowestRating ( result : any ){
        const allRatings      = result.map( (value: { review: any; }) => value.review );
        let highestRating   = 0;
        let lowestRating    = 0
        for (let i=0; i<= highestRating;i++){
            if (allRatings[i] > highestRating)  highestRating=allRatings[i];
            if (allRatings[i] < highestRating)  lowestRating=allRatings[i];
        }
        return { highestRating, lowestRating }
    }

    /**
     *
     * @param movies
     */
    static async getVideoQualities (movies : any ){
        const videoQualities : number[] = []
        for (const movie of movies){
            const videos = await Video.findBy({movie_id : movie.movie_id})
            for (const video of videos){
                if(!videoQualities.includes(Number(video.quality))){
                    videoQualities.push(Number(video.quality))
                }
            }
        }
        return videoQualities.sort(function(a : number, b : number){
            return b - a
        })
    }

    /**
     *
     * @param query
     * @constructor
     */
    static async GetFilters ( query : string ) {
        const  result : any  = await Movie.find( {where : { movie_name : Like("%"+query+"%")}});
        const  dates  : any  = result.map( (value : { release_date : any; }) => new Date(value.release_date) )
        return {
            genre           : result.map( (value: { genre: any; }) => value.genre ),
            rating          : await SearchController.calculateHighestAndLowestRating(result),
            quality         : await SearchController.getVideoQualities( result ),
            yearReleased    : { max : new Date(Math.max.apply(null,dates)), min : new Date(Math.min.apply(null,dates))}
        }
    }
}