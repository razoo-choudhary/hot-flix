export class GeneralFunction{

    /**
     *
     * @param length
     * @constructor
     */
    static GenerateToken ( length : number) : string {
        const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        const b = [];
        for (let i=0; i<length; i++) {
            const j = Number((Math.random() * (a.length-1)).toFixed(0));
            b[i] = a[j];
        }
        return b.join("");
    }

    /**
     *
     */
    static config () {
        return {
            app_name    :   process.env.APP_NAME,
            app_url     :   process.env.APP_URL,
            app_mail    :   process.env.APP_MAIL
        }
    }

    /**
     *
     * @param string
     */
    static capitalizeFirstLetter( string : string ) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     *
     * @constructor
     */
    static CreateUserAvatar( ) : string {
        const diceBearUrl   =   process.env.DICE_BEAR_URL ?? "" + "/";
        return diceBearUrl + GeneralFunction.GenerateToken( 25 ) +  ".svg"
    }
}