import {Request, Response} from "express";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {Movie} from "../../entities/Movie";
import {Video} from "../../entities/Video";
import fs from "fs";
import {SubTitles} from "../../entities/SubTitles";
import {Reviews} from "../../entities/Reviews";
import {ReviewController} from "./review.controller";
import {HomeController} from "./home.controller";
import {Screenshots} from "../../entities/Screenshots";

export class WatchController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request : Request, response : Response ) {
        if( !request.params.key ) return response.redirect("/")
        if( request.params.key ){
            const movie =   await WatchController.GetMovie( Number( request.params.key ) )
            if( movie ){
                return response.status(200).render("watch/content", {
                    showHeaderFooter : true,
                    user        : AuthMiddleware.LoggedInUser,
                    title       : "" + movie.movie_name,
                    keywords    : "",
                    description : "",
                    reviews     : await ReviewController.GetAllReview( movie.movie_id ),
                    recommended : await HomeController.GetRecommendedMovie(),
                    screenShots : await Screenshots.findBy( { movie_id : movie.movie_id }),
                    movie
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
    static async VideoPlayBack ( request : Request, response : Response ) {
        if( request.headers.range ){
            const video         =   "./uploads/" + request.params.hash + ".mp4";
            try{
                const videoSize     =   fs.statSync(video).size
                const CHUNK_SIZE    =   10 ** 6
                const start         =   Number(request.headers.range.replace(/\D/g, ""))
                const end           =   Math.min(start + CHUNK_SIZE, videoSize - 1)
                const contentLength =   end - start + 1

                response.writeHead( 206,  {
                    "Content-Range"     :   `bytes ${start}-${end}/${videoSize}`,
                    "Content-Length"    :   contentLength,
                    "Content-Type"      :   "video/mp4",
                    "Accept-Ranges"     :   "bytes",
                })

                fs.createReadStream( video,  { start, end } ).pipe( response )

            } catch (e) {
                response.status(401).json({
                    location: "/"
                })
            }
        }
    }

    /**
     *
     * @param movie_id
     * @constructor
     */
    static async GetMovie ( movie_id : number ) {
        let x : any =   await Movie.findOneBy( { movie_id : movie_id } )

        x.videos    =   await Video.findBy( { movie_id } )
        x.subtitles =   await SubTitles.findBy({ movie_id } )
        return x;
    }
}