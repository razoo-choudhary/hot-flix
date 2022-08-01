import {MulterConfig} from "../config/multer";
import multer from "multer";

export class UploadService extends MulterConfig{
    static initFileService = ( options : any ) => multer({ storage : MulterConfig.Init()}).fields( options )
}

export const Upload = ( options : any ) => UploadService.initFileService( options )