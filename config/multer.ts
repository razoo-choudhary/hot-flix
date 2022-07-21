import multer from "multer"

export class MulterConfig{

    protected static Init () {
        return multer.diskStorage({
            destination(req, file, cb) { cb(null, "./uploads") },
            filename(req, file: any, cb: any) {
                const {originalname : originalName} = file
                const someNameToSet = "rand"
                const fileExtension = (originalName.match(/\.+[\S]+$/) || [])[0]
                cb(null, `${someNameToSet}${fileExtension}`)
            }
        })
    }
}