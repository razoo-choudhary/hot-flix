import {Request, Response} from "express";

export class HomeController {

    static LoadView ( request: Request, response : Response ) {
        return response.status(200).send("Home Page")
    }
}