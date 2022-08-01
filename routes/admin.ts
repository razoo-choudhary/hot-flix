import * as express from 'express'
import {AdminMiddleware} from "../application/middlewares/admin.middleware";
import {AdminController} from "../application/controllers/admin/admin.controller";
import {Upload} from "../services/upload";

const Router = express.Router()
const upload = [ { name : "movie" }, { name : "form__img_upload" }, { name : "gallery", maxCount : 30 } ]

Router.get(  "/", AdminMiddleware.AdminAuthentication, AdminController.LoadView)

Router.post( "/upload-movie", AdminMiddleware.AdminAuthentication, Upload( upload ), AdminController.UploadMovie)

module.exports = Router