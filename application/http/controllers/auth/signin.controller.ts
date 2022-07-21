import {Request, Response} from "express";

export class SigninController{

    static LoadView ( request : Request, response : Response ) {
        return response.status(200).send("Signin Page")
    }
}