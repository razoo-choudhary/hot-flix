import {Request, Response} from "express";

export class HomeController {

    /**
     *
     * @param request
     * @param response
     * @constructor
     */
    static LoadView ( request: Request, response : Response ) {
        return response.status(200).send("Home Page")
    }
}