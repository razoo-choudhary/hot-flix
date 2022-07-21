import {MulterConfig} from "../config/multer";
import multer from "multer";

export class UploadService extends MulterConfig{
    static initFileService = ( fieldName : string, fileLimit : number ) => multer({ storage : MulterConfig.Init()}).array( fieldName, fileLimit )
}

export const Upload = ( fieldName : string, fileLimit : number ) => UploadService.initFileService( fieldName, fileLimit )