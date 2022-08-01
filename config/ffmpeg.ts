import ffmpeg from "fluent-ffmpeg"

export class FfmpegConfig {

    static ffmpeg   : typeof ffmpeg;
    static ffmpegPath   =   require("@ffmpeg-installer/ffmpeg").path
    static ffProbePath  =   require("@ffprobe-installer/ffprobe").path

    /**
     *
     * @constructor
     */
    static Init () {
        ffmpeg.setFfmpegPath(this.ffmpegPath)
        ffmpeg.setFfprobePath(this.ffProbePath)
        return this.ffmpeg = ffmpeg
    }
}