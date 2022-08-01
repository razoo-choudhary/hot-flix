import {Request, Response} from "express";
import {BaseController} from "../base.controller";
import {FfmpegController} from "../ffmpeg/ffmpeg.controller";
import {Movie} from "../../../entities/Movie";
import {Video} from "../../../entities/Video";
import {GeneralFunction} from "../../../helpers/functions/General";
import sharp from "sharp";
import {Screenshots} from "../../../entities/Screenshots";
import fs from "fs";

export class AdminController extends BaseController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static async LoadView ( request : Request, response : Response ) {
        return BaseController.render(response, "admin/content", {
            title   :   "Admin",
            layout  :   "admin-layout"
        })
    }

    /**
     * 
     * @param request 
     * @param response 
     * @returns 
     */
    static validateFields ( request : Request, response : Response) : any {
        let validationStatus = true
        const uploadedFiles : any       = request.files
        if(!request.body.movie_name){
            validationStatus = false
            return response.status(401).json({
                message :  "Title is required."
            })
        }
        if(!request.body.description){
            validationStatus = false
            return response.status(401).json({
                message :  "Description is required."
            })
        }
        if(!request.body.release_date){
            validationStatus = false
            return response.status(401).json({
                message :  "Release date is required."
            })
        }

        if(request.body.release_date && isNaN(Date.parse(request.body.release_date))){
            validationStatus = false
            return response.status(401).json({
                message :  "Release Date is not in valid format"
            })
        }

        if(!request.body.movie_duration || !parseInt(request.body.movie_duration)){
            validationStatus = false
            return response.status(401).json({
                message :  "Movie Duration is empty or is invalid number."
            })
        }
        if(!request.body.movie_origin){
            validationStatus = false
            return response.status(401).json({
                message :  "Movie Origin Country is required."
            })
        }
        if(!request.body.genre){
            validationStatus = false
            return response.status(401).json({
                message :  "Genre is required."
            })
        }
        if(!request.body.director){
            validationStatus = false
            return response.status(401).json({
                message :  "Director is required."
            })
        }

        if(!request.body.cast){
            validationStatus = false
            return response.status(401).json({
                message :  "Cast is required."
            })
        }
        if(!request.body.trailer){
            validationStatus = false
            return response.status(401).json({
                message :  "Trailer is required."
            })
        }

        if(!uploadedFiles.form__img_upload){
            validationStatus = false
            return response.status(401).json({
                message :  "No Movie Poster Selected"
            })
        }
        if(!uploadedFiles.movie){
            validationStatus = false
            return response.status(401).json({
                message :  "No Movie Selected For Upload"
            })
        }
        if(validationStatus) return true;
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    static async UploadMovie ( request : Request, response : Response ) {
        const uploadedFiles : any = request.files
        let poster          : string;
        if( AdminController.validateFields(request, response) === true ){
            if(uploadedFiles.movie[0].fieldname === "movie"){
                await FfmpegController.UploadVideo(uploadedFiles.movie[0].path).then( async (resolve ) => {
                    if(resolve){
                        if( uploadedFiles.form__img_upload ){
                            const posterOutput = "./uploads/" + "resized-" + uploadedFiles.form__img_upload[0].filename
                            await sharp(uploadedFiles.form__img_upload[0].path).resize(270,400).toFile( posterOutput )
                            poster  = "resized-" + uploadedFiles.form__img_upload[0].filename
                            fs.unlinkSync("./uploads/" + uploadedFiles.form__img_upload[0].filename)
                        }
                        if( poster ) await AdminController.NewMovie(request, response, resolve, poster,uploadedFiles.movie[0].path)
                    }
                })
            }
        }
    }

    /**
     *
     * @param request
     * @param movie_id
     */
    static async saveScreenShots ( request  : Request, movie_id : number ) {
        const files : any = request.files
        if(files.gallery){
            for (const file of files.gallery) await Screenshots.save({ image_name : file.filename, movie_id })
            return true;
        }
    }

    /**
     *
     * @param qualitiesGenerated
     * @param movie_id
     */
    static async saveVideo ( qualitiesGenerated : any, movie_id : number ) {
        if( qualitiesGenerated.length > 0 ){
            for(const qualityGenerated of qualitiesGenerated){
                await Video.save({ quality : qualityGenerated.quality.split("x")[1], video_hash : qualityGenerated.hash, movie_id})
            }
            return true;
        }
    }

    /**
     *
     * @param request
     * @param poster
     * @constructor
     * @private
     */
    private static async SaveMovie( request : Request, poster : any ) {
        return await Movie.save({
            description     :   GeneralFunction.capitalizeFirstLetter(request.body.description),
            movie_name      :   GeneralFunction.capitalizeFirstLetter(request.body.movie_name),
            director        :   GeneralFunction.capitalizeFirstLetter(request.body.director),
            genre           :   GeneralFunction.capitalizeFirstLetter(request.body.genre),
            cast            :   GeneralFunction.capitalizeFirstLetter(request.body.cast),
            release_date    :   new Date(request.body.release_date).getFullYear(),
            movie_origin    :   request.body.movie_origin.toUpperCase(),
            poster
        })
    }

    /**
     * 
     * @param request 
     * @param response 
     * @param qualitiesGenerated 
     * @param poster
     * @param file
     */
    private static async NewMovie ( request : Request, response : Response, qualitiesGenerated : any,poster : any,file : string ) {
        AdminController.SaveMovie(request, poster).then( async (data) => {
            await AdminController.saveScreenShots( request, data.movie_id )
            await AdminController.saveVideo( qualitiesGenerated, data.movie_id )
            fs.unlink(file,() => {
                return response.status(200).json({
                    message :   "Upload Success",
                    state   :   "active",
                    reset   :   true,
                    refer   :   false
                })
            })
        })
    }
}
