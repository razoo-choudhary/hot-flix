import multer from "multer"
import {GeneralFunction} from "../helpers/functions/General";

export class MulterConfig{

    protected static Init () {
        return multer.diskStorage({
            destination(req, file, cb) { cb(null, "./uploads") },
            filename(req, file: any, cb: any) {
                const {originalname : originalName} = file
                const someNameToSet = GeneralFunction.GenerateToken(50)
                const fileExtension = (originalName.match(/\.+[\S]+$/) || [])[0]
                cb(null, `${someNameToSet}${fileExtension}`)
            }
        })
    }
}