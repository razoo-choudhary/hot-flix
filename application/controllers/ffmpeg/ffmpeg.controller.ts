import {FfmpegConfig} from "../../../config/ffmpeg";
import {GeneralFunction} from "../../../helpers/functions/General";
import {FfprobeData} from "fluent-ffmpeg";

export class FfmpegController{

    public static qualitiesToGenerate  : string [] = []
    public static qualitiesGenerated   :  any = []
    private static FFMPEG    : any
    public  static Thumbnail : any

    /**
     *
     * @param data
     */
    static async probeQualities ( data : FfprobeData ) {
        FfmpegController.qualitiesToGenerate    = []
        if(data.streams[0].height){
            if(data.streams[0].height > 1080){
                FfmpegController.qualitiesToGenerate.push("?x" + data.streams[0].height, "1920x1080","1280x720")
            }
            if(data.streams[0].height === 1080){
                FfmpegController.qualitiesToGenerate.push("1920x1080","1280x720","640x480")
            }
            if(data.streams[0].height > 720 && data.streams[0].height < 1080){
                FfmpegController.qualitiesToGenerate.push("1280x720","640x480")
            }
            if(data.streams[0].height === 720){
                FfmpegController.qualitiesToGenerate.push("1280x720","640x480")
            }
            if(data.streams[0].height < 720 ){
                FfmpegController.qualitiesToGenerate.push("640x480")
            }
        }
        return true;
    }

    /**
     *
     * @private
     */
    private static async mergerVideoProbe () {
        FfmpegController.qualitiesGenerated     = []
        for (const quality of FfmpegController.qualitiesToGenerate){
            const hash = GeneralFunction.GenerateToken(40)
            FfmpegController.FFMPEG.output(`./uploads/${hash}.mp4`).size(quality)
            FfmpegController.qualitiesGenerated.push( { quality, hash } )
        }
        return true;
    }

    /**
     *
     * @param filepath
     * @constructor
     */
    static async UploadVideo ( filepath : string ) {
        return new Promise(( resolve ) => {
            FfmpegController.FFMPEG = FfmpegConfig.ffmpeg( filepath )
            FfmpegConfig.ffmpeg.ffprobe( filepath , async function (err, data) {
                await FfmpegController.probeQualities( data )
                await FfmpegController.mergerVideoProbe()
                await FfmpegController.FFMPEG.on("end", function () {
                    resolve( FfmpegController.qualitiesGenerated )
                }).run()
            })
        })
    }
}